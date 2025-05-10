
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: number;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  icon: string;
  category: string;
}

export function AchievementSystem() {
  const achievements: Achievement[] = [
    {
      id: 1,
      name: "Iniciante Dedicado",
      description: "Complete 5 treinos",
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      icon: "⭐",
      category: "treinos"
    },
    {
      id: 2,
      name: "Foco na Dieta",
      description: "Siga seu plano alimentar por 7 dias",
      progress: 5,
      maxProgress: 7,
      unlocked: false,
      icon: "🍎",
      category: "nutrição"
    },
    {
      id: 3,
      name: "Transformação Inicial",
      description: "Registre progresso por 2 semanas consecutivas",
      progress: 2,
      maxProgress: 2,
      unlocked: true,
      icon: "📊",
      category: "progresso"
    },
    {
      id: 4,
      name: "Atleta Consistente",
      description: "Complete 20 treinos",
      progress: 12,
      maxProgress: 20,
      unlocked: false,
      icon: "💪",
      category: "treinos"
    },
    {
      id: 5,
      name: "Mestre da Nutrição",
      description: "Siga seu plano alimentar por 30 dias",
      progress: 14,
      maxProgress: 30,
      unlocked: false,
      icon: "🥗",
      category: "nutrição"
    }
  ];

  const userLevel = 3;
  const userXP = 340;
  const nextLevelXP = 500;
  const userXPPercentage = (userXP / nextLevelXP) * 100;

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Sistema de Conquistas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 bg-gradient-to-r from-corpoideal-purple/10 to-corpoideal-lightpurple/10 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-corpoideal-purple flex items-center justify-center text-white font-bold">
                {userLevel}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Nível {userLevel}</h3>
                <p className="text-xs text-gray-600">Atleta Intermediário</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{userXP} / {nextLevelXP} XP</p>
              <p className="text-xs text-gray-600">Próximo nível: {nextLevelXP - userXP} XP restantes</p>
            </div>
          </div>
          <Progress value={userXPPercentage} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Suas Conquistas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-3 rounded-lg border ${
                  achievement.unlocked 
                    ? 'border-corpoideal-purple bg-corpoideal-purple/5' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium">
                        {achievement.name}
                      </h4>
                      <Badge 
                        variant={achievement.unlocked ? "default" : "outline"}
                        className={achievement.unlocked ? "bg-corpoideal-purple" : ""}
                      >
                        {achievement.unlocked ? "Concluído" : `${achievement.progress}/${achievement.maxProgress}`}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    {!achievement.unlocked && (
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-1.5" 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
