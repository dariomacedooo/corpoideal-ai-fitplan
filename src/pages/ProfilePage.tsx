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
import { TrainingDaysForm } from "@/components/profile/TrainingDaysForm";
import { HealthIssuesForm } from "@/components/profile/HealthIssuesForm";
import { AdditionalInfoForm } from "@/components/profile/AdditionalInfoForm";
import { BudgetForm } from "@/components/profile/BudgetForm";
import { ProfileProgressBar } from "@/components/profile/ProfileProgressBar";
import { ProfileAvatarUpload } from "@/components/profile/ProfileAvatarUpload";
import { ProfileDailyRoutine } from "@/components/profile/ProfileDailyRoutine";
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
  const [trainingDays, setTrainingDays] = useState<string[]>(['segunda', 'quarta', 'sexta']);

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
  const {
    toast
  } = useToast();
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
      setTrainingDays(profile.trainingDays || ['segunda', 'quarta', 'sexta']);
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
    setHealthIssues(current => current.includes(value) ? current.filter(issue => issue !== value) : [...current, value]);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação essencial: nome e objetivo são obrigatórios
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome para personalizar a experiência.",
        variant: "destructive"
      });
      return;
    }
    if (!goal) {
      toast({
        title: "Objetivo obrigatório",
        description: "Por favor, selecione seu objetivo fitness para continuar.",
        variant: "destructive"
      });
      return;
    }

    // Validação básica
    if (!height || !weight || !age || !sex) {
      toast({
        title: "Dados básicos obrigatórios",
        description: "Por favor, preencha altura, peso, idade e sexo.",
        variant: "destructive"
      });
      return;
    }

    // Validação dos dias de treino
    if (trainingDays.length === 0) {
      toast({
        title: "Dias de treino obrigatórios",
        description: "Por favor, selecione pelo menos um dia para treinar.",
        variant: "destructive"
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
      trainingDays,
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
      profileCompleted: true
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    toast({
      title: "Perfil salvo!",
      description: `Olá ${name}! Seus dados foram salvos com sucesso.`
    });

    // Navigate to the home page
    navigate('/home');
  };

  // Determinar campos preenchidos para progresso do perfil
  const totalFields = 12; // Ajuste conforme desejar considerar obrigatórios
  let completedFields = 0;
  if (name?.trim()) completedFields++;
  if (goal) completedFields++;
  if (height) completedFields++;
  if (weight) completedFields++;
  if (age) completedFields++;
  if (sex) completedFields++;
  if (lifestyle) completedFields++;
  if (trainingExperience) completedFields++;
  if (trainingDays && trainingDays.length > 0) completedFields++;
  if (budget) completedFields++;
  if (chest || leftArm || rightArm || waist || hips || leftThigh || rightThigh || leftCalf || rightCalf) completedFields++;
  if (healthIssues && healthIssues.length > 0) completedFields++;

  // Determinar próximo dia de treino
  const weekDaysPt: Record<string, string> = {
    segunda: "Segunda-feira",
    terca: "Terça-feira",
    quarta: "Quarta-feira",
    quinta: "Quinta-feira",
    sexta: "Sexta-feira",
    sabado: "Sábado",
    domingo: "Domingo"
  };
  const getNextTrainingDay = () => {
    if (!trainingDays?.length) return null;
    const todayIdx = new Date().getDay(); // 0 = domingo
    const trainingIdxs = trainingDays.map(d => Object.keys(weekDaysPt).indexOf(d));
    const sorted = trainingIdxs.filter(i => i >= todayIdx).sort((a, b) => a - b);
    const nextIdx = sorted.length > 0 ? sorted[0] : trainingIdxs[0];
    const nextDayKey = Object.keys(weekDaysPt)[nextIdx];
    return weekDaysPt[nextDayKey] || null;
  };
  return <div className="pb-16 pt-14 bg-gradient-to-t from-zinc-900 via-zinc-900 to-black min-h-screen bg-sky-500">
      <AppHeader />
      <div className="px-4 py-6 max-w-2xl mx-auto bg-neutral-900">
        <div className="flex flex-col md:flex-row gap-6 items-center mb-2">
          <ProfileAvatarUpload name={name} />
          <div className="flex-1 w-full">
            <ProfileProgressBar completedFields={completedFields} totalFields={totalFields} />
            <ProfileDailyRoutine name={name} goal={goal} nextWorkoutDay={getNextTrainingDay()} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4 mt-2 text-orange-400">Complete Seu Perfil</h1>
        <p className="mb-6 text-orange-400">
          Vamos personalizar sua experiência! Quanto mais informações você fornecer, melhor será seu plano.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Nome do usuário - PRIMEIRA INFORMAÇÃO */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-corpoideal-purple font-medium">
              <User className="h-4 w-4" /> Como você gostaria de ser chamado?
            </Label>
            <Input id="name" type="text" placeholder="Digite seu nome" value={name} onChange={e => setName(e.target.value)} className="border-corpoideal-purple/20 focus:border-corpoideal-purple" />
          </div>

          {/* 2. Objetivo fitness - SEGUNDA INFORMAÇÃO MAIS IMPORTANTE */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-corpoideal-purple flex items-center gap-2 text-orange-400">
              <Dumbbell className="h-5 w-5" /> Qual é o seu objetivo principal?
            </h3>
            <p className="text-sm text-orange-400">Esta informação define todo seu plano de treino e nutrição</p>
            <RadioGroup value={goal} onValueChange={setGoal} className="grid grid-cols-1 gap-3">
              <div>
                <RadioGroupItem value="perder-peso" id="perder-peso" className="peer sr-only" />
                <Label htmlFor="perder-peso" className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer">
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
                <Label htmlFor="ganhar-massa" className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer">
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
                <Label htmlFor="ganhar-peso" className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer">
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
                <Label htmlFor="manter-peso" className="flex flex-col items-start justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer">
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
          <BasicMeasurementsForm height={height} setHeight={setHeight} weight={weight} setWeight={setWeight} age={age} setAge={setAge} sex={sex} setSex={setSex} bodyFat={bodyFat} setBodyFat={setBodyFat} chest={chest} setChest={setChest} leftArm={leftArm} setLeftArm={setLeftArm} rightArm={rightArm} setRightArm={setRightArm} waist={waist} setWaist={setWaist} hips={hips} setHips={setHips} leftThigh={leftThigh} setLeftThigh={setLeftThigh} rightThigh={rightThigh} setRightThigh={setRightThigh} leftCalf={leftCalf} setLeftCalf={setLeftCalf} rightCalf={rightCalf} setRightCalf={setRightCalf} />
          
          {/* 4. Estilo de vida */}
          <LifestyleForm lifestyle={lifestyle} setLifestyle={setLifestyle} />
          
          {/* 5. Experiência de treino */}
          <TrainingExperienceForm trainingExperience={trainingExperience} setTrainingExperience={setTrainingExperience} trainingLocation={trainingLocation} setTrainingLocation={setTrainingLocation} />

          {/* 6. Dias de treino */}
          <TrainingDaysForm trainingDays={trainingDays} setTrainingDays={setTrainingDays} />
          
          {/* 7. Orçamento */}
          <BudgetForm budget={budget} setBudget={setBudget} />
          
          {/* 8. Problemas de saúde */}
          <HealthIssuesForm healthIssues={healthIssues} toggleHealthIssue={toggleHealthIssue} />
          
          {/* 9. Informações adicionais */}
          <AdditionalInfoForm additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo} />
          
          <Button type="submit" className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple text-lg py-3">
            Salvar e Continuar
          </Button>
        </form>
      </div>
      
      <BottomNav />
    </div>;
};
export default ProfilePage;