import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f1ed] px-8">
          <div className="text-center">
            <div className="text-8xl mb-8">⚠️</div>
            <h1 className="
              font-[family-name:var(--font-family-playfair)]
              text-5xl font-bold text-[#1a1a1a] mb-4
            ">
              Oops! Something went wrong
            </h1>
            <p className="text-[#666666] text-lg mb-8">
              We're sorry for the inconvenience.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="
                bg-[#d4a574] text-white px-8 py-3
                border-none rounded-[2px] font-semibold
                uppercase tracking-wider
                hover:bg-[#1a1a1a] transition-all duration-300
              "
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
