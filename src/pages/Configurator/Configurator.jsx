import DualCarousel from "../../components/DualCarousel/DualCarousel.jsx";

const Configurator= ({allProducts}) => {
    return (
        <div>
            <DualCarousel allProducts={allProducts} />
        </div>
    );
};

export default Configurator;