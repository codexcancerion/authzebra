import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="relative">
                <div className="w-24 h-24 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-b-4 border-blue-500 rounded-full animate-pulse opacity-50"></div>
            </div>
            <span className="ml-4 text-lg font-semibold text-blue-500">Loading...</span>
        </div>
    );
}

export default LoadingSpinner;
