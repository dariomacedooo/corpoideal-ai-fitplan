
import { useState } from "react";

export function useMacroAdjustment() {
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(40);
  const [fat, setFat] = useState<number>(30);

  // Ensure macro percentages always add up to 100%
  const adjustMacros = (newValue: number, macroType: 'protein' | 'carbs' | 'fat') => {
    const remaining = 100 - newValue;
    
    if (macroType === 'protein') {
      setProtein(newValue);
      // Distribute remaining proportionally between carbs and fat
      const ratio = carbs / (carbs + fat);
      const newCarbs = Math.round(remaining * ratio);
      setCarbs(newCarbs);
      setFat(100 - newValue - newCarbs);
    } else if (macroType === 'carbs') {
      setCarbs(newValue);
      // Distribute remaining proportionally between protein and fat
      const ratio = protein / (protein + fat);
      const newProtein = Math.round(remaining * ratio);
      setProtein(newProtein);
      setFat(100 - newValue - newProtein);
    } else {
      setFat(newValue);
      // Distribute remaining proportionally between protein and carbs
      const ratio = protein / (protein + carbs);
      const newProtein = Math.round(remaining * ratio);
      setProtein(newProtein);
      setCarbs(100 - newValue - newProtein);
    }
  };

  return {
    protein,
    carbs,
    fat,
    setProtein,
    setCarbs,
    setFat,
    adjustMacros
  };
}
