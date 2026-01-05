/**
 * ApartmentDetailPage Component
 * 
 * Displays detailed information about a single apartment.
 * Uses dynamic routing to get apartment ID from URL.
 * Styled to match the design reference.
 */

import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Badge from '../../components/atoms/Badge/Badge';
import useApartmentDetail from '../../hooks/useApartmentDetail';

const ApartmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use custom hook instead of local state/useEffect
  const { apartment, loading, error } = useApartmentDetail(id);
  
  const handleBack = () => {
    navigate('/');
  };
  
  /**
   * Loading state
   */
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-20 min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d4a574] mx-auto mb-4"></div>
            <p className="text-[#666666]">Loading apartment details...</p>
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
        <div className="max-w-[1400px] mx-auto px-8 py-32 text-center min-h-screen">
          <div className="text-6xl mb-6">😞</div>
          <h1 className="
            font-[family-name:var(--font-family-playfair)]
            text-4xl font-bold
            text-[#1a1a1a]
            mb-4
          ">
            {error}
          </h1>
          <p className="text-[#666666] mb-8 text-lg">
            The apartment you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={handleBack}
            className="
              bg-[#d4a574] text-white
              px-10 py-4
              border-none rounded-[2px]
              font-semibold cursor-pointer
              transition-all duration-300
              uppercase tracking-wider text-[0.9rem]
              
              hover:bg-[#1a1a1a]
              hover:-translate-y-0.5
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
            "
          >
            Back to Home
          </button>
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
      <div className="bg-[#f5f1ed] py-6 mt-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <button 
            onClick={handleBack}
            className="
              text-[#1a1a1a] font-medium
              transition-colors duration-300
              hover:text-[#d4a574]
              flex items-center gap-2
            "
          >
            <span>←</span> Back to Apartments
          </button>
        </div>
      </div>
      
      {/* Apartment Details */}
      <section className="py-16 bg-[#f5f1ed]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="bg-white rounded overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
            {/* Image Gallery */}
            <div className="relative h-[500px]">
              {apartment.images && apartment.images.length > 0 ? (
                <img
                  src={apartment.primary_image?.url || null}
                  alt={apartment.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="
                  w-full h-full
                  bg-gradient-to-br from-purple-500 to-purple-700
                  flex items-center justify-center
                ">
                  <span className="text-white/30 text-4xl font-semibold">🏢</span>
                </div>
              )}
              
              {/* Badge on Image */}
              <div className="absolute top-8 right-8">
                <Badge status={apartment.is_available ? 'available' : 'rented'} />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-12">
              {/* Header */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h1 className="
                  font-[family-name:var(--font-family-playfair)]
                  text-5xl font-bold
                  text-[#1a1a1a]
                  mb-4
                ">
                  {apartment.title}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="
                    font-[family-name:var(--font-family-playfair)]
                    text-4xl font-bold
                    text-[#d4a574]
                  ">
                    ${apartment.price.amount}
                  </span>
                  <span className="text-[#666666] text-xl">/month</span>
                </div>
              </div>
              
              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="text-3xl mb-2">🛏️</div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">{apartment.specifications.bedrooms}</div>
                  <div className="text-[#666666]">Bedrooms</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🚿</div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">{apartment.specifications.bathrooms}</div>
                  <div className="text-[#666666]">Bathrooms</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">📐</div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">
                    {apartment.specifications.area_sqm}
                  </div>
                  <div className="text-[#666666]">Square Feet</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">
                    {apartment.is_available ? '✅' : '❌'}
                  </div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">
                    {apartment.is_available ? 'Available' : 'Rented'}
                  </div>
                  <div className="text-[#666666]">Status</div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="
                  font-[family-name:var(--font-family-playfair)]
                  text-2xl font-bold
                  text-[#1a1a1a]
                  mb-4
                ">
                  About This Property
                </h2>
                <p className="text-[#666666] leading-relaxed text-lg">
                  {apartment.description}
                </p>
              </div>
              
              {/* Amenities */}
              {apartment.amenities && apartment.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="
                    font-[family-name:var(--font-family-playfair)]
                    text-2xl font-bold
                    text-[#1a1a1a]
                    mb-4
                  ">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {apartment.amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <span className="text-[#d4a574]">✓</span>
                        <span className="text-[#666666]">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                {apartment.is_available ? (
                  <>
                    <button className="
                      flex-1
                      bg-[#d4a574] text-white
                      px-10 py-4
                      border-none rounded-[2px]
                      font-semibold cursor-pointer
                      transition-all duration-300
                      uppercase tracking-wider text-[0.9rem]
                      
                      hover:bg-[#1a1a1a]
                      hover:-translate-y-0.5
                    ">
                      Schedule a Tour
                    </button>
                    <button className="
                      flex-1
                      bg-[#1a1a1a] text-white
                      px-10 py-4
                      border-none rounded-[2px]
                      font-semibold cursor-pointer
                      transition-all duration-300
                      uppercase tracking-wider text-[0.9rem]
                      
                      hover:bg-[#d4a574]
                      hover:-translate-y-0.5
                    ">
                      Contact Agent
                    </button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-[#666666] text-lg">
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