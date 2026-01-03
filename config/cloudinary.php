<?php

/**
 * Cloudinary Configuration
 * 
 * Configuration for Cloudinary cloud-based image management service.
 * Cloudinary provides image and video upload, storage, manipulation,
 * optimization, and delivery with automatic CDN distribution.
 * 
 * Documentation: https://cloudinary.com/documentation/php_integration
 * Dashboard: https://cloudinary.com/console
 * 
 * @package RicSan\ApartmentShowcase
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Cloudinary Cloud Name
    |--------------------------------------------------------------------------
    |
    | Your unique Cloudinary cloud name. This is used in all image URLs and
    | identifies your account. It's safe to expose this publicly as it
    | appears in all image URLs.
    |
    | Example: https://res.cloudinary.com/{cloud_name}/image/upload/...
    |
    */
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),

    /*
    |--------------------------------------------------------------------------
    | Cloudinary API Key
    |--------------------------------------------------------------------------
    |
    | Your Cloudinary API key. This identifies your application and is safe
    | to include in client-side code if needed, though we'll primarily use
    | it server-side.
    |
    */
    'api_key' => env('CLOUDINARY_API_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Cloudinary API Secret
    |--------------------------------------------------------------------------
    |
    | Your Cloudinary API secret. This is used to authenticate API requests
    | and must be kept secret. NEVER expose this in client-side code or
    | commit it to version control.
    |
    */
    'api_secret' => env('CLOUDINARY_API_SECRET'),

    /*
    |--------------------------------------------------------------------------
    | Cloudinary URL (Optional)
    |--------------------------------------------------------------------------
    |
    | Alternative single-string configuration format. If provided, this takes
    | precedence over individual cloud_name, api_key, and api_secret values.
    |
    | Format: cloudinary://api_key:api_secret@cloud_name
    |
    */
    'url' => env('CLOUDINARY_URL'),

    /*
    |--------------------------------------------------------------------------
    | Upload Preset (Optional)
    |--------------------------------------------------------------------------
    |
    | If you create an upload preset in Cloudinary dashboard, specify it here.
    | Presets allow you to define upload parameters (transformations, folder,
    | tags) without including them in each upload call.
    |
    */
    'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET'),

    /*
    |--------------------------------------------------------------------------
    | Default Upload Options
    |--------------------------------------------------------------------------
    |
    | Default options applied to all uploads unless overridden.
    |
    */
    'upload_options' => [
        'folder' => 'apartments', // Organize uploads in 'apartments' folder
        'resource_type' => 'auto', // Auto-detect (image/video/raw)
        'use_filename' => true,    // Preserve original filename
        'unique_filename' => true, // Add unique suffix if filename exists
        'overwrite' => false,      // Don't overwrite existing files
    ],

    /*
    |--------------------------------------------------------------------------
    | Transformation Options
    |--------------------------------------------------------------------------
    |
    | Default transformation options for image optimization.
    |
    */
    'transformations' => [
        'quality' => 'auto',       // Auto-optimize quality
        'fetch_format' => 'auto',  // Auto-convert to best format (WebP, AVIF)
    ],

];
