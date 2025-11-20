import React from "react";
import { Shield } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-800 border-b border-gray-700 py-4 px-6 mb-6">
      <div className="flex items-center space-x-2">
        <Shield className="w-7 h-7 text-teal-400" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">
          Veriface
        </h1>
      </div>
    </header>
  );
};

export default Header;
