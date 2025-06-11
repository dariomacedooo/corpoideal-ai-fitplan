
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";

interface TrainingDaysFormProps {
  trainingDays: string[];
  setTrainingDays: (days: string[]) => void;
}

export function TrainingDaysForm({ trainingDays, setTrainingDays }: TrainingDaysFormProps) {
  const daysOptions = [
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
  ];

  const handleDayToggle = (day: string) => {
    const newDays = trainingDays.includes(day)
      ? trainingDays.filter(d => d !== day)
      : [...trainingDays, day];
    setTrainingDays(newDays);
  };

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-corpoideal-purple font-medium">
        <Calendar className="h-4 w-4" /> Dias da Semana para Treino
      </Label>
      <p className="text-sm text-gray-600">Selecione os dias que você pretende treinar</p>
      
      <div className="grid grid-cols-1 gap-3">
        {daysOptions.map((day) => (
          <div key={day.value} className="flex items-center space-x-2">
            <Checkbox
              id={day.value}
              checked={trainingDays.includes(day.value)}
              onCheckedChange={() => handleDayToggle(day.value)}
              className="border-corpoideal-purple data-[state=checked]:bg-corpoideal-purple"
            />
            <Label
              htmlFor={day.value}
              className="text-sm font-normal cursor-pointer"
            >
              {day.label}
            </Label>
          </div>
        ))}
      </div>
      
      {trainingDays.length === 0 && (
        <p className="text-sm text-red-500">
          Selecione pelo menos um dia para treinar
        </p>
      )}
    </div>
  );
}
