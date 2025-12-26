<?php

namespace App\Services;

use App\Models\Amenity;
use App\Repositories\Contracts\AmenityRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

/**
 * Amenity Service
 * 
 * Handles business logic for amenity operations.
 */
class AmenityService
{
    /**
     * Create a new service instance.
     *
     * @param AmenityRepositoryInterface $amenityRepository
     */
    public function __construct(
        private AmenityRepositoryInterface $amenityRepository
    ) {}

    /**
     * Get all amenities.
     *
     * @return Collection
     */
    public function getAllAmenities(): Collection
    {
        return $this->amenityRepository->all();
    }

    /**
     * Get amenity by ID.
     *
     * @param int $id
     * @return Amenity|null
     */
    public function getAmenityById(int $id): ?Amenity
    {
        return $this->amenityRepository->find($id);
    }

    /**
     * Get amenities grouped by category.
     *
     * @return array
     */
    public function getAmenitiesByCategory(): array
    {
        $amenities = $this->amenityRepository->all();

        return [
            'building' => $amenities->where('category', 'building')->values(),
            'apartment' => $amenities->where('category', 'apartment')->values(),
            'area' => $amenities->where('category', 'area')->values(),
        ];
    }

    /**
     * Get popular amenities (most used in apartments).
     *
     * @param int $limit
     * @return Collection
     */
    public function getPopularAmenities(int $limit = 10): Collection
    {
        return $this->amenityRepository->withApartmentCount()
            ->take($limit);
    }

    /**
     * Create a new amenity.
     *
     * @param array $data
     * @return Amenity
     */
    public function createAmenity(array $data): Amenity
    {
        try {
            return $this->amenityRepository->create([
                'name' => $data['name'],
                'icon' => $data['icon'] ?? null,
                'category' => $data['category'] ?? null,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to create amenity: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Update an amenity.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function updateAmenity(int $id, array $data): bool
    {
        try {
            return $this->amenityRepository->update($id, [
                'name' => $data['name'] ?? null,
                'icon' => $data['icon'] ?? null,
                'category' => $data['category'] ?? null,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update amenity: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Delete an amenity.
     *
     * @param int $id
     * @return bool
     */
    public function deleteAmenity(int $id): bool
    {
        try {
            return $this->amenityRepository->delete($id);
        } catch (\Exception $e) {
            Log::error('Failed to delete amenity: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get amenity statistics.
     *
     * @return array
     */
    public function getStatistics(): array
    {
        $amenities = $this->amenityRepository->all();

        return [
            'total' => $amenities->count(),
            'building' => $amenities->where('category', 'building')->count(),
            'apartment' => $amenities->where('category', 'apartment')->count(),
            'area' => $amenities->where('category', 'area')->count(),
        ];
    }
}
