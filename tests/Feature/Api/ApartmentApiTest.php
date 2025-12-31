<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Apartment;
use App\Models\Amenity;
use App\Models\Image;
use App\Models\Feature;

/**
 * Apartment API Test
 * 
 * Tests all apartment endpoints for correct functionality.
 */
class ApartmentApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test health check endpoint
     */
    public function test_health_check_returns_ok(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'ok',
                'message' => 'API is running',
            ])
            ->assertJsonStructure([
                'status',
                'message',
                'version',
                'timestamp',
            ]);
    }

    /**
     * Test listing all apartments
     */
    public function test_can_list_all_apartments(): void
    {
        // Create test apartments
        Apartment::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/apartments');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Apartments retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'data' => [
                        '*' => [
                            'id',
                            'title',
                            'slug',
                            'description',
                            'specifications',
                            'price',
                            'status',
                            'is_available',
                        ]
                    ],
                    'meta' => [
                        'total',
                        'available_count',
                        'rented_count',
                    ]
                ]
            ]);

        // Verify count
        $this->assertEquals(3, $response->json('data.meta.total'));
    }

    /**
     * Test getting single apartment
     */
    public function test_can_get_single_apartment(): void
    {
        $apartment = Apartment::factory()
            ->has(Image::factory()->count(3))
            ->has(Feature::factory()->count(2))
            ->create();

        $apartment->amenities()->attach(
            Amenity::factory()->count(5)->create()
        );

        $response = $this->getJson("/api/v1/apartments/{$apartment->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Apartment retrieved successfully',
                'data' => [
                    'id' => $apartment->id,
                    'title' => $apartment->title,
                ]
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'title',
                    'images',
                    'amenities',
                    'features',
                    'primary_image',
                    'image_count',
                    'amenity_count',
                ]
            ]);

        // Verify relationships loaded
        $this->assertEquals(3, $response->json('data.image_count'));
        $this->assertEquals(5, $response->json('data.amenity_count'));
    }

    /**
     * Test 404 for non-existent apartment
     */
    public function test_returns_404_for_non_existent_apartment(): void
    {
        $response = $this->getJson('/api/v1/apartments/999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Apartment not found',
            ]);
    }

    /**
     * Test filtering apartments by status
     */
    public function test_can_filter_apartments_by_status(): void
    {
        Apartment::factory()->count(2)->create(['status' => 'available']);
        Apartment::factory()->count(3)->create(['status' => 'rented']);

        $response = $this->getJson('/api/v1/apartments?status=available');

        $response->assertStatus(200);

        // Should only return available apartments
        $apartments = $response->json('data.data');
        $this->assertCount(2, $apartments);
        
        foreach ($apartments as $apartment) {
            $this->assertTrue($apartment['is_available']);
        }
    }

    /**
     * Test filtering apartments by bedrooms
     */
    public function test_can_filter_apartments_by_bedrooms(): void
    {
        Apartment::factory()->create(['bedrooms' => 2]);
        Apartment::factory()->create(['bedrooms' => 3]);
        Apartment::factory()->create(['bedrooms' => 2]);

        $response = $this->getJson('/api/v1/apartments?bedrooms=2');

        $response->assertStatus(200);

        $apartments = $response->json('data.data');
        $this->assertCount(2, $apartments);
    }

    /**
     * Test filtering apartments by price range
     */
    public function test_can_filter_apartments_by_price_range(): void
    {
        Apartment::factory()->create(['price' => 1000]);
        Apartment::factory()->create(['price' => 2500]);
        Apartment::factory()->create(['price' => 4000]);

        $response = $this->getJson('/api/v1/apartments?min_price=2000&max_price=3000');

        $response->assertStatus(200);

        $apartments = $response->json('data.data');
        $this->assertCount(1, $apartments);
        $this->assertEquals(2500, $apartments[0]['price']['amount']);
    }

    /**
     * Test validation error for invalid bedrooms
     */
    public function test_validation_fails_for_invalid_bedrooms(): void
    {
        $response = $this->getJson('/api/v1/apartments?bedrooms=abc');

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'The given data was invalid.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => [
                    'bedrooms'
                ]
            ]);
    }

    /**
     * Test validation fails when max_price < min_price
     */
    public function test_validation_fails_for_invalid_price_range(): void
    {
        $response = $this->getJson('/api/v1/apartments?min_price=3000&max_price=1000');

        $response->assertStatus(422)
            ->assertJsonFragment([
                'success' => false,
            ])
            ->assertJsonStructure([
                'errors' => ['max_price']
            ]);
    }

    /**
     * Test validation fails for invalid status
     */
    public function test_validation_fails_for_invalid_status(): void
    {
        $response = $this->getJson('/api/v1/apartments?status=invalid');

        $response->assertStatus(422)
            ->assertJsonStructure([
                'errors' => ['status']
            ]);
    }

    /**
     * Test multiple filters work together
     */
    public function test_can_apply_multiple_filters(): void
    {
        Apartment::factory()->create([
            'bedrooms' => 2,
            'bathrooms' => 1,
            'price' => 2000,
            'status' => 'available'
        ]);

        Apartment::factory()->create([
            'bedrooms' => 2,
            'bathrooms' => 2,
            'price' => 3500,
            'status' => 'rented'
        ]);

        Apartment::factory()->create([
            'bedrooms' => 3,
            'bathrooms' => 2,
            'price' => 2500,
            'status' => 'available'
        ]);

        $response = $this->getJson('/api/v1/apartments?bedrooms=2&status=available&min_price=0&max_price=2500');

        $response->assertStatus(200);

        $apartments = $response->json('data.data');
        $this->assertCount(1, $apartments);
        $this->assertEquals(2, $apartments[0]['specifications']['bedrooms']);
        $this->assertTrue($apartments[0]['is_available']);
    }
}