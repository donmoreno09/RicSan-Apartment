<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Image Resource
 * 
 * Transforms Image model into consistent JSON structure.
 * Used as nested resource within ApartmentResource.
 */
class ImageResource extends JsonResource
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
            'url' => $this->url,
            'order' => $this->order,
            'is_primary' => (bool) $this->is_primary,
            'alt_text' => $this->alt_text ?? $this->apartment?->title . ' - Image ' . $this->order,
        ];
    }
}