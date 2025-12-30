<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\V1\ApartmentController;
// use App\Http\Controllers\Api\V1\AmenityController;
// use App\Http\Controllers\Api\V1\StatisticsController;

/*
|--------------------------------------------------------------------------
| API Routes - Version 1
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
| Base URL: /api/v1
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

    // // Apartment Routes
    // Route::prefix('apartments')->group(function () {
    //     Route::get('/', [ApartmentController::class, 'index'])
    //         ->name('api.v1.apartments.index');
        
    //     Route::get('/available', [ApartmentController::class, 'available'])
    //         ->name('api.v1.apartments.available');
        
    //     Route::get('/search', [ApartmentController::class, 'search'])
    //         ->name('api.v1.apartments.search');
        
    //     Route::get('/{id}', [ApartmentController::class, 'show'])
    //         ->name('api.v1.apartments.show')
    //         ->where('id', '[0-9]+');
    // });

    // // Amenity Routes
    // Route::prefix('amenities')->group(function () {
    //     Route::get('/', [AmenityController::class, 'index'])
    //         ->name('api.v1.amenities.index');
        
    //     Route::get('/categories', [AmenityController::class, 'categories'])
    //         ->name('api.v1.amenities.categories');
        
    //     Route::get('/{id}', [AmenityController::class, 'show'])
    //         ->name('api.v1.amenities.show')
    //         ->where('id', '[0-9]+');
    // });

    // // Statistics Route
    // Route::get('/statistics', [StatisticsController::class, 'index'])
    //     ->name('api.v1.statistics.index');
});

/*
|--------------------------------------------------------------------------
| Future API Versions
|--------------------------------------------------------------------------
|
| When creating v2, add new route group here:
|
| Route::prefix('v2')->group(function () {
|     // v2 routes...
| });
|
*/
