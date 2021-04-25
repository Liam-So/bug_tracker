import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './config'

// initialize app with the config 
const Firebase = firebase.initializeApp(config.firebase);

// export providers for social media platforms
export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
}

// export the authentication from firebase 
export const auth = firebase.auth();
export default Firebase;