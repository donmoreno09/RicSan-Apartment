/**
 * ApartmentDetailPage Component
 * 
 * Displays detailed information about a single apartment.
 * Uses dynamic routing to get apartment ID from URL.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Button from '../../components/atoms/Button/Button';
import Badge from '../../components/atoms/Badge/Badge';
import { apartmentService } from '../../services';

const ApartmentDetailPage = () => {
  const { id } = useParams(); // Get apartment ID from URL
  const navigate = useNavigate();
  
  // State
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  /**
   * Fetch apartment details when ID changes
   */
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        const response = await apartmentService.getById(id);
        setApartment(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching apartment:', err);
        
        // Check if it's a 404
        if (err.response && err.response.status === 404) {
          setError('Apartment not found');
        } else {
          setError('Failed to load apartment details');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchApartment();
  }, [id]); // Re-run when ID changes
  
  /**
   * Handle back button
   */
  const handleBack = () => {
    navigate('/');
  };
  
  /**
   * Loading state
   */
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[--color-gold] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading apartment details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  /**
   * Error state
   */
  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="font-[family-name:--font-family-playfair] text-4xl font-bold text-[--color-charcoal] mb-4">
              {error}
            </h1>
            <p className="text-gray-600 mb-8">
              The apartment you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="primary" onClick={handleBack}>
              Back to Home
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  /**
   * Success state - show apartment details
   */
  return (
    <MainLayout>
      {/* Back Button */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="outline" size="small" onClick={handleBack}>
            ← Back to Apartments
          </Button>
        </div>
      </div>
      
      {/* Apartment Details */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-96 bg-gray-200">
              {apartment.images && apartment.images.length > 0 ? (
                <img
                  src={apartment.images[0].image_path}
                  alt={apartment.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400 text-4xl">🏢</span>
                </div>
              )}
              
              {/* Badge on Image */}
              <div className="absolute top-6 right-6">
                <Badge status={apartment.is_available ? 'available' : 'rented'} />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <h1 className="font-[family-name:--font-family-playfair] text-4xl md:text-5xl font-bold text-[--color-charcoal] mb-4">
                  {apartment.name}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="font-[family-name:--font-family-playfair] text-4xl font-bold text-[--color-gold]">
                    ${apartment.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 text-xl">/month</span>
                </div>
              </div>
              
              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="text-3xl mb-2">🛏️</div>
                  <div className="text-2xl font-bold text-[--color-charcoal]">{apartment.bedrooms}</div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🚿</div>
                  <div className="text-2xl font-bold text-[--color-charcoal]">{apartment.bathrooms}</div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">📐</div>
                  <div className="text-2xl font-bold text-[--color-charcoal]">
                    {apartment.square_feet.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Square Feet</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">
                    {apartment.is_available ? '✅' : '❌'}
                  </div>
                  <div className="text-2xl font-bold text-[--color-charcoal]">
                    {apartment.is_available ? 'Available' : 'Rented'}
                  </div>
                  <div className="text-gray-600">Status</div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-charcoal] mb-4">
                  About This Property
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {apartment.description}
                </p>
              </div>
              
              {/* Features */}
              {apartment.features && apartment.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-charcoal] mb-4">
                    Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {apartment.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[--color-gold]">✓</span>
                        <span className="text-gray-700">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Amenities */}
              {apartment.amenities && apartment.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-charcoal] mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {apartment.amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <span className="text-[--color-gold]">★</span>
                        <span className="text-gray-700">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                {apartment.is_available ? (
                  <>
                    <Button variant="primary" size="large" className="flex-1">
                      Schedule a Tour
                    </Button>
                    <Button variant="secondary" size="large" className="flex-1">
                      Contact Agent
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 text-lg">
                      This apartment is currently rented. Check back later for availability.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ApartmentDetailPage;