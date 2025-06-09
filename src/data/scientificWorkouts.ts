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

const trainingTemplates: Record<string, Record<string, Record<string, WorkoutDay[]>>> = {
  iniciante: {
    'ganhar-massa': {
      academia: [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            { name: 'Supino Reto', sets: 3, reps: '10-12' },
            { name: 'Supino Inclinado', sets: 3, reps: '10-12' },
            { name: 'Tríceps Pulley', sets: 3, reps: '12-15' }
          ],
          totalVolume: { chest: 9, back: 0, shoulders: 0, arms: 9, legs: 0 }
        },
        {
          day: 'Quarta',
          focus: 'Costas e Bíceps',
          exercises: [
            { name: 'Remada Curvada', sets: 3, reps: '10-12' },
            { name: 'Barra Fixa Assistida', sets: 3, reps: '8-10' },
            { name: 'Rosca Direta', sets: 3, reps: '12-15' }
          ],
          totalVolume: { chest: 0, back: 9, shoulders: 0, arms: 9, legs: 0 }
        },
        {
          day: 'Sexta',
          focus: 'Pernas e Ombros',
          exercises: [
            { name: 'Agachamento Livre', sets: 3, reps: '10-12' },
            { name: 'Desenvolvimento com Halteres', sets: 3, reps: '10-12' },
            { name: 'Elevação Lateral', sets: 3, reps: '12-15' }
          ],
          totalVolume: { chest: 0, back: 0, shoulders: 9, arms: 0, legs: 9 }
        }
      ]
    },
    perder_peso: {
      academia: [
        {
          day: 'Segunda',
          focus: 'Cardio e Core',
          exercises: [
            { name: 'Esteira', sets: 1, reps: '30 min' },
            { name: 'Prancha', sets: 3, reps: '30s' }
          ],
          totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 }
        },
        {
          day: 'Quarta',
          focus: 'Treino Funcional',
          exercises: [
            { name: 'Agachamento com Salto', sets: 3, reps: '12-15' },
            { name: 'Burpee', sets: 3, reps: '10-12' }
          ],
          totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 }
        },
        {
          day: 'Sexta',
          focus: 'Circuito de Força',
          exercises: [
            { name: 'Flexão', sets: 3, reps: '10-12' },
            { name: 'Remada com Elástico', sets: 3, reps: '12-15' }
          ],
          totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 }
        }
      ]
    }
  },
  intermediario: {
    ganhar_massa: {
      academia: [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            { name: 'Supino Reto', sets: 4, reps: '8-10' },
            { name: 'Supino Inclinado', sets: 4, reps: '8-10' },
            { name: 'Tríceps Pulley', sets: 4, reps: '10-12' }
          ],
          totalVolume: { chest: 12, back: 0, shoulders: 0, arms: 12, legs: 0 }
        },
        {
          day: 'Terça',
          focus: 'Costas e Bíceps',
          exercises: [
            { name: 'Remada Curvada', sets: 4, reps: '8-10' },
            { name: 'Barra Fixa', sets: 4, reps: '6-8' },
            { name: 'Rosca Direta', sets: 4, reps: '10-12' }
          ],
          totalVolume: { chest: 0, back: 12, shoulders: 0, arms: 12, legs: 0 }
        },
        {
          day: 'Quinta',
          focus: 'Pernas e Ombros',
          exercises: [
            { name: 'Agachamento Livre', sets: 4, reps: '8-10' },
            { name: 'Desenvolvimento com Halteres', sets: 4, reps: '8-10' },
            { name: 'Elevação Lateral', sets: 4, reps: '10-12' }
          ],
          totalVolume: { chest: 0, back: 0, shoulders: 12, arms: 0, legs: 12 }
        }
      ]
    }
  },
  avancado: {
    ganhar_massa: {
      academia: [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            { name: 'Supino Reto', sets: 5, reps: '6-8' },
            { name: 'Supino Inclinado', sets: 5, reps: '6-8' },
            { name: 'Tríceps Pulley', sets: 5, reps: '8-10' }
          ],
          totalVolume: { chest: 15, back: 0, shoulders: 0, arms: 15, legs: 0 }
        },
        {
          day: 'Terça',
          focus: 'Costas e Bíceps',
          exercises: [
            { name: 'Remada Curvada', sets: 5, reps: '6-8' },
            { name: 'Barra Fixa', sets: 5, reps: '6-8' },
            { name: 'Rosca Direta', sets: 5, reps: '8-10' }
          ],
          totalVolume: { chest: 0, back: 15, shoulders: 0, arms: 15, legs: 0 }
        },
        {
          day: 'Quinta',
          focus: 'Pernas e Ombros',
          exercises: [
            { name: 'Agachamento Livre', sets: 5, reps: '6-8' },
            { name: 'Desenvolvimento com Halteres', sets: 5, reps: '6-8' },
            { name: 'Elevação Lateral', sets: 5, reps: '8-10' }
          ],
          totalVolume: { chest: 0, back: 0, shoulders: 15, arms: 0, legs: 15 }
        }
      ]
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
    // Decrease reps range for advanced
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
    'Supino Reto',
    'Supino Inclinado',
    'Remada Curvada',
    'Barra Fixa',
    'Agachamento Livre',
    'Desenvolvimento com Halteres',
    'Elevação Lateral',
    'Tríceps Pulley',
    'Rosca Direta'
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
  // Simplified volume calculation: sets * reps (average)
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
    // Classify exercise by name
    switch (ex.name) {
      case 'Supino Reto':
      case 'Supino Inclinado':
        totalVolume.chest += volume;
        break;
      case 'Remada Curvada':
      case 'Barra Fixa':
        totalVolume.back += volume;
        break;
      case 'Desenvolvimento com Halteres':
      case 'Elevação Lateral':
        totalVolume.shoulders += volume;
        break;
      case 'Tríceps Pulley':
      case 'Rosca Direta':
        totalVolume.arms += volume;
        break;
      case 'Agachamento Livre':
        totalVolume.legs += volume;
        break;
      default:
        break;
    }
  });
  return totalVolume;
};

