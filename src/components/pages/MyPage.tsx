import type { FC } from 'react';

import { ActionIcon, Badge, Button, Input, Textarea } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';

import { updateProfile } from 'src/libs/frontend/prisma/profile';
import { updateUser } from 'src/libs/frontend/prisma/user';
import { useProfile } from 'src/swr/hooks/useProfile';
import { useUser } from 'src/swr/hooks/useUser';

import { GrassCalendarBoard } from '../templates/GrassCalendarBoard';

export const MyPage: FC = () => {
  const { user } = useUser();
  const { profile, refetch: refetchProfile } = useProfile();
  const [isEditing, setIsEditing] = useState<'displayName' | 'bio' | null>();
  const [displayName, setDisplayName] = useInputState(user?.displayName);
  const [bio, setBio] = useInputState(profile?.bio);

  /* DISPLAY NAME */
  /* 編集に切り替え */
  const handleEditDisplayName = () => {
    if (isEditing === 'displayName') {
      setIsEditing(null);
    } else {
      setIsEditing('displayName');
    }
    setDisplayName(user?.displayName || '');
  };
  /* 編集をキャンセル */
  const handleCancelEditDisplayName = () => {
    setIsEditing(null);
    setDisplayName(user?.displayName || '');
  };
  /* 更新 */
  const updateDisplayName = async () => {
    if (!user || !displayName) return;
    await updateUser({ ...user, displayName });
    await refetchProfile();
    setIsEditing(null);
  };

  /* BIO */
  /* 編集に切り替え */
  const handleEditBio = () => {
    if (isEditing === 'bio') {
      setIsEditing(null);
    } else {
      setIsEditing('bio');
    }
    setBio(profile?.bio || '');
  };
  /* 編集をキャンセル */
  const handleCancelEditBio = () => {
    setIsEditing(null);
    setBio(profile?.bio || '');
  };
  /* 更新 */
  const updateBio = async () => {
    if (!profile || !bio) return;
    await updateProfile({ ...profile, bio });
    await refetchProfile();
    setIsEditing(null);
  };

  /* ITEM */
  const items: string[] = useMemo(
    () => JSON.parse(JSON.stringify(profile?.items || '[]')),
    [profile]
  );

  return (
    <div className="mx-auto max-w-[600px] space-y-4">
      <div className="my-8 flex items-center justify-center gap-6">
        <FaUserCircle size={40} />
        <GrassCalendarBoard />
      </div>

      {/* NAME */}
      <div className="flex gap-1">
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          お名前
        </Badge>
        <ActionIcon radius="xl" onClick={handleEditDisplayName}>
          <MdModeEdit size={20} />
        </ActionIcon>
      </div>
      <div className="pl-2">
        {isEditing !== 'displayName' ? (
          <div>{user?.displayName}</div>
        ) : (
          <div>
            <Input value={displayName} onChange={setDisplayName} />
            <div className="mt-2 flex justify-end gap-2">
              <Button color="cyan" onClick={updateDisplayName}>
                更新
              </Button>
              <Button color="gray" onClick={handleCancelEditDisplayName}>
                やめる
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* BIO */}
      <div className="flex gap-1">
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          自己紹介文
        </Badge>
        <ActionIcon radius="xl" onClick={handleEditBio}>
          <MdModeEdit size={20} />
        </ActionIcon>
      </div>
      <div className="pl-2">
        {isEditing !== 'bio' ? (
          <div>{profile?.bio || 'まだないよ'}</div>
        ) : (
          <div>
            <Textarea value={bio || ''} onChange={setBio} />
            <div className="mt-2 flex justify-end gap-2">
              <Button color="cyan" onClick={updateBio}>
                更新
              </Button>
              <Button color="gray" onClick={handleCancelEditBio}>
                やめる
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* STATUS */}
      <Badge
        size="lg"
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        ステータス
      </Badge>
      <div className="pl-2">
        <div>LIFE: 100</div>
        <div>ATTACK: 15</div>
      </div>

      {/* ITEM */}
      <Badge
        size="lg"
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        アイテム
      </Badge>
      <div className="pl-2">
        {items.length > 0 ? <div>アイテムがあります</div> : 'なし'}
      </div>
    </div>
  );
};
