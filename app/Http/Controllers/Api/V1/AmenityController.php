<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\AmenityService;
use App\Http\Resources\AmenityResource;
use App\Http\Responses\ApiResponse; 
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
            
            return ApiResponse::success(
                $transformed,
                'Amenities retrieved successfully (grouped by category)',
                200,
                [
                    'grouped' => true,
                    'categories' => $transformed->count()
                ]
            );
        }

        $amenities = $this->amenityService->getAllAmenities();

        return ApiResponse::success(
            AmenityResource::collection($amenities),
            'Amenities retrieved successfully',
            200,
            [
                'total' => $amenities->count(),
                'grouped' => false
            ]
        );
    }

    /**
     * Get single amenity by ID
     */
    public function show(int $id): JsonResponse
    {
        $amenity = $this->amenityService->getAmenityById($id);

        if (!$amenity) {
            return ApiResponse::notFound('Amenity not found');
        }

        return ApiResponse::success(
            new AmenityResource($amenity),
            'Amenity retrieved successfully'
        );
    }
}