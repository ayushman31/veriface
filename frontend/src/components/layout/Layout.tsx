import React from 'react';
import Header from './Header';
import type { LayoutProps } from '../../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="max-w-4xl mx-auto">
          <div className="animate-slide-up space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
