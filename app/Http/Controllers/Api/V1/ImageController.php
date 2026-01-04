<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ImageService;
use App\Http\Resources\ImageResource;
use App\Http\Requests\StoreImageRequest;
use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Support\Facades\Log;

/**
 * Image Controller
 * 
 * Handles HTTP requests for image management operations.
 * This is a thin controller - all business logic is delegated to ImageService.
 * 
 * Endpoints:
 * - POST   /api/v1/apartments/{id}/images        - Upload image
 * - DELETE /api/v1/images/{id}                   - Delete image
 * - PATCH  /api/v1/images/{id}/primary           - Set as primary
 * 
 * @package App\Http\Controllers\Api\V1
 */
class ImageController extends Controller
{
    /**
     * Image service instance
     * 
     * @var ImageService
     */
    private $imageService;

    /**
     * Create a new ImageController instance
     * 
     * @param ImageService $imageService
     */
    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * Upload a new image for an apartment
     * 
     * POST /api/v1/apartments/{id}/images
     * 
     * Request:
     * - Content-Type: multipart/form-data
     * - Body: image (file), is_primary (boolean, optional)
     * 
     * @param StoreImageRequest $request
     * @param int $apartmentId
     * @return JsonResponse
     */
    public function store(StoreImageRequest $request, $apartmentId)
{
    Log::info('Received image upload request', [
        'apartment_id' => $apartmentId,
        'is_primary' => $request->boolean('is_primary', false),
    ]);
    try {
        // Delegate to service - validation already done by Form Request
        $image = $this->imageService->uploadToCloudinary(
            $request->file('image'),
            $apartmentId,
            $request->boolean('is_primary', false)
        );

        // Return success response with 201 Created
        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'data' => new ImageResource($image),
        ], 201);

    } catch (Exception $e) {
        // Log the error (service already logged details)
        Log::error('Image upload failed in controller', [
            'apartment_id' => $apartmentId,
            'error' => $e->getMessage(),
        ]);

        // Return error response
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

    /**
     * Delete an image
     * 
     * DELETE /api/v1/images/{id}
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Delegate to service
            $this->imageService->deleteFromCloudinary($id);

            // Return success with 204 No Content
            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully',
            ], 200);

        } catch (Exception $e) {
            // Check if image not found
            if (str_contains($e->getMessage(), 'not found')) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                ], 404);
            }

            // Other errors
            Log::error('Image deletion failed in controller', [
                'image_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Set an image as primary
     * 
     * PATCH /api/v1/images/{id}/primary
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function setPrimary($id)
    {
        try {
            // Delegate to service
            $image = $this->imageService->setImageAsPrimary($id);

            // Return success response
            return response()->json([
                'success' => true,
                'message' => 'Primary image updated successfully',
                'data' => new ImageResource($image),
            ], 200);

        } catch (Exception $e) {
            // Check if image not found
            if (str_contains($e->getMessage(), 'not found')) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                ], 404);
            }

            // Other errors
            Log::error('Set primary image failed in controller', [
                'image_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}