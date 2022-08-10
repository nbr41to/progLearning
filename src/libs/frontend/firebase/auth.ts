import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getAuth } from './config';

const auth = getAuth();

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, provider);
  const { user } = credential;

  return user;
};
