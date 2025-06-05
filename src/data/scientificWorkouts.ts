
import { trainingLevels, getTrainingSplit } from '@/utils/trainingCalculator';

interface ScientificExercise {
  name: string;
  sets: string;
  reps: string;
  videoUrl: string;
  tip: string;
  equipment?: string;
  muscleGroup: string;
  type: 'compound' | 'isolation';
  weeklyVolume: number;
}

interface ScientificWorkoutDay {
  day: string;
  focus: string;
  exercises: ScientificExercise[];
  totalVolume: {
    chest: number;
    back: number;
    shoulders: number;
    arms: number;
    legs: number;
  };
}

export const generateScientificWorkout = (
  experience: string,
  trainingLocation: string,
  goal: string,
  daysPerWeek: number = 5
): ScientificWorkoutDay[] => {
  const level = trainingLevels[experience] || trainingLevels.iniciante;
  const split = getTrainingSplit(daysPerWeek);
  
  // Base exercises for different training splits
  if (split.type === 'Full Body') {
    return generateFullBodyWorkout(level, trainingLocation, goal);
  } else if (split.type === 'Upper/Lower') {
    return generateUpperLowerWorkout(level, trainingLocation, goal);
  } else {
    return generatePushPullLegsWorkout(level, trainingLocation, goal);
  }
};

