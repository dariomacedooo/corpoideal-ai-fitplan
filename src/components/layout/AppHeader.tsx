
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Power, Zap } from "lucide-react";

export function AppHeader() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    try {
      const loggedInStatus = localStorage.getItem('userLoggedIn') === 'true';
      setIsLoggedIn(loggedInStatus);
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
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-velocity-charcoal/95 backdrop-blur-md border-b border-velocity-lime/20 flex items-center justify-between px-6 py-4 z-50">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Zap className="h-8 w-8 text-velocity-lime animate-glow-pulse" />
          <div className="absolute inset-0 bg-velocity-lime/20 rounded-full blur-xl"></div>
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-velocity-lime neon-text">
            CorpoIdeal AI
          </h1>
          <p className="text-xs text-velocity-lime/60 font-medium">VELOCITY MODE</p>
        </div>
      </div>
      
      {isLoggedIn && (
        <Button 
          variant="ghost"
          onClick={handleLogout}
          className="text-velocity-lime/80 hover:text-velocity-electric hover:bg-velocity-lime/10 transition-all duration-300 flex items-center space-x-2"
        >
          <Power className="h-4 w-4" />
          <span className="font-medium">Sair</span>
        </Button>
      )}
    </header>
  );
}
