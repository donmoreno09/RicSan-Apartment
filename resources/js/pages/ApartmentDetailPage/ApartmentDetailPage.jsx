/**
 * ApartmentDetailPage Component
 * 
 * Displays detailed information about a single apartment.
 * Will show images, specs, amenities, and contact form.
 */

import { useParams } from 'react-router-dom';

const ApartmentDetailPage = () => {
  // Extract 'id' from URL (e.g., /apartments/1 -> id = "1")
  const { id } = useParams();
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Apartment Detail Page</h1>
      <p>Showing details for apartment ID: {id}</p>
      <p>Full implementation coming in Task #5.</p>
    </div>
  );
};

export default ApartmentDetailPage;
