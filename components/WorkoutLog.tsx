
import React, { useState } from 'react';
import type { WorkoutLogEntry, WorkoutDay, WorkoutGroup } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const LoggedWorkoutDetails: React.FC<{ details: Omit<WorkoutDay, 'day' | 'youtubeUrl'> }> = ({ details }) => {
  if (!details.groups || details.groups.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-4">
      {details.groups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-cyan-400">{group.title}</h4>
            {group.sets && <p className="text-sm text-slate-400 font-medium">{group.sets} Sets</p>}
          </div>
          <ul className="space-y-2">
            {group.exercises.map((ex, exIndex) => (
              <li key={exIndex} className="bg-slate-800/60 p-2 rounded-md text-sm flex justify-between items-center">
                <span className="text-slate-300">{ex.name}</span>
                <div className="flex items-center gap-4 font-mono text-slate-300">
                  {ex.weight !== undefined && <span>{ex.weight} {ex.unit || 'lbs'}</span>}
                  {ex.reps && <span>{ex.reps} {ex.unit === 'sec' ? 'sec' : 'reps'}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


export const WorkoutLog: React.FC<{ log: WorkoutLogEntry[], isLoading: boolean }> = ({ log, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayLimit = 3;
  const canExpand = log.length > displayLimit;
  const displayedLog = isExpanded ? log : log.slice(0, displayLimit);
  
  const handleToggle = (id: string) => {
    setExpandedId(prevId => prevId === id ? null : id);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Workouts</h3>
      </div>
      <div className={`space-y-3 overflow-y-auto pr-2 transition-all duration-300 ${isExpanded ? 'max-h-[32rem]' : 'max-h-96'}`}>
        {isLoading ? (
          <p className="text-slate-400 text-center py-4">Loading log...</p>
        ) : displayedLog.length > 0 ? (
          displayedLog.map(entry => (
            <div key={entry.id} className="bg-slate-900/50 p-3 rounded-md animate-fade-in transition-colors duration-200 hover:bg-slate-900">
              <div 
                className={`flex justify-between items-center ${entry.workoutDetails ? 'cursor-pointer' : ''}`}
                onClick={() => entry.workoutDetails && handleToggle(entry.id)}
              >
                <span className="font-medium text-slate-200">{entry.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">{formatDate(entry.date)}</span>
                  {entry.workoutDetails && <ChevronIcon isExpanded={expandedId === entry.id} />}
                </div>
              </div>
              {expandedId === entry.id && entry.workoutDetails && (
                <LoggedWorkoutDetails details={entry.workoutDetails} />
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-center py-4">No workouts logged yet. Time to get started!</p>
        )}
      </div>
       {canExpand && (
        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : `View All (${log.length})`}
          </Button>
        </div>
      )}
    </Card>
  );
};