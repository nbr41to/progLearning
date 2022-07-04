import Router from 'next/router';
import { useEffect } from 'react';

import { magic } from '../src/lib/magic';

const Callback = () => {
  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    finishSocialLogin();
  }, []);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });

    if (res.status === 200) {
      // Set the UserContext to the now logged in user
      let userMetadata = await magic.user.getMetadata();
      console.log(userMetadata);
      Router.push('/login');
    }
  };

  return <div>loading</div>;
};

export default Callback;
