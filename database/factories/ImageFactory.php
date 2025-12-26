<?php

namespace Database\Factories;

use App\Models\Apartment;
use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'apartment_id' => Apartment::factory(),
            'url' => fake()->imageUrl(800, 600, 'apartment', true),
            'alt_text' => fake()->sentence(6),
            'is_primary' => false,
            'order' => fake()->numberBetween(0, 10),
        ];
    }

    /**
     * Indicate that the image is primary.
     */
    public function primary(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_primary' => true,
            'order' => 0,
        ]);
    }

    /**
     * Set the apartment for the image.
     */
    public function forApartment(Apartment $apartment): static
    {
        return $this->state(fn (array $attributes) => [
            'apartment_id' => $apartment->id,
        ]);
    }
}