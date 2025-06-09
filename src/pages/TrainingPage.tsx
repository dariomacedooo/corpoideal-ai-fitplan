
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WorkoutPlan } from "@/components/training/WorkoutPlan";
import { LoadProgress } from "@/components/training/LoadProgress";
import { WorkoutCustomizer } from "@/components/training/WorkoutCustomizer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScientificWorkoutPlan } from "@/components/training/ScientificWorkoutPlan";
import { FemaleWorkoutPlan } from "@/components/training/FemaleWorkoutPlan";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

const TrainingPage = () => {
  const { profile } = useUserProfile();
  const [workoutDays, setWorkoutDays] = useState([]);
  const [customWorkout, setCustomWorkout] = useState([]);

  useEffect(() => {
    if (profile?.goal && profile?.trainingExperience && profile?.trainingLocation) {
      const generatedWorkout = generateWorkoutPlan(
        profile.goal,
        profile.trainingExperience,
        profile.trainingLocation
      );
      setWorkoutDays(generatedWorkout);
    }
  }, [profile]);

  const handleSaveCustomWorkout = (workout: any[]) => {
    setCustomWorkout(workout);
    // Aqui você pode adicionar lógica para salvar no localStorage ou backend
    localStorage.setItem('customWorkout', JSON.stringify(workout));
  };

  const generateWorkoutPlan = (goal: string, experience: string, location: string) => {
    // Workouts específicos baseados no objetivo
    if (goal === 'ganhar-massa' || goal === 'ganhar-musculos') {
      return generateMuscleGainWorkout(experience, location);
    } else if (goal === 'perder-peso') {
      return generateWeightLossWorkout(experience, location);
    } else if (goal === 'ganhar-peso') {
      return generateWeightGainWorkout(experience, location);
    } else if (goal === 'manter-peso') {
      return generateMaintenanceWorkout(experience, location);
    }
    
    return generateDefaultWorkout(experience, location);
  };

  const generateMuscleGainWorkout = (experience: string, location: string) => {
    const baseExercises = location === 'academia' 
      ? getGymExercises() 
      : location === 'casa' 
        ? getHomeExercises()
        : getOutdoorExercises();

    if (experience === 'avancado') {
      return [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            { name: 'Supino Reto', sets: 4, reps: '8-10', videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y', tip: 'Mantenha os ombros retraídos e controlados', equipment: location === 'academia' ? 'Barra e banco' : 'Halteres' },
            { name: 'Supino Inclinado', sets: 4, reps: '8-10', videoUrl: 'https://www.youtube.com/watch?v=IP4oeKMOb_s', tip: 'Foque na contração no peito superior', equipment: location === 'academia' ? 'Banco inclinado' : 'Halteres' },
            { name: 'Crucifixo', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0', tip: 'Amplitude completa controlada', equipment: location === 'academia' ? 'Halteres' : 'Halteres' },
            { name: 'Paralelas', sets: 3, reps: '8-12', videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As', tip: 'Incline o corpo para frente', equipment: location === 'academia' ? 'Paralelas' : 'Cadeiras' },
            { name: 'Tríceps Testa', sets: 4, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM', tip: 'Mantenha cotovelos fixos', equipment: 'Halteres' },
            { name: 'Tríceps Pulley', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=vB5OHsJ3EME', tip: 'Extensão completa', equipment: location === 'academia' ? 'Cabo' : 'Elástico' }
          ]
        },
        {
          day: 'Terça',
          focus: 'Costas e Bíceps',
          exercises: [
            { name: 'Barra Fixa', sets: 4, reps: '6-10', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g', tip: 'Pegada pronada, peito para fora', equipment: location === 'academia' ? 'Barra fixa' : 'Barra de porta' },
            { name: 'Remada Curvada', sets: 4, reps: '8-10', videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ', tip: 'Mantenha as costas retas', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Pulldown', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc', tip: 'Leve a barra até o peito', equipment: location === 'academia' ? 'Puxador' : 'Elástico' },
            { name: 'Remada Unilateral', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo', tip: 'Uma mão de cada vez', equipment: 'Halteres' },
            { name: 'Rosca Direta', sets: 4, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo', tip: 'Não balance o corpo', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Rosca Martelo', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4', tip: 'Pegada neutra', equipment: 'Halteres' }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Pernas (Quadríceps focus)',
          exercises: [
            { name: 'Agachamento', sets: 4, reps: '8-10', videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', tip: 'Desça até 90 graus', equipment: location === 'academia' ? 'Barra' : 'Peso corporal' },
            { name: 'Leg Press', sets: 4, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ', tip: 'Amplitude completa', equipment: location === 'academia' ? 'Leg Press' : 'Agachamento búlgaro' },
            { name: 'Cadeira Extensora', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0', tip: 'Pausa no topo', equipment: location === 'academia' ? 'Máquina' : 'Agachamento isométrico' },
            { name: 'Afundo', sets: 3, reps: '10-12 cada', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', tip: 'Joelho não passa da ponta do pé', equipment: location === 'academia' ? 'Halteres' : 'Peso corporal' },
            { name: 'Panturrilha em Pé', sets: 4, reps: '15-20', videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI', tip: 'Amplitude máxima', equipment: location === 'academia' ? 'Máquina' : 'Step' }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Ombros e Trapézio',
          exercises: [
            { name: 'Desenvolvimento', sets: 4, reps: '8-10', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog', tip: 'Não desça muito a barra', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Elevação Lateral', sets: 4, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo', tip: 'Cotovelos ligeiramente flexionados', equipment: 'Halteres' },
            { name: 'Elevação Frontal', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=qzaXBB_1w68', tip: 'Alternado ou simultâneo', equipment: 'Halteres' },
            { name: 'Crucifixo Inverso', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=ea7qmaN3AOk', tip: 'Ombros para trás', equipment: 'Halteres' },
            { name: 'Encolhimento', sets: 4, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=g6qbq4Lf1FI', tip: 'Movimento vertical', equipment: location === 'academia' ? 'Barra' : 'Halteres' }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Pernas (Posterior focus)',
          exercises: [
            { name: 'Stiff', sets: 4, reps: '8-10', videoUrl: 'https://www.youtube.com/watch?v=1uDiW5-_Jps', tip: 'Joelhos levemente flexionados', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Mesa Flexora', sets: 4, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg', tip: 'Contração no topo', equipment: location === 'academia' ? 'Máquina' : 'Flexão nórdica' },
            { name: 'Agachamento Sumo', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=0YBqiWA7-0o', tip: 'Pés bem afastados', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Cadeira Adutora', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=eP-lhJuAUho', tip: 'Movimento controlado', equipment: location === 'academia' ? 'Máquina' : 'Agachamento lateral' },
            { name: 'Panturrilha Sentado', sets: 4, reps: '15-20', videoUrl: 'https://www.youtube.com/watch?v=tU3AXOjPCho', tip: 'Pausa na contração', equipment: location === 'academia' ? 'Máquina' : 'Peso sobre coxa' }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Core e Funcional',
          exercises: [
            { name: 'Prancha', sets: 3, reps: '45-60s', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', tip: 'Corpo reto como prancha', equipment: 'Peso corporal' },
            { name: 'Abdominal Bicicleta', sets: 3, reps: '20 cada lado', videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8', tip: 'Movimento controlado', equipment: 'Peso corporal' },
            { name: 'Russian Twist', sets: 3, reps: '20 cada lado', videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI', tip: 'Pode usar peso', equipment: location === 'academia' ? 'Medicine ball' : 'Peso corporal' },
            { name: 'Mountain Climber', sets: 3, reps: '30s', videoUrl: 'https://www.youtube.com/watch?v=wQq3ybaLu1E', tip: 'Ritmo acelerado', equipment: 'Peso corporal' },
            { name: 'Burpee', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=auBLPXO8Fww', tip: 'Movimento completo', equipment: 'Peso corporal' }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso Ativo',
          exercises: [
            { name: 'Caminhada', sets: 1, reps: '30-45 min', videoUrl: 'https://www.youtube.com/watch?v=NKDNgK7HB0s', tip: 'Ritmo moderado', equipment: 'Nenhum' },
            { name: 'Alongamento', sets: 1, reps: '15-20 min', videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A', tip: 'Todos os grupos musculares', equipment: 'Nenhum' },
            { name: 'Foam Rolling', sets: 1, reps: '10-15 min', videoUrl: 'https://www.youtube.com/watch?v=_5j_VQJ6Oew', tip: 'Movimentos lentos', equipment: location === 'academia' ? 'Foam roller' : 'Alongamento' }
          ]
        }
      ];
    } else if (experience === 'intermediario') {
      return [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            { name: 'Flexão', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', tip: 'Corpo reto, desça até o peito quase tocar o chão', equipment: 'Peso corporal' },
            { name: 'Supino com Halteres', sets: 3, reps: '8-12', videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94', tip: 'Movimento controlado', equipment: 'Halteres' },
            { name: 'Crucifixo', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0', tip: 'Amplitude completa', equipment: 'Halteres' },
            { name: 'Tríceps Mergulho', sets: 3, reps: '8-12', videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM', tip: 'Use cadeira ou banco', equipment: location === 'casa' ? 'Cadeira' : 'Paralelas' },
            { name: 'Tríceps Francês', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM', tip: 'Cotovelos fixos', equipment: 'Halteres' }
          ]
        },
        {
          day: 'Terça',
          focus: 'Costas e Bíceps',
          exercises: [
            { name: 'Remada Curvada', sets: 3, reps: '8-12', videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ', tip: 'Mantenha as costas retas', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Pulldown', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc', tip: 'Leve a barra até o peito', equipment: location === 'academia' ? 'Puxador' : 'Elástico' },
            { name: 'Rosca Direta', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo', tip: 'Não balance o corpo', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Rosca Martelo', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4', tip: 'Pegada neutra', equipment: 'Halteres' }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Pernas',
          exercises: [
            { name: 'Agachamento', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', tip: 'Desça até 90 graus', equipment: location === 'academia' ? 'Barra' : 'Peso corporal' },
            { name: 'Leg Press', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ', tip: 'Amplitude completa', equipment: location === 'academia' ? 'Leg Press' : 'Agachamento búlgaro' },
            { name: 'Cadeira Extensora', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0', tip: 'Pausa no topo', equipment: location === 'academia' ? 'Máquina' : 'Agachamento isométrico' },
            { name: 'Panturrilha em Pé', sets: 3, reps: '15-20', videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI', tip: 'Amplitude máxima', equipment: location === 'academia' ? 'Máquina' : 'Step' }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Ombros',
          exercises: [
            { name: 'Desenvolvimento', sets: 3, reps: '8-12', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog', tip: 'Não desça muito a barra', equipment: location === 'academia' ? 'Barra' : 'Halteres' },
            { name: 'Elevação Lateral', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo', tip: 'Cotovelos ligeiramente flexionados', equipment: 'Halteres' },
            { name: 'Elevação Frontal', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=qzaXBB_1w68', tip: 'Alternado ou simultâneo', equipment: 'Halteres' }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Core e Funcional',
          exercises: [
            { name: 'Prancha', sets: 3, reps: '30-45s', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', tip: 'Corpo reto', equipment: 'Peso corporal' },
            { name: 'Abdominal Bicicleta', sets: 3, reps: '20 cada lado', videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8', tip: 'Movimento controlado', equipment: 'Peso corporal' },
            { name: 'Mountain Climber', sets: 3, reps: '30s', videoUrl: 'https://www.youtube.com/watch?v=wQq3ybaLu1E', tip: 'Ritmo acelerado', equipment: 'Peso corporal' }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Descanso Ativo',
          exercises: [
            { name: 'Caminhada', sets: 1, reps: '30 min', videoUrl: 'https://www.youtube.com/watch?v=NKDNgK7HB0s', tip: 'Ritmo confortável', equipment: 'Nenhum' },
            { name: 'Alongamento', sets: 1, reps: '15 min', videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A', tip: 'Todos os grupos musculares', equipment: 'Nenhum' }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso',
          exercises: []
        }
      ];
    } else {
      // Iniciante
      return [
        {
          day: 'Segunda',
          focus: 'Corpo Inteiro',
          exercises: [
            { name: 'Agachamento Livre', sets: 2, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', tip: 'Mantenha as costas retas', equipment: 'Peso corporal' },
            { name: 'Flexão (joelhos)', sets: 2, reps: '8-12', videoUrl: 'https://www.youtube.com/watch?v=jWxvty2KROs', tip: 'Comece com joelhos apoiados', equipment: 'Peso corporal' },
            { name: 'Prancha', sets: 2, reps: '20-30s', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', tip: 'Mantenha o corpo reto', equipment: 'Peso corporal' },
            { name: 'Caminhada', sets: 1, reps: '20 min', videoUrl: 'https://www.youtube.com/watch?v=NKDNgK7HB0s', tip: 'Ritmo confortável', equipment: 'Nenhum' }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Corpo Inteiro',
          exercises: [
            { name: 'Agachamento com Cadeira', sets: 2, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', tip: 'Use cadeira para apoio', equipment: 'Peso corporal' },
            { name: 'Remada com Elástico', sets: 2, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=IOUx0EQUAO0', tip: 'Aperte as escápulas', equipment: 'Elástico' },
            { name: 'Elevação Lateral', sets: 2, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo', tip: 'Cotovelos ligeiramente flexionados', equipment: 'Halteres' },
            { name: 'Prancha Lateral', sets: 2, reps: '20-30s', videoUrl: 'https://www.youtube.com/watch?v=K2VljzCC16g', tip: 'Corpo alinhado', equipment: 'Peso corporal' }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Corpo Inteiro',
          exercises: [
            { name: 'Step-up', sets: 2, reps: '10-12 cada perna', videoUrl: 'https://www.youtube.com/watch?v=dQqApCGd5Ss', tip: 'Use degrau estável', equipment: 'Peso corporal' },
            { name: 'Flexão contra a parede', sets: 2, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', tip: 'Corpo reto', equipment: 'Peso corporal' },
            { name: 'Abdominal Crunch', sets: 2, reps: '15-20', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', tip: 'Contraia o abdômen', equipment: 'Peso corporal' },
            { name: 'Alongamento', sets: 1, reps: '15 min', videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A', tip: 'Relaxe os músculos', equipment: 'Nenhum' }
          ]
        }
      ];
    }
  };

  const generateWeightLossWorkout = (experience: string, location: string) => {
    // Treino focado em queima de gordura com mais cardio
    return [
      {
        day: 'Segunda',
        focus: 'Cardio + Core',
        exercises: [
          { name: 'Jumping Jacks', sets: 4, reps: '30s', videoUrl: 'https://www.youtube.com/watch?v=iSSAk4XCsRA', tip: 'Movimento explosivo', equipment: 'Peso corporal' },
          { name: 'Burpee', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=auBLPXO8Fww', tip: 'Ritmo constante', equipment: 'Peso corporal' },
          { name: 'Mountain Climber', sets: 4, reps: '30s', videoUrl: 'https://www.youtube.com/watch?v=wQq3ybaLu1E', tip: 'Rápido e controlado', equipment: 'Peso corporal' },
          { name: 'Prancha', sets: 3, reps: '30-45s', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', tip: 'Estabilize o core', equipment: 'Peso corporal' },
          { name: 'High Knees', sets: 4, reps: '30s', videoUrl: 'https://www.youtube.com/watch?v=x_4inPt7RCw', tip: 'Joelhos até o peito', equipment: 'Peso corporal' }
        ]
      },
      {
        day: 'Quarta',
        focus: 'Treino Funcional',
        exercises: [
          { name: 'Agachamento com Salto', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=U4s4mEQ5VqU', tip: 'Explosivo e controlado', equipment: 'Peso corporal' },
          { name: 'Flexão', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', tip: 'Corpo reto', equipment: 'Peso corporal' },
          { name: 'Abdominal Bicicleta', sets: 3, reps: '20 cada lado', videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8', tip: 'Movimento controlado', equipment: 'Peso corporal' },
          { name: 'Burpee', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=auBLPXO8Fww', tip: 'Movimento completo', equipment: 'Peso corporal' }
        ]
      },
      {
        day: 'Sexta',
        focus: 'Cardio + Força',
        exercises: [
          { name: 'Corrida leve', sets: 1, reps: '20-30 min', videoUrl: 'https://www.youtube.com/watch?v=Qh6v3v6v6xk', tip: 'Ritmo confortável', equipment: 'Nenhum' },
          { name: 'Agachamento', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', tip: 'Mantenha as costas retas', equipment: 'Peso corporal' },
          { name: 'Flexão', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', tip: 'Corpo reto', equipment: 'Peso corporal' },
          { name: 'Prancha', sets: 3, reps: '30-45s', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', tip: 'Estabilize o core', equipment: 'Peso corporal' }
        ]
      },
      {
        day: 'Domingo',
        focus: 'Descanso Ativo',
        exercises: [
          { name: 'Caminhada', sets: 1, reps: '30-45 min', videoUrl: 'https://www.youtube.com/watch?v=NKDNgK7HB0s', tip: 'Ritmo moderado', equipment: 'Nenhum' },
          { name: 'Alongamento', sets: 1, reps: '15-20 min', videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A', tip: 'Todos os grupos musculares', equipment: 'Nenhum' }
        ]
      }
    ];
  };

  const generateWeightGainWorkout = (experience: string, location: string) => {
    // Similar ao ganho de massa mas com foco em volume
    return generateMuscleGainWorkout(experience, location);
  };

  const generateMaintenanceWorkout = (experience: string, location: string) => {
    // Treino balanceado para manutenção
    return [
      {
        day: 'Segunda',
        focus: 'Upper Body',
        exercises: [
          { name: 'Flexão', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', tip: 'Forma perfeita', equipment: 'Peso corporal' },
          { name: 'Remada com Elástico', sets: 3, reps: '12-15', videoUrl: 'https://www.youtube.com/watch?v=IOUx0EQUAO0', tip: 'Aperte as escápulas', equipment: 'Elástico' },
          { name: 'Desenvolvimento', sets: 3, reps: '10-12', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog', tip: 'Amplitude controlada', equipment: 'Halteres' }
        ]
      },
      {
        day: 'Quarta',
        focus: 'Lower Body',
        exercises: [
          { name: 'Agachamento', sets: 3, reps: '10-15', videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', tip: 'Mantenha as costas retas', equipment: 'Peso corporal' },
          { name: 'Afundo', sets: 3, reps: '10-12 cada perna', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', tip: 'Joelho não passa da ponta do pé', equipment: 'Peso corporal' },
          { name: 'Panturrilha em Pé', sets: 3, reps: '15-20', videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI', tip: 'Amplitude máxima', equipment: 'Peso corporal' }
        ]
      },
      {
        day: 'Sexta',
        focus: 'Core e Funcional',
        exercises: [
          { name: 'Prancha', sets: 3, reps: '30-45s', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', tip: 'Corpo reto', equipment: 'Peso corporal' },
          { name: 'Abdominal Bicicleta', sets: 3, reps: '20 cada lado', videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8', tip: 'Movimento controlado', equipment: 'Peso corporal' },
          { name: 'Mountain Climber', sets: 3, reps: '30s', videoUrl: 'https://www.youtube.com/watch?v=wQq3ybaLu1E', tip: 'Ritmo acelerado', equipment: 'Peso corporal' }
        ]
      }
    ];
  };

  const generateDefaultWorkout = (experience: string, location: string) => {
    return generateMaintenanceWorkout(experience, location);
  };

  const getGymExercises = () => ({
    // Exercícios específicos para academia
  });

  const getHomeExercises = () => ({
    // Exercícios para casa
  });

  const getOutdoorExercises = () => ({
    // Exercícios ao ar livre
  });

  const isFemale = profile?.gender === 'feminino' || profile?.sex === 'feminino';
  const userAge = profile?.age ? parseInt(profile.age, 10) : 25;

  if (!profile) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="main-title mb-4">Seu Plano de Treino</h1>
          <p className="subtitle mb-6">
            Complete seu perfil primeiro para ver seu plano personalizado.
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="main-title mb-2">
          Treino - {profile.name || 'Usuário'}
        </h1>
        <p className="subtitle mb-6">
          Treino personalizado para {profile.goal === 'ganhar-massa' ? 'Ganho de Massa' : 
          profile.goal === 'perder-peso' ? 'Perda de Peso' : 
          profile.goal === 'ganhar-peso' ? 'Ganho de Peso' : 'Manutenção'} • Nível {profile.trainingExperience}
          {isFemale && ` • Foco Feminino`}
        </p>
        
        <Tabs defaultValue={isFemale ? 'female' : 'customizer'} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card-soft rounded-2xl p-1 shadow-subtle">
            <TabsTrigger 
              value="customizer" 
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Personalizar
            </TabsTrigger>
            {isFemale && (
              <TabsTrigger 
                value="female"
                className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
              >
                Feminino
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="scientific"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Científico
            </TabsTrigger>
            <TabsTrigger 
              value="workout"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Plano Básico
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Progresso
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="customizer" className="mt-6">
            <WorkoutCustomizer 
              initialWorkout={customWorkout}
              onSaveWorkout={handleSaveCustomWorkout}
              isVisible={true}
            />
          </TabsContent>
          
          {isFemale && (
            <TabsContent value="female" className="mt-6">
              <FemaleWorkoutPlan 
                age={userAge}
                experience={profile.trainingExperience}
                goal={profile.goal}
                hormonePhase="folicular"
              />
            </TabsContent>
          )}
          
          <TabsContent value="scientific" className="mt-6">
            <ScientificWorkoutPlan 
              goal={profile.goal}
              trainingLocation={profile.trainingLocation}
              experience={profile.trainingExperience}
              daysPerWeek={5}
            />
          </TabsContent>
          
          <TabsContent value="workout" className="mt-6">
            <WorkoutPlan 
              goal={profile.goal}
              workoutDays={workoutDays}
              trainingLocation={profile.trainingLocation}
              experience={profile.trainingExperience}
            />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <LoadProgress />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default TrainingPage;
