<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\ApartmentRepositoryInterface;
use App\Repositories\Contracts\AmenityRepositoryInterface;
use App\Repositories\ApartmentRepository;
use App\Repositories\AmenityRepository;

/**
 * Repository Service Provider
 * 
 * Binds repository interfaces to their concrete implementations.
 * This enables dependency injection and follows the Dependency Inversion Principle.
 */
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Bind ApartmentRepositoryInterface to ApartmentRepository
        $this->app->bind(
            ApartmentRepositoryInterface::class,
            ApartmentRepository::class
        );

        // Bind AmenityRepositoryInterface to AmenityRepository
        $this->app->bind(
            AmenityRepositoryInterface::class,
            AmenityRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
