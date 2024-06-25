// src/pages/LegalMentions.jsx
import React from 'react';

const LegalMentions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Présentation du site</h2>
        <p className="mb-2">
          Le site Raym (ci-après "le Site"), accessible à l'adresse www.raym.com, est édité par la société Raym Bicycles, société à responsabilité limitée (SARL) au capital de 50 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, dont le siège social est situé au 123 Rue de la Bicyclette, 75000 Paris, France.
        </p>
        <p className="mb-2"><strong>Directeur de la publication :</strong> Monsieur Jean Dupont, gérant de Raym Bicycles.</p>
        <p className="mb-2"><strong>Contact :</strong> contact@raym.com</p>
        <p className="mb-2"><strong>Numéro de téléphone :</strong> +33 1 23 45 67 89</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Hébergement</h2>
        <p className="mb-2">
          Le Site est hébergé par la société OVH, dont le siège social est situé au 2 Rue Kellermann, 59100 Roubaix, France.
        </p>
        <p className="mb-2"><strong>Contact :</strong> support@ovh.com</p>
        <p className="mb-2"><strong>Numéro de téléphone :</strong> +33 9 72 10 10 07</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Propriété intellectuelle</h2>
        <p className="mb-2">
          Le Site et l'ensemble de son contenu (textes, images, vidéos, graphismes, logos, icônes, sons, logiciels, etc.) sont la propriété exclusive de Raym Bicycles ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Raym Bicycles.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">4.1 Utilisation des cookies</h3>
          <p className="mb-2">
            Le Site utilise des cookies pour améliorer l'expérience utilisateur, analyser le trafic du Site et personnaliser les contenus et publicités. Les cookies sont des petits fichiers texte stockés sur votre appareil (ordinateur, tablette, smartphone, etc.) lors de votre visite sur le Site.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">4.2 Types de cookies utilisés</h3>
          <p className="mb-2"><strong>Cookies strictement nécessaires :</strong> Ces cookies sont indispensables au bon fonctionnement du Site et ne peuvent pas être désactivés.</p>
          <p className="mb-2"><strong>Cookies de performance :</strong> Ces cookies permettent de recueillir des informations anonymes sur l'utilisation du Site afin d'améliorer son fonctionnement.</p>
          <p className="mb-2"><strong>Cookies de fonctionnalité :</strong> Ces cookies permettent de mémoriser vos choix (par exemple, votre langue préférée) et de vous proposer des fonctionnalités améliorées et personnalisées.</p>
          <p className="mb-2"><strong>Cookies de ciblage ou publicitaires :</strong> Ces cookies sont utilisés pour afficher des publicités pertinentes pour vous, en fonction de vos centres d'intérêt.</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">4.3 Gestion des cookies</h3>
          <p className="mb-2">
            Lors de votre première visite sur le Site, un bandeau vous informe de l'utilisation des cookies et vous invite à les accepter ou à les refuser. Vous pouvez à tout moment modifier vos préférences en matière de cookies en accédant aux paramètres de votre navigateur ou en utilisant notre outil de gestion des cookies disponible sur le Site.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Protection des données personnelles</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5.1 Collecte des données personnelles</h3>
          <p className="mb-2">
            Raym Bicycles collecte des données personnelles lorsque vous utilisez le Site, notamment lors de votre inscription, de la passation de commandes, de l'inscription à la newsletter, de la participation à des concours ou de la prise de contact avec notre service client. Les données collectées peuvent inclure votre nom, prénom, adresse email, adresse postale, numéro de téléphone, informations de paiement, etc.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5.2 Utilisation des données personnelles</h3>
          <p className="mb-2">
            Les données personnelles collectées sont utilisées pour :
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>Gérer votre compte client et vos commandes.</li>
            <li>Vous fournir les services et informations demandés.</li>
            <li>Améliorer et personnaliser votre expérience sur le Site.</li>
            <li>Vous envoyer des newsletters et des offres promotionnelles, sous réserve de votre consentement préalable.</li>
            <li>Réaliser des analyses statistiques et des études de marché.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5.3 Partage des données personnelles</h3>
          <p className="mb-2">
            Raym Bicycles s'engage à ne pas vendre, louer ou céder vos données personnelles à des tiers sans votre consentement, sauf dans les cas suivants :
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>Partenaires commerciaux et prestataires de services pour l'exécution des services demandés (ex : livraison, paiement).</li>
            <li>Autorités administratives ou judiciaires, en cas de réquisition judiciaire ou d'obligation légale.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5.4 Sécurité des données personnelles</h3>
          <p className="mb-2">
            Raym Bicycles met en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute destruction, perte, altération, divulgation ou accès non autorisé.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5.5 Vos droits</h3>
          <p className="mb-2">
            Conformément à la réglementation en vigueur, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside mb-2">
            <li><strong>Droit d'accès :</strong> Vous pouvez obtenir la confirmation que des données personnelles vous concernant sont traitées et en obtenir une copie.</li>
            <li><strong>Droit de rectification :</strong> Vous pouvez demander la rectification des données inexactes ou incomplètes vous concernant.</li>
            <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.</li>
            <li><strong>Droit à la limitation du traitement :</strong> Vous pouvez demander la limitation du traitement de vos données personnelles dans certaines circonstances.</li>
            <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données personnelles à des fins de marketing direct.</li>
            <li><strong>Droit à la portabilité :</strong> Vous pouvez demander à recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine, et les transmettre à un autre responsable de traitement.</li>
          </ul>
          <p className="mb-2">
            Pour exercer vos droits, vous pouvez nous contacter par email à l'adresse contact@raym.com ou par courrier à l'adresse suivante : Raym Bicycles, 123 Rue de la Bicyclette, 75000 Paris, France.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Liens vers d'autres sites</h2>
        <p className="mb-2">
          Le Site peut contenir des liens vers des sites tiers. Raym Bicycles ne saurait être tenu responsable du contenu de ces sites ni des pratiques de confidentialité des tiers. Nous vous encourageons à consulter les politiques de confidentialité de ces sites avant de fournir vos données personnelles.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Modification des mentions légales</h2>
        <p className="mb-2">
          Raym Bicycles se réserve le droit de modifier les présentes mentions légales à tout moment. Les modifications seront publiées sur cette page et entreront en vigueur dès leur publication. Nous vous invitons à consulter régulièrement cette page pour vous tenir informé des éventuelles modifications.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Droit applicable et juridiction compétente</h2>
        <p className="mb-2">
          Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l'utilisation du Site, et à défaut de résolution amiable, les tribunaux de Paris seront compétents.
        </p>
      </section>
    </div>
  );
};

export default LegalMentions;
