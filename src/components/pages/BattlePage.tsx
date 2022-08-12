import type { FC } from 'react';

import { Button, Input, Kbd, Progress } from '@mantine/core';
import { getHotkeyHandler, useInputState, useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export const BattlePage: FC = () => {
  const [inputValue, setInputValue] = useInputState('');
  const [challengerLife, setChallengerLife] = useState(100);
  const [bossLife, setBossLife] = useState(100);
  const [isTyping, setIsTyping] = useState(false); // 変換中かどうかを判定
  const interval = useInterval(() => setChallengerLife((p) => p - 0.3), 100);
  const issue = 'お題';

  useEffect(() => {
    interval.start();
    if (challengerLife <= 0) {
      interval.stop();
    }
  }, [challengerLife, interval]);

  const handleAttack = () => {
    if (!inputValue) return;
    if (inputValue === issue) {
      /* BOSSを攻撃 */
      setBossLife((prev) => prev - 10);
      /* LIFEを回復 */
      setChallengerLife((prev) => prev + 8);
    } else {
      /* プレイヤーにダメージ */
      setChallengerLife((prev) => prev - 10);
    }

    /* ランダムでBOSSが攻撃 */
    const dice = Math.floor(Math.random() * 3) + 1;
    if (dice === 1) {
      setChallengerLife((prev) => prev - 12);
    }

    setInputValue('');
  };

  return (
    <div className="space-y-2">
      <div>魔王</div>
      <Progress value={bossLife} color="red" />

      <div>勇者</div>
      <Progress value={challengerLife} color="green" />
      <div>お題</div>
      <Input
        type="text"
        placeholder="What you will todo."
        data-autofocus
        value={inputValue}
        onChange={setInputValue}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
        onKeyDown={getHotkeyHandler([
          [
            'Enter',
            () => {
              if (isTyping) return;
              handleAttack();
            },
          ],
          ['mod + Enter', handleAttack],
        ])}
      />
      <Button fullWidth onClick={handleAttack} className="h-12">
        Attack
        <div className="absolute right-3">
          <Kbd>⌘</Kbd> + <Kbd>Enter</Kbd>
        </div>
      </Button>
    </div>
  );
};
