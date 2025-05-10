
import { useState } from "react";
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
import { Calculator } from "lucide-react";

export function MacroCalculator() {
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("masculino");
  const [activityLevel, setActivityLevel] = useState<string>("moderado");
  const [goal, setGoal] = useState<string>("manter");
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(40);
  const [fat, setFat] = useState<number>(30);
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);
  const [calculatedMacros, setCalculatedMacros] = useState<any>(null);
  
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
  
  const calculateCalories = () => {
    // Parse input values
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);
    
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "masculino") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    // Apply activity multiplier
    let tdee;
    switch (activityLevel) {
      case "sedentario":
        tdee = bmr * 1.2;
        break;
      case "leve":
        tdee = bmr * 1.375;
        break;
      case "moderado":
        tdee = bmr * 1.55;
        break;
      case "ativo":
        tdee = bmr * 1.725;
        break;
      case "muito-ativo":
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.55;
    }
    
    // Adjust for goal
    let calories;
    switch (goal) {
      case "perder":
        calories = tdee * 0.85; // 15% deficit
        break;
      case "manter":
        calories = tdee;
        break;
      case "ganhar":
        calories = tdee * 1.15; // 15% surplus
        break;
      default:
        calories = tdee;
    }
    
    const totalCalories = Math.round(calories);
    setCalculatedCalories(totalCalories);
    
    // Calculate macronutrients in grams
    const proteinGrams = Math.round((totalCalories * (protein / 100)) / 4);
    const carbsGrams = Math.round((totalCalories * (carbs / 100)) / 4);
    const fatGrams = Math.round((totalCalories * (fat / 100)) / 9);
    
    setCalculatedMacros({
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
      total: totalCalories
    });
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
                  <SelectItem value="sedentario">Sedentário</SelectItem>
                  <SelectItem value="leve">Levemente Ativo</SelectItem>
                  <SelectItem value="moderado">Moderadamente Ativo</SelectItem>
                  <SelectItem value="ativo">Muito Ativo</SelectItem>
                  <SelectItem value="muito-ativo">Extremamente Ativo</SelectItem>
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
                  <SelectItem value="perder">Perder Peso</SelectItem>
                  <SelectItem value="manter">Manter Peso</SelectItem>
                  <SelectItem value="ganhar">Ganhar Massa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-corpoideal-purple mb-2">Resultado:</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xl font-semibold">{calculatedMacros.total} kcal</p>
                    <p className="text-sm text-gray-500">Calorias diárias</p>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
