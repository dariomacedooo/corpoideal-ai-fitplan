
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface UserProfile {
  name?: string;
  height: string;
  weight: string;
  age: string;
  sex: string;
  gender: string;
  bodyFat: string;
  lifestyle: string;
  trainingExperience: string;
  trainingLocation: string;
  trainingDays: string[];
  healthIssues: string[];
  additionalInfo: string;
  budget: string;
  chest: string;
  leftArm: string;
  rightArm: string;
  waist: string;
  hips: string;
  leftThigh: string;
  rightThigh: string;
  leftCalf: string;
  rightCalf: string;
  goal: string;
  profileCompleted: boolean;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { profile: authProfile } = useAuth();

  useEffect(() => {
    // For now, we'll continue using localStorage for the detailed profile
    // while the auth profile provides basic info from Supabase
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      // Ensure gender matches sex for compatibility
      if (parsedProfile.sex && !parsedProfile.gender) {
        parsedProfile.gender = parsedProfile.sex;
      }
      // Ensure trainingDays exists
      if (!parsedProfile.trainingDays) {
        parsedProfile.trainingDays = ['segunda', 'quarta', 'sexta'];
      }
      // Use name from auth profile if available
      if (authProfile?.name && !parsedProfile.name) {
        parsedProfile.name = authProfile.name;
      }
      setProfile(parsedProfile);
    } else if (authProfile?.name) {
      // Create basic profile from auth data
      setProfile({
        name: authProfile.name,
        height: '',
        weight: '',
        age: '',
        sex: '',
        gender: '',
        bodyFat: '',
        lifestyle: '',
        trainingExperience: '',
        trainingLocation: '',
        trainingDays: ['segunda', 'quarta', 'sexta'],
        healthIssues: [],
        additionalInfo: '',
        budget: '',
        chest: '',
        leftArm: '',
        rightArm: '',
        waist: '',
        hips: '',
        leftThigh: '',
        rightThigh: '',
        leftCalf: '',
        rightCalf: '',
        goal: '',
        profileCompleted: false,
      });
    }
  }, [authProfile]);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...newProfile };
    // Keep gender and sex in sync
    if (newProfile.sex) {
      updatedProfile.gender = newProfile.sex;
    }
    setProfile(updatedProfile as UserProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const getGoalText = () => {
    if (!profile?.goal) return 'Personalizado';
    
    switch (profile.goal) {
      case 'perder-peso':
        return 'Perder Peso';
      case 'ganhar-massa':
      case 'ganhar-musculos':
        return 'Ganhar Massa Muscular';
      case 'corrigir-postura':
        return 'Corrigir Postura';
      case 'ganhar-peso':
        return 'Ganhar Peso';
      case 'manter-peso':
        return 'Manter Peso';
      case 'definir-musculos':
        return 'Definir Músculos';
      default:
        return 'Personalizado';
    }
  };

  const getTrainingDaysText = () => {
    if (!profile?.trainingDays) return 'Seg/Qua/Sex';
    
    const dayMap: Record<string, string> = {
      'segunda': 'Seg',
      'terca': 'Ter',
      'quarta': 'Qua',
      'quinta': 'Qui',
      'sexta': 'Sex',
      'sabado': 'Sáb',
      'domingo': 'Dom'
    };
    
    return profile.trainingDays.map(day => dayMap[day] || day).join('/');
  };

  return {
    profile,
    updateProfile,
    getGoalText,
    getTrainingDaysText
  };
};
