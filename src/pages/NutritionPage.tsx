
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NutritionPlan } from "@/components/nutrition/NutritionPlan";

const NutritionPage = () => {
  // Mock nutrition data
  // In a real app, this would come from a backend based on user analysis and goals
  const diets = [
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
