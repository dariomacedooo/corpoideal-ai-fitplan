
export interface TrainingLevel {
  name: string;
  experienceMonths: number;
  strengthRatio?: number;
  volumeRanges: {
    chest: [number, number];
    back: [number, number];
    shoulders: [number, number];
    arms: [number, number];
    legs: [number, number];
  };
  progressionStrategy: string;
  restPeriods: {
    compound: string;
    isolation: string;
  };
  techniques: string[];
  rir: string; // Reps in Reserve
}

export const trainingLevels: Record<string, TrainingLevel> = {
  iniciante: {
    name: 'Iniciante',
    experienceMonths: 12,
    volumeRanges: {
      chest: [8, 12],
      back: [10, 14],
      shoulders: [6, 10],
      arms: [6, 10],
      legs: [12, 16]
    },
    progressionStrategy: 'Foco na execução perfeita, aumento linear de 2.5-5kg',
    restPeriods: {
      compound: '60-90 segundos',
      isolation: '45-60 segundos'
    },
    techniques: ['Amplitude completa', 'Controle excêntrico', 'Respiração controlada'],
    rir: '3-4 (deixar 3-4 reps na reserva)'
  },
  intermediario: {
    name: 'Intermediário',
    experienceMonths: 36,
    strengthRatio: 1.0,
    volumeRanges: {
      chest: [12, 16],
      back: [14, 18],
      shoulders: [10, 14],
      arms: [10, 14],
      legs: [16, 20]
    },
    progressionStrategy: 'Periodização linear, técnicas drop-set, foco em sobrecarga progressiva',
    restPeriods: {
      compound: '90-120 segundos',
      isolation: '60-90 segundos'
    },
    techniques: ['Drop-sets', 'Super-sets', 'Tempo sob tensão', 'Pré-exaustão'],
    rir: '2-3 (deixar 2-3 reps na reserva)'
  },
  avancado: {
    name: 'Avançado',
    experienceMonths: 999,
    strengthRatio: 1.5,
    volumeRanges: {
      chest: [16, 20],
      back: [18, 22],
      shoulders: [14, 18],
      arms: [14, 18],
      legs: [20, 24]
    },
    progressionStrategy: 'Periodização ondulatória, rest-pause, cluster sets, autoregulação',
    restPeriods: {
      compound: '2-4 minutos',
      isolation: '60-90 segundos'
    },
    techniques: ['Rest-pause', 'Cluster sets', 'Volume alemão', 'Periodização conjugada', 'RPE/RIR'],
    rir: '1-2 (deixar 1-2 reps na reserva)'
  }
};

export const getTrainingSplit = (daysPerWeek: number) => {
  if (daysPerWeek <= 3) {
    return {
      type: 'Full Body',
      description: 'Treino completo 2-3x por semana',
      frequency: daysPerWeek,
      muscleFrequency: daysPerWeek
    };
  } else if (daysPerWeek === 4) {
    return {
      type: 'Upper/Lower',
      description: 'Divisão superiores/inferiores',
      frequency: daysPerWeek,
      muscleFrequency: 2
    };
  } else {
    return {
      type: 'Push/Pull/Legs',
      description: 'Divisão push/pull/pernas',
      frequency: daysPerWeek,
      muscleFrequency: 2
    };
  }
};

export const calculateWeeklyVolume = (level: string, muscleGroup: keyof TrainingLevel['volumeRanges']) => {
  const trainingLevel = trainingLevels[level];
  if (!trainingLevel) return { min: 10, max: 14 };
  
  const [min, max] = trainingLevel.volumeRanges[muscleGroup];
  return { min, max };
};

export const getProgressionGuidelines = (level: string) => {
  const trainingLevel = trainingLevels[level];
  if (!trainingLevel) return trainingLevels.iniciante;
  
  return trainingLevel;
};
