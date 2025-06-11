
export const generateWorkoutPlan = (
  goal: string, 
  experience: string, 
  location: string, 
  sex: string, 
  healthIssues: string[],
  trainingDays: string[],
  userPhotos?: any
) => {
  // Analyze body proportions from photos if available
  const bodyAnalysis = analyzeBodyFromPhotos(userPhotos, sex);
  
  // Map day names to workout content
  const dayWorkouts: Record<string, any> = {
    'segunda': {
      day: 'Segunda',
      focus: getDayFocus('segunda', sex, bodyAnalysis),
      exercises: generateMondayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    },
    'terca': {
      day: 'Terça',
      focus: getDayFocus('terca', sex, bodyAnalysis),
      exercises: generateTuesdayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    },
    'quarta': {
      day: 'Quarta',
      focus: getDayFocus('quarta', sex, bodyAnalysis),
      exercises: generateWednesdayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    },
    'quinta': {
      day: 'Quinta',
      focus: getDayFocus('quinta', sex, bodyAnalysis),
      exercises: generateThursdayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    },
    'sexta': {
      day: 'Sexta',
      focus: getDayFocus('sexta', sex, bodyAnalysis),
      exercises: generateFridayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    },
    'sabado': {
      day: 'Sábado',
      focus: 'Cardio e Flexibilidade',
      exercises: generateSaturdayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    },
    'domingo': {
      day: 'Domingo',
      focus: 'Treino Leve ou Descanso Ativo',
      exercises: generateSundayWorkout(goal, experience, location, sex, healthIssues, bodyAnalysis)
    }
  };

  // Return workouts only for selected days
  return trainingDays.map(day => dayWorkouts[day]).filter(Boolean);
};

const analyzeBodyFromPhotos = (userPhotos: any, sex: string) => {
  // Simulate photo analysis - in a real app this would use AI/ML
  const analysis = {
    shoulderWidth: 'medium',
    waistSize: 'medium', 
    hipSize: 'medium',
    posture: 'good',
    muscleImbalances: [] as string[],
    focusAreas: [] as string[]
  };

  // Based on sex, determine focus areas
  if (sex === 'feminino') {
    analysis.focusAreas = ['glúteos', 'pernas', 'core', 'postura'];
    // Simulate common female body goals
    analysis.muscleImbalances = ['glúteo-fraco', 'core-fraco'];
  } else {
    analysis.focusAreas = ['peito', 'ombros', 'braços', 'core'];
    // Simulate common male body goals  
    analysis.muscleImbalances = ['ombros-fracos', 'peito-fraco'];
  }

  return analysis;
};

const getDayFocus = (day: string, sex: string, bodyAnalysis: any) => {
  if (sex === 'feminino') {
    switch (day) {
      case 'segunda': return bodyAnalysis.focusAreas.includes('glúteos') ? 'Glúteos e Quadríceps Intenso' : 'Glúteos e Quadríceps';
      case 'terca': return bodyAnalysis.focusAreas.includes('core') ? 'Superiores e Core Reforçado' : 'Superiores e Core';
      case 'quarta': return 'Posteriores e Estabilização';
      case 'quinta': return bodyAnalysis.focusAreas.includes('pernas') ? 'Superiores e Pernas Intenso' : 'Superiores e Glúteos';
      case 'sexta': return 'Full Body Funcional';
      default: return 'Treino Personalizado';
    }
  } else {
    switch (day) {
      case 'segunda': return bodyAnalysis.focusAreas.includes('peito') ? 'Peito e Tríceps Intenso' : 'Peito e Tríceps';
      case 'terca': return 'Costas e Bíceps';
      case 'quarta': return bodyAnalysis.focusAreas.includes('ombros') ? 'Ombros e Core Reforçado' : 'Ombros e Core';
      case 'quinta': return 'Pernas Completo';
      case 'sexta': return bodyAnalysis.focusAreas.includes('braços') ? 'Peito e Braços Intenso' : 'Peito e Ombros';
      default: return 'Treino Personalizado';
    }
  }
};

const generateMondayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  const hasKneeProblems = healthIssues.includes('problemas-joelho');
  const hasBackProblems = healthIssues.includes('problemas-coluna');
  const needsGluteWork = bodyAnalysis.muscleImbalances.includes('glúteo-fraco');
  const needsChestWork = bodyAnalysis.muscleImbalances.includes('peito-fraco');

  if (sex === 'feminino') {
    const exercises = [
      { 
        name: hasKneeProblems ? 'Agachamento com Cadeira' : needsGluteWork ? 'Agachamento Profundo' : 'Agachamento Livre', 
        sets: experience === 'iniciante' ? 3 : 4, 
        reps: needsGluteWork ? '15-20' : '12-15', 
        tip: needsGluteWork ? 'Foque na contração máxima do glúteo' : 'Desça até 90 graus',
        equipment: 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=YaXPRqUwItQ'
      },
      { 
        name: 'Agachamento Búlgaro', 
        sets: needsGluteWork ? 4 : 3, 
        reps: '10-12 cada perna', 
        tip: 'Foque no glúteo da perna da frente',
        equipment: 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE'
      },
      { 
        name: needsGluteWork ? 'Hip Thrust' : 'Ponte de Glúteo', 
        sets: 4, 
        reps: needsGluteWork ? '12-15' : '15-20', 
        tip: 'Aperte o glúteo no topo por 2 segundos',
        equipment: needsGluteWork ? 'Banco e peso' : 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=SEdqd1n0cvg'
      }
    ];

    if (needsGluteWork) {
      exercises.push({
        name: 'Caminhada Lateral com Elástico',
        sets: 3,
        reps: '15 cada lado',
        tip: 'Mantenha tensão constante no elástico',
        equipment: 'Elástico',
        videoUrl: 'https://www.youtube.com/watch?v=qkP4FdTx2-w'
      });
    }

    return exercises;
  } else {
    const exercises = [
      { 
        name: needsChestWork ? 'Flexão com Pausa' : 'Flexão', 
        sets: experience === 'avancado' ? 4 : 3, 
        reps: needsChestWork ? '8-10 (pausa 2s embaixo)' : experience === 'avancado' ? '8-12' : '10-15', 
        tip: needsChestWork ? 'Pause 2 segundos na posição baixa' : 'Corpo reto, movimento controlado',
        equipment: 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4'
      },
      { 
        name: location === 'academia' ? (needsChestWork ? 'Supino Reto com Pausa' : 'Supino Reto') : 'Flexão Diamante', 
        sets: experience === 'avancado' ? 4 : 3, 
        reps: needsChestWork ? '6-8 (pausa 2s no peito)' : '8-12', 
        tip: needsChestWork ? 'Pause a barra no peito por 2 segundos' : location === 'academia' ? 'Mantenha ombros retraídos' : 'Foque no tríceps',
        equipment: location === 'academia' ? 'Barra e banco' : 'Peso corporal',
        videoUrl: location === 'academia' ? 'https://www.youtube.com/watch?v=gRVjAtPip0Y' : 'https://www.youtube.com/watch?v=J0DnG1_S92I'
      }
    ];

    if (needsChestWork && location === 'academia') {
      exercises.push({
        name: 'Crucifixo com Halteres',
        sets: 3,
        reps: '12-15',
        tip: 'Foque no alongamento do peitoral',
        equipment: 'Halteres',
        videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0'
      });
    }

    return exercises;
  }
};

const generateTuesdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  const hasBackProblems = healthIssues.includes('problemas-coluna');
  const needsCoreWork = bodyAnalysis.muscleImbalances.includes('core-fraco');

  if (sex === 'feminino') {
    return [
      { 
        name: hasBackProblems ? 'Flexão na Parede' : 'Flexão (joelhos)', 
        sets: 3, 
        reps: '8-12', 
        tip: hasBackProblems ? 'Versão mais suave' : 'Comece com joelhos apoiados',
        equipment: 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo'
      },
      { 
        name: needsCoreWork ? 'Prancha com Elevação de Perna' : 'Prancha', 
        sets: needsCoreWork ? 4 : 3, 
        reps: needsCoreWork ? '30-45s (10 elevações cada perna)' : '30-45s', 
        tip: 'Mantenha o corpo reto, core contraído',
        equipment: 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=TvxNkmjdhMM'
      },
      {
        name: 'Remada com Elástico',
        sets: 3,
        reps: '12-15',
        tip: 'Aperte as escápulas no final do movimento',
        equipment: 'Elástico',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ];
  } else {
    return [
      { 
        name: hasBackProblems ? 'Remada com Elástico (sentado)' : 'Remada Curvada', 
        sets: 3, 
        reps: '10-12', 
        tip: hasBackProblems ? 'Mantenha coluna reta' : 'Aperte as escápulas',
        equipment: hasBackProblems ? 'Elástico' : location === 'academia' ? 'Barra' : 'Halteres',
        videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo'
      },
      {
        name: 'Barra Fixa ou Puxada',
        sets: experience === 'avancado' ? 4 : 3,
        reps: location === 'academia' ? '8-12' : '5-8',
        tip: 'Foque na contração das costas',
        equipment: location === 'academia' ? 'Barra ou máquina' : 'Barra fixa',
        videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
      }
    ];
  }
};

// Continue with other day generators...
const generateWednesdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  const needsShoulderWork = bodyAnalysis.muscleImbalances.includes('ombros-fracos');
  
  return [
    { 
      name: needsShoulderWork ? 'Desenvolvimento com Pausa' : 'Desenvolvimento de Ombros', 
      sets: needsShoulderWork ? 4 : 3, 
      reps: needsShoulderWork ? '8-10 (pausa 1s no topo)' : '10-12', 
      tip: needsShoulderWork ? 'Pause 1 segundo no topo' : 'Movimento controlado',
      equipment: location === 'academia' ? 'Halteres' : 'Garrafas de água',
      videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog'
    }
  ];
};

const generateThursdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  const hasKneeProblems = healthIssues.includes('problemas-joelho');
  
  return [
    { 
      name: hasKneeProblems ? 'Agachamento com Cadeira' : 'Agachamento', 
      sets: experience === 'avancado' ? 4 : 3, 
      reps: '10-12', 
      tip: hasKneeProblems ? 'Use cadeira para apoio' : 'Desça até 90 graus',
      equipment: location === 'academia' ? 'Barra' : 'Peso corporal',
      videoUrl: 'https://www.youtube.com/watch?v=YaXPRqUwItQ'
    }
  ];
};

const generateFridayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  if (sex === 'feminino') {
    return [
      { 
        name: 'Burpees', 
        sets: 3, 
        reps: '8-10', 
        tip: 'Movimento explosivo mas controlado',
        equipment: 'Peso corporal',
        videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU'
      }
    ];
  } else {
    return [
      { 
        name: 'Flexão Inclinada', 
        sets: 3, 
        reps: '10-12', 
        tip: 'Use banco ou cadeira estável',
        equipment: 'Banco ou cadeira',
        videoUrl: 'https://www.youtube.com/watch?v=cfns5VbgHCc'
      }
    ];
  }
};

const generateSaturdayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  return [
    { 
      name: 'Caminhada ou Corrida Leve', 
      sets: 1, 
      reps: '20-30 minutos', 
      tip: 'Mantenha ritmo confortável para conversar',
      equipment: 'Nenhum',
      videoUrl: 'https://www.youtube.com/watch?v=9FQlD7f-NdQ'
    },
    { 
      name: 'Alongamento Completo', 
      sets: 1, 
      reps: '10-15 minutos', 
      tip: 'Foque nos músculos trabalhados na semana',
      equipment: 'Tapete',
      videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A'
    }
  ];
};

const generateSundayWorkout = (goal: string, experience: string, location: string, sex: string, healthIssues: string[], bodyAnalysis: any) => {
  return [
    { 
      name: 'Yoga ou Pilates', 
      sets: 1, 
      reps: '20-30 minutos', 
      tip: 'Foque no relaxamento e conexão mente-corpo',
      equipment: 'Tapete',
      videoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE'
    }
  ];
};
