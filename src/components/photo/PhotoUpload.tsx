
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PhotoUploadProps {
  type: 'front' | 'side' | 'back';
  onPhotoUploaded: (file: File, type: 'front' | 'side' | 'back') => void;
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
      case 'side': return 'lateral';
      default: return '';
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
        <div className="relative w-full h-64">
          <img 
            src={previewUrl} 
            alt={`Foto ${getPhotoTypeText()}`}
            className="photo-preview w-full h-full object-cover"
          />
          <Button 
            variant="secondary" 
            size="sm"
            onClick={triggerFileInput}
            className="absolute bottom-2 right-2"
          >
            Trocar
          </Button>
        </div>
      ) : (
        <div 
          onClick={triggerFileInput}
          className="upload-area h-64 bg-gray-50 flex items-center justify-center cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-500">Clique para enviar foto {getPhotoTypeText()}</p>
            <p className="text-xs text-gray-400">Recomendação: tire a foto em frente a um fundo neutro</p>
          </div>
        </div>
      )}
    </Card>
  );
}
