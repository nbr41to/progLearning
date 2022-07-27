import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { getIsLoggedIn, magicLogin } from 'src/lib/magic';

import { Button } from '@/components/@atoms/Button';

import { Input } from '../@atoms/Input';

// import { googleLogin } from '../../lib/auth';

type LoginPageProps = {};

export const LoginPage: FC<LoginPageProps> = () => {
  const [inputEmail, setInputEmail] = useState('');

  const handleLogin = async () => {
    try {
      if (!window) return;

      await magicLogin(inputEmail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    44;

    if (!window) return;
    void (async () => {
      const isLoggedIn = await getIsLoggedIn();
      console.log('isLoggedIn', isLoggedIn);
    })();
  }, []);

  return (
    <div>
      {/* <Board className="mx-auto max-w-lg p-8 text-center">
        <p>
          アカウントを作成（無料）することで、より多くの教材が閲覧できるようになったり、学習の進捗を管理したり複数の機能が開放されます。
        </p>
        <div className="mt-4">
          <Button onClick={handleLogin}>Google ログインで始める</Button>
        </div>
      </Board> */}
      <p>メールアドレスでログイン</p>
      <Input
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <Button onClick={handleLogin}>ログイン</Button>
    </div>
  );
};
