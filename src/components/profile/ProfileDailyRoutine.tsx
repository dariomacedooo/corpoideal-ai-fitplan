
import React from "react";
import { Flame, Dumbbell, Clock } from "lucide-react";

interface Props {
  name: string;
  goal: string;
  nextWorkoutDay: string | null;
}

const goalTips: Record<string, string> = {
  "perder-peso": "Consuma água, mantenha-se ativo e busque déficit calórico saudável.",
  "ganhar-massa": "Alimente-se bem, foque em proteína e mantenha constância nos treinos!",
  "ganhar-peso": "Aumente calorias de qualidade nas refeições! Priorize hidratação.",
  "manter-peso": "Equilíbrio é a chave! Mantenha rotina e bons hábitos.",
};

export function ProfileDailyRoutine({ name, goal, nextWorkoutDay }: Props) {
  const tip =
    goalTips[goal] ||
    "Mantenha disciplina, organize treinos e refeições. Você está no caminho certo!";
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-secondary to-secondary-hover rounded-xl p-4 mb-6 shadow-medium">
      <div className="flex-1">
        <h2 className="font-bold text-lg text-secondary-foreground mb-1">Olá, {name || "Atleta"}!</h2>
        <p className="text-secondary-foreground/90">
          {tip}
        </p>
      </div>
      <div className="flex gap-6 items-center mt-4 md:mt-0">
        <div className="flex flex-col items-center">
          <Flame className="text-secondary-foreground mb-0.5" />
          <span className="text-secondary-foreground text-xs">Meta do dia</span>
        </div>
        <div className="flex flex-col items-center">
          <Dumbbell className="text-secondary-foreground mb-0.5" />
          <span className="text-secondary-foreground text-xs">Próx. treino:
            <span className="ml-1 font-semibold">{nextWorkoutDay || "?"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
