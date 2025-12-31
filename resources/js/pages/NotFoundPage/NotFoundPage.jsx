/**
 * NotFoundPage Component
 * 
 * 404 error page shown when user visits invalid URL.
 */

const NotFoundPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#D4AF37' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
    </div>
  );
};

export default NotFoundPage;
