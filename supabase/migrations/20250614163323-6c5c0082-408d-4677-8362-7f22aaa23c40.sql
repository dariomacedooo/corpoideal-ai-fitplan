
-- 1. Enum de papéis (se não existir)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('aluno', 'professor');
  END IF;
END$$;

-- 2. Adicionar campo de coach_id ao profiles (já existe, mas garantir a constraint)
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS profiles_coach_id_fkey,
  ADD CONSTRAINT profiles_coach_id_fkey FOREIGN KEY (coach_id) REFERENCES profiles(id);

-- 3. Adicionar campo de role à profiles (já existe, apenas garantir tipo)
ALTER TABLE profiles
  ALTER COLUMN role TYPE user_role USING role::user_role,
  ALTER COLUMN role SET DEFAULT 'aluno';

-- 4. Tabela para convites (se já não existir)
CREATE TABLE IF NOT EXISTS invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id uuid NOT NULL,
  invitee_email text NOT NULL,
  status user_role DEFAULT 'aluno',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Regras de acesso: permitir que professores vejam alunos deles
-- Liberar aos professores acesso a profiles dos seus próprios alunos
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Aluno pode ver seu próprio perfil" ON profiles;
CREATE POLICY "Aluno pode ver seu próprio perfil"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Professor pode ver alunos" ON profiles;
CREATE POLICY "Professor pode ver alunos"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles AS p_coach
      WHERE p_coach.id = auth.uid() AND p_coach.role = 'professor'
        AND profiles.coach_id = p_coach.id
    )
  );

-- Permite que professores criem treinos/dietas para seus alunos
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Professor pode gerenciar treinos de seus alunos"
  ON workout_plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = workout_plans.client_id
      AND profiles.coach_id = auth.uid()
    )
    OR workout_plans.author_id = auth.uid()
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = workout_plans.client_id
      AND profiles.coach_id = auth.uid()
    )
    OR workout_plans.author_id = auth.uid()
  );

-- Repetir mesma lógica para diet_plans
ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Professor pode gerenciar dietas de seus alunos"
  ON diet_plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = diet_plans.client_id
      AND profiles.coach_id = auth.uid()
    )
    OR diet_plans.author_id = auth.uid()
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = diet_plans.client_id
      AND profiles.coach_id = auth.uid()
    )
    OR diet_plans.author_id = auth.uid()
  );

-- Convites: apenas envolvidos podem ver ou alterar
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Envolvidos podem gerenciar convite"
  ON invitations FOR ALL
  USING (
    inviter_id = auth.uid()
    OR invitee_email = (SELECT email FROM profiles WHERE id = auth.uid())
  );
