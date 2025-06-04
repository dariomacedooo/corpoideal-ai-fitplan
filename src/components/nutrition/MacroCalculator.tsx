
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
import { Calculator, TrendingUp, Zap } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { calculateBMR, calculateTDEE, adjustCaloriesForGoal, calculateMacros, distributeMeals } from "@/utils/nutritionCalculator";
import { classifyBiotipo } from "@/utils/bodyAnalysis";

export function MacroCalculator() {
  const { profile } = useUserProfile();
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("masculino");
  const [activityLevel, setActivityLevel] = useState<string>("moderado");
  const [goal, setGoal] = useState<string>("manter");
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(40);
  const [fat, setFat] = useState<number>(30);
  const [calculatedData, setCalculatedData] = useState<any>(null);
  
  // Load user profile data
  useEffect(() => {
    if (profile) {
      setWeight(profile.weight || "70");
      setHeight(profile.height || "170");
      setAge(profile.age || "30");
      setGender(profile.sex || "masculino");
      setGoal(profile.goal || "manter");
      
      // Set activity level based on lifestyle
      if (profile.lifestyle === 'sedentario') setActivityLevel('sedentario');
      else if (profile.lifestyle === 'leve') setActivityLevel('leve');
      else if (profile.lifestyle === 'moderado') setActivityLevel('moderado');
      else if (profile.lifestyle === 'ativo') setActivityLevel('ativo');
      
      // Adjust macros based on goal
      if (profile.goal === 'ganhar-massa' || profile.goal === 'ganhar-peso') {
        setProtein(35);
        setCarbs(45);
        setFat(20);
      } else if (profile.goal === 'perder-peso') {
        setProtein(40);
        setCarbs(30);
        setFat(30);
      }
    }
  }, [profile]);
  
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
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);
    const waistNum = parseFloat(profile?.waist || "80");
    
    // Calculate BMR using Mifflin-St Jeor equation
    const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
    
    // Calculate TDEE
    const tdee = calculateTDEE(bmr, activityLevel);
    
    // Adjust for goal
    const finalCalories = adjustCaloriesForGoal(tdee, goal);
    
    // Classify biotipo for macro distribution
    const biotipo = classifyBiotipo(waistNum, heightNum, parseFloat(profile?.bodyFat || "0"));
    
    // Calculate scientific macro distribution
    const macros = calculateMacros(
      finalCalories, 
      weightNum, 
      goal, 
      biotipo,
      profile?.trainingExperience || 'iniciante'
    );
    
    // Calculate meal distribution
    const mealPlan = distributeMeals(finalCalories, macros.proteinG);
    
    setCalculatedData({
      calories: Math.round(finalCalories),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      macros,
      biotipo,
      mealPlan
    });
  };
  
  // Prepare data for pie chart
  const chartData = calculatedData ? [
    { name: "Proteínas", value: calculatedData.macros.protein, color: "#8B5CF6" },
    { name: "Carboidratos", value: calculatedData.macros.carbs, color: "#22C55E" },
    { name: "Gorduras", value: calculatedData.macros.fat, color: "#EF4444" }
  ] : [];
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Calculadora Científica de Macronutrientes
        </CardTitle>
        <p className="text-sm text-gray-600">
          Baseada em WHO/FAO/UNU, Mifflin-St Jeor e recomendações de Brad Schoenfeld
        </p>
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
                  <SelectItem value="perder-peso">Perder Peso</SelectItem>
                  <SelectItem value="manter-peso">Manter Peso</SelectItem>
                  <SelectItem value="ganhar-massa">Ganhar Massa</SelectItem>
                  <SelectItem value="ganhar-peso">Ganhar Peso</SelectItem>
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
              <Zap className="h-4 w-4 mr-2" />
              Calcular com Base Científica
            </Button>
          </div>
          
          <div>
            {chartData.length > 0 && (
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
            )}
            
            {calculatedData && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-corpoideal-purple/10 to-blue-50 p-4 rounded-lg border border-corpoideal-purple/20">
                  <h3 className="font-medium text-corpoideal-purple mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Resultado Científico:
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold">{calculatedData.calories} kcal</p>
                      <p className="text-sm text-gray-500">Calorias diárias • Biotipo: {calculatedData.biotipo}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded border">
                        <p className="font-medium">TMB: {calculatedData.bmr} kcal</p>
                        <p className="text-gray-500">Mifflin-St Jeor</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="font-medium">GCD: {calculatedData.tdee} kcal</p>
                        <p className="text-gray-500">WHO/FAO/UNU</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white p-2 rounded border">
                        <p className="text-lg font-bold">{calculatedData.macros.proteinG}g</p>
                        <p className="text-xs text-gray-500">Proteínas ({calculatedData.macros.protein}%)</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="text-lg font-bold">{calculatedData.macros.carbsG}g</p>
                        <p className="text-xs text-gray-500">Carboidratos ({calculatedData.macros.carbs}%)</p>
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <p className="text-lg font-bold">{calculatedData.macros.fatG}g</p>
                        <p className="text-xs text-gray-500">Gorduras ({calculatedData.macros.fat}%)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meal Distribution */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-bold text-blue-700 mb-2">📋 Distribuição das Refeições:</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white p-2 rounded">
                      <p className="font-medium">{calculatedData.mealPlan.mealsCount} refeições</p>
                      <p className="text-gray-500">Otimizada</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="font-medium">{calculatedData.mealPlan.caloriesPerMeal} kcal</p>
                      <p className="text-gray-500">Por refeição</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="font-medium">{calculatedData.mealPlan.proteinPerMeal}g</p>
                      <p className="text-gray-500">Proteína/refeição</p>
                    </div>
                  </div>
                </div>

                {/* Scientific References */}
                <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
                  <strong>📚 Embasamento Científico:</strong><br/>
                  • TMB: Mifflin-St Jeor (Journal of the American Dietetic Association, 1990)<br/>
                  • Proteína: {goal === 'ganhar-massa' ? '2.0-2.2g/kg' : goal === 'perder-peso' ? '2.2-2.5g/kg' : '2.0g/kg'} (Brad Schoenfeld, 2018)<br/>
                  • Distribuição: ≥0.4g/kg por refeição (Moore et al., 2009)<br/>
                  • Fatores atividade: WHO/FAO/UNU Expert Consultation
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
