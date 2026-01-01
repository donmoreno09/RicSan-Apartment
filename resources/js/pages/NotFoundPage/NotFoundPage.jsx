/**
 * NotFoundPage Component
 * 
 * 404 page for invalid routes.
 * Styled to match the design reference.
 */

import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout/MainLayout';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1ed] py-20">
        <div className="text-center px-8">
          <div className="
            font-[family-name:var(--font-family-playfair)]
            text-9xl font-bold
            text-[#d4a574]
            mb-4
          ">
            404
          </div>
          <h1 className="
            font-[family-name:var(--font-family-playfair)]
            text-4xl font-bold
            text-[#1a1a1a]
            mb-4
          ">
            Page Not Found
          </h1>
          <p className="text-[#666666] text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <button 
            onClick={handleGoHome}
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
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;