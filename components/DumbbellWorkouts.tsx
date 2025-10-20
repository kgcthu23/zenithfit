
import React, { useState, useEffect } from 'react';
import { NEW_WORKOUT_PROGRAM } from '../constants';
import type { WorkoutDay, WorkoutGroup, Exercise } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const WORKOUT_PROGRAM_KEY = 'zenith-fit-new-program';

const DayView: React.FC<{
  day: WorkoutDay;
  onComplete: () => void;
  onUpdate: (updatedDay: WorkoutDay) => void;
}> = ({ day, onComplete, onUpdate }) => {
  const handleExerciseChange = (
    groupIndex: number,
    exerciseIndex: number,
    field: keyof Exercise,
    value: string,
  ) => {
    const updatedDay = JSON.parse(JSON.stringify(day));
    if (updatedDay.groups) {
      const exercise = updatedDay.groups[groupIndex].exercises[exerciseIndex];
      if (field === 'weight') {
        exercise.weight = value === '' ? undefined : parseInt(value, 10);
      } else {
        exercise[field] = value;
      }
      onUpdate(updatedDay);
    }
  };

  const handleSetsChange = (groupIndex: number, value: string) => {
    const updatedDay = JSON.parse(JSON.stringify(day));
    if (updatedDay.groups) {
      updatedDay.groups[groupIndex].sets = value === '' ? undefined : parseInt(value, 10);
      onUpdate(updatedDay);
    }
  };

  const inputClasses = "bg-slate-700 text-slate-200 font-mono p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none";

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-4xl font-bold text-white text-center">{day.title}</h2>
      {day.description && !day.youtubeUrl && (
        <p className="text-cyan-400 text-center mb-8 text-lg">
          {day.description}
        </p>
      )}

      {day.youtubeUrl && (
         <div className="aspect-video w-full mx-auto my-8 rounded-lg overflow-hidden border-2 border-slate-700 shadow-lg">
            <iframe
                width="100%"
                height="100%"
                src={day.youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
      )}

      {day.groups && day.groups.map((group, groupIndex) => (
        <Card key={groupIndex} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyan-400">{group.title}</h3>
            {group.sets !== undefined && (
              <div className="flex items-center gap-2">
                 <label htmlFor={`sets-${groupIndex}`} className="text-slate-300 font-semibold">Sets</label>
                 <input
                    id={`sets-${groupIndex}`}
                    type="number"
                    value={group.sets}
                    onChange={(e) => handleSetsChange(groupIndex, e.target.value)}
                    className={`${inputClasses} w-20 text-center`}
                    aria-label={`Sets for ${group.title}`}
                 />
              </div>
            )}
          </div>
          <ul className="space-y-3">
            {group.exercises.map((exercise, exerciseIndex) => (
              <li
                key={exerciseIndex}
                className="bg-slate-900/50 p-3 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-slate-700"
              >
                <p className="text-lg font-semibold text-slate-200 flex-1 truncate" title={exercise.name}>
                  {exercise.name}
                </p>
                <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                  {exercise.weight !== undefined && (
                     <div className="flex items-center gap-2">
                        <label htmlFor={`weight-${groupIndex}-${exerciseIndex}`} className="text-slate-400 text-sm">Weight</label>
                        <input
                            id={`weight-${groupIndex}-${exerciseIndex}`}
                            type="number"
                            value={exercise.weight}
                            onChange={(e) => handleExerciseChange(groupIndex, exerciseIndex, 'weight', e.target.value)}
                            className={`${inputClasses} w-24 text-right`}
                            aria-label={`Weight for ${exercise.name}`}
                        />
                        {exercise.unit === 'lbs' && <span className="text-slate-500 font-medium">lbs</span>}
                     </div>
                  )}
                   {exercise.reps !== undefined && (
                     <div className="flex items-center gap-2">
                         <label htmlFor={`reps-${groupIndex}-${exerciseIndex}`} className="text-slate-400 text-sm">{exercise.unit === 'sec' ? 'Time' : 'Reps'}</label>
                         <input
                            id={`reps-${groupIndex}-${exerciseIndex}`}
                            type="text"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(groupIndex, exerciseIndex, 'reps', e.target.value)}
                            className={`${inputClasses} w-28 text-right`}
                            aria-label={`Reps for ${exercise.name}`}
                        />
                        {exercise.unit === 'sec' && <span className="text-slate-500 font-medium">sec</span>}
                     </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <div className="text-center mt-8">
        <Button onClick={onComplete}>Mark as Complete & Go Back</Button>
      </div>
    </div>
  );
};

const WorkoutProgram: React.FC<{
  onComplete: (workoutName: string) => void;
}> = ({ onComplete }) => {
  const [program, setProgram] = useState<WorkoutDay[]>(() => {
    try {
      const savedProgram = localStorage.getItem(WORKOUT_PROGRAM_KEY);
      return savedProgram ? JSON.parse(savedProgram) : NEW_WORKOUT_PROGRAM;
    } catch (error) {
      console.error('Error reading program from localStorage', error);
      return NEW_WORKOUT_PROGRAM;
    }
  });

  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(WORKOUT_PROGRAM_KEY, JSON.stringify(program));
    } catch (error) {
      console.error('Error saving program to localStorage', error);
    }
  }, [program]);

  const handleDayUpdate = (updatedDay: WorkoutDay) => {
    const updatedProgram = program.map((day) =>
      day.day === updatedDay.day ? updatedDay : day,
    );
    setProgram(updatedProgram);
    setSelectedDay(updatedDay); // Keep view in sync
  };

  if (selectedDay) {
    const currentDayData = program.find((d) => d.day === selectedDay.day)!;
    return (
      <div>
        <Button
          variant="ghost"
          onClick={() => setSelectedDay(null)}
          className="mb-6"
        >
          &larr; Back to Workout List
        </Button>
        <DayView
          day={currentDayData}
          onUpdate={handleDayUpdate}
          onComplete={() => {
            onComplete(`Workout: ${selectedDay.title}`);
            setSelectedDay(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-2">
        Weekly Workout Program
      </h1>
      <p className="text-slate-400 mb-8">
        Select a workout day to view and edit the exercises.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {program.map((day) => (
          <Card key={day.day} onClick={() => setSelectedDay(day)}>
            <p className="text-slate-400 text-sm">Day {day.day}</p>
            <h3 className="text-xl font-bold text-cyan-400">{day.title}</h3>
            {day.description && (
              <p className="text-slate-300 mt-2 text-sm">{day.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutProgram;
