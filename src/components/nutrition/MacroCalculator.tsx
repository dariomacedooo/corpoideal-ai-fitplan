
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Calculator, Info } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { 
  calculateBMR, 
  calculateTotalDailyEnergyExpenditure, 
  calculateEvidenceBasedNutrition,
  calculateMealNutrition,
  EVIDENCE_BASED_MACROS,
  MEAL_DISTRIBUTION
} from "@/utils/nutritionCalculator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MacroCalculator() {
  const { profile } = useUserProfile();
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("masculino");
  const [activityLevel, setActivityLevel] = useState<string>("moderado");
  const [goal, setGoal] = useState<string>("manter-peso");
  const [useEvidenceBased, setUseEvidenceBased] = useState<boolean>(true);
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(40);
  const [fat, setFat] = useState<number>(30);
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);
  const [calculatedMacros, setCalculatedMacros] = useState<any>(null);
  const [mealBreakdown, setMealBreakdown] = useState<any>(null);
  
  // Load user profile data
  useEffect(() => {
    if (profile) {
      setWeight(profile.weight || "70");
      setHeight(profile.height || "170");
      setAge(profile.age || "30");
      setGender(profile.sex || "masculino");
      setGoal(profile.goal || "manter-peso");
      
      // Set activity level based on lifestyle
      if (profile.lifestyle === 'sedentario') setActivityLevel('sedentario');
      else if (profile.lifestyle === 'leve') setActivityLevel('leve');
      else if (profile.lifestyle === 'moderado') setActivityLevel('moderado');
      else if (profile.lifestyle === 'ativo') setActivityLevel('ativo');
      
      // Use evidence-based macros by default
      if (useEvidenceBased) {
        const prescription = EVIDENCE_BASED_MACROS[profile.goal || 'manter-peso'];
        if (prescription) {
          const weightNum = parseFloat(profile.weight || "70");
          const totalProtein = weightNum * prescription.proteinPerKg;
          const totalCarbs = weightNum * prescription.carbsPerKg;
          const totalFat = weightNum * prescription.fatPerKg;
          const totalMacroCalories = (totalProtein * 4) + (totalCarbs * 4) + (totalFat * 9);
          
          setProtein(Math.round((totalProtein * 4 / totalMacroCalories) * 100));
          setCarbs(Math.round((totalCarbs * 4 / totalMacroCalories) * 100));
          setFat(Math.round((totalFat * 9 / totalMacroCalories) * 100));
        }
      }
    }
  }, [profile, useEvidenceBased]);
  
  // Ensure macro percentages always add up to 100%
  const adjustMacros = (newValue: number, macroType: 'protein' | 'carbs' | 'fat') => {
    if (useEvidenceBased) return; // Don't allow manual adjustment in evidence-based mode
    
    const remaining = 100 - newValue;
    
    if (macroType === 'protein') {
      setProtein(newValue);
      const ratio = carbs / (carbs + fat);
      const newCarbs = Math.round(remaining * ratio);
      setCarbs(newCarbs);
      setFat(100 - newValue - newCarbs);
    } else if (macroType === 'carbs') {
      setCarbs(newValue);
      const ratio = protein / (protein + fat);
      const newProtein = Math.round(remaining * ratio);
      setProtein(newProtein);
      setFat(100 - newValue - newProtein);
    } else {
      setFat(newValue);
      const ratio = protein / (protein + carbs);
      const newProtein = Math.round(remaining * ratio);
      setProtein(newProtein);
      setCarbs(100 - newValue - newProtein);
    }
  };
  
  const calculateCalories = () => {
    // Parse input values
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);
    
    // Calculate BMR
    const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
    
    // Calculate TDEE
    const tdee = calculateTotalDailyEnergyExpenditure(bmr, activityLevel);
    
    let finalCalories: number;
    let proteinGrams: number;
    let carbsGrams: number;
    let fatGrams: number;
    
    if (useEvidenceBased) {
      // Use evidence-based nutrition prescription
      const nutrition = calculateEvidenceBasedNutrition(weightNum, tdee, goal);
      finalCalories = nutrition.calories;
      proteinGrams = nutrition.protein;
      carbsGrams = nutrition.carbs;
      fatGrams = nutrition.fat;
    } else {
      // Use custom macro percentages
      finalCalories = Math.round(tdee);
      proteinGrams = Math.round((finalCalories * (protein / 100)) / 4);
      carbsGrams = Math.round((finalCalories * (carbs / 100)) / 4);
      fatGrams = Math.round((finalCalories * (fat / 100)) / 9);
    }
    
    setCalculatedCalories(finalCalories);
    
    // Calculate meal breakdown
    const mealBreakdownData = Object.keys(MEAL_DISTRIBUTION).map(mealType => {
      const mealNutrition = calculateMealNutrition(finalCalories, proteinGrams, mealType as keyof typeof MEAL_DISTRIBUTION);
      return {
        meal: mealType,
        name: getMealName(mealType),
        calories: mealNutrition.calories,
        protein: mealNutrition.protein
      };
    });
    
    setMealBreakdown(mealBreakdownData);
    
    setCalculatedMacros({
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
      total: finalCalories,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      evidenceBased: useEvidenceBased
    });
  };
  
  const getMealName = (mealType: string) => {
    const names: Record<string, string> = {
      'cafe': 'Café da Manhã',
      'lanche-manha': 'Lanche Manhã',
      'almoco': 'Almoço',
      'lanche-tarde': 'Lanche Tarde',
      'jantar': 'Jantar'
    };
    return names[mealType] || mealType;
  };
  
  // Prepare data for pie chart
  const chartData = [
    { name: "Proteínas", value: protein, color: "#8B5CF6" },
    { name: "Carboidratos", value: carbs, color: "#22C55E" },
    { name: "Gorduras", value: fat, color: "#EF4444" }
  ];
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Calculadora de Macronutrientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {useEvidenceBased && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <Info className="h-4 w-4" />
            <AlertTitle>Prescrição Baseada em Evidências</AlertTitle>
            <AlertDescription>
              Usando recomendações científicas: Bulking (2.0g/kg proteína), Cutting (2.4g/kg proteína), Manutenção (2.2g/kg proteína)
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
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
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Sexo</Label>
                <Select value={gender} onValueChange={setGender}>
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
              <Select value={activityLevel} onValueChange={setActivityLevel}>
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
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perder-peso">Perder Peso (Cutting)</SelectItem>
                  <SelectItem value="manter-peso">Manter Peso</SelectItem>
                  <SelectItem value="ganhar-massa">Ganhar Massa (Bulking)</SelectItem>
                  <SelectItem value="ganhar-peso">Ganhar Peso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="evidenceBased" 
                checked={useEvidenceBased}
                onChange={(e) => setUseEvidenceBased(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="evidenceBased" className="text-sm">
                Usar prescrição baseada em evidências científicas
              </Label>
            </div>
            
            {!useEvidenceBased && (
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
                    onValueChange={(value) => adjustMacros(value[0], 'protein')}
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
                    onValueChange={(value) => adjustMacros(value[0], 'carbs')}
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
                    onValueChange={(value) => adjustMacros(value[0], 'fat')}
                  />
                </div>
              </div>
            )}
            
            <Button 
              className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
              onClick={calculateCalories}
            >
              Calcular
            </Button>
          </div>
          
          <div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {calculatedMacros && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-corpoideal-purple">Resultado:</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xl font-semibold">{calculatedMacros.total} kcal</p>
                    <p className="text-sm text-gray-500">Calorias diárias</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border">
                      <p className="font-medium">TMB: {calculatedMacros.bmr} kcal</p>
                      <p className="text-gray-500">Taxa metabólica basal</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <p className="font-medium">TDEE: {calculatedMacros.tdee} kcal</p>
                      <p className="text-gray-500">Gasto total diário</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded border">
                      <p className="text-lg font-medium">{calculatedMacros.protein}g</p>
                      <p className="text-xs text-gray-500">Proteínas</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <p className="text-lg font-medium">{calculatedMacros.carbs}g</p>
                      <p className="text-xs text-gray-500">Carboidratos</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <p className="text-lg font-medium">{calculatedMacros.fat}g</p>
                      <p className="text-xs text-gray-500">Gorduras</p>
                    </div>
                  </div>
                  
                  {calculatedMacros.evidenceBased && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      Baseado em evidências científicas: {parseFloat(weight) * EVIDENCE_BASED_MACROS[goal]?.proteinPerKg || 2.2}g/kg proteína
                    </div>
                  )}
                </div>
                
                {mealBreakdown && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-sm text-corpoideal-purple mb-2">Distribuição por Refeições:</h4>
                    <div className="space-y-2">
                      {mealBreakdown.map((meal: any, index: number) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded border">
                          <span>{meal.name}</span>
                          <div className="text-right">
                            <div className="font-medium">{meal.calories} kcal</div>
                            <div className="text-xs text-gray-500">{meal.protein}g proteína</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
