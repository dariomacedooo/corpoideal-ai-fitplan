
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  videoUrl: string;
  tip: string;
  equipment?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

// Define exercise libraries based on equipment availability
const gymChestExercises: Exercise[] = [
  { 
    name: "Supino reto com barra", 
    sets: 4, 
    reps: "8-12", 
    videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
    tip: "Mantenha os ombros fixos na bancada e desça a barra até o meio do peito",
    equipment: "Barra e banco"
  },
  { 
    name: "Crucifixo com halteres", 
    sets: 3, 
    reps: "10-12", 
    videoUrl: "https://www.youtube.com/watch?v=QENKPHhQVi4",
    tip: "Mantenha uma leve flexão nos cotovelos durante todo o movimento",
    equipment: "Halteres e banco"
  },
  { 
    name: "Supino inclinado com halteres", 
    sets: 3, 
    reps: "10-12", 
    videoUrl: "https://www.youtube.com/watch?v=0G2_XV7slIg",
    tip: "Posicione o banco a aproximadamente 30-45 graus",
    equipment: "Halteres e banco inclinado"
  },
  { 
    name: "Crossover no cabo", 
    sets: 3, 
    reps: "12-15", 
    videoUrl: "https://www.youtube.com/watch?v=taI4XduLpTk",
    tip: "Foque na contração do peito ao juntar os cabos no centro",
    equipment: "Máquina de cabos"
  },
  { 
    name: "Supino na máquina", 
    sets: 3, 
    reps: "12-15", 
    videoUrl: "https://www.youtube.com/watch?v=xUm0BiZCWlQ",
    tip: "Ajuste o banco para que seus cotovelos fiquem alinhados com o peito",
    equipment: "Máquina de supino"
  }
];

const homeChestExercises: Exercise[] = [
  { 
    name: "Flexão de braço padrão", 
    sets: 4, 
    reps: "Max", 
    videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
    tip: "Mantenha o corpo alinhado e controle a descida",
    equipment: "Peso corporal"
  },
  { 
    name: "Flexão com elevação dos pés", 
    sets: 3, 
    reps: "Max", 
    videoUrl: "https://www.youtube.com/watch?v=3TXuOYDJuFU",
    tip: "Quanto mais alto os pés, mais difícil o exercício",
    equipment: "Peso corporal e uma superfície elevada"
  },
  { 
    name: "Flexão declinada (pés elevados)", 
    sets: 3, 
    reps: "Max", 
    videoUrl: "https://www.youtube.com/watch?v=3TXuOYDJuFU",
    tip: "Foca mais na parte superior do peito, desça devagar",
    equipment: "Peso corporal e superfície elevada"
  },
  { 
    name: "Flexão com bater de palmas", 
    sets: 3, 
    reps: "Max", 
    videoUrl: "https://www.youtube.com/watch?v=EYwWCgM198U",
    tip: "Só tente se as flexões normais já estiverem fáceis",
    equipment: "Peso corporal"
  }
];

