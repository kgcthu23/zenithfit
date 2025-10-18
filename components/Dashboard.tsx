import React from 'react';
import type { WorkoutLogEntry, CompletedWorkout } from '../types';
import { Page } from '../types';
import { Card } from './ui/Card';
import { WorkoutLog } from './WorkoutLog';
import { WorkoutCalendar } from './WorkoutCalendar';

interface DashboardProps {
  setPage: (page: Page) => void;
  workoutLog: WorkoutLogEntry[];
  isLoading: boolean;
}

// FIX: To make use of the WorkoutCalendar component, this function processes the workoutLog
// to aggregate workout counts by date.
const processLogForCalendar = (log: WorkoutLogEntry[]): CompletedWorkout[] => {
  const countsByDate = log.reduce((acc: Record<string, number>, entry) => {
    const date = entry.date.split('T')[0]; // "YYYY-MM-DD"
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(countsByDate).map(([date, count]) => ({
    date,
    count,
  }));
};

const Dashboard: React.FC<DashboardProps> = ({ setPage, workoutLog, isLoading }) => {
  const calendarData = processLogForCalendar(workoutLog);
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to Zenith Fit</h1>
        <p className="text-slate-400 mt-2">Your personalized dashboard to conquer your fitness goals.</p>
      </div>

      <WorkoutCalendar data={calendarData} />

      <WorkoutLog log={workoutLog} isLoading={isLoading} />

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Choose Your Workout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card onClick={() => setPage(Page.Burpees)}>
            <h3 className="text-xl font-bold text-cyan-400">Burpee Challenge</h3>
            <p className="text-slate-300 mt-2">25 reps with 5s on, 5s off intervals. A quick and intense cardio blast.</p>
          </Card>
          <Card onClick={() => setPage(Page.HIIT)}>
            <h3 className="text-xl font-bold text-cyan-400">HIIT Circuit</h3>
            <p className="text-slate-300 mt-2">A 20-25 minute high-intensity interval training session to maximize fat burn.</p>
          </Card>
          <Card onClick={() => setPage(Page.Dumbbell)}>
            <h3 className="text-xl font-bold text-cyan-400">Dumbbell Program</h3>
            <p className="text-slate-300 mt-2">A structured 5-day split to build strength and muscle mass.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
