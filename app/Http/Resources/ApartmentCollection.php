<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Apartment Collection
 * 
 * Transforms collection of apartments and adds metadata.
 */
class ApartmentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->collection->count(),
                'available_count' => $this->collection->where('status', 'available')->count(),
                'rented_count' => $this->collection->where('status', 'rented')->count(),
            ],
        ];
    }
}