// Generate exercises for different muscle groups
const generateWorkoutPlan = (
  goal: string, 
  trainingLocation: string, 
  experience: string,
  sex: string,
  menstrualData?: {cycleLength: number, lastPeriod: string, currentPhase: string}
): WorkoutDay[] => {
  
  let workoutDays: WorkoutDay[] = [];
  let daysPerWeek = 4; // Default
  
  // Adjust days per week based on experience
  if (experience === 'iniciante') {
    daysPerWeek = 3;
  } else if (experience === 'intermediario') {
    daysPerWeek = 4;
  } else if (experience === 'avancado') {
    daysPerWeek = 5;
  }
  
  // Adjust based on goal
  if (goal === 'perder-peso') {
    daysPerWeek = Math.min(daysPerWeek + 1, 6); // Add an extra day, max 6
  }
  
  // Create a split based on goal and days available
  let split: {day: string, focus: string}[] = [];
  
  // For weight loss, include more full body and cardio
  if (goal === 'perder-peso') {
    if (daysPerWeek === 3) {
      split = [
        {day: "Segunda", focus: "Corpo todo + Cardio"},
        {day: "Quarta", focus: "Corpo todo + Cardio"},
        {day: "Sexta", focus: "Corpo todo + Cardio"}
      ];
    } else if (daysPerWeek === 4) {
      split = [
        {day: "Segunda", focus: "Parte superior + Cardio"},
        {day: "Terça", focus: "Parte inferior + Cardio"},
        {day: "Quinta", focus: "Parte superior + Cardio"},
        {day: "Sexta", focus: "Parte inferior + Cardio"}
      ];
    } else {
      split = [
        {day: "Segunda", focus: "Peito e Tríceps + Cardio"},
        {day: "Terça", focus: "Costas e Bíceps + Cardio"},
        {day: "Quarta", focus: "Pernas + Cardio HIIT"},
        {day: "Quinta", focus: "Ombros e Abdômen + Cardio"},
        {day: "Sexta", focus: "Corpo todo + Cardio longo"}
      ];
    }
  } 
  // For muscle gain, focus on muscle groups
  else if (goal === 'ganhar-massa' || goal === 'ganhar-musculos') {
    if (daysPerWeek === 3) {
      split = [
        {day: "Segunda", focus: "Peito, Ombros e Tríceps"},
        {day: "Quarta", focus: "Costas e Bíceps"},
        {day: "Sexta", focus: "Pernas e Abdômen"}
      ];
    } else if (daysPerWeek === 4) {
      split = [
        {day: "Segunda", focus: "Peito e Tríceps"},
        {day: "Terça", focus: "Costas e Bíceps"},
        {day: "Quinta", focus: "Ombros e Abdômen"},
        {day: "Sexta", focus: "Pernas"}
      ];
    } else {
      split = [
        {day: "Segunda", focus: "Peito"},
        {day: "Terça", focus: "Costas"},
        {day: "Quarta", focus: "Pernas"},
        {day: "Quinta", focus: "Ombros"},
        {day: "Sexta", focus: "Braços e Abdômen"}
      ];
    }
  }
  // For other goals, create a balanced plan
  else {
    if (daysPerWeek === 3) {
      split = [
        {day: "Segunda", focus: "Parte superior"},
        {day: "Quarta", focus: "Parte inferior"},
        {day: "Sexta", focus: "Corpo todo"}
      ];
    } else if (daysPerWeek === 4) {
      split = [
        {day: "Segunda", focus: "Peito e Tríceps"},
        {day: "Terça", focus: "Costas e Bíceps"},
        {day: "Quinta", focus: "Ombros e Abdômen"},
        {day: "Sexta", focus: "Pernas"}
      ];
    } else {
      split = [
        {day: "Segunda", focus: "Peito"},
        {day: "Terça", focus: "Costas"},
        {day: "Quarta", focus: "Pernas"},
        {day: "Quinta", focus: "Ombros"},
        {day: "Sexta", focus: "Braços e Abdômen"}
      ];
    }
  }
  
  // Adjust for female menstrual cycle if data is available
  if (sex === 'feminino' && menstrualData) {
    // Get current phase
    const phase = menstrualData.currentPhase;
    
    // Adjust workout intensities based on phase
    // - Follicular phase (after period, before ovulation): High intensity, strength focus
    // - Ovulation phase: Peak performance, high intensity
    // - Luteal phase (after ovulation, before period): Reduce intensity, more endurance
    // - Menstrual phase: Low intensity, active recovery
    
    if (phase === 'menstrual') {
      // Lighter workouts during menstruation
      split = split.map(day => {
        return {
          ...day,
          focus: day.focus + " (Intensidade reduzida)"
        };
      });
      
      // Potentially reduce workout days during heavy period days
      if (split.length > 3) {
        // Suggest rest days
        const restDayIndex = Math.floor(split.length / 2);
        split[restDayIndex].focus += " (ou Descanso Ativo)";
      }
    } 
    else if (phase === 'follicular') {
      // Optimal for strength training
      split = split.map(day => {
        return {
          ...day,
          focus: day.focus + " (Foco em Força)"
        };
      });
    }
    else if (phase === 'ovulation') {
      // Peak performance
      split = split.map(day => {
        return {
          ...day,
          focus: day.focus + " (Alta Intensidade)"
        };
      });
    }
    else if (phase === 'luteal') {
      // More focus on endurance
      split = split.map(day => {
        return {
          ...day,
          focus: day.focus + " (Foco em Resistência)"
        };
      });
    }
  }
  
  // Now, let's populate each day with actual exercises
  workoutDays = split.map(day => {
    let exercises: Exercise[] = [];
    
    // Based on focus, add appropriate exercises
    if (day.focus.includes("Peito")) {
      // Add chest exercises (4-5 for larger muscle groups)
      const chestExercises = trainingLocation === 'academia' 
        ? gymChestExercises 
        : homeChestExercises;
      
      const numExercises = experience === 'iniciante' ? 3 : 4;
      exercises = [...exercises, ...chestExercises.slice(0, numExercises)];
      
      // If it's a compound day (e.g., "Peito e Tríceps"), add triceps exercises
      if (day.focus.includes("Tríceps")) {
        // Add 2-3 triceps exercises (smaller muscle group)
        const tricepsExercises = trainingLocation === 'academia'
          ? [
              { 
                name: "Tríceps corda", 
                sets: 3, 
                reps: "12-15", 
                videoUrl: "https://www.youtube.com/watch?v=kiuVA7g4nqw",
                tip: "Mantenha os cotovelos junto ao corpo",
                equipment: "Máquina de cabos com corda"
              },
              { 
                name: "Tríceps testa com halteres", 
                sets: 3, 
                reps: "10-12", 
                videoUrl: "https://www.youtube.com/watch?v=ir5PsbniVSc",
                tip: "Não mova os cotovelos durante o exercício",
                equipment: "Halteres e banco"
              },
              { 
                name: "Tríceps francês", 
                sets: 3, 
                reps: "10-12", 
                videoUrl: "https://www.youtube.com/watch?v=nUVSs5AwQo4",
                tip: "Mantenha a tensão no tríceps durante todo o movimento",
                equipment: "Halteres"
              }
            ]
          : [
              { 
                name: "Mergulhos em banco", 
                sets: 3, 
                reps: "Max", 
                videoUrl: "https://www.youtube.com/watch?v=JhX1nBnidnE",
                tip: "Mantenha os cotovelos apontados para trás",
                equipment: "Banco ou cadeira"
              },
              { 
                name: "Flexão com mãos próximas", 
                sets: 3, 
                reps: "Max", 
                videoUrl: "https://www.youtube.com/watch?v=MJU8Y2q-Z30",
                tip: "Mantenha os cotovelos junto ao corpo para focar no tríceps",
                equipment: "Peso corporal"
              },
              { 
                name: "Extensão de tríceps deitado", 
                sets: 3, 
                reps: "12-15", 
                videoUrl: "https://www.youtube.com/watch?v=_k5D_JuPvN8",
                tip: "Use garrafa de água ou outro objeto com peso",
                equipment: "Objeto pesado (1-3kg)"
              }
            ];
            
        const numTricepsExercises = experience === 'iniciante' ? 2 : 3;
        exercises = [...exercises, ...tricepsExercises.slice(0, numTricepsExercises)];
      }
    }
    
    // Similar patterns for other muscle groups would be added here
    // This is simplified for the example
    
    // If it's a cardio day, add cardio
    if (day.focus.includes("Cardio")) {
      let cardioExercise: Exercise;
      
      if (day.focus.includes("HIIT")) {
        cardioExercise = {
          name: "HIIT - Treino intervalado de alta intensidade",
          sets: 1,
          reps: "15-20 min",
          videoUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
          tip: "Alterne 30 segundos de esforço máximo com 30 segundos de descanso",
          equipment: trainingLocation === 'academia' ? "Esteira/bicicleta/elíptico" : "Nenhum"
        };
      } else {
        cardioExercise = {
          name: "Cardio de intensidade moderada",
          sets: 1,
          reps: "20-30 min",
          videoUrl: "https://www.youtube.com/watch?v=3M1ILmCmyCQ",
          tip: "Mantenha ritmo constante em que consegue conversar, mas com algum esforço",
          equipment: trainingLocation === 'academia' ? "Esteira/bicicleta/elíptico" : "Nenhum"
        };
      }
      
      exercises.push(cardioExercise);
    }
    
    // If no exercises were added, add placeholder exercises
    if (exercises.length === 0) {
      exercises = [
        {
          name: "Exercício Placeholder 1",
          sets: 3,
          reps: "10-12",
          videoUrl: "https://www.youtube.com/watch?v=example",
          tip: "Este é um exercício de exemplo"
        },
        {
          name: "Exercício Placeholder 2",
          sets: 3,
          reps: "10-12",
          videoUrl: "https://www.youtube.com/watch?v=example",
          tip: "Este é um exercício de exemplo"
        }
      ];
    }
    
    // If menstrual phase indicates reduced intensity
    if (day.focus.includes("Intensidade reduzida")) {
      // Reduce volume for exercises
      exercises = exercises.map(exercise => ({
        ...exercise,
        sets: Math.max(exercise.sets - 1, 2), // Reduce sets by 1, minimum 2
        tip: exercise.tip + " (Reduza a carga em 10-20% durante esta fase)"
      }));
    }
    
    return {
      day: day.day,
      focus: day.focus,
      exercises
    };
  });
  
  return workoutDays;
};

// Calculate menstrual cycle phase based on last period and cycle length
const calculateMenstrualPhase = (lastPeriod: string, cycleLength: number): string => {
  if (!lastPeriod || cycleLength <= 0) return '';
  
  const lastPeriodDate = new Date(lastPeriod);
  const today = new Date();
  
  // Calculate days since last period started
  const daysSinceLastPeriod = Math.floor(
    (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Adjust for cycle repeatability
  const daysIntoCycle = daysSinceLastPeriod % cycleLength;
  
  // Approximate phase divisions
  // Phase 1: Menstrual (days 1-5)
  // Phase 2: Follicular (days 6-11)
  // Phase 3: Ovulation (days 12-16)
  // Phase 4: Luteal (days 17-28+)
  
  if (daysIntoCycle < 5) {
    return 'menstrual';
  } else if (daysIntoCycle < 11) {
    return 'follicular';
  } else if (daysIntoCycle < 16) {
    return 'ovulation';
  } else {
    return 'luteal';
  }
};

export { generateWorkoutPlan, calculateMenstrualPhase };
export type { Exercise, WorkoutDay };
