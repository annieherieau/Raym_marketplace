import jumbotronImage from '../../assets/jumbotron.png';

const BrandHero = () => {
  return (
    <section className="text-gray-100 bg-black body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col w-full text-center">
          <h1 className="mb-4 text-4xl font-medium text-white sm:text-5xl title-font">
            <span className="font-bold" style={{ color: 'palegreen' }}>RAYM™<small>since 2024</small></span>
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">Notre tout dernier VTT trail à la pointe de la technologie. 150mm RAYMtech™ Travel | MX Wheels</p>
        </div>
      </div>
      <div className="mx-8 mb-8">
        <img src={jumbotronImage} alt="Velo Image" className="w-full" style={{ borderRadius: '20px' }}/>
      </div>
      <p className="mx-auto leading-relaxed text-center lg:w-2/3">Un VTT léger, puissant, et surprenant. Toutes les caractéristiques d'un RAYM sur le terrain. 150mm de débattement d'une suspension RAYMtech™ légendaire, des roues MX et une géométrie moderne donnent au VÉLO6RAPTOR PRORIDER™ les habiletés d'un vélo de trail, dont le comportement naturel est simplement boosté par la structure du cadre en deux blocs monolythes 300.</p>
    </section>
  );
};

export default BrandHero;