import type { FC } from 'react';

import { Button, Input, Kbd, Progress } from '@mantine/core';
import { getHotkeyHandler, useInputState, useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { useObjects } from 'src/swr/hooks/useObjects';
import { useTasks } from 'src/swr/hooks/useTasks';

const initialStatus = {
  life: 100,
  attack: 15,
};

export const BattlePage: FC = () => {
  const { objects: boss } = useObjects();
  const [isStarted, setIsStarted] = useState(false);
  const [inputValue, setInputValue] = useInputState('');
  const [challengerLife, setChallengerLife] = useState(initialStatus.life);
  const [bossLife, setBossLife] = useState(0);
  const [isTyping, setIsTyping] = useState(false); // 変換中かどうかを判定
  const interval = useInterval(() => setChallengerLife((p) => p - 0.2), 100);
  const [issue, setIssue] = useState('');
  const bossAttack = boss?.properties?.attack.number;
  const bossMaxLife = boss?.properties?.max_life.number;
  const bossLifePercent = (bossLife / bossMaxLife) * 100;

  const { tasks } = useTasks();

  useEffect(() => {
    if (challengerLife < 0) {
      interval.stop();
    }
  }, [challengerLife, interval]);

  const start = () => {
    if (!boss) return;
    setBossLife(boss.properties.current_life.number);
    interval.start();
    setIsStarted(true);
  };

  const nextIssue = () => {
    if (tasks.length === 0) return;
    const dice = Math.floor(Math.random() * tasks.length);
    setIssue(tasks[dice].content);
  };

  useEffect(() => {
    nextIssue();
  }, [tasks]);

  const handleAttack = () => {
    if (!inputValue) return;
    if (inputValue === issue) {
      /* BOSSを攻撃 */
      setBossLife((prev) => prev - 150);
      /* LIFEを回復 */
      setChallengerLife((prev) => prev + 8);
      nextIssue();
    } else {
      /* プレイヤーにダメージ */
      setChallengerLife((prev) => prev - bossAttack);
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
      {!isStarted ? (
        <Button onClick={start}>レイドバトルに挑む</Button>
      ) : (
        <div>
          <div>魔王</div>
          <Progress value={bossLife < 0 ? 0 : bossLifePercent} color="red" />

          <div>勇者</div>
          <Progress
            value={challengerLife < 0 ? 0 : challengerLife}
            color="green"
          />
          <div>{issue}</div>
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
      )}
    </div>
  );
};
