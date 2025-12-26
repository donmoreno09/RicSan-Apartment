<?php

namespace App\Services;

use App\Models\Apartment;
use App\Repositories\Contracts\ApartmentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Apartment Service
 * 
 * Handles business logic for apartment operations.
 * Coordinates multiple repositories and manages transactions.
 */
class ApartmentService
{
    /**
     * Create a new service instance.
     *
     * @param ApartmentRepositoryInterface $apartmentRepository
     */
    public function __construct(
        private ApartmentRepositoryInterface $apartmentRepository
    ) {}

    /**
     * Get all apartments with their relationships.
     *
     * @return Collection
     */
    public function getAllApartments(): Collection
    {
        return $this->apartmentRepository->allWithRelations([
            'images',
            'amenities',
            'features'
        ]);
    }

    /**
     * Get available apartments only.
     *
     * @return Collection
     */
    public function getAvailableApartments(): Collection
    {
        return $this->apartmentRepository->getAllAvailable();
    }

    /**
     * Get apartment by ID with all relationships.
     *
     * @param int $id
     * @return Apartment|null
     */
    public function getApartmentById(int $id): ?Apartment
    {
        return $this->apartmentRepository->findWithRelations($id, [
            'images',
            'amenities',
            'features'
        ]);
    }

    /**
     * Search apartments with filters.
     *
     * @param array $filters
     * @return Collection
     */
    public function searchApartments(array $filters): Collection
    {
        // Text search
        if (!empty($filters['query'])) {
            return $this->apartmentRepository->search($filters['query']);
        }

        // Price range filter
        if (!empty($filters['min_price']) && !empty($filters['max_price'])) {
            return $this->apartmentRepository->getByPriceRange(
                $filters['min_price'],
                $filters['max_price']
            );
        }

        // Bedroom filter
        if (!empty($filters['bedrooms'])) {
            return $this->apartmentRepository->getByBedrooms($filters['bedrooms']);
        }

        // Default: return all available
        return $this->getAvailableApartments();
    }

    /**
     * Create a new apartment with relationships.
     *
     * @param array $data
     * @return Apartment
     * @throws \Exception
     */
    public function createApartment(array $data): Apartment
    {
        try {
            DB::beginTransaction();

            // Create apartment
            $apartment = $this->apartmentRepository->create([
                'title' => $data['title'],
                'description' => $data['description'],
                'price' => $data['price'],
                'bedrooms' => $data['bedrooms'],
                'bathrooms' => $data['bathrooms'],
                'area_sqm' => $data['area_sqm'],
                'floor' => $data['floor'],
                'status' => $data['status'] ?? 'available',
            ]);

            // Attach amenities if provided
            if (!empty($data['amenity_ids'])) {
                $apartment->amenities()->attach($data['amenity_ids']);
            }

            // Create features if provided
            if (!empty($data['features'])) {
                foreach ($data['features'] as $feature) {
                    $apartment->features()->create([
                        'name' => $feature['name'],
                        'value' => $feature['value'],
                    ]);
                }
            }

            // Create images if provided
            if (!empty($data['images'])) {
                foreach ($data['images'] as $index => $image) {
                    $apartment->images()->create([
                        'url' => $image['url'],
                        'alt_text' => $image['alt_text'] ?? null,
                        'is_primary' => $index === 0, // First image is primary
                        'order' => $index,
                    ]);
                }
            }

            DB::commit();

            // Reload relationships
            return $this->getApartmentById($apartment->id);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create apartment: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Update an apartment with relationships.
     *
     * @param int $id
     * @param array $data
     * @return Apartment|null
     * @throws \Exception
     */
    public function updateApartment(int $id, array $data): ?Apartment
    {
        try {
            DB::beginTransaction();

            // Update basic apartment data
            $updated = $this->apartmentRepository->update($id, [
                'title' => $data['title'] ?? null,
                'description' => $data['description'] ?? null,
                'price' => $data['price'] ?? null,
                'bedrooms' => $data['bedrooms'] ?? null,
                'bathrooms' => $data['bathrooms'] ?? null,
                'area_sqm' => $data['area_sqm'] ?? null,
                'floor' => $data['floor'] ?? null,
                'status' => $data['status'] ?? null,
            ]);

            if (!$updated) {
                DB::rollBack();
                return null;
            }

            $apartment = $this->apartmentRepository->find($id);

            // Update amenities if provided
            if (isset($data['amenity_ids'])) {
                $apartment->amenities()->sync($data['amenity_ids']);
            }

            // Update features if provided
            if (isset($data['features'])) {
                // Delete old features
                $apartment->features()->delete();
                
                // Create new features
                foreach ($data['features'] as $feature) {
                    $apartment->features()->create([
                        'name' => $feature['name'],
                        'value' => $feature['value'],
                    ]);
                }
            }

            DB::commit();

            // Reload relationships
            return $this->getApartmentById($id);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update apartment: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Delete an apartment.
     *
     * @param int $id
     * @return bool
     */
    public function deleteApartment(int $id): bool
    {
        try {
            return $this->apartmentRepository->delete($id);
        } catch (\Exception $e) {
            Log::error('Failed to delete apartment: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get apartment statistics.
     *
     * @return array
     */
    public function getStatistics(): array
    {
        $allApartments = $this->apartmentRepository->all();

        return [
            'total' => $allApartments->count(),
            'available' => $allApartments->where('status', 'available')->count(),
            'rented' => $allApartments->where('status', 'rented')->count(),
            'maintenance' => $allApartments->where('status', 'maintenance')->count(),
            'average_price' => round($allApartments->avg('price'), 2),
            'min_price' => $allApartments->min('price'),
            'max_price' => $allApartments->max('price'),
        ];
    }

    /**
     * Get featured apartments (available, sorted by price desc).
     *
     * @param int $limit
     * @return Collection
     */
    public function getFeaturedApartments(int $limit = 3): Collection
    {
        return $this->apartmentRepository->getAllAvailable()
            ->sortByDesc('price')
            ->take($limit);
    }
}
