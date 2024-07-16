import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse-slow opacity-75"></div>
        <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
