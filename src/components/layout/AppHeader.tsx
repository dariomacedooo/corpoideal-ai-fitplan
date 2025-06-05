
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Power, User, Bell } from "lucide-react";

export function AppHeader() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    try {
      const loggedInStatus = localStorage.getItem('userLoggedIn') === 'true';
      setIsLoggedIn(loggedInStatus);
      
      if (loggedInStatus) {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
          const profile = JSON.parse(userProfile);
          setUserName(profile.name || 'Atleta');
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setIsLoggedIn(false);
    }
  }, []);
  
  const handleLogout = () => {
    try {
      localStorage.removeItem('userLoggedIn');
      setIsLoggedIn(false);
      toast({
        title: "Logout realizado",
        description: "Esperamos vê-lo novamente em breve!",
      });
      navigate('/');
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao finalizar sua sessão.",
        variant: "destructive"
      });
    }
  };
  
  if (!isLoggedIn) return null;
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-fitness-black/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 py-4 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-fitness-lime rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-black" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">
            Olá, {userName}
          </h1>
          <p className="text-xs text-fitness-text-secondary uppercase tracking-wide">
            Pronto para treinar?
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-fitness-lime transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost"
          onClick={handleLogout}
          className="text-white hover:bg-white/10 hover:text-fitness-coral transition-all duration-300 flex items-center space-x-2"
        >
          <Power className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Sair</span>
        </Button>
      </div>
    </header>
  );
}
