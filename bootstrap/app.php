<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Responses\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Throwable;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // ✅ ADD CUSTOM API EXCEPTION HANDLING
        $exceptions->render(function (Throwable $e, $request) {
            // Only handle API requests (routes starting with /api)
            if ($request->is('api/*')) {
                
                // Model Not Found Exception (404)
                if ($e instanceof ModelNotFoundException) {
                    return ApiResponse::notFound(
                        'The requested resource was not found.'
                    );
                }

                // Route Not Found Exception (404)
                if ($e instanceof NotFoundHttpException) {
                    return ApiResponse::notFound(
                        'The requested endpoint does not exist.'
                    );
                }

                // Method Not Allowed Exception (405)
                if ($e instanceof MethodNotAllowedHttpException) {
                    return ApiResponse::error(
                        'The HTTP method is not allowed for this endpoint.',
                        405
                    );
                }

                // Validation Exception (422)
                if ($e instanceof ValidationException) {
                    return ApiResponse::validationError(
                        $e->errors(),
                        $e->getMessage()
                    );
                }

                // Authentication Exception (401)
                if ($e instanceof AuthenticationException) {
                    return ApiResponse::unauthorized(
                        'Authentication required.'
                    );
                }

                // Authorization Exception (403)
                if ($e instanceof AuthorizationException) {
                    return ApiResponse::forbidden(
                        $e->getMessage() ?: 'You are not authorized to perform this action.'
                    );
                }

                // HTTP Exception (various status codes)
                if ($e instanceof HttpException) {
                    return ApiResponse::error(
                        $e->getMessage() ?: 'An error occurred.',
                        $e->getStatusCode()
                    );
                }

                // Generic Server Error (500)
                // Show details in development, hide in production
                if (config('app.debug')) {
                    // Development: Show full error details
                    return ApiResponse::serverError(
                        $e->getMessage() ?: 'An unexpected error occurred.',
                        [
                            'exception' => get_class($e),
                            'file' => $e->getFile(),
                            'line' => $e->getLine(),
                            'trace' => collect($e->getTrace())->take(5)->toArray()
                        ]
                    );
                } else {
                    // Production: Hide error details
                    return ApiResponse::serverError(
                        'An unexpected error occurred. Please try again later.'
                    );
                }
            }
        });
    })->create();