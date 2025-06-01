
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-corpoideal-purple mb-2">CorpoIdeal AI</h1>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <DashboardSummary userName={profile.name} />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
