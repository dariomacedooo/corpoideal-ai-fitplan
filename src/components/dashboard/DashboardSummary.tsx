
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Dumbbell, Apple, TrendingUp, Award, Clock } from "lucide-react";

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

  // Mock data for quick stats
  const quickStats = [
    {
      title: "Próximo Treino",
      value: "Pernas",
      subtitle: "Hoje, 19:00",
      icon: Dumbbell,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Última Refeição",
      value: "Registrada",
      subtitle: "Há 2 horas",
      icon: Apple,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Tempo de Treino",
      value: "45 min",
      subtitle: "Média semanal",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  // Mock data for achievement stats
  const achievements = [
    { name: "Treinos completados", value: "8/20", progress: 40 },
    { name: "Refeições registradas", value: "21/30", progress: 70 },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-modern transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-corpoideal-dark text-sm">
                      {stat.title}
                    </h3>
                    <p className="text-lg font-semibold text-corpoideal-purple">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-corpoideal-purple flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Progresso dos Últimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#8B5CF6' }}
                  activeDot={{ r: 6, fill: '#7D3CFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-corpoideal-purple flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Progresso das Metas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-corpoideal-dark">
                    {achievement.name}
                  </span>
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
