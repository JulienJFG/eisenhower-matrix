# Matrice d'Eisenhower SaaS - v0.1.0

Une application SaaS moderne pour la priorisation des tâches utilisant la méthodologie de la Matrice d'Eisenhower, avec interface en français.

## Aperçu

Cette application aide les utilisateurs à organiser leurs tâches en fonction de leur urgence et de leur importance en utilisant la Matrice d'Eisenhower (aussi connue sous le nom de Matrice Urgent-Important). Les tâches sont classées en quatre quadrants :

1. **Important & Urgent** - Tâches à faire immédiatement
2. **Important & Non Urgent** - Tâches à planifier
3. **Non Important & Urgent** - Tâches à déléguer
4. **Non Important & Non Urgent** - Tâches à éliminer

## Fonctionnalités

### Version 0.1.0 (Actuelle)
- **Tableau de bord interactif** avec 4 quadrants
- **Glisser-déposer** pour déplacer les tâches entre les quadrants
- **Ajout rapide de tâches** avec sélection directe du quadrant
- **Gestion des tâches** incluant l'archivage et le filtrage
- **Stockage local** des données (localStorage)
- **Interface en français**

### Fonctionnalités prévues pour les versions futures
- **Authentification utilisateur** avec connexion par email
- **Design responsive** pour web et mobile
- **Sauvegarde automatique** des données utilisateur dans Firebase
- **Partage de matrices** entre utilisateurs

## Stack technique

### Version 0.1.0
- **Frontend**: React.js avec TypeScript
- **Gestion d'état**: React Context API
- **Styling**: Tailwind CSS
- **Stockage de données**: localStorage

### Prévu pour les versions futures
- **Backend**: Node.js avec Express
- **Base de données**: Firebase Firestore
- **Authentification**: Firebase Auth
- **Hébergement**: GitHub Pages ou Firebase Hosting

## Démarrage

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Installation

1. Cloner le dépôt
   ```
   git clone https://github.com/votre-utilisateur/eisenhower-matrix.git
   cd eisenhower-matrix
   ```

2. Installer les dépendances :
   ```
   npm install
   ```

3. Démarrer l'application :
   ```
   npm start
   ```

4. Ouvrir l'application dans votre navigateur :
   ```
   http://localhost:3000
   ```

## Structure du projet

```
eisenhower-matrix/
├── public/                # Fichiers statiques
├── src/
│   ├── components/        # Composants UI réutilisables
│   │   ├── TaskCard.tsx   # Carte de tâche individuelle
│   │   ├── Quadrant.tsx   # Composant de quadrant
│   │   ├── TaskModal.tsx  # Modal d'ajout/modification de tâche
│   │   └── ArchiveModal.tsx # Modal d'archives
│   ├── pages/             # Composants de pages
│   │   ├── Dashboard.tsx  # Tableau de bord principal
│   │   ├── Login.tsx      # Page de connexion
│   │   └── Register.tsx   # Page d'inscription
│   ├── context/           # Context React pour la gestion d'état
│   │   ├── AuthContext.tsx # Context d'authentification
│   │   └── TaskContext.tsx # Context de gestion des tâches
│   ├── models/            # Modèles de données
│   │   └── Task.ts        # Interface et fonctions pour les tâches
│   ├── services/          # Services
│   │   └── TaskService.ts # Service de gestion des tâches
│   └── firebase.ts        # Configuration Firebase (pour versions futures)
└── package.json          # Dépendances et scripts
```

## Améliorations futures

### Version 0.2.0
- Intégration complète avec Firebase
- Authentification utilisateur
- Synchronisation des données en temps réel

### Version 1.0.0
- Mode collaboration pour matrices partagées
- Intégration avec Google Calendar
- Notifications et rappels
- Authentification unique avec Google

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT.
