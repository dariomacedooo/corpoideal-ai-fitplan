
import { useState, useEffect } from 'react';

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
  trainingDays: string[]; // Dias de treino selecionados
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

  useEffect(() => {
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
      setProfile(parsedProfile);
    }
  }, []);

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
