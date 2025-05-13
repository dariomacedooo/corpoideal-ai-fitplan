
import React from 'react';
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = "Voltar para análise" }: BackButtonProps) {
  return (
    <div className="mt-6">
      <Button 
        onClick={onClick}
        variant="outline"
        className="w-full"
      >
        {label}
      </Button>
    </div>
  );
}
