import Team from '../../components/Team';
import ContactForm from '../../components/ContactForm';

const Contact = () => {
  return (
    <main className="flex justify-center">
      <section className="text-gray-600 body-font bg-white w-full mx-8 rounded-[40px]">
        <div className="container px-5 py-24 mx-auto flex flex-col items-center">
          <div className="w-full">
            <Team />
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
