import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { auth } from './config';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, provider);
  const { user } = credential;

  return user;
};
