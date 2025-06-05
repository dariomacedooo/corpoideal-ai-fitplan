
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      
      if (isLoggedIn) {
        const userProfile = localStorage.getItem('userProfile');
        
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          
          if (profile.profileCompleted) {
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
      } else {
        // Se não está logado, mostrar tela de boas-vindas
        return;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-fitness-gradient"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-fitness-lime/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-fitness-coral/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-fitness-lime/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in">
          {/* Logo/Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-fitness-lime rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-lime">
              <Zap className="h-12 w-12 text-black" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            FITNESS
            <span className="block text-fitness-lime">REVOLUTION</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-fitness-text-secondary mb-8 max-w-2xl mx-auto font-medium">
            Transforme seu corpo com IA avançada e análise científica personalizada
          </p>

          {/* Features highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="fitness-card text-center py-6">
              <div className="fitness-metric-small mb-2">100%</div>
              <p className="text-fitness-text-secondary">Personalizado</p>
            </div>
            <div className="fitness-card text-center py-6">
              <div className="fitness-metric-small mb-2">24/7</div>
              <p className="text-fitness-text-secondary">Acompanhamento</p>
            </div>
            <div className="fitness-card text-center py-6">
              <div className="fitness-metric-small mb-2">AI</div>
              <p className="text-fitness-text-secondary">Inteligência</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="fitness-button-primary text-xl px-12 py-5 group"
          >
            <span className="flex items-center space-x-3">
              <span>COMEÇAR AGORA</span>
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* Footer text */}
          <p className="text-fitness-text-secondary text-sm mt-8 max-w-md mx-auto">
            Junte-se a milhares de pessoas que já transformaram suas vidas
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-fitness-lime via-fitness-coral to-fitness-lime"></div>
    </div>
  );
};

export default Index;
