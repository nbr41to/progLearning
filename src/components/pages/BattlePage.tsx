import type { FC } from 'react';

import { Button, Input, Kbd, Progress } from '@mantine/core';
import {
  getHotkeyHandler,
  useFocusTrap,
  useInputState,
  useInterval,
} from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';

import { useObjects } from 'src/swr/hooks/useObjects';
import { useStickies } from 'src/swr/hooks/useStickies';
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
  const focusTrapRef = useFocusTrap();

  const { tasks } = useTasks();
  const { stickies } = useStickies();

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
    document.getElementById('input-area')?.focus();
  };

  const nextIssue = () => {
    if (tasks.length === 0 && stickies.length === 0) return;
    const array = [...tasks, ...stickies];
    const dice = Math.floor(Math.random() * array.length);
    const choice = array[dice];
    if ('title' in choice) {
      setIssue(choice.title);
    } else {
      setIssue(choice.content);
    }
  };

  useEffect(() => {
    nextIssue();
  }, [tasks]);

  const handleAttack = () => {
    if (!inputValue) return;
    if (inputValue === issue) {
      /* BOSSを攻撃 */
      setBossLife((prev) => prev - 10);
      /* LIFEを回復 */
      setChallengerLife((prev) => prev + 15);
    } else {
      /* プレイヤーにダメージ */
      setChallengerLife((prev) => prev - bossAttack);
    }

    /* ランダムでBOSSが攻撃 */
    const dice = Math.floor(Math.random() * 3) + 1;
    if (dice === 1) {
      setChallengerLife((prev) => prev - 12);
    }

    nextIssue();
    setInputValue('');
  };

  return (
    <div className="space-y-2" ref={focusTrapRef}>
      {!isStarted ? (
        <Button fullWidth onClick={start} className="mt-20 h-12">
          レイドバトルに挑む
          <div className="absolute right-3">
            <Kbd>Enter</Kbd>
          </div>
        </Button>
      ) : (
        <div>
          <img
            className="mx-auto max-w-[360px]"
            src="https://1.bp.blogspot.com/-eJFDEryKn38/XTPoH62lA-I/AAAAAAABTwM/pImOj_yI6kIO1hHeRxH_WFfPSfwN8zqUgCLcBGAs/s800/fantasy_maou_devil.png"
            alt="魔王"
          />
          <div>魔王</div>
          <Progress value={bossLife < 0 ? 0 : bossLifePercent} color="red" />

          {/* お題 */}
          <div className="mt-6 flex justify-center">
            <div className="flex h-28 w-96 items-center justify-center rounded-xl border bg-white text-xl">
              「{issue}」
            </div>
          </div>

          <div>勇者</div>
          <Progress
            value={challengerLife < 0 ? 0 : challengerLife}
            color="green"
          />

          <Input
            ref={focusTrapRef}
            className="my-4"
            data-autofocus
            icon={<FaKeyboard />}
            type="text"
            placeholder={issue}
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

          <div className="my-6">
            <Button fullWidth onClick={handleAttack} className="h-12">
              Attack
              <div className="absolute right-3">
                <Kbd>Enter</Kbd>
              </div>
            </Button>
          </div>
          {challengerLife < 0 && (
            <p>魔王：「おお、勇者よ。死んでしまうとは情けない。」</p>
          )}
        </div>
      )}
    </div>
  );
};
