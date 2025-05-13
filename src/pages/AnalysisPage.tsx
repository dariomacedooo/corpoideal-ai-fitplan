
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { GoalSelector } from "@/components/goals/GoalSelector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ResultProjection } from "@/components/analysis/ResultProjection";
import { PhotosGallery } from "@/components/analysis/PhotosGallery";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { AnalysisActions } from "@/components/analysis/AnalysisActions";
import { BackButton } from "@/components/analysis/BackButton";

const AnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [showGoals, setShowGoals] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState({
    posture: '',
    fatPercentage: '',
    symmetry: '',
    bmi: '',
    measurements: {
      waist: '',
      thigh: '',
      calf: '',
    }
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user has completed profile and uploaded photos
    const savedProfile = localStorage.getItem('userProfile');
    const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
    const sidePhotoUrl = localStorage.getItem('sidePhotoUrl');
    
    if (!savedProfile || !JSON.parse(savedProfile).profileCompleted) {
      toast({
        title: "Perfil incompleto",
        description: "Por favor, complete seu perfil antes de prosseguir.",
      });
      navigate('/profile');
      return;
    }
    
    if (!frontPhotoUrl || !sidePhotoUrl) {
      toast({
        title: "Fotos necessárias",
        description: "Por favor, envie suas fotos antes de prosseguir.",
      });
      navigate('/upload');
      return;
    }
    
    // Get user profile data
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    
    // Simulate loading and analysis
    const timer = setTimeout(() => {
      // Mock analysis result with profile data if available
      const profile = savedProfile ? JSON.parse(savedProfile) : null;
      let bmi = '';
      let fatEstimate = '';
      
      if (profile && profile.height && profile.weight) {
        const heightInMeters = parseInt(profile.height) / 100;
        const weightInKg = parseInt(profile.weight);
        const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        bmi = calculatedBmi;
        
        // Use provided body fat if available, otherwise estimate based on BMI
        if (profile.bodyFat) {
          fatEstimate = profile.bodyFat > 20 ? 'Alta' : (profile.bodyFat > 15 ? 'Moderada' : 'Baixa');
        } else {
          const bmiNum = parseFloat(calculatedBmi);
          fatEstimate = bmiNum > 25 ? 'Alta' : (bmiNum > 18.5 ? 'Moderada' : 'Baixa');
        }
      }
      
      // Set analysis state with all measurements if available
      setAnalysis({
        posture: Math.random() > 0.5 ? 'Alinhada' : 'Ombro esquerdo mais elevado',
        fatPercentage: profile?.bodyFat ? fatEstimate : ['Baixa', 'Moderada', 'Alta'][Math.floor(Math.random() * 3)],
        symmetry: Math.random() > 0.5 ? 'Equilibrado' : 'Assimétrico',
        bmi: bmi,
        measurements: {
          waist: profile?.waist || '',
          thigh: profile?.thigh || '',
          calf: profile?.calf || '',
        }
      });
      
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);
  
  const handleGoalSelected = (goal: string) => {
    // Save selected goal
    localStorage.setItem('selectedGoal', goal);
    
    toast({
      title: "Objetivo selecionado",
      description: "Seu plano personalizado está sendo gerado!",
    });
    
    // Simulate generating plan
    setTimeout(() => {
      navigate('/training');
    }, 1500);
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Análise Corporal</h1>
        
        <PhotosGallery 
          frontPhotoUrl={localStorage.getItem('frontPhotoUrl')}
          backPhotoUrl={localStorage.getItem('backPhotoUrl')}
          sidePhotoUrl={localStorage.getItem('sidePhotoUrl')}
        />
        
        <ProfileSummary userProfile={userProfile} />
        
        {loading ? (
          <LoadingAnalysis />
        ) : (
          <>
            {!showGoals && !showProjection ? (
              <>
                <BodyAnalysis 
                  posture={analysis.posture}
                  fatPercentage={analysis.fatPercentage}
                  symmetry={analysis.symmetry}
                  bmi={analysis.bmi}
                  measurements={analysis.measurements}
                />
                
                <AnalysisActions 
                  onShowProjection={() => setShowProjection(true)}
                  onShowGoals={() => setShowGoals(true)}
                />
              </>
            ) : showProjection ? (
              <>
                <ResultProjection 
                  originalPhotoUrl={localStorage.getItem('frontPhotoUrl') || ''} 
                />
                
                <BackButton onClick={() => setShowProjection(false)} />
              </>
            ) : (
              <GoalSelector onSelect={handleGoalSelected} />
            )}
          </>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
}

export default AnalysisPage;
