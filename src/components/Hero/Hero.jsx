import React from 'react';

const Hero = () => {
  return (
    <main>
      <section className="accueil-section">
        <div className="content">
          <button className="border border-white text-white text-2xl font-chakra-petch mb-4 p-4 rounded-md button-hover">
            ON ROAD
          </button>
        </div>
      </section>
      <section className="accueil-section">
        <div className="content">
          <button className="border border-white text-white text-2xl font-chakra-petch mb-4 p-4 rounded-md button-hover">
            OFF ROAD
          </button>
        </div>
      </section>
      <section className="accueil-section">
        <div className="content">
          <button className="border border-white text-white text-2xl font-chakra-petch mb-4 p-4 rounded-md button-hover">
            HYBRID
          </button>
        </div>
      </section>
    </main>
  );
};

export default Hero;
