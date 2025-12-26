<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Amenity;

/**
 * Amenity Repository Interface
 * 
 * Defines the contract for amenity data access.
 */
interface AmenityRepositoryInterface
{
    /**
     * Get all amenities.
     *
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Find amenity by ID.
     *
     * @param int $id
     * @return Amenity|null
     */
    public function find(int $id): ?Amenity;

    /**
     * Get amenities by category.
     *
     * @param string $category
     * @return Collection
     */
    public function getByCategory(string $category): Collection;

    /**
     * Get amenities with apartment count.
     *
     * @return Collection
     */
    public function withApartmentCount(): Collection;

    /**
     * Create a new amenity.
     *
     * @param array $data
     * @return Amenity
     */
    public function create(array $data): Amenity;

    /**
     * Update an amenity.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete an amenity.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;
}
