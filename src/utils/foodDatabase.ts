
export type FoodCategory = "carboidrato" | "proteina" | "gordura";
export type FoodPrice = "baixo" | "medio" | "alto";

export interface FoodItem {
  name: string;
  category: FoodCategory;
  price: FoodPrice;
  calories100g: number;
  protein100g: number;
  carbs100g: number;
  fat100g: number;
}

export const FOOD_DATABASE: FoodItem[] = [
  // Carboidratos - baratos
  {
    name: "Arroz branco",
    category: "carboidrato",
    price: "baixo",
    calories100g: 130,
    protein100g: 2.7,
    carbs100g: 28,
    fat100g: 0.3,
  },
  {
    name: "Macarrão",
    category: "carboidrato",
    price: "baixo",
    calories100g: 156,
    protein100g: 5,
    carbs100g: 30,
    fat100g: 1.1
  },
  {
    name: "Batata inglesa",
    category: "carboidrato",
    price: "baixo",
    calories100g: 77,
    protein100g: 2,
    carbs100g: 17,
    fat100g: 0.1
  },
  {
    name: "Pão francês",
    category: "carboidrato",
    price: "baixo",
    calories100g: 268,
    protein100g: 8,
    carbs100g: 57,
    fat100g: 2
  },
  // Carboidratos - médios/altos
  {
    name: "Quinoa",
    category: "carboidrato",
    price: "alto",
    calories100g: 120,
    protein100g: 4.4,
    carbs100g: 21,
    fat100g: 1.9
  },
  {
    name: "Batata doce",
    category: "carboidrato",
    price: "medio",
    calories100g: 86,
    protein100g: 1.6,
    carbs100g: 20,
    fat100g: 0.1
  },

  // Proteínas - baratas
  {
    name: "Ovos",
    category: "proteina",
    price: "baixo",
    calories100g: 155,
    protein100g: 13,
    carbs100g: 1.1,
    fat100g: 11
  },
  {
    name: "Peito de frango",
    category: "proteina",
    price: "baixo",
    calories100g: 165,
    protein100g: 31,
    carbs100g: 0,
    fat100g: 3.6
  },
  {
    name: "Sardinha (enlatada)",
    category: "proteina",
    price: "baixo",
    calories100g: 208,
    protein100g: 25,
    carbs100g: 0,
    fat100g: 12
  },
  // Proteínas - médias/altas
  {
    name: "Carne bovina magra",
    category: "proteina",
    price: "medio",
    calories100g: 250,
    protein100g: 26,
    carbs100g: 0,
    fat100g: 17
  },
  {
    name: "Salmão",
    category: "proteina",
    price: "alto",
    calories100g: 208,
    protein100g: 20,
    carbs100g: 0,
    fat100g: 13
  },

  // Gorduras saudáveis - óleos
  {
    name: "Azeite de oliva",
    category: "gordura",
    price: "alto",
    calories100g: 884,
    protein100g: 0,
    carbs100g: 0,
    fat100g: 100
  },
  {
    name: "Óleo de soja",
    category: "gordura",
    price: "baixo",
    calories100g: 884,
    protein100g: 0,
    carbs100g: 0,
    fat100g: 100
  },
  // Gorduras saudáveis - sementes/frutas oleaginosas
  {
    name: "Castanha do Pará",
    category: "gordura",
    price: "alto",
    calories100g: 659,
    protein100g: 14,
    carbs100g: 12,
    fat100g: 67
  },
  {
    name: "Amendoim",
    category: "gordura",
    price: "baixo",
    calories100g: 567,
    protein100g: 25,
    carbs100g: 16,
    fat100g: 49
  },
  {
    name: "Abacate",
    category: "gordura",
    price: "medio",
    calories100g: 160,
    protein100g: 2,
    carbs100g: 9,
    fat100g: 15
  }
];
