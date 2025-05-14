
import React, { useRef, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

interface MuscleProjection3DProps {
  bodyPart: string;
  gainAmount: number;
  userImage: string;
}

export function MuscleProjection3D({ bodyPart, gainAmount, userImage }: MuscleProjection3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Este é um componente de placeholder para a visualização 3D
  // Em uma implementação real, aqui seria integrada a biblioteca Three.js ou similar
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha um gradiente de fundo
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenha a silhueta base
    drawBaseSilhouette(context, canvas.width, canvas.height);
    
    // Desenha a forma do músculo (com ganho de massa aplicado)
    context.beginPath();
    
    // Diferentes formas dependendo da parte do corpo
    switch(bodyPart) {
      case 'chest':
        drawChest(context, canvas.width, canvas.height, gainAmount);
        break;
      case 'abs':
        drawAbs(context, canvas.width, canvas.height, gainAmount);
        break;
      case 'shoulders':
        drawShoulders(context, canvas.width, canvas.height, gainAmount);
        break;
      case 'arms':
        drawArms(context, canvas.width, canvas.height, gainAmount);
        break;
      case 'legs':
        drawLegs(context, canvas.width, canvas.height, gainAmount);
        break;
      default:
        drawFullBody(context, canvas.width, canvas.height, gainAmount);
    }
    
    // Adiciona um texto
    context.fillStyle = '#6b21a8'; // Cor roxa
    context.font = '16px sans-serif';
    context.textAlign = 'center';
    context.fillText(`Projeção: +${gainAmount}kg`, canvas.width/2, 30);
    
    // Adiciona informações sobre a área
    context.fillStyle = '#374151';
    context.font = '14px sans-serif';
    context.fillText(`Área: ${getBodyPartName(bodyPart)}`, canvas.width/2, canvas.height - 20);

    // Desenha uma linha de comparação antes/depois
    drawComparisonLine(context, canvas.width, canvas.height);

  }, [bodyPart, gainAmount, userImage]);
  
  // Desenha uma silhueta base (antes do ganho)
  const drawBaseSilhouette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#cbd5e1'; // Cor cinza mais clara
    
    // Cabeça
    ctx.beginPath();
    ctx.arc(width/2, height/4, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Tronco
    ctx.beginPath();
    ctx.roundRect(width/2 - 45, height/4 + 30, 90, 120, 10);
    ctx.fill();
    
    // Braços
    ctx.beginPath();
    ctx.roundRect(width/2 - 90, height/4 + 40, 40, 100, 20);
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(width/2 + 50, height/4 + 40, 40, 100, 20);
    ctx.fill();
    
    // Pernas
    ctx.beginPath();
    ctx.roundRect(width/2 - 40, height/4 + 150, 35, 120, 10);
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(width/2 + 5, height/4 + 150, 35, 120, 10);
    ctx.fill();
  };
  
  // Desenha uma linha de comparação
  const drawComparisonLine = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width/2, 50);
    ctx.lineTo(width/2, height - 40);
    ctx.stroke();
    
    ctx.font = '12px sans-serif';
    ctx.fillStyle = "#64748b";
    ctx.textAlign = 'center';
    ctx.fillText("Antes", width/2 - 40, height/2);
    ctx.fillText("Depois", width/2 + 40, height/2);
    ctx.setLineDash([]);
  };
  
  const getBodyPartName = (part: string): string => {
    switch(part) {
      case 'chest': return 'Peitoral';
      case 'abs': return 'Abdômen';
      case 'shoulders': return 'Ombros';
      case 'arms': return 'Braços';
      case 'legs': return 'Pernas';
      default: return 'Corpo Completo';
    }
  };

  const drawChest = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Increased effect
    ctx.fillStyle = '#8b5cf6';
    
    // Original chest position (for reference)
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(width/2 - 40, height/2, 70, 50, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 40, height/2, 70, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Enhanced chest with gain
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.ellipse(width/2 - 40, height/2, 70 * multiplier, 50 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width/2 + 40, height/2, 70 * multiplier, 50 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  };
  
  const drawAbs = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Increased effect
    
    // Original abs position (for reference)
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        ctx.roundRect(
          width/2 - 40 + j*30, 
          height/2 - 50 + i*35, 
          25, 
          30, 
          5
        );
        ctx.fill();
      }
    }
    
    // Enhanced abs with gain
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        ctx.roundRect(
          width/2 - 40 + j*30, 
          height/2 - 50 + i*35, 
          25 * multiplier, 
          30, 
          5
        );
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1.0;
  };
  
  const drawShoulders = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Increased effect
    
    // Original shoulders position (for reference)
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(width/2 - 75, height/2 - 30, 40, 30, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 75, height/2 - 30, 40, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Enhanced shoulders with gain
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.ellipse(width/2 - 75, height/2 - 30, 40 * multiplier, 30 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width/2 + 75, height/2 - 30, 40 * multiplier, 30 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  };
  
  const drawArms = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Increased effect
    
    // Original arms position (for reference)
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.3;
    // Biceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 80, height/2, 25, 50, Math.PI/4, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 80, height/2, 25, 50, -Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Triceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 90, height/2 + 20, 20, 40, Math.PI/3, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 90, height/2 + 20, 20, 40, -Math.PI/3, 0, Math.PI * 2);
    ctx.fill();
    
    // Enhanced arms with gain
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.8;
    // Biceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 80, height/2, 25 * multiplier, 50 * multiplier, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width/2 + 80, height/2, 25 * multiplier, 50 * multiplier, -Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Triceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 90, height/2 + 20, 20 * multiplier, 40 * multiplier, Math.PI/3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width/2 + 90, height/2 + 20, 20 * multiplier, 40 * multiplier, -Math.PI/3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  };
  
  const drawLegs = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Increased effect
    
    // Original legs position (for reference)
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.3;
    // Quadriceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 30, height/2 + 30, 25, 70, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 30, height/2 + 30, 25, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Panturrilhas
    ctx.beginPath();
    ctx.ellipse(width/2 - 30, height/2 + 110, 15, 30, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 30, height/2 + 110, 15, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Enhanced legs with gain
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.8;
    // Quadriceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 30, height/2 + 30, 25 * multiplier, 70 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width/2 + 30, height/2 + 30, 25 * multiplier, 70 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Panturrilhas
    ctx.beginPath();
    ctx.ellipse(width/2 - 30, height/2 + 110, 15 * multiplier, 30 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width/2 + 30, height/2 + 110, 15 * multiplier, 30 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  };
  
  const drawFullBody = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Increased effect
    
    // Original body position (for reference)
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.3;
    
    // Cabeça
    ctx.beginPath();
    ctx.arc(width/2, height/4, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Tronco
    ctx.beginPath();
    ctx.roundRect(width/2 - 45, height/4 + 30, 90, 120, 10);
    ctx.fill();
    
    // Braços
    ctx.beginPath();
    ctx.roundRect(width/2 - 90, height/4 + 40, 40, 100, 20);
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(width/2 + 50, height/4 + 40, 40, 100, 20);
    ctx.fill();
    
    // Pernas
    ctx.beginPath();
    ctx.roundRect(width/2 - 40, height/4 + 150, 35, 120, 10);
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(width/2 + 5, height/4 + 150, 35, 120, 10);
    ctx.fill();
    
    // Enhanced body with gain
    ctx.fillStyle = '#8b5cf6';
    ctx.globalAlpha = 0.8;
    
    // Cabeça
    ctx.beginPath();
    ctx.arc(width/2, height/4, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Tronco
    ctx.beginPath();
    ctx.roundRect(width/2 - 45 * multiplier, height/4 + 30, 90 * multiplier, 120, 10);
    ctx.fill();
    
    // Braços
    ctx.beginPath();
    ctx.roundRect(width/2 - 90 * multiplier, height/4 + 40, 40 * multiplier, 100, 20);
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(width/2 + 50, height/4 + 40, 40 * multiplier, 100, 20);
    ctx.fill();
    
    // Pernas
    ctx.beginPath();
    ctx.roundRect(width/2 - 40 * multiplier, height/4 + 150, 35 * multiplier, 120, 10);
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(width/2 + 5, height/4 + 150, 35 * multiplier, 120, 10);
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg text-corpoideal-purple flex items-center">
          <Dumbbell className="h-4 w-4 mr-2" />
          Projeção 3D de Ganho Muscular
        </CardTitle>
        <CardDescription>
          Visualização aproximada do ganho muscular em {getBodyPartName(bodyPart).toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={4/3} className="bg-muted">
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={300}
            className="w-full h-full rounded-md"
          />
        </AspectRatio>
        
        <p className="text-xs text-center mt-2 text-gray-500">
          * Esta é uma visualização simplificada. Um modelo 3D completo estaria disponível na versão final do produto.
        </p>
      </CardContent>
    </Card>
  );
}
