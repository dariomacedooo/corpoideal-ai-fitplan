
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Clock, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NextMeal() {
  const navigate = useNavigate();
  
  // Mock data
  const nextMeal = {
    name: "Almoço",
    time: "12:30",
    foods: ["Frango grelhado", "Arroz integral", "Brócolis"],
    calories: 450,
    protein: "35g",
    timeLeft: "2h 15min"
  };

  return (
    <Card className="hover:shadow-modern transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-corpoideal-purple text-lg">
          <Apple className="h-5 w-5 mr-2" />
          Próxima Refeição
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-corpoideal-dark">{nextMeal.name}</h3>
            <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">
              {nextMeal.calories} kcal
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {nextMeal.time}
            </div>
            <div className="flex items-center">
              <ChefHat className="h-4 w-4 mr-1" />
              em {nextMeal.timeLeft}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-2">Menu:</p>
            <ul className="space-y-1">
              {nextMeal.foods.map((food, index) => (
                <li key={index} className="text-sm text-corpoideal-dark flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {food}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">Proteína: {nextMeal.protein}</p>
          </div>
          
          <Button 
            onClick={() => navigate('/nutrition')}
            variant="outline"
            className="w-full border-corpoideal-purple text-corpoideal-purple hover:bg-corpoideal-purple hover:text-white"
          >
            Ver Plano Nutricional
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
