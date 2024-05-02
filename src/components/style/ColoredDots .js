import React from 'react';

const ColoredDots = () => {
    // Define an array of colors for the dots
    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-pink-500',
    ];

    return (
        <div className="flex mb-5">
            {/* Map through the colors array to render each dot with a different color */}
            {colors.map((color, index) => (
                <span key={index} className={`w-2 h-2 rounded-full mr-2 ${color}`}></span>
            ))}
        </div>
    );
};

export default ColoredDots;
