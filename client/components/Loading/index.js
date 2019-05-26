import React from 'react';

const Loading = () => {
    return (
        <div className="w-full bg-transparent mt-4 flex flex-row items-center justify-center">
            <p className="p-16 h-64 text-blue-600 text-6xl">
                Loading <span className="text-orange-600">.</span>
                <span className="text-blue-500">.</span>
                <span className="text-yellow-500">.</span>
            </p>
        </div>
    );
};

export default Loading;
