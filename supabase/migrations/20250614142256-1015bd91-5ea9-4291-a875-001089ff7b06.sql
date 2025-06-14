
-- Criar enum para roles de usuário
CREATE TYPE user_role AS ENUM ('aluno', 'professor');

-- Criar enum para status de convites
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined');

-- Criar tabela de perfis de usuário com roles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  role user_role DEFAULT 'aluno',
  coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de convites
CREATE TABLE public.invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  invitee_email TEXT NOT NULL,
  status invitation_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de planos de treino
CREATE TABLE public.workout_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  exercises JSONB,
  client_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de planos de dieta
CREATE TABLE public.diet_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  meals JSONB,
  client_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Coaches can view their students profiles" ON public.profiles
  FOR SELECT USING (auth.uid() = coach_id);

-- Políticas RLS para invitations
CREATE POLICY "Users can view invitations they sent" ON public.invitations
  FOR SELECT USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invitations" ON public.invitations
  FOR INSERT WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update invitations they sent" ON public.invitations
  FOR UPDATE USING (auth.uid() = inviter_id);

-- Políticas RLS para workout_plans
CREATE POLICY "Users can view their own workout plans" ON public.workout_plans
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = author_id);

CREATE POLICY "Coaches can create workout plans for their students" ON public.workout_plans
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = client_id AND coach_id = auth.uid()
    )
  );

CREATE POLICY "Authors can update their workout plans" ON public.workout_plans
  FOR UPDATE USING (auth.uid() = author_id);

-- Políticas RLS para diet_plans
CREATE POLICY "Users can view their own diet plans" ON public.diet_plans
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = author_id);

CREATE POLICY "Coaches can create diet plans for their students" ON public.diet_plans
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = client_id AND coach_id = auth.uid()
    )
  );

CREATE POLICY "Authors can update their diet plans" ON public.diet_plans
  FOR UPDATE USING (auth.uid() = author_id);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'aluno'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
