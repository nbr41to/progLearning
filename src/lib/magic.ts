import { OAuthExtension } from '@magic-ext/oauth';
import axios from 'axios';
import { Magic } from 'magic-sdk';

export const magic =
  typeof window !== 'undefined'
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || '', {
        extensions: [new OAuthExtension()],
      })
    : null;

export const magicLogin = async (email: string) => {
  if (!magic) throw new Error('magic is not initialized');
  const existEmail = await axios.post('/api/v1/slack/check-existing-email', {
    email,
  });
  if (!existEmail.data.exist) throw new Error('email is not exist');

  const didToken = await magic.auth.loginWithMagicLink({ email });

  const authResponse = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${didToken}`,
      'Content-Type': 'application/json',
    },
  });
  const authResponseData = await authResponse.json();
  if (!authResponseData.authenticated) throw new Error('authentication failed');
};

export const googleLogin = async () => {
  if (!magic) throw new Error('magic is not initialized');
  await magic.oauth.loginWithRedirect({
    provider: 'google' /* 'google', 'facebook', 'apple', or 'github' */,
    redirectURI: new URL('/callback', window.location.origin).href,
  });

  return await magic.oauth.getRedirectResult();
};

export const getIsLoggedIn = async () => {
  if (!magic) throw new Error('magic is not initialized');

  return await magic.user.isLoggedIn();
};

export const getUser = async () => {
  if (!magic) throw new Error('magic is not initialized');
  console.log(magic);
  const result = await magic.oauth.getRedirectResult();
  console.log('finish');
  authenticateWithServer(result.magic.idToken);
  console.log(result.magic.idToken);
};

const authenticateWithServer = async (didToken: string) => {
  if (!magic) throw new Error('magic is not initialized');
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  });

  if (res.status === 200) {
    const userMetadata = await magic.user.getMetadata();
    console.log(userMetadata);
  }
};
