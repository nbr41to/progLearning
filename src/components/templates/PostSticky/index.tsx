import type { FC } from 'react';

import { Button, Input, Kbd, Textarea } from '@mantine/core';
import { useInputState, getHotkeyHandler } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

import { createSticky } from 'src/libs/frontend/prisma/sticky';
import { useStickies } from 'src/libs/hooks/apiHooks/useStickies';
import { useUser } from 'src/libs/hooks/apiHooks/useUser';

type Props = {
  onClose: () => void;
};

export const PostSticky: FC<Props> = ({ onClose }) => {
  const [stickyTitle, setStickyTitle] = useInputState('');
  const [stickyMemo, setStickyMemo] = useInputState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { refetch: refetchStickies } = useStickies();

  const handleSubmit = async () => {
    if (!stickyTitle) {
      showNotification({
        title: 'No title',
        message: 'Titleを入力してください 🤥',
      });

      return;
    }
    if (!user?.id) {
      showNotification({
        title: 'Authentication Error',
        message: 'ログインできていないようです🤥',
      });

      return;
    }
    setIsLoading(true);

    await createSticky({
      userId: user.id,
      title: stickyTitle,
      memo: stickyMemo,
    });
    await refetchStickies();

    setIsLoading(false);
    setStickyTitle('');
    setStickyMemo('');
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="title"
        data-autofocus
        value={stickyTitle}
        onChange={setStickyTitle}
        onKeyDown={getHotkeyHandler([['mod + Enter', handleSubmit]])}
      />
      <Textarea
        placeholder="memo"
        value={stickyMemo}
        onChange={setStickyMemo}
        onKeyDown={getHotkeyHandler([['mod+Enter', handleSubmit]])}
      />
      <Button
        fullWidth
        onClick={handleSubmit}
        loading={isLoading}
        className="h-12"
      >
        Submit
        <div className="absolute right-3">
          <Kbd>⌘</Kbd> + <Kbd>Enter</Kbd>
        </div>
      </Button>
    </div>
  );
};
