<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\AmenityService;
use App\Http\Resources\AmenityResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function __construct(
        private AmenityService $amenityService
    ) {}

    /**
     * List all amenities
     */
    public function index(Request $request): JsonResponse
    {
        if ($request->query('grouped') === 'true') {
            $amenities = $this->amenityService->getAmenitiesByCategory();
            
            // Transform grouped amenities
            $transformed = collect($amenities)->map(function ($categoryAmenities, $category) {
                return [
                    'category' => $category,
                    'amenities' => AmenityResource::collection($categoryAmenities),
                ];
            })->values();
            
            return response()->json([
                'success' => true,
                'message' => 'Amenities retrieved successfully (grouped by category)',
                'data' => $transformed,
                'meta' => [
                    'grouped' => true,
                    'categories' => $transformed->count()
                ]
            ]);
        }

        $amenities = $this->amenityService->getAllAmenities();

        return response()->json([
            'success' => true,
            'message' => 'Amenities retrieved successfully',
            'data' => AmenityResource::collection($amenities),
            'meta' => [
                'total' => $amenities->count(),
                'grouped' => false
            ]
        ]);
    }

    /**
     * Get single amenity by ID
     */
    public function show(int $id): JsonResponse
    {
        $amenity = $this->amenityService->getAmenityById($id);

        if (!$amenity) {
            return response()->json([
                'success' => false,
                'message' => 'Amenity not found',
                'error' => 'The requested amenity does not exist.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Amenity retrieved successfully',
            'data' => new AmenityResource($amenity)
        ]);
    }
}