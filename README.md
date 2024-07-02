# RAYM Marketplace
[Projet](#projet) | 
[Installation](#installation)<br/>

# Projet
## 1. Présentation

Site e-commerce spécialisé dans l’univers du vélo : Nous proposons des équipements de notre marque pour tous les profils, urbains, off-road et plus

## 2. Parcours utilisateur

- **Découverte du site**: sur la page d’accueil, l’utilisateur explore le Hero et la liste des produits en vente (avec filtre).
- **Fiche produit:** l’utilisateur peut afficher le détails d’un produit
- **Panier**: l’utilisateur peut ajouter des produits à son panier.
- **Achats en ligne**: seuls les utilisateurs connectés peuvent effectuer des achats.
- **Inscription et connexion** : L’utilisateur s’inscrit sur la plateforme et se connecte à son compte.
- **Interaction**: les utilisateurs connectés peuvent ajouter des commentaires et des likes sur les produits.
- **Dashboard utilisateur**: l’utilisateur peut:
  - gérer son panier
  - modifier ses informations
  - consulter ses commandes effectuées(factures)

## 3. Concrètement et techniquement

### 3.1. Base de données

- Base de Données Postgresql
- users, items, categories, comments, likes

### 3.2. Front

- Vite  - React
- Tailwind
- Google Recaptcha

### 3.3. Backend

- Ruby on Rails
- Gestions des users et admin : Devise
- Paiement en ligne : API Stripe
- Envoi des emails automatiques: API Mailjet
- Hébergement de production : [Render.com](https://render.com/)
- Gestion des versions : Git / gitHub
- Rubocop

## 4. La version minimaliste MVP

- Page d’accueil: hero + liste des produits
- Fiche produit basique
- Inscription / connection des utilisateurs
- Modification des données
- Paiement en ligne

## 5. La version présentée au jury

- Fiche produit avec choix des options
- Ajouts de commentaires / likes sur les produits
- Emails automatiques: création de compte, inscription, achat, etc
- Dashboard utilisateur
- Thème professionnel, responsive mobile

# Installation
Clone repository

Dependencies
- Vite
- React

Avec pnpm :
```shell
pnpm i
npm run develop
```

Avec npm :
```shell
npm i
npm run develop
```

Avec yarn :
```shell
yarn
yarn develop
```
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
