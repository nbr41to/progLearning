import type { FC } from 'react';

import { Button, Input, Kbd, Textarea } from '@mantine/core';
import { useInputState, getHotkeyHandler } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

import { createSticky } from 'src/libs/frontend/prisma/sticky';
import { useUser } from 'src/swr/hooks/useUser';

type Props = {
  onClose: () => void;
};

export const PostSticky: FC<Props> = ({ onClose }) => {
  const { user } = useUser();
  const [stickyTitle, setStickyTitle] = useInputState('');
  const [stickyMemo, setStickyMemo] = useInputState('');

  const handleSubmit = async () => {
    if (!stickyTitle) {
      showNotification({
        message: 'Hey there, your code is awesome! 🤥',
      });

      return;
    }
    if (!user?.id) {
      showNotification({
        title: 'Default notification',
        message: 'Hey there, your code is awesome! 🤥',
      });

      return;
    }

    await createSticky({
      userId: user.id,
      title: stickyTitle,
      memo: stickyMemo,
    });
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
      <Button fullWidth onClick={handleSubmit} className="h-12">
        Submit
        <div className="absolute right-3">
          <Kbd>⌘</Kbd> + <Kbd>Enter</Kbd>
        </div>
      </Button>
    </div>
  );
};
