
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Target } from "lucide-react";
import { useWorkoutLoads } from "@/hooks/useWorkoutLoads";

export function LoadProgress() {
  const { loads, getLoadRecommendation } = useWorkoutLoads();

  const exerciseList = Object.values(loads);

  if (exerciseList.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma carga registrada
          </h3>
          <p className="text-gray-500">
            Comece registrando suas cargas nos exercícios para acompanhar seu progresso.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-corpoideal-purple mb-4">
        Progresso de Cargas
      </h2>
      
      {exerciseList.map((exercise) => {
        const recommendation = getLoadRecommendation(exercise.exerciseName);
        const progressPercentage = exercise.progressHistory.length > 1 
          ? ((exercise.currentLoad - exercise.progressHistory[0].load) / exercise.progressHistory[0].load) * 100
          : 0;

        return (
          <Card key={exercise.exerciseName}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{exercise.exerciseName}</CardTitle>
                <Badge variant={recommendation?.shouldIncrease ? "default" : "secondary"}>
                  {exercise.currentLoad}kg
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {progressPercentage > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso total</span>
                      <span className="text-green-600">+{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
                  </div>
                )}

                {recommendation && (
                  <div className={`p-3 rounded-lg ${
                    recommendation.shouldIncrease 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {recommendation.shouldIncrease ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                        ) : (
                          <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                        )}
                        <span className={`text-sm ${
                          recommendation.shouldIncrease ? 'text-green-700' : 'text-blue-700'
                        }`}>
                          {recommendation.message}
                        </span>
                      </div>
                      {recommendation.shouldIncrease && (
                        <Badge variant="outline" className="bg-white">
                          {recommendation.suggestedLoad}kg
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Última atualização: {exercise.lastUpdated.toLocaleDateString('pt-BR')}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
