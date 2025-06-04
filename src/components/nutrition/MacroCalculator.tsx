
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { calculateBMR, calculateTDEE, adjustCaloriesForGoal, calculateMacros, distributeMeals } from "@/utils/nutritionCalculator";
import { classifyBiotipo } from "@/utils/bodyAnalysis";
import { BasicInfoForm } from "./macro-calculator/BasicInfoForm";
import { MacroSliders } from "./macro-calculator/MacroSliders";
import { ResultsDisplay } from "./macro-calculator/ResultsDisplay";
import { useMacroAdjustment } from "./macro-calculator/useMacroAdjustment";

export function MacroCalculator() {
  const { profile } = useUserProfile();
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("masculino");
  const [activityLevel, setActivityLevel] = useState<string>("moderado");
  const [goal, setGoal] = useState<string>("manter");
  const [calculatedData, setCalculatedData] = useState<any>(null);
  
  const {
    protein,
    carbs,
    fat,
    setProtein,
    setCarbs,
    setFat,
    adjustMacros
  } = useMacroAdjustment();
  
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
  }, [profile, setProtein, setCarbs, setFat]);
  
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
      mealPlan,
      goal
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
            <BasicInfoForm
              weight={weight}
              height={height}
              age={age}
              gender={gender}
              activityLevel={activityLevel}
              goal={goal}
              onWeightChange={setWeight}
              onHeightChange={setHeight}
              onAgeChange={setAge}
              onGenderChange={setGender}
              onActivityLevelChange={setActivityLevel}
              onGoalChange={setGoal}
            />
            
            <MacroSliders
              protein={protein}
              carbs={carbs}
              fat={fat}
              onProteinChange={(value) => adjustMacros(value, 'protein')}
              onCarbsChange={(value) => adjustMacros(value, 'carbs')}
              onFatChange={(value) => adjustMacros(value, 'fat')}
            />
            
            <Button 
              className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
              onClick={calculateCalories}
            >
              <Zap className="h-4 w-4 mr-2" />
              Calcular com Base Científica
            </Button>
          </div>
          
          <ResultsDisplay 
            calculatedData={calculatedData}
            chartData={chartData}
          />
        </div>
      </CardContent>
    </Card>
  );
}