const generatePushPullLegsWorkout = (
  level: any,
  location: string,
  goal: string
): ScientificWorkoutDay[] => {
  const isGym = location === 'academia';
  
  return [
    {
      day: 'Segunda',
      focus: 'Push (Peito, Ombros, Tríceps)',
      exercises: [
        {
          name: isGym ? 'Supino Reto' : 'Flexão',
          sets: experience === 'avancado' ? '4-5' : experience === 'intermediario' ? '3-4' : '2-3',
          reps: level.name === 'Avançado' ? '6-8 (RIR 1-2)' : level.name === 'Intermediário' ? '8-10 (RIR 2-3)' : '10-12 (RIR 3-4)',
          videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
          tip: `${level.progressionStrategy}. Descanso: ${level.restPeriods.compound}`,
          equipment: isGym ? 'Barra e banco' : 'Peso corporal',
          muscleGroup: 'chest',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: isGym ? 'Supino Inclinado' : 'Flexão Inclinada',
          sets: experience === 'avancado' ? '3-4' : experience === 'intermediario' ? '3' : '2-3',
          reps: level.name === 'Avançado' ? '8-10 (RIR 1-2)' : level.name === 'Intermediário' ? '10-12 (RIR 2-3)' : '12-15 (RIR 3-4)',
          videoUrl: 'https://www.youtube.com/watch?v=IP4oeKMOb_s',
          tip: `Técnicas aplicadas: ${level.techniques.join(', ')}`,
          equipment: isGym ? 'Banco inclinado' : 'Superfície elevada',
          muscleGroup: 'chest',
          type: 'compound',
          weeklyVolume: 3
        },
        {
          name: isGym ? 'Desenvolvimento Militar' : 'Desenvolvimento com Halteres',
          sets: experience === 'avancado' ? '4' : experience === 'intermediario' ? '3' : '2-3',
          reps: level.name === 'Avançado' ? '6-8 (RIR 1-2)' : '8-12 (RIR 2-3)',
          videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
          tip: `Volume semanal alvo ombros: ${level.volumeRanges.shoulders[0]}-${level.volumeRanges.shoulders[1]} séries`,
          equipment: isGym ? 'Barra' : 'Halteres',
          muscleGroup: 'shoulders',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: 'Elevação Lateral',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '12-15 + drop-set' : '10-15',
          videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
          tip: `RIR: ${level.rir}. Descanso: ${level.restPeriods.isolation}`,
          equipment: 'Halteres',
          muscleGroup: 'shoulders',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: isGym ? 'Tríceps Pulley' : 'Tríceps Mergulho',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '10-12 + rest-pause' : '10-15',
          videoUrl: 'https://www.youtube.com/watch?v=vB5OHsJ3EME',
          tip: `Volume semanal braços: ${level.volumeRanges.arms[0]}-${level.volumeRanges.arms[1]} séries`,
          equipment: isGym ? 'Cabo' : 'Cadeira/Banco',
          muscleGroup: 'arms',
          type: 'isolation',
          weeklyVolume: 3
        }
      ],
      totalVolume: {
        chest: 7,
        back: 0,
        shoulders: 7,
        arms: 3,
        legs: 0
      }
    },
    {
      day: 'Terça',
      focus: 'Pull (Costas, Bíceps)',
      exercises: [
        {
          name: isGym ? 'Puxada Frente' : 'Barra Fixa/Australiana',
          sets: experience === 'avancado' ? '4-5' : experience === 'intermediario' ? '3-4' : '2-3',
          reps: level.name === 'Avançado' ? '6-8 (RIR 1-2)' : '8-12 (RIR 2-3)',
          videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
          tip: `Periodização: ${level.progressionStrategy}`,
          equipment: isGym ? 'Puxador' : 'Barra/Mesa',
          muscleGroup: 'back',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: 'Remada Curvada',
          sets: experience === 'avancado' ? '4' : experience === 'intermediario' ? '3' : '2-3',
          reps: level.name === 'Avançado' ? '8-10 (RIR 1-2)' : '10-12 (RIR 2-3)',
          videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
          tip: `Volume semanal costas: ${level.volumeRanges.back[0]}-${level.volumeRanges.back[1]} séries`,
          equipment: isGym ? 'Barra' : 'Halteres',
          muscleGroup: 'back',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: 'Remada Unilateral',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '10-12 cada lado' : '12-15 cada lado',
          videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo',
          tip: level.name === 'Avançado' ? 'Aplicar cluster sets se necessário' : 'Foco na contração das escápulas',
          equipment: 'Halteres',
          muscleGroup: 'back',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Rosca Direta',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '8-10 + rest-pause' : '10-12',
          videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
          tip: `Técnicas: ${level.techniques.slice(0, 2).join(', ')}`,
          equipment: isGym ? 'Barra' : 'Halteres',
          muscleGroup: 'arms',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Rosca Martelo',
          sets: experience === 'avancado' ? '3' : '2-3',
          reps: level.name === 'Avançado' ? '12-15' : '12-15',
          videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
          tip: `RIR: ${level.rir}`,
          equipment: 'Halteres',
          muscleGroup: 'arms',
          type: 'isolation',
          weeklyVolume: 3
        }
      ],
      totalVolume: {
        chest: 0,
        back: 11,
        shoulders: 0,
        arms: 6,
        legs: 0
      }
    },
    {
      day: 'Quarta',
      focus: 'Legs (Pernas Completas)',
      exercises: [
        {
          name: isGym ? 'Agachamento Livre' : 'Agachamento',
          sets: experience === 'avancado' ? '4-5' : experience === 'intermediario' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '6-8 (RIR 1-2)' : '8-12 (RIR 2-3)',
          videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
          tip: `Movimento rei. Progressão: ${level.progressionStrategy}`,
          equipment: isGym ? 'Barra' : 'Peso corporal',
          muscleGroup: 'legs',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: isGym ? 'Leg Press' : 'Agachamento Búlgaro',
          sets: experience === 'avancado' ? '4' : experience === 'intermediario' ? '3' : '3',
          reps: level.name === 'Avançado' ? '10-12' : '12-15',
          videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
          tip: `Volume semanal pernas: ${level.volumeRanges.legs[0]}-${level.volumeRanges.legs[1]} séries`,
          equipment: isGym ? 'Leg Press' : 'Peso corporal',
          muscleGroup: 'legs',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: 'Stiff/RDL',
          sets: experience === 'avancado' ? '4' : '3',
          reps: level.name === 'Avançado' ? '8-10 (RIR 1-2)' : '10-12',
          videoUrl: 'https://www.youtube.com/watch?v=1uDiW5-_Jps',
          tip: level.name === 'Avançado' ? 'Tempo sob tensão: 3-1-2-1' : 'Foco na fase excêntrica',
          equipment: isGym ? 'Barra' : 'Halteres',
          muscleGroup: 'legs',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: isGym ? 'Cadeira Extensora' : 'Afundo',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '12-15 + drop-set' : '12-15',
          videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
          tip: `Descanso: ${level.restPeriods.isolation}`,
          equipment: isGym ? 'Máquina' : 'Peso corporal',
          muscleGroup: 'legs',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: isGym ? 'Mesa Flexora' : 'Flexão Nórdica',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '10-12' : '8-12',
          videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
          tip: level.name === 'Avançado' ? 'Possível rest-pause na última série' : 'Controle da fase excêntrica',
          equipment: isGym ? 'Máquina' : 'Peso corporal',
          muscleGroup: 'legs',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Panturrilha',
          sets: experience === 'avancado' ? '4' : '3',
          reps: level.name === 'Avançado' ? '15-20' : '15-20',
          videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI',
          tip: 'Amplitude máxima, pausa na contração',
          equipment: isGym ? 'Máquina' : 'Step/Degrau',
          muscleGroup: 'legs',
          type: 'isolation',
          weeklyVolume: 4
        }
      ],
      totalVolume: {
        chest: 0,
        back: 0,
        shoulders: 0,
        arms: 0,
        legs: 22
      }
    },
    {
      day: 'Quinta',
      focus: 'Push (Peito, Ombros, Tríceps) - Volume B',
      exercises: [
        {
          name: isGym ? 'Supino Inclinado Halteres' : 'Flexão Diamante',
          sets: experience === 'avancado' ? '4' : experience === 'intermediario' ? '3' : '3',
          reps: level.name === 'Avançado' ? '8-10 (RIR 1-2)' : '10-12 (RIR 2-3)',
          videoUrl: 'https://www.youtube.com/watch?v=IP4oeKMOb_s',
          tip: 'Variação para estímulo diferente',
          equipment: isGym ? 'Halteres' : 'Peso corporal',
          muscleGroup: 'chest',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: 'Crucifixo',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '10-12 + drop-set' : '12-15',
          videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
          tip: level.name === 'Avançado' ? 'Aplicar pré-exaustão se indicado' : 'Amplitude completa',
          equipment: 'Halteres',
          muscleGroup: 'chest',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Elevação Frontal',
          sets: experience === 'avancado' ? '3' : '2-3',
          reps: level.name === 'Avançado' ? '12-15' : '12-15',
          videoUrl: 'https://www.youtube.com/watch?v=qzaXBB_1w68',
          tip: 'Complemento para ombro anterior',
          equipment: 'Halteres',
          muscleGroup: 'shoulders',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Crucifixo Inverso',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '12-15' : '12-15',
          videoUrl: 'https://www.youtube.com/watch?v=ea7qmaN3AOk',
          tip: 'Essencial para ombro posterior',
          equipment: 'Halteres',
          muscleGroup: 'shoulders',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Tríceps Francês',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '10-12' : '10-12',
          videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM',
          tip: `Volume total braços: ${level.volumeRanges.arms[0]}-${level.volumeRanges.arms[1]} séries/semana`,
          equipment: 'Halteres',
          muscleGroup: 'arms',
          type: 'isolation',
          weeklyVolume: 3
        }
      ],
      totalVolume: {
        chest: 7,
        back: 0,
        shoulders: 6,
        arms: 3,
        legs: 0
      }
    },
    {
      day: 'Sexta',
      focus: 'Pull (Costas, Bíceps) - Volume B',
      exercises: [
        {
          name: isGym ? 'Remada Máquina' : 'Remada Invertida',
          sets: experience === 'avancado' ? '4' : experience === 'intermediario' ? '3' : '3',
          reps: level.name === 'Avançado' ? '8-10 (RIR 1-2)' : '10-12',
          videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
          tip: 'Variação de pegada para estímulo completo',
          equipment: isGym ? 'Máquina' : 'Mesa/Banco',
          muscleGroup: 'back',
          type: 'compound',
          weeklyVolume: 4
        },
        {
          name: isGym ? 'Pulldown Pegada Fechada' : 'Barra Fixa Pegada Fechada',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '10-12' : '10-12',
          videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
          tip: 'Foco no latíssimo',
          equipment: isGym ? 'Puxador' : 'Barra',
          muscleGroup: 'back',
          type: 'compound',
          weeklyVolume: 3
        },
        {
          name: 'Face Pull',
          sets: experience === 'avancado' ? '3' : '2-3',
          reps: level.name === 'Avançado' ? '15-20' : '15-20',
          videoUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk',
          tip: 'Saúde do ombro posterior',
          equipment: isGym ? 'Cabo' : 'Elástico',
          muscleGroup: 'back',
          type: 'isolation',
          weeklyVolume: 3
        },
        {
          name: 'Rosca 21',
          sets: experience === 'avancado' ? '2-3' : '2',
          reps: level.name === 'Avançado' ? '21 reps (7+7+7)' : '21 reps',
          videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
          tip: level.name === 'Avançado' ? 'Técnica avançada de intensidade' : 'Técnica de variação',
          equipment: 'Halteres',
          muscleGroup: 'arms',
          type: 'isolation',
          weeklyVolume: 2
        }
      ],
      totalVolume: {
        chest: 0,
        back: 10,
        shoulders: 0,
        arms: 2,
        legs: 0
      }
    },
    {
      day: 'Sábado',
      focus: 'Core e Funcional/Descanso Ativo',
      exercises: [
        {
          name: 'Prancha',
          sets: experience === 'avancado' ? '3-4' : '3',
          reps: level.name === 'Avançado' ? '60-90s' : '30-60s',
          videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
          tip: 'Estabilização do core',
          equipment: 'Peso corporal',
          muscleGroup: 'arms',
          type: 'isolation',
          weeklyVolume: 0
        },
        {
          name: 'Caminhada/Cardio Leve',
          sets: 1,
          reps: '30-45 min',
          videoUrl: 'https://www.youtube.com/watch?v=NKDNgK7HB0s',
          tip: 'Recuperação ativa',
          equipment: 'Nenhum',
          muscleGroup: 'legs',
          type: 'compound',
          weeklyVolume: 0
        }
      ],
      totalVolume: {
        chest: 0,
        back: 0,
        shoulders: 0,
        arms: 0,
        legs: 0
      }
    }
  ];
};

const generateFullBodyWorkout = (level: any, location: string, goal: string): ScientificWorkoutDay[] => {
  // Implementação para Full Body (2-3 dias)
  return [];
};

const generateUpperLowerWorkout = (level: any, location: string, goal: string): ScientificWorkoutDay[] => {
  // Implementação para Upper/Lower (4 dias)
  return [];
};
