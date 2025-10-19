import React from 'react';
import type { WorkoutLogEntry } from '../types';
import { Page } from '../types';
import { Card } from './ui/Card';
import { WorkoutLog } from './WorkoutLog';

interface DashboardProps {
  setPage: (page: Page) => void;
  workoutLog: WorkoutLogEntry[];
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ setPage, workoutLog, isLoading }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to Zenith Fit</h1>
        <p className="text-slate-400 mt-2">Your personalized dashboard to conquer your fitness goals.</p>
      </div>

      <WorkoutLog log={workoutLog} isLoading={isLoading} />

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Choose Your Workout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Card onClick={() => setPage(Page.Fullbody)}>
            <h3 className="text-xl font-bold text-cyan-400">Fullbody Workout</h3>
            <p className="text-slate-300 mt-2">A comprehensive full-body circuit to build strength and endurance.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;