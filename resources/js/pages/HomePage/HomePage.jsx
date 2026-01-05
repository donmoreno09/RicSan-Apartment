/**
 * HomePage Component (Page)
 * 
 * Main landing page for RicSan's Apartments.
 * Orchestrates page layout by composing organism components.
 * 
 * HomePage now follows Single Responsibility Principle:
 * - Manages application state (filters, apartments data)
 * - Composes page from organism components
 * - NO rendering logic (delegated to components)
 * 
 * This is clean architecture in action!
 */

import MainLayout from '../../components/templates/MainLayout/MainLayout';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import ApartmentsListingSection from '../../components/organisms/ApartmentsListingSection/ApartmentsListingSection';
import AmenitiesSection from '../../components/organisms/AmenitiesSection/AmenitiesSection';
import useApartments from '../../hooks/useApartments';
import useSearch from '../../hooks/useSearch';

const HomePage = () => {
  // Fetch apartments data
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
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection 
        title="Luxury Living<br/>Redefined"
        subtitle="Discover Your Perfect Urban Sanctuary"
        ctaText="Explore Apartments"
      />
      
      {/* Apartments Listing Section */}
      <ApartmentsListingSection
        apartments={filteredApartments}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        filters={filters}
        onSearchChange={search}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        onClearSearch={clearSearch}
        onRemoveFilter={removeFilter}
        activeFilterCount={activeFilterCount}
      />
      
      {/* Amenities Section */}
      <AmenitiesSection />
    </MainLayout>
  );
};

export default HomePage;