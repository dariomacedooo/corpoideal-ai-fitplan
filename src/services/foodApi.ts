export interface NutritionValues {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Chave de API do USDA vinda do arquivo .env
const USDA_API_KEY = import.meta.env.VITE_USDA_API_KEY;
const API_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

/**
 * Busca informações nutricionais de um alimento usando a API do USDA FoodData Central.
 * @param foodName O nome do alimento a ser pesquisado.
 * @returns Um objeto com os valores nutricionais ou null se não for encontrado.
 */
export async function getUsdaNutritionalInfo(foodName: string): Promise<NutritionValues | null> {
  if (!USDA_API_KEY) {
    console.error("Chave da API do USDA não encontrada. Verifique o arquivo .env");
    return null;
  }

  // Codifica o nome do alimento para ser usado na URL
  const query = encodeURIComponent(foodName);
  
  // Incluímos os tipos de dados mais comuns para uma busca abrangente
  const dataTypes = "Foundation,SR Legacy,Branded";
  
  const url = `${API_URL}?api_key=${USDA_API_KEY}&query=${query}&dataType=${dataTypes}&pageSize=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Erro na API do USDA: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (!data.foods || data.foods.length === 0) {
      console.warn(`Nenhum resultado encontrado para "${foodName}" na API do USDA.`);
      return null;
    }

    const food = data.foods[0];
    const nutrients = food.foodNutrients;

    // Função auxiliar para encontrar um nutriente específico pelo nome ou número
    const findNutrient = (name: string, unit: string, numbers: number[]) => {
      const nutrient = nutrients.find((n: any) => 
        (n.nutrientName.toLowerCase().includes(name.toLowerCase()) && n.unitName.toUpperCase() === unit) || 
        numbers.includes(n.nutrientNumber)
      );
      // Retorna o valor do nutriente encontrado ou 0
      return nutrient ? parseFloat(nutrient.value) : 0;
    }; // A função auxiliar termina aqui.

    // Números de nutrientes padrão do USDA: Energia (kcal), Proteína, Gordura, Carboidrato
    const calories = findNutrient('energy', 'KCAL', [1008, 2047]);
    const protein = findNutrient('protein', 'G', [1003]);
    const fat = findNutrient('total lipid (fat)', 'G', [1004]);
    const carbs = findNutrient('carbohydrate, by difference', 'G', [1005]);

    if (calories === 0 && protein === 0 && fat === 0 && carbs === 0) {
        return null;
    }

    return {
      calories,
      protein,
      carbs,
      fat,
    };
  } catch (error) {
    console.error(`Falha ao buscar dados nutricionais para "${foodName}":`, error);
    return null;
  }
}