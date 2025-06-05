
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Dumbbell, Apple, TrendingUp, Award, Zap, Target, Clock, Flame, ChevronRight } from "lucide-react";

interface DashboardSummaryProps {
  userName?: string;
}

export function DashboardSummary({ userName }: DashboardSummaryProps) {
  // Mock data para o gráfico de progresso
  const progressData = [
    { name: 'Seg', valor: 65 },
    { name: 'Ter', valor: 70 },
    { name: 'Qua', valor: 68 },
    { name: 'Qui', valor: 72 },
    { name: 'Sex', valor: 75 },
    { name: 'Sab', valor: 78 },
    { name: 'Dom', valor: 80 }
  ];

  // Mock data para estatísticas de conquistas
  const achievements = [
    { name: "Treinos completados", value: "8/20", progress: 40, icon: Dumbbell, color: "lime" },
    { name: "Dias seguidos", value: "5", progress: 50, icon: Flame, color: "coral" },
    { name: "Refeições registradas", value: "21/30", progress: 70, icon: Apple, color: "lime" },
  ];

  // Mock próximo treino e refeição
  const nextWorkout = { name: "Treino de Pernas", time: "Hoje, 19:00", progress: 75 };
  const nextMeal = { name: "Jantar", time: "Hoje, 20:30", progress: 60 };

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-fitness-lime/20 via-fitness-coral/10 to-transparent"></div>
        <div className="fitness-overlay"></div>
        <div className="relative p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Zap className="h-10 w-10 text-fitness-lime animate-pulse-lime" />
            <h1 className="text-4xl md:text-5xl font-black text-white">
              BEM-VINDO, <span className="text-fitness-lime">{userName?.toUpperCase()}</span>!
            </h1>
          </div>
          <p className="text-fitness-text-secondary text-lg font-medium mb-8">
            Sua jornada de transformação continua
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="fitness-card text-center py-4">
              <Target className="h-8 w-8 text-fitness-coral mx-auto mb-3" />
              <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mb-1">META</p>
              <p className="fitness-metric-small">85%</p>
              <p className="text-xs text-fitness-text-secondary">Completa</p>
            </div>
            <div className="fitness-card text-center py-4">
              <Clock className="h-8 w-8 text-fitness-coral mx-auto mb-3" />
              <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mb-1">TEMPO</p>
              <p className="fitness-metric-small">3</p>
              <p className="text-xs text-fitness-text-secondary">Semanas</p>
            </div>
            <div className="fitness-card text-center py-4">
              <Flame className="h-8 w-8 text-fitness-coral mx-auto mb-3" />
              <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mb-1">STREAK</p>
              <p className="fitness-metric-small">5</p>
              <p className="text-xs text-fitness-text-secondary">Dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Evolução */}
      <Card className="fitness-card border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="fitness-section-title flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-fitness-coral" />
            EVOLUÇÃO SEMANAL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#a0a0a0', fontSize: 14, fontWeight: 500 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid rgba(195, 255, 0, 0.3)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#c3ff00"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#c3ff00', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 10, fill: '#c3ff00', strokeWidth: 3, stroke: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="workout-card hover:border-fitness-lime/30 cursor-pointer group">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-white flex items-center justify-between">
              <div className="flex items-center">
                <Dumbbell className="h-6 w-6 mr-3 text-fitness-lime" />
                PRÓXIMO TREINO
              </div>
              <ChevronRight className="h-5 w-5 text-fitness-text-secondary group-hover:text-fitness-lime transition-colors" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-white mb-2">{nextWorkout.name}</h3>
            <p className="text-fitness-text-secondary mb-4">{nextWorkout.time}</p>
            <div className="fitness-progress-bar">
              <div 
                className="fitness-progress-fill animate-progress-fill" 
                style={{ width: `${nextWorkout.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-fitness-text-secondary mt-2">{nextWorkout.progress}% preparado</p>
          </CardContent>
        </Card>

        <Card className="nutrition-card hover:border-fitness-coral/30 cursor-pointer group">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-white flex items-center justify-between">
              <div className="flex items-center">
                <Apple className="h-6 w-6 mr-3 text-fitness-coral" />
                PRÓXIMA REFEIÇÃO
              </div>
              <ChevronRight className="h-5 w-5 text-fitness-text-secondary group-hover:text-fitness-coral transition-colors" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-white mb-2">{nextMeal.name}</h3>
            <p className="text-fitness-text-secondary mb-4">{nextMeal.time}</p>
            <div className="fitness-progress-bar">
              <div 
                className="h-full bg-gradient-to-r from-fitness-coral to-fitness-lime rounded-full animate-progress-fill" 
                style={{ width: `${nextMeal.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-fitness-text-secondary mt-2">{nextMeal.progress}% preparado</p>
          </CardContent>
        </Card>
      </div>

      {/* Conquistas */}
      <Card className="fitness-card border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="fitness-section-title flex items-center">
            <Award className="h-8 w-8 mr-3 text-fitness-lime" />
            CONQUISTAS DO MÊS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isLime = achievement.color === 'lime';
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${isLime ? 'bg-fitness-lime/20' : 'bg-fitness-coral/20'}`}>
                        <Icon className={`h-6 w-6 ${isLime ? 'text-fitness-lime' : 'text-fitness-coral'}`} />
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-white">{achievement.name}</span>
                        <p className="text-fitness-text-secondary text-sm">{achievement.value}</p>
                      </div>
                    </div>
                    <span className={`text-2xl font-black font-mono ${isLime ? 'text-fitness-lime' : 'text-fitness-coral'}`}>
                      {achievement.progress}%
                    </span>
                  </div>
                  <div className="fitness-progress-bar">
                    <div 
                      className={`h-full rounded-full animate-progress-fill ${
                        isLime ? 'bg-fitness-lime' : 'bg-fitness-coral'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="fitness-card text-center py-6">
          <Calendar className="h-10 w-10 text-fitness-lime mx-auto mb-4" />
          <div className="fitness-metric">28</div>
          <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mt-2">DIAS ATIVOS</p>
        </div>
        <div className="fitness-card text-center py-6">
          <Dumbbell className="h-10 w-10 text-fitness-coral mx-auto mb-4" />
          <div className="fitness-metric">156</div>
          <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mt-2">EXERCÍCIOS</p>
        </div>
        <div className="fitness-card text-center py-6">
          <Flame className="h-10 w-10 text-fitness-lime mx-auto mb-4" />
          <div className="fitness-metric">2.4K</div>
          <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mt-2">CALORIAS</p>
        </div>
        <div className="fitness-card text-center py-6">
          <TrendingUp className="h-10 w-10 text-fitness-coral mx-auto mb-4" />
          <div className="fitness-metric">+12%</div>
          <p className="text-xs text-fitness-text-secondary uppercase tracking-wide mt-2">PROGRESSO</p>
        </div>
      </div>
    </div>
  );
}
