import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

interface PhotoUploadResult {
  url: string;
  path: string;
}

export const usePhotoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const compressImage = (file: File, maxWidth: number = 1024, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const uploadPhoto = async (
    file: File, 
    category: 'front' | 'back' | 'left' | 'right' | 'avatar'
  ): Promise<PhotoUploadResult | null> => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return null;
    }

    setUploading(true);

    try {
      // Compress image
      const compressedFile = await compressImage(file);

      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `${category}_${timestamp}.jpg`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-photos')
        .getPublicUrl(filePath);

      toast({
        title: "Foto enviada!",
        description: "Sua foto foi salva com sucesso.",
      });

      return {
        url: publicUrl,
        path: filePath
      };

    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const saveProgressPhotos = async (photos: {
    front_photo_url?: string;
    back_photo_url?: string;
    left_side_photo_url?: string;
    right_side_photo_url?: string;
    notes?: string;
  }) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('progress_photos')
        .insert({
          user_id: user.id,
          ...photos
        });

      if (error) throw error;

      toast({
        title: "Fotos salvas!",
        description: "Suas fotos de progresso foram registradas.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error saving progress photos:', error);
      toast({
        title: "Erro ao salvar fotos",
        description: error.message,
        variant: "destructive",
      });
      return { error: error.message };
    }
  };

  const getProgressPhotos = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('progress_photos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching progress photos:', error);
      return [];
    }
  };

  return {
    uploadPhoto,
    saveProgressPhotos,
    getProgressPhotos,
    uploading
  };
};