
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhotoUpload } from "@/components/photo/PhotoUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const PhotoUploadPage = () => {
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [backPhoto, setBackPhoto] = useState<File | null>(null);
  const [leftSidePhoto, setLeftSidePhoto] = useState<File | null>(null);
  const [rightSidePhoto, setRightSidePhoto] = useState<File | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if profile is completed on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileCompleted(!!profile.profileCompleted);
    }
    
    if (!savedProfile || !JSON.parse(savedProfile).profileCompleted) {
      toast({
        title: "Perfil incompleto",
        description: "Por favor, complete seu perfil antes de enviar fotos.",
      });
      navigate('/profile');
    }
  }, [navigate, toast]);
  
  const handlePhotoUploaded = (file: File, type: 'front' | 'back' | 'leftSide' | 'rightSide') => {
    if (type === 'front') {
      setFrontPhoto(file);
    } else if (type === 'back') {
      setBackPhoto(file);
    } else if (type === 'leftSide') {
      setLeftSidePhoto(file);
    } else if (type === 'rightSide') {
      setRightSidePhoto(file);
    }
  };
  
  const handleAnalyzeClick = () => {
    if (!frontPhoto || !backPhoto || !leftSidePhoto || !rightSidePhoto) {
      toast({
        title: "Fotos necessárias",
        description: "Por favor, envie todas as fotos para análise.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would upload the photos to a server here
    // For now, we'll just save them in localStorage as URLs for demo purposes
    const frontPhotoUrl = URL.createObjectURL(frontPhoto);
    const backPhotoUrl = URL.createObjectURL(backPhoto);
    const leftSidePhotoUrl = URL.createObjectURL(leftSidePhoto);
    const rightSidePhotoUrl = URL.createObjectURL(rightSidePhoto);
    
    localStorage.setItem('frontPhotoUrl', frontPhotoUrl);
    localStorage.setItem('backPhotoUrl', backPhotoUrl);
    localStorage.setItem('leftSidePhotoUrl', leftSidePhotoUrl);
    localStorage.setItem('rightSidePhotoUrl', rightSidePhotoUrl);
    localStorage.setItem('sidePhotoUrl', leftSidePhotoUrl); // For backward compatibility
    
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
            <h2 className="text-lg font-medium mb-2">Foto de Costas</h2>
            <PhotoUpload 
              type="back" 
              onPhotoUploaded={handlePhotoUploaded}
            />
            <p className="text-xs text-gray-500 mt-2">
              Fique de costas, braços relaxados ao lado do corpo.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-2">Foto Lateral Esquerda</h2>
            <PhotoUpload 
              type="leftSide" 
              onPhotoUploaded={handlePhotoUploaded}
            />
            <p className="text-xs text-gray-500 mt-2">
              Fique de lado esquerdo, olhando para frente, braços relaxados.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-2">Foto Lateral Direita</h2>
            <PhotoUpload 
              type="rightSide" 
              onPhotoUploaded={handlePhotoUploaded}
            />
            <p className="text-xs text-gray-500 mt-2">
              Fique de lado direito, olhando para frente, braços relaxados.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleAnalyzeClick}
          disabled={!frontPhoto || !backPhoto || !leftSidePhoto || !rightSidePhoto}
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
