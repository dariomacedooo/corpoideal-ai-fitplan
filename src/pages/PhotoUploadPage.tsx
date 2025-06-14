import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhotoUpload } from "@/components/photo/PhotoUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BodyAnalysis } from '@/components/analysis/BodyAnalysis';
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from 'lucide-react';

const PhotoUploadPage = () => {
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [backPhoto, setBackPhoto] = useState<File | null>(null);
  const [leftSidePhoto, setLeftSidePhoto] = useState<File | null>(null);
  const [rightSidePhoto, setRightSidePhoto] = useState<File | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

    const reader = new FileReader();
    reader.onloadend = () => {
        setUploadedImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAnalyzeClick = () => {
    if (!frontPhoto || !backPhoto || !leftSidePhoto || !rightSidePhoto) {
      toast({
        title: "Fotos necessárias",
        description: "Por favor, envie todas as quatro fotos para análise.",
        variant: "destructive",
      });
      return;
    }
    
    const frontPhotoUrl = URL.createObjectURL(frontPhoto);
    const backPhotoUrl = URL.createObjectURL(backPhoto);
    const leftSidePhotoUrl = URL.createObjectURL(leftSidePhoto);
    const rightSidePhotoUrl = URL.createObjectURL(rightSidePhoto);
    
    localStorage.setItem('frontPhotoUrl', frontPhotoUrl);
    localStorage.setItem('backPhotoUrl', backPhotoUrl);
    localStorage.setItem('leftSidePhotoUrl', leftSidePhotoUrl);
    localStorage.setItem('rightSidePhotoUrl', rightSidePhotoUrl);
    localStorage.setItem('sidePhotoUrl', leftSidePhotoUrl);
    
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
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Foto de Costas</h2>
            <PhotoUpload 
              type="back" 
              onPhotoUploaded={handlePhotoUploaded}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Foto Lateral Esquerda</h2>
            <PhotoUpload 
              type="leftSide" 
              onPhotoUploaded={handlePhotoUploaded}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Foto Lateral Direita</h2>
            <PhotoUpload 
              type="rightSide" 
              onPhotoUploaded={handlePhotoUploaded}
            />
          </div>
        </div>

        <div className="mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold mb-2 text-gray-800">Status do Envio:</h3>
          <ul className="text-xs space-y-1.5">
            <li className={`flex items-center font-medium ${frontPhoto ? 'text-green-600' : 'text-gray-500'}`}>
              {frontPhoto ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
              Foto Frontal
            </li>
            <li className={`flex items-center font-medium ${backPhoto ? 'text-green-600' : 'text-gray-500'}`}>
              {backPhoto ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
              Foto de Costas
            </li>
            <li className={`flex items-center font-medium ${leftSidePhoto ? 'text-green-600' : 'text-gray-500'}`}>
              {leftSidePhoto ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
              Foto Lateral Esquerda
            </li>
            <li className={`flex items-center font-medium ${rightSidePhoto ? 'text-green-600' : 'text-gray-500'}`}>
              {rightSidePhoto ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
              Foto Lateral Direita
            </li>
          </ul>
        </div>
        
        <Button 
          onClick={handleAnalyzeClick}
          disabled={!frontPhoto || !backPhoto || !leftSidePhoto || !rightSidePhoto}
          className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
        >
          Analisar meu corpo
        </Button>
      
        <div className="mt-8">
          {uploadedImageSrc && (
            <div className="flex flex-col items-center">
              <img src={uploadedImageSrc} alt="Prévia da foto enviada" className="rounded-lg max-w-xs mb-3 shadow" />
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PhotoUploadPage;
