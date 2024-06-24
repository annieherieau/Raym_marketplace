import './Accueil.css';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Banner from '../../components/Banner/Banner';
import Hero from '../../components/Hero/Hero';

const Accueil = () => {
    return (
        <div>
            <Banner />
            <Hero />
            <Jumbotron />
            
        </div>
    );
};

export default Accueil;
