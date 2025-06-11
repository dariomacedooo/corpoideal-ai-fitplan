
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { PhotosGallery } from "@/components/analysis/PhotosGallery";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { PosturalAnalysis } from "@/components/analysis/PosturalAnalysis";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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

  const handleContinueToHome = () => {
    toast({
      title: "Análise completa!",
      description: "Agora você pode acessar seu dashboard personalizado.",
    });
    navigate('/home');
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

          {/* Continue Button */}
          <div className="pt-6 border-t">
            <Button 
              onClick={handleContinueToHome}
              className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple text-lg py-3"
            >
              Continuar para Dashboard
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AnalysisPage;
