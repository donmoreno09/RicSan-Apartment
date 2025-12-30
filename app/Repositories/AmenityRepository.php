<?php

namespace App\Repositories;

use App\Models\Amenity;
use App\Repositories\Contracts\AmenityRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * Amenity Repository
 * 
 * Concrete implementation of AmenityRepositoryInterface.
 * Handles all amenity data access using Eloquent ORM.
 */
class AmenityRepository implements AmenityRepositoryInterface
{
    /**
     * Create a new repository instance.
     *
     * @param Amenity $model
     */
    public function __construct(
        protected Amenity $model
    ) {}

    /**
     * Get all amenities.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->withCount('apartments')->orderBy('category')->orderBy('name')->get();
    }

    /**
     * Find amenity by ID.
     *
     * @param int $id
     * @return Amenity|null
     */
    public function find(int $id): ?Amenity
    {
        return $this->model->withCount('apartments')->find($id);
    }

    /**
     * Get amenities by category.
     *
     * @param string $category
     * @return Collection
     */
    public function getByCategory(string $category): Collection
    {
        return $this->model->withCount('apartments')->category($category)->orderBy('name')->get();
    }

    /**
     * Get amenities with apartment count.
     *
     * @return Collection
     */
    public function withApartmentCount(): Collection
    {
        return $this->model->withCount('apartments')
            ->orderBy('apartments_count', 'desc')
            ->get();
    }

    /**
     * Create a new amenity.
     *
     * @param array $data
     * @return Amenity
     */
    public function create(array $data): Amenity
    {
        return $this->model->create($data);
    }

    /**
     * Update an amenity.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $amenity = $this->find($id);
        
        if (!$amenity) {
            return false;
        }
        
        return $amenity->update($data);
    }

    /**
     * Delete an amenity.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $amenity = $this->find($id);
        
        if (!$amenity) {
            return false;
        }
        
        return $amenity->delete();
    }
}
