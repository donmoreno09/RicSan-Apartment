<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Store Amenity Request
 * 
 * Validates data for creating a new amenity.
 * Used in POST /api/v1/amenities (admin functionality)
 */
class StoreAmenityRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:amenities,name',
            'icon' => 'sometimes|string|max:10',
            'category' => 'required|string|in:Recreational,Security,Utilities,Services,Building,Other',
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The amenity name is required.',
            'name.max' => 'The amenity name cannot exceed 255 characters.',
            'name.unique' => 'An amenity with this name already exists.',
            'icon.max' => 'The icon cannot exceed 10 characters.',
            'category.required' => 'Please select an amenity category.',
            'category.in' => 'Invalid category. Valid categories: Recreational, Security, Utilities, Services, Building, Other.',
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