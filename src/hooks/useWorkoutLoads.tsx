
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface ExerciseLoad {
  exerciseName: string;
  currentLoad: number;
  lastUpdated: Date;
  nextIncrease: Date;
  progressHistory: { date: Date; load: number }[];
}

export interface WorkoutLoads {
  [exerciseName: string]: ExerciseLoad;
}

export const useWorkoutLoads = () => {
  const [loads, setLoads] = useState<WorkoutLoads>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedLoads = localStorage.getItem('workoutLoads');
    if (savedLoads) {
      const parsedLoads = JSON.parse(savedLoads);
      // Convert date strings back to Date objects
      Object.keys(parsedLoads).forEach(exerciseName => {
        parsedLoads[exerciseName].lastUpdated = new Date(parsedLoads[exerciseName].lastUpdated);
        parsedLoads[exerciseName].nextIncrease = new Date(parsedLoads[exerciseName].nextIncrease);
        parsedLoads[exerciseName].progressHistory = parsedLoads[exerciseName].progressHistory.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
      });
      setLoads(parsedLoads);
    }
  }, []);

  const saveLoads = (newLoads: WorkoutLoads) => {
    setLoads(newLoads);
    localStorage.setItem('workoutLoads', JSON.stringify(newLoads));
  };

  const updateExerciseLoad = (exerciseName: string, newLoad: number) => {
    const today = new Date();
    const nextIncrease = new Date();
    nextIncrease.setDate(today.getDate() + 14); // Increase every 2 weeks

    const updatedLoads = {
      ...loads,
      [exerciseName]: {
        exerciseName,
        currentLoad: newLoad,
        lastUpdated: today,
        nextIncrease,
        progressHistory: [
          ...(loads[exerciseName]?.progressHistory || []),
          { date: today, load: newLoad }
        ]
      }
    };

    saveLoads(updatedLoads);
    
    toast({
      title: "Carga atualizada!",
      description: `${exerciseName}: ${newLoad}kg registrado`,
    });
  };

  const getLoadRecommendation = (exerciseName: string) => {
    const exerciseLoad = loads[exerciseName];
    if (!exerciseLoad) return null;

    const today = new Date();
    const daysSinceLastUpdate = Math.floor((today.getTime() - exerciseLoad.lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
    const daysUntilIncrease = Math.floor((exerciseLoad.nextIncrease.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilIncrease <= 0) {
      const suggestedIncrease = exerciseLoad.currentLoad * 0.05; // 5% increase
      return {
        shouldIncrease: true,
        currentLoad: exerciseLoad.currentLoad,
        suggestedLoad: Math.round((exerciseLoad.currentLoad + suggestedIncrease) * 2) / 2, // Round to nearest 0.5kg
        message: "Hora de aumentar a carga!"
      };
    }

    return {
      shouldIncrease: false,
      currentLoad: exerciseLoad.currentLoad,
      daysUntilIncrease,
      message: `Próximo aumento em ${daysUntilIncrease} dias`
    };
  };

  return {
    loads,
    updateExerciseLoad,
    getLoadRecommendation
  };
};
