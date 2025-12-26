<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Amenity;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            // Building Amenities
            [
                'name' => 'Swimming Pool',
                'icon' => 'fa-swimming-pool',
                'category' => 'building',
            ],
            [
                'name' => 'Fitness Gym',
                'icon' => 'fa-dumbbell',
                'category' => 'building',
            ],
            [
                'name' => 'Rooftop Terrace',
                'icon' => 'fa-building',
                'category' => 'building',
            ],
            [
                'name' => '24/7 Security',
                'icon' => 'fa-shield-alt',
                'category' => 'building',
            ],
            [
                'name' => 'Concierge Service',
                'icon' => 'fa-concierge-bell',
                'category' => 'building',
            ],
            [
                'name' => 'Underground Parking',
                'icon' => 'fa-parking',
                'category' => 'building',
            ],
            [
                'name' => 'Elevator',
                'icon' => 'fa-elevator',
                'category' => 'building',
            ],

            // Apartment Amenities
            [
                'name' => 'High-Speed WiFi',
                'icon' => 'fa-wifi',
                'category' => 'apartment',
            ],
            [
                'name' => 'Air Conditioning',
                'icon' => 'fa-snowflake',
                'category' => 'apartment',
            ],
            [
                'name' => 'Heating System',
                'icon' => 'fa-fire',
                'category' => 'apartment',
            ],
            [
                'name' => 'Smart Home System',
                'icon' => 'fa-home',
                'category' => 'apartment',
            ],
            [
                'name' => 'Washer & Dryer',
                'icon' => 'fa-tshirt',
                'category' => 'apartment',
            ],
            [
                'name' => 'Dishwasher',
                'icon' => 'fa-utensils',
                'category' => 'apartment',
            ],
            [
                'name' => 'Balcony',
                'icon' => 'fa-tree',
                'category' => 'apartment',
            ],

            // Area Amenities
            [
                'name' => 'Near Metro Station',
                'icon' => 'fa-subway',
                'category' => 'area',
            ],
            [
                'name' => 'Shopping District',
                'icon' => 'fa-shopping-bag',
                'category' => 'area',
            ],
            [
                'name' => 'Parks Nearby',
                'icon' => 'fa-tree',
                'category' => 'area',
            ],
            [
                'name' => 'Restaurants & Cafes',
                'icon' => 'fa-coffee',
                'category' => 'area',
            ],
        ];

        foreach ($amenities as $amenity) {
            Amenity::create($amenity);
        }
    }
}