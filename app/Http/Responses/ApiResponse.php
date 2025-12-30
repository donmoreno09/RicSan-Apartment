<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

/**
 * API Response Helper
 * 
 * Provides consistent response format across all API endpoints.
 * Standardizes success and error responses with proper HTTP status codes.
 * 
 * Usage:
 * - ApiResponse::success($data, 'Message')
 * - ApiResponse::error('Message', 400)
 * - ApiResponse::notFound('Resource not found')
 */
class ApiResponse
{
    /**
     * Return a success response.
     * 
     * @param mixed $data Response data (can be array, Resource, Collection)
     * @param string $message Success message
     * @param int $statusCode HTTP status code (default: 200)
     * @param array $meta Additional metadata
     * @return JsonResponse
     */
    public static function success(
        mixed $data = null,
        string $message = 'Success',
        int $statusCode = 200,
        array $meta = []
    ): JsonResponse {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        // Add data if provided
        if ($data !== null) {
            $response['data'] = $data;
        }

        // Add metadata if provided
        if (!empty($meta)) {
            $response['meta'] = $meta;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return an error response.
     * 
     * @param string $message Error message
     * @param int $statusCode HTTP status code (default: 400)
     * @param array $errors Field-specific errors (for validation)
     * @param mixed $data Additional error data
     * @return JsonResponse
     */
    public static function error(
        string $message = 'Error',
        int $statusCode = 400,
        array $errors = [],
        mixed $data = null
    ): JsonResponse {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        // Add field-specific errors if provided
        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        // Add additional data if provided
        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return a not found response (404).
     * 
     * @param string $message Not found message
     * @return JsonResponse
     */
    public static function notFound(
        string $message = 'Resource not found'
    ): JsonResponse {
        return self::error($message, 404);
    }

    /**
     * Return a validation error response (422).
     * 
     * @param array $errors Field-specific validation errors
     * @param string $message Main error message
     * @return JsonResponse
     */
    public static function validationError(
        array $errors,
        string $message = 'The given data was invalid.'
    ): JsonResponse {
        return self::error($message, 422, $errors);
    }

    /**
     * Return an unauthorized response (401).
     * 
     * @param string $message Unauthorized message
     * @return JsonResponse
     */
    public static function unauthorized(
        string $message = 'Unauthorized'
    ): JsonResponse {
        return self::error($message, 401);
    }

    /**
     * Return a forbidden response (403).
     * 
     * @param string $message Forbidden message
     * @return JsonResponse
     */
    public static function forbidden(
        string $message = 'Forbidden'
    ): JsonResponse {
        return self::error($message, 403);
    }

    /**
     * Return a server error response (500).
     * 
     * @param string $message Server error message
     * @param mixed $debug Debug information (only in development)
     * @return JsonResponse
     */
    public static function serverError(
        string $message = 'Internal server error',
        mixed $debug = null
    ): JsonResponse {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        // Only add debug info in development
        if (config('app.debug') && $debug !== null) {
            $response['debug'] = $debug;
        }

        return response()->json($response, 500);
    }

    /**
     * Return a created response (201).
     * 
     * @param mixed $data Created resource data
     * @param string $message Success message
     * @return JsonResponse
     */
    public static function created(
        mixed $data,
        string $message = 'Resource created successfully'
    ): JsonResponse {
        return self::success($data, $message, 201);
    }

    /**
     * Return an accepted response (202).
     * 
     * @param string $message Accepted message
     * @return JsonResponse
     */
    public static function accepted(
        string $message = 'Request accepted for processing'
    ): JsonResponse {
        return self::success(null, $message, 202);
    }

    /**
     * Return a no content response (204).
     * 
     * @return JsonResponse
     */
    public static function noContent(): JsonResponse
    {
        return response()->json(null, 204);
    }
}
