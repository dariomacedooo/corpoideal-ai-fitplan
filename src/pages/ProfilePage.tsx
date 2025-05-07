
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Weight, 
  Height, 
  Calendar,
  Activity, 
  Dumbbell,
  HeartOff,
  Diabetes,
  Thermometer,
} from "lucide-react";

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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2">
                <Height className="h-4 w-4" /> Altura (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Weight className="h-4 w-4" /> Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Idade
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sex" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Sexo
              </Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Estilo de vida */}
          <div className="space-y-2">
            <Label htmlFor="lifestyle" className="flex items-center gap-2">
              <Activity className="h-4 w-4" /> Estilo de Vida
            </Label>
            <Select value={lifestyle} onValueChange={setLifestyle}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu nível de atividade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentario">Sedentário (pouca ou nenhuma atividade)</SelectItem>
                <SelectItem value="leve">Levemente ativo (exercícios leves 1-3 dias/semana)</SelectItem>
                <SelectItem value="moderado">Moderadamente ativo (exercícios moderados 3-5 dias/semana)</SelectItem>
                <SelectItem value="ativo">Muito ativo (exercícios intensos 6-7 dias/semana)</SelectItem>
                <SelectItem value="extremo">Extremamente ativo (exercícios intensos diários ou trabalho físico)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Experiência de treino */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" /> Experiência em Treinos
            </Label>
            <RadioGroup value={trainingExperience} onValueChange={setTrainingExperience} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="iniciante" id="iniciante" />
                <Label htmlFor="iniciante">Iniciante (menos de 6 meses)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediario" id="intermediario" />
                <Label htmlFor="intermediario">Intermediário (6 meses a 2 anos)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="avancado" id="avancado" />
                <Label htmlFor="avancado">Avançado (mais de 2 anos)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Local de treino */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Onde você costuma treinar?
            </Label>
            <RadioGroup value={trainingLocation} onValueChange={setTrainingLocation} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="academia" id="academia" />
                <Label htmlFor="academia">Academia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casa" id="casa" />
                <Label htmlFor="casa">Em casa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="arlivre" id="arlivre" />
                <Label htmlFor="arlivre">Ao ar livre</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="misto" id="misto" />
                <Label htmlFor="misto">Misto (varia entre opções)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Problemas de saúde */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <HeartOff className="h-4 w-4" /> Problemas de Saúde
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="diabetes" 
                  checked={healthIssues.includes('diabetes')}
                  onCheckedChange={() => toggleHealthIssue('diabetes')}
                />
                <Label htmlFor="diabetes" className="flex items-center gap-1">
                  <Diabetes className="h-4 w-4" /> Diabetes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hipertensao" 
                  checked={healthIssues.includes('hipertensao')}
                  onCheckedChange={() => toggleHealthIssue('hipertensao')}
                />
                <Label htmlFor="hipertensao" className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" /> Hipertensão
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="escoliose" 
                  checked={healthIssues.includes('escoliose')}
                  onCheckedChange={() => toggleHealthIssue('escoliose')}
                />
                <Label htmlFor="escoliose">Escoliose</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="artrite" 
                  checked={healthIssues.includes('artrite')}
                  onCheckedChange={() => toggleHealthIssue('artrite')}
                />
                <Label htmlFor="artrite">Artrite/Artrose</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="cardiaco" 
                  checked={healthIssues.includes('cardiaco')}
                  onCheckedChange={() => toggleHealthIssue('cardiaco')}
                />
                <Label htmlFor="cardiaco">Problemas Cardíacos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="respiratorio" 
                  checked={healthIssues.includes('respiratorio')}
                  onCheckedChange={() => toggleHealthIssue('respiratorio')}
                />
                <Label htmlFor="respiratorio">Problemas Respiratórios</Label>
              </div>
            </div>
          </div>
          
          {/* Informações adicionais */}
          <div className="space-y-2">
            <Label htmlFor="additional-info">Informações Adicionais</Label>
            <Textarea
              id="additional-info"
              placeholder="Outras condições de saúde, lesões, objetivos específicos..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
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
