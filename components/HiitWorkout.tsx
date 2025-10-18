import React, { useState } from 'react';
import { HIIT_CIRCUIT, HIIT_ROUNDS } from '../constants';
import { useInterval } from '../hooks/useInterval';
import { Button } from './ui/Button';
import { TimerCircle } from './ui/TimerCircle';

interface HiitWorkoutProps {
  onComplete: () => void;
}

type WorkoutState = 'NOT_STARTED' | 'RUNNING' | 'COMPLETED';

const HiitWorkout: React.FC<HiitWorkoutProps> = ({ onComplete }) => {
  const [state, setState] = useState<WorkoutState>('NOT_STARTED');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(HIIT_CIRCUIT[0].duration);
  const [isRunning, setIsRunning] = useState(false);

  const currentExercise = HIIT_CIRCUIT[currentExerciseIndex];

  const advanceToNext = () => {
    const nextExerciseIndex = currentExerciseIndex + 1;
    if (nextExerciseIndex < HIIT_CIRCUIT.length) {
      setCurrentExerciseIndex(nextExerciseIndex);
      setTimer(HIIT_CIRCUIT[nextExerciseIndex].duration);
    } else {
      if (currentRound < HIIT_ROUNDS) {
        setCurrentRound(currentRound + 1);
        setCurrentExerciseIndex(0);
        setTimer(HIIT_CIRCUIT[0].duration);
      } else {
        setState('COMPLETED');
        setIsRunning(false);
      }
    }
  };

  useInterval(
    () => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        advanceToNext();
      }
    },
    isRunning ? 1000 : null
  );

  const startWorkout = () => {
    setState('RUNNING');
    setCurrentRound(1);
    setCurrentExerciseIndex(0);
    setTimer(HIIT_CIRCUIT[0].duration);
    setIsRunning(true);
  };

  const handlePauseToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleSkip = () => {
    if (state === 'RUNNING') {
      advanceToNext();
    }
  };
  
  const getTimerProgress = () => {
    if (state !== 'RUNNING' || !currentExercise) return 0;
    if (currentExercise.duration === 0) return 1;
    return 1 - timer / currentExercise.duration;
  };
  
  let nextExerciseInfo: string | null = null;
  if (state === 'RUNNING') {
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < HIIT_CIRCUIT.length) {
        nextExerciseInfo = HIIT_CIRCUIT[nextIndex].name;
    } else if (currentRound < HIIT_ROUNDS) {
        nextExerciseInfo = HIIT_CIRCUIT[0].name;
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-4xl font-bold text-white">HIIT Circuit</h1>
      <p className="text-slate-400">Total Rounds: {HIIT_ROUNDS}</p>

      {state === 'RUNNING' && (
        <>
          <p className="text-2xl text-white">Round: <span className="font-bold text-cyan-400">{currentRound}</span> / {HIIT_ROUNDS}</p>
          <p className="text-3xl font-semibold text-white mt-4">{currentExercise.name}</p>
        </>
      )}

      <TimerCircle
        progress={getTimerProgress()}
        time={timer}
        label={currentExercise.name.toLowerCase().includes('rest') ? 'REST' : 'WORK'}
      />
      
      {isRunning && timer <= 5 && nextExerciseInfo ? (
        <p className="text-xl text-yellow-400 animate-pulse h-7">Next: {nextExerciseInfo}</p>
      ) : (
        <div className="h-7" />
      )}


      {state === 'NOT_STARTED' && (
        <Button onClick={startWorkout}>Start Workout</Button>
      )}
      {state === 'RUNNING' && (
        <div className="flex items-center justify-center gap-4">
            <Button onClick={handlePauseToggle} variant="secondary">
              {isRunning ? 'Pause' : 'Resume'}
            </Button>
            <Button onClick={handleSkip} variant="ghost">
              Skip &rarr;
            </Button>
        </div>
      )}
      {state === 'COMPLETED' && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-2xl font-bold text-green-400">Circuit Complete!</p>
          <Button onClick={onComplete}>Mark as Complete & Go Back</Button>
        </div>
      )}

      {state !== 'COMPLETED' && (
        <div className="w-full max-w-md mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Circuit Exercises</h3>
          <ul className="space-y-1 text-left bg-slate-900/50 p-3 rounded-lg max-h-60 overflow-y-auto">
            {HIIT_CIRCUIT.map((ex, index) => (
              <li key={index} className={`p-2 rounded-md transition-colors duration-300 ${index === currentExerciseIndex && state === 'RUNNING' ? 'bg-cyan-900/70' : 'bg-slate-800'}`}>
                <span className={`transition-colors duration-300 ${index === currentExerciseIndex && state === 'RUNNING' ? 'text-cyan-300 font-bold' : 'text-slate-300'}`}>{ex.name}</span>
                <span className="float-right text-slate-400 font-mono text-sm">{ex.duration}s</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HiitWorkout;