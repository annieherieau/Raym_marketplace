import './Home.css';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Banner from '../../components/Banner/Banner';
import Hero from '../../components/Hero/Hero';
import ProductList from '../../components/ProductList';
import PropTypes from 'prop-types';
import JumbotronSince from '../../components/Jumbotron/JumbotronSince';
import BentoGrid from '../../components/BentoGrid';
import Partner from '../../components/Partner/Partner';

export default function Home({ products }) {
  return (
    <div>
      <Banner />
      <Hero />
      <JumbotronSince />
      <ProductList products={products} />
      <BentoGrid />
      <Jumbotron />
      <Partner /> 
    </div>
  );
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
};
