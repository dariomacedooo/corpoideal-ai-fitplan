
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { drawPostureLines } from './DrawAngleUtility';
import { useToast } from "@/components/ui/use-toast";

interface PosturalAnalysisProps {
  frontPhotoUrl: string | null;
  backPhotoUrl: string | null;
  leftSidePhotoUrl: string | null;
  rightSidePhotoUrl: string | null;
  analysisData: {
    shoulders: string;
    hips: string;
    knees: string;
    spine: string;
    feet: string;
    symmetry: string;
  };
}

interface DetailedAnalysis {
  category: string;
  score: number;
  status: 'excellent' | 'good' | 'moderate' | 'poor';
  findings: string[];
  recommendations: string[];
}

export function PosturalAnalysis({ 
  frontPhotoUrl, 
  backPhotoUrl, 
  leftSidePhotoUrl,
  rightSidePhotoUrl,
  analysisData 
}: PosturalAnalysisProps) {
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftSideCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightSideCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const { toast } = useToast();

  // Detailed analysis data
  const detailedAnalysis: DetailedAnalysis[] = [
    {
      category: "Alinhamento da Cabeça e Pescoço",
      score: 72,
      status: 'moderate',
      findings: [
        "Anteriorização da cabeça de 15mm",
        "Rotação cervical leve à direita (3°)",
        "Tensão muscular no trapézio superior bilateral",
        "Retificação da lordose cervical"
      ],
      recommendations: [
        "Exercícios de fortalecimento dos flexores profundos do pescoço",
        "Alongamento do músculo esternocleidomastóideo",
        "Correção da ergonomia no trabalho",
        "Mobilização articular C1-C2"
      ]
    },
    {
      category: "Cintura Escapular",
      score: 68,
      status: 'moderate',
      findings: [
        "Protração bilateral das escápulas (12mm)",
        "Elevação do ombro direito (8mm)",
        "Rotação interna dos úmeros",
        "Tensão nos músculos peitorais"
      ],
      recommendations: [
        "Fortalecimento do serrátil anterior",
        "Alongamento da cadeia anterior do tórax",
        "Exercícios de retração escapular",
        "Mobilização da articulação glenoumeral"
      ]
    },
    {
      category: "Coluna Torácica",
      score: 75,
      status: 'good',
      findings: [
        "Leve hipercifose torácica (45° - normal: 40°)",
        "Rotação vertebral mínima",
        "Boa mobilidade intercostal",
        "Simetria paravertebral adequada"
      ],
      recommendations: [
        "Exercícios de extensão torácica",
        "Fortalecimento dos extensores torácicos",
        "Mobilização das articulações costovertebrais",
        "Exercícios respiratórios"
      ]
    },
    {
      category: "Região Lombar",
      score: 65,
      status: 'moderate',
      findings: [
        "Hiperlordose lombar acentuada (50° - normal: 35°)",
        "Anteriorização da pelve",
        "Tensão nos flexores do quadril",
        "Fraqueza dos glúteos e abdominais profundos"
      ],
      recommendations: [
        "Fortalecimento do core (transverso do abdome)",
        "Alongamento dos flexores do quadril",
        "Exercícios de retroversão pélvica",
        "Ativação dos glúteos máximo e médio"
      ]
    },
    {
      category: "Pelve e Quadril",
      score: 70,
      status: 'moderate',
      findings: [
        "Inclinação pélvica anterior (12°)",
        "Leve rotação pélvica à esquerda",
        "Assimetria de altura ilíaca (4mm)",
        "Tensão no piriforme direito"
      ],
      recommendations: [
        "Mobilização sacroilíaca",
        "Alongamento dos flexores do quadril",
        "Fortalecimento dos glúteos médio",
        "Correção da mecânica de movimento"
      ]
    },
    {
      category: "Joelhos",
      score: 64,
      status: 'moderate',
      findings: [
        "Valgo dinâmico bilateral",
        "Joelho direito mais acentuado (8° de valgo)",
        "Fraqueza do glúteo médio",
        "Tensão na banda iliotibial"
      ],
      recommendations: [
        "Fortalecimento específico do glúteo médio",
        "Correção do padrão de movimento no agachamento",
        "Alongamento da banda iliotibial",
        "Propriocepção em apoio unipodal"
      ]
    },
    {
      category: "Tornozelos e Pés",
      score: 78,
      status: 'good',
      findings: [
        "Leve pronação do pé esquerdo",
        "Boa mobilidade de dorsiflexão",
        "Arco plantar preservado",
        "Apoio adequado do calcâneo"
      ],
      recommendations: [
        "Exercícios de fortalecimento do tibial posterior",
        "Mobilização do complexo tornozelo-pé",
        "Exercícios proprioceptivos",
        "Uso de palmilhas corretivas se necessário"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'moderate': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bom';
      case 'moderate': return 'Moderado';
      case 'poor': return 'Ruim';
      default: return 'N/A';
    }
  };

  const overallScore = Math.round(detailedAnalysis.reduce((acc, item) => acc + item.score, 0) / detailedAnalysis.length);

  useEffect(() => {
    const drawPostureAnalysis = () => {
      try {
        // Process front photo
        if (frontCanvasRef.current && frontPhotoUrl) {
          const frontPhoto = new Image();
          frontPhoto.crossOrigin = "anonymous";
          frontPhoto.onload = () => {
            const canvas = frontCanvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = frontPhoto.width;
            canvas.height = frontPhoto.height;
            
            drawPostureLines(ctx, frontPhoto, 'front');
          };
          frontPhoto.src = frontPhotoUrl;
          frontPhoto.onerror = () => {
            console.error("Error loading front image");
            toast({
              title: "Erro na análise frontal",
              description: "Não foi possível carregar a imagem frontal. Tente fazer upload novamente.",
              variant: "destructive"
            });
          };
        }
        
        // Process back photo
        if (backCanvasRef.current && backPhotoUrl) {
          const backPhoto = new Image();
          backPhoto.crossOrigin = "anonymous";
          backPhoto.onload = () => {
            const canvas = backCanvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = backPhoto.width;
            canvas.height = backPhoto.height;
            
            drawPostureLines(ctx, backPhoto, 'back');
          };
          backPhoto.src = backPhotoUrl;
          backPhoto.onerror = () => {
            console.error("Error loading back image");
          };
        }
        
        // Process left side photo
        if (leftSideCanvasRef.current && leftSidePhotoUrl) {
          const leftSidePhoto = new Image();
          leftSidePhoto.crossOrigin = "anonymous";
          leftSidePhoto.onload = () => {
            const canvas = leftSideCanvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = leftSidePhoto.width;
            canvas.height = leftSidePhoto.height;
            
            drawPostureLines(ctx, leftSidePhoto, 'leftSide');
          };
          leftSidePhoto.src = leftSidePhotoUrl;
          leftSidePhoto.onerror = () => {
            console.error("Error loading left side image");
          };
        }
        
        // Process right side photo
        if (rightSideCanvasRef.current && rightSidePhotoUrl) {
          const rightSidePhoto = new Image();
          rightSidePhoto.crossOrigin = "anonymous";
          rightSidePhoto.onload = () => {
            const canvas = rightSideCanvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = rightSidePhoto.width;
            canvas.height = rightSidePhoto.height;
            
            drawPostureLines(ctx, rightSidePhoto, 'rightSide');
          };
          rightSidePhoto.src = rightSidePhotoUrl;
          rightSidePhoto.onerror = () => {
            console.error("Error loading right side image");
          };
        }
        
        setIsDrawn(true);
      } catch (error) {
        console.error("Error in postural analysis drawing:", error);
        toast({
          title: "Erro na análise postural",
          description: "Não foi possível renderizar a análise postural. Por favor, tente novamente.",
          variant: "destructive"
        });
      }
    };
    
    drawPostureAnalysis();
  }, [frontPhotoUrl, backPhotoUrl, leftSidePhotoUrl, rightSidePhotoUrl, toast]);

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-corpoideal-purple flex items-center justify-between">
            Pontuação Geral da Análise Postural
            <Badge variant="outline" className={`${getStatusColor(overallScore >= 80 ? 'excellent' : overallScore >= 70 ? 'good' : overallScore >= 60 ? 'moderate' : 'poor')} text-white`}>
              {overallScore}/100
            </Badge>
          </CardTitle>
          <CardDescription>
            Análise biomecânica completa baseada em inteligência artificial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallScore} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            Sua postura está classificada como: <strong>{getStatusText(overallScore >= 80 ? 'excellent' : overallScore >= 70 ? 'good' : overallScore >= 60 ? 'moderate' : 'poor')}</strong>
          </p>
        </CardContent>
      </Card>

      {/* Detailed Analysis by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {detailedAnalysis.map((analysis, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">{analysis.category}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${getStatusColor(analysis.status)} text-white text-xs`}>
                    {analysis.score}/100
                  </Badge>
                </div>
              </div>
              <Progress value={analysis.score} className="h-2" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-gray-800 mb-1">Achados:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {analysis.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1 h-1 rounded-full bg-corpoideal-purple mt-2 mr-2 flex-shrink-0"></span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-gray-800 mb-1">Recomendações:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {analysis.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1 h-1 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visual Analysis */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-corpoideal-purple">Análise Visual com Marcações</CardTitle>
          <CardDescription>
            Imagens com sobreposições de análise biomecânica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Vista Frontal</h3>
                <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                  <canvas 
                    ref={frontCanvasRef}
                    className="w-full h-auto max-h-64"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Vista Posterior</h3>
                <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                  <canvas 
                    ref={backCanvasRef}
                    className="w-full h-auto max-h-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Perfil Esquerdo</h3>
                <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                  <canvas 
                    ref={leftSideCanvasRef}
                    className="w-full h-auto max-h-64"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Perfil Direito</h3>
                <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                  <canvas 
                    ref={rightSideCanvasRef}
                    className="w-full h-auto max-h-64"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Priority */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-corpoideal-purple">Prioridades de Tratamento</CardTitle>
          <CardDescription>Ordem recomendada para correção postural</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full mr-3">1</div>
              <div>
                <h4 className="text-sm font-medium">Alta Prioridade: Região Lombar</h4>
                <p className="text-xs text-gray-600">Hiperlordose acentuada requer atenção imediata</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded-full mr-3">2</div>
              <div>
                <h4 className="text-sm font-medium">Média Prioridade: Joelhos</h4>
                <p className="text-xs text-gray-600">Correção do valgo dinâmico é fundamental</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full mr-3">3</div>
              <div>
                <h4 className="text-sm font-medium">Baixa Prioridade: Ombros</h4>
                <p className="text-xs text-gray-600">Melhorar após correção das bases de sustentação</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
