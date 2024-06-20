import jumbotronImage from '/src/assets/Images/jumbotron.png';

const Jumbotron = () => {
  return (
    <section className="text-gray-100 body-font bg-black">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-white">
            DÉCOUVREZ LE <span className="font-bold" style={{ color: 'palegreen' }}>VELO6RAPTOR PRORIDER™</span>
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Notre tout dernier VTT trail à la pointe de la technologie. 150mm RAYMtech™ Travel | MX Wheels</p>
        </div>
      </div>
      <div className="mx-8 mb-8">
        <img src={jumbotronImage} alt="Velo Image" className="w-full" style={{ borderRadius: '20px' }}/>
      </div>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-center">Un VTT léger, puissant, et surprenant. Toutes les caractéristiques d'un RAYM sur le terrain. 150mm de débattement d'une suspension RAYMtech™ légendaire, des roues MX et une géométrie moderne donnent au VÉLO6RAPTOR PRORIDER™ les habiletés d'un vélo de trail, dont le comportement naturel est simplement boosté par la structure du cadre en deux blocs monolythes 300.</p>
    </section>
  );
};

export default Jumbotron;
