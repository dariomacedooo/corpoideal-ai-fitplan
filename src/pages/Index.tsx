
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
    } else {
      // Check if profile is completed for students
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        const parsedProfile = JSON.parse(userProfile);
        if (parsedProfile.profileCompleted) {
          // Check if photos are uploaded
          const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
          if (frontPhotoUrl) {
            navigate('/home');
          } else {
            navigate('/upload');
          }
        } else {
          navigate('/profile');
        }
      } else {
        navigate('/profile');
      }
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
