import { useRef, useEffect } from 'react';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import ApartmentCard from '../../components/molecules/ApartmentCard/ApartmentCard';
import FilterPanel from '../../components/organisms/FilterPanel/FilterPanel';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import AmenitiesSection from '../../components/organisms/AmenitiesSection/AmenitiesSection';
import ActiveFilters from '../../components/molecules/ActiveFilters/ActiveFilters';
import useApartments from '../../hooks/useApartments';
import useSearch from '../../hooks/useSearch';

const HomePage = () => {
  const cardsRef = useRef([]);
  
  // Get all apartments from context
  const { loading, error } = useApartments();
  
  // Get search/filter functionality
  const {
    searchTerm,
    filters,
    filteredApartments,
    search,
    updateFilter,
    removeFilter,
    clearSearch,
    clearFilters,
    activeFilterCount,
  } = useSearch();
  
  // Scroll animation
  useEffect(() => {
    if (filteredApartments.length === 0) return;
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
        }
      });
    }, observerOptions);
    
    cardsRef.current.forEach(card => {
      if (card) {
        card.classList.remove('visible');
        observer.observe(card);
      }
    });
    
    return () => observer.disconnect();
  }, [filteredApartments]);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection 
        title="Luxury Living<br/>Redefined"
        subtitle="Discover Your Perfect Urban Sanctuary"
        ctaText="Explore Apartments"
      />
      
      {/* Apartments Section */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 bg-[#f5f1ed]">
        <div className="text-center mb-12">
          <h2 className="
            font-[family-name:var(--font-family-playfair)]
            text-[3.5rem] font-bold
            text-[#1a1a1a]
            mb-4 tracking-tight
          ">
            Available Residences
          </h2>
          <p className="text-[1.1rem] text-[#666666]">
            {loading 
              ? 'Loading...' 
              : `${filteredApartments.length} ${filteredApartments.length === 1 ? 'apartment' : 'apartments'} found`
            }
          </p>
        </div>
        
        {/* Filter Panel */}
        {!loading && (
          <>
            <FilterPanel
              searchTerm={searchTerm}
              filters={filters}
              onSearchChange={search}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
            />
            
            {/* Active Filter Chips */}
            <ActiveFilters
              searchTerm={searchTerm}
              filters={filters}
              onRemoveSearch={clearSearch}
              onRemoveFilter={removeFilter}
            />
          </>
        )}
        
        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d4a574]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="
              font-[family-name:var(--font-family-playfair)]
              text-3xl font-bold
              text-[#1a1a1a]
              mb-4
            ">
              {error}
            </h3>
          </div>
        ) : filteredApartments.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="
              font-[family-name:var(--font-family-playfair)]
              text-3xl font-bold
              text-[#1a1a1a]
              mb-4
            ">
              No apartments found
            </h3>
            <p className="text-[#666666] mb-8">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={clearFilters}
              className="
                bg-[#d4a574] text-white
                px-8 py-3
                border-none rounded-[2px]
                font-semibold cursor-pointer
                transition-all duration-300
                uppercase tracking-wider
                
                hover:bg-[#1a1a1a]
                hover:-translate-y-0.5
              "
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredApartments.map((apartment, index) => (
              <div 
                key={apartment.id}
                ref={el => cardsRef.current[index] = el}
                className="card-animate"
              >
                <ApartmentCard apartment={apartment} />
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Amenities Section */}
      <AmenitiesSection />  
    </MainLayout>
  );
};

export default HomePage;