import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner p-6 py-12 text-black mx-8" style={{ background: 'linear-gradient(to right, palegreen, skyblue, turquoise, skyblue, palegreen)'}}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h2 className="ml10 text-center text-5xl tracking-tighter font-bold">
            <div className="text-container">
              <span className="static-text">French Days : Des réductions à venir !</span> 
            </div>
          </h2>
          <a href="/shop" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-black text-white border-black">Je fonce !</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
