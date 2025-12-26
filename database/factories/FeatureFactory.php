<?php

namespace Database\Factories;

use App\Models\Apartment;
use App\Models\Feature;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feature>
 */
class FeatureFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Feature::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $features = [
            'View Type' => ['City Skyline', 'Ocean View', 'Mountain View', 'Garden View', 'Street View'],
            'Balcony Size' => ['10 sqm', '15 sqm', '20 sqm', '25 sqm', '30 sqm'],
            'Ceiling Height' => ['2.5 meters', '3.0 meters', '3.5 meters', '4.0 meters'],
            'Parking Spaces' => ['1 Underground', '2 Underground', '1 Street', 'None'],
            'Storage' => ['Built-in Closet', '5 sqm Storage Room', '10 sqm Storage Room'],
            'Internet Speed' => ['100 Mbps', '500 Mbps', '1 Gbps Fiber'],
            'Smart Home' => ['Basic Integration', 'Full Integration', 'Voice Controlled'],
            'Pet Friendly' => ['Yes', 'No', 'Small Pets Only'],
        ];

        $name = fake()->randomElement(array_keys($features));
        $value = fake()->randomElement($features[$name]);

        return [
            'apartment_id' => Apartment::factory(),
            'name' => $name,
            'value' => $value,
        ];
    }

    /**
     * Set the apartment for the feature.
     */
    public function forApartment(Apartment $apartment): static
    {
        return $this->state(fn (array $attributes) => [
            'apartment_id' => $apartment->id,
        ]);
    }
}