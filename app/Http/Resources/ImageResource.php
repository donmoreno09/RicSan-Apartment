<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Image Resource
 * 
 * Transforms Image model into consistent JSON structure for API responses.
 * 
 * @package App\Http\Resources
 */
class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'apartment_id' => $this->apartment_id,
            'url' => $this->url,  // Changed from image_url
            'cloudinary_public_id' => $this->cloudinary_public_id,
            'width' => $this->width,
            'height' => $this->height,
            'format' => $this->format,
            'bytes' => $this->bytes,
            'alt_text' => $this->alt_text,
            'order' => $this->order,
            'is_primary' => (bool) $this->is_primary,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}