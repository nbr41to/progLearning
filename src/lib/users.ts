import { auth, db } from "./config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/* ユーザ情報を新規作成 */
export const createUser = async () => {
  const user = auth?.currentUser;
  if (!user) throw new Error("User is not logged in");
  const userId = user.uid;
  const userData = {
    id: userId,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  try {
    await setDoc(doc(db, "users", userId), userData);
  } catch (error) {
    console.error(error);
  }
};

/* ユーザデータの有無を確認 */
export const checkingExistUser = async () => {
  const user = auth?.currentUser;
  if (!user) throw new Error("User is not logged in");
  const userId = user.uid;
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    console.log(userDoc.exists());
    console.log(userDoc.data());
    return userDoc.exists() || false;
  } catch (error) {
    console.error(error);
  }
};

/* ログインしている自分のユーザ情報を取得 */
export const getMyUser = async () => {
  const user = auth?.currentUser;
  if (!user) throw new Error("User is not logged in");
  const userId = user.uid;
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.data();
  } catch (error) {
    console.error(error);
  }
};

/* ユーザ名を変更する */
export const updateMyName = async (name: string) => {
  const user = auth?.currentUser;
  if (!user) throw new Error("User is not logged in");
  const userId = user.uid;

  try {
    await updateDoc(doc(db, "users", userId), { name });
  } catch (error) {
    console.error(error);
  }
};
