
export interface FemaleWorkoutExercise {
  name: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  ageGroups: string[];
  hormonePhase: string[];
  sets: number;
  reps: string;
  restTime: string;
  videoUrl: string;
  technique: string;
  benefits: string[];
  contraindications?: string[];
}

export interface FemaleWorkoutPlan {
  name: string;
  description: string;
  ageGroup: string;
  level: string;
  objective: string;
  hormonePhase: string[];
  frequency: string;
  duration: string;
  exercises: FemaleWorkoutExercise[];
  scientificBasis: string;
  tips: string[];
}

// Exercícios específicos para mulheres com foco em inferiores
export const femaleExercises: Record<string, FemaleWorkoutExercise[]> = {
  gluteos: [
    {
      name: 'Agachamento Sumo',
      targetMuscles: ['Glúteo máximo', 'Quadríceps', 'Adutores'],
      equipment: 'Peso corporal ou halteres',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea'],
      sets: 3,
      reps: '12-15',
      restTime: '45-60s',
      videoUrl: 'https://www.youtube.com/watch?v=0YBqiWA7-0o',
      technique: 'Pés afastados, pontas dos pés viradas para fora, desça controladamente',
      benefits: ['Hipertrofia glútea', 'Fortalecimento das pernas', 'Melhora da postura'],
      contraindications: ['Lesões no joelho', 'Problemas na lombar']
    },
    {
      name: 'Hip Thrust',
      targetMuscles: ['Glúteo máximo', 'Isquiotibiais'],
      equipment: 'Banco e barra/halteres',
      difficulty: 'intermediario',
      ageGroups: ['17-25', '26-39', '40-59'],
      hormonePhase: ['folicular', 'ovulatoria'],
      sets: 4,
      reps: '10-12',
      restTime: '60-90s',
      videoUrl: 'https://www.youtube.com/watch?v=LM8XHLYJoIo',
      technique: 'Apoie as costas no banco, contraía os glúteos no topo do movimento',
      benefits: ['Máxima ativação glútea', 'Melhora da força posterior'],
      contraindications: ['Lesões na lombar']
    },
    {
      name: 'Afundo Búlgaro',
      targetMuscles: ['Glúteo máximo', 'Quadríceps'],
      equipment: 'Banco e halteres',
      difficulty: 'intermediario',
      ageGroups: ['17-25', '26-39', '40-59'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea'],
      sets: 3,
      reps: '10-12 cada perna',
      restTime: '60s',
      videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
      technique: 'Pé traseiro apoiado no banco, desça controladamente',
      benefits: ['Hipertrofia unilateral', 'Correção de assimetrias'],
      contraindications: ['Problemas de equilíbrio']
    },
    {
      name: 'Glúteo 4 Apoios',
      targetMuscles: ['Glúteo máximo', 'Glúteo médio'],
      equipment: 'Peso corporal ou caneleira',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea', 'menstrual'],
      sets: 3,
      reps: '15-20 cada perna',
      restTime: '30-45s',
      videoUrl: 'https://www.youtube.com/watch?v=SzoJ3GHKjJM',
      technique: 'Em quatro apoios, eleve a perna mantendo o joelho flexionado',
      benefits: ['Ativação específica do glúteo', 'Baixo impacto'],
      contraindications: []
    }
  ],
  
  abdomen: [
    {
      name: 'Prancha',
      targetMuscles: ['Core', 'Transverso do abdômen'],
      equipment: 'Peso corporal',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea', 'menstrual'],
      sets: 3,
      reps: '30-60s',
      restTime: '45s',
      videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
      technique: 'Corpo alinhado, contraía o abdômen durante todo exercício',
      benefits: ['Fortalecimento do core', 'Estabilidade postural'],
      contraindications: ['Diástase abdominal severa']
    },
    {
      name: 'Dead Bug',
      targetMuscles: ['Core', 'Multífidos'],
      equipment: 'Peso corporal',
      difficulty: 'iniciante',
      ageGroups: ['26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea', 'menstrual'],
      sets: 3,
      reps: '10 cada lado',
      restTime: '30s',
      videoUrl: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws',
      technique: 'Deitada, mantenha a lombar neutra, mova braço e perna opostos',
      benefits: ['Controle motor', 'Estabilização lombar'],
      contraindications: []
    },
    {
      name: 'Abdominal Bicicleta',
      targetMuscles: ['Reto abdominal', 'Oblíquos'],
      equipment: 'Peso corporal',
      difficulty: 'intermediario',
      ageGroups: ['17-25', '26-39', '40-59'],
      hormonePhase: ['folicular', 'ovulatoria'],
      sets: 3,
      reps: '20 cada lado',
      restTime: '45s',
      videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
      technique: 'Movimento controlado, evite puxar o pescoço',
      benefits: ['Definição abdominal', 'Fortalecimento dos oblíquos'],
      contraindications: ['Problemas cervicais']
    }
  ],

  pernas: [
    {
      name: 'Agachamento Livre',
      targetMuscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
      equipment: 'Peso corporal ou barra',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea'],
      sets: 3,
      reps: '12-15',
      restTime: '60s',
      videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
      technique: 'Desça até 90°, mantenha os joelhos alinhados',
      benefits: ['Fortalecimento geral das pernas', 'Melhora da densidade óssea'],
      contraindications: ['Lesões no joelho']
    },
    {
      name: 'Stiff',
      targetMuscles: ['Isquiotibiais', 'Glúteos'],
      equipment: 'Barra ou halteres',
      difficulty: 'intermediario',
      ageGroups: ['17-25', '26-39', '40-59'],
      hormonePhase: ['folicular', 'ovulatoria'],
      sets: 3,
      reps: '10-12',
      restTime: '60-90s',
      videoUrl: 'https://www.youtube.com/watch?v=1uDiW5-_Jps',
      technique: 'Joelhos ligeiramente flexionados, desça controladamente',
      benefits: ['Fortalecimento posterior', 'Flexibilidade dos isquios'],
      contraindications: ['Lesões lombares']
    },
    {
      name: 'Elevação Panturrilha',
      targetMuscles: ['Gastrocnêmio', 'Sóleo'],
      equipment: 'Peso corporal ou halteres',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea', 'menstrual'],
      sets: 3,
      reps: '15-20',
      restTime: '30s',
      videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI',
      technique: 'Amplitude completa, pausa no topo',
      benefits: ['Fortalecimento das panturrilhas', 'Melhora da circulação'],
      contraindications: []
    }
  ],

  superiores: [
    {
      name: 'Flexão Feminina',
      targetMuscles: ['Peitoral', 'Tríceps', 'Deltoides'],
      equipment: 'Peso corporal',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea'],
      sets: 3,
      reps: '8-12',
      restTime: '60s',
      videoUrl: 'https://www.youtube.com/watch?v=jWxvty2KROs',
      technique: 'Pode ser feita com joelhos apoiados inicialmente',
      benefits: ['Fortalecimento superior', 'Funcionalidade'],
      contraindications: ['Lesões no punho']
    },
    {
      name: 'Remada com Elástico',
      targetMuscles: ['Latíssimo', 'Romboides', 'Deltoides posterior'],
      equipment: 'Elástico',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea', 'menstrual'],
      sets: 3,
      reps: '12-15',
      restTime: '45s',
      videoUrl: 'https://www.youtube.com/watch?v=IOUx0EQUAO0',
      technique: 'Aperte as escápulas, movimento controlado',
      benefits: ['Melhora da postura', 'Fortalecimento das costas'],
      contraindications: []
    }
  ],

  cardio: [
    {
      name: 'HIIT Feminino',
      targetMuscles: ['Sistema cardiovascular', 'Corpo inteiro'],
      equipment: 'Peso corporal',
      difficulty: 'intermediario',
      ageGroups: ['17-25', '26-39', '40-59'],
      hormonePhase: ['folicular', 'ovulatoria'],
      sets: 4,
      reps: '30s trabalho/30s descanso',
      restTime: '60s entre blocos',
      videoUrl: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
      technique: 'Alta intensidade nos intervalos de trabalho',
      benefits: ['Queima de gordura', 'Melhora cardiovascular', 'EPOC'],
      contraindications: ['Problemas cardíacos', 'Fase menstrual intensa']
    },
    {
      name: 'Caminhada Inclinada',
      targetMuscles: ['Sistema cardiovascular', 'Glúteos', 'Panturrilhas'],
      equipment: 'Esteira ou terreno inclinado',
      difficulty: 'iniciante',
      ageGroups: ['17-25', '26-39', '40-59', '60+'],
      hormonePhase: ['folicular', 'ovulatoria', 'lutea', 'menstrual'],
      sets: 1,
      reps: '20-45 min',
      restTime: 'Contínuo',
      videoUrl: 'https://www.youtube.com/watch?v=NKDNgK7HB0s',
      technique: 'Inclinação 5-15%, ritmo moderado',
      benefits: ['Baixo impacto', 'Queima de gordura', 'Fortalecimento glúteos'],
      contraindications: []
    }
  ]
};

// Planos específicos por idade e objetivo
export const femaleWorkoutPlans: Record<string, FemaleWorkoutPlan[]> = {
  '17-25': [
    {
      name: 'Glúteos de Aço - Jovem',
      description: 'Programa focado em hipertrofia glútea e tonificação das pernas',
      ageGroup: '17-25',
      level: 'intermediario',
      objective: 'hipertrofia-glutea',
      hormonePhase: ['folicular', 'ovulatoria'],
      frequency: '4-5x por semana',
      duration: '45-60 min',
      exercises: [
        femaleExercises.gluteos[0], // Agachamento Sumo
        femaleExercises.gluteos[1], // Hip Thrust
        femaleExercises.gluteos[2], // Afundo Búlgaro
        femaleExercises.pernas[1], // Stiff
        femaleExercises.abdomen[2], // Abdominal Bicicleta
      ],
      scientificBasis: 'Baseado em estudos de Contreras et al. sobre ativação glútea máxima e frequência de treino para hipertrofia em mulheres jovens.',
      tips: [
        'Aumente a carga progressivamente a cada semana',
        'Foque na conexão mente-músculo',
        'Evite treinos intensos durante a menstruação',
        'Hidrate-se adequadamente'
      ]
    },
    {
      name: 'Definição Total',
      description: 'Combinação de força e cardio para definição muscular',
      ageGroup: '17-25',
      level: 'avancado',
      objective: 'definicao',
      hormonePhase: ['folicular', 'ovulatoria'],
      frequency: '5-6x por semana',
      duration: '60-75 min',
      exercises: [
        femaleExercises.gluteos[1], // Hip Thrust
        femaleExercises.pernas[0], // Agachamento
        femaleExercises.abdomen[0], // Prancha
        femaleExercises.cardio[0], // HIIT
        femaleExercises.superiores[0] // Flexão
      ],
      scientificBasis: 'Protocolo baseado em pesquisas sobre HIIT e treinamento de força para composição corporal em mulheres.',
      tips: [
        'Combine força e cardio na mesma sessão',
        'Monitore a recuperação',
        'Ajuste intensidade conforme o ciclo menstrual'
      ]
    }
  ],

  '26-39': [
    {
      name: 'Força e Controle',
      description: 'Foco em controle de peso e resistência muscular',
      ageGroup: '26-39',
      level: 'intermediario',
      objective: 'controle-peso',
      hormonePhase: ['folicular', 'ovulatoria', 'lutea'],
      frequency: '4-5x por semana',
      duration: '50-65 min',
      exercises: [
        femaleExercises.pernas[0], // Agachamento
        femaleExercises.gluteos[3], // Glúteo 4 apoios
        femaleExercises.abdomen[1], // Dead Bug
        femaleExercises.superiores[1], // Remada
        femaleExercises.cardio[1] // Caminhada Inclinada
      ],
      scientificBasis: 'Baseado em diretrizes da ACSM para mulheres adultas e estudos sobre metabolismo na faixa dos 30 anos.',
      tips: [
        'Priorize a consistência sobre intensidade',
        'Inclua exercícios funcionais',
        'Atente-se às mudanças hormonais'
      ]
    }
  ],

  '40-59': [
    {
      name: 'Metabolismo e Ossos',
      description: 'Prevenção da perda muscular e fortalecimento ósseo',
      ageGroup: '40-59',
      level: 'intermediario',
      objective: 'saude-ossea',
      hormonePhase: ['perimenopausa', 'menopausa'],
      frequency: '3-4x por semana',
      duration: '45-55 min',
      exercises: [
        femaleExercises.pernas[0], // Agachamento
        femaleExercises.gluteos[0], // Agachamento Sumo
        femaleExercises.abdomen[0], // Prancha
        femaleExercises.superiores[0], // Flexão
        femaleExercises.cardio[1] // Caminhada
      ],
      scientificBasis: 'Protocolo baseado em estudos sobre prevenção de sarcopenia e osteoporose em mulheres na perimenopausa.',
      tips: [
        'Exercícios com carga para densidade óssea',
        'Foque no equilíbrio e propriocepção',
        'Atenção especial ao aquecimento'
      ]
    }
  ],

  '60+': [
    {
      name: 'Funcionalidade e Mobilidade',
      description: 'Manutenção da independência e prevenção de quedas',
      ageGroup: '60+',
      level: 'iniciante',
      objective: 'funcional',
      hormonePhase: ['pos-menopausa'],
      frequency: '3x por semana',
      duration: '30-40 min',
      exercises: [
        femaleExercises.gluteos[3], // Glúteo 4 apoios
        femaleExercises.abdomen[1], // Dead Bug
        femaleExercises.pernas[2], // Panturrilha
        femaleExercises.superiores[1], // Remada elástico
        femaleExercises.cardio[1] // Caminhada
      ],
      scientificBasis: 'Baseado em diretrizes geriátricas e estudos sobre prevenção de fragilidade em idosas.',
      tips: [
        'Priorize segurança e estabilidade',
        'Exercícios de baixo impacto',
        'Inclua treino de equilíbrio',
        'Monitore sinais vitais'
      ]
    }
  ]
};

// Adaptações por fase hormonal
export const hormonalAdaptations = {
  menstrual: {
    description: 'Fase menstrual (dias 1-5)',
    recommendations: [
      'Reduzir intensidade se houver desconforto',
      'Foco em exercícios de baixo impacto',
      'Hidratação extra',
      'Evitar HIIT intenso'
    ],
    exerciseModifications: {
      intensity: 'baixa-moderada',
      volume: 'reduzido',
      focus: 'mobilidade e força leve'
    }
  },
  folicular: {
    description: 'Fase folicular (dias 6-14)',
    recommendations: [
      'Melhor fase para treinos intensos',
      'Foco em força e hipertrofia',
      'Excelente recuperação',
      'Aproveite para PRs'
    ],
    exerciseModifications: {
      intensity: 'alta',
      volume: 'normal-alto',
      focus: 'força e hipertrofia'
    }
  },
  ovulatoria: {
    description: 'Fase ovulatória (dias 12-16)',
    recommendations: [
      'Pico de energia e força',
      'Ideal para treinos pesados',
      'Maior tolerância ao volume',
      'Foco em exercícios compostos'
    ],
    exerciseModifications: {
      intensity: 'muito alta',
      volume: 'alto',
      focus: 'força máxima'
    }
  },
  lutea: {
    description: 'Fase lútea (dias 17-28)',
    recommendations: [
      'Redução gradual da intensidade',
      'Foco em resistência',
      'Atenção à recuperação',
      'Pode haver mais fadiga'
    ],
    exerciseModifications: {
      intensity: 'moderada',
      volume: 'normal',
      focus: 'resistência e técnica'
    }
  },
  perimenopausa: {
    description: 'Período de transição (45-55 anos)',
    recommendations: [
      'Treino de força regular',
      'Exercícios com impacto controlado',
      'Foco na saúde óssea',
      'Gerenciamento do estresse'
    ],
    exerciseModifications: {
      intensity: 'moderada-alta',
      volume: 'normal',
      focus: 'força e densidade óssea'
    }
  },
  menopausa: {
    description: 'Pós-menopausa (55+ anos)',
    recommendations: [
      'Manutenção da massa muscular',
      'Prevenção da osteoporose',
      'Exercícios funcionais',
      'Controle do peso corporal'
    ],
    exerciseModifications: {
      intensity: 'moderada',
      volume: 'normal',
      focus: 'funcionalidade e saúde'
    }
  }
};
