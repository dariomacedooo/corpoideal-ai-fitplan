
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Import the refactored components
import { BasicMeasurementsForm } from "@/components/profile/BasicMeasurementsForm";
import { LifestyleForm } from "@/components/profile/LifestyleForm";
import { TrainingExperienceForm } from "@/components/profile/TrainingExperienceForm";
import { HealthIssuesForm } from "@/components/profile/HealthIssuesForm";
import { AdditionalInfoForm } from "@/components/profile/AdditionalInfoForm";

const ProfilePage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [trainingExperience, setTrainingExperience] = useState('');
  const [trainingLocation, setTrainingLocation] = useState('');
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load any existing profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
      setAge(profile.age || '');
      setSex(profile.sex || '');
      setLifestyle(profile.lifestyle || '');
      setTrainingExperience(profile.trainingExperience || '');
      setTrainingLocation(profile.trainingLocation || '');
      setHealthIssues(profile.healthIssues || []);
      setAdditionalInfo(profile.additionalInfo || '');
    }
  }, []);
  
  const toggleHealthIssue = (value: string) => {
    setHealthIssues(current => 
      current.includes(value)
        ? current.filter(issue => issue !== value)
        : [...current, value]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save profile data
    const profileData = {
      height,
      weight,
      age,
      sex,
      lifestyle,
      trainingExperience,
      trainingLocation,
      healthIssues,
      additionalInfo,
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    toast({
      title: "Perfil salvo!",
      description: "Seus dados foram salvos com sucesso.",
    });
    
    // Navigate to the home page
    navigate('/home');
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Seu Perfil</h1>
        <p className="text-gray-600 mb-6">
          Complete seu perfil para que possamos personalizar seu plano de forma mais eficiente.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Medidas básicas */}
          <BasicMeasurementsForm 
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            age={age}
            setAge={setAge}
            sex={sex}
            setSex={setSex}
          />
          
          {/* Estilo de vida */}
          <LifestyleForm 
            lifestyle={lifestyle}
            setLifestyle={setLifestyle}
          />
          
          {/* Experiência de treino e local */}
          <TrainingExperienceForm
            trainingExperience={trainingExperience}
            setTrainingExperience={setTrainingExperience}
            trainingLocation={trainingLocation}
            setTrainingLocation={setTrainingLocation}
          />
          
          {/* Problemas de saúde */}
          <HealthIssuesForm
            healthIssues={healthIssues}
            toggleHealthIssue={toggleHealthIssue}
          />
          
          {/* Informações adicionais */}
          <AdditionalInfoForm
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
          
          <Button 
            type="submit"
            className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
          >
            Salvar Perfil
          </Button>
        </form>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
