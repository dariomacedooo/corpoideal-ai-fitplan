
export interface ScientificExercise {
  id: string;
  name: string;
  muscleGroup: string;
  targetMuscles: string[];
  equipment: string[];
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  defaultSets: number;
  defaultReps: string;
  restTime: string;
  videoUrl: string;
  scientificSource: string;
  description: string;
  tips: string[];
}

export const scientificExerciseDatabase: ScientificExercise[] = [
  // PEITORAL
  {
    id: 'supino-reto-barra',
    name: 'Supino Reto com Barra',
    muscleGroup: 'peito',
    targetMuscles: ['Peitoral maior', 'Deltoide anterior', 'Tríceps'],
    equipment: ['Barra', 'Banco'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '8-12',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
    scientificSource: 'Boeckh-Behrens & Buskies (2000)',
    description: 'Exercício fundamental para desenvolvimento do peitoral maior',
    tips: ['Mantenha ombros retraídos', 'Controle a descida', 'Explosão na subida']
  },
  {
    id: 'supino-inclinado-halteres',
    name: 'Supino Inclinado com Halteres',
    muscleGroup: 'peito',
    targetMuscles: ['Peitoral superior', 'Deltoide anterior'],
    equipment: ['Halteres', 'Banco inclinado'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '8-12',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=DbFgADa2PL8',
    scientificSource: 'Bret Contreras EMG Studies',
    description: 'Ênfase no peitoral superior com maior amplitude',
    tips: ['Inclinação 30-45°', 'Movimento amplo', 'Aperte no topo']
  },
  {
    id: 'peck-deck',
    name: 'Peck Deck (Voador)',
    muscleGroup: 'peito',
    targetMuscles: ['Peitoral maior', 'Peitoral menor'],
    equipment: ['Máquina'],
    difficulty: 'iniciante',
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90s',
    videoUrl: 'https://www.youtube.com/watch?v=Z5m2xR4pQXM',
    scientificSource: 'ACE EMG Study',
    description: 'Isolamento do peitoral com movimento de adução',
    tips: ['Mantenha costas no banco', 'Movimento controlado', 'Sinta o alongamento']
  },
  {
    id: 'crossover-polia-alta',
    name: 'Crossover Polia Alta',
    muscleGroup: 'peito',
    targetMuscles: ['Peitoral inferior', 'Peitoral maior'],
    equipment: ['Cabo', 'Polia'],
    difficulty: 'intermediario',
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90s',
    videoUrl: 'https://www.youtube.com/watch?v=taI4XduLpTk',
    scientificSource: 'Boeckh-Behrens & Buskies',
    description: 'Ativação do peitoral inferior com movimento de cabo',
    tips: ['Incline ligeiramente o corpo', 'Cruze na frente', 'Tensão constante']
  },
  {
    id: 'flexoes',
    name: 'Flexões (Push-ups)',
    muscleGroup: 'peito',
    targetMuscles: ['Peitoral maior', 'Tríceps', 'Core'],
    equipment: ['Peso corporal'],
    difficulty: 'iniciante',
    defaultSets: 3,
    defaultReps: '10-20',
    restTime: '60s',
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    scientificSource: 'Multiple EMG Studies',
    description: 'Exercício funcional para peitoral e estabilização',
    tips: ['Corpo reto', 'Mãos na linha do peito', 'Movimento completo']
  },

  // COSTAS
  {
    id: 'barra-fixa-pronada',
    name: 'Barra Fixa Pronada (Pull-up)',
    muscleGroup: 'costas',
    targetMuscles: ['Latíssimo', 'Romboides', 'Bíceps'],
    equipment: ['Barra fixa'],
    difficulty: 'avancado',
    defaultSets: 4,
    defaultReps: '6-12',
    restTime: '120-180s',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    scientificSource: 'Boeckh-Behrens & Buskies',
    description: 'Exercício supremo para desenvolvimento das costas',
    tips: ['Pegada pronada', 'Puxe até o peito', 'Controle a descida']
  },
  {
    id: 'remada-curvada-barra',
    name: 'Remada Curvada com Barra',
    muscleGroup: 'costas',
    targetMuscles: ['Latíssimo', 'Trapézio médio', 'Romboides'],
    equipment: ['Barra'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '8-12',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    scientificSource: 'Bret Contreras EMG',
    description: 'Exercício fundamental para espessura das costas',
    tips: ['Mantenha coluna neutra', 'Puxe até o abdômen', 'Aperte as escápulas']
  },
  {
    id: 'puxada-frente',
    name: 'Puxada na Frente (Pulldown)',
    muscleGroup: 'costas',
    targetMuscles: ['Latíssimo', 'Bíceps', 'Romboides'],
    equipment: ['Puxador', 'Cabo'],
    difficulty: 'iniciante',
    defaultSets: 4,
    defaultReps: '10-12',
    restTime: '90s',
    videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    scientificSource: 'ACE Back Study',
    description: 'Desenvolvimento da largura das costas',
    tips: ['Puxe até o peito', 'Inclina levemente para trás', 'Movimento controlado']
  },

  // OMBROS
  {
    id: 'desenvolvimento-halteres',
    name: 'Desenvolvimento com Halteres',
    muscleGroup: 'ombros',
    targetMuscles: ['Deltoide anterior', 'Deltoide lateral', 'Tríceps'],
    equipment: ['Halteres', 'Banco'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '8-12',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
    scientificSource: 'ACE Shoulder EMG Study',
    description: 'Exercício principal para desenvolvimento dos ombros',
    tips: ['Amplitude completa', 'Não trave os cotovelos', 'Controle o peso']
  },
  {
    id: 'elevacao-lateral',
    name: 'Elevação Lateral com Halteres',
    muscleGroup: 'ombros',
    targetMuscles: ['Deltoide lateral'],
    equipment: ['Halteres'],
    difficulty: 'iniciante',
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90s',
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    scientificSource: 'ACE Shoulder EMG Study',
    description: 'Isolamento do deltoide lateral para largura dos ombros',
    tips: ['Cotovelos ligeiramente flexionados', 'Pare na altura dos ombros', 'Movimento controlado']
  },

  // BÍCEPS
  {
    id: 'rosca-direta-barra',
    name: 'Rosca Direta com Barra',
    muscleGroup: 'bracos',
    targetMuscles: ['Bíceps braquial', 'Braquial anterior'],
    equipment: ['Barra', 'Barra EZ'],
    difficulty: 'iniciante',
    defaultSets: 4,
    defaultReps: '10-12',
    restTime: '60-90s',
    videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    scientificSource: 'ACE Biceps EMG Study',
    description: 'Exercício fundamental para desenvolvimento do bíceps',
    tips: ['Cotovelos fixos', 'Movimento completo', 'Não balance o corpo']
  },
  {
    id: 'rosca-concentrada',
    name: 'Rosca Concentrada',
    muscleGroup: 'bracos',
    targetMuscles: ['Bíceps braquial'],
    equipment: ['Halter', 'Banco'],
    difficulty: 'iniciante',
    defaultSets: 3,
    defaultReps: '10-12',
    restTime: '60s',
    videoUrl: 'https://www.youtube.com/watch?v=Jvj2wV_ytYE',
    scientificSource: 'ACE Biceps EMG Study',
    description: 'Maior isolamento e ativação do bíceps',
    tips: ['Braço apoiado na coxa', 'Movimento lento', 'Máxima contração']
  },

  // TRÍCEPS
  {
    id: 'paralelas-dips',
    name: 'Paralelas (Dips)',
    muscleGroup: 'bracos',
    targetMuscles: ['Tríceps', 'Peitoral inferior', 'Deltoide anterior'],
    equipment: ['Paralelas'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '8-15',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
    scientificSource: 'ACE Triceps Study',
    description: 'Exercício supremo para desenvolvimento do tríceps',
    tips: ['Corpo reto', 'Desça até 90°', 'Foque no tríceps']
  },
  {
    id: 'triceps-polia-corda',
    name: 'Tríceps Corda na Polia',
    muscleGroup: 'bracos',
    targetMuscles: ['Tríceps'],
    equipment: ['Cabo', 'Corda'],
    difficulty: 'iniciante',
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90s',
    videoUrl: 'https://www.youtube.com/watch?v=vB5OHsJ3EME',
    scientificSource: 'EMG Study Boeckh-Behrens',
    description: 'Isolamento do tríceps com amplitude total',
    tips: ['Cotovelos fixos', 'Abra a corda embaixo', 'Tensão constante']
  },

  // PERNAS - QUADRÍCEPS
  {
    id: 'agachamento-livre',
    name: 'Agachamento Livre com Barra',
    muscleGroup: 'pernas',
    targetMuscles: ['Quadríceps', 'Glúteos', 'Core'],
    equipment: ['Barra', 'Rack'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '8-12',
    restTime: '120-180s',
    videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
    scientificSource: 'Multiple EMG Studies',
    description: 'Exercício rei para pernas e força funcional',
    tips: ['Desça até 90°', 'Joelhos alinhados', 'Core contraído']
  },
  {
    id: 'leg-press-45',
    name: 'Leg Press 45°',
    muscleGroup: 'pernas',
    targetMuscles: ['Quadríceps', 'Glúteos'],
    equipment: ['Máquina Leg Press'],
    difficulty: 'iniciante',
    defaultSets: 4,
    defaultReps: '12-15',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    scientificSource: 'Biomechanical Studies',
    description: 'Desenvolvimento seguro dos quadríceps',
    tips: ['Amplitude completa', 'Não trave os joelhos', 'Controle o peso']
  },

  // POSTERIORES
  {
    id: 'stiff-halteres',
    name: 'Stiff com Halteres',
    muscleGroup: 'pernas',
    targetMuscles: ['Isquiotibiais', 'Glúteos'],
    equipment: ['Halteres'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '10-12',
    restTime: '90s',
    videoUrl: 'https://www.youtube.com/watch?v=1uDiW5-_Jps',
    scientificSource: 'EMG Posterior Chain Studies',
    description: 'Desenvolvimento dos isquiotibiais e glúteos',
    tips: ['Mantenha joelhos levemente flexionados', 'Quadril para trás', 'Sinta o alongamento']
  },

  // GLÚTEOS
  {
    id: 'hip-thrust',
    name: 'Hip Thrust com Barra',
    muscleGroup: 'pernas',
    targetMuscles: ['Glúteo máximo', 'Isquiotibiais'],
    equipment: ['Barra', 'Banco'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '10-15',
    restTime: '90-120s',
    videoUrl: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E',
    scientificSource: 'Contreras EMG Studies',
    description: 'Exercício supremo para ativação dos glúteos',
    tips: ['Aperte forte no topo', 'Quadril bem estendido', 'Evite hiperextensão lombar']
  },

  // PANTURRILHAS
  {
    id: 'elevacao-panturrilha-pe',
    name: 'Elevação de Panturrilhas em Pé',
    muscleGroup: 'pernas',
    targetMuscles: ['Gastrocnêmio'],
    equipment: ['Máquina', 'Halteres'],
    difficulty: 'iniciante',
    defaultSets: 4,
    defaultReps: '15-20',
    restTime: '60s',
    videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI',
    scientificSource: 'Calf EMG Studies',
    description: 'Desenvolvimento do gastrocnêmio',
    tips: ['Amplitude completa', 'Pausa no topo', 'Alongue embaixo']
  },

  // ABDÔMEN
  {
    id: 'prancha-frontal',
    name: 'Prancha Frontal',
    muscleGroup: 'abdomen',
    targetMuscles: ['Transverso abdominal', 'Reto abdominal', 'Core'],
    equipment: ['Peso corporal'],
    difficulty: 'iniciante',
    defaultSets: 3,
    defaultReps: '30-60s',
    restTime: '60s',
    videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    scientificSource: 'McGill Core Studies',
    description: 'Fortalecimento isométrico do core',
    tips: ['Corpo reto', 'Core contraído', 'Respiração controlada']
  },
  {
    id: 'abdominal-polia',
    name: 'Abdominal na Polia (Cable Crunch)',
    muscleGroup: 'abdomen',
    targetMuscles: ['Reto abdominal'],
    equipment: ['Cabo', 'Corda'],
    difficulty: 'intermediario',
    defaultSets: 4,
    defaultReps: '15-20',
    restTime: '60s',
    videoUrl: 'https://www.youtube.com/watch?v=Ffb_GLHqsUo',
    scientificSource: 'ACE Abdominal Study',
    description: 'Exercício de resistência para reto abdominal',
    tips: ['Flexão apenas do tronco', 'Mantenha quadril estável', 'Movimento controlado']
  },
  {
    id: 'ab-wheel',
    name: 'Abdominal com Roda (Ab Wheel)',
    muscleGroup: 'abdomen',
    targetMuscles: ['Transverso', 'Reto abdominal', 'Core'],
    equipment: ['Roda abdominal'],
    difficulty: 'avancado',
    defaultSets: 3,
    defaultReps: '8-15',
    restTime: '90s',
    videoUrl: 'https://www.youtube.com/watch?v=UGEpQ1BRx-4',
    scientificSource: 'McGill EMG Studies',
    description: 'Exercício avançado para força total do core',
    tips: ['Controle total', 'Não arqueie as costas', 'Movimento lento']
  }
];

// ALONGAMENTOS
export interface StretchExercise {
  id: string;
  name: string;
  category: 'inferior' | 'superior' | 'coluna';
  targetMuscles: string[];
  duration: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  videoUrl: string;
  description: string;
  tips: string[];
}

export const stretchDatabase: StretchExercise[] = [
  // MEMBROS INFERIORES
  {
    id: 'alongamento-isquiotibiais',
    name: 'Alongamento de Isquiotibiais',
    category: 'inferior',
    targetMuscles: ['Isquiotibiais', 'Panturrilhas'],
    duration: '30-45s',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=g_TEJMXOQTg',
    description: 'Alongamento essencial para posteriores da coxa',
    tips: ['Mantenha joelho estendido', 'Não force', 'Respiração profunda']
  },
  {
    id: 'alongamento-quadriceps',
    name: 'Alongamento de Quadríceps',
    category: 'inferior',
    targetMuscles: ['Quadríceps', 'Flexores do quadril'],
    duration: '30s cada perna',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=85aZwWbVh4Q',
    description: 'Alongamento frontal da coxa',
    tips: ['Mantenha quadril alinhado', 'Puxe o pé atrás', 'Equilibre-se']
  },
  {
    id: 'alongamento-gluteo',
    name: 'Alongamento de Glúteo',
    category: 'inferior',
    targetMuscles: ['Glúteos', 'Piriforme'],
    duration: '30-45s cada lado',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=HHOGNw-3ov8',
    description: 'Relaxamento dos glúteos e piriforme',
    tips: ['Puxe joelho ao peito', 'Respire fundo', 'Relaxe o ombro']
  },
  {
    id: 'alongamento-panturrilha',
    name: 'Alongamento de Panturrilhas',
    category: 'inferior',
    targetMuscles: ['Gastrocnêmio', 'Sóleo'],
    duration: '30s cada perna',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=71QWtB5L6XU',
    description: 'Alongamento da panturrilha na parede',
    tips: ['Calcanhar no chão', 'Perna de trás reta', 'Incline para frente']
  },
  {
    id: 'alongamento-psoas',
    name: 'Alongamento do Psoas',
    category: 'inferior',
    targetMuscles: ['Psoas', 'Flexores do quadril'],
    duration: '30-45s cada lado',
    difficulty: 'intermediario',
    videoUrl: 'https://www.youtube.com/watch?v=YF36N5DGSCw',
    description: 'Alongamento dos flexores do quadril',
    tips: ['Passo longo para frente', 'Quadril para frente', 'Mantenha tronco ereto']
  },

  // MEMBROS SUPERIORES
  {
    id: 'alongamento-peitoral',
    name: 'Alongamento de Peitoral',
    category: 'superior',
    targetMuscles: ['Peitoral maior', 'Deltoide anterior'],
    duration: '30s cada braço',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=3ac_2ZOYfjY',
    description: 'Alongamento do peitoral na parede',
    tips: ['Braço em 90°', 'Gire o corpo para fora', 'Sinta o alongamento']
  },
  {
    id: 'alongamento-deltoide-posterior',
    name: 'Alongamento Deltoide Posterior',
    category: 'superior',
    targetMuscles: ['Deltoide posterior', 'Trapézio'],
    duration: '30s cada braço',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=M6Xjf2fmHbs',
    description: 'Cruzar braço à frente do corpo',
    tips: ['Puxe o cotovelo', 'Mantenha ombro relaxado', 'Não torça o tronco']
  },
  {
    id: 'alongamento-triceps',
    name: 'Alongamento de Tríceps',
    category: 'superior',
    targetMuscles: ['Tríceps', 'Latíssimo'],
    duration: '30s cada braço',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=fFMO2I2RdCU',
    description: 'Mão atrás da cabeça com auxílio',
    tips: ['Cotovelo para cima', 'Empurre suavemente', 'Não force']
  },
  {
    id: 'alongamento-biceps',
    name: 'Alongamento de Bíceps',
    category: 'superior',
    targetMuscles: ['Bíceps', 'Flexores do punho'],
    duration: '30s cada braço',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=0rWjKsLG5lc',
    description: 'Braço estendido com rotação',
    tips: ['Braço totalmente estendido', 'Gire o polegar para baixo', 'Mantenha postura']
  },
  {
    id: 'alongamento-cervical',
    name: 'Alongamento Cervical',
    category: 'superior',
    targetMuscles: ['Trapézio superior', 'Elevador da escápula'],
    duration: '30s cada lado',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=A6V1zyiJJPQ',
    description: 'Inclinação lateral com apoio da mão',
    tips: ['Incline a cabeça lateralmente', 'Mão oposta segura', 'Movimento suave']
  },

  // COLUNA E TRONCO
  {
    id: 'gato-camelo',
    name: 'Gato e Camelo',
    category: 'coluna',
    targetMuscles: ['Coluna lombar', 'Coluna torácica', 'Core'],
    duration: '10-15 repetições',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=K9bK0BwKFjs',
    description: 'Mobilidade da coluna vertebral',
    tips: ['Movimento lento', 'Respire com o movimento', 'Amplitude completa']
  },
  {
    id: 'torcao-espinhal',
    name: 'Torção Espinhal Deitada',
    category: 'coluna',
    targetMuscles: ['Coluna torácica', 'Oblíquos', 'Quadril'],
    duration: '30-45s cada lado',
    difficulty: 'intermediario',
    videoUrl: 'https://www.youtube.com/watch?v=YpRpthGAhOs',
    description: 'Torção suave da coluna vertebral',
    tips: ['Ombros no chão', 'Joelho cruza o corpo', 'Gire apenas o quadril']
  },
  {
    id: 'cobra',
    name: 'Alongamento Cobra',
    category: 'coluna',
    targetMuscles: ['Flexores do quadril', 'Abdominais', 'Coluna lombar'],
    duration: '30-45s',
    difficulty: 'intermediario',
    videoUrl: 'https://www.youtube.com/watch?v=z21y1hF9SBs',
    description: 'Extensão da coluna e abertura frontal',
    tips: ['Eleve o peito', 'Quadril no chão', 'Não force a lombar']
  },
  {
    id: 'crianca',
    name: 'Posição da Criança',
    category: 'coluna',
    targetMuscles: ['Coluna lombar', 'Latíssimo', 'Glúteos'],
    duration: '45-60s',
    difficulty: 'iniciante',
    videoUrl: 'https://www.youtube.com/watch?v=2MTKqHH6qzQ',
    description: 'Relaxamento total da coluna e quadril',
    tips: ['Joelhos separados', 'Braços estendidos', 'Respire profundamente']
  },
  {
    id: 'flexores-quadril-lunge',
    name: 'Alongamento Flexores Quadril (Lunge)',
    category: 'coluna',
    targetMuscles: ['Flexores do quadril', 'Psoas', 'Ilíaco'],
    duration: '30-45s cada lado',
    difficulty: 'intermediario',
    videoUrl: 'https://www.youtube.com/watch?v=YF36N5DGSCw',
    description: 'Alongamento dinâmico dos flexores',
    tips: ['Passo longo', 'Quadril para baixo e frente', 'Tronco ereto']
  }
];

// Função para buscar exercícios por grupo muscular
export const getScientificExercisesByMuscleGroup = (muscleGroup: string) => {
  return scientificExerciseDatabase.filter(exercise => exercise.muscleGroup === muscleGroup);
};

// Função para buscar alongamentos por categoria
export const getStretchesByCategory = (category: string) => {
  return stretchDatabase.filter(stretch => stretch.category === category);
};

// Função para buscar exercícios por nome
export const searchScientificExercises = (query: string) => {
  return scientificExerciseDatabase.filter(exercise => 
    exercise.name.toLowerCase().includes(query.toLowerCase()) ||
    exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(query.toLowerCase()))
  );
};

// Função para obter todos os grupos musculares disponíveis
export const getScientificMuscleGroups = () => {
  return [...new Set(scientificExerciseDatabase.map(exercise => exercise.muscleGroup))];
};

// Função para obter todas as categorias de alongamento
export const getStretchCategories = () => {
  return [...new Set(stretchDatabase.map(stretch => stretch.category))];
};
