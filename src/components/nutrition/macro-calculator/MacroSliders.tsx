
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MacroSlidersProps {
  protein: number;
  carbs: number;
  fat: number;
  onProteinChange: (value: number) => void;
  onCarbsChange: (value: number) => void;
  onFatChange: (value: number) => void;
}

export function MacroSliders({
  protein,
  carbs,
  fat,
  onProteinChange,
  onCarbsChange,
  onFatChange
}: MacroSlidersProps) {
  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Proteínas: {protein}%</Label>
        </div>
        <Slider 
          value={[protein]} 
          min={10} 
          max={60} 
          step={5}
          onValueChange={(value) => onProteinChange(value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Carboidratos: {carbs}%</Label>
        </div>
        <Slider 
          value={[carbs]} 
          min={10} 
          max={70} 
          step={5}
          onValueChange={(value) => onCarbsChange(value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Gorduras: {fat}%</Label>
        </div>
        <Slider 
          value={[fat]} 
          min={10} 
          max={60} 
          step={5}
          onValueChange={(value) => onFatChange(value[0])}
        />
      </div>
    </div>
  );
}
