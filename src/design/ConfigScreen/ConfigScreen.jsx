import offRoadConfig from '../../Images/offRoad-config.png'; 
import veloIcon from '../../Images/veloIcon.png';
import tshirtIcon from '../../Images/tshirtIcon.png';
import configIcon from '../../Images/configIcon.png';

const ConfigScreen = () => {
    return (
        <section 
            className="bg-gray-100 text-gray-800 relative m-8" 
            style={{ backgroundImage: `url(${offRoadConfig})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '40px' }}
        >
            <h1 className="text-3xl font-semibold tracking-widest uppercase text-white absolute top-6 left-1/2 transform -translate-x-1/2" style={{ fontFamily: '"Chakra Petch", sans-serif' }}>CONFIGURATEUR</h1>
            <aside className="w-full p-6 sm:w-60" style={{ backgroundColor: 'rgba(255, 255, 255, 0)', borderRadius: '40px' }}>
                <nav className="space-y-8 text-sm">
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-1 mt-40 mb-0">
                        <a rel="noopener noreferrer" href="#">
                          <img src={veloIcon} alt="Velo Icon" className="w-20 h-20" />
                        </a>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-1 mb-20">
                        <a rel="noopener noreferrer" href="#">
                          <img src={tshirtIcon} alt="T-Shirt Icon" className="w-20 h-20" />
                        </a>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-1 mb-40">
                        <a rel="noopener noreferrer" href="#">
                          <img src={configIcon} alt="Configurator Icon" className="w-20 h-20" />
                        </a>
                        </div>
                    </div>
                </nav>
            </aside>
        </section>
    );
};

export default ConfigScreen;
