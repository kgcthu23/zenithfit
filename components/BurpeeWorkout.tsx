import React, { useState, useEffect } from 'react';
import { BURPEE_CONFIG } from '../constants';
import { useInterval } from '../hooks/useInterval';
import { Button } from './ui/Button';
import { TimerCircle } from './ui/TimerCircle';
import * as audioService from '../services/audioService';

interface BurpeeWorkoutProps {
  onComplete: (reps: number) => void;
}

type WorkoutState = 'NOT_STARTED' | 'WORK' | 'REST' | 'COMPLETED';

const BurpeeWorkout: React.FC<BurpeeWorkoutProps> = ({ onComplete }) => {
  const [state, setState] = useState<WorkoutState>('NOT_STARTED');
  const [currentRep, setCurrentRep] = useState(1);
  const [timer, setTimer] = useState(BURPEE_CONFIG.workDuration);
  const [isRunning, setIsRunning] = useState(false);

  // Audio cues on state change
  useEffect(() => {
    if (state === 'WORK') {
        audioService.playStartWorkSound();
    } else if (state === 'REST') {
        audioService.playStartRestSound();
    } else if (state === 'COMPLETED') {
        audioService.playCompletionSound();
    }
  }, [state]);

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

  const handleStop = () => {
    setIsRunning(false);
    // If stopping during a work interval, that rep hasn't been completed.
    // The number of completed reps is one less than the current rep number.
    if (state === 'WORK') {
      setCurrentRep(currentRep > 1 ? currentRep - 1 : 0);
    }
    // If stopping during rest, the current rep count is accurate for completed reps.
    setState('COMPLETED');
  };

  const getTimerProgress = () => {
    if (state === 'NOT_STARTED' || state === 'COMPLETED') return 0;
    const duration = state === 'WORK' ? BURPEE_CONFIG.workDuration : BURPEE_CONFIG.restDuration;
    if (duration === 0) return 1;
    return 1 - (timer / duration);
  };
  
  const getTimerColor = () => {
    // When paused, the circle should be red.
    if (!isRunning && (state === 'WORK' || state === 'REST')) {
      return 'text-red-500';
    }
    // During rest, it should be green.
    if (state === 'REST') {
      return 'text-green-400';
    }
    // Default work color.
    return 'text-cyan-400';
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
        colorClassName={getTimerColor()}
      />

      <div className="flex items-center justify-center gap-4 h-12">
        {state === 'NOT_STARTED' && (
          <Button onClick={startWorkout}>Start Workout</Button>
        )}
        {(state === 'WORK' || state === 'REST') && (
          <div className="flex items-center justify-center gap-4">
            <Button onClick={handlePauseToggle} variant={isRunning ? 'warning' : 'secondary'}>
              {isRunning ? 'Pause' : 'Resume'}
            </Button>
            <Button onClick={handleStop} variant="ghost">
              Stop & Log
            </Button>
          </div>
        )}
      </div>

      {state === 'COMPLETED' && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-2xl font-bold text-green-400">Workout Complete!</p>
          {currentRep > 0 && <p className="text-xl text-white">You completed {currentRep} {currentRep === 1 ? 'rep' : 'reps'}.</p>}
          <Button onClick={() => onComplete(currentRep)}>Mark as Complete & Go Back</Button>
        </div>
      )}
    </div>
  );
};

export default BurpeeWorkout;