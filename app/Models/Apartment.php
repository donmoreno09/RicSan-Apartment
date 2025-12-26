<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Apartment Model
 * 
 * Represents a luxury apartment listing in the showcase application.
 * 
 * @property int $id
 * @property string $title
 * @property string $description
 * @property float $price Monthly rent price
 * @property int $bedrooms Number of bedrooms
 * @property int $bathrooms Number of bathrooms
 * @property float $area_sqm Area in square meters
 * @property int $floor Floor number
 * @property string $status Status: available, rented, maintenance
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Feature[] $features
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Amenity[] $amenities
 */
class Apartment extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'apartments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'bedrooms',
        'bathrooms',
        'area_sqm',
        'floor',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'area_sqm' => 'decimal:2',
        'floor' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all images for the apartment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function images(): HasMany
    {
        return $this->hasMany(Image::class)->orderBy('order');
    }

    /**
     * Get the primary/hero image for the apartment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function primaryImage(): HasMany
    {
        return $this->hasMany(Image::class)->where('is_primary', true);
    }

    /**
     * Get all features for the apartment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function features(): HasMany
    {
        return $this->hasMany(Feature::class);
    }

    /**
     * Get all amenities for the apartment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'apartment_amenity');
    }

    /**
     * Scope a query to only include available apartments.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope a query to filter apartments by price range.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param float $min
     * @param float $max
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }
}