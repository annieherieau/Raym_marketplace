import React, { useEffect } from 'react';
import anime from 'animejs';
import './Banner.css';

const Banner = () => {
  useEffect(() => {
    var textWrapper = document.querySelector('.letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
      .add({
        targets: '.letter',
        rotateY: [-90, 0],
        duration: 7000,
        delay: (el, i) => 45 * i
      });
  }, []);

  return (
    <div className="banner p-6 py-12 text-black mx-8" style={{ background: 'linear-gradient(to right, palegreen, skyblue, turquoise, skyblue, palegreen)'}}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h2 className="ml10 text-center text-5xl tracking-tighter font-bold">
            <div className="text-container">
              <span className="static-text">Soldes d'été :</span> <span className="letters spaced">-30% sur les VTT</span>
            </div>
          </h2>
          <div className="space-x-2 text-center py-2 lg:py-0">
            <h4>Livraison offerte avec le code :</h4>
            <span className="font-bold text-lg">RAYMFREE</span>
          </div>
          <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-900 text-white border-black">Je fonce !</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
