import React from 'react';
// Import des images depuis le dossier assets correctement localisé
import raymW from '../assets/raymW.png';
import teamRobena from '../assets/team-Robena.png';
import teamAnnie from '../assets/team-Annie.png';
import teamYann from '../assets/team-Yann.png';
import teamMalo from '../assets/team-Malo.png';

const Team = () => {
  return (
    <section className="text-gray-600 body-font font-roboto">
      <div className="container px-5 py-24 mx-auto flex flex-col items-center justify-center">
        <div className="flex flex-col text-center w-full mb-20">
          <div className="flex flex-row justify-center">
            <h1 className="text-6xl font-medium title-font text-green-400 font-bold" style={{ fontFamily: 'Chakra Petch' }}>TEAM</h1>
            <img src={raymW} alt="RaymW logo" style={{ width: '200px', height: '80px' }}/>
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-300 text-lg pt-4">Nous sommes fiers de vous présenter notre équipe dévouée qui a travaillé sans relâche pour créer cette plateforme unique et conviviale. Chaque membre de notre équipe apporte son expertise et sa passion pour le cyclisme, garantissant une expérience d&apos;achat exceptionnelle pour nos clients.</p>
        </div>
        <div className="flex flex-wrap justify-center -m-4">
          {teamData.map(member => (
            <div key={member.name} className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-4" src={member.image} />
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-green-400" style={{ fontFamily: 'Chakra Petch' }}>{member.name}</h2>
                  <h3 className="text-gray-300 mb-3">{member.role}</h3>
                  <p className="mb-4 text-gray-300">{member.description}</p>
                  <span className="inline-flex">
                    {member.links.map(link => (
                      <a key={link.url} className="text-gray-300" href={link.url} target="_blank" rel="noopener noreferrer">
                        <i className={`${link.icon} w-14 h-14 text-2xl`}></i>
                      </a>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Data for team members
const teamData = [
  { name: 'Robena Rasolond', role: 'Developpeur Web', description: 'DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.', image: teamRobena, links: [{ icon: 'fab fa-github', url: 'https://github.com/Robe-Ras' }, { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/00robena00/?profileId=ACoAAEpPnHgBNNX9zb_z1bti69Vqp7neC8vEFtQ' }] },
  { name: 'Annie Herieau', role: 'Developpeur Web', description: 'DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.', image: teamAnnie, links: [{ icon: 'fab fa-github', url: 'https://github.com/annieherieau' }, { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/annie-herieau/' }] },
  { name: 'Yann Rezigui', role: 'Developpeur Web', description: 'DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.', image: teamYann, links: [{ icon: 'fab fa-github', url: 'https://github.com/YannRZG/' }, { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/yann-rezigui-59b79a1b0/' }] },
  { name: 'Malo Bastianelli', role: 'Developpeur Web', description: 'DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.', image: teamMalo, links: [{ icon: 'fab fa-github', url: 'https://github.com/Korblen' }, { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/malo-bastianelli-66360a285/' }] }
];

export default Team;
