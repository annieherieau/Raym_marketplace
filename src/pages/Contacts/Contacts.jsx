import React from 'react';
import Team from '../../components/Team';
import Contact from '../../components/Contact';

const Contacts = () => {
  return (
    <section className="text-gray-600 body-font bg-white">
      <div className="container px-5 py-24 mx-auto flex flex-col items-center">
        <Team />
        <Contact />
      </div>
    </section>
  );
};

export default Contacts;

