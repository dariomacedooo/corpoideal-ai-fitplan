
import { useAuth } from "@/hooks/useAuth";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressStatsCard } from "@/components/dashboard/ProgressStatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { NextWorkoutCard } from "@/components/dashboard/NextWorkoutCard";
import { NextMealCard } from "@/components/dashboard/NextMealCard";
import { WeeklyProgressChart } from "@/components/dashboard/WeeklyProgressChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const { profile, loading, isCoach } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      console.log('HomePage - Profile:', profile?.role, 'IsCoach:', isCoach);
      
      if (!profile) {
        console.log('No profile in HomePage, redirecting to auth');
        navigate("/auth");
        return;
      }
      
      if (isCoach) {
        console.log('Coach detected in HomePage, redirecting to dashboard');
        navigate("/coach/dashboard");
        return;
      }

      // Additional validation for students
      if (profile.role === 'aluno') {
        const userProfile = localStorage.getItem('userProfile');
        const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
        const planSelection = localStorage.getItem('planSelection');

        if (!userProfile || !frontPhotoUrl || !planSelection) {
          console.log('Student missing required data, redirecting to index for flow check');
          navigate('/');
          return;
        }
      }
    }
  }, [profile, loading, isCoach, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile || isCoach) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen font-playfair">
      <AppHeader />
      <main className="max-w-2xl mx-auto px-3 py-4 space-y-4">
        {/* Card de Progresso principal com gráfico lindo */}
        <ProgressStatsCard />
        {/* Ações rápidas minimalistas com icons claros */}
        <QuickActions />
        {/* Cards de próxima refeição e treino */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NextWorkoutCard />
          <NextMealCard />
        </div>
        {/* Gráfico compacto do progresso semanal */}
        <WeeklyProgressChart />
      </main>
      <BottomNav />
    </div>
  );
};

export default HomePage;
