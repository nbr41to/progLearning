import { useEffect, useState, VFC } from "react";
import { upsertProfile } from "src/lib/users";
import { useUser } from "src/swr/hooks/useUser";
import { Profile } from "types/users";

import { Button } from "../@atoms/Button";
import { Label } from "../@atoms/Label";
// import { getMyUser, updateUser } from "../../lib/users";
import { InputWithLabel } from "../@molecules/InputWithLabel";

type UserPageProps = {};

export const UserPage: VFC<UserPageProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, refetch } = useUser();

  const [profileInputState, setProfileInputState] = useState<Profile>({
    userId: user?.id || "",
    name: user?.profile.name || "",
    icon: "base",
    startedAt: new Date(),
  });

  useEffect(() => {
    setProfileInputState({
      userId: user?.id || "",
      name: user?.profile.name || "",
      icon: "base",
      startedAt: new Date(),
    });
  }, [user]);

  /* ユーザ情報の更新 */
  const submit = async () => {
    try {
      await upsertProfile(profileInputState);
      refetch();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>アカウント情報</h1>
      <div className="flex justify-between">
        <div className="space-y-1">
          <div className="flex">
            {!isEditing ? (
              <>
                <div>
                  <Label label="名前" />
                  <p className="p-2 pl-4">{user?.profile.name}</p>
                </div>
                <Button
                  outline
                  label="編集する"
                  onClick={() => setIsEditing(true)}
                />
              </>
            ) : (
              <>
                <InputWithLabel
                  id="userNameInput"
                  value={profileInputState.name || ""}
                  label="名前"
                  onChange={(e) =>
                    setProfileInputState({
                      ...profileInputState,
                      name: e.target.value,
                    })
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
              </>
            )}
          </div>
          <Label label="連携している Google アカウントのメールアドレス" />
          <p className="p-2 pl-4">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};
