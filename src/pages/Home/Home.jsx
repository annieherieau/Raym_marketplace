import './Home.css';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Banner from '../../components/Banner/Banner';
import Hero from '../../components/Hero/Hero';
import ProductList from '../../components/ProductList';

export default function ({products}) {
    return (
        <div>
            <Banner />
            <Hero />
            <Jumbotron />
            <ProductList products={products} />
        </div>
    );
};
