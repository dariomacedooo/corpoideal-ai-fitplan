
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PhotoUploadProps {
  type: 'front' | 'back' | 'leftSide' | 'rightSide';
  onPhotoUploaded: (file: File, type: 'front' | 'back' | 'leftSide' | 'rightSide') => void;
  photoUrl?: string;
}

export function PhotoUpload({ type, onPhotoUploaded, photoUrl }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      
      {previewUrl ? (
        <div className="relative w-full h-64 bg-gray-100">
          <img 
            src={previewUrl} 
            alt={`Foto ${getPhotoTypeText()}`}
            className="photo-preview w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-xs text-white mb-1">{getPhotoTypeText()}</p>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={triggerFileInput}
              className="w-full"
            >
              Trocar foto
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="upload-area h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center gap-2 p-4 text-center" onClick={triggerFileInput}>
              <Camera className="h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-600 font-medium">Tirar ou escolher foto {getPhotoTypeText()}</p>
              <p className="text-xs text-gray-400 max-w-[90%]">{getPhotoInstructions()}</p>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // This ensures we can select files from gallery
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-1"
                >
                  <Upload className="h-4 w-4" />
                  Escolher da galeria
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
