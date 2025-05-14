
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Scale, Dumbbell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MuscleProjection3D } from "./MuscleProjection3D";

interface ResultProjectionProps {
  originalPhotoUrl: string;
}

export function ResultProjection({ originalPhotoUrl }: ResultProjectionProps) {
  const [weightLoss, setWeightLoss] = useState([5]);
  const [muscleMass, setMuscleMass] = useState([5]);
  const [processingImage, setProcessingImage] = useState(false);
  const [projectedImageUrl, setProjectedImageUrl] = useState<string | null>(null);
  const [projectionType, setProjectionType] = useState<'weightLoss' | 'muscleGain'>('weightLoss');
  const [targetArea, setTargetArea] = useState<string>('full');
  const { toast } = useToast();

  const handleGenerateProjection = () => {
    setProcessingImage(true);
    
    // Simulando o processamento da imagem
    setTimeout(() => {
      // Em um caso real, aqui teríamos uma chamada para uma API que processaria a imagem
      // Por enquanto, apenas simulamos o resultado aplicando transformações à imagem
      setProjectedImageUrl(originalPhotoUrl);
      setProcessingImage(false);
      
      if (projectionType === 'weightLoss') {
        toast({
          title: "Projeção gerada",
          description: `Visualização de como você ficará perdendo ${weightLoss[0]}kg.`,
        });
      } else {
        toast({
          title: "Projeção gerada",
          description: `Visualização de como você ficará ganhando ${muscleMass[0]}kg de massa muscular${targetArea !== 'full' ? ` no ${getTargetAreaName(targetArea)}` : ''}.`,
        });
      }
    }, 1500);
  };

  const getTargetAreaName = (area: string) => {
    switch (area) {
      case 'chest': return 'peitoral';
      case 'abs': return 'abdômen';
      case 'shoulders': return 'ombros';
      case 'arms': return 'braços';
      case 'legs': return 'pernas';
      default: return 'corpo todo';
    }
  };

  // Função para aplicar transformações realistas para perda de peso
  const getWeightLossStyle = () => {
    const lossPercentage = weightLoss[0];
    const scaleValue = Math.max(0.85, 1 - (lossPercentage / 40));
    
    return {
      filter: `contrast(${100 + lossPercentage * 1.5}%) saturate(${Math.max(100, 110 - lossPercentage * 2)}%)`,
      transform: `scale(${scaleValue})`,
      transition: 'all 0.3s ease',
      width: `${100 - lossPercentage * 2}%`, // Redução proporcional à perda de peso
      margin: `0 ${lossPercentage}%`, // Centraliza após redução
      borderRadius: `${lossPercentage * 0.5}px`, // Suavização das bordas com a perda de peso
    };
  };

  // Função para aplicar transformações realistas para ganho muscular
  const getMuscleGainStyle = () => {
    const gainAmount = muscleMass[0];
    const muscleEnhancement = gainAmount * 2.5;
    
    return {
      filter: `contrast(${110 + muscleEnhancement}%) brightness(105%) saturate(${110 + muscleEnhancement}%)`,
      transform: targetArea !== 'full' ? 'none' : `scale(${Math.min(1.15, 1 + (gainAmount / 50))})`,
      transition: 'all 0.3s ease',
      boxShadow: `0 0 ${gainAmount}px rgba(0,0,0,0.3)`, // Sombra para dar impressão de volume
    };
  };

  // Estilo específico para máscaras de áreas do corpo
  const getMaskStyle = () => {
    if (projectionType === 'muscleGain') {
      const gainAmount = muscleMass[0];
      const muscleEnhancement = gainAmount * 4; // Efeito aumentado para áreas específicas
      
      // Configurações específicas para diferentes grupos musculares
      let areaSpecificStyle = {};
      switch(targetArea) {
        case 'chest':
          areaSpecificStyle = {
            transform: `scale(${1 + (gainAmount / 30)})`,
            borderRadius: `${gainAmount}px`,
          };
          break;
        case 'arms':
          areaSpecificStyle = {
            transform: `scale(${1 + (gainAmount / 25)})`,
            borderRadius: `${gainAmount * 1.5}px`,
          };
          break;
        case 'legs':
          areaSpecificStyle = {
            transform: `scale(${1 + (gainAmount / 35)})`,
            width: `${100 + gainAmount * 2}%`,
          };
          break;
        case 'shoulders':
          areaSpecificStyle = {
            transform: `scale(${1 + (gainAmount / 28)})`,
            width: `${100 + gainAmount * 2.5}%`,
          };
          break;
        case 'abs':
          areaSpecificStyle = {
            transform: `scale(${1 + (gainAmount / 40)})`,
            filter: `contrast(${130 + muscleEnhancement}%) brightness(${110 + muscleEnhancement / 2}%)`,
          };
          break;
        default:
          areaSpecificStyle = {};
      }
      
      return {
        filter: `contrast(${120 + muscleEnhancement}%) brightness(${105 + muscleEnhancement / 3}%) saturate(${120 + muscleEnhancement}%)`,
        transition: 'all 0.3s ease',
        ...areaSpecificStyle,
      };
    }
    
    return {};
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          {projectionType === 'weightLoss' ? (
            <Scale className="h-5 w-5 mr-2" />
          ) : (
            <Dumbbell className="h-5 w-5 mr-2" />
          )}
          Projeção de Resultados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Visualize como seu corpo pode ficar após perder peso ou ganhar massa muscular.
          </p>
          
          <Tabs defaultValue="weightLoss" onValueChange={(value) => setProjectionType(value as 'weightLoss' | 'muscleGain')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weightLoss" className="text-sm">Perda de Peso</TabsTrigger>
              <TabsTrigger value="muscleGain" className="text-sm">Ganho de Massa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weightLoss" className="space-y-4 mt-2">
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
            </TabsContent>
            
            <TabsContent value="muscleGain" className="space-y-4 mt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Ganho de massa desejado:</span>
                  <span className="text-sm font-bold text-corpoideal-purple">{muscleMass[0]} kg</span>
                </div>
                <Slider
                  value={muscleMass}
                  onValueChange={setMuscleMass}
                  min={1}
                  max={15}
                  step={1}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Área de foco:</span>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={targetArea === 'full' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTargetArea('full')}
                    className="text-xs"
                  >
                    Corpo todo
                  </Button>
                  <Button 
                    variant={targetArea === 'chest' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTargetArea('chest')}
                    className="text-xs"
                  >
                    Peitoral
                  </Button>
                  <Button 
                    variant={targetArea === 'abs' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTargetArea('abs')}
                    className="text-xs"
                  >
                    Abdômen
                  </Button>
                  <Button 
                    variant={targetArea === 'shoulders' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTargetArea('shoulders')}
                    className="text-xs"
                  >
                    Ombros
                  </Button>
                  <Button 
                    variant={targetArea === 'arms' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTargetArea('arms')}
                    className="text-xs"
                  >
                    Braços
                  </Button>
                  <Button 
                    variant={targetArea === 'legs' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTargetArea('legs')}
                    className="text-xs"
                  >
                    Pernas
                  </Button>
                </div>
              </div>

              {/* Adicionando o componente 3D para melhor visualização do ganho muscular */}
              <MuscleProjection3D 
                bodyPart={targetArea}
                gainAmount={muscleMass[0]}
                userImage={originalPhotoUrl}
              />
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleGenerateProjection}
            disabled={processingImage}
            className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
          >
            {processingImage ? "Processando..." : "Gerar Projeção"}
          </Button>
          
          {projectedImageUrl && projectionType === 'weightLoss' && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">
                Projeção com -{weightLoss[0]}kg:
              </h3>
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
                  <div className="relative flex items-center justify-center h-48 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={projectedImageUrl} 
                      alt="Projeção"
                      className="rounded-lg object-cover h-48"
                      style={getWeightLossStyle()}
                    />
                    {/* Overlay com informações de perda */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
                      <p className="text-xs text-white font-medium">-{weightLoss[0]}kg</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-corpoideal-purple mb-2">Dicas para atingir esse resultado:</h4>
                <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                  <li>Déficit calórico de aproximadamente 500 calorias por dia</li>
                  <li>30-45 minutos de exercício cardiovascular 4-5x por semana</li>
                  <li>Treino de resistência para preservar massa muscular</li>
                  <li>Dieta rica em proteínas e com baixo teor de açúcares refinados</li>
                </ul>
              </div>
            </div>
          )}

          {projectedImageUrl && projectionType === 'muscleGain' && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">
                Projeção com +{muscleMass[0]}kg de massa muscular{targetArea !== 'full' ? ` no ${getTargetAreaName(targetArea)}` : ''}:
              </h3>
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
                  <div className="relative flex items-center justify-center h-48 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={projectedImageUrl} 
                      alt="Projeção"
                      className={`rounded-lg object-cover h-48 ${targetArea === 'full' ? '' : 'base-image'}`}
                      style={targetArea === 'full' ? getMuscleGainStyle() : {}}
                    />
                    
                    {/* Overlay para destacar áreas específicas com efeito mais pronunciado */}
                    {targetArea !== 'full' && (
                      <div 
                        className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg"
                        style={{
                          WebkitMaskImage: `url('/muscle-masks/${targetArea}.png')`,
                          maskImage: `url('/muscle-masks/${targetArea}.png')`,
                          WebkitMaskSize: 'cover',
                          maskSize: 'cover',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          backgroundColor: 'transparent',
                          ...getMaskStyle()
                        }}
                      >
                        <img 
                          src={projectedImageUrl} 
                          alt={`Projeção ${getTargetAreaName(targetArea)}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Overlay com informações de ganho */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
                      <p className="text-xs text-white font-medium">+{muscleMass[0]}kg de massa muscular</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-corpoideal-purple mb-2">Dicas para atingir esse resultado:</h4>
                <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                  <li>Superávit calórico de aproximadamente 300-500 calorias por dia</li>
                  <li>Consumo de proteína de 1.6-2g por kg de peso corporal</li>
                  <li>Treino de hipertrofia com foco em {targetArea === 'full' ? 'corpo completo' : getTargetAreaName(targetArea)}</li>
                  <li>Descanso adequado de 7-9h por noite para recuperação muscular</li>
                  {targetArea !== 'full' && (
                    <li>Exercícios específicos para {getTargetAreaName(targetArea)}, como {getExampleExercises(targetArea)}</li>
                  )}
                </ul>
              </div>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Esta é uma simulação aproximada. Os resultados reais podem variar conforme genética e disciplina.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Função auxiliar para exemplos de exercícios específicos
function getExampleExercises(bodyPart: string): string {
  switch(bodyPart) {
    case 'chest': return 'supino reto, supino inclinado e crucifixo';
    case 'abs': return 'prancha, crunch abdominal e elevação de pernas';
    case 'shoulders': return 'desenvolvimento, elevação lateral e frontal';
    case 'arms': return 'rosca direta, tríceps testa e rosca concentrada';
    case 'legs': return 'agachamento, leg press e cadeira extensora';
    default: return 'treino completo de corpo';
  }
}
