import { trainingLevels, getTrainingSplit } from "@/utils/trainingCalculator";
import { femaleWorkoutPlans, femaleExercises } from './femaleWorkouts';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  type?: 'compound' | 'isolation';
  videoUrl?: string;
  tip?: string;
  equipment?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  totalVolume: {
    chest: number;
    back: number;
    shoulders: number;
    arms: number;
    legs: number;
  };
}

// CORREÇÃO: Objeto renomeado e exportado como 'scientificWorkouts' para corrigir o erro de importação.
// A estrutura foi totalmente unificada usando o sistema de 'blocos' e 'divisões' que você iniciou.
export const scientificWorkouts: Record<string, Record<string, Record<string, any>>> = {
  iniciante: {
    'ganhar-massa': {
      academia: {
        blocos: {
          'A': {
            focus: 'Peito, Ombros e Tríceps',
            exercises: [
              { name: 'Supino Reto', sets: 3, reps: '10-12' },
              { name: 'Desenvolvimento com Halteres', sets: 3, reps: '10-12' },
              { name: 'Tríceps Pulley', sets: 3, reps: '12-15' },
            ],
          },
          'B': {
            focus: 'Costas e Bíceps',
            exercises: [
              { name: 'Puxada na Frente (Pulldown)', sets: 3, reps: '10-12' },
              { name: 'Remada Curvada', sets: 3, reps: '10-12' },
              { name: 'Rosca Direta', sets: 3, reps: '12-15' },
            ],
          },
          'C': {
            focus: 'Pernas',
            exercises: [
              { name: 'Agachamento Livre', sets: 3, reps: '10-12' },
              { name: 'Leg Press 45°', sets: 3, reps: '12-15' },
              { name: 'Elevação de Panturrilhas em Pé', sets: 4, reps: '15-20' },
            ],
          },
        },
        divisoes: {
          '1': ['A'],
          '2': ['A', 'B'],
          '3': ['A', 'B', 'C'],
          '4': ['A', 'B', 'A', 'C'],
          '5': ['A', 'B', 'C', 'A', 'B'],
        }
      },
      casa: {
        blocos: {
          'A': {
            focus: 'Full Body (Ênfase em Empurrar)',
            exercises: [
              { name: 'Flexões (Push-ups)', sets: 3, reps: 'Até a falha' },
              { name: 'Agachamento Sumô com Halter', sets: 3, reps: '12-15' },
              { name: 'Desenvolvimento com Halteres Sentado', sets: 3, reps: '12-15' },
            ]
          },
          'B': {
            focus: 'Full Body (Ênfase em Puxar)',
            exercises: [
              { name: 'Remada Unilateral com Halter (Serrote)', sets: 3, reps: '10-12 cada braço' },
              { name: 'Agachamento Búlgaro', sets: 3, reps: '10-12 cada perna' },
              { name: 'Rosca Direta com Halteres', sets: 3, reps: '12-15' },
            ]
          }
        },
        divisoes: {
          '2': ['A', 'B'],
          '3': ['A', 'B', 'A'],
          '4': ['A', 'B', 'A', 'B'],
        }
      }
    },
    'perder-peso': {
      academia: {
        blocos: {
          'fullbody': {
            focus: 'Corpo Inteiro e Cardio',
            exercises: [
              { name: 'Agachamento com Salto', sets: 3, reps: '15-20' },
              { name: 'Flexão', sets: 3, reps: 'Até a falha' },
              { name: 'Remada na Máquina', sets: 3, reps: '15-20' },
              { name: 'Esteira (HIIT)', sets: 1, reps: '20 min (1 min corre / 2 min anda)' },
              { name: 'Prancha', sets: 3, reps: '45s' },
            ]
          }
        },
        divisoes: {
          '3': ['fullbody', 'fullbody', 'fullbody'],
        }
      }
    }
  },
  intermediario: {
    'ganhar-massa': {
      academia: {
        blocos: {
          'peito_triceps': {
            focus: 'Peito e Tríceps',
            exercises: [
              { name: 'Supino Reto', sets: 4, reps: '8-10' },
              { name: 'Supino Inclinado com Halteres', sets: 4, reps: '8-10' },
              { name: 'Paralelas com Sobrecarga', sets: 3, reps: '8-10' },
              { name: 'Tríceps Testa com Barra W', sets: 4, reps: '8-10' },
            ]
          },
          'costas_biceps': {
            focus: 'Costas e Bíceps',
            exercises: [
              { name: 'Barra Fixa com Sobrecarga', sets: 4, reps: '6-8' },
              { name: 'Remada Curvada com Barra', sets: 4, reps: '8-10' },
              { name: 'Puxada no Pulley com Pegada Neutra', sets: 4, reps: '10-12' },
              { name: 'Rosca Direta com Barra', sets: 4, reps: '8-10' },
            ]
          },
          'pernas_ombros': {
            focus: 'Pernas e Ombros',
            exercises: [
              { name: 'Agachamento Livre com Barra', sets: 5, reps: '6-8' },
              { name: 'Leg Press 45°', sets: 4, reps: '12-15' },
              { name: 'Stiff com Halteres', sets: 4, reps: '10-12' },
              { name: 'Desenvolvimento Militar', sets: 4, reps: '8-10' },
              { name: 'Elevação Lateral', sets: 4, reps: '10-12' },
            ]
          },
        },
        divisoes: {
          '3': ['peito_triceps', 'costas_biceps', 'pernas_ombros'],
          '4': ['peito_triceps', 'costas_biceps', 'pernas_ombros', 'peito_triceps'],
          '5': ['peito_triceps', 'costas_biceps', 'pernas_ombros', 'peito_triceps', 'costas_biceps'],
        }
      }
    },
    'perder-peso': {
      academia: {
        blocos: {
          'A': {
            focus: 'Superiores (Força e Hipertrofia)',
            exercises: [
              { name: 'Supino Reto com Barra', sets: 4, reps: '8-12' },
              { name: 'Remada Curvada com Barra', sets: 4, reps: '8-12' },
              { name: 'Desenvolvimento com Halteres Sentado', sets: 3, reps: '10-15' },
              { name: 'Puxada na Frente (Pulldown)', sets: 3, reps: '10-15' },
              { name: 'Elevação Lateral com Halteres', sets: 3, reps: '12-15' }
            ]
          },
          'B': {
            focus: 'Inferiores (Força e Hipertrofia)',
            exercises: [
              { name: 'Agachamento Livre com Barra', sets: 4, reps: '8-12' },
              { name: 'Levantamento Terra com Barra', sets: 4, reps: '8-12' },
              { name: 'Leg Press 45°', sets: 3, reps: '10-15' },
              { name: 'Mesa Flexora (Leg Curl)', sets: 3, reps: '12-15' },
              { name: 'Elevação de Panturrilhas em Pé', sets: 4, reps: '15-20' }
            ]
          },
          'C': {
            focus: 'Full Body Metabólico',
            exercises: [
              { name: 'Kettlebell Swing', sets: 4, reps: '15-20' },
              { name: 'Flexões (Push-ups)', sets: 3, reps: 'Até a falha' },
              { name: 'Passada com Halteres (Lunges)', sets: 3, reps: '12-15 cada perna' },
              { name: 'Prancha', sets: 3, reps: '60s' }
            ]
          }
        },
        divisoes: {
          '4': ['A', 'B', 'A', 'B'],
          '5': ['A', 'B', 'A', 'B', 'C']
        }
      }
    }
  },
  avancado: {
 'bulking': {
      academia: {
        blocos: {
        'A': {
        focus: 'Peito e Tríceps (Volume e Força)',
        exercises: [
          { name: 'Supino Reto com Barra', sets: 4, reps: '6-8', rest: '90s', video: 'URL_VIDEO' },
          { name: 'Supino Inclinado com Halteres', sets: 3, reps: '8-10', rest: '75s', video: 'URL_VIDEO' },
          { name: 'Crucifixo na Polia Alta', sets: 3, reps: '10-12', rest: '60s', video: 'URL_VIDEO' },
          { name: 'Paralelas (Foco no Tríceps)', sets: 3, reps: 'até a falha', rest: '75s', video: 'URL_VIDEO' },
          { name: 'Tríceps Testa com Barra EZ', sets: 3, reps: '8-10', rest: '60s', video: 'URL_VIDEO' },
        ]
      },
        'B': { focus: 'Costas e Bíceps (Largura e Densidade)',
        exercises: [
          { name: 'Levantamento Terra', sets: 4, reps: '4-6', rest: '120s', video: 'URL_VIDEO' },
          { name: 'Remada Curvada com Barra', sets: 3, reps: '6-8', rest: '90s', video: 'URL_VIDEO' },
          { name: 'Puxada Frontal com Pegada Aberta', sets: 3, reps: '8-10', rest: '75s', video: 'URL_VIDEO' },
          { name: 'Rosca Direta com Barra', sets: 4, reps: '8-10', rest: '60s', video: 'URL_VIDEO' },
          { name: 'Rosca Martelo com Halteres', sets: 3, reps: '10-12', rest: '60s', video: 'URL_VIDEO' },
        ] },
          'C': { focus: 'Pernas e Ombros (Construção de Base)',
        exercises: [
          { name: 'Agachamento Livre com Barra', sets: 4, reps: '6-8', rest: '120s', video: 'URL_VIDEO' },
          { name: 'Leg Press 45°', sets: 3, reps: '8-10', rest: '90s', video: 'URL_VIDEO' },
          { name: 'Cadeira Extensora', sets: 3, reps: '10-12', rest: '60s', video: 'URL_VIDEO' },
          { name: 'Desenvolvimento com Halteres (Sentado)', sets: 4, reps: '6-8', rest: '90s', video: 'URL_VIDEO' },
          { name: 'Elevação Lateral com Halteres', sets: 3, reps: '12-15', rest: '60s', video: 'URL_VIDEO' },
        ] },
          'D': { focus: 'Full Body (Técnica e Estímulo Adicional)',
        exercises: [
          { name: 'Agachamento Taça (Goblet Squat)', sets: 3, reps: '10-12', rest: '75s', video: 'URL_VIDEO' },
          { name: 'Remada na Polia Baixa (Pegada Neutra)', sets: 3, reps: '10-12', rest: '75s', video: 'URL_VIDEO' },
          { name: 'Supino Reto com Halteres', sets: 3, reps: '10-12', rest: '75s', video: 'URL_VIDEO' },
          { name: 'Elevação Pélvica com Barra', sets: 3, reps: '12-15', rest: '60s', video: 'URL_VIDEO' },
          { name: 'Prancha Abdominal', sets: 3, reps: '60s', rest: '60s', video: 'URL_VIDEO' },
        ] },
        },
        divisoes: {
          3: ['A', 'B', 'C'],
          4: ['A', 'B', 'A', 'C'],
          5: ['A', 'B', 'C', 'D', 'A'],
          6: ['A', 'B', 'C', 'A', 'B', 'D'],
          7: ['A', 'B', 'C', 'A', 'B', 'C', 'D']
        }
      }
    }
  }
};

