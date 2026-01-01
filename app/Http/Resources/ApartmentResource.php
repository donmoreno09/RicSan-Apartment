<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Apartment Resource
 * 
 * Transforms Apartment model into consistent, well-structured JSON.
 * Handles data formatting, computed fields, and conditional relationships.
 */
class ApartmentResource extends JsonResource
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
            // Basic Information
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            
            // Specifications
            'specifications' => [
                'bedrooms' => $this->bedrooms,
                'bathrooms' => $this->bathrooms,
                'area_sqm' => $this->area_sqm,
            ],
            
            // Price Information (formatted as object)
            'price' => [
                'amount' => (float) $this->price,
                'currency' => 'USD',
                'formatted' => '$' . number_format($this->price, 0),
                'per' => 'month',
            ],
            
            // Availability
            'status' => $this->status,
            'is_available' => $this->status === 'available',
            
            // Conditional Relationships (only include if loaded)
            'images' => ImageResource::collection($this->whenLoaded('images')),
            
            'primary_image' => $this->when(
                $this->relationLoaded('images'),
                function () {
                    $primaryImage = $this->images->where('is_primary', true)->first();
                    return $primaryImage ? new ImageResource($primaryImage) : null;
                }
            ),
            
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            
            'features' => FeatureResource::collection($this->whenLoaded('features')),
            
            // Computed Fields
            'image_count' => $this->when(
                $this->relationLoaded('images'),
                fn() => $this->images->count()
            ),
            
            'amenity_count' => $this->when(
                $this->relationLoaded('amenities'),
                fn() => $this->amenities->count()
            ),
            
            // Timestamps (human-readable)
            'created_at' => $this->created_at?->format('F d, Y'),
            'updated_at' => $this->updated_at?->diffForHumans(),  // "2 days ago"
        ];
    }
}