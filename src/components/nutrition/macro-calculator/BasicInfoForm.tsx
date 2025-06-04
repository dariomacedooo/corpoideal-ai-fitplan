
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoFormProps {
  weight: string;
  height: string;
  age: string;
  gender: string;
  activityLevel: string;
  goal: string;
  onWeightChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onActivityLevelChange: (value: string) => void;
  onGoalChange: (value: string) => void;
}

export function BasicInfoForm({
  weight,
  height,
  age,
  gender,
  activityLevel,
  goal,
  onWeightChange,
  onHeightChange,
  onAgeChange,
  onGenderChange,
  onActivityLevelChange,
  onGoalChange
}: BasicInfoFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            value={weight} 
            onChange={(e) => onWeightChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm)</Label>
          <Input 
            id="height" 
            type="number" 
            value={height} 
            onChange={(e) => onHeightChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Idade</Label>
          <Input 
            id="age" 
            type="number" 
            value={age} 
            onChange={(e) => onAgeChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Sexo</Label>
          <Select value={gender} onValueChange={onGenderChange}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="activity">Nível de Atividade</Label>
        <Select value={activityLevel} onValueChange={onActivityLevelChange}>
          <SelectTrigger id="activity">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentario">Sedentário (pouco ou nenhum exercício)</SelectItem>
            <SelectItem value="leve">Levemente Ativo (1-3 dias/semana)</SelectItem>
            <SelectItem value="moderado">Moderadamente Ativo (3-5 dias/semana)</SelectItem>
            <SelectItem value="ativo">Muito Ativo (6-7 dias/semana)</SelectItem>
            <SelectItem value="muito-ativo">Extremamente Ativo (2x/dia)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="goal">Objetivo</Label>
        <Select value={goal} onValueChange={onGoalChange}>
          <SelectTrigger id="goal">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="perder-peso">Perder Peso</SelectItem>
            <SelectItem value="manter-peso">Manter Peso</SelectItem>
            <SelectItem value="ganhar-massa">Ganhar Massa</SelectItem>
            <SelectItem value="ganhar-peso">Ganhar Peso</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
