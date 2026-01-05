<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ApartmentController;
use App\Http\Controllers\Api\V1\AmenityController;
use App\Http\Controllers\Api\V1\StatisticsController;
use App\Http\Controllers\Api\V1\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes - Version 1
|--------------------------------------------------------------------------
|
| RESTful API endpoints for RicSan's Apartment Showcase.
| All routes are prefixed with /api/v1
|
*/

// API Version 1 Routes
Route::prefix('v1')->group(function () {
    
    // Health check endpoint
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'message' => 'API is running',
            'version' => '1.0.0',
            'timestamp' => now()->toDateTimeString(),
        ]);
    });

    // Apartment Routes (RESTful - using query params for filtering)
    Route::prefix('apartments')->group(function () {
        // GET /api/v1/apartments (with optional query params)
        Route::get('/', [ApartmentController::class, 'index'])
            ->name('api.v1.apartments.index');
        
        // GET /api/v1/apartments/{id}
        Route::get('/{id}', [ApartmentController::class, 'show'])
            ->name('api.v1.apartments.show')
            ->where('id', '[0-9]+');
 
        // POST /api/v1/apartments/{id}/images: Upload image to apartment
        Route::post('/{id}/images', [ImageController::class, 'store'])
            ->name('api.v1.apartments.images.store')
            ->where('id', '[0-9]+');
    });

    // Amenity Routes (RESTful - using query params for grouping)
    Route::prefix('amenities')->group(function () {
        // GET /api/v1/amenities (with optional ?grouped=true)
        Route::get('/', [AmenityController::class, 'index'])
            ->name('api.v1.amenities.index');
        
        // GET /api/v1/amenities/{id}
        Route::get('/{id}', [AmenityController::class, 'show'])
            ->name('api.v1.amenities.show')
            ->where('id', '[0-9]+');
    });

    // Statistics Route
    Route::get('/statistics', [StatisticsController::class, 'index'])
        ->name('api.v1.statistics.index');
    
    // Image Management Routes
    Route::prefix('images')->group(function () {
        // DELETE /api/v1/images/{id}
        Route::delete('/{id}', [ImageController::class, 'destroy'])
            ->name('api.v1.images.destroy')
            ->where('id', '[0-9]+');
        
        // PATCH /api/v1/images/{id}/primary
        Route::patch('/{id}/primary', [ImageController::class, 'setPrimary'])
            ->name('api.v1.images.setPrimary')
            ->where('id', '[0-9]+');
    });    
});