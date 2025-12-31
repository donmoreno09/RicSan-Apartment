<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Error Handling Test
 * 
 * Tests that all error scenarios return consistent responses.
 */
class ErrorHandlingTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test 404 for invalid endpoint
     */
    public function test_returns_404_for_invalid_endpoint(): void
    {
        $response = $this->getJson('/api/v1/invalid-endpoint');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'The requested endpoint does not exist.',
            ]);
    }

    /**
     * Test 405 for wrong HTTP method
     */
    public function test_returns_405_for_wrong_http_method(): void
    {
        $response = $this->postJson('/api/v1/statistics');

        $response->assertStatus(405)
            ->assertJson([
                'success' => false,
                'message' => 'The HTTP method is not allowed for this endpoint.',
            ]);
    }

    /**
     * Test consistent error response format
     */
    public function test_error_responses_have_consistent_format(): void
    {
        $response = $this->getJson('/api/v1/apartments/999');

        $response->assertStatus(404)
            ->assertJsonStructure([
                'success',
                'message',
            ])
            ->assertJson([
                'success' => false,
            ]);
    }

    /**
     * Test validation error response format
     */
    public function test_validation_errors_have_consistent_format(): void
    {
        $response = $this->getJson('/api/v1/apartments?bedrooms=invalid');

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ])
            ->assertJson([
                'success' => false,
            ]);
    }
}