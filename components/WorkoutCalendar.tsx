import React from 'react';
import type { CompletedWorkout } from '../types';

interface WorkoutCalendarProps {
  data: CompletedWorkout[];
}

const getColor = (count: number): string => {
  if (count === 0) return 'bg-slate-800';
  if (count === 1) return 'bg-cyan-900';
  if (count <= 3) return 'bg-cyan-700';
  if (count <= 5) return 'bg-cyan-500';
  return 'bg-cyan-300';
};

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ data }) => {
  // If there's no data, don't render the component.
  if (!data || data.length === 0) {
    return null;
  }

  const today = new Date();
  const endDate = new Date(today);

  // Find the earliest date from workout data to start the calendar
  const allDates = data.map(d => {
    // Correctly parse YYYY-MM-DD as a local date, avoiding timezone issues
    const date = new Date(d.date);
    return new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  });
  const earliestDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  
  // Align the start date to the beginning of that week (Sunday)
  const startDate = new Date(earliestDate);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const days = [];
  let currentDate = new Date(startDate);
  while(currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const dataMap = new Map<string, number>();
  data.forEach(item => {
      dataMap.set(item.date, item.count);
  });

  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthStarts = days
    .map((day, index) => (day.getDate() === 1 ? { month: day.getMonth(), index } : null))
    .filter(Boolean);

  // Each square is w-2 (8px) and the gap is gap-px (1px), so each week column is ~9px wide.
  const weekColumnWidth = 9;

  return (
    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Workout Contributions</h3>
      <div className="relative h-4 mb-1"> {/* Container for month labels */}
          {monthStarts.map((monthStart, idx) => (
              monthStart && 
              <div 
                  key={idx} 
                  className="absolute text-xs text-slate-400"
                  style={{ left: `${Math.floor(monthStart.index / 7) * weekColumnWidth}px`}}
              >
                  {monthLabels[monthStart.month]}
              </div>
          ))}
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-px">
        {days.map((day) => {
          const dateString = formatDate(day);
          const count = dataMap.get(dateString) || 0;
          const color = getColor(count);

          return (
            <div key={dateString} className={`w-2 h-2 rounded-sm ${color}`} title={`${dateString}: ${count} workout(s)`}>
            </div>
          );
        })}
      </div>
    </div>
  );
};
