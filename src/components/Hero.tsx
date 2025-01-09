import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/img/assets/landing-background.jpeg')` }}>
        <div className="absolute inset-0 bg-dark opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-12 inline-block">
          <h1 className="text-4xl font-extrabold text-[#794422] sm:text-5xl lg:text-6xl">
            Edotourism Suhita Bee Farm
          </h1>
          <p className="mt-4 text-lg text-[#794422]">
            Bees Education, Ecoprint, Camping, FnB
          </p>
          <div className="mt-8">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
