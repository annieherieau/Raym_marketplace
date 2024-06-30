import React from 'react';
import tdfLogo from '/../../assets/TdfLogo.jpg';
import labLogo from '/../../assets/LabLogo.jpg';
import onRoadMalo from '/../../assets/CorsicaEiffel.jpg'; 
import rafaleLogo from '/../../assets/RafaleLogo.jpg';
import HybridGreen from '/../../assets/HybridGreen.png'; 
import moteurVideo from '/../../assets/moteur.mp4';

const BentoGridTwo = () => {
    return (
        <section className="text-gray-600 body-font ml-8 mr-8 mb-8 mt-8" style={{ background: 'repeating-linear-gradient(45deg, #000, #000 10px, #444 10px, #444 20px)', borderRadius: '20px' }}>
            <div className="container px-5 py-8 mx-auto flex flex-wrap">
                <div className="flex w-full mb-8 flex-wrap">
                    <h1 className="sm:text-3xl text-2xl title-font lg:mb-0 mb-4" style={{ backgroundColor: 'black', fontSize: '2.4rem' }}>
                        <span style={{ fontFamily: 'Sonder Regular', color: 'yellow' }}>LA RAFALE :</span> <span style={{ color: 'white' }}>Élégance et puissance, leader incontesté</span>
                    </h1>                
                </div>
                <div className="flex flex-wrap md:-m-2 -m-1">
                    <div className="flex flex-wrap w-1/2">
                        <div className="md:p-2 p-1 w-1/2">
                            <img alt="gallery" className="w-full object-cover h-full object-center block" src={tdfLogo} style={{ borderRadius: '20px' }} />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img alt="gallery" className="w-full object-cover h-full object-center block" src={labLogo} style={{ borderRadius: '20px' }} />
                        </div>
                        <div className="md:p-2 p-1 w-full">
                            <img alt="gallery" className="w-full h-full object-cover object-center block" src={HybridGreen} style={{ borderRadius: '20px' }} /> 
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/2">
                        <div className="md:p-2 p-1 w-full video-container">
                            <video className="w-full h-full object-cover object-center block" autoPlay loop muted>
                                <source src={moteurVideo} type="video/mp4" />
                                Votre navigateur ne supporte pas les vidéos HTML5.
                            </video>
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img alt="gallery" className="w-full object-cover h-full object-center block" src={rafaleLogo} style={{ borderRadius: '20px' }} />
                        </div>
                        <div className="md:p-2 p-1 w-1/2" style={{ borderRadius: '20px' }}>
                            <img alt="gallery" className="w-full object-cover h-full object-center block" src={onRoadMalo} style={{ borderRadius: '20px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoGridTwo;
