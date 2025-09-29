import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function NextWorkout() {
  const navigate = useNavigate();

  // Mock data - em uma aplicação real isso viria de um banco de dados
  const nextWorkout = {
    name: "Treino de Pernas",
    time: "19:00",
    date: "Hoje",
    exercises: ["Agachamento", "Leg Press", "Stiff"],
    duration: "45 min",
    difficulty: "Intermediário"
  };
  return <Card className="hover:shadow-modern transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-corpoideal-purple text-lg text-slate-50">
          <Dumbbell className="h-5 w-5 mr-2" />
          Próximo Treino
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-corpoideal-dark text-slate-50">{nextWorkout.name}</h3>
            <span className="text-sm px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
              {nextWorkout.difficulty}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {nextWorkout.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {nextWorkout.time}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-2">Exercícios principais:</p>
            <div className="flex flex-wrap gap-1">
              {nextWorkout.exercises.map((exercise, index) => <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {exercise}
                </span>)}
            </div>
          </div>
          
          <Button onClick={() => navigate('/training')} className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple">
            Iniciar Treino
          </Button>
        </div>
      </CardContent>
    </Card>;
}