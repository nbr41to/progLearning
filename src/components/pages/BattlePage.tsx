import type { FC } from 'react';

import { Button, Input, Kbd, Progress } from '@mantine/core';
import {
  getHotkeyHandler,
  useFocusTrap,
  useInputState,
  useInterval,
} from '@mantine/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';

import { useCurrentBoss } from 'src/libs/hooks/apiHooks/useCurrentBoss';
import { useStickies } from 'src/libs/hooks/apiHooks/useStickies';

const initialStatus = {
  life: 100,
  attack: 15,
};

export const BattlePage: FC = () => {
  const { boss } = useCurrentBoss();
  const [isStarted, setIsStarted] = useState(false);
  const [inputValue, setInputValue] = useInputState('');
  const [battleMessages, setBattleMessages] = useState<string[]>([]);
  const [challengerLife, setChallengerLife] = useState(initialStatus.life);
  const [bossLife, setBossLife] = useState(99999);
  const [isTyping, setIsTyping] = useState(false); // 変換中かどうかを判定
  const interval = useInterval(() => setChallengerLife((p) => p - 0.2), 100);
  const [issue, setIssue] = useState('');
  const bossName = boss?.name || 'BOSS';
  const bossAttack = boss?.attack || 0;
  const bossMaxLife = boss?.maxLife || 0;
  const bossLifePercent = (bossLife / bossMaxLife) * 100;
  const focusTrapRef = useFocusTrap();

  const { stickies } = useStickies();

  useEffect(() => {
    if (challengerLife <= 0) {
      interval.stop();
      const message = '魔王：「おお、勇者よ。死んでしまうとは情けない。」';
      if (!battleMessages.includes(message)) {
        setBattleMessages([message, ...battleMessages]);
      }
    }
  }, [challengerLife]);

  useEffect(() => {
    if (bossLife <= 0) {
      const message = `${bossName}を倒した🎉`;
      interval.stop();
      if (!battleMessages.includes(message)) {
        setBattleMessages([message, ...battleMessages]);
      }
      /* BOSSを倒したときの処理↓ */
    }
  }, [bossLife]);

  const start = () => {
    if (!boss) return;
    setBossLife(boss.currentLife);
    interval.start();
    setIsStarted(true);
    document.getElementById('input-area')?.focus();
  };

  const nextIssue = () => {
    if (stickies.length === 0) return;
    const array = [...stickies];
    const dice = Math.floor(Math.random() * array.length);
    const choice = array[dice];
    setIssue(choice.title);
  };

  useEffect(() => {
    nextIssue();
  }, [stickies]);

  const handleAttack = () => {
    if (!inputValue || challengerLife <= 0) return;
    if (inputValue === issue) {
      /* BOSSを攻撃 */
      setBossLife((prev) => prev - 300);
      /* LIFEを回復 */
      setChallengerLife((prev) => prev + 15);
      setBattleMessages([
        `あなた：「${inputValue}」(success)\nあなたの攻撃 300 のダメージを与えた!!\nLife を 15 回復した。`,
        ...battleMessages,
      ]);
    } else {
      /* プレイヤーにダメージ */
      setChallengerLife((prev) => prev - bossAttack);
      setBattleMessages([
        `あなた：「${inputValue}」(failed)\n${bossName}の攻撃 ${bossAttack} のダメージを受けた。`,
        ...battleMessages,
      ]);
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
            alt={bossName}
          />
          <div>
            <span>{bossName}</span>
            <span>
              （{bossLife <= 0 ? 0 : Math.floor(bossLife)} / {bossMaxLife}）
            </span>
          </div>
          <Progress value={bossLife < 0 ? 0 : bossLifePercent} color="red" />

          {/* お題 */}
          <div className="mt-6 flex justify-center">
            <div className="flex h-28 w-96 items-center justify-center rounded-xl border bg-white text-xl">
              「{issue}」
            </div>
          </div>

          <div>
            <span>勇者</span>
            <span>
              （{challengerLife < 0 ? 0 : Math.floor(challengerLife)} /{' '}
              {initialStatus.life}）
            </span>
          </div>
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
            disabled={challengerLife <= 0 || bossLife <= 0}
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
            <Button
              className="h-12"
              fullWidth
              onClick={handleAttack}
              disabled={challengerLife <= 0 || bossLife <= 0}
            >
              Attack
              <div className="absolute right-3">
                <Kbd>Enter</Kbd>
              </div>
            </Button>
          </div>

          <div className="divide-y">
            {battleMessages.map((message, index) => (
              <p
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={clsx(
                  'whitespace-pre-wrap p-2 font-bold',
                  message.endsWith('回復した。') && 'text-blue-600',
                  message.endsWith('受けた。') && 'text-red-600'
                )}
              >
                {message}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
