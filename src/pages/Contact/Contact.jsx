import Team from '../../components/Team';
import ContactForm from '../../components/ContactForm';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#top") {
      const element = document.getElementById("top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="flex justify-center">
          <section className=" body-font bg-black w-full mx-8 rounded-[20px]">
        <div className="container px-5 py-24 mx-auto flex flex-col items-center">
          <div className="w-full">
            <Team />
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>

  );
};

export default Contact;
