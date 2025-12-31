// /**
//  * App Component
//  * 
//  * Root component of the React application.
//  * Sets up routing for all pages.
//  * 
//  * Note: In Laravel + React setup, this is resources/js/app.jsx
//  */

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// /**
//  * What BrowserRouter does:
//  * - Provides routing context to entire app
//  * - Uses HTML5 history API for clean URLs (no # in URL)
//  * - Listens to URL changes and updates UI
//  * 
//  * Routes Component:
//  * - Container for all Route definitions
//  * - Only one Routes per router
//  * 
//  * Route Component:
//  * - Defines a URL pattern and component to render
//  * - path = URL to match
//  * - element = Component to render when path matches
//  */

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 
//           Home Route
//           Path: /
//           When: User visits root URL
//         */}
//         <Route 
//           path="/" 
//           element={
//             <div style={{ padding: '2rem' }}>
//               <h1>RicSan's Apartment Showcase</h1>
//               <p>Homepage - Coming Soon</p>
//             </div>
//           } 
//         />
        
//         {/* 
//           Apartment Detail Route
//           Path: /apartments/:id
//           :id = dynamic parameter (e.g., /apartments/1, /apartments/2)
//           When: User clicks on an apartment card
//         */}
//         <Route 
//           path="/apartments/:id" 
//           element={
//             <div style={{ padding: '2rem' }}>
//               <h1>Apartment Detail</h1>
//               <p>Detail Page - Coming Soon</p>
//             </div>
//           } 
//         />
        
//         {/* 
//           404 Not Found Route
//           Path: *
//           * = wildcard, matches any path not matched above
//           When: User visits invalid URL
//         */}
//         <Route 
//           path="*" 
//           element={
//             <div style={{ padding: '2rem' }}>
//               <h1>404 - Page Not Found</h1>
//               <p>The page you're looking for doesn't exist.</p>
//             </div>
//           } 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ApartmentDetailPage from './pages/ApartmentDetailPage/ApartmentDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

// Mount React app to #app div
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);