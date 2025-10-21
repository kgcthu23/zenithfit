

import React, { useMemo } from 'react';
import type { WorkoutLogEntry, CompletedWorkout } from '../types';
import { Page } from '../types';
import { Card } from './ui/Card';
import { WorkoutLog } from './WorkoutLog';
import Calendar from './ui/Calendar';

interface DashboardProps {
  setPage: (page: Page) => void;
  workoutLog: WorkoutLogEntry[];
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ setPage, workoutLog, isLoading }) => {
    
  const calendarData = useMemo((): CompletedWorkout[] => {
    if (!workoutLog) return [];
    
    // FIX: Explicitly typing the accumulator `acc` ensures that TypeScript correctly infers
    // the return type of `reduce`, which resolves the downstream type error for `count`.
    const countsByDate = workoutLog.reduce((acc: Record<string, number>, entry) => {
      const date = entry.date.split('T')[0]; // Format to YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(countsByDate).map(([date, count]) => ({
      date,
      count,
    }));
  }, [workoutLog]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to Zenith Fit</h1>
        <p className="text-slate-400 mt-2">Your personalized dashboard to conquer your fitness goals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <WorkoutLog log={workoutLog} isLoading={isLoading} />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 text-center lg:text-left">Workout Calendar</h2>
          <Calendar data={calendarData} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Choose Your Workout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card onClick={() => setPage(Page.Burpees)}>
            <h3 className="text-xl font-bold text-cyan-400">Burpee Challenge</h3>
            <p className="text-slate-300 mt-2">25 reps with 5s on, 5s off intervals. A quick and intense cardio blast.</p>
          </Card>
          <Card onClick={() => setPage(Page.Hiit)}>
            <h3 className="text-xl font-bold text-cyan-400">HIIT Circuit</h3>
            <p className="text-slate-300 mt-2">A high-intensity interval training circuit to maximize calorie burn.</p>
          </Card>
          <Card onClick={() => setPage(Page.WorkoutProgram)} className="md:col-span-2">
            <h3 className="text-xl font-bold text-cyan-400">Weekly Workout Program</h3>
            <p className="text-slate-300 mt-2">A 5-day split with editable weights, reps, and sets to track your progress.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;