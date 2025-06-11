
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
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/auth');
      return;
    }
    
    // If no profile at all, redirect to profile page
    if (!profile) {
      navigate('/profile');
      return;
    }

    // Check if analysis is completed to allow full navigation
    const analysisCompleted = localStorage.getItem('analysisCompleted') === 'true';
    
    // If profile is complete but analysis not done, redirect to photo upload
    if (profile.profileCompleted && !analysisCompleted) {
      navigate('/photo-upload');
      return;
    }
  }, [profile, navigate]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple mx-auto mb-4"></div>
          <h1 className="text-4xl font-bold text-corpoideal-purple mb-2">CorpoIdeal AI</h1>
          <p className="text-gray-600">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* Boas-vindas personalizadas */}
        <UserWelcome />

        {/* Frase motivacional */}
        <MotivationalQuote />

        {/* Grid principal com layout responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Próximo treino */}
          <div className="md:col-span-1">
            <NextWorkout />
          </div>
          
          {/* Próxima refeição */}
          <div className="md:col-span-1">
            <NextMeal />
          </div>
          
          {/* Hidratação */}
          <div className="md:col-span-2 lg:col-span-1">
            <WaterIntakeWidget />
          </div>
        </div>

        {/* Segunda linha do grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendário semanal */}
          <WeeklyCalendar />
          
          {/* Progresso semanal */}
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
