import { OAuthExtension } from "@magic-ext/oauth";
// import { Profile, User } from '@prisma/client';
// import axios from 'axios';
import { Magic } from "magic-sdk";
import { FC } from "react";

import { Board } from "@/components/@atoms/Board";
import { Button } from "@/components/@atoms/Button";

// import { googleLogin } from '../../lib/auth';

type LoginPageProps = {};
export const LoginPage: FC<LoginPageProps> = () => {
  const handleLogin = async () => {
    try {
      if (!window) return;
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "", {
        extensions: [new OAuthExtension()],
      });
      /* Google ログイン Magic */
      const user = await magic.oauth.loginWithRedirect({
        provider: "google" /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: "http://localhost:3000/login",
        // scope: ['user:email'] /* optional */,
      });
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  void (async () => {
    if (!window) return;
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "", {
      extensions: [new OAuthExtension()],
    });
    const result = await magic.oauth.getRedirectResult();
    console.log(result);
  })();

  return (
    <div>
      <Board className="mx-auto max-w-lg p-8 text-center">
        <p>
          アカウントを作成（無料）することで、より多くの教材が閲覧できるようになったり、学習の進捗を管理したり複数の機能が開放されます。
        </p>
        <div className="mt-4">
          <Button onClick={handleLogin}>Google ログインで始める</Button>
        </div>
      </Board>
    </div>
  );
};
