
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoFormProps {
  additionalInfo: string;
  setAdditionalInfo: (value: string) => void;
}

export function AdditionalInfoForm({ additionalInfo, setAdditionalInfo }: AdditionalInfoFormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="additional-info">Informações Adicionais</Label>
      <Textarea
        id="additional-info"
        placeholder="Outras condições de saúde, lesões, objetivos específicos..."
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}
