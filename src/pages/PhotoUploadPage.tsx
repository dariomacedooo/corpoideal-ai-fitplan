
import { useState } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhotoUpload } from "@/components/photo/PhotoUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const PhotoUploadPage = () => {
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePhotoUploaded = (file: File, type: 'front' | 'side') => {
    if (type === 'front') {
      setFrontPhoto(file);
    } else {
      setSidePhoto(file);
    }
  };
  
  const handleAnalyzeClick = () => {
    if (!frontPhoto || !sidePhoto) {
      toast({
        title: "Fotos necessárias",
        description: "Por favor, envie ambas as fotos para análise.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would upload the photos to a server here
    // For now, we'll just save them in localStorage as URLs for demo purposes
    const frontPhotoUrl = URL.createObjectURL(frontPhoto);
    const sidePhotoUrl = URL.createObjectURL(sidePhoto);
    
    localStorage.setItem('frontPhotoUrl', frontPhotoUrl);
    localStorage.setItem('sidePhotoUrl', sidePhotoUrl);
    
    // Navigate to analysis page
    navigate('/analysis');
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Enviar Fotos</h1>
        <p className="text-gray-600 mb-6">
          Para uma análise precisa, tire fotos em um ambiente bem iluminado, 
          com um fundo neutro e use roupas justas de academia.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Foto Frontal</h2>
            <PhotoUpload 
              type="front" 
              onPhotoUploaded={handlePhotoUploaded}
            />
            <p className="text-xs text-gray-500 mt-2">
              Fique em pé, olhando para frente, braços relaxados ao lado do corpo.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-2">Foto Lateral</h2>
            <PhotoUpload 
              type="side" 
              onPhotoUploaded={handlePhotoUploaded}
            />
            <p className="text-xs text-gray-500 mt-2">
              Fique de lado, olhando para frente, braços relaxados ao lado do corpo.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleAnalyzeClick}
          disabled={!frontPhoto || !sidePhoto}
          className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
        >
          Analisar meu corpo
        </Button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default PhotoUploadPage;
