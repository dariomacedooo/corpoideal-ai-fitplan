
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet } from "lucide-react";

interface BudgetFormProps {
  budget: string;
  setBudget: (budget: string) => void;
}

export function BudgetForm({ budget, setBudget }: BudgetFormProps) {
  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-corpoideal-purple font-medium">
        <Wallet className="h-4 w-4" /> Orçamento Mensal para Alimentação
      </Label>
      <p className="text-sm text-gray-600">
        Valores adaptados para a realidade brasileira. Isso nos ajuda a sugerir uma dieta adequada ao seu orçamento.
      </p>
      <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
        <div>
          <RadioGroupItem value="80-150" id="budget-1" className="peer sr-only" />
          <Label 
            htmlFor="budget-1"
            className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
          >
            <div>
              <p className="font-medium">R$ 80 - R$ 150</p>
              <p className="text-sm text-muted-foreground">Básico: arroz, feijão, ovo, frango, frutas locais</p>
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="151-250" id="budget-2" className="peer sr-only" />
          <Label 
            htmlFor="budget-2"
            className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
          >
            <div>
              <p className="font-medium">R$ 151 - R$ 250</p>
              <p className="text-sm text-muted-foreground">Intermediário: + carne vermelha, peixes, whey simples</p>
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="251-400" id="budget-3" className="peer sr-only" />
          <Label 
            htmlFor="budget-3"
            className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
          >
            <div>
              <p className="font-medium">R$ 251 - R$ 400</p>
              <p className="text-sm text-muted-foreground">Confortável: + salmão, aveia, oleaginosas, suplementos</p>
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="400+" id="budget-4" className="peer sr-only" />
          <Label 
            htmlFor="budget-4"
            className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
          >
            <div>
              <p className="font-medium">Acima de R$ 400</p>
              <p className="text-sm text-muted-foreground">Premium: alimentos orgânicos e suplementos avançados</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