const adjustSetsForLevel = (sets: number, level: typeof trainingLevels.iniciante) => {
  if (level.name === 'Iniciante') return Math.max(2, sets - 1);
  if (level.name === 'Intermediário') return sets;
  if (level.name === 'Avançado') return sets + 1;
  return sets;
};

const adjustRepsForLevel = (reps: string, level: typeof trainingLevels.iniciante) => {
  if (level.name === 'Iniciante') return reps;
  if (level.name === 'Intermediário') return reps;
  if (level.name === 'Avançado') {
    const match = reps.match(/(\d+)-(\d+)/);
    if (match) {
      const min = parseInt(match[1], 10);
      const max = parseInt(match[2], 10);
      return `${Math.max(min - 2, 4)}-${Math.max(max - 2, 6)}`;
    }
    return reps;
  }
  return reps;
};

const getExerciseType = (exerciseName: string) => {
  const compoundExercises = [
    'Supino Reto', 'Supino Inclinado', 'Remada Curvada', 'Barra Fixa',
    'Agachamento Livre', 'Desenvolvimento com Halteres', 'Levantamento Terra'
  ];
  return compoundExercises.includes(exerciseName) ? 'compound' : 'isolation';
};

const getVideoUrl = (exerciseName: string) => {
  const videoMap: Record<string, string> = {
    'Supino Reto': 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
    'Supino Inclinado': 'https://www.youtube.com/watch?v=IP4oeKMOb_s',
    'Remada Curvada': 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    'Barra Fixa': 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    'Agachamento Livre': 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
    'Desenvolvimento com Halteres': 'https://www.youtube.com/watch?v=qEwKCR5JCog',
    'Elevação Lateral': 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    'Tríceps Pulley': 'https://www.youtube.com/watch?v=vB5OHsJ3EME',
    'Rosca Direta': 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo'
  };
  return videoMap[exerciseName] || '';
};

