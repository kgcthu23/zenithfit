import React, { useState } from 'react';
import { DUMBBELL_WORKOUTS } from '../constants';
import type { DumbbellDay } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface DumbbellWorkoutsProps {
  onComplete: (workoutName: string) => void;
}

const DumbbellDayView: React.FC<{ day: DumbbellDay; onComplete: () => void }> = ({ day, onComplete }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
       <h2 className="text-3xl font-bold text-white text-center">{day.title}</h2>
       <p className="text-cyan-400 text-center mb-6">{day.focus}</p>
       <div className="space-y-4">
         {day.exercises.map((exercise, index) => (
           <div key={index} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">
             <span className="text-slate-200">{exercise.name}</span>
             <span className="text-slate-400 font-mono text-sm">{exercise.sets}</span>
           </div>
         ))}
       </div>
       <div className="text-center mt-8">
        <Button onClick={onComplete}>Mark as Complete & Go Back</Button>
       </div>
    </div>
  );
};


const DumbbellWorkouts: React.FC<DumbbellWorkoutsProps> = ({ onComplete }) => {
  const [selectedDay, setSelectedDay] = useState<DumbbellDay | null>(null);

  if (selectedDay) {
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelectedDay(null)} className="mb-6">
          &larr; Back to Workout List
        </Button>
        <DumbbellDayView 
          day={selectedDay} 
          onComplete={() => { 
            onComplete(`Dumbbell: ${selectedDay.title}`); 
            setSelectedDay(null); 
          }} 
        />
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-2">Dumbbell Program</h1>
      <p className="text-slate-400 mb-8">Select a workout day to view the exercises.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMBBELL_WORKOUTS.map((day) => (
          <Card key={day.day} onClick={() => setSelectedDay(day)}>
            <p className="text-slate-400 text-sm">Day {day.day}</p>
            <h3 className="text-xl font-bold text-cyan-400">{day.title}</h3>
            <p className="text-slate-300 mt-2 text-sm">{day.focus}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DumbbellWorkouts;
