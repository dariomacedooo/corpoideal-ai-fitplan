import { Card, CardContent } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
export function UserWelcome() {
  const {
    profile
  } = useUserProfile();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };
  const getMotivationalMessage = () => {
    const messages = ["Hoje é o dia perfeito para superar seus limites! 💪", "Cada treino é um passo mais próximo do seu objetivo! 🎯", "Sua dedicação de hoje será o resultado de amanhã! ⭐", "Transforme o suor de hoje na conquista de amanhã! 🏆", "Seja a melhor versão de si mesmo hoje! 🚀"];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  return <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground border-0 shadow-medium">
      <CardContent className="p-6 bg-blue-500">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1 text-gray-800">
              {getGreeting()}, {profile?.name || 'Atleta'}! 👋
            </h1>
            <p className="text-primary-foreground/90 text-sm">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>;
}