
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Award, Flame } from "lucide-react";

export function WeeklyProgress() {
  // Mock data
  const weeklyStats = {
    workoutsCompleted: 3,
    workoutsPlanned: 4,
    nutritionCompliance: 85,
    weightProgress: 0.5, // kg perdidos/ganhos na semana
    streak: 5 // dias consecutivos
  };

  const workoutProgress = (weeklyStats.workoutsCompleted / weeklyStats.workoutsPlanned) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-corpoideal-purple text-lg">
          <TrendingUp className="h-5 w-5 mr-2" />
          Progresso Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Treinos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium">Treinos</span>
              </div>
              <span className="text-sm text-gray-600">
                {weeklyStats.workoutsCompleted}/{weeklyStats.workoutsPlanned}
              </span>
            </div>
            <Progress value={workoutProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{workoutProgress.toFixed(0)}% da meta semanal</p>
          </div>

          {/* Nutrição */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">Nutrição</span>
              </div>
              <span className="text-sm text-gray-600">{weeklyStats.nutritionCompliance}%</span>
            </div>
            <Progress value={weeklyStats.nutritionCompliance} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">Aderência ao plano alimentar</p>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Flame className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-orange-700">{weeklyStats.streak}</div>
              <div className="text-xs text-orange-600">dias seguidos</div>
            </div>
            
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-purple-700">
                {weeklyStats.weightProgress > 0 ? '+' : ''}{weeklyStats.weightProgress}kg
              </div>
              <div className="text-xs text-purple-600">esta semana</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
