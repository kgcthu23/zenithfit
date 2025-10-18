import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BurpeeWorkout from './components/BurpeeWorkout';
import HiitWorkout from './components/HiitWorkout';
import DumbbellWorkouts from './components/DumbbellWorkouts';
import { Page } from './types';
import type { WorkoutLogEntry } from './types';
import { Button } from './components/ui/Button';
import { getWorkoutLog, addWorkoutLogEntry } from './services/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [workoutLog, setWorkoutLog] = useState<WorkoutLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLog = async () => {
      setIsLoading(true);
      const log = await getWorkoutLog();
      setWorkoutLog(log);
      setIsLoading(false);
    };

    fetchLog();
  }, []);

  const handleWorkoutComplete = async (workoutName: string) => {
    try {
      const newEntry = await addWorkoutLogEntry(workoutName);
      // Optimistically update the UI
      setWorkoutLog(prevLog => [newEntry, ...prevLog]);
    } catch (error) {
      console.error("Failed to save workout.", error);
      // Optionally show an error message to the user
    }
    setCurrentPage(Page.Dashboard);
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case Page.Burpees:
        return <BurpeeWorkout onComplete={() => handleWorkoutComplete('Burpee Challenge')} />;
      case Page.HIIT:
        return <HiitWorkout onComplete={() => handleWorkoutComplete('HIIT Circuit')} />;
      case Page.Dumbbell:
        return <DumbbellWorkouts onComplete={handleWorkoutComplete} />;
      case Page.Dashboard:
      default:
        return <Dashboard setPage={setCurrentPage} workoutLog={workoutLog} isLoading={isLoading} />;
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
                {currentPage !== Page.Dashboard && (
                    <Button variant="secondary" onClick={() => setCurrentPage(Page.Dashboard)}>
                        Dashboard
                    </Button>
                )}
            </header>
            <main>
                {renderPage()}
            </main>
             <footer className="text-center mt-12 text-slate-500 text-sm">
                <p>Powered by dedication and code. Stay consistent.</p>
            </footer>
        </div>
    </div>
  );
};

export default App;
