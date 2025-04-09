# Cahier des charges – Application Eisenhower Matrix (SaaS)

## Objectif
Développer une application SaaS basée sur la matrice d'Eisenhower, permettant de prioriser ses tâches en fonction de leur urgence et de leur importance, dans une interface simple, esthétique et ultra-intuitive.

## Cibles utilisateurs
- Entrepreneurs, freelances, managers, formateurs, consultants
- Utilisateurs non-tech recherchant une organisation claire de leurs priorités

## Fonctionnalités attendues (MVP)

### 🔹 Dashboard avec la matrice Eisenhower en 4 quadrants
- Drag & drop des tâches entre les quadrants
- Couleurs distinctes pour chaque quadrant
- Édition rapide d'une tâche : titre, description, deadline facultative, case "terminé"

### 🔹 Ajout rapide de tâches
- Barre + bouton "Ajouter une tâche" qui permet de choisir directement le quadrant
- Possibilité de réordonner les tâches dans chaque bloc

### 🔹 Gestion des tâches
- Archivage automatique ou manuel des tâches "faites"
- Option "planifier" pour déplacer automatiquement dans "Important non urgent"
- Filtre ou recherche dans les tâches archivées

### 🔹 Expérience utilisateur (UX/UI)
- Responsive (web & mobile)
- Design minimaliste, épuré, avec une typographie lisible
- Animation légère lors des actions (drag, suppression, ajout)

### 🔹 Comptes utilisateurs
- Connexion simple par email (SSO Google si possible en V2)
- Sauvegarde automatique du tableau

### 🔹 Backend & hébergement
- Base de données cloud légère (Firebase)
- Framework React avec TypeScript pour scalabilité rapide

## Design inspiration
- Miro (pour l'ergonomie des blocs)
- Notion (pour l'esthétique épurée)
- Trello (pour la fluidité drag-and-drop)

## Évolutions envisagées en V2
- Mode collaboration (partage de matrice)
- Intégration avec Google Calendar ou Notion
- Notifications ou rappels (email ou in-app)

## Stack technique choisie
- **Frontend**: React.js avec TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Backend**: Node.js avec Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting

## Questions / validations en attente
1. Confirmation des couleurs exactes pour chaque quadrant de la matrice
2. Validation du design global (maquettes à présenter)
3. Précisions sur les fonctionnalités de filtrage des tâches archivées
4. Confirmation de l'approche d'authentification (email uniquement pour MVP)
5. Validation de la stack technique proposée
