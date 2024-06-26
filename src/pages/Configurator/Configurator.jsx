import DualCarousel from "../../components/DualCarousel/DualCarousel.jsx";

const Configurator= ({allProducts}) => {
    return (
        <section>
            <DualCarousel allProducts={allProducts} />
        </section>
    );
};

export default Configurator;