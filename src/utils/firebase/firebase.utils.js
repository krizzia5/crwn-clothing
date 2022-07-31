import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'; //pagsetup ng authentication
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
//This config allows you to make firebase actions, CRUD actions to save, read, update and delete
const firebaseConfig = {

    apiKey: "AIzaSyA_oyxMo9WAEjEPKURzH4GTyJpErhykuv8",
  
    authDomain: "crwn-clothing-db-20851.firebaseapp.com",
  
    projectId: "crwn-clothing-db-20851",
  
    storageBucket: "crwn-clothing-db-20851.appspot.com",
  
    messagingSenderId: "791355930421",
  
    appId: "1:791355930421:web:ae7cf064ae6a3556e7be7c"
  
  };
  
  
  // Initialize Firebase
  //initialize app takes the firebase config
  const firebaseApp = initializeApp(firebaseConfig);

  // In order to use google authention, we need to first initialize the provider using this:
  const provider = new GoogleAuthProvider(); //this will give you back the provider instance
  // this custom parameters will take some kind of configuration object and with it we can tell different ways that we want the GoogleAuthProvider to behave.
    provider.setCustomParameters({
      prompt: "select_account" //ito, whenever someone interacts with our provider we always wants to force them to select an account
    })

  //Need to export our authentication
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  //Pagcreate ng database
  const db = getFirestore();

  //pagcreate ng user document
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    //user document reference
    const userDocRef = doc(db, 'users', userAuth.uid); //doc has 3 parameters (database, collection, identifier or the unique id)
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    //check if user data exists
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    //if user data exists
    //if user data does not exists
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password ) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  } 