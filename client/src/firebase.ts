import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase pour l'application
// Remplacez ces valeurs par celles de votre projet Firebase
// Pour obtenir ces valeurs :
// 1. Créez un projet sur https://console.firebase.google.com/
// 2. Ajoutez une application web à votre projet
// 3. Copiez les valeurs de configuration fournies
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "eisenhower-matrix-app.firebaseapp.com",
  projectId: "eisenhower-matrix-app",
  storageBucket: "eisenhower-matrix-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Exportation des services Firebase
export const auth = getAuth(app);  // Service d'authentification
export const db = getFirestore(app);  // Service de base de données Firestore

// Instructions pour la configuration :
// 1. Créez un fichier .env.local à la racine du projet client avec les variables suivantes :
//    REACT_APP_FIREBASE_API_KEY=votre_api_key
//    REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain
//    etc.
// 
// 2. Modifiez ce fichier pour utiliser les variables d'environnement :
//    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//    etc.

export default app;
