
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { GoalSelector } from "@/components/goals/GoalSelector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ResultProjection } from "@/components/analysis/ResultProjection";
import { MuscleProjection3D } from "@/components/analysis/MuscleProjection3D";
import { PhotosGallery } from "@/components/analysis/PhotosGallery";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { AnalysisActions } from "@/components/analysis/AnalysisActions";
import { BackButton } from "@/components/analysis/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [showGoals, setShowGoals] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [show3DProjection, setShow3DProjection] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState('full');
  const [muscleGain, setMuscleGain] = useState(5);
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

  const renderContent = () => {
    if (loading) {
      return <LoadingAnalysis />;
    }

    if (showGoals) {
      return (
        <>
          <GoalSelector onSelect={handleGoalSelected} />
          <BackButton onClick={() => setShowGoals(false)} />
        </>
      );
    }

    if (showProjection) {
      return (
        <>
          <ResultProjection originalPhotoUrl={localStorage.getItem('frontPhotoUrl') || ''} />
          <BackButton onClick={() => setShowProjection(false)} />
        </>
      );
    }

    if (show3DProjection) {
      return (
        <>
          <div className="space-y-6">
            <Tabs defaultValue="full" onValueChange={setSelectedMuscle}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="full">Corpo Todo</TabsTrigger>
                <TabsTrigger value="chest">Peitoral</TabsTrigger>
                <TabsTrigger value="abs">Abdômen</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="shoulders">Ombros</TabsTrigger>
                <TabsTrigger value="arms">Braços</TabsTrigger>
                <TabsTrigger value="legs">Pernas</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ganho de massa muscular (kg):</span>
                <span className="text-sm font-bold text-corpoideal-purple">{muscleGain} kg</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="15" 
                value={muscleGain}
                onChange={(e) => setMuscleGain(parseInt(e.target.value))}
                className="w-full" 
              />
            </div>
            
            <MuscleProjection3D 
              bodyPart={selectedMuscle} 
              gainAmount={muscleGain} 
              userImage={localStorage.getItem('frontPhotoUrl') || ''}
            />
          </div>
          <BackButton onClick={() => setShow3DProjection(false)} />
        </>
      );
    }

    return (
      <>
        <BodyAnalysis 
          posture={analysis.posture}
          fatPercentage={analysis.fatPercentage}
          symmetry={analysis.symmetry}
          bmi={analysis.bmi}
          measurements={analysis.measurements}
        />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowProjection(true)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <img 
              src="/placeholder.svg" 
              alt="Perda de peso" 
              className="w-12 h-12 mb-2"
            />
            <span className="text-sm font-medium">Projeção de perda de peso</span>
          </button>
          
          <button 
            onClick={() => setShow3DProjection(true)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <img 
              src="/placeholder.svg" 
              alt="Ganho muscular" 
              className="w-12 h-12 mb-2"
            />
            <span className="text-sm font-medium">Projeção de ganho muscular</span>
          </button>
          
          <button 
            onClick={() => setShowGoals(true)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <img 
              src="/placeholder.svg" 
              alt="Definir objetivos" 
              className="w-12 h-12 mb-2"
            />
            <span className="text-sm font-medium">Definir meu objetivo</span>
          </button>
        </div>
      </>
    );
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
        
        {renderContent()}
      </div>
      
      <BottomNav />
    </div>
  );
}

export default AnalysisPage;
