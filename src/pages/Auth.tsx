
import { useState } from 'react';
import { Hero } from "@/components/marketing/Hero";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Plans } from "@/components/marketing/Plans";
import { Benefits } from "@/components/marketing/Benefits";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { X } from 'lucide-react';

const Auth = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleShowLogin = () => {
    setIsLogin(true);
    setShowAuthForm(true);
  };

  const handleShowRegister = () => {
    setIsLogin(false);
    setShowAuthForm(true);
  };

  const handleCloseAuth = () => setShowAuthForm(false);
  
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Header onLogin={handleShowLogin} onRegister={handleShowRegister} />
      <main>
        <Hero onCTA={handleShowRegister} />
        <Benefits />
        <Plans onSelectPlan={handleShowRegister} />
        <Testimonials />
      </main>
      <Footer />
      
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-gray-900/95 border border-white/20 rounded-xl shadow-2xl w-full max-w-md mx-auto">
            <button 
              onClick={handleCloseAuth} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            <div className="p-6">
              {isLogin ? (
                <LoginForm onToggleForm={toggleForm} />
              ) : (
                <RegisterForm onToggleForm={toggleForm} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
