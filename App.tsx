import React, { useState, useEffect } from 'react';

import Dashboard from './components/Dashboard';
import BurpeeWorkout from './components/BurpeeWorkout';
import WorkoutProgram from './components/DumbbellWorkouts';
import { Page } from './types';
import type { WorkoutLogEntry } from './types';
import { Button } from './components/ui/Button';
import { getWorkoutLog, addWorkoutLogEntry } from './services/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [workoutLog, setWorkoutLog] = useState<WorkoutLogEntry[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data on initial component mount
    const fetchLog = async () => {
      setIsLoadingData(true);
      const log = await getWorkoutLog();
      setWorkoutLog(log);
      setIsLoadingData(false);
    };

    fetchLog();
  }, []);

  const refetchLog = async () => {
    setIsLoadingData(true);
    const log = await getWorkoutLog();
    setWorkoutLog(log);
    setIsLoadingData(false);
  }

  const handleWorkoutComplete = async (workoutName: string, reps?: number) => {
    let logName = workoutName;
    if (reps !== undefined && reps > 0) {
      logName = `${workoutName} (${reps} ${reps === 1 ? 'rep' : 'reps'})`;
    }

    try {
      await addWorkoutLogEntry(logName);
      // Refetch log after adding a new entry
      await refetchLog();
    } catch (error) {
      console.error("Failed to save workout.", error);
    }
    setCurrentPage(Page.Dashboard);
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case Page.Burpees:
        return <BurpeeWorkout onComplete={(reps) => handleWorkoutComplete('Burpee Challenge', reps)} />;
      case Page.WorkoutProgram:
        return <WorkoutProgram onComplete={handleWorkoutComplete} />;
      case Page.Dashboard:
      default:
        return <Dashboard setPage={setCurrentPage} workoutLog={workoutLog} isLoading={isLoadingData} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-5xl">
            <header className="flex justify-between items-center mb-8">
                <div 
                    className="text-2xl font-bold tracking-wider text-white cursor-pointer"
                    onClick={() => setCurrentPage(Page.Dashboard)}
                >
                    <span className="text-cyan-400">ZENITH</span>FIT
                </div>
                 <div className="flex items-center gap-4">
                  {currentPage !== Page.Dashboard && (
                      <Button variant="secondary" onClick={() => setCurrentPage(Page.Dashboard)}>
                          Dashboard
                      </Button>
                  )}
                </div>
            </header>
            <main>
                {renderPage()}
            </main>
             <footer className="text-center mt-12 text-slate-500 text-sm">
                <p>Stay consistent. Push your limits.</p>
            </footer>
        </div>
    </div>
  );
};

export default App;
