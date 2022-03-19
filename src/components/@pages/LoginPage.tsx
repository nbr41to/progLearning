import { VFC } from "react";
import { Button } from "../@commons/Button";
import { googleLogin } from "../lib/auth";
import { auth } from "../lib/config";

type LoginPageProps = {};

export const LoginPage: VFC<LoginPageProps> = () => {
  const user = auth.currentUser;
  console.log(user);

  return (
    <div>
      <h1>Login</h1>
      <Button label="Google Login" onClick={googleLogin} />
      {/* <div>Google Login</div> */}
    </div>
  );
};
