import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC_A8KrjXNlK8daPHXHoWRNWVWCRgwFkNw",
    authDomain: "technical-test-2fa32.firebaseapp.com",
    projectId: "technical-test-2fa32",
    storageBucket: "technical-test-2fa32.appspot.com",
    messagingSenderId: "31756959643",
    appId: "G-KJB66K21TK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('User Info:', user);
        })
        .catch((error) => {
            console.error('Error during sign in:', error);
        });
};

const handleRedirectResult = () => {
    getRedirectResult(auth)
        .then((result) => {
            if (result) {
                const user = result.user;
                console.log('User Info:', user);
            }
        })
        .catch((error) => {
            console.error('Error during redirect result:', error);
        });
};

export { auth, provider, signInWithGoogle, handleRedirectResult };
