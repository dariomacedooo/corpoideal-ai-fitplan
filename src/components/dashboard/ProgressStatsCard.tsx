
import { Card, CardContent } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import { TrendingUp } from "lucide-react";

export function ProgressStatsCard() {
  const { profile } = useUserProfile();

  // Exemplo de busca de progresso real
  const progress = JSON.parse(localStorage.getItem('weeklyStats') || '{}');

  return (
    <Card className="bg-gradient-to-br from-white to-purple-50 shadow-xl border-0 font-playfair">
      <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-corpoideal-purple mb-2 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
            Olá, {profile?.name?.split(" ")[0] || "Visitante"}!
          </h2>
          <p className="font-serif text-gray-700 text-lg mb-2">Você já completou <span className="text-corpoideal-purple font-bold">{progress.workoutsCompleted || 0}</span> treinos esta semana. Continue assim!</p>
          <div className="text-sm text-gray-500 font-light">
            {progress.streak ? `Streak de ${progress.streak} dias consecutivos!` : "Hora de treinar e somar seu streak!"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
