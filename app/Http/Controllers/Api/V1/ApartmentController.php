<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ApartmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Apartment API Controller
 * 
 * Handles HTTP requests for apartment resources.
 * Business logic delegated to ApartmentService.
 * 
 * @package App\Http\Controllers\Api\V1
 */
class ApartmentController extends Controller
{
    /**
     * Inject ApartmentService via constructor
     * 
     * @param ApartmentService $apartmentService
     */
    public function __construct(
        private ApartmentService $apartmentService
    ) {}

    /**
     * List all apartments
     * 
     * GET /api/v1/apartments
     * 
     * Query parameters:
     * - status: Filter by status (available|rented)
     * - bedrooms: Filter by number of bedrooms
     * - bathrooms: Filter by number of bathrooms
     * - min_price: Minimum monthly rent
     * - max_price: Maximum monthly rent
     * - sort_by: Sort field (price_asc|price_desc|bedrooms|square_feet)
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // Get query parameters for filtering
        $filters = $request->only([
            'status',
            'bedrooms',
            'bathrooms',
            'min_price',
            'max_price',
            'sort_by'
        ]);

        // Delegate to service layer
        if (!empty($filters)) {
            // Has filters - use search
            $apartments = $this->apartmentService->searchApartments($filters);
        } else {
            // No filters - get all
            $apartments = $this->apartmentService->getAllApartments();
        }

        // Return JSON response
        return response()->json([
            'success' => true,
            'message' => 'Apartments retrieved successfully',
            'data' => $apartments,
            'meta' => [
                'total' => $apartments->count(),
                'filters_applied' => !empty($filters),
            ]
        ], 200);
    }

    /**
     * Get single apartment by ID
     * 
     * GET /api/v1/apartments/{id}
     * 
     * @param int $id Apartment ID
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        // Delegate to service layer
        $apartment = $this->apartmentService->getApartmentById($id);

        // Check if apartment exists
        if (!$apartment) {
            return response()->json([
                'success' => false,
                'message' => 'Apartment not found',
                'error' => 'The requested apartment does not exist.'
            ], 404);
        }

        // Return JSON response
        return response()->json([
            'success' => true,
            'message' => 'Apartment retrieved successfully',
            'data' => $apartment
        ], 200);
    }
}