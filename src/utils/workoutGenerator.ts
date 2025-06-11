
export const generateWorkoutPlan = (
  goal: string, 
  experience: string, 
  location: string, 
  sex: string, 
  healthIssues: string[],
  trainingDays: string[]
) => {
  // Map day names to workout content
  const dayWorkouts: Record<string, any> = {
    'segunda': {
      day: 'Segunda',
      focus: sex === 'feminino' ? 'Glúteos e Quadríceps' : 'Peito e Tríceps',
      exercises: generateMondayWorkout(goal, experience, location, sex, healthIssues)
    },
    'terca': {
      day: 'Terça',
      focus: sex === 'feminino' ? 'Superiores e Core' : 'Costas e Bíceps',
      exercises: generateTuesdayWorkout(goal, experience, location, sex, healthIssues)
    },
    'quarta': {
      day: 'Quarta',
      focus: sex === 'feminino' ? 'Posteriores e Core' : 'Ombros e Core',
      exercises: generateWednesdayWorkout(goal, experience, location, sex, healthIssues)
    },
    'quinta': {
      day: 'Quinta',
      focus: sex === 'feminino' ? 'Superiores e Glúteos' : 'Pernas',
      exercises: generateThursdayWorkout(goal, experience, location, sex, healthIssues)
    },
    'sexta': {
      day: 'Sexta',
      focus: sex === 'feminino' ? 'Full Body' : 'Peito e Ombros',
      exercises: generateFridayWorkout(goal, experience, location, sex, healthIssues)
    },
    'sabado': {
      day: 'Sábado',
      focus: 'Cardio e Flexibilidade',
      exercises: generateSaturdayWorkout(goal, experience, location, sex, healthIssues)
    },
    'domingo': {
      day: 'Domingo',
      focus: 'Treino Leve ou Descanso Ativo',
      exercises: generateSundayWorkout(goal, experience, location, sex, healthIssues)
    }
  };

  // Return workouts only for selected days
  return trainingDays.map(day => dayWorkouts[day]).filter(Boolean);
};

const generateMondayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  const hasKneeProblems = healthIssues.includes('problemas-joelho');
  const hasBackProblems = healthIssues.includes('problemas-coluna');

  if (sex === 'feminino') {
    return [
      { 
        name: hasKneeProblems ? 'Agachamento com Cadeira' : 'Agachamento Livre', 
        sets: experience === 'iniciante' ? 3 : 4, 
        reps: '12-15', 
        tip: hasKneeProblems ? 'Use cadeira para apoio' : 'Desça até 90 graus',
        equipment: 'Peso corporal'
      },
      { 
        name: 'Agachamento Búlgaro', 
        sets: 3, 
        reps: '10-12 cada perna', 
        tip: 'Foque no glúteo da perna da frente',
        equipment: 'Peso corporal'
      },
      { 
        name: 'Ponte de Glúteo', 
        sets: 4, 
        reps: '15-20', 
        tip: 'Aperte o glúteo no topo',
        equipment: 'Peso corporal'
      }
    ];
  } else {
    return [
      { 
        name: 'Flexão', 
        sets: experience === 'avancado' ? 4 : 3, 
        reps: experience === 'avancado' ? '8-12' : '10-15', 
        tip: 'Corpo reto, movimento controlado',
        equipment: 'Peso corporal'
      },
      { 
        name: location === 'academia' ? 'Supino Reto' : 'Flexão Diamante', 
        sets: experience === 'avancado' ? 4 : 3, 
        reps: '8-12', 
        tip: location === 'academia' ? 'Mantenha ombros retraídos' : 'Foque no tríceps',
        equipment: location === 'academia' ? 'Barra e banco' : 'Peso corporal'
      }
    ];
  }
};

const generateTuesdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  const hasBackProblems = healthIssues.includes('problemas-coluna');

  if (sex === 'feminino') {
    return [
      { 
        name: hasBackProblems ? 'Flexão na Parede' : 'Flexão (joelhos)', 
        sets: 3, 
        reps: '8-12', 
        tip: hasBackProblems ? 'Versão mais suave' : 'Comece com joelhos apoiados',
        equipment: 'Peso corporal'
      },
      { 
        name: 'Prancha', 
        sets: 3, 
        reps: '30-45s', 
        tip: 'Mantenha o corpo reto',
        equipment: 'Peso corporal'
      }
    ];
  } else {
    return [
      { 
        name: hasBackProblems ? 'Remada com Elástico (sentado)' : 'Remada Curvada', 
        sets: 3, 
        reps: '10-12', 
        tip: hasBackProblems ? 'Mantenha coluna reta' : 'Aperte as escápulas',
        equipment: hasBackProblems ? 'Elástico' : location === 'academia' ? 'Barra' : 'Halteres'
      }
    ];
  }
};

// Continue with other day generators...
const generateWednesdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  return [
    { 
      name: 'Desenvolvimento de Ombros', 
      sets: 3, 
      reps: '10-12', 
      tip: 'Movimento controlado',
      equipment: location === 'academia' ? 'Halteres' : 'Garrafas de água'
    }
  ];
};

const generateThursdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  const hasKneeProblems = healthIssues.includes('problemas-joelho');
  
  return [
    { 
      name: hasKneeProblems ? 'Agachamento com Cadeira' : 'Agachamento', 
      sets: experience === 'avancado' ? 4 : 3, 
      reps: '10-12', 
      tip: hasKneeProblems ? 'Use cadeira para apoio' : 'Desça até 90 graus',
      equipment: location === 'academia' ? 'Barra' : 'Peso corporal'
    }
  ];
};

const generateFridayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  if (sex === 'feminino') {
    return [
      { 
        name: 'Burpees', 
        sets: 3, 
        reps: '8-10', 
        tip: 'Movimento explosivo',
        equipment: 'Peso corporal'
      }
    ];
  } else {
    return [
      { 
        name: 'Flexão Inclinada', 
        sets: 3, 
        reps: '10-12', 
        tip: 'Use banco ou cadeira',
        equipment: 'Banco ou cadeira'
      }
    ];
  }
};

const generateSaturdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  return [
    { 
      name: 'Caminhada ou Corrida Leve', 
      sets: 1, 
      reps: '20-30 minutos', 
      tip: 'Mantenha ritmo confortável',
      equipment: 'Nenhum'
    },
    { 
      name: 'Alongamento', 
      sets: 1, 
      reps: '10-15 minutos', 
      tip: 'Foque nos músculos trabalhados na semana',
      equipment: 'Nenhum'
    }
  ];
};

const generateSundayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
  return [
    { 
      name: 'Yoga ou Pilates', 
      sets: 1, 
      reps: '20-30 minutos', 
      tip: 'Foque no relaxamento e flexibilidade',
      equipment: 'Tapete'
    }
  ];
};
