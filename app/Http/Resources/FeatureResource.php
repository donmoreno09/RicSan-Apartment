<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Feature Resource
 * 
 * Transforms Feature model into consistent JSON structure.
 * Used as nested resource within ApartmentResource.
 */
class FeatureResource extends JsonResource
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
            'value' => $this->value,
            'display' => $this->name . ': ' . $this->value,  // Formatted for UI
        ];
    }
}