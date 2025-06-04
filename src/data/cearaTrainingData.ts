
// Training data specifically adapted for Ceará, Brazil climate and resources
export const cearaAdaptedWorkouts = {
  climateConsiderations: {
    hotWeather: {
      recommendations: [
        'Treinos preferencialmente de manhã (5h-7h) ou tarde (17h-19h)',
        'Hidratação constante: 300-500ml a cada 15-20 minutos',
        'Roupas leves e claras para reduzir retenção de calor',
        'Pausas maiores entre séries em dias muito quentes (>35°C)'
      ],
      adaptations: {
        'academia': 'Priorizar ambientes climatizados durante picos de calor',
        'casa': 'Utilizar ventiladores e treinar em ambientes sombreados',
        'ar-livre': 'Buscar praias pela manhã ou parques com sombra'
      }
    }
  },
  
  localResources: {
    beaches: {
      exercises: [
        'Corrida na areia fofa (maior gasto calórico)',
        'Exercícios funcionais com resistência da areia',
        'Natação como cardio de baixo impacto',
        'Vôlei de praia como atividade lúdica'
      ],
      benefits: 'Areia proporciona instabilidade, aumentando ativação muscular'
    },
    
    parks: {
      fortaleza: ['Parque do Cocó', 'Parque Cidade 2000', 'Parque Bisão'],
      activities: [
        'Circuitos funcionais em equipamentos públicos',
        'Corrida em trilhas naturais',
        'Exercícios de peso corporal em barras fixas'
      ]
    }
  },
  
  nutritionAdaptations: {
    localFruits: [
      'Caju: Rico em vitamina C, auxilia recuperação',
      'Açaí: Antioxidantes e energia para treinos',
      'Manga: Carboidratos naturais pré-treino',
      'Coco: Eletrólitos naturais para hidratação'
    ],
    
    proteinSources: [
      'Peixe fresco: Abundante e rico em ômega-3',
      'Camarão: Proteína magra com baixo custo',
      'Frango caipira: Proteína de qualidade regional',
      'Castanha de caju: Proteína vegetal e gorduras boas'
    ],
    
    hydration: 'Água de coco natural como isotônico regional'
  }
};

// Budget-adapted meal plans for Ceará
export const cearaBudgetMeals = {
  economico: {
    breakfast: ['Tapioca com ovo', 'Cuscuz com queijo coalho', 'Vitamina de banana'],
    lunch: ['Arroz, feijão, peixe grelhado', 'Baião de dois com carne seca', 'Escondidinho de macaxeira'],
    dinner: ['Sopa de legumes regionais', 'Peixe assado com legumes', 'Omelete com queijo']
  },
  
  moderado: {
    supplements: [
      'Whey protein nacional (menor custo)',
      'Creatina (ótimo custo-benefício)',
      'Multivitamínico básico'
    ]
  }
};
