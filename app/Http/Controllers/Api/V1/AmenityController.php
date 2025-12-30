<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\AmenityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Amenity API Controller
 * 
 * Handles HTTP requests for amenity resources.
 * Business logic delegated to AmenityService.
 * 
 * @package App\Http\Controllers\Api\V1
 */
class AmenityController extends Controller
{
    /**
     * Inject AmenityService via constructor
     * 
     * @param AmenityService $amenityService
     */
    public function __construct(
        private AmenityService $amenityService
    ) {}

    /**
     * List all amenities
     * 
     * GET /api/v1/amenities
     * 
     * Query parameters:
     * - grouped: Return amenities grouped by category (true|false)
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // Check if grouped by category requested
        if ($request->query('grouped') === 'true') {
            $amenities = $this->amenityService->getAmenitiesByCategory();
            
            return response()->json([
                'success' => true,
                'message' => 'Amenities retrieved successfully (grouped by category)',
                'data' => $amenities,
                'meta' => [
                    'grouped' => true,
                    'categories' => count($amenities)
                ]
            ], 200);
        }

        // Get all amenities (flat list)
        $amenities = $this->amenityService->getAllAmenities();

        return response()->json([
            'success' => true,
            'message' => 'Amenities retrieved successfully',
            'data' => $amenities,
            'meta' => [
                'total' => $amenities->count(),
                'grouped' => false
            ]
        ], 200);
    }

    /**
     * Get single amenity by ID
     * 
     * GET /api/v1/amenities/{id}
     * 
     * @param int $id Amenity ID
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        // Delegate to service layer
        $amenity = $this->amenityService->getAmenityById($id);

        // Check if amenity exists
        if (!$amenity) {
            return response()->json([
                'success' => false,
                'message' => 'Amenity not found',
                'error' => 'The requested amenity does not exist.'
            ], 404);
        }

        // Return JSON response
        return response()->json([
            'success' => true,
            'message' => 'Amenity retrieved successfully',
            'data' => $amenity
        ], 200);
    }
}