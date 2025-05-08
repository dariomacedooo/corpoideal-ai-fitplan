
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
      <Label className="flex items-center gap-2">
        <Wallet className="h-4 w-4" /> Orçamento Mensal para Alimentação
      </Label>
      <RadioGroup value={budget} onValueChange={setBudget}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="100-300" id="budget-1" />
          <Label htmlFor="budget-1">R$ 100 - R$ 300</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="301-500" id="budget-2" />
          <Label htmlFor="budget-2">R$ 301 - R$ 500</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="501-800" id="budget-3" />
          <Label htmlFor="budget-3">R$ 501 - R$ 800</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="801+" id="budget-4" />
          <Label htmlFor="budget-4">Acima de R$ 800</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
