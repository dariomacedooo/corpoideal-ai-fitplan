import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface ProgressPhoto {
  id: string;
  user_id: string;
  created_at: string;
  front_photo_url: string | null;
  back_photo_url: string | null;
  left_side_photo_url: string | null;
  right_side_photo_url: string | null;
  notes: string | null;
}

export const useProgressPhotos = () => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPhotos = async () => {
    if (!user) {
      setPhotos([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('progress_photos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching progress photos:', error);
      toast({
        title: "Erro ao carregar fotos",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setPhotos(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, [user]);

  const uploadPhotoToStorage = async (file: File, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from('user-photos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading photo:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('user-photos')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const addProgressEntry = async (
    frontPhoto: File | null,
    backPhoto: File | null,
    leftSidePhoto: File | null,
    rightSidePhoto: File | null,
    notes?: string
  ) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para adicionar fotos",
        variant: "destructive"
      });
      return false;
    }

    const timestamp = new Date().getTime();
    const userId = user.id;

    // Upload photos to storage
    const frontUrl = frontPhoto ? await uploadPhotoToStorage(
      frontPhoto, 
      `${userId}/progress/${timestamp}_front.jpg`
    ) : null;

    const backUrl = backPhoto ? await uploadPhotoToStorage(
      backPhoto, 
      `${userId}/progress/${timestamp}_back.jpg`
    ) : null;

    const leftSideUrl = leftSidePhoto ? await uploadPhotoToStorage(
      leftSidePhoto, 
      `${userId}/progress/${timestamp}_left.jpg`
    ) : null;

    const rightSideUrl = rightSidePhoto ? await uploadPhotoToStorage(
      rightSidePhoto, 
      `${userId}/progress/${timestamp}_right.jpg`
    ) : null;

    // Save to database
    const { error } = await supabase
      .from('progress_photos')
      .insert({
        user_id: userId,
        front_photo_url: frontUrl,
        back_photo_url: backUrl,
        left_side_photo_url: leftSideUrl,
        right_side_photo_url: rightSideUrl,
        notes: notes || null
      });

    if (error) {
      console.error('Error saving progress entry:', error);
      toast({
        title: "Erro ao salvar progresso",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Progresso salvo!",
      description: "Suas fotos foram salvas com sucesso."
    });

    // Refresh photos list
    await fetchPhotos();
    return true;
  };

  return {
    photos,
    isLoading,
    addProgressEntry,
    refreshPhotos: fetchPhotos
  };
};
