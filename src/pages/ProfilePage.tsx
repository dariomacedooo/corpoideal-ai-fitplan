import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dumbbell } from "lucide-react";

// Import the refactored components
import { BasicMeasurementsForm } from "@/components/profile/BasicMeasurementsForm";
import { LifestyleForm } from "@/components/profile/LifestyleForm";
import { TrainingExperienceForm } from "@/components/profile/TrainingExperienceForm";
import { HealthIssuesForm } from "@/components/profile/HealthIssuesForm";
import { AdditionalInfoForm } from "@/components/profile/AdditionalInfoForm";
import { BudgetForm } from "@/components/profile/BudgetForm";
import { MenstrualCycleForm } from "@/components/profile/MenstrualCycleForm";

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
  const [bodyFat, setBodyFat] = useState(''); 
  const [budget, setBudget] = useState('');
  // Novas medidas
  const [chest, setChest] = useState('');
  const [leftArm, setLeftArm] = useState('');
  const [rightArm, setRightArm] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [leftThigh, setLeftThigh] = useState('');
  const [rightThigh, setRightThigh] = useState('');
  const [leftCalf, setLeftCalf] = useState('');
  const [rightCalf, setRightCalf] = useState('');
  // Objetivo
  const [goal, setGoal] = useState('');
  // Nome do usuário
  const [userName, setUserName] = useState('');
  // Ciclo menstrual (para mulheres)
  const [cycleLength, setCycleLength] = useState('28');
  const [lastPeriod, setLastPeriod] = useState('');
  const [periodTracking, setPeriodTracking] = useState(false);
  
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
      setBodyFat(profile.bodyFat || '');
      setBudget(profile.budget || '');
      // Carregar novas medidas
      setChest(profile.chest || '');
      setLeftArm(profile.leftArm || '');
      setRightArm(profile.rightArm || '');
      setWaist(profile.waist || '');
      setHips(profile.hips || '');
      setLeftThigh(profile.leftThigh || '');
      setRightThigh(profile.rightThigh || '');
      setLeftCalf(profile.leftCalf || '');
      setRightCalf(profile.rightCalf || '');
      // Objetivo
      setGoal(profile.goal || '');
      // Nome do usuário
      setUserName(profile.userName || '');
      // Ciclo menstrual
      setCycleLength(profile.cycleLength || '28');
      setLastPeriod(profile.lastPeriod || '');
      setPeriodTracking(profile.periodTracking || false);
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
    
    // Basic validation
    if (!height || !weight || !age || !sex) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha pelo menos altura, peso, idade e sexo.",
        variant: "destructive",
      });
      return;
    }

    // Validar que o objetivo foi selecionado
    if (!goal) {
      toast({
        title: "Objetivo não selecionado",
        description: "Por favor, selecione seu objetivo fitness.",
        variant: "destructive",
      });
      return;
    }
    
    // Validar ciclo menstrual para mulheres
    if (sex === 'feminino' && periodTracking && (!lastPeriod || !cycleLength)) {
      toast({
        title: "Dados do ciclo incompletos",
        description: "Se deseja acompanhamento com base no ciclo, preencha todos os dados.",
        variant: "destructive",
      });
      return;
    }
    
    // Additional validation for userName
    if (!userName.trim()) {
      toast({
        title: "Nome não preenchido",
        description: "Por favor, informe seu nome para personalização do plano.",
        variant: "destructive",
      });
      return;
    }
    
    // Save profile data
    const profileData = {
      height,
      weight,
      age,
      sex,
      bodyFat,
      lifestyle,
      trainingExperience,
      trainingLocation,
      healthIssues,
      additionalInfo,
      budget,
      // Novas medidas
      chest,
      leftArm,
      rightArm,
      waist,
      hips,
      leftThigh,
      rightThigh,
      leftCalf,
      rightCalf,
      // Objetivo
      goal,
      // Nome do usuário
      userName,
      // Ciclo menstrual
      cycleLength,
      lastPeriod,
      periodTracking,
      profileCompleted: true,
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    toast({
      title: "Perfil salvo!",
      description: "Seus dados foram salvos com sucesso.",
    });
    
    // Show motivational message with user's name
    if (userName) {
      setTimeout(() => {
        toast({
          title: `Excelente, ${userName}!`,
          description: "Você está no caminho certo para alcançar seus objetivos de fitness. Vamos continuar!",
        });
      }, 1000);
    }
    
    // Navigate to the photo upload page
    navigate('/upload');
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Seu Perfil</h1>
        <p className="text-gray-600 mb-6">
          Complete seu perfil para que possamos personalizar seu plano de treino e nutrição de forma mais eficiente.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do usuário */}
          <div className="space-y-2">
            <Label htmlFor="user-name">Seu Nome</Label>
            <input
              id="user-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Como devemos te chamar?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Medidas básicas e medidas corporais */}
          <BasicMeasurementsForm 
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            age={age}
            setAge={setAge}
            sex={sex}
            setSex={setSex}
            bodyFat={bodyFat}
            setBodyFat={setBodyFat}
            chest={chest}
            setChest={setChest}
            leftArm={leftArm}
            setLeftArm={setLeftArm}
            rightArm={rightArm}
            setRightArm={setRightArm}
            waist={waist}
            setWaist={setWaist}
            hips={hips}
            setHips={setHips}
            leftThigh={leftThigh}
            setLeftThigh={setLeftThigh}
            rightThigh={rightThigh}
            setRightThigh={setRightThigh}
            leftCalf={leftCalf}
            setLeftCalf={setLeftCalf}
            rightCalf={rightCalf}
            setRightCalf={setRightCalf}
          />
          
          {/* Ciclo menstrual (apenas para mulheres) */}
          {sex === 'feminino' && (
            <MenstrualCycleForm
              cycleLength={cycleLength}
              setCycleLength={setCycleLength}
              lastPeriod={lastPeriod}
              setLastPeriod={setLastPeriod}
              periodTracking={periodTracking}
              setPeriodTracking={setPeriodTracking}
            />
          )}
          
          {/* Objetivo fitness */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-corpoideal-purple flex items-center gap-2">
              <Dumbbell className="h-4 w-4" /> Seu Objetivo
            </h3>
            <RadioGroup 
              value={goal} 
              onValueChange={setGoal}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="perder-peso" id="perder-peso" className="peer sr-only" />
                <Label
                  htmlFor="perder-peso"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple"
                >
                  <div className="w-full flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Perda de Peso</p>
                    <p className="text-xs text-muted-foreground">
                      Reduzir gordura corporal e definir
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ganhar-massa" id="ganhar-massa" className="peer sr-only" />
                <Label
                  htmlFor="ganhar-massa"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple"
                >
                  <div className="w-full flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Ganho de Massa Muscular</p>
                    <p className="text-xs text-muted-foreground">
                      Hipertrofia e aumento de força
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ganhar-peso" id="ganhar-peso" className="peer sr-only" />
                <Label
                  htmlFor="ganhar-peso"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple"
                >
                  <div className="w-full flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Ganho de Peso</p>
                    <p className="text-xs text-muted-foreground">
                      Aumentar peso de forma saudável
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="manter-peso" id="manter-peso" className="peer sr-only" />
                <Label
                  htmlFor="manter-peso"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple"
                >
                  <div className="w-full flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Manter Peso</p>
                    <p className="text-xs text-muted-foreground">
                      Manter composição atual e saúde
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
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
          
          {/* Orçamento para alimentação */}
          <BudgetForm
            budget={budget}
            setBudget={setBudget}
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
            Salvar e Prosseguir para Fotos
          </Button>
        </form>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
