
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { GoalSelector } from "@/components/goals/GoalSelector";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [showGoals, setShowGoals] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState({
    posture: '',
    fatPercentage: '',
    symmetry: '',
    bmi: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user profile data
    const profileData = localStorage.getItem('userProfile');
    if (profileData) {
      setUserProfile(JSON.parse(profileData));
    }
    
    // Simulate loading and analysis
    const timer = setTimeout(() => {
      // Mock analysis result with profile data if available
      const profile = profileData ? JSON.parse(profileData) : null;
      let bmi = '';
      
      if (profile && profile.height && profile.weight) {
        const heightInMeters = parseInt(profile.height) / 100;
        const weightInKg = parseInt(profile.weight);
        const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        bmi = calculatedBmi;
      }
      
      setAnalysis({
        posture: Math.random() > 0.5 ? 'Alinhada' : 'Ombro esquerdo mais elevado',
        fatPercentage: ['Baixa', 'Moderada', 'Alta'][Math.floor(Math.random() * 3)],
        symmetry: Math.random() > 0.5 ? 'Equilibrado' : 'Assimétrico',
        bmi: bmi,
      });
      
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
        
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <img 
                src={localStorage.getItem('frontPhotoUrl') || ''} 
                alt="Foto frontal"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            <div>
              <img 
                src={localStorage.getItem('sidePhotoUrl') || ''} 
                alt="Foto lateral"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Mostrar dados do perfil se disponíveis */}
        {userProfile && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-corpoideal-purple mb-2">Seus dados</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {userProfile.height && userProfile.weight && (
                <>
                  <div>Altura: {userProfile.height} cm</div>
                  <div>Peso: {userProfile.weight} kg</div>
                </>
              )}
              {userProfile.age && (
                <div>Idade: {userProfile.age} anos</div>
              )}
              {userProfile.sex && (
                <div>Sexo: {userProfile.sex === 'masculino' ? 'Masculino' : 'Feminino'}</div>
              )}
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 border-4 border-corpoideal-purple border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Analisando suas fotos...</p>
          </div>
        ) : (
          <>
            {!showGoals ? (
              <>
                <BodyAnalysis 
                  posture={analysis.posture}
                  fatPercentage={analysis.fatPercentage}
                  symmetry={analysis.symmetry}
                  bmi={analysis.bmi}
                />
                
                <div className="mt-6">
                  <Button 
                    onClick={() => setShowGoals(true)}
                    className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                  >
                    Definir meu objetivo
                  </Button>
                </div>
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
};

export default AnalysisPage;
