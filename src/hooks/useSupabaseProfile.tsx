import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

export interface SupabaseUserProfile {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  goal?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  target_weight?: number;
  body_fat?: number;
  muscle_mass?: number;
  activity_level?: string;
  training_experience?: string;
  training_days?: number;
  available_time?: number;
  health_issues?: string[];
  equipment?: string[];
  budget?: string;
  daily_routine?: string;
  profile_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useSupabaseProfile = () => {
  const [profile, setProfile] = useState<SupabaseUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching profile:', error);
        toast({
          title: "Erro ao carregar perfil",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setProfile(data);
      }
    } catch (error: any) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<SupabaseUserProfile>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Erro ao atualizar perfil",
          description: error.message,
          variant: "destructive",
        });
        return { error: error.message };
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { error: error.message };
    }
  };

  const createProfile = async (profileData: Partial<SupabaseUserProfile>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email,
          ...profileData
        });

      if (error) {
        toast({
          title: "Erro ao criar perfil",
          description: error.message,
          variant: "destructive",
        });
        return { error: error.message };
      }

      // Fetch updated profile
      await fetchProfile();
      return { success: true };
    } catch (error: any) {
      console.error('Error creating profile:', error);
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  // Helper functions for compatibility with existing code
  const getGoalText = () => {
    if (!profile?.goal) return '';
    
    const goals: Record<string, string> = {
      'lose-weight': 'Perder Peso',
      'gain-muscle': 'Ganhar Músculo',
      'maintain': 'Manter Forma',
      'improve-health': 'Melhorar Saúde'
    };
    
    return goals[profile.goal] || profile.goal;
  };

  const getTrainingDaysText = () => {
    if (!profile?.training_days) return '';
    return `${profile.training_days} dias por semana`;
  };

  return {
    profile,
    loading,
    updateProfile,
    createProfile,
    fetchProfile,
    getGoalText,
    getTrainingDaysText,
  };
};