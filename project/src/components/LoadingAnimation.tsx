import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Bike Chain */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center">
            {/* Chain Links */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-8 border-2 border-green-400 rounded-full mx-1 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2 animate-bounce"
                     style={{
                       animationDelay: `${i * 0.1}s`,
                       animationDuration: '0.8s'
                     }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logo with Black Circle Background */}
        <div className="mb-6 relative">
          {/* Black Circle Background */}
          <div className="w-32 h-32 bg-black rounded-full mx-auto flex items-center justify-center">
            <img 
              src="/WhatsApp Image 2025-06-15 at 20.44.47_3a0e9661.jpg" 
              alt="The Bike Mech Logo" 
              className="w-24 h-24 rounded-full animate-pulse"
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">THE BIKE MECH</h2>
          <p className="text-green-400 animate-pulse">Getting your ride ready...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;