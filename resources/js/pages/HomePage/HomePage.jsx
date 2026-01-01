import { useState, useEffect, useRef } from 'react';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import ApartmentCard from '../../components/molecules/ApartmentCard/ApartmentCard';
import { apartmentService } from '../../services';

const HomePage = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);
  
  // Fetch apartments
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const response = await apartmentService.getAll();
        setApartments(response.data.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApartments();
  }, []);
  
  // Scroll animation - EXACT from reference
  useEffect(() => {
    if (apartments.length === 0) return;
    
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
      if (card) observer.observe(card);
    });
    
    return () => observer.disconnect();
  }, [apartments]);
  
  return (
    <MainLayout>
      {/* Hero Section - EXACT from reference */}
      <section className="
        h-screen relative
        flex items-center justify-center
        overflow-hidden
        mt-20
      ">
        {/* Background */}
        <div className="
          absolute top-0 left-0 w-full h-full
          bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]
          z-0
        "></div>
        
        {/* Pattern Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 165, 116, 0.5) 35px, rgba(212, 165, 116, 0.5) 70px)'
          }}
        ></div>
        
        {/* Content */}
        <div className="
          relative z-[2]
          text-center text-white
          max-w-[1000px] px-8
          animate-fadeInUp
        ">
          <h1 className="
            font-[family-name:var(--font-family-playfair)]
            text-[6rem] md:text-[6rem] hero-title-mobile
            font-black leading-[1.1]
            mb-6 tracking-[-2px]
            animate-fadeInUp-delayed-1
          ">
            Luxury Living<br/>Redefined
          </h1>
          
          <p className="
            text-[1.3rem] hero-subtitle-mobile
            font-light
            text-white/80
            mb-12 tracking-[2px]
            uppercase
            animate-fadeInUp-delayed-2
          ">
            Discover Your Perfect Urban Sanctuary
          </p>
          
          <div className="animate-fadeInUp-delayed-3">
            <button className="
              bg-[#d4a574] text-white
              px-12 py-4
              border-none rounded-[2px]
              font-semibold cursor-pointer
              transition-all duration-300
              uppercase tracking-wider text-base
              
              hover:bg-[#1a1a1a]
              hover:-translate-y-0.5
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
            ">
              Explore Apartments
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="
          absolute bottom-12 left-1/2
          -translate-x-1/2
          text-white text-[0.85rem]
          tracking-[2px] uppercase
          animate-bounce-slow
        ">
          Scroll Down ↓
        </div>
      </section>
      
      {/* Apartments Section - EXACT from reference */}
      <section className="max-w-[1400px] mx-auto px-8 py-32">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="
            font-[family-name:var(--font-family-playfair)]
            text-[3.5rem] font-bold
            text-[#1a1a1a]
            mb-4 tracking-tight
          ">
            Available Residences
          </h2>
          <p className="text-[1.1rem] text-[#666666]">
            {loading ? 'Loading...' : `${apartments.length} exclusive apartments designed for modern living`}
          </p>
        </div>
        
        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d4a574]"></div>
          </div>
        ) : (
          <div className="
            grid gap-12
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          ">
            {apartments.map((apartment, index) => (
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
      
      {/* Features Section - EXACT from reference */}
      <section className="
        bg-[#1a1a1a] text-white
        py-32 px-8
        relative overflow-hidden
      ">
        {/* Pattern */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(212, 165, 116, 0.03) 50px, rgba(212, 165, 116, 0.03) 100px)'
          }}
        ></div>
        
        <div className="max-w-[1400px] mx-auto relative z-[1]">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="
              font-[family-name:var(--font-family-playfair)]
              text-[3.5rem] font-bold
              mb-4
            ">
              Premium Amenities
            </h2>
            <p className="text-white/70 text-[1.1rem]">
              Experience elevated urban living with world-class facilities
            </p>
          </div>
          
          {/* Grid */}
          <div className="
            grid gap-16
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
          ">
            {[
              {
                title: 'Prime Location',
                desc: 'Situated in the heart of the city with easy access to shopping, dining, and entertainment venues.'
              },
              {
                title: '24/7 Concierge',
                desc: 'Professional concierge service available around the clock to assist with all your needs.'
              },
              {
                title: 'Fitness Center',
                desc: 'State-of-the-art gym with modern equipment, yoga studio, and personal training services.'
              },
              {
                title: 'Secure Parking',
                desc: 'Underground parking with 24/7 security surveillance and EV charging stations.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="
                  w-20 h-20 mx-auto mb-8
                  bg-[#d4a574] rounded-full
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-[5deg]
                ">
                  <div className="w-10 h-10"></div>
                </div>
                <h3 className="
                  font-[family-name:var(--font-family-playfair)]
                  text-2xl font-bold
                  mb-4
                ">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;