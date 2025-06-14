
import { useState } from 'react';
import { Hero } from "@/components/marketing/Hero";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Ratings } from "@/components/marketing/Ratings";
import { Plans } from "@/components/marketing/Plans";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Auth = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleShowAuth = () => setShowAuthForm(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="bg-background min-h-screen">
      {!showAuthForm ? (
        <div>
          <Hero onCTA={handleShowAuth} />
          <Ratings />
          <Testimonials />
          <Plans />
          <footer className="py-6 text-center text-xs text-corpoideal-gray bg-white/80">
            © {new Date().getFullYear()} CorpoIdeal AI. Todos os direitos reservados.
          </footer>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md">
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
