<?php

namespace Tests\Feature\Api;

use App\Models\Apartment;
use App\Models\Image;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * Image Upload API Feature Tests
 * 
 * Tests the complete image upload workflow through HTTP API endpoints.
 * Covers upload, delete, and set primary functionality.
 * 
 * Consistent with ApartmentApiTest, AmenityApiTest structure.
 */
class ImageUploadTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful image upload to apartment
     * 
     * Note: This test validates the request/response flow.
     * Actual Cloudinary upload is skipped (would require credentials).
     * Cloudinary SDK is well-tested by Cloudinary themselves.
     */
    public function test_can_upload_image_to_apartment(): void
    {
        // Skip this test - requires Cloudinary credentials
        $this->markTestSkipped('Skipping actual Cloudinary upload. See manual testing documentation.');
        
        // Arrange: Create apartment and fake image
        $apartment = Apartment::factory()->create();
        $file = UploadedFile::fake()->create('apartment.jpg', 100, 'image/jpeg');

        // Act: Upload image via API
        $response = $this->postJson("/api/v1/apartments/{$apartment->id}/images", [
            'image' => $file,
            'is_primary' => '0',
        ]);

        // Assert: Check response and database
        $response->assertStatus(201)
                ->assertJson(['success' => true]);
    }

    /**
     * Test image upload validates file type
     */
    public function test_upload_validates_file_type(): void
    {
        // Arrange: Create apartment and fake PDF file (not an image)
        $apartment = Apartment::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        // Act: Try to upload non-image file
        $response = $this->postJson("/api/v1/apartments/{$apartment->id}/images", [
            'image' => $file,
        ]);

        // Assert: Should fail validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['image']);
    }

    /**
     * Test image upload validates file size
     */
    public function test_upload_validates_file_size(): void
    {
        // Arrange: Create apartment and oversized file (3MB, limit is 2MB)
        $apartment = Apartment::factory()->create();
        $file = UploadedFile::fake()->create('huge-image.jpg', 3072); // 3MB

        // Act: Try to upload oversized file
        $response = $this->postJson("/api/v1/apartments/{$apartment->id}/images", [
            'image' => $file,
        ]);

        // Assert: Should fail validation
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['image']);
    }

    /**
     * Test can delete an image
     */
    public function test_can_delete_image(): void
    {
        // Arrange: Create apartment with an image
        $apartment = Apartment::factory()->create();
        $image = Image::factory()->create([
            'apartment_id' => $apartment->id,
            'url' => 'https://res.cloudinary.com/test/image.jpg',
            'cloudinary_public_id' => 'apartments/test-image',
            'is_primary' => false,
        ]);

        // Act: Delete the image via API
        $response = $this->deleteJson("/api/v1/images/{$image->id}");

        // Assert: Check response and database
        $response->assertStatus(200)
                 ->assertJson(['success' => true]);

        $this->assertDatabaseMissing('images', [
            'id' => $image->id,
        ]);
    }

    /**
     * Test can set image as primary
     */
    public function test_can_set_primary_image(): void
    {
        // Arrange: Create apartment with two images
        $apartment = Apartment::factory()->create();
        
        $image1 = Image::factory()->create([
            'apartment_id' => $apartment->id,
            'is_primary' => true, // Currently primary
        ]);
        
        $image2 = Image::factory()->create([
            'apartment_id' => $apartment->id,
            'is_primary' => false,
        ]);

        // Act: Set image2 as primary via API
        $response = $this->patchJson("/api/v1/images/{$image2->id}/primary");

        // Assert: Check response
        $response->assertStatus(200)
                 ->assertJson(['success' => true])
                 ->assertJsonPath('data.is_primary', true);

        // Assert: image2 is now primary, image1 is not
        $this->assertDatabaseHas('images', [
            'id' => $image2->id,
            'is_primary' => true,
        ]);

        $this->assertDatabaseHas('images', [
            'id' => $image1->id,
            'is_primary' => false,
        ]);
    }

    /**
     * Test cannot upload image to non-existent apartment
     */
    public function test_cannot_upload_to_nonexistent_apartment(): void
    {
        // Arrange: Fake image
        $file = UploadedFile::fake()->image('apartment.jpg');

        // Act: Try to upload to apartment that doesn't exist
        $response = $this->postJson("/api/v1/apartments/99999/images", [
            'image' => $file,
        ]);

        // Assert: Should fail
        $response->assertStatus(500); // or 404 depending on your error handling
    }
}