<h3 align="center">Good API Refactoring</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](/LICENSE)

</div>

---

<p align="center">Une API RESTful de gestion de produits, refactorisée à partir du projet initial de Dimi237.</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [User Functions](#user-functions)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About `<a name = "about"></a>`

Cette API de gestion de produits a été construite avec Node.js, Express, TypeScript et MongoDB. Elle a pour but d'apprendre la structure modulaire du framework backend NestJS. Initialement développée par Dimi237, cette version a été refactorisée pour améliorer la lisibilité et la modularité du code.

## 🏁 Getting Started `<a name = "getting_started"></a>`

Ces instructions vous permettront d'obtenir une copie du projet en cours d'exécution sur votre machine locale à des fins de développement et de test.

### Prérequisites

- Node.js (version 14 ou supérieure)
- MongoDB

### Installing

Clonez le repository et installez les dépendances :

```bash
git clone https://github.com/yoricksenpai/good-api-refactoring.git
cd good-api-refactoring
npm install
```

Créez un fichier de configuration pour l'environnement :

```bash
mkdir src/envs
touch src/envs/development.json
```

Ajoutez les détails suivants dans `development.json` :

```json
{
  "env": "development",
  "port": 3000,
  "mongodb": {
    "uri": "mongodb://localhost:27017",
    "database": "votre_base_de_donnees"
  }
}
```

## 🎈 Usage `<a name="usage"></a>`

Pour démarrer l'application en mode développement :

```bash
npm start
```

### Exemples d'utilisation avec Postman

#### Créer un nouveau produit

```http
POST http://localhost:3000/products
Content-Type: application/json

{
    "name": "Nike Air Max",
    "description": "Chaussures de sport confortables",
    "quantity": 50,
    "appreciation": 4.5,
    "brand": "Nike",
    "tags": ["sport", "chaussures", "running"],
    "category": "Chaussures",
    "price": 129.99,
    "sku": "NAM-2024-001",
    "isAvailable": true
}
```

#### Mettre à jour un produit

```http
PUT http://localhost:3000/products/:id
Content-Type: application/json

{
    "name": "Nike Air Max 2024",
    "price": 139.99
}
```

## 🚀 Deployment `<a name = "deployment"></a>`

Pour déployer cette API sur un système en direct, assurez-vous que MongoDB est en cours d'exécution et que le port 3000 est disponible.

## ⛏️ Built Using `<a name = "built_using"></a>`

- [MongoDB](https://www.mongodb.com/) - Base de données
- [Express](https://expressjs.com/) - Framework serveur
- [NodeJs](https://nodejs.org/en/) - Environnement serveur

## 👥 User Functions `<a name="user-functions"></a>`

L'API propose plusieurs fonctionnalités liées à la gestion des utilisateurs, y compris :

- **Inscription d'un utilisateur** : Crée un nouvel utilisateur dans le système.
- **Connexion d'un utilisateur** : Authentifie l'utilisateur et génère un token d'accès.
- **Récupération d'un utilisateur** : Récupère les détails d'un utilisateur par son ID.

## 🎯 Learning Objectives `<a name="learning-objectives"></a>`

Cette API est utilisée dans le but d'explorer et de comprendre le fonctionnement modulaire de NestJS. Les objectifs d'apprentissage incluent :

- Comprendre la séparation des préoccupations à travers une architecture en couches.
- Apprendre l'injection de dépendances pour une meilleure testabilité et modularité.
- Gérer les routes et les services de manière efficace.

Cette expérience vise à renforcer la compréhension des concepts fondamentaux de NestJS et à les appliquer dans un projet pratique.

## ✍️ Authors `<a name = "authors"></a>`

- [Dimi237](https://github.com/Dimi237) - Développeur initial
- [yoricksenpai](https://github.com/yoricksenpai) - Refactoring et améliorations

## 🎉 Acknowledgements `<a name = "acknowledgement"></a>`

- Merci à Dimi237 pour la base de l'API.
- Inspiration provenant de plusieurs ressources de développement Node.js.
