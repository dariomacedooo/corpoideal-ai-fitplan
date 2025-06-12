
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { UserWelcome } from "@/components/dashboard/UserWelcome";
import { NextWorkout } from "@/components/dashboard/NextWorkout";
import { NextMeal } from "@/components/dashboard/NextMeal";
import { WeeklyCalendar } from "@/components/dashboard/WeeklyCalendar";
import { WeeklyProgress } from "@/components/dashboard/WeeklyProgress";
import { WaterIntakeWidget } from "@/components/dashboard/WaterIntakeWidget";
import { AICoachTips } from "@/components/dashboard/AICoachTips";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Activity, 
  Users, 
  Trophy,
  BarChart3,
  Timer,
  Flame,
  Heart,
  Zap
} from "lucide-react";

const HomePage = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [weeklyStats, setWeeklyStats] = useState({
    workoutsCompleted: 0,
    totalWorkouts: 0,
    caloriesBurned: 0,
    waterIntake: 0,
    streak: 0
  });
  
  // useEffect para carregar stats semanais (mantido, pois não interfere na navegação)
  useEffect(() => {
    const savedStats = localStorage.getItem('weeklyStats');
    if (savedStats) {
 setWeeklyStats(JSON.parse(savedStats));
    } else if (profile) { // Initialize stats only if profile is available
 const totalWorkouts = profile.trainingDays?.length || 3;
      setWeeklyStats({
 workoutsCompleted: Math.floor(Math.random() * totalWorkouts),
 totalWorkouts,
        caloriesBurned: Math.floor(Math.random() * 2000) + 500, // Example random data
        waterIntake: Math.floor(Math.random() * 80) + 20, // Example random data
        streak: Math.floor(Math.random() * 14) + 1 // Example random data
      });
    }
  }, [profile]); // Dependência no profile para inicializar stats

  const workoutProgress = (weeklyStats.workoutsCompleted / weeklyStats.totalWorkouts) * 100;
  const goalCalories = profile?.goal === 'perder-peso' ? 2200 : profile?.goal === 'ganhar-massa' ? 2800 : 2500;
  const calorieProgress = (weeklyStats.caloriesBurned / goalCalories) * 100;

  const quickActions = [
    {
      title: "Iniciar Treino",
      icon: Activity,
      color: "bg-purple-500",
      action: () => navigate('/training')
    },
    {
      title: "Ver Dieta",
      icon: Heart,
      color: "bg-green-500", 
      action: () => navigate('/nutrition')
    },
    {
      title: "Progresso",
      icon: BarChart3,
      color: "bg-blue-500",
      action: () => navigate('/progress')
    },
    {
      title: "Perfil",
      icon: Users,
      color: "bg-orange-500",
      action: () => navigate('/profile')
    }
  ];

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-3 py-4 space-y-4">
        {/* Boas-vindas personalizadas */}
        <UserWelcome />

        {/* Frase motivacional */}
        <MotivationalQuote />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs">Sequência</p>
                  <p className="text-2xl font-bold">{weeklyStats.streak}</p>
                  <p className="text-purple-200 text-xs">dias</p>
                </div>
                <Flame className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs">Calorias</p>
                  <p className="text-2xl font-bold">{weeklyStats.caloriesBurned}</p>
                  <p className="text-green-200 text-xs">kcal</p>
                </div>
                <Zap className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs">Treinos</p>
                  <p className="text-2xl font-bold">{weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}</p>
                  <p className="text-blue-200 text-xs">semana</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs">Hidratação</p>
                  <p className="text-2xl font-bold">{weeklyStats.waterIntake}%</p>
                  <p className="text-orange-200 text-xs">meta</p>
                </div>
                <Activity className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-corpoideal-purple">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} hover:opacity-90 h-20 flex flex-col items-center justify-center text-white border-0`}
                >
                  <action.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs text-center">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progresso Semanal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-corpoideal-purple flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Progresso da Semana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Treinos Concluídos</span>
                <span className="text-sm text-gray-600">{weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}</span>
              </div>
              <Progress value={workoutProgress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Meta de Calorias</span>
                <span className="text-sm text-gray-600">{weeklyStats.caloriesBurned}/{goalCalories} kcal</span>
              </div>
              <Progress value={Math.min(calorieProgress, 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Grid principal com layout responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Próximo treino */}
          <NextWorkout />
          
          {/* Próxima refeição */}
          <NextMeal />
        </div>

        {/* Hidratação */}
        <WaterIntakeWidget />

        {/* Segunda linha do grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Calendário semanal */}
          <WeeklyCalendar />
          
          {/* Progresso semanal detalhado */}
          <WeeklyProgress />
        </div>

        {/* Dicas do coach IA */}
        <AICoachTips />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
