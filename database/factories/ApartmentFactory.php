<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Apartment>
 */
class ApartmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Apartment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $apartmentTypes = [
            'Luxury Penthouse',
            'Modern Studio',
            'Cozy Apartment',
            'Spacious Family Home',
            'Executive Suite',
            'Urban Loft',
            'Garden View Residence',
            'Downtown Apartment',
            'Riverside Condo',
            'Hillside Villa',
        ];

        $locations = [
            'Downtown',
            'Riverside',
            'Hillside',
            'City Center',
            'Suburban',
            'Uptown',
            'Waterfront',
            'Historic District',
        ];

        $type = fake()->randomElement($apartmentTypes);
        $location = fake()->randomElement($locations);

        return [
            'title' => $location . ' ' . $type,
            'description' => fake()->paragraphs(3, true),
            'price' => fake()->randomFloat(2, 800, 5000),
            'bedrooms' => fake()->numberBetween(1, 5),
            'bathrooms' => fake()->numberBetween(1, 3),
            'area_sqm' => fake()->randomFloat(2, 30, 250),
            'floor' => fake()->numberBetween(0, 20),
            'status' => fake()->randomElement(['available', 'rented', 'maintenance']),
        ];
    }

    /**
     * Indicate that the apartment is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }

    /**
     * Indicate that the apartment is rented.
     */
    public function rented(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rented',
        ]);
    }

    /**
     * Indicate that the apartment is in maintenance.
     */
    public function maintenance(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'maintenance',
        ]);
    }

    /**
     * Indicate that the apartment is a luxury unit.
     */
    public function luxury(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => fake()->randomFloat(2, 3500, 8000),
            'bedrooms' => fake()->numberBetween(3, 5),
            'bathrooms' => fake()->numberBetween(2, 4),
            'area_sqm' => fake()->randomFloat(2, 120, 300),
            'floor' => fake()->numberBetween(10, 25),
        ]);
    }

    /**
     * Indicate that the apartment is a budget unit.
     */
    public function budget(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => fake()->randomFloat(2, 600, 1500),
            'bedrooms' => fake()->numberBetween(1, 2),
            'bathrooms' => 1,
            'area_sqm' => fake()->randomFloat(2, 25, 60),
            'floor' => fake()->numberBetween(1, 5),
        ]);
    }
}