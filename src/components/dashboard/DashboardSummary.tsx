
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Dumbbell, Apple, TrendingUp, Award } from "lucide-react";

interface DashboardSummaryProps {
  userName?: string;
}

export function DashboardSummary({ userName }: DashboardSummaryProps) {
  // Mock data for the progress chart
  const progressData = [
    { name: 'Seg', valor: 65 },
    { name: 'Ter', valor: 70 },
    { name: 'Qua', valor: 68 },
    { name: 'Qui', valor: 72 },
    { name: 'Sex', valor: 75 },
    { name: 'Sab', valor: 78 },
    { name: 'Dom', valor: 80 }
  ];

  // Mock data for achievement stats
  const achievements = [
    { name: "Treinos completados", value: "8/20", progress: 40 },
    { name: "Dias seguidos", value: "5", progress: 50 },
    { name: "Refeições registradas", value: "21/30", progress: 70 },
  ];

  // Mock next workout and meal
  const nextWorkout = { name: "Treino de Pernas", time: "Hoje, 19:00" };
  const nextMeal = { name: "Jantar", time: "Hoje, 20:30" };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
        <img 
          src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1740&auto=format&fit=crop"
          alt="Motivação fitness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-corpoideal-darkpurple/80 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            Olá, {userName || 'Atleta'}!
          </h1>
          <p className="text-white/90">Continue firme na sua jornada fitness</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-corpoideal-purple flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Seu progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="valor" 
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-corpoideal-purple flex items-center">
              <Dumbbell className="h-5 w-5 mr-2" />
              Próximo treino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium">{nextWorkout.name}</h3>
            <p className="text-sm text-gray-500">{nextWorkout.time}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-corpoideal-purple flex items-center">
              <Apple className="h-5 w-5 mr-2" />
              Próxima refeição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium">{nextMeal.name}</h3>
            <p className="text-sm text-gray-500">{nextMeal.time}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-corpoideal-purple flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{achievement.name}</span>
                  <span className="text-sm text-gray-500">{achievement.value}</span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
