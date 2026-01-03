<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Image Model
 * 
 * Represents an image/photo of an apartment.
 * Each apartment can have multiple images.
 * 
 * @property int $id
 * @property int $apartment_id Foreign key to apartments table
 * @property string $url Image URL or path
 * @property string|null $alt_text Alternative text for accessibility
 * @property bool $is_primary Is this the primary/hero image?
 * @property int $order Display order (0 = first)
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * 
 * @property-read \App\Models\Apartment $apartment
 */
class Image extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'images';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'apartment_id',
        'url',
        'cloudinary_public_id',
        'alt_text',
        'is_primary',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'apartment_id' => 'integer',
        'is_primary' => 'boolean',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the apartment that owns the image.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function apartment(): BelongsTo
    {
        return $this->belongsTo(Apartment::class);
    }

    /**
     * Scope a query to only include primary images.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }
}