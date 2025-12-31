<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Amenity;
use App\Models\Apartment;

/**
 * Amenity API Test
 * 
 * Tests all amenity endpoints for correct functionality.
 */
class AmenityApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test listing all amenities
     */
    public function test_can_list_all_amenities(): void
    {
        $amenities = Amenity::factory()->count(5)->create();

        $response = $this->getJson('/api/v1/amenities');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Amenities retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'icon',
                        'category',
                        'is_popular',
                        'apartment_count',
                    ]
                ],
                'meta' => [
                    'total',
                    'grouped',
                ]
            ]);

        $this->assertEquals(5, $response->json('meta.total'));
    }

    /**
     * Test getting single amenity
     */
    public function test_can_get_single_amenity(): void
    {
        $amenity = Amenity::factory()->create([
            'name' => 'Swimming Pool',
            'category' => 'Recreational',
        ]);

        $response = $this->getJson("/api/v1/amenities/{$amenity->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Amenity retrieved successfully',
                'data' => [
                    'id' => $amenity->id,
                    'name' => 'Swimming Pool',
                    'category' => 'Recreational',
                ]
            ]);
    }

    /**
     * Test 404 for non-existent amenity
     */
    public function test_returns_404_for_non_existent_amenity(): void
    {
        $response = $this->getJson('/api/v1/amenities/999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Amenity not found',
            ]);
    }

    /**
     * Test amenities grouped by category
     */
    public function test_can_get_amenities_grouped_by_category(): void
    {
        Amenity::factory()->count(2)->create(['category' => 'Recreational']);
        Amenity::factory()->count(3)->create(['category' => 'Security']);

        $response = $this->getJson('/api/v1/amenities?grouped=true');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Amenities retrieved successfully (grouped by category)',
            ])
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'category',
                        'amenities',
                    ]
                ],
                'meta' => [
                    'grouped',
                    'categories',
                ]
            ]);

        $this->assertTrue($response->json('meta.grouped'));
    }

    /**
     * Test is_popular field based on apartment count
     */
    public function test_amenity_is_popular_when_used_by_many_apartments(): void
    {
        $amenity = Amenity::factory()->create();
        
        // Attach to 5 apartments (> 3, should be popular)
        $apartments = Apartment::factory()->count(5)->create();
        foreach ($apartments as $apartment) {
            $apartment->amenities()->attach($amenity);
        }

        $response = $this->getJson("/api/v1/amenities/{$amenity->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'is_popular' => true,
                    'apartment_count' => 5,
                ]
            ]);
    }

    /**
     * Test is_popular is false for amenities used by few apartments
     */
    public function test_amenity_is_not_popular_when_used_by_few_apartments(): void
    {
        $amenity = Amenity::factory()->create();
        
        // Attach to 2 apartments (<= 3, should not be popular)
        $apartments = Apartment::factory()->count(2)->create();
        foreach ($apartments as $apartment) {
            $apartment->amenities()->attach($amenity);
        }

        $response = $this->getJson("/api/v1/amenities/{$amenity->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'is_popular' => false,
                    'apartment_count' => 2,
                ]
            ]);
    }
}