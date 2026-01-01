/**
 * NotFoundPage Component
 * 
 * 404 page for invalid routes.
 */

import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Button from '../../components/atoms/Button/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="text-9xl font-[family-name:--font-family-playfair] font-bold text-[--color-gold] mb-4">
            404
          </div>
          <h1 className="font-[family-name:--font-family-playfair] text-4xl font-bold text-[--color-charcoal] mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Button variant="primary" size="large" onClick={handleGoHome}>
            Back to Home
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;