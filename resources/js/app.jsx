import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApartmentProvider } from './context/ApartmentContext';
import HomePage from './pages/HomePage/HomePage';
import ApartmentDetailPage from './pages/ApartmentDetailPage/ApartmentDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <ApartmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ApartmentProvider>
  );
}

// Mount React app
if (document.getElementById('app')) {
  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;