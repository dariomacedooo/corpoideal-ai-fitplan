
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Weight, Ruler, Calendar } from "lucide-react";

interface BasicMeasurementsProps {
  height: string;
  setHeight: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  sex: string;
  setSex: (value: string) => void;
}

export function BasicMeasurementsForm({
  height,
  setHeight,
  weight,
  setWeight,
  age,
  setAge,
  sex,
  setSex
}: BasicMeasurementsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" /> Altura (cm)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight" className="flex items-center gap-2">
            <Weight className="h-4 w-4" /> Peso (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Idade
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sex" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Sexo
          </Label>
          <Select value={sex} onValueChange={setSex}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
