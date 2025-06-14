
import { Button } from "@/components/ui/button";
import { LogOut, User, UserCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function AppHeader() {
  const { profile, signOut, isCoach } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const handleProfileClick = () => {
    if (isCoach) {
      navigate('/coach/dashboard');
    } else {
      navigate('/profile');
    }
  };

  const handleCoachManagement = () => {
    navigate('/profile/coach');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 h-14">
        <h1 className="text-lg font-bold text-corpoideal-purple">
          CorpoIdeal AI
        </h1>
        <div className="flex items-center gap-2">
          {!isCoach && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCoachManagement}
              className="text-corpoideal-purple hover:bg-corpoideal-purple/10"
            >
              <UserCog className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfileClick}
            className="text-corpoideal-purple hover:bg-corpoideal-purple/10"
          >
            <User className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
