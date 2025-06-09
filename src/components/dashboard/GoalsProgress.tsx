
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Calendar, Flame } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function GoalsProgress() {
  const { profile, getGoalText } = useUserProfile();

  // Mock data para demonstração
  const goals = [
    {
      id: 1,
      title: "Meta de Peso",
      current: 75,
      target: 70,
      unit: "kg",
      progress: 67,
      icon: Target,
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Treinos na Semana",
      current: 3,
      target: 4,
      unit: "treinos",
      progress: 75,
      icon: Trophy,
      color: "text-green-600"
    },
    {
      id: 3,
      title: "Sequência de Dias",
      current: 5,
      target: 7,
      unit: "dias",
      progress: 71,
      icon: Flame,
      color: "text-orange-600"
    }
  ];

  const weeklyStats = {
    trainingDays: 3,
    totalDuration: 180, // minutos
    caloriesBurned: 850,
    nextWorkout: "Treino de Pernas - Hoje, 19:00"
  };

  return (
    <div className="space-y-6">
      {/* Objetivo Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-corpoideal-purple">
            <Target className="h-5 w-5 mr-2" />
            Seu Objetivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-soft to-purple-light border border-purple-border">
            <h3 className="font-semibold text-corpoideal-dark mb-2">
              {getGoalText()}
            </h3>
            <p className="text-sm text-gray-600">
              Mantenha o foco e seja consistente. Cada dia é uma oportunidade de se aproximar do seu objetivo!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Metas e Progresso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-corpoideal-purple">
            <Trophy className="h-5 w-5 mr-2" />
            Metas da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${goal.color}`} />
                      <span className="text-sm font-medium">{goal.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas da Semana */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-corpoideal-purple">
            <Calendar className="h-5 w-5 mr-2" />
            Esta Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {weeklyStats.trainingDays}
              </div>
              <div className="text-xs text-gray-500">Treinos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {weeklyStats.totalDuration}
              </div>
              <div className="text-xs text-gray-500">Minutos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {weeklyStats.caloriesBurned}
              </div>
              <div className="text-xs text-gray-500">Kcal</div>
            </div>
          </div>
          
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Próximo Treino:</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">{weeklyStats.nextWorkout}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
