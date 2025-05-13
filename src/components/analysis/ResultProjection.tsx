
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Scale } from "lucide-react";

interface ResultProjectionProps {
  originalPhotoUrl: string;
}

export function ResultProjection({ originalPhotoUrl }: ResultProjectionProps) {
  const [weightLoss, setWeightLoss] = useState([5]);
  const [processingImage, setProcessingImage] = useState(false);
  const [projectedImageUrl, setProjectedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateProjection = () => {
    setProcessingImage(true);
    
    // Simulando o processamento da imagem
    setTimeout(() => {
      // Em um caso real, aqui teríamos uma chamada para uma API que processaria a imagem
      // Por enquanto, apenas simulamos o resultado aplicando um filtro CSS à imagem
      setProjectedImageUrl(originalPhotoUrl);
      setProcessingImage(false);
      
      toast({
        title: "Projeção gerada",
        description: `Visualização de como você ficará perdendo ${weightLoss[0]}kg.`,
      });
    }, 2000);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Scale className="h-5 w-5 mr-2" />
          Projeção de Resultados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Visualize como seu corpo pode ficar após perder peso. Escolha a quantidade de quilos e 
            gere uma projeção baseada na sua foto atual.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Perda de peso desejada:</span>
              <span className="text-sm font-bold text-corpoideal-purple">{weightLoss[0]} kg</span>
            </div>
            <Slider
              value={weightLoss}
              onValueChange={setWeightLoss}
              min={1}
              max={20}
              step={1}
              className="py-4"
            />
          </div>
          
          <Button 
            onClick={handleGenerateProjection}
            disabled={processingImage}
            className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
          >
            {processingImage ? "Processando..." : "Gerar Projeção"}
          </Button>
          
          {projectedImageUrl && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Projeção com -{weightLoss[0]}kg:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1 text-center">Original</p>
                  <img 
                    src={originalPhotoUrl} 
                    alt="Foto original"
                    className="rounded-lg w-full object-cover h-48"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 text-center">Projeção</p>
                  <img 
                    src={projectedImageUrl} 
                    alt="Projeção"
                    className="rounded-lg w-full object-cover h-48 filter contrast-105 brightness-110 saturate-105"
                    style={{ transform: `scale(0.${95 - weightLoss[0]})` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Esta é uma simulação aproximada. Os resultados reais podem variar.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
