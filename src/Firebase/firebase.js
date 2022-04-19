import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
    apiKey: 'AIzaSyBdmhqbj_v3Z9qKuMccUK4uGxJmBLRghd8',
    authDomain: 'smarthabits-db924.firebaseapp.com',
    projectId: 'smarthabits-db924',
    storageBucket: 'smarthabits-db924.appspot.com',
    messagingSenderId: '839531305587',
    appId: '1:839531305587:web:58204cf29daa6a68c82806',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
