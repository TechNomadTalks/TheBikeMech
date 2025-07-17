import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingAnimation from './components/LoadingAnimation';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading animation for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'tours':
        return <Tours />;
      case 'booking':
        return <Booking />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;