const Partner = () => {
  return (
    <div className="h-auto">
      <div className="py-12 flex flex-col justify-center items-center space-y-10">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-sm md:text-base font-semibold leading-none text-black">NOUS TRAVAILLONS AVEC LES MEILLEURS</h1>
          <div className="w-9 h-0.5 bg-black" />
        </div>
        <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-16">
          <div className="w-11 h-11 md:w-16 md:h-16 lg:w-36 lg:h-36">
            <img className="object-contain w-full h-full" src="src/assets/PartnerContinental.png" alt="logo 1" />
          </div>
          <div className="w-11 h-11 md:w-14 md:h-14 lg:w-24 lg:h-24">
            <img className="object-contain w-full h-full" src="src/assets/PartnerFox.png" alt="logo 2" />
          </div>
          <div className="w-16 h-11 md:w-16 md:h-16 lg:w-44 lg:h-28">
            <img className="object-contain w-full h-full" src="src/assets/PartnerMichelin.png" alt="logo 3" />
          </div>
          <div className="w-14 h-14 md:w-20 md:h-20 lg:w-40 lg:h-40">
            <img className="object-contain w-full h-full" src="src/assets/PartnerRockrider.png" alt="logo 4" />
          </div>
          <div className="w-8 h-11 md:w-16 md:h-16 lg:w-20 lg:h-28">
            <img className="object-contain w-full h-full" src="src/assets/PartnerRockshox.png" alt="logo 5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
