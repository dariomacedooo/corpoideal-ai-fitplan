
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
  }, [navigate, toast]);
  
  // Função para desenhar análise postural nos canvas
  const drawPostureAnalysis = () => {
    // Função para desenhar no canvas frontal
    if (frontCanvasRef.current) {
      const frontPhoto = new Image();
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
      };
      frontPhoto.src = localStorage.getItem('frontPhotoUrl') || '';
    }
    
    // Função para desenhar no canvas de costas
    if (backCanvasRef.current) {
      const backPhoto = new Image();
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
      };
      backPhoto.src = localStorage.getItem('backPhotoUrl') || '';
    }
    
    // Desenhar análise de perfil lateral esquerdo
    if (leftSideCanvasRef.current) {
      const leftSidePhoto = new Image();
      leftSidePhoto.onload = () => {
        const canvas = leftSideCanvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = leftSidePhoto.width;
        canvas.height = leftSidePhoto.height;
        ctx.drawImage(leftSidePhoto, 0, 0);
        
        // Linha para postura
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(leftSidePhoto.width * 0.5, 0);
        ctx.lineTo(leftSidePhoto.width * 0.5, leftSidePhoto.height);
        ctx.stroke();
        
        // Legenda
        ctx.fillStyle = 'rgba(255, 165, 0, 0.7)';
        ctx.font = '14px Arial';
        ctx.fillText('Postura: anteriorizada', 10, 20);
      };
      leftSidePhoto.src = localStorage.getItem('leftSidePhotoUrl') || localStorage.getItem('sidePhotoUrl') || '';
    }
    
    // Desenhar análise de perfil lateral direito
    if (rightSideCanvasRef.current) {
      const rightSidePhoto = new Image();
      rightSidePhoto.onload = () => {
        const canvas = rightSideCanvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = rightSidePhoto.width;
        canvas.height = rightSidePhoto.height;
        ctx.drawImage(rightSidePhoto, 0, 0);
        
        // Linha para lordose
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rightSidePhoto.width * 0.5, 0);
        ctx.lineTo(rightSidePhoto.width * 0.5, rightSidePhoto.height);
        ctx.stroke();
        
        // Curva para lordose
        ctx.strokeStyle = 'purple';
        ctx.beginPath();
        ctx.moveTo(rightSidePhoto.width * 0.5, rightSidePhoto.height * 0.3);
        ctx.bezierCurveTo(
          rightSidePhoto.width * 0.5 - 20, rightSidePhoto.height * 0.5,
          rightSidePhoto.width * 0.5 - 15, rightSidePhoto.height * 0.7,
          rightSidePhoto.width * 0.5, rightSidePhoto.height * 0.9
        );
        ctx.stroke();
        
        // Legenda
        ctx.fillStyle = 'rgba(128, 0, 128, 0.7)';
        ctx.font = '14px Arial';
        ctx.fillText('Coluna: hiperlordose lombar', 10, 20);
      };
      rightSidePhoto.src = localStorage.getItem('rightSidePhotoUrl') || localStorage.getItem('sidePhotoUrl') || '';
    }
  };
  
  const handleGoalSelected = (goal: string) => {
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
                      <p className="text-xs text-white">{analysis.shoulders}</p>
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
                      <p className="text-xs text-white">{analysis.spine}</p>
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
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Perfil Direito</h3>
                    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                      <canvas 
                        ref={rightSideCanvasRef}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-corpoideal-purple">Resumo da Análise Postural</h3>
                  
                  <div className="grid grid-cols-2 gap-y-3">
                    <div>
                      <h4 className="text-xs font-medium">Ombros:</h4>
                      <p className="text-xs text-gray-600">{analysis.shoulders}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium">Quadril:</h4>
                      <p className="text-xs text-gray-600">{analysis.hips}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium">Joelhos:</h4>
                      <p className="text-xs text-gray-600">{analysis.knees}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium">Coluna:</h4>
                      <p className="text-xs text-gray-600">{analysis.spine}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium">Pés:</h4>
                      <p className="text-xs text-gray-600">{analysis.feet}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium">Simetria:</h4>
                      <p className="text-xs text-gray-600">{analysis.symmetry}</p>
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
          <BackButton onClick={() => setShowPostureAnalysis(false)} />
        </>
      );
    }

    return (
      <>
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
        
        <div className="mt-4 text-center">
          <Button 
            onClick={() => setShowGoals(true)}
            className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
          >
            Definir meu objetivo e gerar plano
          </Button>
        </div>
      </>
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
}

export default AnalysisPage;
