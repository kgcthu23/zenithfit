import React, { useState } from 'react';
import type { CompletedWorkout } from '../../types';
import { Card } from './Card';
import { Button } from './Button';

const getColor = (count: number): string => {
  if (count === 1) return 'bg-cyan-700/60';
  if (count <= 3) return 'bg-cyan-600/70';
  if (count <= 5) return 'bg-cyan-500/80';
  return 'bg-cyan-400/90';
};

const Calendar: React.FC<{ data: CompletedWorkout[] }> = ({ data }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dataMap = new Map<string, number>();
  data.forEach(item => {
    dataMap.set(item.date, item.count);
  });

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(1); // Set to the first of the month to avoid day-of-month issues
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => changeMonth(-1)} className="px-3 py-1">&larr;</Button>
        <h2 className="text-xl font-bold text-white text-center">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <Button variant="ghost" onClick={() => changeMonth(1)} className="px-3 py-1">&rarr;</Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-slate-400 text-xs mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-semibold">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const count = dataMap.get(dateString) || 0;
          const bgColor = count > 0 ? getColor(count) : 'bg-slate-800/50';
          const isToday = isCurrentMonth && day === today.getDate();
          
          return (
            <div
              key={day}
              className={`relative w-full aspect-square flex items-center justify-center rounded-lg transition-colors duration-300 ${bgColor} ${isToday ? 'ring-2 ring-cyan-400' : 'border border-transparent'}`}
              title={count > 0 ? `${count} workout(s) on ${dateString}` : `No workouts on ${dateString}`}
            >
              <span className={`font-medium ${isToday ? 'text-cyan-300' : 'text-slate-200'}`}>{day}</span>
              {count > 0 && (
                <div className="absolute bottom-1.5 w-1 h-1 bg-cyan-400 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Calendar;