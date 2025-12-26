<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Apartment;
use App\Models\Amenity;

class ApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all amenities (we'll attach different ones to each apartment)
        $allAmenities = Amenity::all();

        // Apartment 1: Luxury Penthouse
        $apartment1 = Apartment::create([
            'title' => 'Luxury Downtown Penthouse',
            'description' => 'Experience unparalleled luxury in this stunning penthouse apartment. Floor-to-ceiling windows offer breathtaking panoramic city views. The open-concept living space features high-end finishes, a gourmet kitchen with premium appliances, and a spacious master suite. Perfect for those who demand the best.',
            'price' => 3500.00,
            'bedrooms' => 3,
            'bathrooms' => 2,
            'area_sqm' => 150.00,
            'floor' => 12,
            'status' => 'available',
        ]);
        // Attach amenities (randomly select 8-10)
        $apartment1->amenities()->attach($allAmenities->random(10)->pluck('id'));

        // Apartment 2: Modern Studio
        $apartment2 = Apartment::create([
            'title' => 'Elegant City Studio',
            'description' => 'Perfectly designed studio apartment in the heart of the city. This modern space maximizes efficiency without sacrificing style. Features a sleek kitchenette, contemporary bathroom, and clever storage solutions. Ideal for young professionals or students.',
            'price' => 1200.00,
            'bedrooms' => 1,
            'bathrooms' => 1,
            'area_sqm' => 45.00,
            'floor' => 3,
            'status' => 'available',
        ]);
        $apartment2->amenities()->attach($allAmenities->random(6)->pluck('id'));

        // Apartment 3: Spacious Family Apartment
        $apartment3 = Apartment::create([
            'title' => 'Spacious Family Residence',
            'description' => 'Welcome to your family\'s dream home! This generous apartment offers ample space for growing families. Three comfortable bedrooms, two full bathrooms, and a large living area create the perfect environment. The modern kitchen and dining area are ideal for family gatherings.',
            'price' => 2800.00,
            'bedrooms' => 4,
            'bathrooms' => 2,
            'area_sqm' => 130.00,
            'floor' => 5,
            'status' => 'available',
        ]);
        $apartment3->amenities()->attach($allAmenities->random(9)->pluck('id'));

        // Apartment 4: Cozy Loft
        $apartment4 = Apartment::create([
            'title' => 'Industrial Chic Loft',
            'description' => 'Unique loft-style apartment with soaring ceilings and exposed brick walls. This converted warehouse space combines industrial charm with modern comfort. Open layout with mezzanine bedroom, designer bathroom, and a creative workspace. Perfect for artists and creatives.',
            'price' => 2200.00,
            'bedrooms' => 2,
            'bathrooms' => 1,
            'area_sqm' => 95.00,
            'floor' => 2,
            'status' => 'available',
        ]);
        $apartment4->amenities()->attach($allAmenities->random(7)->pluck('id'));

        // Apartment 5: Garden View Apartment
        $apartment5 = Apartment::create([
            'title' => 'Serene Garden View Residence',
            'description' => 'Escape to tranquility in this beautiful ground-floor apartment. Private garden access and large windows bring nature inside. Two bedrooms with garden views, modern kitchen, and spacious living room. Perfect for nature lovers seeking peace while staying connected to the city.',
            'price' => 2500.00,
            'bedrooms' => 2,
            'bathrooms' => 2,
            'area_sqm' => 110.00,
            'floor' => 0,
            'status' => 'available',
        ]);
        $apartment5->amenities()->attach($allAmenities->random(8)->pluck('id'));

        // Apartment 6: Executive Suite
        $apartment6 = Apartment::create([
            'title' => 'Executive Business Suite',
            'description' => 'Premium apartment designed for discerning executives. This sophisticated residence features a home office, formal dining room, and luxurious master bedroom. Smart home technology, premium finishes, and a private study create the ultimate professional living space.',
            'price' => 3200.00,
            'bedrooms' => 3,
            'bathrooms' => 2,
            'area_sqm' => 140.00,
            'floor' => 8,
            'status' => 'available',
        ]);
        $apartment6->amenities()->attach($allAmenities->random(11)->pluck('id'));
    }
}