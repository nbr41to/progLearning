import type { FC } from 'react';
import { useState } from 'react';

import { MemoryPanels } from '../games/MemoriPanels';
import { OrderPanels } from '../games/OrderPanels';

type GamePageProps = {};

/* 〇〇から始まる動物 */

export const GamePage: FC<GamePageProps> = () => {
  const [gameState, setGameState] = useState({
    failedCount: 0,
    getPoints: 0,
    Answered: false,
    finishedTask: false,
  });

  const answerFinishHandler = () => {
    setGameState({
      ...gameState,
      Answered: true,
      finishedTask: false,
    });
  };

  const taskFinishHandler = () => {
    setGameState({
      ...gameState,
      Answered: false,
      finishedTask: true,
    });
  };

  return (
    <div>
      <h1>Game</h1>
      <div className="flex gap-8">
        <MemoryPanels
          isAnswering={!gameState.Answered}
          finishHandler={answerFinishHandler}
        />
        {!gameState.finishedTask && (
          <OrderPanels finishHandler={taskFinishHandler} />
        )}
      </div>
    </div>
  );
};
