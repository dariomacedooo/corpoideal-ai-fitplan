
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProfileProgressBarProps {
  completedFields: number;
  totalFields: number;
}

export function ProfileProgressBar({ completedFields, totalFields }: ProfileProgressBarProps) {
  const value = Math.round((completedFields / totalFields) * 100);
  return (
    <div className="space-y-1 mb-6">
      <div className="flex justify-between items-center text-xs text-white/80">
        <span>Progresso do perfil</span>
        <span>{value}% completo</span>
      </div>
      <Progress value={value} className="h-2 bg-white/20">
        <div />
      </Progress>
    </div>
  );
}
