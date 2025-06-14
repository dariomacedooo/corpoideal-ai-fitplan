
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
      if (!profile) {
        navigate("/auth");
      } else if (isCoach) {
        // Redirect coaches to their dashboard
        navigate("/coach/dashboard");
      }
    }
  }, [profile, loading, isCoach, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple"></div>
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
