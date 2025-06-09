
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { AICoachTips } from "@/components/dashboard/AICoachTips";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { GoalsProgress } from "@/components/dashboard/GoalsProgress";
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
    
    // Check if profile is completed
    if (!profile || !profile.profileCompleted) {
      navigate('/profile');
      return;
    }
    
    // Check if photos are uploaded
    const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
    if (!frontPhotoUrl) {
      navigate('/upload');
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
        {/* Saudação e Foto do Usuário */}
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6 shadow-modern">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop"
            alt="Background motivacional"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-corpoideal-darkpurple/90 to-transparent">
            <div className="flex items-center h-full px-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {profile.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    Olá, {profile.name || 'Atleta'}! 💪
                  </h1>
                  <p className="text-white/90">
                    Pronto para mais um dia de evolução?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frase Motivacional */}
        <MotivationalQuote />

        {/* Layout em Grid para Desktop, Stack para Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Informações do Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardSummary userName={profile.name} />
            <AICoachTips />
          </div>
          
          {/* Coluna Lateral - Metas e Progresso */}
          <div className="lg:col-span-1">
            <GoalsProgress />
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
