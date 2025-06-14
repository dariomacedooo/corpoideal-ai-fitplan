
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { PhotosGallery } from "@/components/analysis/PhotosGallery";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { PosturalAnalysis } from "@/components/analysis/PosturalAnalysis";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Dumbbell, Target, Utensils, Brain, Zap } from "lucide-react";
import { generateWorkoutPlan } from "@/utils/workoutGenerator";
import { useUserProfile } from "@/hooks/useUserProfile";

const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPhotos, setUserPhotos] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useUserProfile();

  useEffect(() => {
    // Simulate analysis loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Load photos and profile
    const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
    const backPhotoUrl = localStorage.getItem('backPhotoUrl');
    const leftSidePhotoUrl = localStorage.getItem('leftSidePhotoUrl');
    const rightSidePhotoUrl = localStorage.getItem('rightSidePhotoUrl');
    const sidePhotoUrl = localStorage.getItem('sidePhotoUrl'); // For backward compatibility
    
    if (frontPhotoUrl) {
      setUserPhotos({
        front: frontPhotoUrl,
        back: backPhotoUrl,
        leftSide: leftSidePhotoUrl,
        rightSide: rightSidePhotoUrl,
        side: sidePhotoUrl
      });
    }

    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    return () => clearTimeout(timer);
  }, []);

  const handleGeneratePersonalizedPlan = () => {
    if (!profile) {
      toast({
        title: "Erro",
        description: "Perfil não encontrado. Complete seu perfil primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate complete workout plan based on profile and photos
      const workoutPlan = generateWorkoutPlan(
        profile.goal || 'manter-peso',
        profile.trainingExperience || 'iniciante',
        profile.trainingLocation || 'casa',
        profile.sex || 'masculino',
        profile.healthIssues || [],
        profile.trainingDays || ['segunda', 'quarta', 'sexta'],
        userPhotos
      );

      // Save generated workout plan
      localStorage.setItem('generatedWorkoutPlan', JSON.stringify(workoutPlan));
      
      // Mark analysis as complete and enable app areas
      localStorage.setItem('analysisCompleted', 'true');
      localStorage.setItem('usePersonalizedPlan', 'true');
      
      toast({
        title: "Análise completa!",
        description: "Treino e dieta personalizados gerados com base no seu perfil e fotos.",
      });
      
      navigate('/home');
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      toast({
        title: "Erro",
        description: "Erro ao gerar plano personalizado. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleCreateCustomPlan = () => {
    // Mark analysis as complete and enable app areas
    localStorage.setItem('analysisCompleted', 'true');
    localStorage.setItem('usePersonalizedPlan', 'false');
    
    toast({
      title: "Análise completa!",
      description: "Agora você pode criar seu treino e dieta personalizados.",
    });
    
    navigate('/training');
  };

  if (isLoading) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <LoadingAnalysis />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-3 py-4 space-y-4">
        <h1 className="text-xl lg:text-2xl font-bold text-corpoideal-purple mb-2">Análise Corporal Completa</h1>
        <p className="text-gray-600 text-sm mb-4">
          Sua análise foi concluída! Veja os resultados abaixo.
        </p>

        <div className="space-y-4">
          {/* Profile Summary */}
          <ProfileSummary userProfile={userProfile} />

          {/* Photos Gallery */}
          <PhotosGallery 
            frontPhotoUrl={userPhotos?.front || null}
            backPhotoUrl={userPhotos?.back || null}
            leftSidePhotoUrl={userPhotos?.leftSide || null}
            rightSidePhotoUrl={userPhotos?.rightSide || null}
          />

          {/* Body Analysis */}
          <BodyAnalysis 
            posture="Moderada"
            fatPercentage="Moderada"
            symmetry="Equilibrado"
            bmi={userProfile?.weight && userProfile?.height ? 
              (parseFloat(userProfile.weight) / Math.pow(parseFloat(userProfile.height) / 100, 2)).toFixed(1) : 
              undefined
            }
            measurements={{
              waist: userProfile?.waist,
              thigh: userProfile?.leftThigh,
              calf: userProfile?.leftCalf
            }}
          />

          {/* Postural Analysis */}
          <PosturalAnalysis 
            frontPhotoUrl={userPhotos?.front || null}
            backPhotoUrl={userPhotos?.back || null}
            leftSidePhotoUrl={userPhotos?.leftSide || null}
            rightSidePhotoUrl={userPhotos?.rightSide || null}
            analysisData={{
              shoulders: "Moderado",
              hips: "Alinhado",
              knees: "Moderado",
              spine: "Bom",
              feet: "Bom",
              symmetry: "Equilibrado"
            }}
          />

          {/* Plan Options */}
          <Card className="border-2 border-corpoideal-purple/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-corpoideal-purple text-lg">
                <Target className="h-5 w-5 mr-2" />
                Escolha sua próxima etapa
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Com base na sua análise corporal e perfil, escolha como deseja prosseguir:
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                {/* Personalized Plan Option */}
                <Card className="hover:border-corpoideal-purple/50 transition-colors cursor-pointer border-2" 
                      onClick={handleGeneratePersonalizedPlan}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-corpoideal-purple/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-6 w-6 text-corpoideal-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">Gerar Treino e Dieta IA Personalizada</h3>
                        <p className="text-sm text-gray-600">
                          Baseado no seu perfil, objetivo, fotos e análise corporal. 
                          Gerado automaticamente pela IA.
                        </p>
                      </div>
                      <Zap className="h-5 w-5 text-corpoideal-purple" />
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Plan Option */}
                <Card className="hover:border-orange-500/50 transition-colors cursor-pointer border-2" 
                      onClick={handleCreateCustomPlan}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Target className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">Criar Meu Treino Personalizado</h3>
                        <p className="text-sm text-gray-600">
                          Monte seu próprio treino e dieta com nossa base de exercícios 
                          científicos e orientações nutricionais.
                        </p>
                      </div>
                      <Utensils className="h-5 w-5 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Você poderá alterar entre as opções a qualquer momento nas áreas de Treino e Nutrição.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AnalysisPage;
