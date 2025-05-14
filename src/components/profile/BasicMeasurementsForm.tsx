
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Weight, Ruler, Calendar, Percent, User2 } from "lucide-react";

interface BasicMeasurementsProps {
  height: string;
  setHeight: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  sex: string;
  setSex: (value: string) => void;
  bodyFat?: string;
  setBodyFat?: (value: string) => void;
  chest?: string;
  setChest?: (value: string) => void;
  leftArm?: string;
  setLeftArm?: (value: string) => void;
  rightArm?: string;
  setRightArm?: (value: string) => void;
  waist?: string;
  setWaist?: (value: string) => void;
  hips?: string;
  setHips?: (value: string) => void;
  leftThigh?: string;
  setLeftThigh?: (value: string) => void;
  rightThigh?: string;
  setRightThigh?: (value: string) => void;
  leftCalf?: string;
  setLeftCalf?: (value: string) => void;
  rightCalf?: string;
  setRightCalf?: (value: string) => void;
}

export function BasicMeasurementsForm({
  height,
  setHeight,
  weight,
  setWeight,
  age,
  setAge,
  sex,
  setSex,
  bodyFat = '',
  setBodyFat = () => {},
  chest = '',
  setChest = () => {},
  leftArm = '',
  setLeftArm = () => {},
  rightArm = '',
  setRightArm = () => {},
  waist = '',
  setWaist = () => {},
  hips = '',
  setHips = () => {},
  leftThigh = '',
  setLeftThigh = () => {},
  rightThigh = '',
  setRightThigh = () => {},
  leftCalf = '',
  setLeftCalf = () => {},
  rightCalf = '',
  setRightCalf = () => {}
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

      <h3 className="text-md font-medium text-corpoideal-purple mt-4 mb-3 flex items-center gap-2">
        <User2 className="h-4 w-4" /> Medidas Corporais
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="chest" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Tórax (cm)
          </Label>
          <Input
            id="chest"
            type="number"
            placeholder="100"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bodyFat" className="flex items-center gap-2">
            <Percent className="h-4 w-4" /> Gordura Corporal (%)
          </Label>
          <Input
            id="bodyFat"
            type="number"
            placeholder="15"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
          />
          <p className="text-xs text-gray-500">Opcional</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="leftArm" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Braço Esq. (cm)
          </Label>
          <Input
            id="leftArm"
            type="number"
            placeholder="32"
            value={leftArm}
            onChange={(e) => setLeftArm(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rightArm" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Braço Dir. (cm)
          </Label>
          <Input
            id="rightArm"
            type="number"
            placeholder="32"
            value={rightArm}
            onChange={(e) => setRightArm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="waist" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Cintura (cm)
          </Label>
          <Input
            id="waist"
            type="number"
            placeholder="80"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hips" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Quadril (cm)
          </Label>
          <Input
            id="hips"
            type="number"
            placeholder="90"
            value={hips}
            onChange={(e) => setHips(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="leftThigh" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Coxa Esq. (cm)
          </Label>
          <Input
            id="leftThigh"
            type="number"
            placeholder="50"
            value={leftThigh}
            onChange={(e) => setLeftThigh(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rightThigh" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Coxa Dir. (cm)
          </Label>
          <Input
            id="rightThigh"
            type="number"
            placeholder="50"
            value={rightThigh}
            onChange={(e) => setRightThigh(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="leftCalf" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Panturrilha Esq. (cm)
          </Label>
          <Input
            id="leftCalf"
            type="number"
            placeholder="35"
            value={leftCalf}
            onChange={(e) => setLeftCalf(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rightCalf" className="flex items-center gap-2">
            <User2 className="h-4 w-4" /> Panturrilha Dir. (cm)
          </Label>
          <Input
            id="rightCalf"
            type="number"
            placeholder="35"
            value={rightCalf}
            onChange={(e) => setRightCalf(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
