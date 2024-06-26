import BrandHero from '../../components/BrandHero/BrandHero';
import bike1 from '../../assets/VELO6RAPTOR-RAYM.png';
import bike2 from '../../assets/OnRoad-Raym.png';
import bike3 from '../../assets/Hybrid-Raym.png';

const Brand = () => {
    return (
        <div className="bg-black text-white rounded-xl" style={{ fontFamily: 'Roboto' }}>
            {/* Section d'en-tête */}
            <section className="text-white body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row justify-center items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white" style={{ fontFamily: 'Chakra Petch', color: 'rgb(74, 255, 170)' }}>
                            Bienvenue chez <img src="/src/assets/raymW.png" alt="" className='w-80 h-30 pt-5' />
                        </h1>
                    </div>
                </div>
            </section>

            {/* Texte supplémentaire */}
            <section className="text-white body-font">
                <div className="container mx-auto flex px-16 py-24 md:flex-row flex-col items-center justify-center">
                    <div className="lg:flex-grow lg:w-2/3 md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center">
                        <p className="mb-8 text-center text-2xl">
                            Raym Cycling a été fondé en 2024 dans un petit atelier niché au cœur de la ville de Pontchâteau, en Loire-Atlantique, France. Ce lieu unique, entouré par les montagnes majestueuses et les sentiers de VTT légendaires, est devenu le berceau de nos innovations et de notre passion pour le cyclisme. Partageant l'espace avec des artisans locaux, des studios de création artistique et des ateliers de fabrication de matériel de montagne, notre atelier est un véritable creuset de créativité et de collaboration.
                        </p>
                        <p className="mb-8 text-center text-2xl">
                            Notre premier modèle, le Raym Raptor, un VTT tout-suspendu de 100mm, a révolutionné le marché dès son lancement. Conçu pour affronter les terrains les plus exigeants, il a immédiatement propulsé Raym Cycling sur le devant de la scène des VTT haut de gamme. Avec des matériaux avancés et des technologies de pointe, le Raym Raptor a incarné notre engagement envers l'innovation et la qualité.
                        </p>
                        <p className="mb-8 text-center text-2xl">
                            Aujourd'hui, après plusieurs années et de nombreux modèles, nous continuons à repousser les limites du possible. Chaque vélo que nous produisons est le résultat d'une recherche méticuleuse et d'une passion sans bornes pour le VTT. Nous intégrons les technologies les plus avancées et les matériaux les plus performants pour offrir une expérience de conduite exceptionnelle.
                        </p>
                        <p className="mb-8 text-center text-2xl">
                            Que vous soyez un amateur de descentes techniques, un passionné de cross-country ou un aventurier cherchant à explorer de nouveaux horizons, Raym Cycling a un VTT qui répondra à vos attentes. Nos vélos sont conçus pour offrir performance, durabilité et style, vous permettant de profiter pleinement de chaque sortie.
                        </p>
                        <p className="mb-8 text-center text-2xl">
                            Nous sommes fiers de notre héritage, de notre dévouement à la qualité et de notre engagement envers chaque cycliste qui choisit Raym. Découvrez notre gamme de VTT, explorez nos valeurs et rejoignez la communauté Raym Cycling pour une expérience de VTT qui dépasse toutes vos attentes.
                        </p>
                        <p className="mb-8 text-center text-2xl">
                            Bienvenue dans l'univers de Raym Cycling, où chaque vélo raconte une histoire et chaque sentier devient une aventure.
                        </p>
                    </div>
                </div>
            </section>

            <div className="flex justify-center w-full mt-8">
                <a href="/" className="inline-flex items-center justify-center text-white text-2xl bg-green-400 border-0 py-3 px-8 focus:outline-none hover:bg-green-200 rounded-lg" style={{ width: '200px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.75), 0 2px 4px -1px rgba(34, 197, 94, 0.75)' }}>
                    Explorer
                </a>
            </div>

            {/* Sections alternées */}
            <section className="text-white body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover object-center rounded" alt="velo de montagne" src={bike3} />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h2 className="title-font text-3xl mb-4 font-medium text-white" style={{ fontFamily: 'Chakra Petch', color: 'rgb(74, 255, 170)' }}>Raym Hybrid</h2>
                        <p className="mb-8 leading-relaxed text-2xl">
                            Conçu pour les aventures les plus extrêmes, notre vélo de montagne combine performance et durabilité.
                        </p>
                    </div>
                </div>
            </section>

            <section className="text-white body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h2 className="title-font text-3xl mb-4 font-medium text-white" style={{ fontFamily: 'Chakra Petch', color: 'rgb(74, 255, 170)' }}>Raym OnRoad</h2>
                        <p className="mb-8 leading-relaxed text-2xl">
                            Parfait pour les déplacements en ville, notre vélo urbain allie confort et praticité.
                        </p>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover object-center rounded" alt="velo urbain" src={bike2} />
                    </div>
                </div>
            </section>

            <section className="text-white body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover object-center rounded" alt="velo électrique" src={bike1} />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h2 className="title-font text-3xl mb-4 font-medium text-white" style={{ fontFamily: 'Chakra Petch', color: 'rgb(74, 255, 170)' }}>Raym OffRoad</h2>
                        <p className="mb-8 leading-relaxed text-2xl">
                            Redécouvrez le plaisir de rouler avec notre gamme de vélos électriques innovants.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Brand;
