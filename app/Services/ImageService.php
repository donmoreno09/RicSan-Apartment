<?php

namespace App\Services;

use App\Models\Image;
use App\Models\Apartment;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Log;
use Exception;

/**
 * Image Service
 * 
 * Handles business logic for image management including upload to Cloudinary,
 * deletion, and primary image management. This service acts as the business
 * logic layer between controllers and data models.
 * 
 * @package App\Services
 */
class ImageService
{
    /**
     * Cloudinary SDK instance
     * 
     * @var Cloudinary
     */
    private $cloudinary;

    /**
     * Create a new ImageService instance
     * 
     * Initializes Cloudinary SDK with configuration from config/cloudinary.php
     */
    public function __construct()
    {
        // Initialize Cloudinary with configuration
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => config('cloudinary.cloud_name'),
                'api_key' => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret'),
            ],
            'url' => [
                'secure' => true, // Always use HTTPS
            ]
        ]);
    }

    /**
     * Upload an image to Cloudinary and store reference in database
     * 
     * This method handles the complete image upload workflow:
     * 1. Validates that the apartment exists
     * 2. Uploads the image file to Cloudinary cloud storage
     * 3. Stores the Cloudinary URL and metadata in the database
     * 4. Optionally sets the image as primary (first image or explicitly requested)
     * 
     * @param \Illuminate\Http\UploadedFile $file The uploaded image file
     * @param int $apartmentId The apartment this image belongs to
     * @param bool $isPrimary Whether to set this as the primary image
     * @return \App\Models\Image The created image record
     * 
     * @throws \Exception If apartment doesn't exist
     * @throws \Exception If Cloudinary upload fails
     */
    public function uploadToCloudinary($file, $apartmentId, $isPrimary = false)
    {
        // Step 1: Validate apartment exists
        $apartment = Apartment::find($apartmentId);
        if (!$apartment) {
            throw new Exception("Apartment with ID {$apartmentId} not found");
        }

        try {
            // Step 2: Generate a unique filename
            $fileName = $this->generateUniqueFileName($file, $apartmentId);
            
            // Step 3: Upload to Cloudinary with optimization settings
            $uploadResult = $this->cloudinary->uploadApi()->upload(
                $file->getRealPath(),
                [
                    'folder' => config('cloudinary.upload_options.folder', 'apartments'),
                    'public_id' => $fileName,
                    'resource_type' => 'auto',
                    'quality' => 'auto',           // Auto-optimize quality
                    'fetch_format' => 'auto',      // Auto-convert format (WebP, AVIF)
                    'transformation' => [
                        'quality' => 'auto:good',  // Good quality with compression
                        'fetch_format' => 'auto',
                    ],
                ]
            );

            // Step 4: Determine if this should be primary image
            $existingImages = Image::where('apartment_id', $apartmentId)->get();
            $shouldBePrimary = $isPrimary || $existingImages->isEmpty();

            // Step 5: If setting as primary, unset all other primary images
            if ($shouldBePrimary) {
                $this->unsetAllPrimaryImages($apartmentId);
            }

            // Step 6: Create image record in database
            $image = Image::create([
                'apartment_id' => $apartmentId,
                'url' => $uploadResult['secure_url'],
                'cloudinary_public_id' => $uploadResult['public_id'],
                'width' => $uploadResult['width'] ?? null,
                'height' => $uploadResult['height'] ?? null,
                'format' => $uploadResult['format'] ?? null,
                'bytes' => $uploadResult['bytes'] ?? null,
                'alt_text' => $apartment->title . ' - Image',
                'order' => $existingImages->count() + 1,
                'is_primary' => $shouldBePrimary,
            ]);

            // Step 7: Log successful upload
            Log::info('Image uploaded to Cloudinary', [
                'apartment_id' => $apartmentId,
                'image_id' => $image->id,
                'cloudinary_url' => $uploadResult['secure_url'],
                'file_size' => $uploadResult['bytes'],
                'format' => $uploadResult['format'],
            ]);

            return $image;

        } catch (Exception $e) {
            Log::error('Cloudinary upload failed', [
                'apartment_id' => $apartmentId,
                'error_message' => $e->getMessage(),
                'error_trace' => $e->getTraceAsString(),
            ]);

            throw new Exception(
                'Failed to upload image to cloud storage: ' . $e->getMessage(),
                0,
                $e
            );
        }
    }

    /**
     * Delete an image from Cloudinary and database
     * 
     * @param int $imageId The ID of the image to delete
     * @return bool True if deletion successful
     * 
     * @throws \Exception If image not found
     */
    public function deleteFromCloudinary($imageId)
    {
        $image = Image::find($imageId);
        if (!$image) {
            throw new Exception("Image with ID {$imageId} not found");
        }

        try {
            // Delete from Cloudinary
            if ($image->cloudinary_public_id) {
                $this->cloudinary->uploadApi()->destroy(
                    $image->cloudinary_public_id,
                    ['resource_type' => 'image']
                );
            }

            $apartmentId = $image->apartment_id;
            $wasPrimary = $image->is_primary;

            // Delete from database
            $image->delete();

            // If was primary, assign new primary
            if ($wasPrimary) {
                $this->assignNewPrimaryImage($apartmentId);
            }

            Log::info('Image deleted successfully', [
                'image_id' => $imageId,
                'apartment_id' => $apartmentId,
            ]);

            return true;

        } catch (Exception $e) {
            Log::error('Image deletion failed', [
                'image_id' => $imageId,
                'error' => $e->getMessage(),
            ]);

            throw new Exception('Failed to delete image: ' . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Set an image as the primary image for its apartment
     * 
     * @param int $imageId The ID of the image to set as primary
     * @return \App\Models\Image The updated image
     * 
     * @throws \Exception If image not found
     */
    public function setImageAsPrimary($imageId)
    {
        $image = Image::find($imageId);
        if (!$image) {
            throw new Exception("Image with ID {$imageId} not found");
        }

        if ($image->is_primary) {
            return $image;
        }

        try {
            $this->unsetAllPrimaryImages($image->apartment_id);
            $image->update(['is_primary' => '1']);

            Log::info('Primary image changed', [
                'apartment_id' => $image->apartment_id,
                'image_id' => $imageId,
            ]);

            return $image->fresh();

        } catch (Exception $e) {
            Log::error('Failed to set primary image', [
                'image_id' => $imageId,
                'error' => $e->getMessage(),
            ]);

            throw new Exception('Failed to set primary image: ' . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Generate unique filename for Cloudinary
     */
    private function generateUniqueFileName($file, $apartmentId)
    {
        $timestamp = time();
        $random = substr(md5(uniqid()), 0, 6);
        return "apartment-{$apartmentId}-{$timestamp}-{$random}";
    }

    /**
     * Unset all primary images for an apartment
     */
    private function unsetAllPrimaryImages($apartmentId)
    {
        Image::where('apartment_id', $apartmentId)
             ->where('is_primary', true)
             ->update(['is_primary' => false]);
    }

    /**
     * Assign new primary image after deletion
     */
    private function assignNewPrimaryImage($apartmentId)
    {
        $firstImage = Image::where('apartment_id', $apartmentId)
                           ->orderBy('order')
                           ->first();
        
        if ($firstImage) {
            $firstImage->update(['is_primary' => true]);
            Log::info('New primary image assigned', [
                'apartment_id' => $apartmentId,
                'image_id' => $firstImage->id,
            ]);
        }
    }
}