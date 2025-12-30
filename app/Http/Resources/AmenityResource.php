<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Amenity Resource
 * 
 * Transforms Amenity model into consistent JSON structure.
 */
class AmenityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
            'category' => $this->category,
            
            // Computed field - is this amenity popular?
            'is_popular' => $this->apartments_count > 3 ?? false,
            
            // Only include apartment count if it's loaded
            'apartment_count' => $this->when(
                isset($this->apartments_count),
                $this->apartments_count
            ),
        ];
    }
}