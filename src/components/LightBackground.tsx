
import React from 'react';

const LightBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-70 pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      
      {/* Light Sparkles/Nova Effects */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      
      {/* Subtle animated circles */}
      <div className="absolute top-1/3 left-1/5 w-6 h-6 bg-primary/20 rounded-full animate-pulse-soft"></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-accent/20 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-primary/10 rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Fine pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
        backgroundSize: '20px 20px' 
      }}></div>
    </div>
  );
};

export default LightBackground;
