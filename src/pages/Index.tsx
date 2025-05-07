
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (isLoggedIn) {
      // Check if profile is completed
      const userProfile = localStorage.getItem('userProfile');
      
      if (userProfile) {
        // Profile exists, go to home
        navigate('/home');
      } else {
        // Profile doesn't exist, go to profile page
        navigate('/profile');
      }
    } else {
      // Redirect to auth page
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-corpoideal-purple mb-2">CorpoIdeal AI</h1>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
