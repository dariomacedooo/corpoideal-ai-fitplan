
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';

export interface CoachTip {
  id: string;
  type: 'nutrition' | 'training' | 'curiosity' | 'supplement';
  title: string;
  content: string;
  icon: string;
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
}

export const useAICoach = () => {
  const { profile } = useUserProfile();
  const [dailyTips, setDailyTips] = useState<CoachTip[]>([]);
  const [motivationalQuote, setMotivationalQuote] = useState<MotivationalQuote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const nutritionTips = {
    'perder-peso': [
      {
        id: 'n1',
        type: 'nutrition' as const,
        title: 'Hidratação é fundamental',
        content: 'Beba pelo menos 2-3 litros de água por dia. A água acelera o metabolismo e ajuda na queima de gordura.',
        icon: '💧'
      },
      {
        id: 'n2',
        type: 'nutrition' as const,
        title: 'Proteína em todas as refeições',
        content: 'Inclua uma fonte de proteína magra em cada refeição para manter a saciedade e preservar massa muscular.',
        icon: '🥩'
      }
    ],
    'ganhar-massa': [
      {
        id: 'n3',
        type: 'nutrition' as const,
        title: 'Superávit calórico controlado',
        content: 'Consuma 300-500 calorias acima da sua necessidade diária para ganho de massa muscular limpo.',
        icon: '📈'
      },
      {
        id: 'n4',
        type: 'nutrition' as const,
        title: 'Carboidratos pós-treino',
        content: 'Consuma carboidratos complexos após o treino para repor o glicogênio muscular.',
        icon: '🍠'
      }
    ]
  };

  const trainingTips = {
    'iniciante': [
      {
        id: 't1',
        type: 'training' as const,
        title: 'Foco na técnica',
        content: 'Priorize a execução correta dos movimentos antes de aumentar a carga. Qualidade sobre quantidade.',
        icon: '🎯'
      }
    ],
    'intermediario': [
      {
        id: 't2',
        type: 'training' as const,
        title: 'Progressão gradual',
        content: 'Aumente a carga em 2-5% quando conseguir realizar todas as séries com facilidade.',
        icon: '📊'
      }
    ],
    'avancado': [
      {
        id: 't3',
        type: 'training' as const,
        title: 'Periodização inteligente',
        content: 'Varie os estímulos a cada 4-6 semanas para evitar adaptação e promover crescimento contínuo.',
        icon: '🔄'
      }
    ]
  };

  const curiosityTips = [
    {
      id: 'c1',
      type: 'curiosity' as const,
      title: 'Músculos crescem durante o descanso',
      content: 'O crescimento muscular acontece principalmente durante o sono. Durma 7-9 horas por noite.',
      icon: '😴'
    },
    {
      id: 'c2',
      type: 'curiosity' as const,
      title: 'Metabolismo após exercício',
      content: 'Seu metabolismo permanece elevado por até 24 horas após um treino intenso (efeito EPOC).',
      icon: '🔥'
    }
  ];

  const supplementTips = {
    'perder-peso': [
      {
        id: 's1',
        type: 'supplement' as const,
        title: 'Whey Protein',
        content: 'Auxilia na manutenção da massa muscular durante o déficit calórico. Use 1-2 scoops por dia.',
        icon: '🥤'
      }
    ],
    'ganhar-massa': [
      {
        id: 's2',
        type: 'supplement' as const,
        title: 'Creatina',
        content: 'Aumenta força e volume muscular. Tome 3-5g diariamente, preferencialmente pós-treino.',
        icon: '💊'
      }
    ]
  };

  const motivationalQuotes = [
    {
      id: 'q1',
      text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
      author: 'Robert Collier'
    },
    {
      id: 'q2',
      text: 'Seu corpo pode aguentar. É sua mente que você precisa convencer.',
      author: 'Coach Virtual'
    },
    {
      id: 'q3',
      text: 'A disciplina é a ponte entre objetivos e conquistas.',
      author: 'Jim Rohn'
    },
    {
      id: 'q4',
      text: 'Cada treino é um passo mais próximo do seu melhor eu.',
      author: 'Coach Virtual'
    }
  ];

  const generatePersonalizedTips = () => {
    if (!profile) return [];

    const tips: CoachTip[] = [];
    
    // Adicionar dica nutricional baseada no objetivo
    const goalKey = profile.goal || 'perder-peso';
    const nutritionTipsList = nutritionTips[goalKey as keyof typeof nutritionTips] || nutritionTips['perder-peso'];
    tips.push(nutritionTipsList[Math.floor(Math.random() * nutritionTipsList.length)]);

    // Adicionar dica de treino baseada na experiência
    const experienceKey = profile.trainingExperience || 'iniciante';
    const trainingTipsList = trainingTips[experienceKey as keyof typeof trainingTips] || trainingTips['iniciante'];
    tips.push(trainingTipsList[Math.floor(Math.random() * trainingTipsList.length)]);

    // Adicionar curiosidade
    tips.push(curiosityTips[Math.floor(Math.random() * curiosityTips.length)]);

    // Adicionar dica de suplemento baseada no objetivo
    const supplementTipsList = supplementTips[goalKey as keyof typeof supplementTips] || supplementTips['perder-peso'];
    tips.push(supplementTipsList[Math.floor(Math.random() * supplementTipsList.length)]);

    return tips;
  };

  const generateDailyQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  };

  useEffect(() => {
    if (profile) {
      setIsLoading(true);
      
      // Simular delay de processamento da IA
      setTimeout(() => {
        setDailyTips(generatePersonalizedTips());
        setMotivationalQuote(generateDailyQuote());
        setIsLoading(false);
      }, 1000);
    }
  }, [profile]);

  return {
    dailyTips,
    motivationalQuote,
    isLoading,
    regenerateTips: () => {
      setDailyTips(generatePersonalizedTips());
      setMotivationalQuote(generateDailyQuote());
    }
  };
};
