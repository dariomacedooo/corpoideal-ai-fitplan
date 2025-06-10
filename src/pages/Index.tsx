
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wrap localStorage access in try-catch to handle security errors
    try {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      
      if (isLoggedIn) {
        // Check if profile is completed
        const userProfile = localStorage.getItem('userProfile');
        
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          if (profile.profileCompleted) {
            // Check if photos are uploaded
            const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
            if (frontPhotoUrl) {
              // Everything is complete, go to home dashboard
              navigate('/home');
            } else {
              // Profile complete but no photos, go to photo upload
              navigate('/upload');
            }
          } else {
            // Profile incomplete, go to profile page
            navigate('/profile');
          }
        } else {
          // No profile, go to profile page
          navigate('/profile');
        }
      } else {
        // Not logged in, redirect to auth page
        navigate('/auth');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Fallback to auth page on error
      navigate('/auth');
    }
  }, [navigate]);

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
