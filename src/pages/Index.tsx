
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wrap localStorage access in try-catch to handle security errors
    try {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      
      console.log('Index - isLoggedIn:', isLoggedIn);
      
      if (isLoggedIn) {
        // Check if profile is completed
        const userProfile = localStorage.getItem('userProfile');
        
        console.log('Index - userProfile exists:', !!userProfile);
        
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          console.log('Index - profile completed:', profile.profileCompleted);
          
          if (profile.profileCompleted) {
            // Check if photos are uploaded
            const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
            console.log('Index - frontPhotoUrl exists:', !!frontPhotoUrl);
            
            if (frontPhotoUrl) {
              // Everything is complete, go to home dashboard
              console.log('Index - Navigating to /home');
              navigate('/home');
            } else {
              // Profile complete but no photos, go to photo upload
              console.log('Index - Navigating to /upload');
              navigate('/upload');
            }
          } else {
            // Profile incomplete, go to profile page
            console.log('Index - Navigating to /profile');
            navigate('/profile');
          }
        } else {
          // No profile, go to profile page
          console.log('Index - No profile, navigating to /profile');
          navigate('/profile');
        }
      } else {
        // Redirect to auth page
        console.log('Index - Not logged in, navigating to /auth');
        navigate('/auth');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Fallback to auth page on error
      navigate('/auth');
    }
  }, [navigate]);

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
          Inicializando sistema...
        </p>
      </div>
    </div>
  );
};

export default Index;
