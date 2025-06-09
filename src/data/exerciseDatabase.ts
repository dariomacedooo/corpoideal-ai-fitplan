
export interface ExerciseDetail {
  id: string;
  name: string;
  muscleGroup: string;
  targetMuscles: string[];
  equipment: string[];
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  videoUrl: string;
  instructions: string[];
  tips: string[];
  variations?: string[];
  contraindications?: string[];
  defaultSets: number;
  defaultReps: string;
  restTime: string;
}

export const exerciseDatabase: Record<string, ExerciseDetail[]> = {
  peito: [
    {
      id: 'supino-reto',
      name: 'Supino Reto',
      muscleGroup: 'peito',
      targetMuscles: ['Peitoral Maior', 'Tríceps', 'Deltóide Anterior'],
      equipment: ['Barra', 'Banco'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
      instructions: [
        'Deite no banco com os pés firmemente apoiados no chão',
        'Posicione as mãos na barra com pegada pronada, ligeiramente mais larga que os ombros',
        'Retire a barra do suporte mantendo os braços estendidos',
        'Desça a barra controladamente até tocar o peito',
        'Empurre a barra de volta à posição inicial'
      ],
      tips: [
        'Mantenha os ombros retraídos durante todo movimento',
        'Não arqueie excessivamente as costas',
        'Controle a descida da barra (2-3 segundos)'
      ],
      defaultSets: 3,
      defaultReps: '8-12',
      restTime: '90-120s'
    },
    {
      id: 'supino-inclinado',
      name: 'Supino Inclinado',
      muscleGroup: 'peito',
      targetMuscles: ['Peitoral Superior', 'Deltóide Anterior', 'Tríceps'],
      equipment: ['Barra', 'Banco Inclinado'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=IP4oeKMOb_s',
      instructions: [
        'Ajuste o banco em ângulo de 30-45 graus',
        'Posicione-se com as costas firmemente apoiadas',
        'Pegue a barra com pegada ligeiramente mais larga que os ombros',
        'Desça a barra até a parte superior do peito',
        'Empurre explosivamente de volta'
      ],
      tips: [
        'Foque na contração do peitoral superior',
        'Não use ângulos muito altos (máximo 45°)',
        'Mantenha os cotovelos em ângulo de 45° com o corpo'
      ],
      defaultSets: 3,
      defaultReps: '8-12',
      restTime: '90-120s'
    },
    {
      id: 'supino-halteres',
      name: 'Supino com Halteres',
      muscleGroup: 'peito',
      targetMuscles: ['Peitoral Maior', 'Tríceps', 'Deltóide'],
      equipment: ['Halteres', 'Banco'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94',
      instructions: [
        'Deite no banco segurando um halter em cada mão',
        'Posicione os halteres sobre o peito com braços estendidos',
        'Desça os halteres controladamente até sentir alongamento no peito',
        'Empurre os halteres de volta unindo-os sobre o peito'
      ],
      tips: [
        'Permite maior amplitude de movimento que a barra',
        'Mantenha os punhos firmes e alinhados',
        'Descida controlada é fundamental'
      ],
      defaultSets: 3,
      defaultReps: '10-15',
      restTime: '60-90s'
    },
    {
      id: 'crucifixo',
      name: 'Crucifixo',
      muscleGroup: 'peito',
      targetMuscles: ['Peitoral Maior', 'Deltóide Anterior'],
      equipment: ['Halteres', 'Banco'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
      instructions: [
        'Deite no banco com halteres nas mãos',
        'Mantenha cotovelos ligeiramente flexionados',
        'Abra os braços em movimento de arco',
        'Desça até sentir alongamento no peito',
        'Volte unindo os halteres sobre o peito'
      ],
      tips: [
        'Exercício de isolamento para o peitoral',
        'Não use cargas muito pesadas',
        'Amplitude completa é essencial'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '60-90s'
    },
    {
      id: 'flexao',
      name: 'Flexão de Braço',
      muscleGroup: 'peito',
      targetMuscles: ['Peitoral', 'Tríceps', 'Core'],
      equipment: ['Peso Corporal'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
      instructions: [
        'Posicione-se em prancha com mãos alinhadas aos ombros',
        'Mantenha o corpo reto da cabeça aos pés',
        'Desça o corpo até o peito quase tocar o chão',
        'Empurre de volta à posição inicial'
      ],
      tips: [
        'Exercício funcional completo',
        'Pode ser feito em casa',
        'Variações: joelhos, inclinada, declinada'
      ],
      variations: ['Flexão com joelhos', 'Flexão inclinada', 'Flexão declinada'],
      defaultSets: 3,
      defaultReps: '10-20',
      restTime: '60s'
    }
  ],

  costas: [
    {
      id: 'barra-fixa',
      name: 'Barra Fixa',
      muscleGroup: 'costas',
      targetMuscles: ['Latíssimo', 'Rombóides', 'Bíceps'],
      equipment: ['Barra Fixa'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
      instructions: [
        'Segure a barra com pegada pronada, mãos mais largas que os ombros',
        'Pendure com braços totalmente estendidos',
        'Puxe o corpo para cima até o queixo passar da barra',
        'Desça controladamente até a posição inicial'
      ],
      tips: [
        'Exercício fundamental para costas',
        'Use pegada pronada para enfatizar latíssimo',
        'Se não conseguir, use assistência ou elástico'
      ],
      defaultSets: 3,
      defaultReps: '6-12',
      restTime: '90-120s'
    },
    {
      id: 'remada-curvada',
      name: 'Remada Curvada',
      muscleGroup: 'costas',
      targetMuscles: ['Latíssimo', 'Rombóides', 'Trapézio Médio'],
      equipment: ['Barra', 'Halteres'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
      instructions: [
        'Fique em pé segurando a barra com pegada pronada',
        'Incline o tronco para frente mantendo as costas retas',
        'Puxe a barra em direção ao abdômen',
        'Contraia as escápulas no topo do movimento',
        'Desça controladamente'
      ],
      tips: [
        'Mantenha as costas sempre retas',
        'Puxe com os cotovelos próximos ao corpo',
        'Foque na contração das escápulas'
      ],
      defaultSets: 3,
      defaultReps: '8-12',
      restTime: '90s'
    },
    {
      id: 'puxador-frente',
      name: 'Puxador Frente',
      muscleGroup: 'costas',
      targetMuscles: ['Latíssimo', 'Rombóides', 'Bíceps'],
      equipment: ['Polia', 'Cabo'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
      instructions: [
        'Sente-se na máquina com coxas fixadas',
        'Segure a barra com pegada pronada, mais larga que os ombros',
        'Puxe a barra até a parte superior do peito',
        'Contraia as escápulas e mantenha o peito para fora',
        'Volte controladamente à posição inicial'
      ],
      tips: [
        'Não puxe atrás da cabeça',
        'Mantenha o tronco ligeiramente inclinado para trás',
        'Foque na contração das costas, não dos braços'
      ],
      defaultSets: 3,
      defaultReps: '10-15',
      restTime: '60-90s'
    },
    {
      id: 'remada-baixa',
      name: 'Remada Baixa',
      muscleGroup: 'costas',
      targetMuscles: ['Latíssimo', 'Rombóides', 'Trapézio'],
      equipment: ['Polia', 'Cabo'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=xQNrFHEMhI4',
      instructions: [
        'Sente-se na máquina com pés apoiados',
        'Segure o cabo com ambas as mãos',
        'Puxe o cabo em direção ao abdômen',
        'Mantenha as costas retas e peito para fora',
        'Volte controladamente'
      ],
      tips: [
        'Não balance o tronco',
        'Puxe com os cotovelos próximos ao corpo',
        'Pause por 1 segundo na contração máxima'
      ],
      defaultSets: 3,
      defaultReps: '10-15',
      restTime: '60-90s'
    },
    {
      id: 'levantamento-terra',
      name: 'Levantamento Terra',
      muscleGroup: 'costas',
      targetMuscles: ['Eretores da Espinha', 'Glúteos', 'Posteriores'],
      equipment: ['Barra', 'Anilhas'],
      difficulty: 'avancado',
      videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE',
      instructions: [
        'Posicione-se atrás da barra com pés na largura dos ombros',
        'Agache e segure a barra com pegada pronada',
        'Mantenha as costas retas e peito para fora',
        'Levante a barra estendendo quadril e joelhos simultaneamente',
        'Finalize em pé com ombros para trás'
      ],
      tips: [
        'Movimento fundamental e complexo',
        'Aprenda a técnica antes de aumentar carga',
        'Mantenha a barra próxima ao corpo'
      ],
      contraindications: ['Problemas na lombar', 'Hérnia de disco'],
      defaultSets: 3,
      defaultReps: '5-8',
      restTime: '2-3min'
    }
  ],

  ombros: [
    {
      id: 'desenvolvimento-militar',
      name: 'Desenvolvimento Militar',
      muscleGroup: 'ombros',
      targetMuscles: ['Deltóide Anterior', 'Deltóide Médio', 'Tríceps'],
      equipment: ['Barra', 'Halteres'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
      instructions: [
        'Fique em pé segurando a barra na altura dos ombros',
        'Mantenha os pés na largura dos ombros',
        'Empurre a barra verticalmente acima da cabeça',
        'Desça controladamente até a altura do queixo',
        'Repita o movimento'
      ],
      tips: [
        'Não arqueie excessivamente as costas',
        'Mantenha o core contraído',
        'Não desça a barra além do queixo'
      ],
      defaultSets: 3,
      defaultReps: '8-12',
      restTime: '90s'
    },
    {
      id: 'elevacao-lateral',
      name: 'Elevação Lateral',
      muscleGroup: 'ombros',
      targetMuscles: ['Deltóide Médio'],
      equipment: ['Halteres'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
      instructions: [
        'Fique em pé segurando halteres nas laterais do corpo',
        'Mantenha cotovelos ligeiramente flexionados',
        'Eleve os braços lateralmente até a altura dos ombros',
        'Pause brevemente no topo',
        'Desça controladamente'
      ],
      tips: [
        'Exercício de isolamento para deltóide médio',
        'Não balance o corpo',
        'Controle a descida (excêntrica)'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '60s'
    },
    {
      id: 'elevacao-frontal',
      name: 'Elevação Frontal',
      muscleGroup: 'ombros',
      targetMuscles: ['Deltóide Anterior'],
      equipment: ['Halteres'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=qzaXBB_1w68',
      instructions: [
        'Segure halteres à frente do corpo',
        'Mantenha braços ligeiramente flexionados',
        'Eleve um ou ambos os braços à frente até a altura dos ombros',
        'Pause no topo',
        'Desça controladamente'
      ],
      tips: [
        'Pode ser feito alternado ou simultâneo',
        'Não use impulso',
        'Foque na contração do deltóide anterior'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '60s'
    },
    {
      id: 'encolhimento',
      name: 'Encolhimento de Ombros',
      muscleGroup: 'ombros',
      targetMuscles: ['Trapézio Superior'],
      equipment: ['Halteres', 'Barra'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=g6qbq4Lf1FI',
      instructions: [
        'Segure halteres ou barra nas laterais/à frente do corpo',
        'Mantenha braços estendidos',
        'Eleve os ombros em direção às orelhas',
        'Contraia o trapézio no topo',
        'Desça lentamente'
      ],
      tips: [
        'Movimento puramente vertical',
        'Não gire os ombros',
        'Pause na contração máxima'
      ],
      defaultSets: 3,
      defaultReps: '12-20',
      restTime: '60s'
    },
    {
      id: 'arnold-press',
      name: 'Arnold Press',
      muscleGroup: 'ombros',
      targetMuscles: ['Deltóides', 'Tríceps'],
      equipment: ['Halteres'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=6Z15_WdXmVw',
      instructions: [
        'Sente-se segurando halteres à frente do peito, palmas para dentro',
        'Inicie o movimento girando os punhos para fora',
        'Continue empurrando os halteres acima da cabeça',
        'Inverta o movimento na descida',
        'Termine com palmas voltadas para dentro'
      ],
      tips: [
        'Movimento criado por Arnold Schwarzenegger',
        'Combina rotação com desenvolvimento',
        'Trabalha múltiplos ângulos do deltóide'
      ],
      defaultSets: 3,
      defaultReps: '10-12',
      restTime: '90s'
    }
  ],

  pernas: [
    {
      id: 'agachamento-livre',
      name: 'Agachamento Livre',
      muscleGroup: 'pernas',
      targetMuscles: ['Quadríceps', 'Glúteos', 'Posteriores'],
      equipment: ['Barra', 'Rack'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
      instructions: [
        'Posicione a barra no trapézio, não no pescoço',
        'Pés na largura dos ombros, ligeiramente voltados para fora',
        'Desça flexionando quadril e joelhos simultaneamente',
        'Desça até coxas paralelas ao chão',
        'Suba empurrando pelos calcanhares'
      ],
      tips: [
        'Rei dos exercícios para pernas',
        'Mantenha joelhos alinhados com pés',
        'Peito para fora, olhar para frente'
      ],
      defaultSets: 3,
      defaultReps: '8-12',
      restTime: '2-3min'
    },
    {
      id: 'leg-press',
      name: 'Leg Press',
      muscleGroup: 'pernas',
      targetMuscles: ['Quadríceps', 'Glúteos'],
      equipment: ['Leg Press'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
      instructions: [
        'Sente-se na máquina com costas apoiadas',
        'Posicione pés na plataforma na largura dos ombros',
        'Desça controladamente até 90 graus nos joelhos',
        'Empurre a plataforma de volta sem travar joelhos',
        'Mantenha tensão constante'
      ],
      tips: [
        'Máquina mais segura que agachamento livre',
        'Permite cargas maiores',
        'Varie posição dos pés para diferentes ênfases'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '90s'
    },
    {
      id: 'cadeira-extensora',
      name: 'Cadeira Extensora',
      muscleGroup: 'pernas',
      targetMuscles: ['Quadríceps'],
      equipment: ['Cadeira Extensora'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
      instructions: [
        'Sente-se na máquina com costas apoiadas',
        'Posicione tornozelos atrás das almofadas',
        'Estenda as pernas até quase completamente retas',
        'Pause por 1 segundo no topo',
        'Desça controladamente'
      ],
      tips: [
        'Exercício de isolamento para quadríceps',
        'Não trave completamente os joelhos',
        'Controle total do movimento'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '60s'
    },
    {
      id: 'cadeira-abdutora',
      name: 'Cadeira Abdutora',
      muscleGroup: 'pernas',
      targetMuscles: ['Glúteo Médio', 'Glúteo Mínimo'],
      equipment: ['Cadeira Abdutora'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=eP-lhJuAUho',
      instructions: [
        'Sente-se na máquina com costas apoiadas',
        'Posicione as pernas contra as almofadas',
        'Abra as pernas contra a resistência',
        'Pause na posição máxima de abertura',
        'Feche controladamente'
      ],
      tips: [
        'Importante para estabilidade do quadril',
        'Popular entre o público feminino',
        'Movimento lento e controlado'
      ],
      defaultSets: 3,
      defaultReps: '15-20',
      restTime: '60s'
    },
    {
      id: 'avanco',
      name: 'Avanço',
      muscleGroup: 'pernas',
      targetMuscles: ['Glúteos', 'Quadríceps', 'Posteriores'],
      equipment: ['Halteres', 'Peso Corporal'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
      instructions: [
        'Fique em pé segurando halteres ou com peso corporal',
        'Dê um passo à frente com uma perna',
        'Desça até ambos joelhos formarem 90 graus',
        'Empurre com perna da frente para voltar',
        'Alterne as pernas ou faça todas de um lado'
      ],
      tips: [
        'Exercício unilateral excellent for glutes',
        'Joelho da frente não deve passar da ponta do pé',
        'Mantenha tronco ereto'
      ],
      defaultSets: 3,
      defaultReps: '10-12 cada perna',
      restTime: '90s'
    },
    {
      id: 'stiff',
      name: 'Stiff',
      muscleGroup: 'pernas',
      targetMuscles: ['Posteriores', 'Glúteos'],
      equipment: ['Barra', 'Halteres'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=1uDiW5-_Jps',
      instructions: [
        'Fique em pé segurando barra ou halteres',
        'Mantenha joelhos ligeiramente flexionados',
        'Flexione o quadril empurrando bumbum para trás',
        'Desça até sentir alongamento nos posteriores',
        'Volte contraindo glúteos e posteriores'
      ],
      tips: [
        'Foco nos músculos posteriores da coxa',
        'Movimento vem do quadril, não da lombar',
        'Sinta o alongamento na descida'
      ],
      defaultSets: 3,
      defaultReps: '10-12',
      restTime: '90s'
    }
  ],

  bracos: [
    {
      id: 'rosca-direta',
      name: 'Rosca Direta',
      muscleGroup: 'bracos',
      targetMuscles: ['Bíceps'],
      equipment: ['Barra', 'Halteres'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
      instructions: [
        'Segure a barra com pegada supinada na largura dos ombros',
        'Mantenha cotovelos fixos ao lado do corpo',
        'Flexione os antebraços levando a barra ao peito',
        'Contraia o bíceps no topo',
        'Desça controladamente'
      ],
      tips: [
        'Exercício clássico para bíceps',
        'Não balance o corpo',
        'Controle a fase excêntrica'
      ],
      defaultSets: 3,
      defaultReps: '10-12',
      restTime: '60s'
    },
    {
      id: 'rosca-martelo',
      name: 'Rosca Martelo',
      muscleGroup: 'bracos',
      targetMuscles: ['Bíceps', 'Braquial'],
      equipment: ['Halteres'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
      instructions: [
        'Segure halteres com pegada neutra (palmas se olhando)',
        'Mantenha cotovelos fixos ao lado do corpo',
        'Flexione alternadamente ou simultaneamente',
        'Mantenha punhos neutros durante todo movimento',
        'Desça controladamente'
      ],
      tips: [
        'Trabalha bíceps e braquial',
        'Pegada neutra reduz stress no punho',
        'Pode ser feito alternado'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '60s'
    },
    {
      id: 'triceps-testa',
      name: 'Tríceps Testa',
      muscleGroup: 'bracos',
      targetMuscles: ['Tríceps'],
      equipment: ['Barra', 'Halteres'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM',
      instructions: [
        'Deite no banco segurando barra ou halteres',
        'Mantenha braços perpendiculares ao chão',
        'Flexione apenas os antebraços em direção à testa',
        'Mantenha cotovelos fixos',
        'Estenda os braços de volta'
      ],
      tips: [
        'Exercício de isolamento para tríceps',
        'Mantenha cotovelos fixos e apontados para cima',
        'Amplitude completa do movimento'
      ],
      defaultSets: 3,
      defaultReps: '10-12',
      restTime: '60s'
    },
    {
      id: 'triceps-pulley',
      name: 'Tríceps Pulley',
      muscleGroup: 'bracos',
      targetMuscles: ['Tríceps'],
      equipment: ['Polia', 'Cabo'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=vB5OHsJ3EME',
      instructions: [
        'Fique de frente para a polia alta',
        'Segure a barra ou corda com pegada pronada',
        'Mantenha cotovelos fixos ao lado do corpo',
        'Estenda os antebraços para baixo',
        'Volte controladamente sem mover cotovelos'
      ],
      tips: [
        'Exercício popular e eficaz para tríceps',
        'Mantenha tronco ligeiramente inclinado',
        'Extensão completa com pause no final'
      ],
      defaultSets: 3,
      defaultReps: '12-15',
      restTime: '60s'
    },
    {
      id: 'mergulho',
      name: 'Mergulho (Paralelas)',
      muscleGroup: 'bracos',
      targetMuscles: ['Tríceps', 'Peitoral', 'Deltóide'],
      equipment: ['Paralelas', 'Banco'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM',
      instructions: [
        'Apoie-se nas paralelas ou banco com braços estendidos',
        'Mantenha corpo ligeiramente inclinado para frente',
        'Desça flexionando os cotovelos',
        'Desça até sentir alongamento no peito',
        'Empurre de volta à posição inicial'
      ],
      tips: [
        'Exercício compound excelente',
        'Inclinação do corpo determina ênfase',
        'Pode usar peso adicional quando avançar'
      ],
      defaultSets: 3,
      defaultReps: '8-15',
      restTime: '90s'
    }
  ],

  abdomen: [
    {
      id: 'prancha',
      name: 'Prancha',
      muscleGroup: 'abdomen',
      targetMuscles: ['Core', 'Abdômen', 'Estabilizadores'],
      equipment: ['Peso Corporal'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
      instructions: [
        'Posicione-se em prancha com antebraços apoiados',
        'Mantenha corpo reto da cabeça aos pés',
        'Contraía abdômen e glúteos',
        'Mantenha respiração normal',
        'Segure a posição pelo tempo determinado'
      ],
      tips: [
        'Exercício isométrico fundamental',
        'Foque na qualidade, não apenas no tempo',
        'Progrida gradualmente no tempo'
      ],
      defaultSets: 3,
      defaultReps: '30-60s',
      restTime: '60s'
    },
    {
      id: 'abdominal-tradicional',
      name: 'Abdominal Tradicional',
      muscleGroup: 'abdomen',
      targetMuscles: ['Reto Abdominal'],
      equipment: ['Peso Corporal'],
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
      instructions: [
        'Deite com joelhos flexionados e pés apoiados',
        'Coloque mãos atrás da cabeça ou cruzadas no peito',
        'Contraia abdômen e eleve tronco',
        'Suba apenas até escápulas saírem do chão',
        'Desça controladamente'
      ],
      tips: [
        'Não puxe o pescoço com as mãos',
        'Movimento curto e controlado',
        'Expire na subida, inspire na descida'
      ],
      defaultSets: 3,
      defaultReps: '15-25',
      restTime: '45s'
    },
    {
      id: 'abdominal-bicicleta',
      name: 'Abdominal Bicicleta',
      muscleGroup: 'abdomen',
      targetMuscles: ['Oblíquos', 'Reto Abdominal'],
      equipment: ['Peso Corporal'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
      instructions: [
        'Deite com mãos atrás da cabeça',
        'Eleve pernas com joelhos a 90 graus',
        'Aproxime cotovelo direito do joelho esquerdo',
        'Alterne os lados como pedalando',
        'Mantenha ritmo controlado'
      ],
      tips: [
        'Excelente para oblíquos',
        'Movimento controlado, não rápido',
        'Mantenha lombar apoiada'
      ],
      defaultSets: 3,
      defaultReps: '20 cada lado',
      restTime: '60s'
    },
    {
      id: 'elevacao-pernas',
      name: 'Elevação de Pernas',
      muscleGroup: 'abdomen',
      targetMuscles: ['Abdômen Inferior'],
      equipment: ['Peso Corporal'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=JB2oyawG9KI',
      instructions: [
        'Deite com braços ao lado do corpo para apoio',
        'Mantenha pernas estendidas ou ligeiramente flexionadas',
        'Eleve pernas até 90 graus',
        'Desça controladamente sem tocar o chão',
        'Mantenha lombar apoiada'
      ],
      tips: [
        'Trabalha mais o abdômen inferior',
        'Não deixe pernas tocarem o chão entre repetições',
        'Se for difícil, flexione mais os joelhos'
      ],
      defaultSets: 3,
      defaultReps: '12-20',
      restTime: '60s'
    },
    {
      id: 'russian-twist',
      name: 'Russian Twist',
      muscleGroup: 'abdomen',
      targetMuscles: ['Oblíquos', 'Core'],
      equipment: ['Peso Corporal', 'Medicine Ball'],
      difficulty: 'intermediario',
      videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
      instructions: [
        'Sente com joelhos flexionados e pés elevados',
        'Incline tronco para trás até sentir tensão no abdômen',
        'Gire tronco de um lado para outro',
        'Mantenha pés elevados durante todo movimento',
        'Pode usar peso para aumentar dificuldade'
      ],
      tips: [
        'Excelente para rotação e oblíquos',
        'Mantenha core contraído',
        'Movimento controlado de rotação'
      ],
      defaultSets: 3,
      defaultReps: '20 cada lado',
      restTime: '60s'
    }
  ]
};

export const getMuscleGroups = (): string[] => {
  return Object.keys(exerciseDatabase);
};

export const getExercisesByMuscleGroup = (muscleGroup: string): ExerciseDetail[] => {
  return exerciseDatabase[muscleGroup] || [];
};

export const getExerciseById = (id: string): ExerciseDetail | undefined => {
  for (const muscleGroup of Object.values(exerciseDatabase)) {
    const exercise = muscleGroup.find(ex => ex.id === id);
    if (exercise) return exercise;
  }
  return undefined;
};

export const searchExercises = (query: string): ExerciseDetail[] => {
  const results: ExerciseDetail[] = [];
  const lowerQuery = query.toLowerCase();
  
  for (const muscleGroup of Object.values(exerciseDatabase)) {
    for (const exercise of muscleGroup) {
      if (
        exercise.name.toLowerCase().includes(lowerQuery) ||
        exercise.muscleGroup.toLowerCase().includes(lowerQuery) ||
        exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(lowerQuery))
      ) {
        results.push(exercise);
      }
    }
  }
  
  return results;
};
