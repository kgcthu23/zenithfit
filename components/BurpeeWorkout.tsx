import React, { useState } from 'react';
import { BURPEE_CONFIG } from '../constants';
import { useInterval } from '../hooks/useInterval';
import { Button } from './ui/Button';
import { TimerCircle } from './ui/TimerCircle';

interface BurpeeWorkoutProps {
  onComplete: () => void;
}

type WorkoutState = 'NOT_STARTED' | 'WORK' | 'REST' | 'COMPLETED';

const BurpeeWorkout: React.FC<BurpeeWorkoutProps> = ({ onComplete }) => {
  const [state, setState] = useState<WorkoutState>('NOT_STARTED');
  const [currentRep, setCurrentRep] = useState(1);
  const [timer, setTimer] = useState(BURPEE_CONFIG.workDuration);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        if (state === 'WORK') {
          if (currentRep >= BURPEE_CONFIG.reps) {
            setState('COMPLETED');
            setIsRunning(false);
          } else {
            setState('REST');
            setTimer(BURPEE_CONFIG.restDuration);
          }
        } else if (state === 'REST') {
          setCurrentRep(currentRep + 1);
          setState('WORK');
          setTimer(BURPEE_CONFIG.workDuration);
        }
      }
    },
    isRunning ? 1000 : null
  );

  const startWorkout = () => {
    setState('WORK');
    setCurrentRep(1);
    setTimer(BURPEE_CONFIG.workDuration);
    setIsRunning(true);
  };

  const handlePauseToggle = () => {
    setIsRunning(!isRunning);
  };

  const getTimerProgress = () => {
    if (state === 'NOT_STARTED' || state === 'COMPLETED') return 0;
    const duration = state === 'WORK' ? BURPEE_CONFIG.workDuration : BURPEE_CONFIG.restDuration;
    if (duration === 0) return 1;
    return 1 - (timer / duration);
  };
  
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-4xl font-bold text-white">Burpee Challenge</h1>
      <p className="text-slate-400">{BURPEE_CONFIG.reps} Reps / {BURPEE_CONFIG.workDuration}s On / {BURPEE_CONFIG.restDuration}s Off</p>
      
      {state !== 'NOT_STARTED' && state !== 'COMPLETED' && (
        <p className="text-2xl text-white">Rep: <span className="font-bold text-cyan-400">{currentRep}</span> / {BURPEE_CONFIG.reps}</p>
      )}

      <TimerCircle
        progress={getTimerProgress()}
        time={timer}
        label={state === 'WORK' ? 'WORK' : state === 'REST' ? 'REST' : 'READY'}
      />

      <div className="flex items-center justify-center gap-4 h-12">
        {state === 'NOT_STARTED' && (
          <Button onClick={startWorkout}>Start Workout</Button>
        )}
        {(state === 'WORK' || state === 'REST') && (
          <Button onClick={handlePauseToggle} variant="secondary">
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
        )}
      </div>

      {state === 'COMPLETED' && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-2xl font-bold text-green-400">Workout Complete!</p>
          <Button onClick={onComplete}>Mark as Complete & Go Back</Button>
        </div>
      )}
    </div>
  );
};

export default BurpeeWorkout;