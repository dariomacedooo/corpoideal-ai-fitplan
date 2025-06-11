
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
import { Dumbbell, Target, Utensils, Brain } from "lucide-react";

const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPhotos, setUserPhotos] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    // Mark analysis as complete and enable app areas
    localStorage.setItem('analysisCompleted', 'true');
    localStorage.setItem('usePersonalizedPlan', 'true');
    
    toast({
      title: "Análise completa!",
      description: "Gerando seu treino e dieta personalizados com base no seu perfil.",
    });
    
    navigate('/training');
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
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Análise Corporal Completa</h1>
        <p className="text-gray-600 mb-6">
          Sua análise foi concluída! Veja os resultados abaixo.
        </p>

        <div className="space-y-6">
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
            <CardHeader>
              <CardTitle className="flex items-center text-corpoideal-purple">
                <Target className="h-5 w-5 mr-2" />
                Escolha sua próxima etapa
              </CardTitle>
              <p className="text-gray-600">
                Com base na sua análise corporal e perfil, escolha como deseja prosseguir:
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personalized Plan Option */}
                <Card className="hover:border-corpoideal-purple/50 transition-colors cursor-pointer" 
                      onClick={handleGeneratePersonalizedPlan}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-corpoideal-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-corpoideal-purple" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Treino e Dieta Personalizados</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Baseado no seu perfil, objetivo e análise corporal. 
                      Gerado automaticamente pela IA.
                    </p>
                    <Button className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple">
                      <Dumbbell className="h-4 w-4 mr-2" />
                      Gerar Plano IA
                    </Button>
                  </CardContent>
                </Card>

                {/* Custom Plan Option */}
                <Card className="hover:border-orange-500/50 transition-colors cursor-pointer" 
                      onClick={handleCreateCustomPlan}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Criar Meu Treino Personalizado</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Monte seu próprio treino e dieta com nossa base de exercícios 
                      científicos e orientações nutricionais.
                    </p>
                    <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
                      <Utensils className="h-4 w-4 mr-2" />
                      Personalizar
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
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
