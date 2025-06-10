
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { LoadingAnalysis } from "@/components/analysis/LoadingAnalysis";
import { ProfileSummary } from "@/components/analysis/ProfileSummary";
import { PosturalAnalysis } from "@/components/analysis/PosturalAnalysis";
import { AnalysisActions } from "@/components/analysis/AnalysisActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, User, Activity } from "lucide-react";

const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [frontPhotoUrl, setFrontPhotoUrl] = useState<string | null>(null);
  const [sidePhotoUrl, setSidePhotoUrl] = useState<string | null>(null);
  const [backPhotoUrl, setBackPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load user profile
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    // Load photos
    const frontUrl = localStorage.getItem('frontPhotoUrl');
    const sideUrl = localStorage.getItem('sidePhotoUrl');
    const backUrl = localStorage.getItem('backPhotoUrl');
    
    setFrontPhotoUrl(frontUrl);
    setSidePhotoUrl(sideUrl);
    setBackPhotoUrl(backUrl);

    // Simulate analysis loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnalysis />;
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-4 py-6 space-y-6">
        <div className="text-center mb-6">
          <h1 className="main-title mb-2">Análise Corporal Completa</h1>
          <p className="subtitle">
            Análise baseada em suas fotos e dados antropométricos
          </p>
        </div>

        {/* Resumo do perfil */}
        <ProfileSummary userProfile={userProfile} />

        {/* Galeria de fotos analisadas */}
        {(frontPhotoUrl || sidePhotoUrl || backPhotoUrl) && (
          <Card className="info-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-corpoideal-purple">
                <Camera className="h-5 w-5 mr-2" />
                Fotos Analisadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {frontPhotoUrl && (
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center">Frontal</Badge>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border-soft shadow-subtle">
                      <img 
                        src={frontPhotoUrl} 
                        alt="Foto frontal" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {sidePhotoUrl && (
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center">Lateral</Badge>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border-soft shadow-subtle">
                      <img 
                        src={sidePhotoUrl} 
                        alt="Foto lateral" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {backPhotoUrl && (
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center">Posterior</Badge>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border-soft shadow-subtle">
                      <img 
                        src={backPhotoUrl} 
                        alt="Foto posterior" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Imagem relacionada à análise postural */}
        <Card className="info-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-corpoideal-purple">
              <Activity className="h-5 w-5 mr-2" />
              Análise Postural Avançada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop"
                  alt="Análise postural"
                  className="w-full rounded-xl shadow-modern"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Nossa IA analisa mais de 50 pontos corporais para identificar desvios posturais e desequilíbrios musculares
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Análise postural detalhada */}
        <PosturalAnalysis 
          frontPhotoUrl={frontPhotoUrl}
          sidePhotoUrl={sidePhotoUrl}
          backPhotoUrl={backPhotoUrl}
          userProfile={userProfile}
        />

        {/* Ações da análise */}
        <AnalysisActions />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AnalysisPage;
