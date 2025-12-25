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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apartment_id')->constrained()->onDelete('cascade');
            $table->string('url', 500);
            $table->string('alt_text')->nullable();
            $table->boolean('is_primary')->default(false);
            $table->tinyInteger('order')->unsigned()->default(0);
            $table->timestamps();

            // Indexes for performance
            $table->index('apartment_id');
            $table->index(['apartment_id', 'is_primary']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};