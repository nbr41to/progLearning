import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config";
import { checkingExistUser, createUser } from "./users";

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    const result = await checkingExistUser();
    if (!result) {
      await createUser();
    }
  } catch (error) {
    console.error(error);
  }
};
