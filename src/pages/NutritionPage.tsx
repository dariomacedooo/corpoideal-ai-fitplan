
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NutritionPlan } from "@/components/nutrition/NutritionPlan";
import { WaterIntakeCalculator } from "@/components/nutrition/WaterIntakeCalculator";
import { useState, useEffect } from "react";

const NutritionPage = () => {
  const [userWeight, setUserWeight] = useState<number>(70);
  
  // Get user weight from profile
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (profile.weight) {
        setUserWeight(parseInt(profile.weight));
      }
    }
  }, []);

  // Mock nutrition data
  // In a real app, this would come from a backend based on user analysis and goals
  const days = [
    {
      day: "Segunda",
      meals: [
        {
          time: "07:30",
          title: "Café da manhã",
          items: [
            {
              name: "Omelete de claras",
              portion: "4 claras",
              calories: 120,
              protein: 24,
              carbs: 2,
              fat: 0
            },
            {
              name: "Torrada integral",
              portion: "2 fatias",
              calories: 140,
              protein: 6,
              carbs: 28,
              fat: 2
            }
          ]
        },
        {
          time: "10:30",
          title: "Lanche da manhã",
          items: [
            {
              name: "Iogurte grego",
              portion: "1 pote (170g)",
              calories: 100,
              protein: 18,
              carbs: 6,
              fat: 0
            },
            {
              name: "Banana",
              portion: "1 unidade média",
              calories: 105,
              protein: 1.3,
              carbs: 27,
              fat: 0.3
            }
          ]
        }
      ],
      totalCalories: 1800,
      totalProtein: 150,
      totalCarbs: 180, 
      totalFat: 40
    },
    {
      day: "Terça",
      meals: [
        {
          time: "07:30",
          title: "Café da manhã",
          items: [
            {
              name: "Shake proteico",
              portion: "1 scoop",
              calories: 120,
              protein: 24,
              carbs: 3,
              fat: 1.5
            },
            {
              name: "Aveia",
              portion: "40g",
              calories: 150,
              protein: 5,
              carbs: 27,
              fat: 3
            }
          ]
        }
      ],
      totalCalories: 1850,
      totalProtein: 160,
      totalCarbs: 170, 
      totalFat: 45
    }
  ];

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Seu Plano Nutricional</h1>
        <p className="text-gray-600 mb-6">
          Alimentação balanceada para alcançar seus objetivos de forma saudável.
        </p>
        
        <div className="space-y-6">
          <NutritionPlan 
            goal="ganhar-musculos" 
            days={days} 
            userName="Usuario"
            weight={userWeight}
            height={175}
            sex="masculino"
            age={30}
            activityLevel="moderado"
          />
          
          <WaterIntakeCalculator 
            weight={userWeight}
            activityLevel="moderate"
          />
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default NutritionPage;
