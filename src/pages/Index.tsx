
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseProfile } from '@/hooks/useSupabaseProfile';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useSupabaseProfile();
  
  useEffect(() => {
    if (authLoading || profileLoading) return;

    if (!user) {
      navigate('/auth');
      return;
    }

    if (!profile) {
      navigate('/profile');
      return;
    }

    if (!profile.profile_completed) {
      navigate('/profile');
      return;
    }

    // For now, go directly to home since we'll implement photo check later
    navigate('/home');
  }, [user, profile, authLoading, profileLoading, navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-4xl font-bold text-primary mb-2">CorpoIdeal AI</h1>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
