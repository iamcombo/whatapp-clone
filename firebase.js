import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBpjmq86X09eyPnU6IuCiuyX72y-eq6E6A",
  authDomain: "whatapp-clone-f9fb3.firebaseapp.com",
  projectId: "whatapp-clone-f9fb3",
  storageBucket: "whatapp-clone-f9fb3.appspot.com",
  messagingSenderId: "665779845659",
  appId: "1:665779845659:web:dba462370e0cfd8d2b16be"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };