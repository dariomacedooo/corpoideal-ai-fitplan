
import { useState, useEffect } from 'react';

export interface UserProfile {
  height: string;
  weight: string;
  age: string;
  sex: string;
  bodyFat: string;
  lifestyle: string;
  trainingExperience: string;
  trainingLocation: string;
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
  name?: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...newProfile };
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
      default:
        return 'Personalizado';
    }
  };

  return {
    profile,
    updateProfile,
    getGoalText
  };
};
