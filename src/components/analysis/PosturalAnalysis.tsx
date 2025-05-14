
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
            
            // Adjust canvas size to match image aspect ratio
            canvas.width = frontPhoto.width;
            canvas.height = frontPhoto.height;
            
            // Draw the analysis lines
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
            
            // Draw the analysis lines
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
            
            // Draw the analysis lines
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
            
            // Draw the analysis lines
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
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-corpoideal-purple">Análise Postural Detalhada</CardTitle>
        <CardDescription>
          Análise gerada por IA com base nas suas fotos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Vista Frontal</h3>
            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
              <canvas 
                ref={frontCanvasRef}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2">
                <p className="text-xs text-white">{analysisData.shoulders}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Vista Posterior</h3>
            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
              <canvas 
                ref={backCanvasRef}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2">
                <p className="text-xs text-white">{analysisData.spine}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Perfil Esquerdo</h3>
              <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                <canvas 
                  ref={leftSideCanvasRef}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2">
                  <p className="text-xs text-white">Postura anteriorizada</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Perfil Direito</h3>
              <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                <canvas 
                  ref={rightSideCanvasRef}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2">
                  <p className="text-xs text-white">Hiperlordose lombar</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-corpoideal-purple">Resumo da Análise Postural</h3>
            
            <div className="grid grid-cols-2 gap-y-3">
              <div>
                <h4 className="text-xs font-medium">Ombros:</h4>
                <p className="text-xs text-gray-600">{analysisData.shoulders}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium">Quadril:</h4>
                <p className="text-xs text-gray-600">{analysisData.hips}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium">Joelhos:</h4>
                <p className="text-xs text-gray-600">{analysisData.knees}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium">Coluna:</h4>
                <p className="text-xs text-gray-600">{analysisData.spine}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium">Pés:</h4>
                <p className="text-xs text-gray-600">{analysisData.feet}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium">Simetria:</h4>
                <p className="text-xs text-gray-600">{analysisData.symmetry}</p>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-200">
              <h4 className="text-xs font-medium">Recomendações:</h4>
              <ul className="text-xs text-gray-600 mt-1 ml-4 list-disc">
                <li>Exercícios de fortalecimento para correção da postura dos ombros</li>
                <li>Alongamentos específicos para melhorar a curvatura lombar</li>
                <li>Treino de núcleo para estabilização da coluna</li>
                <li>Exercícios específicos para alinhamento do quadril</li>
                <li>Fortalecimento de glúteos médio para melhorar alinhamento dos joelhos</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
