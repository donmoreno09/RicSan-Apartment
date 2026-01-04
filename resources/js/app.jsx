import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApartmentProvider } from './context/ApartmentContext';
import ErrorBoundary from './components/utils/ErrorBoundary';
import HomePage from './pages/HomePage/HomePage';
import ApartmentDetailPage from './pages/ApartmentDetailPage/ApartmentDetailPage';
import UploadTestPage from './pages/UploadTestPage/UploadTestPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <ErrorBoundary>
      <ApartmentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
            <Route path="/test-upload" element={<UploadTestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ApartmentProvider>
    </ErrorBoundary>
  );
}

if (document.getElementById('app')) {
  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;