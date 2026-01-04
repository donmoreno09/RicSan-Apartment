<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

/**
 * Store Image Request
 * 
 * Validates image upload requests for apartments.
 * Used in POST /api/v1/apartments/{id}/images
 * 
 * @package App\Http\Requests
 */
class StoreImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // For now, allow all users to upload images
        // Add authentication logic here later
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
            // Validate at 2MB (current PHP limit) to give clear error
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // 2MB in KB
            'is_primary' => 'nullable|boolean',
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
            'image.required' => 'Please select an image to upload.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, webp.',
            'image.max' => 'The image cannot exceed 2MB. Please compress your image before uploading.',
            'is_primary.boolean' => 'The is_primary field must be true or false.',
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
            'is_primary' => 'primary image flag',
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        Log::error('StoreImageRequest validation failed', [
            'errors' => $validator->errors()->toArray(),
            'has_file' => $this->hasFile('image'),
            'file_error' => $this->file('image') ? $this->file('image')->getError() : 'no file',
            'file_error_message' => $this->file('image') ? $this->file('image')->getErrorMessage() : 'no file',
            'all_input' => $this->all(),
            'all_files' => $this->allFiles(),
        ]);

        parent::failedValidation($validator);
    }
}
