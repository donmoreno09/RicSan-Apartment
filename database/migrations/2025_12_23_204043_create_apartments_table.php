<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->tinyInteger('bedrooms')->unsigned();
            $table->tinyInteger('bathrooms')->unsigned();
            $table->decimal('area_sqm', 8, 2);
            $table->tinyInteger('floor')->unsigned();
            $table->string('status', 20)->default('available');
            $table->timestamps();

            // Indexes for performance
            $table->index('status');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};