-- Criar tabela para sessões de treino
CREATE TABLE IF NOT EXISTS public.workout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_name TEXT NOT NULL,
  exercises_completed JSONB DEFAULT '[]'::jsonb,
  duration_minutes INTEGER DEFAULT 0,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para workout_sessions
CREATE POLICY "Users can view their own workout sessions"
ON public.workout_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout sessions"
ON public.workout_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions"
ON public.workout_sessions
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout sessions"
ON public.workout_sessions
FOR DELETE
USING (auth.uid() = user_id);

-- Criar índice para melhor performance
CREATE INDEX idx_workout_sessions_user_id ON public.workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_completed_at ON public.workout_sessions(completed_at DESC);

-- Criar tabela para nutrição diária
CREATE TABLE IF NOT EXISTS public.daily_nutrition (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  meal_name TEXT NOT NULL,
  calories NUMERIC,
  protein NUMERIC,
  carbs NUMERIC,
  fats NUMERIC,
  notes TEXT,
  consumed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.daily_nutrition ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para daily_nutrition
CREATE POLICY "Users can view their own nutrition entries"
ON public.daily_nutrition
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nutrition entries"
ON public.daily_nutrition
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrition entries"
ON public.daily_nutrition
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nutrition entries"
ON public.daily_nutrition
FOR DELETE
USING (auth.uid() = user_id);

-- Criar índices para melhor performance
CREATE INDEX idx_daily_nutrition_user_id ON public.daily_nutrition(user_id);
CREATE INDEX idx_daily_nutrition_consumed_at ON public.daily_nutrition(consumed_at DESC);