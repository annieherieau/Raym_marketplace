// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import logo from '../assets/raymW.png'; 

const Footer = () => {
  return (
    <footer className="body-font bg-black footer-fixed">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex items-center md:justify-start justify-center">
          <img src={logo} alt="RAYM Logo" className="w-20 h-50"/>
        </a>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 Team RAYM —
          <Link to="/contact" className='hover:text-white'> Robena / Annie / Yann / Malo —</Link>
          <a href="https://www.thehackingproject.org/" className="text-gray-400 ml-1 hover:text-white" rel="noopener noreferrer" target="_blank">@The Hacking Project</a>         
        </p>
       
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <Link to="/mentions-legales" className="text-gray-400 text-sm hover:text-white mr-5">
          Mentions légales
        </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
