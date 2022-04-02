import { useEffect, useState, VFC } from "react";
import { upsertProfile } from "src/lib/users";
import { useUser } from "src/swr/hooks/useUser";
import { Profile } from "types/users";

import { Button } from "../@atoms/Button";
import { Input } from "../@atoms/Input";
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
    <div className="space-y-4">
      <h1 className="text-xl">アカウント情報</h1>

      {/* 名前 */}
      <div className="space-y-2">
        <Label label="名前" />
        {!isEditing ? (
          <div className="flex w-[400px] items-center justify-between">
            <p className="p-1 pl-4">{user?.profile.name}</p>
            <Button
              outline
              label="編集する"
              onClick={() => setIsEditing(true)}
            />
          </div>
        ) : (
          <div className="flex w-[400px] items-center gap-2">
            <Input
              className="w-fit"
              value={profileInputState.name || ""}
              onChange={(e) =>
                setProfileInputState({
                  ...profileInputState,
                  name: e.target.value,
                })
              }
            />
            <div className="flex gap-2">
              <Button label="保存" onClick={submit} />
              <Button
                label="キャンセル"
                outline
                onClick={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* メールアドレス */}
      <div className="space-y-2">
        <Label label="連携している Google アカウントのメールアドレス" />
        <div className="flex w-[400px] items-center justify-between gap-2">
          <p className="p-2 pl-4">{user?.email}</p>
          <Button label="登録解除" outline />
        </div>
      </div>
    </div>
  );
};
