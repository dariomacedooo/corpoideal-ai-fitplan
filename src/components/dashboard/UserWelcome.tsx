
import { Card, CardContent } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";

export function UserWelcome() {
  const { profile } = useUserProfile();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Hoje é o dia perfeito para superar seus limites! 💪",
      "Cada treino é um passo mais próximo do seu objetivo! 🎯",
      "Sua dedicação de hoje será o resultado de amanhã! ⭐",
      "Transforme o suor de hoje na conquista de amanhã! 🏆",
      "Seja a melhor versão de si mesmo hoje! 🚀"
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <Card className="bg-gradient-to-r from-corpoideal-purple to-corpoideal-darkpurple text-white border-0 shadow-modern">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              {getGreeting()}, {profile?.name || 'Atleta'}! 👋
            </h1>
            <p className="text-white/90 text-sm">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
