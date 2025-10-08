
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
      <div className="flex justify-between items-center text-xs text-primary-foreground/90">
        <span>Progresso do perfil</span>
        <span>{value}% completo</span>
      </div>
      <Progress value={value} className="h-2 bg-primary-foreground/20">
        <div />
      </Progress>
    </div>
  );
}
