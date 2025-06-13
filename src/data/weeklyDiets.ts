// Weekly diet plans with all 7 days

export interface WeeklyDiet {
  type: string;
  budget?: string;
  goal?: string;
  days: {
    [key: string]: {
      meals: Array<{
        name: string;
        time: string;
        foods: Array<{
          name: string;
          portion: string;
        }>;
      }>;
    };
  };
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string;
  };
}

export const weeklyDiets: WeeklyDiet[] = [
  {
 type: 'Bulking',
 budget: '80-150',
    goal: 'ganhar-massa',
    days: {
      segunda: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Ovos mexidos', portion: '3 unidades' },
              { name: 'Pão integral', portion: '2 fatias' },
              { name: 'Abacate', portion: '1/2 unidade' },
              { name: 'Café com leite', portion: '1 copo' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Whey protein', portion: '1 scoop' },
              { name: 'Banana', portion: '1 unidade' },
              { name: 'Aveia', portion: '2 colheres' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Peito de frango', portion: '150g' },
              { name: 'Arroz integral', portion: '6 colheres' },
              { name: 'Feijão', portion: '4 colheres' },
              { name: 'Salada verde', portion: '1 xícara' },
              { name: 'Azeite de oliva', portion: '1 colher' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Iogurte grego', portion: '1 pote' },
              { name: 'Granola', portion: '2 colheres' },
              { name: 'Castanhas', portion: '1 punhado' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Salmão grelhado', portion: '150g' },
              { name: 'Batata doce', portion: '1 média' },
              { name: 'Brócolis', portion: '1 xícara' },
              { name: 'Azeite de oliva', portion: '1 colher' }
            ]
          },
          {
            name: 'Ceia',
            time: '22:00 - 22:30',
            foods: [
              { name: 'Queijo cottage', portion: '100g' },
              { name: 'Castanhas', portion: '1 punhado' }
            ]
          }
        ]
      },
      terca: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Omelete', portion: '3 ovos' },
              { name: 'Pão francês', portion: '2 unidades' },
              { name: 'Queijo branco', portion: '2 fatias' },
              { name: 'Café preto', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Vitamina', portion: '1 copo' },
              { name: 'Banana', portion: '1 unidade' },
              { name: 'Leite', portion: '200ml' },
              { name: 'Aveia', portion: '2 colheres' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Carne vermelha', portion: '150g' },
              { name: 'Arroz branco', portion: '6 colheres' },
              { name: 'Feijão carioca', portion: '4 colheres' },
              { name: 'Legumes refogados', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Pão com pasta de amendoim', portion: '2 fatias' },
              { name: 'Leite com achocolatado', portion: '1 copo' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Frango assado', portion: '150g' },
              { name: 'Quinoa', portion: '4 colheres' },
              { name: 'Salada completa', portion: '1 xícara' },
              { name: 'Azeite', portion: '1 colher' }
            ]
          },
          {
            name: 'Ceia',
            time: '22:00 - 22:30',
            foods: [
              { name: 'Iogurte natural', portion: '1 pote' },
              { name: 'Mel', portion: '1 colher' }
            ]
          }
        ]
      },
      quarta: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Panqueca de aveia', portion: '2 unidades' },
              { name: 'Mel', portion: '1 colher' },
              { name: 'Frutas vermelhas', portion: '1 punhado' },
              { name: 'Café com leite', portion: '1 copo' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Whey protein', portion: '1 scoop' },
              { name: 'Maçã', portion: '1 unidade' },
              { name: 'Água', portion: '300ml' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Peixe grelhado', portion: '150g' },
              { name: 'Arroz integral', portion: '6 colheres' },
              { name: 'Lentilha', portion: '3 colheres' },
              { name: 'Salada de folhas', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Mix de nozes', portion: '30g' },
              { name: 'Banana', portion: '1 unidade' },
              { name: 'Água de coco', portion: '200ml' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Peito de peru', portion: '150g' },
              { name: 'Batata inglesa', portion: '2 médias' },
              { name: 'Aspargos', portion: '1 xícara' }
            ]
          },
          {
            name: 'Ceia',
            time: '22:00 - 22:30',
            foods: [
              { name: 'Leite morno', portion: '1 copo' },
              { name: 'Biscoito integral', portion: '2 unidades' }
            ]
          }
        ]
      },
      quinta: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Tapioca', portion: '2 unidades' },
              { name: 'Queijo coalho', portion: '50g' },
              { name: 'Tomate', portion: '1 unidade' },
              { name: 'Suco de laranja', portion: '1 copo' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Vitamina de frutas', portion: '1 copo' },
              { name: 'Granola', portion: '2 colheres' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Frango grelhado', portion: '150g' },
              { name: 'Macarrão integral', portion: '1 xícara' },
              { name: 'Molho de tomate', portion: '2 colheres' },
              { name: 'Salada verde', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Shake de proteína', portion: '1 copo' },
              { name: 'Amendoim', portion: '20 unidades' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Carne moída', portion: '150g' },
              { name: 'Purê de batata', portion: '1 xícara' },
              { name: 'Vagem refogada', portion: '1 xícara' }
            ]
          },
          {
            name: 'Ceia',
            time: '22:00 - 22:30',
            foods: [
              { name: 'Chá de camomila', portion: '1 xícara' },
              { name: 'Torrada integral', portion: '1 fatia' }
            ]
          }
        ]
      },
      sexta: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Bowl de açaí', portion: '1 tigela' },
              { name: 'Granola', portion: '3 colheres' },
              { name: 'Banana', portion: '1 unidade' },
              { name: 'Mel', portion: '1 colher' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Barrinha de proteína', portion: '1 unidade' },
              { name: 'Água', portion: '300ml' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Picanha grelhada', portion: '150g' },
              { name: 'Arroz com brócolis', portion: '1 xícara' },
              { name: 'Feijão preto', portion: '4 colheres' },
              { name: 'Farofa', portion: '2 colheres' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Sanduíche de frango', portion: '1 unidade' },
              { name: 'Suco natural', portion: '1 copo' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Tilápia assada', portion: '150g' },
              { name: 'Batata doce roxa', portion: '1 média' },
              { name: 'Couve refogada', portion: '1 xícara' }
            ]
          },
          {
            name: 'Ceia',
            time: '22:00 - 22:30',
            foods: [
              { name: 'Vitamina de banana', portion: '1 copo' },
              { name: 'Aveia', portion: '1 colher' }
            ]
          }
        ]
      },
      sabado: {
        meals: [
          {
            name: 'Café da manhã',
            time: '8:00 - 9:00',
            foods: [
              { name: 'Café da manhã reforçado', portion: '1 porção' },
              { name: 'Ovos beneditinos', portion: '2 unidades' },
              { name: 'Torrada francesa', portion: '2 fatias' },
              { name: 'Suco de frutas', portion: '1 copo' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:30 - 11:00',
            foods: [
              { name: 'Smoothie verde', portion: '1 copo' },
              { name: 'Castanha de caju', portion: '10 unidades' }
            ]
          },
          {
            name: 'Almoço',
            time: '13:00 - 14:00',
            foods: [
              { name: 'Churrasco misto', portion: '200g' },
              { name: 'Arroz branco', portion: '1 xícara' },
              { name: 'Vinagrete', portion: '3 colheres' },
              { name: 'Pão de alho', portion: '2 fatias' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '16:00 - 16:30',
            foods: [
              { name: 'Açaí na tigela', portion: '1 porção' },
              { name: 'Frutas picadas', portion: '1 xícara' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:30 - 20:30',
            foods: [
              { name: 'Pizza caseira', portion: '3 fatias' },
              { name: 'Salada caesar', portion: '1 porção' }
            ]
          },
          {
            name: 'Ceia',
            time: '22:30 - 23:00',
            foods: [
              { name: 'Sorvete de proteína', portion: '1 porção' }
            ]
          }
        ]
      },
      domingo: {
        meals: [
          {
            name: 'Brunch',
            time: '9:00 - 10:30',
            foods: [
              { name: 'Brunch completo', portion: '1 porção' },
              { name: 'Waffles', portion: '2 unidades' },
              { name: 'Frutas frescas', portion: '1 xícara' },
              { name: 'Iogurte grego', portion: '1 pote' },
              { name: 'Café especial', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche',
            time: '13:00 - 13:30',
            foods: [
              { name: 'Sanduíche natural', portion: '1 unidade' },
              { name: 'Suco detox', portion: '1 copo' }
            ]
          },
          {
            name: 'Almoço',
            time: '15:00 - 16:00',
            foods: [
              { name: 'Lasanha de frango', portion: '1 fatia' },
              { name: 'Salada mista', portion: '1 xícara' },
              { name: 'Pão italiano', portion: '2 fatias' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '17:30 - 18:00',
            foods: [
              { name: 'Bolo de banana', portion: '1 fatia' },
              { name: 'Chá verde', portion: '1 xícara' }
            ]
          },
          {
            name: 'Jantar',
            time: '20:00 - 21:00',
            foods: [
              { name: 'Sopa nutritiva', portion: '1 prato' },
              { name: 'Torrada integral', portion: '2 fatias' }
            ]
          }
        ]
      }
    },
    recipe: {
      name: 'Frango Grelhado com Quinoa',
      ingredients: [
        '150g de peito de frango',
        '1/2 xícara de quinoa',
        '1 xícara de brócolis',
        '1 colher de azeite',
        'Temperos a gosto'
      ],
      instructions: 'Tempere o frango e grelhe por 6-8 minutos de cada lado. Cozinhe a quinoa conforme instruções. Refogue o brócolis. Sirva tudo junto com azeite.'
    }
  },
  {
 type: 'Cutting',
    budget: '301-500',
    goal: 'perder-peso',
    days: {
      segunda: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Ovos mexidos', portion: '2 unidades' },
              { name: 'Torrada integral', portion: '1 fatia' },
              { name: 'Tomate', portion: '1 unidade' },
              { name: 'Chá verde', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Maçã', portion: '1 unidade' },
              { name: 'Água', portion: '300ml' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Peito de frango grelhado', portion: '120g' },
              { name: 'Arroz integral', portion: '3 colheres' },
              { name: 'Salada verde', portion: '2 xícaras' },
              { name: 'Azeite', portion: '1/2 colher' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Iogurte natural', portion: '1 pote' },
              { name: 'Canela', portion: '1 pitada' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Peixe grelhado', portion: '120g' },
              { name: 'Legumes no vapor', portion: '1 xícara' },
              { name: 'Quinoa', portion: '2 colheres' }
            ]
          }
        ]
      },
      terca: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Smoothie de frutas vermelhas', portion: '1 copo' },
              { name: 'Sementes de chia', portion: '1 colher' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Pera', portion: '1 unidade' },
              { name: 'Castanhas', portion: '5 unidades' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Salada de atum', portion: '1 porção' },
              { name: 'Grão de bico', portion: '3 colheres' },
              { name: 'Azeite e limão', portion: 'a gosto' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Queijo cottage', portion: '1/2 xícara' },
              { name: 'Goiaba', portion: '1 unidade' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Sopa de legumes', portion: '1 prato' },
              { name: 'Frango desfiado', portion: '50g' }
            ]
          }
        ]
      },
      quarta: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Iogurte com granola', portion: '1 pote' },
              { name: 'Morango', portion: '6 unidades' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Cenoura baby', portion: '1 xícara' },
              { name: 'Homus', portion: '2 colheres' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Omelete', portion: '2 unidades' },
              { name: 'Salada de rúcula', portion: '1 porção' },
              { name: 'Tomate cereja', portion: '10 unidades' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Mix de castanhas', portion: '30g' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Salmão assado', portion: '100g' },
              { name: 'Couve flor', portion: '1 xícara' }
            ]
          }
        ]
      },
      quinta: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Pão integral', portion: '2 fatias' },
              { name: 'Ricota', portion: '2 colheres' },
              { name: 'Chá de hibisco', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Melão', portion: '1 fatia' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Frango xadrez', portion: '1 porção' },
              { name: 'Arroz de couve flor', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Chips de batata doce', portion: '1/2 xícara' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Crepioca', portion: '1 unidade' },
              { name: 'Recheio de espinafre', portion: 'a gosto' }
            ]
          }
        ]
      },
      sexta: {
        meals: [
          {
            name: 'Café da manhã',
            time: '7:00 - 8:30',
            foods: [
              { name: 'Vitamina de abacate', portion: '1 copo' },
              { name: 'Semente de linhaça', portion: '1 colher' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:00 - 10:30',
            foods: [
              { name: 'Kiwi', portion: '2 unidades' }
            ]
          },
          {
            name: 'Almoço',
            time: '12:00 - 13:30',
            foods: [
              { name: 'Escondidinho de batata doce', portion: '1 porção' },
              { name: 'Carne moída', portion: '100g' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '15:30 - 16:30',
            foods: [
              { name: 'Pipoca', portion: '2 xícaras' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:00 - 20:00',
            foods: [
              { name: 'Wrap', portion: '1 unidade' },
              { name: 'Recheio de frango', portion: 'a gosto' },
              { name: 'Alface e tomate', portion: 'a gosto' }
            ]
          }
        ]
      },
      sabado: {
        meals: [
          {
            name: 'Café da manhã',
            time: '8:00 - 9:00',
            foods: [
              { name: 'Omelete', portion: '2 unidades' },
              { name: 'Queijo e tomate', portion: 'a gosto' },
              { name: 'Café sem açúcar', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '10:30 - 11:00',
            foods: [
              { name: 'Salada de frutas', portion: '1 porção' },
              { name: 'Iogurte natural', portion: '1/2 pote' }
            ]
          },
          {
            name: 'Almoço',
            time: '13:00 - 14:00',
            foods: [
              { name: 'Feijoada light', portion: '1 concha' },
              { name: 'Couve refogada', portion: 'a gosto' },
              { name: 'Laranja', portion: '1 unidade' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '16:00 - 16:30',
            foods: [
              { name: 'Biscoito de arroz', portion: '3 unidades' },
              { name: 'Geleia sem açúcar', portion: 'a gosto' }
            ]
          },
          {
            name: 'Jantar',
            time: '19:30 - 20:30',
            foods: [
              { name: 'Pizza de couve flor', portion: '2 fatias' },
              { name: 'Recheio de legumes', portion: 'a gosto' }
            ]
          }
        ]
      },
      domingo: {
        meals: [
          {
            name: 'Café da manhã',
            time: '9:00 - 10:00',
            foods: [
              { name: 'Panqueca de banana', portion: '2 unidades' },
              { name: 'Aveia e canela', portion: 'a gosto' },
              { name: 'Chá verde', portion: '1 xícara' }
            ]
          },
          {
            name: 'Lanche da manhã',
            time: '11:30 - 12:00',
            foods: [
              { name: 'Ovo cozido', portion: '1 unidade' }
            ]
          },
          {
            name: 'Almoço',
            time: '14:00 - 15:00',
            foods: [
              { name: 'Lasanha de abobrinha', portion: '1 fatia' },
              { name: 'Salada verde', portion: 'a gosto' }
            ]
          },
          {
            name: 'Lanche da tarde',
            time: '17:00 - 17:30',
            foods: [
              { name: 'Iogurte natural', portion: '1 pote' },
              { name: 'Amora', portion: '1/2 xícara' }
            ]
          },
          {
            name: 'Jantar',
            time: '20:00 - 21:00',
            foods: [
              { name: 'Sopa de abóbora', portion: '1 prato' },
              { name: 'Torrada integral', portion: '1 fatia' }
            ]
          }
        ]
      }
    },
    recipe: {
      name: 'Salada Completa Detox',
      ingredients: [
        '2 xícaras de folhas verdes',
        '100g de frango grelhado',
        '1/2 abacate',
        '1 tomate',
        'Azeite e limão'
      ],
      instructions: 'Misture todos os ingredientes e tempere com azeite e limão.'
    }
  }
  ,
 {
 type: 'Manutenção Equilibrada',
 budget: '80-150',
 goal: 'manter-peso',
    days: {
      segunda: {
        meals: [
          {
            name: 'Café da manhã',
 time: '7:00 - 8:30',
 foods: [
 { name: 'Iogurte natural com frutas', portion: '1 pote com 1/2 xícara de frutas' },
 { name: 'Granola', portion: '2 colheres de sopa' },
 { name: 'Café ou chá', portion: '1 xícara' }
 ]
          },
          {
            name: 'Lanche da manhã',
 time: '10:00 - 10:30',
 foods: [
 { name: 'Uma fruta média', portion: '1 unidade' }
 ]
          },
          {
            name: 'Almoço',
 time: '12:00 - 13:30',
 foods: [
 { name: 'Peito de frango ou peixe grelhado', portion: '120g' },
 { name: 'Arroz integral', portion: '4 colheres de sopa' },
 { name: 'Feijão', portion: '3 colheres de sopa' },
 { name: 'Salada variada', portion: 'à vontade' },
 { name: 'Legumes cozidos ou refogados', portion: '1 xícara' }
 ]
          },
          {
            name: 'Lanche da tarde',
 time: '15:30 - 16:30',
 foods: [
 { name: 'Um punhado de castanhas ou amêndoas', portion: '30g' }
 ]
          },
          {
            name: 'Jantar',
 time: '19:00 - 20:00',
 foods: [
 { name: 'Sopa de legumes com frango desfiado', portion: '1 prato fundo' },
 { name: 'Torrada integral', portion: '1 fatia' }
 ]
          },
 {
            name: 'Ceia (opcional)',
 time: '22:00 - 22:30',
 foods: [
 { name: 'Um copo de leite desnatado', portion: '200ml' }
 ]
          }
 ]
      },
 terça: {
        meals: [
          {
            name: 'Café da manhã',
 time: '7:00 - 8:30',
 foods: [
 { name: 'Ovos mexidos', portion: '2 unidades' },
 { name: 'Pão integral', portion: '1 fatia' },
 { name: 'Queijo branco', portion: '1 fatia média' },
 { name: 'Suco natural (sem açúcar)', portion: '1 copo pequeno' }
 ]
          },
          {
            name: 'Lanche da manhã',
 time: '10:00 - 10:30',
 foods: [
 { name: 'Iogurte natural', portion: '1 pote' }
 ]
          },
          {
            name: 'Almoço',
 time: '12:00 - 13:30',
 foods: [
 { name: 'Carne magra grelhada', portion: '120g' },
 { name: 'Batata doce', portion: '1 média' },
 { name: 'Salada variada', portion: 'à vontade' },
 { name: 'Legumes cozidos', portion: '1 xícara' }
 ]
          },
          {
            name: 'Lanche da tarde',
 time: '15:30 - 16:30',
 foods: [
 { name: 'Mix de frutas secas', portion: '30g' }
 ]
          },
          {
            name: 'Jantar',
 time: '19:00 - 20:00',
 foods: [
 { name: 'Wrap integral com recheio de atum ou frango', portion: '1 unidade' },
 { name: 'Salada pequena', portion: '1 porção' }
 ]
          }
 ]
      },
 quarta: { meals: [] },
 quinta: { meals: [] },
 sexta: { meals: [] },
 sabado: { meals: [] },
 domingo: { meals: [] }
    },
 recipe: {
 name: 'Salada de Grão de Bico com Legumes',
 ingredients: [
 '1 xícara de grão de bico cozido',
 '1/2 pepino picado',
 '1 tomate picado',
 '1/4 cebola roxa picada',
 'Salsinha picada a gosto',
 'Azeite de oliva extra virgem',
 'Suco de limão',
 'Sal e pimenta do reino a gosto'
 ],
 instructions: 'Em uma tigela, misture o grão de bico cozido, o pepino, o tomate e a cebola roxa. Adicione a salsinha picada. Tempere com azeite, suco de limão, sal e pimenta a gosto. Misture bem e sirva.'
    }
  },
 {
 type: 'Manutenção Equilibrada',
 budget: '151-300',
 goal: 'manter-peso',
 days: {
 quarta: { meals: [] }, quinta: { meals: [] }, sexta: { meals: [] }, sabado: { meals: [] }, domingo: { meals: [] }, segunda: { meals: [] }, terca: { meals: [] }
 },
 recipe: { name: '', ingredients: [], instructions: '' }
  }
];
