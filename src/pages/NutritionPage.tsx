
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NutritionPlan } from "@/components/nutrition/NutritionPlan";

const NutritionPage = () => {
  // Mock nutrition data
  // In a real app, this would come from a backend based on user analysis and goals
  const diets = [
    {
      type: 'Econômico',
      budget: '100-300',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:30',
          foods: [
            { name: 'Ovos mexidos', portion: '2 unidades' },
            { name: 'Pão francês', portion: '1 unidade' },
            { name: 'Café com leite', portion: '1 xícara' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Banana', portion: '1 unidade' },
            { name: 'Amendoim torrado', portion: '1 punhado pequeno' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:30',
          foods: [
            { name: 'Frango cozido', portion: '100g' },
            { name: 'Arroz', portion: '4 colheres' },
            { name: 'Feijão', portion: '2 colheres' },
            { name: 'Salada de alface e tomate', portion: 'à vontade' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:30',
          foods: [
            { name: 'Iogurte natural', portion: '1 copo' },
            { name: 'Maçã', portion: '1 unidade' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Ovo cozido', portion: '2 unidades' },
            { name: 'Batata doce cozida', portion: '1 pequena' },
            { name: 'Legumes cozidos', portion: '1 xícara' }
          ]
        }
      ],
      recipe: {
        name: 'Galinhada Econômica',
        ingredients: [
          '300g de frango (coxa e sobrecoxa)',
          '2 xícaras de arroz',
          '1 cebola picada',
          '2 dentes de alho',
          '1 tomate picado',
          '1 cenoura ralada',
          'Cheiro verde a gosto',
          'Sal e temperos a gosto'
        ],
        instructions: 'Refogue a cebola e o alho. Adicione o frango em pedaços e doure. Acrescente o tomate, a cenoura e os temperos. Adicione o arroz e água fervente (2 xícaras de água para cada xícara de arroz). Cozinhe em fogo baixo até o arroz ficar macio. Finalize com cheiro verde.'
      }
    },
    {
      type: 'Intermediário',
      budget: '301-500',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:30',
          foods: [
            { name: 'Ovos mexidos', portion: '2 unidades' },
            { name: 'Torrada integral', portion: '2 fatias' },
            { name: 'Queijo branco', portion: '1 fatia média' },
            { name: 'Café preto ou chá verde', portion: '1 xícara' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Iogurte natural', portion: '1 pote' },
            { name: 'Banana', portion: '1 unidade' },
            { name: 'Aveia', portion: '1 colher' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:30',
          foods: [
            { name: 'Peito de frango grelhado', portion: '120g' },
            { name: 'Arroz integral', portion: '4 colheres' },
            { name: 'Feijão', portion: '3 colheres' },
            { name: 'Salada verde', portion: 'à vontade' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:30',
          foods: [
            { name: 'Maçã', portion: '1 unidade' },
            { name: 'Whey protein', portion: '1 scoop' },
            { name: 'Água', portion: '200ml' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Omelete', portion: '3 ovos' },
            { name: 'Batata doce', portion: '1 média' },
            { name: 'Legumes no vapor', portion: '1 xícara' }
          ]
        }
      ],
      recipe: {
        name: 'Bowl de Proteína',
        ingredients: [
          '120g de frango desfiado',
          '1/2 xícara de quinoa cozida',
          '1/4 de abacate',
          '1/4 xícara de tomate cereja',
          '1/4 xícara de pepino',
          '1 colher de sopa de azeite',
          'Suco de limão a gosto',
          'Sal, pimenta e ervas a gosto'
        ],
        instructions: 'Cozinhe a quinoa conforme as instruções da embalagem. Grelhe o frango temperado com sal e pimenta. Monte o bowl com a quinoa na base, adicione o frango, o abacate e os vegetais. Regue com azeite, limão e finalize com as ervas.'
      }
    },
    {
      type: 'Premium',
      budget: '501-800',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:30',
          foods: [
            { name: 'Omelete de claras', portion: '4 claras' },
            { name: 'Pão de cereais', portion: '2 fatias' },
            { name: 'Abacate', portion: '1/2 unidade' },
            { name: 'Café sem açúcar', portion: '1 xícara' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Iogurte grego', portion: '1 pote' },
            { name: 'Mix de frutas vermelhas', portion: '1 xícara' },
            { name: 'Granola sem açúcar', portion: '2 colheres' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:30',
          foods: [
            { name: 'Salmão grelhado', portion: '130g' },
            { name: 'Quinoa', portion: '4 colheres' },
            { name: 'Brócolis no vapor', portion: '1 xícara' },
            { name: 'Mix de folhas', portion: 'à vontade' },
            { name: 'Azeite extra virgem', portion: '1 colher' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:30',
          foods: [
            { name: 'Whey protein isolado', portion: '1 scoop' },
            { name: 'Castanhas do Pará', portion: '3 unidades' },
            { name: 'Água de coco', portion: '200ml' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Peito de peru', portion: '120g' },
            { name: 'Batata doce assada', portion: '1 média' },
            { name: 'Legumes assados', portion: '1 xícara' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        }
      ],
      recipe: {
        name: 'Tigela Proteica de Açaí',
        ingredients: [
          '100g de polpa de açaí pura',
          '1/2 banana congelada',
          '1 scoop de whey protein de baunilha',
          '1 colher de pasta de amendoim',
          '2 colheres de sopa de aveia em flocos',
          'Toppings: banana em rodelas, morangos, granola sem açúcar, coco ralado'
        ],
        instructions: 'No liquidificador, bata o açaí, a banana congelada, o whey protein e a pasta de amendoim até ficar homogêneo e cremoso. Transfira para uma tigela, adicione a aveia e os toppings de sua preferência. Sirva imediatamente.'
      }
    },
    {
      type: 'Luxo',
      budget: '801+',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:00',
          foods: [
            { name: 'Ovos pochê', portion: '2 unidades' },
            { name: 'Pão australiano', portion: '2 fatias' },
            { name: 'Abacate e tomate', portion: '1/2 abacate + 1 tomate' },
            { name: 'Café especial', portion: '1 xícara' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Shake proteico premium', portion: '1 porção' },
            { name: 'Mix de castanhas e frutas secas', portion: '30g' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:00',
          foods: [
            { name: 'Filé mignon grelhado', portion: '150g' },
            { name: 'Risoto de quinoa', portion: '1 porção' },
            { name: 'Aspargos grelhados', portion: '6 unidades' },
            { name: 'Mix de folhas orgânicas', portion: 'à vontade' },
            { name: 'Azeite premium', portion: '1 colher' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:00',
          foods: [
            { name: 'Iogurte grego orgânico', portion: '1 pote' },
            { name: 'Granola artesanal', portion: '30g' },
            { name: 'Frutas vermelhas orgânicas', portion: '1 xícara' },
            { name: 'Mel puro', portion: '1 colher' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Peixe branco selvagem', portion: '150g' },
            { name: 'Purê de batata doce roxa', portion: '1 porção' },
            { name: 'Vegetais orgânicos grelhados', portion: '1 xícara' },
            { name: 'Molho de ervas frescas', portion: 'a gosto' }
          ]
        },
        {
          name: 'Ceia',
          time: '21:30 - 22:00',
          foods: [
            { name: 'Caseína micelar premium', portion: '1 scoop' },
            { name: 'Tahine', portion: '1 colher' }
          ]
        }
      ],
      recipe: {
        name: 'Tigela de Açaí Premium com Proteína',
        ingredients: [
          '200g de polpa de açaí orgânico',
          '1/2 banana congelada orgânica',
          '1 scoop de whey protein isolado',
          '1 colher de pasta de amendoim orgânica',
          'Toppings: banana, morango, blueberry, granola artesanal, nibs de cacau, sementes de chia',
          'Mel de Manuka para finalizar'
        ],
        instructions: 'Bata no liquidificador o açaí, a banana, o whey protein e a pasta de amendoim até obter uma textura cremosa. Transfira para uma tigela e adicione os toppings em camadas harmoniosas. Finalize com um fio de mel de Manuka.'
      }
    },
    {
      type: 'Flexível',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:30',
          foods: [
            { name: 'Ovos mexidos', portion: '2 unidades' },
            { name: 'Torrada integral', portion: '2 fatias' },
            { name: 'Abacate', portion: '1/2 unidade' },
            { name: 'Café preto ou chá verde', portion: '1 xícara' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Iogurte natural', portion: '1 pote' },
            { name: 'Banana', portion: '1 unidade' },
            { name: 'Castanhas', portion: '1 punhado' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:30',
          foods: [
            { name: 'Peito de frango grelhado', portion: '120g' },
            { name: 'Arroz integral', portion: '4 colheres' },
            { name: 'Feijão', portion: '3 colheres' },
            { name: 'Salada verde', portion: 'à vontade' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:30',
          foods: [
            { name: 'Maçã', portion: '1 unidade' },
            { name: 'Whey protein', portion: '1 scoop' },
            { name: 'Água de coco', portion: '200ml' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Peixe assado', portion: '120g' },
            { name: 'Batata doce', portion: '1 média' },
            { name: 'Legumes no vapor', portion: '1 xícara' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        }
      ],
      recipe: {
        name: 'Bowl de Proteína',
        ingredients: [
          '120g de frango desfiado',
          '1/2 xícara de quinoa cozida',
          '1/4 de abacate',
          '1/4 xícara de tomate cereja',
          '1/4 xícara de pepino',
          '1 colher de sopa de azeite',
          'Suco de limão a gosto',
          'Sal, pimenta e ervas a gosto'
        ],
        instructions: 'Cozinhe a quinoa conforme as instruções da embalagem. Grelhe o frango temperado com sal e pimenta. Monte o bowl com a quinoa na base, adicione o frango, o abacate e os vegetais. Regue com azeite, limão e finalize com as ervas.'
      }
    },
    {
      type: 'Low Carb',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:30',
          foods: [
            { name: 'Omelete de 3 ovos', portion: 'com espinafre e queijo' },
            { name: 'Abacate', portion: '1/2 unidade' },
            { name: 'Chá ou café sem açúcar', portion: '1 xícara' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Queijo branco', portion: '2 fatias' },
            { name: 'Castanhas', portion: '1 punhado' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:30',
          foods: [
            { name: 'Filé de carne', portion: '150g' },
            { name: 'Brócolis refogado', portion: '1 xícara' },
            { name: 'Salada verde', portion: 'à vontade' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:30',
          foods: [
            { name: 'Shake proteico', portion: '1 scoop' },
            { name: 'Coco ralado', portion: '1 colher' },
            { name: 'Leite de amêndoas', portion: '200ml' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Salmão grelhado', portion: '150g' },
            { name: 'Abobrinha refogada', portion: '1 xícara' },
            { name: 'Salada de folhas', portion: 'à vontade' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        }
      ],
      recipe: {
        name: 'Berinjela Recheada Low Carb',
        ingredients: [
          '1 berinjela média',
          '150g de carne moída',
          '1/2 cebola picada',
          '1 dente de alho picado',
          '1/2 pimentão picado',
          '50g de queijo mussarela ralado',
          'Sal, pimenta e orégano a gosto',
          '1 colher de azeite'
        ],
        instructions: 'Corte a berinjela ao meio no sentido do comprimento e retire um pouco da polpa. Refogue a cebola e o alho no azeite, adicione a carne moída, o pimentão e temperos. Recheie as metades da berinjela com a mistura, cubra com queijo e leve ao forno a 180°C por 20 minutos até dourar.'
      }
    },
    {
      type: 'Vegetariano',
      meals: [
        {
          name: 'Café da manhã',
          time: '7:00 - 8:30',
          foods: [
            { name: 'Smoothie proteico', portion: '1 copo' },
            { name: 'Aveia', portion: '3 colheres' },
            { name: 'Sementes de chia', portion: '1 colher' },
            { name: 'Frutas vermelhas', portion: '1 punhado' }
          ]
        },
        {
          name: 'Lanche da manhã',
          time: '10:00 - 10:30',
          foods: [
            { name: 'Homus', portion: '2 colheres' },
            { name: 'Palitos de vegetais', portion: '1 xícara' }
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:30',
          foods: [
            { name: 'Tofu grelhado', portion: '120g' },
            { name: 'Arroz integral', portion: '4 colheres' },
            { name: 'Lentilha', portion: '3 colheres' },
            { name: 'Salada verde', portion: 'à vontade' },
            { name: 'Azeite de oliva', portion: '1 colher' }
          ]
        },
        {
          name: 'Lanche da tarde',
          time: '15:30 - 16:30',
          foods: [
            { name: 'Iogurte de coco', portion: '1 pote' },
            { name: 'Granola sem açúcar', portion: '2 colheres' },
            { name: 'Banana', portion: '1 unidade' }
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          foods: [
            { name: 'Hambúrguer de grão-de-bico', portion: '1 unidade' },
            { name: 'Batata doce assada', portion: '100g' },
            { name: 'Legumes grelhados', portion: '1 xícara' },
            { name: 'Guacamole', portion: '2 colheres' }
          ]
        }
      ],
      recipe: {
        name: 'Curry de Grão-de-Bico',
        ingredients: [
          '1 lata de grão-de-bico',
          '1 lata de leite de coco',
          '1 cebola picada',
          '2 dentes de alho picados',
          '1 colher de chá de curry em pó',
          '1 colher de chá de açafrão',
          '1 tomate picado',
          'Espinafre fresco',
          'Sal e pimenta a gosto',
          'Coentro fresco para finalizar'
        ],
        instructions: 'Refogue a cebola e o alho, adicione as especiarias e mexa por 1 minuto. Adicione o tomate e cozinhe por 2 minutos. Adicione o grão-de-bico e o leite de coco, deixe ferver e reduza o fogo. Cozinhe por 15 minutos, adicione o espinafre nos últimos 2 minutos. Sirva com arroz ou quinoa.'
      }
    }
  ];

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Seu Plano Nutricional</h1>
        <p className="text-gray-600 mb-6">
          Alimentação balanceada para alcançar seus objetivos de forma saudável.
        </p>
        
        <NutritionPlan diets={diets} />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default NutritionPage;
