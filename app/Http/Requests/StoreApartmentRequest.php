<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Store Apartment Request
 * 
 * Validates data for creating a new apartment.
 * Used in POST /api/v1/apartments (admin functionality)
 */
class StoreApartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // For now, allow all
        // TODO: Add admin authorization in Phase 6
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Required fields
            'title' => 'required|string|max:255|unique:apartments,title',
            'description' => 'required|string|min:50|max:2000',
            'bedrooms' => 'required|integer|min:1|max:10',
            'bathrooms' => 'required|integer|min:1|max:10',
            'square_feet' => 'required|integer|min:100|max:10000',
            'price' => 'required|numeric|min:0|max:999999.99',
            'status' => 'required|in:available,rented',
            
            // Optional relationships
            'amenity_ids' => 'sometimes|array|min:1',
            'amenity_ids.*' => 'integer|exists:amenities,id',
            
            'features' => 'sometimes|array|min:1',
            'features.*.name' => 'required|string|max:255',
            'features.*.value' => 'required|string|max:255',
            
            'images' => 'sometimes|array|min:1|max:10',
            'images.*.url' => 'required|url',
            'images.*.order' => 'required|integer|min:1',
            'images.*.is_primary' => 'sometimes|boolean',
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The apartment title is required.',
            'title.max' => 'The apartment title cannot exceed 255 characters.',
            'title.unique' => 'An apartment with this title already exists.',
            'description.required' => 'Please provide a description for the apartment.',
            'description.min' => 'The description must be at least 50 characters.',
            'description.max' => 'The description cannot exceed 2000 characters.',
            'bedrooms.required' => 'Please specify the number of bedrooms.',
            'bedrooms.min' => 'An apartment must have at least 1 bedroom.',
            'bedrooms.max' => 'Maximum 10 bedrooms allowed.',
            'bathrooms.required' => 'Please specify the number of bathrooms.',
            'bathrooms.min' => 'An apartment must have at least 1 bathroom.',
            'bathrooms.max' => 'Maximum 10 bathrooms allowed.',
            'square_feet.required' => 'Please specify the square footage.',
            'square_feet.min' => 'Square footage must be at least 100.',
            'square_feet.max' => 'Square footage cannot exceed 10,000.',
            'price.required' => 'Monthly rent amount is required.',
            'price.numeric' => 'Monthly rent must be a valid number.',
            'price.min' => 'Monthly rent cannot be negative.',
            'price.max' => 'Monthly rent cannot exceed $999,999.99.',
            'status.required' => 'Please specify the apartment status.',
            'status.in' => 'Status must be either "available" or "rented".',
            'amenity_ids.array' => 'Amenities must be provided as an array.',
            'amenity_ids.*.exists' => 'One or more selected amenities do not exist.',
            'features.array' => 'Features must be provided as an array.',
            'features.*.name.required' => 'Each feature must have a name.',
            'features.*.value.required' => 'Each feature must have a value.',
            'images.max' => 'Maximum 10 images allowed per apartment.',
            'images.*.url.required' => 'Each image must have a URL.',
            'images.*.url.url' => 'Each image URL must be valid.',
            'images.*.order.required' => 'Each image must have an order number.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'price' => 'monthly rent',
            'square_feet' => 'square footage',
            'amenity_ids' => 'amenities',
            'amenity_ids.*' => 'amenity',
        ];
    }

    /**
     * Handle a failed validation attempt.
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