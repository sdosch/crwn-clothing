import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDtzPy1TWD_f8enqA-s6AUw3kFuxWvN7TQ",
  authDomain: "crwn-db-94ee2.firebaseapp.com",
  databaseURL: "https://crwn-db-94ee2.firebaseio.com",
  projectId: "crwn-db-94ee2",
  storageBucket: "crwn-db-94ee2.appspot.com",
  messagingSenderId: "878308866849",
  appId: "1:878308866849:web:4709b2dab3dabf9a589c60",
  measurementId: "G-YWDX3GN157"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;