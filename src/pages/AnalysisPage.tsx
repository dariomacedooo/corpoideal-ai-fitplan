
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/analysis/BackButton";
import { BodyAnalysis } from "@/components/analysis/BodyAnalysis";
import { PosturalAnalysis } from "@/components/analysis/PosturalAnalysis";
import { ScientificBodyAnalysis } from "@/components/analysis/ScientificBodyAnalysis";
import { AnalysisActions } from "@/components/analysis/AnalysisActions";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { PhotosGallery } from "@/components/analysis/PhotosGallery";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { Camera, Loader2 } from "lucide-react";

const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    // Load user profile and photos
    const savedProfile = localStorage.getItem('userProfile');
    const savedPhotos = localStorage.getItem('uploadedPhotos');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }

    // Simulate analysis loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const handleShowProjection = () => {
    // Handle projection logic
    console.log("Show projection clicked");
  };

  const handleShowGoals = () => {
    // Handle goals logic
    console.log("Show goals clicked");
  };

  if (isLoading) {
    return <LoadingAnalysis />;
  }

  if (photos.length === 0) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <div className="px-4 py-6">
          <BackButton onClick={handleBackButtonClick} />
          <Card className="mt-6">
            <CardContent className="p-6 text-center">
              <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma foto encontrada
              </h3>
              <p className="text-gray-500 mb-4">
                Você precisa fazer upload das suas fotos antes de ver a análise.
              </p>
              <Button 
                onClick={() => window.history.back()}
                className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
              >
                Voltar para Upload
              </Button>
            </CardContent>
          </Card>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <BackButton onClick={handleBackButtonClick} />
        
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4 mt-4">
          Análise Científica Completa
        </h1>
        <p className="text-gray-600 mb-6">
          Análise detalhada baseada em antropometria científica, proporções áureas e metodologias validadas.
        </p>
        
        <ProfileSummary userProfile={userProfile} />
        
        <Tabs defaultValue="body" className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="body">Corporal</TabsTrigger>
            <TabsTrigger value="proportions">Proporções</TabsTrigger>
            <TabsTrigger value="posture">Postura</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="body" className="space-y-6">
            <BodyAnalysis />
          </TabsContent>
          
          <TabsContent value="proportions" className="space-y-6">
            <ScientificBodyAnalysis />
          </TabsContent>
          
          <TabsContent value="posture" className="space-y-6">
            <PosturalAnalysis />
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-6">
            <PhotosGallery 
              frontPhotoUrl={photos[0] || null}
              backPhotoUrl={photos[1] || null}
              leftSidePhotoUrl={photos[2] || null}
              rightSidePhotoUrl={photos[3] || null}
            />
          </TabsContent>
        </Tabs>
        
        <AnalysisActions 
          onShowProjection={handleShowProjection}
          onShowGoals={handleShowGoals}
        />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AnalysisPage;
