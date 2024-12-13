// src/components/common/Loading.tsx
import React from 'react';

export const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
};