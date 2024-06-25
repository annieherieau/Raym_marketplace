import './Home.css';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Banner from '../../components/Banner/Banner';
import Hero from '../../components/Hero/Hero';
import ProductList from '../../components/ProductList';
import PropTypes from 'prop-types';

export default function Home({products}) {
    return (
        <div>
            <Banner />
            <Hero />
            <Jumbotron />
            <ProductList products={products} />
        </div>
    );
}

Home.propTypes = {
    products: PropTypes.array.isRequired,
};
