
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
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    console.log('HomePage - isLoggedIn:', isLoggedIn);
    
    if (!isLoggedIn) {
      console.log('HomePage - Not logged in, redirecting to /auth');
      navigate('/auth');
      return;
    }
    
    // Check if profile is completed
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
    
    // Check if photos are uploaded
    const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
    console.log('HomePage - frontPhotoUrl exists:', !!frontPhotoUrl);
    
    if (!frontPhotoUrl) {
      console.log('HomePage - No photos, redirecting to /upload');
      navigate('/upload');
      return;
    }
    
    console.log('HomePage - All requirements met, staying on home page');
  }, [navigate]);

  // Show loading while checking requirements
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const userProfile = localStorage.getItem('userProfile');
  const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
  
  if (!isLoggedIn || !userProfile || !frontPhotoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-velocity-gradient">
        <div className="text-center animate-slide-up">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-velocity-lime/20 rounded-full blur-3xl animate-glow-pulse"></div>
            <h1 className="text-6xl font-display font-black text-velocity-lime neon-text relative z-10">
              CorpoIdeal AI
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-velocity-lime rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-velocity-electric rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-velocity-neon rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-velocity-lime/80 font-medium mt-4 text-lg">
            Verificando requisitos...
          </p>
        </div>
      </div>
    );
  }

  const parsedProfile = JSON.parse(userProfile);

  return (
    <div className="min-h-screen bg-velocity-gradient pb-20 pt-20">
      <AppHeader />
      
      <div className="px-6 py-8">
        <DashboardSummary userName={parsedProfile.name || "Atleta"} />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
