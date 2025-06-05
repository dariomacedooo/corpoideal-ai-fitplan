
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('HomePage - checking authentication and profile');
    
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    console.log('HomePage - isLoggedIn:', isLoggedIn);
    
    if (!isLoggedIn) {
      console.log('HomePage - Not logged in, redirecting to /auth');
      navigate('/auth');
      return;
    }
    
    // Verificar se o perfil está completo
    const userProfile = localStorage.getItem('userProfile');
    console.log('HomePage - userProfile exists:', !!userProfile);
    
    if (!userProfile) {
      console.log('HomePage - No profile, redirecting to /profile');
      navigate('/profile');
      return;
    }
    
    const parsedProfile = JSON.parse(userProfile);
    console.log('HomePage - profile completed:', parsedProfile.profileCompleted);
    
    if (!parsedProfile.profileCompleted) {
      console.log('HomePage - Profile not completed, redirecting to /profile');
      navigate('/profile');
      return;
    }
    
    // Verificar se as fotos foram enviadas
    const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
    console.log('HomePage - frontPhotoUrl exists:', !!frontPhotoUrl);
    
    if (!frontPhotoUrl) {
      console.log('HomePage - No photos, redirecting to /upload');
      navigate('/upload');
      return;
    }
    
    console.log('HomePage - All requirements met, staying on home page');
  }, [navigate]);

  // Mostrar loading enquanto verifica os requisitos
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const userProfile = localStorage.getItem('userProfile');
  const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
  
  if (!isLoggedIn || !userProfile || !frontPhotoUrl) {
    return (
      <div className="min-h-screen bg-fitness-gradient flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-fitness-lime rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-lime">
            <div className="w-8 h-8 bg-black rounded-lg"></div>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">
            FITNESS REVOLUTION
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-fitness-lime rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-fitness-coral rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-fitness-lime rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-fitness-text-secondary font-medium text-lg">
            Verificando requisitos...
          </p>
        </div>
      </div>
    );
  }

  const parsedProfile = JSON.parse(userProfile);

  return (
    <div className="min-h-screen bg-fitness-gradient pb-24 pt-20">
      <AppHeader />
      
      <div className="px-6 py-8">
        <DashboardSummary userName={parsedProfile.name || "Atleta"} />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
