// components/LoadingSpinner/LoadingSpinner.jsx (Professional Version - Pure Tailwind)
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-50">
      <div  >
        <div className="relative mx-auto">
          {/* Base ring with shadow */}
          <div className="w-28 h-28 border-4 border-gray-300 dark:border-gray-700 rounded-full shadow-inner"></div>
          
          {/* Primary spinning ring - gradient effect */}
          <div className="absolute top-0 left-0 w-28 h-28 border-4 border-transparent border-t-amber-600 border-r-amber-500 rounded-full animate-spin"></div>
          
          
          {/* Secondary spinning ring - opposite direction */}
          <div className="absolute top-2 left-2 w-24 h-24 border-4 border-transparent border-b-amber-400 border-l-amber-300 rounded-full animate-spin"></div>
          
          {/* Center circle with glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-lg shadow-blue-500/30"></div>
        </div>
        
        <div className="space-y-4">
          {/* Title with fade animation */}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent animate-pulse">
            Loading...
          </h3>
          
  
          
      
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;