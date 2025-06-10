
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Dumbbell } from "lucide-react";

// Import the refactored components
import { BasicMeasurementsForm } from "@/components/profile/BasicMeasurementsForm";
import { LifestyleForm } from "@/components/profile/LifestyleForm";
import { TrainingExperienceForm } from "@/components/profile/TrainingExperienceForm";
import { HealthIssuesForm } from "@/components/profile/HealthIssuesForm";
import { AdditionalInfoForm } from "@/components/profile/AdditionalInfoForm";
import { BudgetForm } from "@/components/profile/BudgetForm";

const ProfilePage = () => {
  // Nome do usuário - primeira informação
  const [name, setName] = useState('');
  
  // Objetivo - segunda informação mais importante
  const [goal, setGoal] = useState('');
  
  // Dados básicos
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [bodyFat, setBodyFat] = useState(''); 
  
  // Estilo de vida e experiência
  const [lifestyle, setLifestyle] = useState('');
  const [trainingExperience, setTrainingExperience] = useState('');
  const [trainingLocation, setTrainingLocation] = useState('');
  
  // Orçamento
  const [budget, setBudget] = useState('');
  
  // Problemas de saúde e informações adicionais
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Medidas corporais
  const [chest, setChest] = useState('');
  const [leftArm, setLeftArm] = useState('');
  const [rightArm, setRightArm] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [leftThigh, setLeftThigh] = useState('');
  const [rightThigh, setRightThigh] = useState('');
  const [leftCalf, setLeftCalf] = useState('');
  const [rightCalf, setRightCalf] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load any existing profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setName(profile.name || '');
      setGoal(profile.goal || '');
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
      setChest(profile.chest || '');
      setLeftArm(profile.leftArm || '');
      setRightArm(profile.rightArm || '');
      setWaist(profile.waist || '');
      setHips(profile.hips || '');
      setLeftThigh(profile.leftThigh || '');
      setRightThigh(profile.rightThigh || '');
      setLeftCalf(profile.leftCalf || '');
      setRightCalf(profile.rightCalf || '');
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
    
    // Validação essencial: nome e objetivo são obrigatórios
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome para personalizar a experiência.",
        variant: "destructive",
      });
      return;
    }

    if (!goal) {
      toast({
        title: "Objetivo obrigatório",
        description: "Por favor, selecione seu objetivo fitness para continuar.",
        variant: "destructive",
      });
      return;
    }

    // Validação básica
    if (!height || !weight || !age || !sex) {
      toast({
        title: "Dados básicos obrigatórios",
        description: "Por favor, preencha altura, peso, idade e sexo.",
        variant: "destructive",
      });
      return;
    }
    
    // Save profile data
    const profileData = {
      name: name.trim(),
      goal,
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
      chest,
      leftArm,
      rightArm,
      waist,
      hips,
      leftThigh,
      rightThigh,
      leftCalf,
      rightCalf,
      profileCompleted: true,
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    toast({
      title: "Perfil salvo!",
      description: `Olá ${name}! Seus dados foram salvos com sucesso.`,
    });
    
    // Navigate to the photo upload page
    navigate('/upload');
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Complete Seu Perfil</h1>
        <p className="text-gray-600 mb-6">
          Vamos personalizar sua experiência! Quanto mais informações você fornecer, melhor será seu plano.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Nome do usuário - PRIMEIRA INFORMAÇÃO */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-corpoideal-purple font-medium">
              <User className="h-4 w-4" /> Como você gostaria de ser chamado?
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-corpoideal-purple/20 focus:border-corpoideal-purple"
            />
          </div>

          {/* 2. Objetivo fitness - SEGUNDA INFORMAÇÃO MAIS IMPORTANTE */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-corpoideal-purple flex items-center gap-2">
              <Dumbbell className="h-5 w-5" /> Qual é o seu objetivo principal?
            </h3>
            <p className="text-sm text-gray-600">Esta informação define todo seu plano de treino e nutrição</p>
            <RadioGroup 
              value={goal} 
              onValueChange={setGoal}
              className="grid grid-cols-1 gap-3"
            >
              <div>
                <RadioGroupItem value="perder-peso" id="perder-peso" className="peer sr-only" />
                <Label
                  htmlFor="perder-peso"
                  className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
                >
                  <div className="w-full">
                    <p className="text-base font-medium leading-none">🔥 Perda de Peso</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Reduzir gordura corporal e definir músculos
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ganhar-massa" id="ganhar-massa" className="peer sr-only" />
                <Label
                  htmlFor="ganhar-massa"
                  className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
                >
                  <div className="w-full">
                    <p className="text-base font-medium leading-none">💪 Ganho de Massa Muscular</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Hipertrofia e aumento de força
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="ganhar-peso" id="ganhar-peso" className="peer sr-only" />
                <Label
                  htmlFor="ganhar-peso"
                  className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
                >
                  <div className="w-full">
                    <p className="text-base font-medium leading-none">📈 Ganho de Peso</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aumentar peso de forma saudável
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="manter-peso" id="manter-peso" className="peer sr-only" />
                <Label
                  htmlFor="manter-peso"
                  className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
                >
                  <div className="w-full">
                    <p className="text-base font-medium leading-none">⚖️ Manter Peso</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manter composição atual e melhorar saúde
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* 3. Dados básicos */}
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
          
          {/* 4. Estilo de vida */}
          <LifestyleForm 
            lifestyle={lifestyle}
            setLifestyle={setLifestyle}
          />
          
          {/* 5. Experiência de treino */}
          <TrainingExperienceForm
            trainingExperience={trainingExperience}
            setTrainingExperience={setTrainingExperience}
            trainingLocation={trainingLocation}
            setTrainingLocation={setTrainingLocation}
          />
          
          {/* 6. Orçamento */}
          <BudgetForm
            budget={budget}
            setBudget={setBudget}
          />
          
          {/* 7. Problemas de saúde */}
          <HealthIssuesForm
            healthIssues={healthIssues}
            toggleHealthIssue={toggleHealthIssue}
          />
          
          {/* 8. Informações adicionais */}
          <AdditionalInfoForm
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
          
          <Button 
            type="submit"
            className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple text-lg py-3"
          >
            Salvar e Continuar
          </Button>
        </form>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
