import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface WorkoutSession {
  id: string;
  user_id: string;
  workout_name: string;
  exercises_completed: any[];
  duration_minutes: number;
  notes: string | null;
  completed_at: string;
}

export const useWorkoutSessions = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSessions = async () => {
    if (!user) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Fetch all sessions
    const { data, error } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Error fetching workout sessions:', error);
    } else {
      setSessions(data || []);
      
      // Calculate weekly stats
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const weeklySessions = (data || []).filter(session => 
        new Date(session.completed_at) >= oneWeekAgo
      );
      
      setWeeklyCount(weeklySessions.length);
      setTotalMinutes(weeklySessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0));
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  const logWorkout = async (workoutData: {
    workout_name: string;
    exercises_completed: any[];
    duration_minutes: number;
    notes?: string;
  }) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para registrar treinos",
        variant: "destructive"
      });
      return false;
    }

    const { error } = await supabase
      .from('workout_sessions')
      .insert({
        user_id: user.id,
        ...workoutData,
        completed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error logging workout:', error);
      toast({
        title: "Erro ao registrar treino",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Treino registrado!",
      description: `${workoutData.workout_name} concluído com sucesso.`
    });

    await fetchSessions();
    return true;
  };

  return {
    sessions,
    isLoading,
    weeklyCount,
    totalMinutes,
    averageMinutes: weeklyCount > 0 ? Math.round(totalMinutes / weeklyCount) : 0,
    logWorkout,
    refreshSessions: fetchSessions
  };
};
