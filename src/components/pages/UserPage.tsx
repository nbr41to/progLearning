import { useEffect, useState, VFC } from "react";
import { Button } from "../@commons/Button";
import { getMyUser, updateMyName } from "../lib/users";

type UserPageProps = {};

export const UserPage: VFC<UserPageProps> = () => {
  const [user, setUser] = useState<any | null>(null);
  const [userNameInputState, setUserNameInputState] = useState(
    user?.name || ""
  );
  useEffect(() => {
    void (async () => {
      const getRes = await getMyUser();
      setUser(getRes);
    })();
  }, []);
  console.log(user);

  return (
    <div>
      <h1>マイページ</h1>
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>

      <input
        className="border"
        type="text"
        value={userNameInputState}
        onChange={(e) => setUserNameInputState(e.target.value)}
      />
      <Button label="保存" onClick={() => updateMyName(userNameInputState)} />
    </div>
  );
};
