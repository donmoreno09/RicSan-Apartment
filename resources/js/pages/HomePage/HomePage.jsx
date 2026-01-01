/**
 * HomePage Component - Enhanced Design
 * 
 * Matches original design reference with pattern overlay,
 * full-height hero, and premium styling.
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import ApartmentGrid from '../../components/organisms/ApartmentGrid/ApartmentGrid';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import Button from '../../components/atoms/Button/Button';
import { apartmentService } from '../../services';

const HomePage = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const response = await apartmentService.getAll();
        setApartments(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching apartments:', err);
        setError('Failed to load apartments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApartments();
  }, []);
  
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      try {
        setLoading(true);
        const response = await apartmentService.getAll();
        setApartments(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load apartments.');
      } finally {
        setLoading(false);
      }
      return;
    }
    
    try {
      setLoading(true);
      const response = await apartmentService.search({ name: searchTerm });
      setApartments(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MainLayout>
      {/* Enhanced Hero Section - Full Height with Pattern */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-24">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary] to-[--color-primary-light] z-0"></div>
        
        {/* Diagonal Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] z-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(212, 165, 116, 0.5) 35px,
              rgba(212, 165, 116, 0.5) 70px
            )`
          }}
        ></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-[1000px] px-8 animate-fadeInUp">
          <h1 className="
            font-[family-name:--font-family-playfair] 
            text-6xl md:text-[6rem] 
            font-black 
            leading-[1.1] 
            tracking-[-0.02em]
            mb-6
            text-shadow
          ">
            Urban Living<br/>Redefined
          </h1>
          
          <p className="
            text-xl md:text-2xl 
            font-light 
            text-white/80 
            mb-12 
            tracking-[0.1em]
            uppercase
          ">
            Luxury Apartments in Prime Locations
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search luxury apartments..." />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large">
              View Apartments
            </Button>
            <Button variant="outline" size="large">
              Schedule Tour
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
      
      {/* Error Message */}
      {error && (
        <section className="py-8 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          </div>
        </section>
      )}
      
      {/* Featured Apartments Section */}
      <section className="py-24 bg-[--color-light]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              font-[family-name:--font-family-playfair] 
              text-5xl font-bold 
              text-[--color-primary] 
              mb-6
              tracking-tight
            ">
              Featured Apartments
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              {loading 
                ? 'Loading our premium properties...' 
                : `Discover ${apartments.length} handpicked ${apartments.length === 1 ? 'residence' : 'residences'}`
              }
            </p>
          </div>
          
          <ApartmentGrid apartments={apartments} loading={loading} />
          
          {!loading && apartments.length > 0 && (
            <div className="text-center mt-16">
              <Button variant="outline" size="large">
                View All {apartments.length} Apartments
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Premium Amenities Section - Matching Original */}
      <section className="py-24 bg-[--color-primary] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              font-[family-name:--font-family-playfair] 
              text-5xl font-bold 
              mb-6
            ">
              Premium Amenities
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Experience elevated urban living with world-class facilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Amenity 1 */}
            <div className="text-center group">
              <div className="
                w-20 h-20 mx-auto mb-6
                flex items-center justify-center
                bg-[--color-accent]/20
                rounded-full
                group-hover:bg-[--color-accent]/30
                transition-all duration-300
              ">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-3">
                Prime Location
              </h3>
              <p className="text-white/70 leading-relaxed">
                Situated in the heart of the city with easy access to shopping, dining, and entertainment.
              </p>
            </div>
            
            {/* Amenity 2 */}
            <div className="text-center group">
              <div className="
                w-20 h-20 mx-auto mb-6
                flex items-center justify-center
                bg-[--color-accent]/20
                rounded-full
                group-hover:bg-[--color-accent]/30
                transition-all duration-300
              ">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-3">
                24/7 Concierge
              </h3>
              <p className="text-white/70 leading-relaxed">
                Professional concierge service available around the clock to assist with all your needs.
              </p>
            </div>
            
            {/* Amenity 3 */}
            <div className="text-center group">
              <div className="
                w-20 h-20 mx-auto mb-6
                flex items-center justify-center
                bg-[--color-accent]/20
                rounded-full
                group-hover:bg-[--color-accent]/30
                transition-all duration-300
              ">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-3">
                Fitness Center
              </h3>
              <p className="text-white/70 leading-relaxed">
                State-of-the-art gym with modern equipment, yoga studio, and personal training services.
              </p>
            </div>
            
            {/* Amenity 4 */}
            <div className="text-center group">
              <div className="
                w-20 h-20 mx-auto mb-6
                flex items-center justify-center
                bg-[--color-accent]/20
                rounded-full
                group-hover:bg-[--color-accent]/30
                transition-all duration-300
              ">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"/>
                </svg>
              </div>
              <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-3">
                Secure Parking
              </h3>
              <p className="text-white/70 leading-relaxed">
                Underground parking with 24/7 security surveillance and EV charging stations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="
                font-[family-name:--font-family-playfair] 
                text-6xl font-bold 
                text-[--color-accent] 
                mb-3
              ">
                {apartments.length}+
              </div>
              <p className="text-gray-600 text-xl">Premium Properties</p>
            </div>
            <div>
              <div className="
                font-[family-name:--font-family-playfair] 
                text-6xl font-bold 
                text-[--color-accent] 
                mb-3
              ">
                {apartments.filter(apt => apt.is_available).length}
              </div>
              <p className="text-gray-600 text-xl">Available Now</p>
            </div>
            <div>
              <div className="
                font-[family-name:--font-family-playfair] 
                text-6xl font-bold 
                text-[--color-accent] 
                mb-3
              ">
                100%
              </div>
              <p className="text-gray-600 text-xl">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;