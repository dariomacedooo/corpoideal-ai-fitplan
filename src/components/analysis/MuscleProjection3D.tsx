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
  const userImageRef = useRef<HTMLImageElement | null>(null);
  
  // Este é um componente para a visualização 3D realista
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Cria uma imagem para a foto do usuário
    if (!userImageRef.current) {
      userImageRef.current = new Image();
      userImageRef.current.src = userImage;
      
      // Quando a imagem carregar, desenha o modelo 3D
      userImageRef.current.onload = () => {
        drawMuscleProjection(context, canvas.width, canvas.height, bodyPart, gainAmount, userImageRef.current);
      };
    } else {
      // Se a imagem já foi carregada, desenha o modelo 3D
      drawMuscleProjection(context, canvas.width, canvas.height, bodyPart, gainAmount, userImageRef.current);
    }
    
  }, [bodyPart, gainAmount, userImage]);
  
  const drawMuscleProjection = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    part: string, 
    gain: number,
    userImg: HTMLImageElement | null
  ) => {
    // Desenha um gradiente de fundo
    const gradient = ctx.createLinearGradient(0, 0, width, canvasRef.current!.width);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Se tivermos a imagem do usuário, use-a como base
    if (userImg && userImg.complete) {
      try {
        // Calcule o tamanho mantendo a proporção
        const aspectRatio = userImg.width / userImg.height;
        let drawWidth = width;
        let drawHeight = drawWidth / aspectRatio;
        
        if (drawHeight > height) {
          drawHeight = height;
          drawWidth = drawHeight * aspectRatio;
        }
        
        // Posicione a imagem no centro do canvas
        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;
        
        // Desenhe a imagem original com baixa opacidade
        ctx.globalAlpha = 0.2;
        ctx.drawImage(userImg, x, y, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
      } catch (error) {
        console.error("Erro ao desenhar imagem do usuário:", error);
      }
    }
    
    // Desenha a silhueta base
    drawBaseSilhouette(ctx, width, height);
    
    // Desenha a forma do músculo (com ganho de massa aplicado)
    ctx.beginPath();
    
    // Diferentes formas dependendo da parte do corpo com transformações realistas
    switch(part) {
      case 'chest':
        drawEnhancedChest(ctx, width, height, gain);
        break;
      case 'abs':
        drawEnhancedAbs(ctx, width, height, gain);
        break;
      case 'shoulders':
        drawEnhancedShoulders(ctx, width, height, gain);
        break;
      case 'arms':
        drawEnhancedArms(ctx, width, height, gain);
        break;
      case 'legs':
        drawEnhancedLegs(ctx, width, height, gain);
        break;
      default:
        drawEnhancedFullBody(ctx, width, height, gain);
    }
    
    // Adiciona um texto
    ctx.fillStyle = '#6b21a8'; // Cor roxa
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Projeção: +${gain}kg`, width/2, 30);
    
    // Adiciona informações sobre a área
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Área: ${getBodyPartName(part)}`, width/2, height - 20);

    // Desenha uma linha de comparação antes/depois
    drawComparisonLine(ctx, width, height);
  };
  
  // Desenha uma silhueta base (antes do ganho) ainda mais realista
  const drawBaseSilhouette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(203, 213, 225, 0.6)'; // Cor cinza mais clara com transparência
    
    // Cabeça - mais anatômica
    ctx.beginPath();
    ctx.arc(width/2, height/4, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Pescoço - adicionado para mais realismo
    ctx.beginPath();
    ctx.roundRect(width/2 - 15, height/4 + 30, 30, 20, 5);
    ctx.fill();
    
    // Tronco - mais anatômico
    ctx.beginPath();
    // Forma do tronco mais realista
    ctx.moveTo(width/2 - 45, height/4 + 50);
    ctx.bezierCurveTo(
      width/2 - 50, height/4 + 90, // ponto de controle 1
      width/2 - 50, height/4 + 130, // ponto de controle 2
      width/2 - 40, height/4 + 150 // ponto final
    );
    ctx.lineTo(width/2 + 40, height/4 + 150);
    ctx.bezierCurveTo(
      width/2 + 50, height/4 + 130, // ponto de controle 1
      width/2 + 50, height/4 + 90, // ponto de controle 2
      width/2 + 45, height/4 + 50 // ponto final
    );
    ctx.closePath();
    ctx.fill();
    
    // Braços - mais anatômicos
    ctx.beginPath();
    // Braço esquerdo
    ctx.moveTo(width/2 - 45, height/4 + 50);
    ctx.bezierCurveTo(
      width/2 - 65, height/4 + 70, // ponto de controle 1
      width/2 - 80, height/4 + 90, // ponto de controle 2
      width/2 - 70, height/4 + 140 // ponto final
    );
    ctx.lineTo(width/2 - 90, height/4 + 140);
    ctx.bezierCurveTo(
      width/2 - 100, height/4 + 90, // ponto de controle 1
      width/2 - 85, height/4 + 70, // ponto de controle 2
      width/2 - 65, height/4 + 50 // ponto final
    );
    ctx.closePath();
    ctx.fill();
    
    // Braço direito
    ctx.beginPath();
    ctx.moveTo(width/2 + 45, height/4 + 50);
    ctx.bezierCurveTo(
      width/2 + 65, height/4 + 70, // ponto de controle 1
      width/2 + 80, height/4 + 90, // ponto de controle 2
      width/2 + 70, height/4 + 140 // ponto final
    );
    ctx.lineTo(width/2 + 90, height/4 + 140);
    ctx.bezierCurveTo(
      width/2 + 100, height/4 + 90, // ponto de controle 1
      width/2 + 85, height/4 + 70, // ponto de controle 2
      width/2 + 65, height/4 + 50 // ponto final
    );
    ctx.closePath();
    ctx.fill();
    
    // Pernas - mais anatômicas
    ctx.beginPath();
    // Perna esquerda
    ctx.moveTo(width/2 - 40, height/4 + 150);
    ctx.bezierCurveTo(
      width/2 - 45, height/4 + 200, // ponto de controle 1
      width/2 - 45, height/4 + 250, // ponto de controle 2
      width/2 - 30, height/4 + 270 // ponto final
    );
    ctx.lineTo(width/2 - 10, height/4 + 270);
    ctx.bezierCurveTo(
      width/2 - 25, height/4 + 250, // ponto de controle 1
      width/2 - 25, height/4 + 200, // ponto de controle 2
      width/2 - 20, height/4 + 150 // ponto final
    );
    ctx.closePath();
    ctx.fill();
    
    // Perna direita
    ctx.beginPath();
    ctx.moveTo(width/2 + 40, height/4 + 150);
    ctx.bezierCurveTo(
      width/2 + 45, height/4 + 200, // ponto de controle 1
      width/2 + 45, height/4 + 250, // ponto de controle 2
      width/2 + 30, height/4 + 270 // ponto final
    );
    ctx.lineTo(width/2 + 10, height/4 + 270);
    ctx.bezierCurveTo(
      width/2 + 25, height/4 + 250, // ponto de controle 1
      width/2 + 25, height/4 + 200, // ponto de controle 2
      width/2 + 20, height/4 + 150 // ponto final
    );
    ctx.closePath();
    ctx.fill();
  };
  
  // Desenha uma linha de comparação com setas e indicações mais claras
  const drawComparisonLine = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width/2, 50);
    ctx.lineTo(width/2, height - 40);
    ctx.stroke();
    
    // Adiciona setas em cada lado
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(width/2 - 50, height/2 - 10);
    ctx.lineTo(width/2 - 40, height/2);
    ctx.lineTo(width/2 - 50, height/2 + 10);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width/2 + 50, height/2 - 10);
    ctx.lineTo(width/2 + 40, height/2);
    ctx.lineTo(width/2 + 50, height/2 + 10);
    ctx.stroke();
    
    // Texto mais claro e com fundo
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(width/2 - 60, height/2 - 10, 40, 20);
    ctx.fillRect(width/2 + 20, height/2 - 10, 40, 20);
    
    ctx.font = '12px sans-serif';
    ctx.fillStyle = "#334155";
    ctx.textAlign = 'center';
    ctx.fillText("Antes", width/2 - 40, height/2 + 5);
    ctx.fillText("Depois", width/2 + 40, height/2 + 5);
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

  // Funções de desenho melhoradas para cada parte do corpo
  const drawEnhancedChest = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 8); // Efeito mais realista
    
    // Peito antes do ganho (referência)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.beginPath();
    ctx.ellipse(width/2 - 25, height/3, 40, 30, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 25, height/3, 40, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Peito aprimorado com ganho muscular
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    // Peitoral esquerdo
    ctx.beginPath();
    ctx.ellipse(width/2 - 25, height/3, 40 * multiplier, 30 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    // Peitoral direito
    ctx.beginPath();
    ctx.ellipse(width/2 + 25, height/3, 40 * multiplier, 30 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Adicionando linhas de definição muscular
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Linha do meio do peito
    ctx.moveTo(width/2, height/4 + 30);
    ctx.lineTo(width/2, height/3 + 30);
    ctx.stroke();
    
    // Contornos laterais dos peitorais
    ctx.beginPath();
    ctx.moveTo(width/2 - 65 * multiplier, height/3);
    ctx.quadraticCurveTo(
      width/2 - 50 * multiplier, height/3 + 40 * multiplier,
      width/2, height/3 + 30
    );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width/2 + 65 * multiplier, height/3);
    ctx.quadraticCurveTo(
      width/2 + 50 * multiplier, height/3 + 40 * multiplier,
      width/2, height/3 + 30
    );
    ctx.stroke();
  };
  
  const drawEnhancedAbs = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 12); // Efeito mais realista para os abdominais
    
    // Posição central para os abdominais
    const absCenterX = width / 2;
    const absCenterY = height / 2;
    
    // Abdômen antes do ganho (referência)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        ctx.roundRect(
          absCenterX - 30 + j*30, 
          absCenterY - 40 + i*30, 
          25, 
          25, 
          5
        );
        ctx.fill();
      }
    }
    
    // Abdômen aprimorado com ganho muscular
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        ctx.roundRect(
          absCenterX - 30 + j*30, 
          absCenterY - 40 + i*30, 
          25 * multiplier, 
          25 * multiplier, 
          5 * multiplier
        );
        ctx.fill();
      }
    }
    
    // Linhas de definição abdominal
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.lineWidth = 2;
    
    // Linha central vertical
    ctx.beginPath();
    ctx.moveTo(absCenterX, absCenterY - 50);
    ctx.lineTo(absCenterX, absCenterY + 50);
    ctx.stroke();
    
    // Linhas horizontais de definição
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(absCenterX - 40 * multiplier, absCenterY - 40 + i*30);
      ctx.lineTo(absCenterX + 40 * multiplier, absCenterY - 40 + i*30);
      ctx.stroke();
    }
  };
  
  const drawEnhancedShoulders = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 7); // Efeito realista para ombros
    
    // Ombros antes do ganho (referência)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    // Ombro esquerdo
    ctx.beginPath();
    ctx.ellipse(width/2 - 60, height/3 - 10, 35, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    // Ombro direito
    ctx.beginPath();
    ctx.ellipse(width/2 + 60, height/3 - 10, 35, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Ombros aprimorados com ganho muscular
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    // Ombro esquerdo
    ctx.beginPath();
    ctx.ellipse(width/2 - 60, height/3 - 10, 35 * multiplier, 25 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    // Ombro direito
    ctx.beginPath();
    ctx.ellipse(width/2 + 60, height/3 - 10, 35 * multiplier, 25 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Adicione linhas de definição
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.lineWidth = 2;
    
    // Linhas para deltoides anterior
    ctx.beginPath();
    ctx.moveTo(width/2 - 40, height/3);
    ctx.quadraticCurveTo(
      width/2 - 60, height/3 - 20,
      width/2 - 80 * multiplier, height/3 - 10
    );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width/2 + 40, height/3);
    ctx.quadraticCurveTo(
      width/2 + 60, height/3 - 20,
      width/2 + 80 * multiplier, height/3 - 10
    );
    ctx.stroke();
  };
  
  const drawEnhancedArms = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 7); // Efeito realista para braços
    
    // Braços antes do ganho (referência)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    // Bíceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 70, height/2 - 20, 20, 35, Math.PI/6, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 70, height/2 - 20, 20, 35, -Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Tríceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 80, height/2 + 10, 15, 30, Math.PI/4, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 80, height/2 + 10, 15, 30, -Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Braços aprimorados com ganho muscular
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    // Bíceps esquerdo
    ctx.beginPath();
    ctx.ellipse(width/2 - 70, height/2 - 20, 20 * multiplier, 35 * multiplier, Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    // Bíceps direito
    ctx.beginPath();
    ctx.ellipse(width/2 + 70, height/2 - 20, 20 * multiplier, 35 * multiplier, -Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Tríceps esquerdo
    ctx.beginPath();
    ctx.ellipse(width/2 - 80, height/2 + 10, 15 * multiplier, 30 * multiplier, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    // Tríceps direito
    ctx.beginPath();
    ctx.ellipse(width/2 + 80, height/2 + 10, 15 * multiplier, 30 * multiplier, -Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Adicione linhas de definição
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.lineWidth = 1.5;
    
    // Separação entre bíceps e tríceps esquerdo
    ctx.beginPath();
    ctx.moveTo(width/2 - 90 * multiplier, height/2 - 30);
    ctx.quadraticCurveTo(
      width/2 - 75, height/2,
      width/2 - 90 * multiplier, height/2 + 30
    );
    ctx.stroke();
    
    // Separação entre bíceps e tríceps direito
    ctx.beginPath();
    ctx.moveTo(width/2 + 90 * multiplier, height/2 - 30);
    ctx.quadraticCurveTo(
      width/2 + 75, height/2,
      width/2 + 90 * multiplier, height/2 + 30
    );
    ctx.stroke();
  };
  
  const drawEnhancedLegs = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 9); // Efeito realista para pernas
    
    // Pernas antes do ganho (referência)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    // Quadríceps
    ctx.beginPath();
    ctx.ellipse(width/2 - 25, height/2 + 50, 20, 60, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 25, height/2 + 50, 20, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Panturrilhas
    ctx.beginPath();
    ctx.ellipse(width/2 - 25, height/2 + 130, 12, 25, 0, 0, Math.PI * 2);
    ctx.ellipse(width/2 + 25, height/2 + 130, 12, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Pernas aprimoradas com ganho muscular
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    // Quadríceps esquerdo
    ctx.beginPath();
    ctx.ellipse(width/2 - 25, height/2 + 50, 20 * multiplier, 60 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    // Quadríceps direito
    ctx.beginPath();
    ctx.ellipse(width/2 + 25, height/2 + 50, 20 * multiplier, 60 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Panturrilha esquerda
    ctx.beginPath();
    ctx.ellipse(width/2 - 25, height/2 + 130, 12 * multiplier, 25 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    // Panturrilha direita
    ctx.beginPath();
    ctx.ellipse(width/2 + 25, height/2 + 130, 12 * multiplier, 25 * multiplier, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Adicione linhas de definição
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.lineWidth = 1.5;
    
    // Definição do quadríceps
    ctx.beginPath();
    ctx.moveTo(width/2 - 15, height/2);
    ctx.lineTo(width/2 - 15, height/2 + 100);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width/2 + 15, height/2);
    ctx.lineTo(width/2 + 15, height/2 + 100);
    ctx.stroke();
    
    // Linha de separação das panturrilhas
    ctx.beginPath();
    ctx.moveTo(width/2 - 25, height/2 + 110);
    ctx.lineTo(width/2 - 25, height/2 + 150);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width/2 + 25, height/2 + 110);
    ctx.lineTo(width/2 + 25, height/2 + 150);
    ctx.stroke();
  };
  
  const drawEnhancedFullBody = (ctx: CanvasRenderingContext2D, width: number, height: number, gain: number) => {
    const multiplier = 1 + (gain / 10); // Efeito realista para corpo completo
    
    // Corpo antes do ganho (referência)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    // Silhueta simplificada
    ctx.beginPath();
    // Tronco
    ctx.roundRect(width/2 - 40, height/4 + 30, 80, 110, 10);
    ctx.fill();
    
    // Braços
    ctx.beginPath();
    ctx.roundRect(width/2 - 80, height/4 + 40, 35, 90, 10);
    ctx.roundRect(width/2 + 45, height/4 + 40, 35, 90, 10);
    ctx.fill();
    
    // Pernas
    ctx.beginPath();
    ctx.roundRect(width/2 - 35, height/4 + 140, 30, 110, 10);
    ctx.roundRect(width/2 + 5, height/4 + 140, 30, 110, 10);
    ctx.fill();
    
    // Corpo aprimorado com ganho muscular
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    // Tronco aprimorado
    ctx.beginPath();
    ctx.roundRect(
      width/2 - 40 * multiplier, 
      height/4 + 30, 
      80 * multiplier, 
      110, 
      10 * multiplier
    );
    ctx.fill();
    
    // Braços aprimorados
    ctx.beginPath();
    ctx.roundRect(
      width/2 - 80 * multiplier, 
      height/4 + 40, 
      35 * multiplier, 
      90, 
      10 * multiplier
    );
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(
      width/2 + 45, 
      height/4 + 40, 
      35 * multiplier, 
      90, 
      10 * multiplier
    );
    ctx.fill();
    
    // Pernas aprimoradas
    ctx.beginPath();
    ctx.roundRect(
      width/2 - 35 * multiplier, 
      height/4 + 140, 
      30 * multiplier, 
      110, 
      10 * multiplier
    );
    ctx.fill();
    
    ctx.beginPath();
    ctx.roundRect(
      width/2 + 5, 
      height/4 + 140, 
      30 * multiplier, 
      110, 
      10 * multiplier
    );
    ctx.fill();
    
    // Adicione linhas de definição
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.lineWidth = 1.5;
    
    // Linha central do corpo
    ctx.beginPath();
    ctx.moveTo(width/2, height/4 + 30);
    ctx.lineTo(width/2, height/4 + 140);
    ctx.stroke();
    
    // Linha de definição do peito
    ctx.beginPath();
    ctx.moveTo(width/2 - 40 * multiplier, height/3);
    ctx.quadraticCurveTo(
      width/2, height/3 + 20,
      width/2 + 40 * multiplier, height/3
    );
    ctx.stroke();
    
    // Linhas dos braços
    ctx.beginPath();
    ctx.moveTo(width/2 - 60 * multiplier, height/3 + 20);
    ctx.lineTo(width/2 - 60 * multiplier, height/2 + 20);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width/2 + 60 * multiplier, height/3 + 20);
    ctx.lineTo(width/2 + 60 * multiplier, height/2 + 20);
    ctx.stroke();
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