const getScientificTip = (exerciseName: string, level: typeof trainingLevels.iniciante) => {
  const tips: Record<string, string> = {
    'Supino Reto': 'Mantenha os ombros retraídos e controle a descida',
    'Supino Inclinado': 'Foque na contração do peitoral superior',
    'Remada Curvada': 'Mantenha as costas retas e contraia as escápulas',
    'Barra Fixa': 'Use pegada pronada e mantenha o peito para fora',
    'Agachamento Livre': 'Desça até 90 graus, joelhos alinhados',
    'Desenvolvimento com Halteres': 'Não trave os cotovelos no topo',
    'Elevação Lateral': 'Cotovelos ligeiramente flexionados',
    'Tríceps Pulley': 'Mantenha os cotovelos fixos ao lado do corpo',
    'Rosca Direta': 'Evite balanço do corpo, concentre no bíceps'
  };
  return tips[exerciseName] || '';
};

const calculateDayVolume = (exercises: Exercise[], level: typeof trainingLevels.iniciante) => {
  let totalVolume = { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 };
  exercises.forEach(ex => {
    const sets = adjustSetsForLevel(ex.sets, level);
    const repsMatch = ex.reps.match(/(\d+)-?(\d+)?/);
    let reps = 0;
    if (repsMatch) {
      const min = parseInt(repsMatch[1], 10);
      const max = repsMatch[2] ? parseInt(repsMatch[2], 10) : min;
      reps = Math.round((min + max) / 2);
    }
    const volume = sets * reps;
    if (['Supino Reto', 'Supino Inclinado'].includes(ex.name)) totalVolume.chest += volume;
    if (['Remada Curvada', 'Barra Fixa', 'Puxada na Frente (Pulldown)'].includes(ex.name)) totalVolume.back += volume;
    if (['Desenvolvimento com Halteres', 'Elevação Lateral', 'Desenvolvimento Militar'].includes(ex.name)) totalVolume.shoulders += volume;
    if (['Tríceps Pulley', 'Rosca Direta', 'Paralelas com Sobrecarga', 'Tríceps Testa com Barra W'].includes(ex.name)) totalVolume.arms += volume;
    if (['Agachamento Livre', 'Leg Press 45°', 'Stiff com Halteres', 'Mesa Flexora (Leg Curl)', 'Elevação de Panturrilhas em Pé'].includes(ex.name)) totalVolume.legs += volume;
  });
  return totalVolume;
};

