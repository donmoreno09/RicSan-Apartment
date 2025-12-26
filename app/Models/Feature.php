<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Feature Model
 * 
 * Represents a custom key-value feature/property of an apartment.
 * Examples: View Type => "Panoramic City", Balcony Size => "25 sqm"
 * 
 * @property int $id
 * @property int $apartment_id Foreign key to apartments table
 * @property string $name Feature name (e.g., "View Type")
 * @property string $value Feature value (e.g., "City Skyline")
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * 
 * @property-read \App\Models\Apartment $apartment
 */
class Feature extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'features';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'apartment_id',
        'name',
        'value',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'apartment_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the apartment that owns the feature.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function apartment(): BelongsTo
    {
        return $this->belongsTo(Apartment::class);
    }
}