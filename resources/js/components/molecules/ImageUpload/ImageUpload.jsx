/**
 * ImageUpload Component (Molecule)
 * 
 * Professional image upload component with drag-and-drop,
 * preview, and progress tracking.
 * 
 * Features:
 * - Drag and drop file upload
 * - Image preview before upload
 * - Upload progress bar
 * - Error handling
 * - Tailwind CSS v4 styling
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import imageService  from '../../../services/imageService';

const ImageUpload = ({ apartmentId, isPrimary = '1', onUploadSuccess, onUploadError }) => {
  // State management
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Handle file selection (from input or drop)
   */
  const handleFile = (selectedFile) => {
    // Validate file
    if (!selectedFile) return;

    // Check if it's an image
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (2MB limit)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (selectedFile.size > maxSize) {
      setError('Image size must be less than 2MB. Please compress your image.');
      return;
    }

    // Clear previous errors
    setError(null);
    setSuccess(false);

    // Set file
    setFile(selectedFile);

    // Create preview using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  /**
   * Handle file input change
   */
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  /**
   * Handle drag over event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   */
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  /**
   * Handle upload button click
   */
  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      // Upload with progress tracking
      const result = await imageService.upload(
        apartmentId,
        file,
        isPrimary,
        (progress) => setUploadProgress(progress)
      );

      // Success
      setSuccess(true);
      setUploading(false);

      // Call success callback if provided
      if (onUploadSuccess) {
        onUploadSuccess(result.data);
      }

      // Reset form after 2 seconds
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setSuccess(false);
        setUploadProgress(0);
      }, 2000);

    } catch (err) {
      setUploading(false);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');

      // Call error callback if provided
      if (onUploadError) {
        onUploadError(err);
      }
    }
  };

  /**
   * Handle cancel/clear
   */
  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8
          transition-all duration-300
          ${isDragging 
            ? 'border-gold bg-gold/5 scale-[1.02]' 
            : 'border-gray-300 hover:border-gold/50'
          }
          ${error ? 'border-red-500' : ''}
          ${success ? 'border-green-500' : ''}
        `}
      >
        {/* Preview or Upload Area */}
        {!preview ? (
          <div className="text-center">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            
            <div className="mt-4">
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer text-gold hover:text-gold-dark font-medium"
              >
                Choose a file
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <p className="text-gray-500 mt-1">or drag and drop</p>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG, WEBP up to 2MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-lg"
            />
            
            {/* File Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 truncate">{file.name}</span>
              <span className="text-gray-400">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>

            {/* Progress Bar (shown during upload) */}
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-gold to-gold-dark h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={uploading || success}
                className={`
                  flex-1 py-2 px-4 rounded-lg font-medium
                  transition-all duration-300
                  ${uploading || success
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gold to-gold-dark text-charcoal hover:shadow-lg'
                  }
                `}
              >
                {uploading 
                  ? `Uploading... ${uploadProgress}%` 
                  : success 
                  ? '✓ Uploaded!' 
                  : 'Upload Image'
                }
              </button>

              {!uploading && !success && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-500 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-500 rounded-lg">
          <p className="text-green-700 text-sm">
            ✓ Image uploaded successfully!
          </p>
        </div>
      )}

      {/* Primary Image Badge */}
      {isPrimary && (
        <div className="mt-4 text-center">
          <span className="inline-block px-3 py-1 bg-gold/10 border border-gold text-gold text-xs font-semibold rounded-full">
            PRIMARY IMAGE
          </span>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  apartmentId: PropTypes.number.isRequired,
  isPrimary: PropTypes.bool,
  onUploadSuccess: PropTypes.func,
  onUploadError: PropTypes.func,
};

export default ImageUpload;
