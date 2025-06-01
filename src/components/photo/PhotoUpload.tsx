
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PhotoUploadProps {
  type: 'front' | 'back' | 'leftSide' | 'rightSide';
  onPhotoUploaded: (file: File, type: 'front' | 'back' | 'leftSide' | 'rightSide') => void;
  photoUrl?: string;
}

export function PhotoUpload({ type, onPhotoUploaded, photoUrl }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Erro ao enviar foto",
        description: "Por favor, envie apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Send file to parent component
    onPhotoUploaded(file, type);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const getPhotoTypeText = () => {
    switch(type) {
      case 'front': return 'frontal';
      case 'back': return 'de costas';
      case 'leftSide': return 'lateral esquerda';
      case 'rightSide': return 'lateral direita';
      default: return '';
    }
  };

  const getPhotoInstructions = () => {
    switch(type) {
      case 'front': 
        return 'Posicione-se de frente para a câmera, com os braços levemente afastados do corpo. Mantenha a postura natural.';
      case 'back': 
        return 'Posicione-se de costas para a câmera, com os braços levemente afastados do corpo. Mantenha a postura ereta.';
      case 'leftSide': 
        return 'Posicione-se com seu lado esquerdo para a câmera, em posição natural. Braços ao longo do corpo.';
      case 'rightSide': 
        return 'Posicione-se com seu lado direito para a câmera, em posição natural. Braços ao longo do corpo.';
      default: 
        return '';
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="relative w-full h-64 bg-gray-100">
          <img 
            src={previewUrl} 
            alt={`Foto ${getPhotoTypeText()}`}
            className="photo-preview w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-xs text-white mb-1">{getPhotoTypeText()}</p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={triggerCameraInput}
                className="flex-1 text-xs"
              >
                <Camera className="h-3 w-3 mr-1" />
                Câmera
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={triggerFileInput}
                className="flex-1 text-xs"
              >
                <Image className="h-3 w-3 mr-1" />
                Galeria
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="upload-area h-64 bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <div className="flex gap-4">
              <Button
                onClick={triggerCameraInput}
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
              >
                <Camera className="h-8 w-8 text-gray-600 mb-2" />
                <span className="text-xs">Tirar foto</span>
              </Button>
              
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
              >
                <Image className="h-8 w-8 text-gray-600 mb-2" />
                <span className="text-xs">Galeria</span>
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 font-medium">Foto {getPhotoTypeText()}</p>
            <p className="text-xs text-gray-400 max-w-[90%]">{getPhotoInstructions()}</p>
            
            <div className="text-xs text-gray-400 mt-2 flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              <span>Escolha uma opção acima</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
