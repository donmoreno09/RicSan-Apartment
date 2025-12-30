<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ApartmentService;
use App\Services\AmenityService;
use Illuminate\Http\JsonResponse;

/**
 * Statistics API Controller
 * 
 * Provides dashboard statistics and analytics.
 * 
 * @package App\Http\Controllers\Api\V1
 */
class StatisticsController extends Controller
{
    /**
     * Inject required services
     * 
     * @param ApartmentService $apartmentService
     * @param AmenityService $amenityService
     */
    public function __construct(
        private ApartmentService $apartmentService,
        private AmenityService $amenityService
    ) {}

    /**
     * Get dashboard statistics
     * 
     * GET /api/v1/statistics
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Get statistics from service layer
        $apartmentStats = $this->apartmentService->getStatistics();
        $amenities = $this->amenityService->getAllAmenities();

        // Build statistics response
        $statistics = [
            'apartments' => [
                'total' => $apartmentStats['total'],
                'available' => $apartmentStats['available'],
                'rented' => $apartmentStats['rented'],
                'occupancy_rate' => $apartmentStats['rented'] > 0 
                    ? round(($apartmentStats['rented'] / $apartmentStats['total']) * 100, 2) 
                    : 0,
            ],
            'pricing' => [
                'average' => $apartmentStats['average_price'],
                'minimum' => $apartmentStats['min_price'],
                'maximum' => $apartmentStats['max_price'],
                'currency' => 'USD',
            ],
            'amenities' => [
                'total' => $amenities->count(),
            ],
            'generated_at' => now()->toDateTimeString(),
        ];

        return response()->json([
            'success' => true,
            'message' => 'Statistics retrieved successfully',
            'data' => $statistics
        ], 200);
    }
}