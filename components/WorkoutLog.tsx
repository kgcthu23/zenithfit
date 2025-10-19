import React, { useState } from 'react';
import type { WorkoutLogEntry } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const displayLimit = 5;
  const canExpand = log.length > displayLimit;
  const displayedLog = canExpand && !isExpanded ? log.slice(0, displayLimit) : log;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Workout Log</h3>
      <div className={`space-y-3 overflow-y-auto pr-2 transition-all duration-300 ${isExpanded ? 'max-h-[32rem]' : 'max-h-96'}`}>
        {isLoading ? (
          <p className="text-slate-400 text-center py-4">Loading log...</p>
        ) : displayedLog.length > 0 ? (
          displayedLog.map(entry => (
            <div key={entry.id} className="bg-slate-900/50 p-3 rounded-md flex justify-between items-center animate-fade-in">
              <span className="font-medium text-slate-200">{entry.name}</span>
              <span className="text-sm text-slate-400">{formatDate(entry.date)}</span>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-center py-4">No workouts logged yet. Time to get started!</p>
        )}
      </div>
       {canExpand && (
        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : `View All History (${log.length})`}
          </Button>
        </div>
      )}
    </Card>
  );
};