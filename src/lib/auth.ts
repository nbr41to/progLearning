import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "./config";
// import { checkingExistUser, createUser } from "./users";

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credential = await signInWithPopup(auth, provider);
    return credential.user;
    // const result = await checkingExistUser();
    // if (!result) {
    //   await createUser();
    // }
  } catch (error) {
    console.error(error);
  }
};
