<?php

namespace Database\Factories;

use App\Models\Amenity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amenity>
 */
class AmenityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Amenity::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $buildingAmenities = [
            'Swimming Pool', 'Fitness Center', 'Sauna', 'Rooftop Terrace',
            'Garage Parking', 'Security', 'Concierge', 'Elevator',
        ];

        $apartmentAmenities = [
            'WiFi', 'Air Conditioning', 'Heating', 'Dishwasher',
            'Washer', 'Dryer', 'Balcony', 'Smart Home',
        ];

        $areaAmenities = [
            'Near Metro', 'Shopping Mall', 'Restaurants', 'Parks',
            'Schools', 'Hospital', 'Pharmacy', 'Supermarket',
        ];

        $categories = [
            'building' => $buildingAmenities,
            'apartment' => $apartmentAmenities,
            'area' => $areaAmenities,
        ];

        $category = fake()->randomElement(array_keys($categories));
        $name = fake()->randomElement($categories[$category]);

        return [
            'name' => $name . ' ' . fake()->unique()->numerify('##'),
            'icon' => 'fa-' . strtolower(str_replace(' ', '-', $name)),
            'category' => $category,
        ];
    }

    /**
     * Indicate that the amenity is building-related.
     */
    public function building(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'building',
        ]);
    }

    /**
     * Indicate that the amenity is apartment-related.
     */
    public function apartment(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'apartment',
        ]);
    }

    /**
     * Indicate that the amenity is area-related.
     */
    public function area(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'area',
        ]);
    }
}