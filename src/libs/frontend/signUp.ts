import { signInWithGoogle } from './firebase/auth';
import { setLocalStorage } from './localStorage';
import { createUser, getUser } from './prisma/user';

export const signUpWithGoogle = async () => {
  const resGoogleUser = await signInWithGoogle();
  let resUser = await getUser(resGoogleUser.uid);

  if (resUser) {
    return resUser;
  }

  resUser = await createUser({
    id: resGoogleUser.uid,
    displayName: resGoogleUser.displayName || '表示名を登録してください',
    email: resGoogleUser.email || 'gmailのアドレスを登録してください',
  });

  /* LocalStorageにuidを保存 */
  setLocalStorage('uid', resUser.id);

  return resUser;
};
