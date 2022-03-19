import { useEffect, useState, VFC } from "react";
import { Button } from "../@commons/Button";
import { getMyUser, updateUser } from "../../lib/users";
import { InputWithLabel } from "../@molecules/InputWithLabel";
import { Label } from "../@commons/Label";

type UserPageProps = {};

export const UserPage: VFC<UserPageProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [userInputState, setUserInputState] = useState(user);

  useEffect(() => {
    void (async () => {
      const getRes = await getMyUser();
      setUser(getRes);
      setUserInputState(getRes);
    })();
  }, []);

  /* ユーザ情報の更新 */
  const submit = () => {
    try {
      updateUser(userInputState);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>アカウント情報</h1>
      {!isEditing ? (
        <div className="flex justify-between">
          <div className="space-y-1">
            <Label label="名前" />
            <p className="p-2 pl-4">{user?.name}</p>
            <Label label="連携している Google アカウントのメールアドレス" />
            <p className="p-2 pl-4">{user?.email}</p>
          </div>
          <div>
            <Button
              outline
              label="編集する"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <InputWithLabel
            id="userNameInput"
            value={userInputState?.name}
            label="名前"
            onChange={(e) =>
              setUserInputState({ ...userInputState, name: e.target.value })
            }
          />
          <InputWithLabel
            id="userNameInput"
            value={userInputState?.email}
            label="連携している Google アカウントのメールアドレス"
            onChange={(e) =>
              setUserInputState({ ...userInputState, email: e.target.value })
            }
          />
          <div className="mt-4 space-x-4 text-right">
            <Button
              label="キャンセル"
              outline
              onClick={() => setIsEditing(false)}
            />
            <Button label="保存" onClick={submit} />
          </div>
        </div>
      )}
    </div>
  );
};