const generateWorkoutFromBlocks = (
  levelData: { blocos: any; divisoes: any },
  daysPerWeek: number,
  trainingDays: string[],
  level: typeof trainingLevels.iniciante
): WorkoutDay[] => {
  const divisionKey = String(daysPerWeek) as keyof typeof levelData.divisoes;
  const division = levelData.divisoes[divisionKey];

  if (!division) {
    console.error(`Nenhuma divisão de treino definida para ${daysPerWeek} dias.`);
    return [];
  }

  const weeklyPlan: WorkoutDay[] = trainingDays.map((dayName, index) => {
    const blockKey = division[index % division.length];
    const block = levelData.blocos[blockKey];

    if (!block) {
      console.error(`Bloco de treino '${blockKey}' não encontrado.`);
      return { day: dayName, focus: 'Descanso', exercises: [], totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 } };
    }

    const exercisesWithDetails = block.exercises.map((exercise: Exercise) => ({
      ...exercise,
      sets: adjustSetsForLevel(exercise.sets, level),
      reps: adjustRepsForLevel(exercise.reps, level),
      type: getExerciseType(exercise.name),
      videoUrl: exercise.videoUrl || getVideoUrl(exercise.name),
      tip: exercise.tip || getScientificTip(exercise.name, level)
    }));

    return {
      day: dayName,
      focus: block.focus,
      exercises: exercisesWithDetails,
      totalVolume: calculateDayVolume(exercisesWithDetails, level)
    };
  });

  return weeklyPlan;
};

export const generateScientificWorkout = (
  experience: string,
  location: string,
  goal: string,
  daysPerWeek: number,
  trainingDays: string[] = [], // Adicionando valor padrão
  gender?: string,
  age?: number
): WorkoutDay[] => {
  if (gender === 'feminino' && age) {
    return generateFemaleWorkout(experience, location, goal, daysPerWeek, age);
  }

  const level = trainingLevels[experience] || trainingLevels.iniciante;
  const locationData = scientificWorkouts[experience]?.[goal]?.[location];

  if (locationData && locationData.blocos && locationData.divisoes) {
    const daysToGenerate = trainingDays.length > 0 ? trainingDays : ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].slice(0, daysPerWeek);
    return generateWorkoutFromBlocks(locationData, daysToGenerate.length, daysToGenerate, level);
  } else {
    console.warn(`Template dinâmico não encontrado para ${experience}/${goal}/${location}.`);
    return [{ day: "Dia 1", focus: "Não configurado", exercises: [], totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 } }];
  }
};

