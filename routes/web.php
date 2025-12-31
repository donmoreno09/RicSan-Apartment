<?php

use Illuminate\Support\Facades\Route;

/**
 * Catch-all route for React Router
 * 
 * Send all non-API routes to React app
 * React Router will handle the routing client-side
 */
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');