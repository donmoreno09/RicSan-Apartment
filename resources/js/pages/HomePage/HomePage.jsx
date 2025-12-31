import React from 'react';
import Button from '../../components/atoms/Button/Button';
import Badge from '../../components/atoms/Badge/Badge';
import Input from '../../components/atoms/Input/Input';
import ApartmentCard from '../../components/molecules/ApartmentCard/ApartmentCard';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';

const HomePage = () => {
  const mockApartment = {
    id: 1,
    name: 'Luxury Penthouse',
    description: 'Beautiful penthouse with stunning city views and premium amenities. Perfect for professionals.',
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 2500,
    price: 4500,
    is_available: true,
    images: []
  };
  
  const handleSearch = (term) => {
    console.log('Searching for:', term);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-[family-name:--font-family-playfair] text-5xl font-bold text-[--color-charcoal] mb-12">
          Component Testing
        </h1>
        
        {/* Buttons */}
        <section className="mb-12">
          <h2 className="font-[family-name:--font-family-playfair] text-3xl font-bold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="large">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>
        
        {/* Badges */}
        <section className="mb-12">
          <h2 className="font-[family-name:--font-family-playfair] text-3xl font-bold mb-6">Badges</h2>
          <div className="flex gap-4">
            <Badge status="available" />
            <Badge status="rented" />
          </div>
        </section>
        
        {/* Inputs */}
        <section className="mb-12">
          <h2 className="font-[family-name:--font-family-playfair] text-3xl font-bold mb-6">Inputs</h2>
          <div className="flex flex-col gap-4 max-w-md">
            <Input placeholder="Normal input" />
            <Input placeholder="Error input" error="This field is required" />
            <Input placeholder="Success input" success={true} />
          </div>
        </section>
        
        {/* SearchBar */}
        <section className="mb-12">
          <h2 className="font-[family-name:--font-family-playfair] text-3xl font-bold mb-6">SearchBar</h2>
          <SearchBar onSearch={handleSearch} />
        </section>
        
        {/* ApartmentCard */}
        <section className="mb-12">
          <h2 className="font-[family-name:--font-family-playfair] text-3xl font-bold mb-6">ApartmentCard</h2>
          <div className="max-w-md">
            <ApartmentCard apartment={mockApartment} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;