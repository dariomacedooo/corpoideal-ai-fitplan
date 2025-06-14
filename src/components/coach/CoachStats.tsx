
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dumbbell, Apple, TrendingUp } from "lucide-react";

interface CoachStatsProps {
  totalStudents: number;
  totalWorkoutPlans: number;
  totalDietPlans: number;
  activeStudents: number;
}

export function CoachStats({ totalStudents, totalWorkoutPlans, totalDietPlans, activeStudents }: CoachStatsProps) {
  const stats = [
    {
      title: "Total de Alunos",
      value: totalStudents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Planos de Treino",
      value: totalWorkoutPlans,
      icon: Dumbbell,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Planos de Dieta",
      value: totalDietPlans,
      icon: Apple,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Alunos Ativos",
      value: activeStudents,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-corpoideal-purple">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
