// src/pages/Home.jsx
import PropTypes from 'prop-types';
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Contact from '../components/Contact';

const Home = ({ products }) => {
  return (
    <div>
      <Hero />
      <ProductList products={products} />
      <Contact />
    </div>
  );
};

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      // price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Home;
