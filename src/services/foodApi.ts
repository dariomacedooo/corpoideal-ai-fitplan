// src/services/foodApi.ts

export interface NutritionalInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    productName?: string;
  }
  
  // Cache em memória para evitar chamadas repetidas na mesma sessão
  const apiCache = new Map<string, NutritionalInfo>();
  
  /**
   * Busca informações nutricionais de um produto na API do Open Food Facts.
   * @param foodName O nome do alimento a ser pesquisado.
   * @returns Uma promessa com as informações nutricionais ou null se não encontrado.
   */
  export async function getNutritionalInfo(foodName: string): Promise<NutritionalInfo | null> {
    const query = foodName.toLowerCase().trim();
  
    if (apiCache.has(query)) {
      console.log(`Cache hit for: ${query}`);
      return apiCache.get(query)!;
    }
  
    console.log(`API call for: ${query}`);
    const url = `https://br.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=1`;
  
    try {
      const response = await fetch(url, {
        headers: {
          // É uma boa prática identificar sua aplicação no User-Agent
          'User-Agent': 'CorpoIdeal-AI-Fitplan - Web App - v1.0'
        }
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.products && data.products.length > 0) {
        const product = data.products[0];
        const nutriments = product.nutriments;
  
        // A API retorna valores por 100g.
        // O campo de calorias pode variar (energy-kcal_100g ou energy_100g em kJ)
        const calories = nutriments['energy-kcal_100g'] 
                      || (nutriments.energy_100g ? nutriments.energy_100g / 4.184 : 0);
  
        const nutritionalInfo: NutritionalInfo = {
          calories: calories || 0,
          protein: nutriments.proteins_100g || 0,
          carbs: nutriments.carbohydrates_100g || 0,
          fat: nutriments.fat_100g || 0,
          productName: product.product_name_pt || product.product_name || foodName,
        };
  
        apiCache.set(query, nutritionalInfo);
        return nutritionalInfo;
      }
  
      return null;
    } catch (error) {
      console.error("Error fetching nutritional data:", error);
      return null; // Retorna nulo em caso de erro de rede ou parsing
    }
  }