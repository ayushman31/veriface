import React from "react";

const IntroCard: React.FC = () => {
  return (
    <div className="
      w-full
      rounded-xl
      p-6 md:p-8
      bg-gray-800
      border border-gray-700
      shadow-sm
      animate-fade-in
    ">
      <h2 className="text-xl font-semibold mb-2 text-gray-100">
        Welcome to Veriface: A Deepfake Detection Tool
      </h2>

      <p className="text-gray-400 leading-relaxed">
        This tool helps you analyze video files to detect potential deepfakes. 
        Simply upload a video to begin the analysis.
      </p>
    </div>
  );
};

export default IntroCard;
