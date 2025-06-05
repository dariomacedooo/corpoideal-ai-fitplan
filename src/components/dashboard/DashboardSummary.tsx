import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Dumbbell, Apple, TrendingUp, Award, Zap, Target, Clock, Flame } from "lucide-react";

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
    { name: "Treinos completados", value: "8/20", progress: 40, icon: Dumbbell },
    { name: "Dias seguidos", value: "5", progress: 50, icon: Flame },
    { name: "Refeições registradas", value: "21/30", progress: 70, icon: Apple },
  ];

  // Mock next workout and meal
  const nextWorkout = { name: "Treino de Pernas", time: "Hoje, 19:00" };
  const nextMeal = { name: "Jantar", time: "Hoje, 20:30" };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-velocity-lime/20 via-velocity-electric/10 to-velocity-neon/20"></div>
        <div className="absolute inset-0 bg-velocity-charcoal/90"></div>
        <div className="relative p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="h-8 w-8 text-velocity-lime animate-glow-pulse" />
            <h1 className="text-4xl font-display font-black text-velocity-lime neon-text">
              Bem-vindo, {userName}!
            </h1>
            <Zap className="h-8 w-8 text-velocity-lime animate-glow-pulse" />
          </div>
          <p className="text-velocity-lime/80 text-lg font-medium">
            Sua jornada de transformação continua
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="velocity-card text-center">
              <Target className="h-6 w-6 text-velocity-electric mx-auto mb-2" />
              <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Meta</p>
              <p className="text-velocity-lime font-bold">85% Completa</p>
            </div>
            <div className="velocity-card text-center">
              <Clock className="h-6 w-6 text-velocity-electric mx-auto mb-2" />
              <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Tempo</p>
              <p className="text-velocity-lime font-bold">3 Semanas</p>
            </div>
            <div className="velocity-card text-center">
              <Flame className="h-6 w-6 text-velocity-electric mx-auto mb-2" />
              <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Streak</p>
              <p className="text-velocity-lime font-bold">5 Dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <Card className="velocity-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-velocity-lime flex items-center font-display">
            <TrendingUp className="h-6 w-6 mr-3 text-velocity-electric" />
            Evolução Semanal
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
                  tick={{ fill: '#32FF32', fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #32FF32',
                    borderRadius: '8px',
                    color: '#32FF32'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#32FF32"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#32FF32', strokeWidth: 2, stroke: '#00FF41' }}
                  activeDot={{ r: 8, fill: '#00FF41', strokeWidth: 2, stroke: '#32FF32' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="velocity-card hover:border-velocity-electric cursor-pointer transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-velocity-lime flex items-center font-display">
              <Dumbbell className="h-5 w-5 mr-2 text-velocity-electric" />
              Próximo Treino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold text-velocity-lime">{nextWorkout.name}</h3>
            <p className="text-sm text-velocity-lime/60 mt-1">{nextWorkout.time}</p>
            <div className="mt-3 w-full bg-velocity-shadow rounded-full h-2">
              <div className="bg-gradient-to-r from-velocity-lime to-velocity-electric h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="velocity-card hover:border-velocity-electric cursor-pointer transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-velocity-lime flex items-center font-display">
              <Apple className="h-5 w-5 mr-2 text-velocity-electric" />
              Próxima Refeição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold text-velocity-lime">{nextMeal.name}</h3>
            <p className="text-sm text-velocity-lime/60 mt-1">{nextMeal.time}</p>
            <div className="mt-3 w-full bg-velocity-shadow rounded-full h-2">
              <div className="bg-gradient-to-r from-velocity-lime to-velocity-electric h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="velocity-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-velocity-lime flex items-center font-display">
            <Award className="h-6 w-6 mr-3 text-velocity-electric" />
            Conquistas do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-velocity-electric" />
                      <span className="text-sm font-medium text-velocity-lime">{achievement.name}</span>
                    </div>
                    <span className="text-sm font-bold text-velocity-lime">{achievement.value}</span>
                  </div>
                  <Progress 
                    value={achievement.progress} 
                    className="h-3 bg-velocity-shadow"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="velocity-card text-center">
          <Calendar className="h-8 w-8 text-velocity-electric mx-auto mb-3" />
          <p className="text-2xl font-bold text-velocity-lime">28</p>
          <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Dias Ativos</p>
        </div>
        <div className="velocity-card text-center">
          <Dumbbell className="h-8 w-8 text-velocity-electric mx-auto mb-3" />
          <p className="text-2xl font-bold text-velocity-lime">156</p>
          <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Exercícios</p>
        </div>
        <div className="velocity-card text-center">
          <Flame className="h-8 w-8 text-velocity-electric mx-auto mb-3" />
          <p className="text-2xl font-bold text-velocity-lime">2.4k</p>
          <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Calorias</p>
        </div>
        <div className="velocity-card text-center">
          <TrendingUp className="h-8 w-8 text-velocity-electric mx-auto mb-3" />
          <p className="text-2xl font-bold text-velocity-lime">+12%</p>
          <p className="text-xs text-velocity-lime/60 uppercase tracking-wide">Progresso</p>
        </div>
      </div>
    </div>
  );
}
