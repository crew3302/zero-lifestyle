// src/components/common/PageShell.tsx
import React from 'react';

interface PageShellProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageShell: React.FC<PageShellProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`pt-28 pb-16 bg-gray-50 min-h-screen ${className}`}> {/* Increased pt to avoid overlap with taller fixed header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PageShell;