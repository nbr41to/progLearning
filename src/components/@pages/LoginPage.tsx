import { Profile, User } from "@prisma/client";
import axios from "axios";
import { VFC } from "react";

import { Board } from "@/components/@atoms/Board";
import { Button } from "@/components/@atoms/Button";

import { googleLogin } from "../../lib/auth";

type LoginPageProps = {};

export const LoginPage: VFC<LoginPageProps> = () => {
  const handleLogin = async () => {
    try {
      /* Google ログイン */
      const user = await googleLogin();
      if (!user) throw new Error("User is not defined");
      /* ユーザ情報の保存 */
      await axios.post<User>("/api/v1/users", {
        id: user.uid,
        email: user.email,
        lastLogin: new Date(),
      });
      /* ユーザプロフィールの保存 */
      await axios.post<Profile>("/api/v1/users/profile", {
        userId: user.uid,
        name: user.displayName,
        icon: "base",
      });
    } catch (error) {}
  };

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
