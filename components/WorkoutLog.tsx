import React from 'react';
import type { WorkoutLogEntry } from '../types';
import { Card } from './ui/Card';

interface WorkoutLogProps {
  log: WorkoutLogEntry[];
  isLoading: boolean;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const WorkoutLog: React.FC<WorkoutLogProps> = ({ log, isLoading }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Workout Log</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {isLoading ? (
          <p className="text-slate-400 text-center py-4">Loading log...</p>
        ) : log.length > 0 ? (
          log.map(entry => (
            <div key={entry.id} className="bg-slate-900/50 p-3 rounded-md flex justify-between items-center animate-fade-in">
              <span className="font-medium text-slate-200">{entry.name}</span>
              <span className="text-sm text-slate-400">{formatDate(entry.date)}</span>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-center py-4">No workouts logged yet. Time to get started!</p>
        )}
      </div>
    </Card>
  );
};
