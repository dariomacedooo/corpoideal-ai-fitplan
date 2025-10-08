
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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
      // Clear all user data
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('frontPhotoUrl');
      localStorage.removeItem('sidePhotoUrl');
      localStorage.removeItem('backPhotoUrl');
      
      setIsLoggedIn(false);
      toast({
        title: "Logout realizado",
        description: "Esperamos vê-lo novamente em breve!",
      });
      navigate('/auth');
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
    <header className="fixed top-0 left-0 right-0 bg-card shadow-sm flex items-center justify-between px-4 py-2 z-10 border-b border-border">
      <div className="flex items-center">
        <h1 className="font-bold text-lg text-primary">CorpoIdeal AI</h1>
      </div>
      {isLoggedIn && (
        <Button 
          variant="ghost"
          onClick={handleLogout}
          className="text-sm"
        >
          Sair
        </Button>
      )}
    </header>
  );
}
