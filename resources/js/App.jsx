import React from 'react';

export default function App() {
    return (
        <div className="app">
            <header style={{
                padding: '2rem',
                background: '#2d3748',
                color: 'white',
                textAlign: 'center'
            }}>
                <h1>🏢 RicSan's Apartment Showcase</h1>
                <p>Welcome to your luxury apartment finder!</p>
            </header>
            <main>
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    margin: '2rem'
                }}>
                    <h2>✅ React is Working!</h2>
                    <p>Phase 1 Complete - Ready for Development</p>
                </div>
            </main>
        </div>
    );
}
