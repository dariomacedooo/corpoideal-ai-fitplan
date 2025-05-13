
import React from 'react';
import { Button } from "@/components/ui/button";

interface AnalysisActionsProps {
  onShowProjection: () => void;
  onShowGoals: () => void;
}

export function AnalysisActions({ onShowProjection, onShowGoals }: AnalysisActionsProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <Button 
        onClick={onShowProjection}
        className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
      >
        Ver projeção de resultados
      </Button>
      
      <Button 
        onClick={onShowGoals}
        className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
      >
        Definir meu objetivo
      </Button>
    </div>
  );
}
