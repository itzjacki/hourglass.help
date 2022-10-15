import { TIMEOUT } from 'dns';
import { NextJsWebpackConfig } from 'next/dist/server/config-shared';
import { useRef, useState } from 'react';

type GameState =
  | 'initial'
  | 'stasis'
  | 'vulnerable'
  | 'finished-success'
  | 'finished-too-early'
  | 'finished-too-late';

const stasisTime = 2500;

const Game = () => {
  const [gameStage, setGameStage] = useState<GameState>('initial');
  // TODO: replace with global context?
  const [gameScore, setGameScore] = useState(0);
  let stasisTimeout = useRef<NodeJS.Timeout>();
  let vulnerableTimeout = useRef<NodeJS.Timeout>();

  const handleHourglassClick = (currentState: GameState) => {
    switch (currentState) {
      case 'initial':
        setGameStage('stasis');
        stasisTimeout.current = setTimeout(() => {
          setGameStage('vulnerable');
        }, stasisTime);
        vulnerableTimeout.current = setTimeout(
          () => handleFailure('late'),
          stasisTime + getReactionWindow(gameScore)
        );
        console.log(getReactionWindow(gameScore));

        return;
      case 'stasis':
        handleFailure('early');
        return;
      case 'vulnerable':
        clearTimeout(vulnerableTimeout.current);
        setGameScore(gameScore + 1);
        setGameStage('finished-success');
        return;
      case 'finished-success':
      case 'finished-too-early':
      case 'finished-too-late':
        handleHourglassClick('initial');
        return;
      default:
        return;
    }
  };

  return (
    <div>
      <p className='text-center mb-2'>Score: {gameScore}</p>
      <div
        className='p-4 rounded-xl bg-slate-700'
        onClick={() => handleHourglassClick(gameStage)}
      >
        {gameStage === 'initial' && <div>Click me to start!</div>}
        {gameStage === 'stasis' && (
          <div className='text-yellow-500'>Anivia or something idk</div>
        )}
        {gameStage === 'vulnerable' && (
          <div className='text-blue-500'>Anivia or something idk</div>
        )}
        {gameStage === 'finished-success' && (
          <div>Good job! Click to go next</div>
        )}
        {gameStage === 'finished-too-early' && (
          <div>They were still in stasis! Try again?</div>
        )}
        {gameStage === 'finished-too-late' && (
          <div>They flashed away! Try again?</div>
        )}
      </div>
    </div>
  );

  function getReactionWindow(score: number) {
    return 100 + 500 * (1 / (score / 2 + 1));
  }

  function handleFailure(failureType: 'early' | 'late') {
    clearTimeout(stasisTimeout.current);
    clearTimeout(vulnerableTimeout.current);
    setGameScore(0);
    if (failureType === 'early') setGameStage('finished-too-early');
    else setGameStage('finished-too-late');
  }
};

export default Game;
