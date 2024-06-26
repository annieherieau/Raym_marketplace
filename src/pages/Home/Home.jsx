import './Home.css';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Banner from '../../components/Banner/Banner';
import Hero from '../../components/Hero/Hero';
import ProductList from '../../components/ProductList';
import PropTypes from 'prop-types';
import JumbotronSince from '../../components/Jumbotron/JumbotronSince';

export default function Home({products}) {
    return (
        <div>
            <Banner />
            <Hero />
            <JumbotronSince />
            <ProductList products={products} />
            <Jumbotron />
        </div>
    );
}

Home.propTypes = {
    products: PropTypes.array.isRequired,
};
