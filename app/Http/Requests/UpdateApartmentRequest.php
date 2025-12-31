<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

/**
 * Update Apartment Request
 * 
 * Validates data for updating an existing apartment.
 * All fields are optional (partial updates allowed).
 * Used in PUT/PATCH /api/v1/apartments/{id}
 */
class UpdateApartmentRequest extends FormRequest
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
        // Get apartment ID from route parameter
        $apartmentId = $this->route('id');
        
        return [
            // All fields are optional for partial updates
            'title' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('apartments', 'title')->ignore($apartmentId)
            ],
            'description' => 'sometimes|string|min:50|max:2000',
            'bedrooms' => 'sometimes|integer|min:1|max:10',
            'bathrooms' => 'sometimes|integer|min:1|max:10',
            'square_feet' => 'sometimes|integer|min:100|max:10000',
            'price' => 'sometimes|numeric|min:0|max:999999.99',
            'status' => 'sometimes|in:available,rented',
            
            // Relationships (optional)
            'amenity_ids' => 'sometimes|array|min:1',
            'amenity_ids.*' => 'integer|exists:amenities,id',
            
            'features' => 'sometimes|array',
            'features.*.name' => 'required|string|max:255',
            'features.*.value' => 'required|string|max:255',
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'title.unique' => 'An apartment with this title already exists.',
            'description.min' => 'The description must be at least 50 characters.',
            'bedrooms.min' => 'An apartment must have at least 1 bedroom.',
            'bathrooms.min' => 'An apartment must have at least 1 bathroom.',
            'square_feet.min' => 'Square footage must be at least 100.',
            'price.numeric' => 'Monthly rent must be a valid number.',
            'status.in' => 'Status must be either "available" or "rented".',
            'amenity_ids.*.exists' => 'One or more selected amenities do not exist.',
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