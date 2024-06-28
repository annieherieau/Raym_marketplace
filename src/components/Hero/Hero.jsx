import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/configurateur?category=${e.target.id}`)
  };
  return (
    <main>
      <section className="accueil-section">
        <div className="content">
          <button
            onClick={handleClick}
            id="On Road"
            className="border border-white text-white text-2xl font-chakra-petch mb-4 p-4 rounded-md button-hover"
          >
            ON ROAD
          </button>
        </div>
      </section>
      <section className="accueil-section">
        <div className="content">
          <button
            onClick={handleClick}
            id="Off Road"
            className="border border-white text-white text-2xl font-chakra-petch mb-4 p-4 rounded-md button-hover"
          >
            OFF ROAD
          </button>
        </div>
      </section>
      <section className="accueil-section">
        <div className="content">
          <button
            onClick={handleClick}
            id="Hybrid"
            className="border border-white text-white text-2xl font-chakra-petch mb-4 p-4 rounded-md button-hover"
          >
            HYBRID
          </button>
        </div>
      </section>
    </main>
  );
};

export default Hero;
