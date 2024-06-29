import { Link } from 'react-router-dom';
import logo from '../assets/raymW.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className='flex flex-row'>
        <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0 h-20">
          <img src={logo} alt="RAYM Logo" className="w-35 h-10" />
        </div>
        <p className="text-sm text-gray-400 flex items-center ml-4">
           © 2024 Team RAYM —
          <Link to="/contact" className="hover:text-white"> Robena / Annie / Yann / Malo —</Link>
          <a href="https://www.thehackingproject.org/" className="text-gray-400 ml-1 hover:text-white" rel="noopener noreferrer" target="_blank">@The Hacking Project</a>
        </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-row">
          <Link to="/mentions-legales" className="text-gray-400 text-sm hover:text-white mr-5">
            Mentions légales
          </Link>
          <a className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-transform duration-300" href="https://www.facebook.com">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-400 hover:text-blue-400 hover:scale-110 transition-transform duration-300" href="https://www.twitter.com">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-400 hover:text-pink-500 hover:scale-110 transition-transform duration-300" href="https://www.instagram.com">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-400 hover:text-blue-700 hover:scale-110 transition-transform duration-300" href="https://www.linkedin.com">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
