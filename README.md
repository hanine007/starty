# Portail SCPI - Plateforme de Gestion de Placements Immobiliers

## À propos du projet

**Portail SCPI** est une application web complète permettant aux administrateurs de gérer des Sociétés Civiles de Placement Immobilier (SCPI) et aux utilisateurs de consulter les informations sur ces placements. Ce projet utilise une architecture moderne avec une séparation claire entre frontend et backend.

---

## Fonctionnalités

### Pour les utilisateurs

- Création et gestion de compte utilisateur  
- Consultation des SCPI disponibles  
- Navigation intuitive avec interface responsive

### Pour les administrateurs

- Interface d'administration sécurisée  
- Gestion des SCPI (ajout, modification, suppression)  
- Gestion des sociétés partenaires

---

## Technologies utilisées

### Frontend

- **React** : Bibliothèque JavaScript pour construire l'interface utilisateur  
- **React Router** : Gestion du routage côté client  
- **Axios** : Client HTTP pour communiquer avec l'API  
- **CSS-in-JS** : Style intégré dans les composants React

### Backend

- **Node.js** : Environnement d'exécution JavaScript côté serveur  
- **Express** : Framework web minimaliste pour Node.js  
- **MongoDB** : Base de données NoSQL pour stocker les données  
- **JWT** : Authentification par tokens pour sécuriser les routes  
- **Bcrypt** : Hachage sécurisé des mots de passe

---

## Installation

### Prérequis

- Node.js (v16 ou supérieur)  
- MongoDB  
- npm ou yarn

### Étapes d'installation

1. **Clonez le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/.git
   cd portail-scpi
   ```

2. **Configuration du backend**

   - Rendez-vous dans le dossier `/backend`  
   - Créez un fichier `.env` avec les variables suivantes :

     ```env
     MONGODB_URI=<votre_url_mongodb>
     JWT_SECRET=<votre_jwt_secret>
     PORT=4000
     ```

   - Installez les dépendances :

     ```bash
     cd backend
     npm install
     ```

3. **Configuration du frontend**

   - Rendez-vous dans le dossier `/frontend`  
   - Installez les dépendances :

     ```bash
     cd ../frontend
     npm install
     ```

---

## Lancement

### Backend

Lancez le serveur backend :

```bash
cd backend
npm start
```

Le serveur sera disponible sur [http://localhost:4000](http://localhost:4000)

### Frontend

Lancez l'application frontend :

```bash
cd frontend
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173)

---

## Structure du projet

```
portail-scpi/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## API Endpoints

### Utilisateurs

- `POST /api/user/register` – Inscription utilisateur  
- `POST /api/user/login` – Connexion utilisateur

### Administrateurs

- `POST /api/admin/register` – Inscription administrateur  
- `POST /api/admin/login` – Connexion administrateur

### SCPI

- `GET /api/scpis` – Liste des SCPI  
- `POST /api/scpis` – Ajouter une SCPI (admin seulement)  
- `PUT /api/scpis/:id` – Modifier une SCPI (admin seulement)  
- `DELETE /api/scpis/:id` – Supprimer une SCPI (admin seulement)

### Sociétés

- `GET /api/societes` – Liste des sociétés  
- `POST /api/societes` – Ajouter une société (admin seulement)  
- `PUT /api/societes/:id` – Modifier une société (admin seulement)  
- `DELETE /api/societes/:id` – Supprimer une société (admin seulement)

---

## Sécurité

- Authentification JWT pour sécuriser les routes  
- Hachage des mots de passe avec bcrypt  
- Validation des données utilisateur  
- Protection des routes sensibles via des middlewares d'authentification

---

## Licence

Ce projet est sous licence MIT – voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.