const generateFemaleWorkout = (
  experience: string,
  location: string,
  goal: string,
  daysPerWeek: number,
  age: number
): WorkoutDay[] => {
  const getAgeGroup = (age: number): string => {
    if (age >= 17 && age <= 25) return '17-25';
    if (age >= 26 && age <= 39) return '26-39';
    if (age >= 40 && age <= 59) return '40-59';
    if (age >= 60) return '60+';
    return '17-25';
  };

  const ageGroup = getAgeGroup(age);
  const plans = femaleWorkoutPlans[ageGroup];

  if (!plans || plans.length === 0) {
    return generateDefaultFemaleWorkout(experience, location, daysPerWeek);
  }

  const matchingPlan = plans.find(plan =>
    plan.objective.includes(goal) || plan.level === experience
  ) || plans[0];

  return expandToWeeklySchedule(matchingPlan, daysPerWeek, ageGroup);
};

const generateDefaultFemaleWorkout = (experience: string, location: string, daysPerWeek: number): WorkoutDay[] => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const focuses = ['Glúteos e Pernas', 'Core e Superiores', 'Cardio e Funcional'];

  return Array.from({ length: daysPerWeek }, (_, index) => ({
    day: days[index],
    focus: focuses[index % focuses.length],
    exercises: getFemaleExercisesForDay(focuses[index % focuses.length], experience, location),
    totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 15 }
  }));
};

const getFemaleExercisesForDay = (focus: string, experience: string, location: string): Exercise[] => {
  const difficultyFilter = (ex: any) => experience !== 'avancado' || ex.difficulty !== 'iniciante';

  const mapFemaleExerciseToExercise = (ex: any): Exercise => ({
    name: ex.name,
    sets: ex.sets,
    reps: ex.reps,
    type: ex.targetMuscles.includes('Glúteo') ? 'compound' : 'isolation',
    videoUrl: ex.videoUrl,
    tip: ex.technique,
    equipment: ex.equipment
  });

  switch (focus) {
    case 'Glúteos e Pernas':
      return [...femaleExercises.gluteos.filter(difficultyFilter).slice(0, 3), ...femaleExercises.pernas.filter(difficultyFilter).slice(0, 2)].map(mapFemaleExerciseToExercise);
    case 'Core e Superiores':
      return [...femaleExercises.abdomen.filter(difficultyFilter).slice(0, 2), ...femaleExercises.superiores.filter(difficultyFilter).slice(0, 2)].map(mapFemaleExerciseToExercise);
    case 'Cardio e Funcional':
      return [...femaleExercises.cardio.filter(difficultyFilter), ...femaleExercises.abdomen.filter(difficultyFilter).slice(0, 1)].map(mapFemaleExerciseToExercise);
    default:
      return femaleExercises.gluteos.filter(difficultyFilter).slice(0, 3).map(mapFemaleExerciseToExercise);
  }
};

const expandToWeeklySchedule = (plan: any, daysPerWeek: number, ageGroup: string): WorkoutDay[] => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const result: WorkoutDay[] = [];

  const mainDay: WorkoutDay = {
    day: days[0],
    focus: plan.name,
    exercises: plan.exercises.map((ex: any): Exercise => ({
      name: ex.name, sets: ex.sets, reps: ex.reps,
      type: ex.targetMuscles.includes('Glúteo') ? 'compound' : 'isolation',
      videoUrl: ex.videoUrl, tip: ex.technique, equipment: ex.equipment
    })),
    totalVolume: { chest: 0, back: 2, shoulders: 2, arms: 2, legs: 18 }
  };
  result.push(mainDay);

  for (let i = 1; i < daysPerWeek; i++) {
    const focus = i % 2 === 0 ? 'Core e Mobilidade' : 'Cardio e Funcionais';
    const exercises = i % 2 === 0 ? femaleExercises.abdomen.slice(0, 3) : femaleExercises.cardio.slice(0, 2);

    result.push({
      day: days[i], focus,
      exercises: exercises.map((ex: any): Exercise => ({
        name: ex.name, sets: ex.sets, reps: ex.reps, type: 'compound',
        videoUrl: ex.videoUrl, tip: ex.technique, equipment: ex.equipment
      })),
      totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 8 }
    });
  }
  return result;
};
