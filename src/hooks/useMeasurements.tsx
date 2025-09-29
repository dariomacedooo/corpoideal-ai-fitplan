import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Measurement {
  id: string;
  user_id: string;
  created_at: string;
  weight: number | null;
  body_fat: number | null;
  muscle_mass: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  arms: number | null;
  thighs: number | null;
}

export const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [latestMeasurement, setLatestMeasurement] = useState<Measurement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMeasurements = async () => {
    if (!user) {
      setMeasurements([]);
      setLatestMeasurement(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('measurements')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching measurements:', error);
      toast({
        title: "Erro ao carregar medidas",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setMeasurements(data || []);
      setLatestMeasurement(data?.[0] || null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeasurements();
  }, [user]);

  const addMeasurement = async (measurementData: {
    weight?: number;
    body_fat?: number;
    muscle_mass?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  }) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para adicionar medidas",
        variant: "destructive"
      });
      return false;
    }

    const { error } = await supabase
      .from('measurements')
      .insert({
        user_id: user.id,
        ...measurementData
      });

    if (error) {
      console.error('Error saving measurement:', error);
      toast({
        title: "Erro ao salvar medidas",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Medidas salvas!",
      description: "Suas medidas foram registradas com sucesso."
    });

    await fetchMeasurements();
    return true;
  };

  return {
    measurements,
    latestMeasurement,
    isLoading,
    addMeasurement,
    refreshMeasurements: fetchMeasurements
  };
};
