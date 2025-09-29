import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface MealEntry {
  id: string;
  user_id: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  meal_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  notes: string | null;
  consumed_at: string;
}

export const useDailyNutrition = () => {
  const [todayMeals, setTodayMeals] = useState<MealEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyTotals, setDailyTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    mealsLogged: 0
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTodayMeals = async () => {
    if (!user) {
      setTodayMeals([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('daily_nutrition')
      .select('*')
      .eq('user_id', user.id)
      .gte('consumed_at', today.toISOString())
      .order('consumed_at', { ascending: false });

    if (error) {
      console.error('Error fetching meals:', error);
    } else {
      setTodayMeals(data || []);
      
      // Calculate totals
      const totals = (data || []).reduce((acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fats: acc.fats + (meal.fats || 0),
        mealsLogged: acc.mealsLogged + 1
      }), { calories: 0, protein: 0, carbs: 0, fats: 0, mealsLogged: 0 });
      
      setDailyTotals(totals);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodayMeals();
  }, [user]);

  const logMeal = async (mealData: {
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    meal_name: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    notes?: string;
  }) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para registrar refeições",
        variant: "destructive"
      });
      return false;
    }

    const { error } = await supabase
      .from('daily_nutrition')
      .insert({
        user_id: user.id,
        ...mealData,
        consumed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error logging meal:', error);
      toast({
        title: "Erro ao registrar refeição",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Refeição registrada!",
      description: `${mealData.meal_name} adicionado ao seu registro.`
    });

    await fetchTodayMeals();
    return true;
  };

  return {
    todayMeals,
    isLoading,
    dailyTotals,
    logMeal,
    refreshMeals: fetchTodayMeals
  };
};
