import React from 'react';
import Header from './Header';
import type { LayoutProps } from '../../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="w-full mx-auto px-4 md:px-6 lg:px-8">
          <div className="animate-slide-up space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
