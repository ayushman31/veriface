import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 md:py-16">
      <div className="animate-fade-in space-y-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          VeriFace
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Detection of Deepfake Videos using Deep Learning
        </p>
      </div>
    </header>
  );
};

export default Header;
