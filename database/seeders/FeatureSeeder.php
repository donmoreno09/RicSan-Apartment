<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Apartment;
use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define features for each apartment type
        $apartmentFeatures = [
            // Apartment 1: Luxury Penthouse
            1 => [
                ['name' => 'View Type', 'value' => 'Panoramic City Skyline'],
                ['name' => 'Balcony Size', 'value' => '25 sqm'],
                ['name' => 'Ceiling Height', 'value' => '3.5 meters'],
                ['name' => 'Smart Home', 'value' => 'Full Integration'],
                ['name' => 'Parking Spaces', 'value' => '2 Underground'],
            ],
            // Apartment 2: Modern Studio
            2 => [
                ['name' => 'View Type', 'value' => 'City Street'],
                ['name' => 'Storage', 'value' => 'Built-in Closet'],
                ['name' => 'Internet Speed', 'value' => '1 Gbps Fiber'],
            ],
            // Apartment 3: Family Apartment
            3 => [
                ['name' => 'View Type', 'value' => 'Park and Garden'],
                ['name' => 'Storage Room', 'value' => '5 sqm'],
                ['name' => 'Balcony Size', 'value' => '15 sqm'],
                ['name' => 'Child Safety', 'value' => 'Window Locks Installed'],
            ],
            // Apartment 4: Industrial Loft
            4 => [
                ['name' => 'Ceiling Height', 'value' => '4.2 meters'],
                ['name' => 'Style', 'value' => 'Exposed Brick & Beams'],
                ['name' => 'Workspace', 'value' => 'Creative Studio Area'],
                ['name' => 'Natural Light', 'value' => 'Skylight Windows'],
            ],
            // Apartment 5: Garden View
            5 => [
                ['name' => 'Garden Access', 'value' => 'Private 30 sqm Garden'],
                ['name' => 'View Type', 'value' => 'Landscaped Garden'],
                ['name' => 'Pet Friendly', 'value' => 'Yes - Garden Access'],
                ['name' => 'Outdoor Seating', 'value' => 'Patio Included'],
            ],
            // Apartment 6: Executive Suite
            6 => [
                ['name' => 'Home Office', 'value' => 'Dedicated 12 sqm Room'],
                ['name' => 'View Type', 'value' => 'River and Bridge'],
                ['name' => 'Wine Storage', 'value' => 'Climate-Controlled'],
                ['name' => 'Smart Home', 'value' => 'Voice Controlled'],
                ['name' => 'Parking Spaces', 'value' => '2 Reserved Spots'],
            ],
        ];

        // Seed features for each apartment
        foreach ($apartmentFeatures as $apartmentId => $features) {
            foreach ($features as $feature) {
                Feature::create([
                    'apartment_id' => $apartmentId,
                    'name' => $feature['name'],
                    'value' => $feature['value'],
                ]);
            }
        }
    }
}