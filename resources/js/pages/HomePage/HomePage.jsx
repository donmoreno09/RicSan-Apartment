import React from 'react';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import ApartmentGrid from '../../components/organisms/ApartmentGrid/ApartmentGrid';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import Button from '../../components/atoms/Button/Button';
import Badge from '../../components/atoms/Badge/Badge';
import Input from '../../components/atoms/Input/Input';

const HomePage = () => {
  // Mock apartment data for testing
  const mockApartments = [
    {
      id: 1,
      name: 'Luxury Penthouse',
      description: 'Beautiful penthouse with stunning city views and premium amenities. Perfect for professionals.',
      bedrooms: 3,
      bathrooms: 2,
      square_feet: 2500,
      price: 4500,
      is_available: true,
      images: []
    },
    {
      id: 2,
      name: 'Modern Studio',
      description: 'Cozy studio apartment in downtown area with all amenities included.',
      bedrooms: 1,
      bathrooms: 1,
      square_feet: 600,
      price: 1800,
      is_available: false,
      images: []
    },
    {
      id: 3,
      name: 'Family Townhouse',
      description: 'Spacious 4-bedroom townhouse with private backyard and garage.',
      bedrooms: 4,
      bathrooms: 3,
      square_feet: 3200,
      price: 5200,
      is_available: true,
      images: []
    },
  ];
  
  const handleSearch = (term) => {
    console.log('Searching for:', term);
  };
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[--color-charcoal] to-[--color-charcoal-light] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:--font-family-playfair] text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Apartment
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover luxury living spaces in prime locations. Your perfect home awaits.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
      {/* Featured Apartments */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:--font-family-playfair] text-4xl font-bold text-[--color-charcoal] mb-4">
              Featured Apartments
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our handpicked selection of premium properties
            </p>
          </div>
          
          <ApartmentGrid apartments={mockApartments} />
        </div>
      </section>
      
      {/* Component Testing Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:--font-family-playfair] text-3xl font-bold text-[--color-charcoal] mb-8">
            Component Testing
          </h2>
          
          {/* Buttons */}
          <div className="mb-12">
            <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="large">Large</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="mb-12">
            <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-4">Badges</h3>
            <div className="flex gap-4">
              <Badge status="available" />
              <Badge status="rented" />
            </div>
          </div>
          
          {/* Inputs */}
          <div className="mb-12">
            <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold mb-4">Inputs</h3>
            <div className="flex flex-col gap-4 max-w-md">
              <Input placeholder="Normal input" />
              <Input placeholder="Error input" error="This field is required" />
              <Input placeholder="Success input" success={true} />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;