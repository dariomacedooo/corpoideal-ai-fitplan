import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, CheckCircle } from "lucide-react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

interface SupabasePhotoUploadProps {
  type: 'front' | 'back' | 'left' | 'right';
  onPhotoUploaded: (url: string, path: string) => void;
  photoUrl?: string;
  className?: string;
}

export function SupabasePhotoUpload({ 
  type, 
  onPhotoUploaded, 
  photoUrl, 
  className = "" 
}: SupabasePhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(photoUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { uploadPhoto, uploading } = usePhotoUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload to Supabase
    const result = await uploadPhoto(file, type);
    if (result) {
      onPhotoUploaded(result.url, result.path);
    }

    // Clean up
    URL.revokeObjectURL(objectUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const removePhoto = () => {
    setPreviewUrl('');
    onPhotoUploaded('', '');
  };

  const getPhotoTypeText = () => {
    const types = {
      front: 'Frente',
      back: 'Costas', 
      left: 'Lado Esquerdo',
      right: 'Lado Direito'
    };
    return types[type];
  };

  const getPhotoInstructions = () => {
    const instructions = {
      front: 'Fique de frente para a câmera, braços ao lado do corpo',
      back: 'Fique de costas para a câmera, braços ao lado do corpo',
      left: 'Fique de lado esquerdo para a câmera, braços ao lado do corpo',
      right: 'Fique de lado direito para a câmera, braços ao lado do corpo'
    };
    return instructions[type];
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6">
        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {getPhotoTypeText()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getPhotoInstructions()}
            </p>
          </div>

          {previewUrl ? (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt={`Foto ${type}`}
                className="w-full h-64 object-cover rounded-lg border-2 border-border"
              />
              <Button
                onClick={removePhoto}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
              {!uploading && (
                <div className="absolute top-2 left-2 bg-green-500 text-white p-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 text-muted-foreground/50">
                  <Upload className="w-full h-full" />
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={triggerCameraInput}
                    className="w-full mb-2"
                    disabled={uploading}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {uploading ? 'Enviando...' : 'Tirar Foto'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={triggerFileInput}
                    className="w-full"
                    disabled={uploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? 'Enviando...' : 'Escolher da Galeria'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}