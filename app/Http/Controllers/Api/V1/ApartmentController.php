<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ApartmentService;
use App\Http\Resources\ApartmentResource;
use App\Http\Resources\ApartmentCollection;
use App\Http\Requests\SearchApartmentRequest;
use Illuminate\Http\JsonResponse;

class ApartmentController extends Controller
{
    public function __construct(
        private ApartmentService $apartmentService
    ) {}

    /**
     * List all apartments
     * 
     * GET /api/v1/apartments
     */
    public function index(SearchApartmentRequest $request): JsonResponse
    {
        $filters = $request->validated();

        if (!empty($filters)) {
            $apartments = $this->apartmentService->searchApartments($filters);
        } else {
            $apartments = $this->apartmentService->getAllApartments();
        }

        // Use ApartmentCollection for transforming list
        return response()->json(
            new ApartmentCollection($apartments)
        );
    }

    /**
     * Get single apartment by ID
     * 
     * GET /api/v1/apartments/{id}
     */
    public function show(int $id): JsonResponse
    {
        $apartment = $this->apartmentService->getApartmentById($id);

        if (!$apartment) {
            return response()->json([
                'success' => false,
                'message' => 'Apartment not found',
                'error' => 'The requested apartment does not exist.'
            ], 404);
        }

        // Use ApartmentResource for transforming single apartment
        return response()->json([
            'success' => true,
            'message' => 'Apartment retrieved successfully',
            'data' => new ApartmentResource($apartment)
        ]);
    }
}