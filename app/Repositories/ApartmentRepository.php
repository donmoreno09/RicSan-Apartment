<?php

namespace App\Repositories;

use App\Models\Apartment;
use App\Repositories\Contracts\ApartmentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * Apartment Repository
 * 
 * Concrete implementation of ApartmentRepositoryInterface.
 * Handles all apartment data access using Eloquent ORM.
 */
class ApartmentRepository implements ApartmentRepositoryInterface
{
    /**
     * Create a new repository instance.
     *
     * @param Apartment $model
     */
    public function __construct(
        protected Apartment $model
    ) {}

    /**
     * Get all apartments.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * Get all apartments with relationships loaded.
     *
     * @param array $relations
     * @return Collection
     */
    public function allWithRelations(array $relations = []): Collection
    {
        return $this->model->with($relations)->get();
    }

    /**
     * Find apartment by ID.
     *
     * @param int $id
     * @return Apartment|null
     */
    public function find(int $id): ?Apartment
    {
        return $this->model->find($id);
    }

    /**
     * Find apartment by ID with relationships.
     *
     * @param int $id
     * @param array $relations
     * @return Apartment|null
     */
    public function findWithRelations(int $id, array $relations = []): ?Apartment
    {
        return $this->model->with($relations)->find($id);
    }

    /**
     * Get all available apartments.
     *
     * @return Collection
     */
    public function getAllAvailable(): Collection
    {
        return $this->model->available()
            ->with(['images', 'amenities', 'features'])
            ->orderBy('price')
            ->get();
    }

    /**
     * Get apartments by price range.
     *
     * @param float $min
     * @param float $max
     * @return Collection
     */
    public function getByPriceRange(float $min, float $max): Collection
    {
        return $this->model->priceRange($min, $max)
            ->with(['images', 'amenities'])
            ->get();
    }

    /**
     * Get apartments by number of bedrooms.
     *
     * @param int $bedrooms
     * @return Collection
     */
    public function getByBedrooms(int $bedrooms): Collection
    {
        return $this->model->where('bedrooms', $bedrooms)
            ->with(['images', 'amenities'])
            ->get();
    }

    /**
     * Search apartments by title or description.
     *
     * @param string $query
     * @return Collection
     */
    public function search(string $query): Collection
    {
        return $this->model->where(function ($q) use ($query) {
            $q->where('title', 'like', "%{$query}%")
              ->orWhere('description', 'like', "%{$query}%");
        })
        ->with(['images', 'amenities'])
        ->get();
    }

    /**
     * Create a new apartment.
     *
     * @param array $data
     * @return Apartment
     */
    public function create(array $data): Apartment
    {
        return $this->model->create($data);
    }

    /**
     * Update an apartment.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $apartment = $this->find($id);
        
        if (!$apartment) {
            return false;
        }
        
        return $apartment->update($data);
    }

    /**
     * Delete an apartment.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $apartment = $this->find($id);
        
        if (!$apartment) {
            return false;
        }
        
        return $apartment->delete();
    }

    /**
     * Get apartments paginated.
     *
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(int $perPage = 15)
    {
        return $this->model->with(['images', 'amenities'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}

