
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  
  useEffect(() => {
    if (loading) return; // Wait for auth to load
    
    if (!user) {
      // Not logged in, redirect to auth page
      navigate('/auth');
      return;
    }

    // User is logged in, check their role
    if (profile?.role === 'professor') {
      navigate('/coach/dashboard');
      return;
    }

    // For students, follow the correct flow
    if (profile?.role === 'aluno') {
      // 1. Check if profile is completed
      const userProfile = localStorage.getItem('userProfile');
      if (!userProfile || !JSON.parse(userProfile).profileCompleted) {
        navigate('/profile');
        return;
      }

      // 2. Check if photos are uploaded
      const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
      if (!frontPhotoUrl) {
        navigate('/upload');
        return;
      }

      // 3. Check if plan selection is completed
      const planSelection = localStorage.getItem('planSelection');
      if (!planSelection) {
        navigate('/plan-selection');
        return;
      }

      // 4. All steps completed, go to dashboard
      navigate('/home');
    }
  }, [user, profile, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple mx-auto mb-4"></div>
        <h1 className="text-4xl font-bold text-corpoideal-purple mb-2">CorpoIdeal AI</h1>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
