import { useState, useEffect, useRef } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { GoalSelector } from "@/components/goals/GoalSelector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ResultProjection } from "@/components/analysis/ResultProjection";
import { MuscleProjection3D } from "@/components/analysis/MuscleProjection3D";
import { PhotosGallery } from "@/components/analysis/PhotosGallery";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { AnalysisActions } from "@/components/analysis/AnalysisActions";
import { BackButton } from "@/components/analysis/BackButton";
import { PosturalAnalysis } from "@/components/analysis/PosturalAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScientificAnalysis } from "@/components/analysis/ScientificAnalysis";

const AnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [showGoals, setShowGoals] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [show3DProjection, setShow3DProjection] = useState(false);
  const [showPostureAnalysis, setShowPostureAnalysis] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState('full');
  const [muscleGain, setMuscleGain] = useState(5);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState({
    posture: '',
    shoulders: '',
    hips: '',
    knees: '',
    spine: '',
    feet: '',
    fatPercentage: '',
    symmetry: '',
    bmi: '',
    measurements: {
      waist: '',
      chest: '',
      leftArm: '',
      rightArm: '',
      hips: '',
      leftThigh: '',
      rightThigh: '',
      leftCalf: '',
      rightCalf: '',
    }
  });
  
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftSideCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightSideCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      // Check if user has completed profile and uploaded photos
      const savedProfile = localStorage.getItem('userProfile');
      const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
      const backPhotoUrl = localStorage.getItem('backPhotoUrl');
      const leftSidePhotoUrl = localStorage.getItem('leftSidePhotoUrl');
      const rightSidePhotoUrl = localStorage.getItem('rightSidePhotoUrl');
      
      if (!savedProfile || !JSON.parse(savedProfile).profileCompleted) {
        toast({
          title: "Perfil incompleto",
          description: "Por favor, complete seu perfil antes de prosseguir.",
        });
        navigate('/profile');
        return;
      }
      
      if (!frontPhotoUrl) {
        toast({
          title: "Fotos necessárias",
          description: "Por favor, envie suas fotos antes de prosseguir.",
        });
        navigate('/upload');
        return;
      }
      
      // Get user profile data
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
      
      // Simulate loading and analysis
      const timer = setTimeout(() => {
        // Mock analysis result with profile data if available
        const profile = savedProfile ? JSON.parse(savedProfile) : null;
        let bmi = '';
        let fatEstimate = '';
        
        if (profile && profile.height && profile.weight) {
          const heightInMeters = parseInt(profile.height) / 100;
          const weightInKg = parseInt(profile.weight);
          const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
          bmi = calculatedBmi;
          
          // Use provided body fat if available, otherwise estimate based on BMI
          if (profile.bodyFat) {
            fatEstimate = profile.bodyFat > 20 ? 'Alta' : (profile.bodyFat > 15 ? 'Moderada' : 'Baixa');
          } else {
            const bmiNum = parseFloat(calculatedBmi);
            fatEstimate = bmiNum > 25 ? 'Alta' : (bmiNum > 18.5 ? 'Moderada' : 'Baixa');
          }
        }
        
        // Análises posturais mais detalhadas
        const postureIssues = [
          'Ombro esquerdo mais elevado',
          'Rotação interna dos joelhos',
          'Quadril desalinhado',
          'Coluna com leve escoliose',
          'Postura anteriorizada'
        ];
        
        const shoulderAnalysis = Math.random() > 0.5 ? 'Ombro esquerdo ligeiramente mais elevado que o direito (2.3° de inclinação)' : 'Ombros relativamente alinhados com ligeira elevação do direito (1.8° de inclinação)';
        
        const hipAnalysis = Math.random() > 0.5 ? 'Quadril com rotação anterior esquerda (3.1° de rotação)' : 'Quadril relativamente alinhado com leve inclinação lateral (1.5° de inclinação)';
        
        const kneeAnalysis = Math.random() > 0.5 ? 'Joelhos com rotação interna mais pronunciada no lado direito (valgo)' : 'Joelhos alinhados com eixo mecânico dentro dos parâmetros normais';
        
        const spineAnalysis = Math.random() > 0.7 ? 'Coluna com leve escoliose em "S" na região torácica' : (Math.random() > 0.5 ? 'Hiperlordose lombar (5° acima do padrão)' : 'Coluna dentro dos parâmetros normais de curvatura');
        
        const feetAnalysis = Math.random() > 0.6 ? 'Pés com pronação moderada (pés planos)' : (Math.random() > 0.5 ? 'Pés com supinação leve (arco elevado)' : 'Arco plantar dentro dos parâmetros normais');
        
        // Set analysis state with all measurements if available
        setAnalysis({
          posture: postureIssues[Math.floor(Math.random() * postureIssues.length)],
          shoulders: shoulderAnalysis,
          hips: hipAnalysis,
          knees: kneeAnalysis,
          spine: spineAnalysis,
          feet: feetAnalysis,
          fatPercentage: profile?.bodyFat ? fatEstimate : ['Baixa', 'Moderada', 'Alta'][Math.floor(Math.random() * 3)],
          symmetry: Math.random() > 0.5 ? 'Equilibrado' : 'Assimétrico',
          bmi: bmi,
          measurements: {
            chest: profile?.chest || '',
            leftArm: profile?.leftArm || '',
            rightArm: profile?.rightArm || '',
            waist: profile?.waist || '',
            hips: profile?.hips || '',
            leftThigh: profile?.leftThigh || '',
            rightThigh: profile?.rightThigh || '',
            leftCalf: profile?.leftCalf || '',
            rightCalf: profile?.rightCalf || ''
          }
        });
        
        // Draw posture analysis on canvas after data is ready
        setTimeout(() => {
          drawPostureAnalysis();
          setLoading(false);
        }, 500);
        
      }, 2000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Ocorreu um erro ao carregar seus dados. Por favor, tente novamente.",
        variant: "destructive"
      });
      setLoading(false);
    }
  }, [navigate, toast]);
  
  // Função para desenhar análise postural nos canvas
  const drawPostureAnalysis = () => {
    try {
      // Função para desenhar no canvas frontal
      if (frontCanvasRef.current) {
        const frontPhoto = new Image();
        frontPhoto.crossOrigin = "anonymous"; // Para evitar problemas com CORS
        frontPhoto.onload = () => {
          const canvas = frontCanvasRef.current;
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          // Ajusta o tamanho do canvas para a imagem
          canvas.width = frontPhoto.width;
          canvas.height = frontPhoto.height;
          
          // Desenha a imagem
          ctx.drawImage(frontPhoto, 0, 0);
          
          // Desenha linhas de referência para ombros
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const shoulderY = Math.floor(frontPhoto.height * 0.2);
          ctx.moveTo(frontPhoto.width * 0.2, shoulderY - 5);
          ctx.lineTo(frontPhoto.width * 0.8, shoulderY + 5);
          ctx.stroke();
          
          // Legenda
          ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
          ctx.font = '14px Arial';
          ctx.fillText('Ombros: desnível de ~2°', 10, 20);
          
          // Linha de quadril
          ctx.strokeStyle = 'blue';
          ctx.beginPath();
          const hipY = Math.floor(frontPhoto.height * 0.5);
          ctx.moveTo(frontPhoto.width * 0.2, hipY + 3);
          ctx.lineTo(frontPhoto.width * 0.8, hipY - 2);
          ctx.stroke();
          
          // Legenda
          ctx.fillStyle = 'rgba(0, 0, 255, 0.7)';
          ctx.fillText('Quadril: leve inclinação', 10, 40);
          
          // Linhas verticais para alinhamento
          ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(frontPhoto.width / 2, 0);
          ctx.lineTo(frontPhoto.width / 2, frontPhoto.height);
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Linhas de referência para joelhos
          ctx.strokeStyle = 'green';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const kneeY = Math.floor(frontPhoto.height * 0.75);
          ctx.moveTo(frontPhoto.width * 0.3, kneeY);
          ctx.lineTo(frontPhoto.width * 0.45, kneeY);
          ctx.moveTo(frontPhoto.width * 0.55, kneeY);
          ctx.lineTo(frontPhoto.width * 0.7, kneeY);
          ctx.stroke();
          
          // Legenda
          ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
          ctx.fillText('Joelhos: alinhados', 10, 60);
        };
        frontPhoto.src = localStorage.getItem('frontPhotoUrl') || '';
        frontPhoto.onerror = () => {
          console.error("Erro ao carregar imagem frontal");
        };
      }
      
      // Função para desenhar no canvas de costas
      if (backCanvasRef.current) {
        const backPhoto = new Image();
        backPhoto.crossOrigin = "anonymous";
        backPhoto.onload = () => {
          const canvas = backCanvasRef.current;
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          canvas.width = backPhoto.width;
          canvas.height = backPhoto.height;
          ctx.drawImage(backPhoto, 0, 0);
          
          // Linhas para ombros
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const shoulderY = Math.floor(backPhoto.height * 0.2);
          ctx.moveTo(backPhoto.width * 0.2, shoulderY - 3);
          ctx.lineTo(backPhoto.width * 0.8, shoulderY + 2);
          ctx.stroke();
          
          // Linha para coluna
          ctx.strokeStyle = 'green';
          ctx.beginPath();
          ctx.moveTo(backPhoto.width / 2, backPhoto.height * 0.1);
          ctx.bezierCurveTo(
            backPhoto.width / 2 - 10, backPhoto.height * 0.3,
            backPhoto.width / 2 + 10, backPhoto.height * 0.6,
            backPhoto.width / 2, backPhoto.height * 0.9
          );
          ctx.stroke();
          
          // Legenda
          ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
          ctx.font = '14px Arial';
          ctx.fillText('Coluna: leve curvatura lateral', 10, 20);
          
          // Linha do quadril
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const hipY = Math.floor(backPhoto.height * 0.5);
          ctx.moveTo(backPhoto.width * 0.2, hipY + 2);
          ctx.lineTo(backPhoto.width * 0.8, hipY - 2);
          ctx.stroke();
          
          // Legenda
          ctx.fillStyle = 'rgba(0, 0, 255, 0.7)';
          ctx.fillText('Quadril: leve desalinhamento', 10, 40);
        };
        backPhoto.src = localStorage.getItem('backPhotoUrl') || '';
        backPhoto.onerror = () => {
          console.error("Erro ao carregar imagem de costas");
        };
      }
      
      // Desenhar análise de perfil lateral esquerdo
      if (leftSideCanvasRef.current) {
        const leftSidePhoto = new Image();
        leftSidePhoto.crossOrigin = "anonymous";
        leftSidePhoto.onload = () => {
          const canvas = leftSideCanvasRef.current;
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          canvas.width = leftSidePhoto.width;
          canvas.height = leftSidePhoto.height;
          ctx.drawImage(leftSidePhoto, 0, 0);
          
          // Linha de referência para postura
          ctx.strokeStyle = 'orange';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(leftSidePhoto.width * 0.5, 0);
          ctx.lineTo(leftSidePhoto.width * 0.5, leftSidePhoto.height);
          ctx.stroke();
          
          // Curva para lordose
          ctx.strokeStyle = 'purple';
          ctx.beginPath();
          ctx.moveTo(leftSidePhoto.width * 0.5, leftSidePhoto.height * 0.3);
          ctx.bezierCurveTo(
            leftSidePhoto.width * 0.5 - 20, leftSidePhoto.height * 0.5,
            leftSidePhoto.width * 0.5 - 15, leftSidePhoto.height * 0.7,
            leftSidePhoto.width * 0.5, leftSidePhoto.height * 0.9
          );
          ctx.stroke();
          
          // Legenda
          ctx.fillStyle = 'rgba(255, 165, 0, 0.7)';
          ctx.font = '14px Arial';
          ctx.fillText('Postura: anteriorizada', 10, 20);
          
          ctx.fillStyle = 'rgba(128, 0, 128, 0.7)';
          ctx.fillText('Coluna: hiperlordose lombar', 10, 40);
        };
        leftSidePhoto.src = localStorage.getItem('leftSidePhotoUrl') || '';
        leftSidePhoto.onerror = () => {
          console.error("Erro ao carregar imagem lateral esquerda");
        };
      }
      
      // Desenhar análise de perfil lateral direito
      if (rightSideCanvasRef.current) {
        const rightSidePhoto = new Image();
        rightSidePhoto.crossOrigin = "anonymous";
        rightSidePhoto.onload = () => {
          const canvas = rightSideCanvasRef.current;
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          canvas.width = rightSidePhoto.width;
          canvas.height = rightSidePhoto.height;
          ctx.drawImage(rightSidePhoto, 0, 0);
          
          // Linha para referência de postura
          ctx.strokeStyle = 'purple';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(rightSidePhoto.width * 0.5, 0);
          ctx.lineTo(rightSidePhoto.width * 0.5, rightSidePhoto.height);
          ctx.stroke();
          
          // Curva para coluna 
          ctx.strokeStyle = 'purple';
          ctx.beginPath();
          ctx.moveTo(rightSidePhoto.width * 0.5, rightSidePhoto.height * 0.3);
          ctx.bezierCurveTo(
            rightSidePhoto.width * 0.5 - 20, rightSidePhoto.height * 0.5,
            rightSidePhoto.width * 0.5 - 15, rightSidePhoto.height * 0.7,
            rightSidePhoto.width * 0.5, rightSidePhoto.height * 0.9
          );
          ctx.stroke();
          
          // Ângulos de referência
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fillRect(rightSidePhoto.width * 0.6, rightSidePhoto.height * 0.5, 60, 20);
          
          ctx.fillStyle = 'rgba(128, 0, 128, 0.7)';
          ctx.font = '14px Arial';
          ctx.fillText('Ângulo lombar: 42°', rightSidePhoto.width * 0.6, rightSidePhoto.height * 0.5 + 15);
          
          // Legenda
          ctx.fillStyle = 'rgba(128, 0, 128, 0.7)';
          ctx.fillText('Coluna: hiperlordose lombar', 10, 20);
        };
        rightSidePhoto.src = localStorage.getItem('rightSidePhotoUrl') || localStorage.getItem('sidePhotoUrl') || '';
        rightSidePhoto.onerror = () => {
          console.error("Erro ao carregar imagem lateral direita");
        };
      }
    } catch (error) {
      console.error("Erro ao desenhar análise postural:", error);
      toast({
        title: "Erro na análise postural",
        description: "Não foi possível renderizar a análise postural. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  const handleGoalSelected = (goal: string) => {
    try {
      // Save selected goal
      localStorage.setItem('selectedGoal', goal);
      
      toast({
        title: "Objetivo selecionado",
        description: "Seu plano personalizado está sendo gerado!",
      });
      
      // Simulate generating plan
      setTimeout(() => {
        navigate('/training');
      }, 1500);
    } catch (error) {
      console.error("Erro ao selecionar objetivo:", error);
      toast({
        title: "Erro ao selecionar objetivo",
        description: "Não foi possível salvar seu objetivo. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingAnalysis />;
    }

    if (showGoals) {
      return (
        <>
          <GoalSelector onSelect={handleGoalSelected} />
          <BackButton onClick={() => setShowGoals(false)} />
        </>
      );
    }

    if (showProjection) {
      return (
        <>
          <ResultProjection originalPhotoUrl={localStorage.getItem('frontPhotoUrl') || ''} />
          <BackButton onClick={() => setShowProjection(false)} />
        </>
      );
    }

    if (show3DProjection) {
      return (
        <>
          <div className="space-y-6">
            <Tabs defaultValue="full" onValueChange={setSelectedMuscle}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="full">Corpo Todo</TabsTrigger>
                <TabsTrigger value="chest">Peitoral</TabsTrigger>
                <TabsTrigger value="abs">Abdômen</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="shoulders">Ombros</TabsTrigger>
                <TabsTrigger value="arms">Braços</TabsTrigger>
                <TabsTrigger value="legs">Pernas</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ganho de massa muscular (kg):</span>
                <span className="text-sm font-bold text-corpoideal-purple">{muscleGain} kg</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="15" 
                value={muscleGain}
                onChange={(e) => setMuscleGain(parseInt(e.target.value))}
                className="w-full" 
              />
            </div>
            
            <MuscleProjection3D 
              bodyPart={selectedMuscle} 
              gainAmount={muscleGain} 
              userImage={localStorage.getItem('frontPhotoUrl') || ''}
            />
          </div>
          <BackButton onClick={() => setShow3DProjection(false)} />
        </>
      );
    }
    
    if (showPostureAnalysis) {
      return (
        <>
          <PosturalAnalysis 
            frontPhotoUrl={localStorage.getItem('frontPhotoUrl')}
            backPhotoUrl={localStorage.getItem('backPhotoUrl')}
            leftSidePhotoUrl={localStorage.getItem('leftSidePhotoUrl')}
            rightSidePhotoUrl={localStorage.getItem('rightSidePhotoUrl')}
            analysisData={analysis}
          />
          <BackButton onClick={() => setShowPostureAnalysis(false)} />
        </>
      );
    }

    return (
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="basic">Análise Básica</TabsTrigger>
          <TabsTrigger value="scientific">Análise Científica</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6">
          <BodyAnalysis 
            posture={analysis.posture}
            fatPercentage={analysis.fatPercentage}
            symmetry={analysis.symmetry}
            bmi={analysis.bmi}
            measurements={analysis.measurements}
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowProjection(true)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <img 
                src="/placeholder.svg" 
                alt="Perda de peso" 
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm font-medium">Projeção de perda/ganho</span>
            </button>
            
            <button 
              onClick={() => setShow3DProjection(true)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <img 
                src="/placeholder.svg" 
                alt="Ganho muscular" 
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm font-medium">Modelo 3D muscular</span>
            </button>
            
            <button 
              onClick={() => setShowPostureAnalysis(true)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <img 
                src="/placeholder.svg" 
                alt="Análise postural" 
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm font-medium">Análise postural detalhada</span>
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="scientific" className="space-y-6">
          <ScientificAnalysis userProfile={userProfile} />
        </TabsContent>
        
        <div className="mt-4 text-center">
          <Button 
            onClick={() => setShowGoals(true)}
            className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
          >
            Definir meu objetivo e gerar plano
          </Button>
        </div>
      </Tabs>
    );
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Análise Corporal</h1>
        
        <PhotosGallery 
          frontPhotoUrl={localStorage.getItem('frontPhotoUrl')}
          backPhotoUrl={localStorage.getItem('backPhotoUrl')}
          leftSidePhotoUrl={localStorage.getItem('leftSidePhotoUrl')}
          rightSidePhotoUrl={localStorage.getItem('rightSidePhotoUrl')}
        />
        
        <ProfileSummary userProfile={userProfile} />
        
        {renderContent()}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AnalysisPage;
