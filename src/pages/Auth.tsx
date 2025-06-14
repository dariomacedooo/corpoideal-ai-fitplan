
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-gray-900 border border-white/10 rounded-lg shadow-lg w-full max-w-md">
             <button onClick={handleCloseAuth} aria-label="Fechar" className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
             </button>
            {isLogin ? (
              <LoginForm onToggleForm={toggleForm} />
            ) : (
              <RegisterForm onToggleForm={toggleForm} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
