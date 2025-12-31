<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Apartment;
use App\Models\Amenity;

/**
 * Statistics API Test
 * 
 * Tests statistics endpoint for correct calculations.
 */
class StatisticsApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test getting statistics
     */
    public function test_can_get_statistics(): void
    {
        // Create test data
        Apartment::factory()->count(3)->create(['status' => 'available']);
        Apartment::factory()->count(2)->create(['status' => 'rented']);
        Amenity::factory()->count(10)->create();

        $response = $this->getJson('/api/v1/statistics');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Statistics retrieved successfully',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'apartments' => [
                        'total',
                        'available',
                        'rented',
                        'occupancy_rate',
                    ],
                    'pricing' => [
                        'average',
                        'minimum',
                        'maximum',
                        'currency',
                    ],
                    'amenities' => [
                        'total',
                    ],
                    'generated_at',
                ]
            ]);

        // Verify counts
        $this->assertEquals(5, $response->json('data.apartments.total'));
        $this->assertEquals(3, $response->json('data.apartments.available'));
        $this->assertEquals(2, $response->json('data.apartments.rented'));
        $this->assertEquals(10, $response->json('data.amenities.total'));
    }

    /**
     * Test occupancy rate calculation
     */
    public function test_calculates_occupancy_rate_correctly(): void
    {
        // 2 rented out of 10 total = 20% occupancy
        Apartment::factory()->count(8)->create(['status' => 'available']);
        Apartment::factory()->count(2)->create(['status' => 'rented']);

        $response = $this->getJson('/api/v1/statistics');

        $response->assertStatus(200);
        
        $occupancyRate = $response->json('data.apartments.occupancy_rate');
        $this->assertEquals(20, $occupancyRate);
    }

    /**
     * Test pricing statistics
     */
    public function test_calculates_pricing_statistics_correctly(): void
    {
        Apartment::factory()->create(['price' => 1000]);
        Apartment::factory()->create(['price' => 2000]);
        Apartment::factory()->create(['price' => 3000]);

        $response = $this->getJson('/api/v1/statistics');

        $response->assertStatus(200);

        $pricing = $response->json('data.pricing');
        $this->assertEquals(2000, $pricing['average']); // (1000+2000+3000)/3
        $this->assertEquals(1000, $pricing['minimum']);
        $this->assertEquals(3000, $pricing['maximum']);
        $this->assertEquals('USD', $pricing['currency']);
    }

    /**
     * Test statistics with no apartments
     */
    public function test_handles_empty_database_gracefully(): void
    {
        $response = $this->getJson('/api/v1/statistics');

        $response->assertStatus(200);

        $apartments = $response->json('data.apartments');
        $this->assertEquals(0, $apartments['total']);
        $this->assertEquals(0, $apartments['available']);
        $this->assertEquals(0, $apartments['rented']);
        $this->assertEquals(0, $apartments['occupancy_rate']);
    }
}