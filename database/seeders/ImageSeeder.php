<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Apartment;
use App\Models\Image;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $apartments = Apartment::all();

        foreach ($apartments as $apartment) {
            // Each apartment gets 4-5 images
            $imageCount = rand(4, 5);

            for ($i = 0; $i < $imageCount; $i++) {
                Image::create([
                    'apartment_id' => $apartment->id,
                    'url' => "https://via.placeholder.com/800x600/4A90E2/ffffff?text=Apartment+{$apartment->id}+Image+" . ($i + 1),
                    'alt_text' => $apartment->title . ' - Image ' . ($i + 1),
                    'is_primary' => $i === 0, // First image is primary
                    'order' => $i,
                ]);
            }
        }
    }
}