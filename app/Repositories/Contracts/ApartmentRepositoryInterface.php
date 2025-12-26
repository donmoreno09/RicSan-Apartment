<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Apartment;

/**
 * Apartment Repository Interface
 * 
 * Defines the contract for apartment data access.
 * All apartment repositories must implement these methods.
 */
interface ApartmentRepositoryInterface
{
    /**
     * Get all apartments.
     *
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Get all apartments with relationships loaded.
     *
     * @param array $relations
     * @return Collection
     */
    public function allWithRelations(array $relations = []): Collection;

    /**
     * Find apartment by ID.
     *
     * @param int $id
     * @return Apartment|null
     */
    public function find(int $id): ?Apartment;

    /**
     * Find apartment by ID with relationships.
     *
     * @param int $id
     * @param array $relations
     * @return Apartment|null
     */
    public function findWithRelations(int $id, array $relations = []): ?Apartment;

    /**
     * Get all available apartments.
     *
     * @return Collection
     */
    public function getAllAvailable(): Collection;

    /**
     * Get apartments by price range.
     *
     * @param float $min
     * @param float $max
     * @return Collection
     */
    public function getByPriceRange(float $min, float $max): Collection;

    /**
     * Get apartments by number of bedrooms.
     *
     * @param int $bedrooms
     * @return Collection
     */
    public function getByBedrooms(int $bedrooms): Collection;

    /**
     * Search apartments by title or description.
     *
     * @param string $query
     * @return Collection
     */
    public function search(string $query): Collection;

    /**
     * Create a new apartment.
     *
     * @param array $data
     * @return Apartment
     */
    public function create(array $data): Apartment;

    /**
     * Update an apartment.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete an apartment.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Get apartments paginated.
     *
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(int $perPage = 15);
}
