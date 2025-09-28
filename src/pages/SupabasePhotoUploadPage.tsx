import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { SupabasePhotoUpload } from "@/components/photo/SupabasePhotoUpload";
import { CheckCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { useAuth } from "@/hooks/useAuth";

const SupabasePhotoUploadPage = () => {
  const [photoUrls, setPhotoUrls] = useState({
    front: '',
    back: '',
    left: '',
    right: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveProgressPhotos } = usePhotoUpload();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handlePhotoUploaded = (url: string, path: string, type: 'front' | 'back' | 'left' | 'right') => {
    setPhotoUrls(prev => ({ ...prev, [type]: url }));
  };

  const handleAnalyzeClick = async () => {
    if (!photoUrls.front || !photoUrls.back || !photoUrls.left || !photoUrls.right) {
      toast({
        title: "Fotos incompletas",
        description: "Por favor, faça upload das 4 fotos necessárias.",
        variant: "destructive",
      });
      return;
    }

    // Save progress photos to database
    const result = await saveProgressPhotos({
      front_photo_url: photoUrls.front,
      back_photo_url: photoUrls.back,
      left_side_photo_url: photoUrls.left,
      right_side_photo_url: photoUrls.right,
      notes: 'Fotos iniciais para análise'
    });

    if (result.success) {
      navigate('/analysis');
    }
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Análise Corporal</h1>
            <p className="text-muted-foreground">
              Faça upload de 4 fotos para análise completa do seu corpo
            </p>
          </div>

          {/* Instruções */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Dicas para melhores fotos:</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Use roupas justas ou trajes de banho</li>
              <li>• Fotografe em local bem iluminado</li>
              <li>• Mantenha o telefone na altura do peito</li>
              <li>• Mantenha os braços ao lado do corpo</li>
            </ul>
          </div>

          {/* Grid de uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SupabasePhotoUpload 
              type="front" 
              onPhotoUploaded={(url, path) => handlePhotoUploaded(url, path, 'front')}
              photoUrl={photoUrls.front}
            />
            <SupabasePhotoUpload 
              type="back" 
              onPhotoUploaded={(url, path) => handlePhotoUploaded(url, path, 'back')}
              photoUrl={photoUrls.back}
            />
            <SupabasePhotoUpload 
              type="left" 
              onPhotoUploaded={(url, path) => handlePhotoUploaded(url, path, 'left')}
              photoUrl={photoUrls.left}
            />
            <SupabasePhotoUpload 
              type="right" 
              onPhotoUploaded={(url, path) => handlePhotoUploaded(url, path, 'right')}
              photoUrl={photoUrls.right}
            />
          </div>

          {/* Status dos uploads */}
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="text-lg font-semibold mb-4">Status das Fotos</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {photoUrls.front ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm">Foto Frontal</span>
              </div>
              <div className="flex items-center gap-2">
                {photoUrls.back ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm">Foto das Costas</span>
              </div>
              <div className="flex items-center gap-2">
                {photoUrls.left ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm">Foto Lado Esquerdo</span>
              </div>
              <div className="flex items-center gap-2">
                {photoUrls.right ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm">Foto Lado Direito</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleAnalyzeClick}
            className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
            disabled={!photoUrls.front || !photoUrls.back || !photoUrls.left || !photoUrls.right}
          >
            Analisar meu corpo
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SupabasePhotoUploadPage;