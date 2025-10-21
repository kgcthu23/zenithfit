
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { WorkoutLogEntry } from '../types';
import { Card } from './ui/Card';

interface WorkoutChartProps {
  workoutLog: WorkoutLogEntry[];
}

// Helper to get the start of the week (Sunday) for a given date
const getWeekStartDate = (date: Date) => {
  const d = new Date(date);
  const dayOfWeek = d.getDay(); // Sunday - 0, Monday - 1, etc.
  d.setDate(d.getDate() - dayOfWeek);
  d.setHours(0, 0, 0, 0); // Normalize to start of day
  return d;
};

const formatDateToYyyyMmDd = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const WorkoutChart: React.FC<WorkoutChartProps> = ({ workoutLog }) => {
  const weeklyData = React.useMemo(() => {
    if (!workoutLog || workoutLog.length === 0) return [];

    const counts: { [key: string]: number } = {};
    
    workoutLog.forEach(entry => {
      const entryDate = new Date(entry.date);
      const weekStartDate = getWeekStartDate(entryDate);
      const dateString = formatDateToYyyyMmDd(weekStartDate);
      counts[dateString] = (counts[dateString] || 0) + 1;
    });

    const allWeeksData = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
        const dateInWeek = new Date();
        dateInWeek.setDate(today.getDate() - i * 7);
        const weekStart = getWeekStartDate(dateInWeek);
        
        const dateString = formatDateToYyyyMmDd(weekStart);

        allWeeksData.push({
            week: weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            workouts: counts[dateString] || 0,
        });
    }

    return allWeeksData;
  }, [workoutLog]);

  if (workoutLog.length === 0) {
      return (
         <Card>
            <h2 className="text-2xl font-semibold text-white mb-4">Weekly Workout Progress</h2>
            <div className="h-80 flex items-center justify-center">
                <p className="text-slate-400">Log some workouts to see your progress!</p>
            </div>
        </Card>
      );
  }

  return (
    <Card>
        <h2 className="text-2xl font-semibold text-white mb-4">Weekly Workout Progress</h2>
        <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30} />
                    <Tooltip
                        cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                        contentStyle={{
                            backgroundColor: 'rgb(30 41 59 / 0.9)',
                            borderColor: 'rgb(51 65 85)',
                            borderRadius: '0.5rem',
                            color: '#cbd5e1'
                        }}
                        labelStyle={{ fontWeight: 'bold' }}
                        itemStyle={{ color: '#67e8f9' }}
                    />
                    <Bar dataKey="workouts" name="Workouts" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
  );
};