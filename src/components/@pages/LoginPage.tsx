import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { FC, useEffect } from "react";
import { getUser, googleLogin } from "src/lib/magic";

import { Board } from "@/components/@atoms/Board";
import { Button } from "@/components/@atoms/Button";

// import { googleLogin } from '../../lib/auth';

type LoginPageProps = {};

export const LoginPage: FC<LoginPageProps> = () => {
  const handleLogin = async () => {
    try {
      if (!window) return;
      const user = await googleLogin();
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!window) return;
    void (async () => {
      // const result = await getUser();
      const magic = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY as string,
        {
          extensions: [new OAuthExtension()],
        }
      );

      let result = await magic.oauth.getRedirectResult();

      console.log(result);
    })();
  }, []);

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
