// components/LoadingSpinner.tsx
import React from 'react';
import { Spinner } from '@nextui-org/react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Spinner
                size="lg"
                color="primary"
                className="animate-spin"
            />
        </div>
    );
};

export default LoadingSpinner;
