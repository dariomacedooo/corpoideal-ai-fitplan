
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function PeriodicAssessment() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: "",
    bodyFat: "",
    energy: "3",
    sleep: "3",
    stress: "3",
    soreness: "2",
    appetite: "3",
    comments: "",
  });
  
  // Mock data for previous assessments
  const previousAssessments = [
    {
      date: "2025-05-03",
      weight: "75.6",
      bodyFat: "18.2",
      energy: 4,
      sleep: 3,
      stress: 2,
      soreness: 3,
      appetite: 4,
      comments: "Sentindo mais energia após ajustes na dieta."
    },
    {
      date: "2025-04-26",
      weight: "76.2",
      bodyFat: "18.7",
      energy: 3,
      sleep: 2,
      stress: 3,
      soreness: 4,
      appetite: 3,
      comments: "Músculos doloridos após novo treino de pernas."
    },
    {
      date: "2025-04-19",
      weight: "76.8",
      bodyFat: "19.1",
      energy: 3,
      sleep: 3,
      stress: 4,
      appetite: 3,
      soreness: 2,
      comments: "Semana estressante no trabalho afetou os treinos."
    }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui implementaríamos a lógica para salvar os dados
    toast({
      title: "Avaliação registrada",
      description: "Sua avaliação periódica foi salva com sucesso.",
    });
    
    // Reset form
    setFormData({
      ...formData,
      weight: "",
      bodyFat: "",
      energy: "3",
      sleep: "3",
      stress: "3",
      soreness: "2",
      appetite: "3",
      comments: "",
    });
  };
  
  const getScoreLabel = (score: number) => {
    switch(score) {
      case 1: return "Muito baixo";
      case 2: return "Baixo";
      case 3: return "Normal";
      case 4: return "Bom";
      case 5: return "Excelente";
      default: return "Normal";
    }
  };
  
  const getScoreColor = (score: number, inverseScale = false) => {
    if (inverseScale) {
      // For stress and soreness where lower is better
      switch(score) {
        case 1: return "text-green-500";
        case 2: return "text-green-400";
        case 3: return "text-yellow-500";
        case 4: return "text-orange-500";
        case 5: return "text-red-500";
        default: return "";
      }
    } else {
      // For sleep, energy, appetite where higher is better
      switch(score) {
        case 1: return "text-red-500";
        case 2: return "text-orange-500";
        case 3: return "text-yellow-500";
        case 4: return "text-green-400";
        case 5: return "text-green-500";
        default: return "";
      }
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Avaliação Periódica
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new-assessment">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="new-assessment">Nova Avaliação</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-assessment">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 70.5"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">Gordura Corporal (%)</Label>
                  <Input
                    id="bodyFat"
                    name="bodyFat"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 15.5"
                    value={formData.bodyFat}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="energy">Energia</Label>
                  <Select
                    value={formData.energy}
                    onValueChange={(value) => handleSelectChange("energy", value)}
                  >
                    <SelectTrigger id="energy">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Muito baixa</SelectItem>
                      <SelectItem value="2">2 - Baixa</SelectItem>
                      <SelectItem value="3">3 - Normal</SelectItem>
                      <SelectItem value="4">4 - Boa</SelectItem>
                      <SelectItem value="5">5 - Excelente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sleep">Sono</Label>
                  <Select
                    value={formData.sleep}
                    onValueChange={(value) => handleSelectChange("sleep", value)}
                  >
                    <SelectTrigger id="sleep">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Muito ruim</SelectItem>
                      <SelectItem value="2">2 - Ruim</SelectItem>
                      <SelectItem value="3">3 - Regular</SelectItem>
                      <SelectItem value="4">4 - Bom</SelectItem>
                      <SelectItem value="5">5 - Excelente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stress">Estresse</Label>
                  <Select
                    value={formData.stress}
                    onValueChange={(value) => handleSelectChange("stress", value)}
                  >
                    <SelectTrigger id="stress">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Muito baixo</SelectItem>
                      <SelectItem value="2">2 - Baixo</SelectItem>
                      <SelectItem value="3">3 - Moderado</SelectItem>
                      <SelectItem value="4">4 - Alto</SelectItem>
                      <SelectItem value="5">5 - Muito alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="soreness">Dores musculares</Label>
                  <Select
                    value={formData.soreness}
                    onValueChange={(value) => handleSelectChange("soreness", value)}
                  >
                    <SelectTrigger id="soreness">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Nenhuma</SelectItem>
                      <SelectItem value="2">2 - Leve</SelectItem>
                      <SelectItem value="3">3 - Moderada</SelectItem>
                      <SelectItem value="4">4 - Intensa</SelectItem>
                      <SelectItem value="5">5 - Muito intensa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appetite">Apetite</Label>
                  <Select
                    value={formData.appetite}
                    onValueChange={(value) => handleSelectChange("appetite", value)}
                  >
                    <SelectTrigger id="appetite">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Muito baixo</SelectItem>
                      <SelectItem value="2">2 - Baixo</SelectItem>
                      <SelectItem value="3">3 - Normal</SelectItem>
                      <SelectItem value="4">4 - Alto</SelectItem>
                      <SelectItem value="5">5 - Muito alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comments">Observações</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  placeholder="Observações sobre seu progresso, dificuldades ou sensações"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
              >
                Registrar Avaliação
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="history">
            {previousAssessments.length > 0 ? (
              <div className="space-y-4">
                {previousAssessments.map((assessment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Avaliação de {new Date(assessment.date).toLocaleDateString('pt-BR')}</h3>
                      {index > 0 && (
                        <div className="text-xs">
                          <span className={previousAssessments[index-1].weight > assessment.weight ? "text-green-500" : "text-red-500"}>
                            {(parseFloat(previousAssessments[index-1].weight) - parseFloat(assessment.weight)).toFixed(1)} kg
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Peso:</span>
                        <span className="font-medium">{assessment.weight} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Gordura corporal:</span>
                        <span className="font-medium">{assessment.bodyFat}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Energia:</span>
                        <span className={`font-medium ${getScoreColor(assessment.energy)}`}>
                          {getScoreLabel(assessment.energy)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Sono:</span>
                        <span className={`font-medium ${getScoreColor(assessment.sleep)}`}>
                          {getScoreLabel(assessment.sleep)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estresse:</span>
                        <span className={`font-medium ${getScoreColor(assessment.stress, true)}`}>
                          {getScoreLabel(assessment.stress)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Dores musculares:</span>
                        <span className={`font-medium ${getScoreColor(assessment.soreness, true)}`}>
                          {getScoreLabel(assessment.soreness)}
                        </span>
                      </div>
                    </div>
                    
                    {assessment.comments && (
                      <div className="text-sm border-t pt-2 mt-2">
                        <span className="text-gray-500 block mb-1">Observações:</span>
                        <p>{assessment.comments}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">
                Nenhuma avaliação anterior registrada.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
