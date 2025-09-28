-- Add RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Add RLS policies for progress_photos
CREATE POLICY "Users can view their own photos" ON public.progress_photos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own photos" ON public.progress_photos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos" ON public.progress_photos
  FOR UPDATE USING (auth.uid() = user_id);

-- Add RLS policies for measurements
CREATE POLICY "Users can view their own measurements" ON public.measurements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own measurements" ON public.measurements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own measurements" ON public.measurements
  FOR UPDATE USING (auth.uid() = user_id);

-- Fix search path for existing function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;