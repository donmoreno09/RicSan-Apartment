<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Search Apartment Request
 * 
 * Validates query parameters for apartment search/filtering.
 * Used in GET /api/v1/apartments
 */
class SearchApartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // For now, allow all users to search apartments
        // Can add authentication logic here later
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Status filter
            'status' => 'sometimes|string|in:available,rented',
            
            // Bedroom/bathroom filters
            'bedrooms' => 'sometimes|integer|min:1|max:10',
            'bathrooms' => 'sometimes|integer|min:1|max:10',
            
            // Price range filters
            'min_price' => 'sometimes|numeric|min:0',
            'max_price' => 'sometimes|numeric|min:0|gte:min_price',
            
            // Square footage filter
            'min_sqft' => 'sometimes|integer|min:0',
            'max_sqft' => 'sometimes|integer|min:0|gte:min_sqft',
            
            // Sorting
            'sort_by' => 'sometimes|string|in:price_asc,price_desc,bedrooms,square_feet,newest,oldest',
            
            // Pagination
            'per_page' => 'sometimes|integer|min:1|max:50',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.in' => 'Status must be either "available" or "rented".',
            'bedrooms.integer' => 'Number of bedrooms must be a valid number.',
            'bedrooms.min' => 'Number of bedrooms must be at least 1.',
            'bedrooms.max' => 'Number of bedrooms cannot exceed 10.',
            'bathrooms.integer' => 'Number of bathrooms must be a valid number.',
            'bathrooms.min' => 'Number of bathrooms must be at least 1.',
            'bathrooms.max' => 'Number of bathrooms cannot exceed 10.',
            'min_price.numeric' => 'Minimum price must be a valid number.',
            'min_price.min' => 'Minimum price cannot be negative.',
            'max_price.numeric' => 'Maximum price must be a valid number.',
            'max_price.min' => 'Maximum price cannot be negative.',
            'max_price.gte' => 'Maximum price must be greater than or equal to minimum price.',
            'min_sqft.integer' => 'Minimum square footage must be a valid number.',
            'max_sqft.gte' => 'Maximum square footage must be greater than or equal to minimum square footage.',
            'sort_by.in' => 'Invalid sort option. Valid options: price_asc, price_desc, bedrooms, square_feet, newest, oldest.',
            'per_page.max' => 'Cannot retrieve more than 50 items per page.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'min_price' => 'minimum price',
            'max_price' => 'maximum price',
            'min_sqft' => 'minimum square footage',
            'max_sqft' => 'maximum square footage',
            'per_page' => 'items per page',
        ];
    }

    /**
     * Handle a failed validation attempt (for API).
     *
     * @param Validator $validator
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}