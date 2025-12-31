/**
 * MainLayout Template
 * 
 * Main page layout template that wraps all pages.
 * Includes Header, main content area, and Footer.
 * 
 * This is a template - it provides structure but receives
 * actual content via the children prop.
 */

import PropTypes from 'prop-types';
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';

const MainLayout = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

MainLayout.defaultProps = {
  className: '',
};

export default MainLayout;