export const generateScientificWorkout = (
  experience: string, 
  location: string, 
  goal: string, 
  daysPerWeek: number,
  gender?: string,
  age?: number
): WorkoutDay[] => {
  // Se for usuário feminino, usar treinos específicos
  if (gender === 'feminino' && age) {
    return generateFemaleWorkout(experience, location, goal, daysPerWeek, age);
  }

  const level = trainingLevels[experience] || trainingLevels.iniciante;
  const split = getTrainingSplit(daysPerWeek);
  
  const baseWorkout = trainingTemplates[experience]?.[goal]?.[location] || 
                     trainingTemplates.intermediario.ganhar_massa.academia;

  return baseWorkout.map(day => ({
    ...day,
    exercises: day.exercises.map(exercise => ({
      ...exercise,
      sets: adjustSetsForLevel(exercise.sets, level),
      reps: adjustRepsForLevel(exercise.reps, level),
      type: getExerciseType(exercise.name),
      videoUrl: exercise.videoUrl || getVideoUrl(exercise.name),
      tip: exercise.tip || getScientificTip(exercise.name, level)
    })),
    totalVolume: calculateDayVolume(day.exercises, level)
  }));
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

  // Encontrar plano que melhor corresponde ao objetivo
  const matchingPlan = plans.find(plan => 
    plan.objective.includes(goal) || plan.level === experience
  ) || plans[0];

  // Expandir para dias da semana solicitados
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
  const difficultyFilter = experience === 'iniciante' ? 
    (ex: any) => ex.difficulty !== 'avancado' : 
    () => true;

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
      return [
        ...femaleExercises.gluteos.filter(difficultyFilter).slice(0, 3),
        ...femaleExercises.pernas.filter(difficultyFilter).slice(0, 2)
      ].map(mapFemaleExerciseToExercise);
      
    case 'Core e Superiores':
      return [
        ...femaleExercises.abdomen.filter(difficultyFilter).slice(0, 2),
        ...femaleExercises.superiores.filter(difficultyFilter).slice(0, 2)
      ].map(mapFemaleExerciseToExercise);
      
    case 'Cardio e Funcional':
      return [
        ...femaleExercises.cardio.filter(difficultyFilter),
        ...femaleExercises.abdomen.filter(difficultyFilter).slice(0, 1)
      ].map(mapFemaleExerciseToExercise);
      
    default:
      return femaleExercises.gluteos.filter(difficultyFilter).slice(0, 3).map(mapFemaleExerciseToExercise);
  }
};

const expandToWeeklySchedule = (plan: any, daysPerWeek: number, ageGroup: string): WorkoutDay[] => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const result: WorkoutDay[] = [];

  // Dia principal do plano
  const mainDay: WorkoutDay = {
    day: 'Segunda',
    focus: plan.name,
    exercises: plan.exercises.map((ex: any): Exercise => ({
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
      type: ex.targetMuscles.includes('Glúteo') ? 'compound' : 'isolation',
      videoUrl: ex.videoUrl,
      tip: ex.technique,
      equipment: ex.equipment
    })),
    totalVolume: { chest: 0, back: 2, shoulders: 2, arms: 2, legs: 18 }
  };

  result.push(mainDay);

  // Adicionar dias complementares
  for (let i = 1; i < daysPerWeek; i++) {
    const focus = i % 2 === 0 ? 'Core e Mobilidade' : 'Cardio e Funcionais';
    const exercises = i % 2 === 0 ? 
      femaleExercises.abdomen.slice(0, 3) : 
      femaleExercises.cardio.slice(0, 2);

    result.push({
      day: days[i],
      focus,
      exercises: exercises.map((ex: any): Exercise => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        type: 'compound',
        videoUrl: ex.videoUrl,
        tip: ex.technique,
        equipment: ex.equipment
      })),
      totalVolume: { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 8 }
    });
  }

  return result;
};
