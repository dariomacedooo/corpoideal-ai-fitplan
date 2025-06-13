
// Cálculos antropométricos científicos avançados

export interface AnthropometricData {
  height: number; // cm
  weight: number; // kg
  age: number;
  sex: 'masculino' | 'feminino';
  bodyFat?: number; // %
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'ativo' | 'muito-ativo';
  // Medidas corporais em cm
  chest?: number;
  waist?: number;
  hips?: number;
  leftArm?: number;
  rightArm?: number;
  leftThigh?: number;
  rightThigh?: number;
  leftCalf?: number;
  rightCalf?: number;
}

// Adicione esta interface para tipar os landmarks do MediaPipe
interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}
export interface TMBResult {
  mifflinStJeor: number;
  cunningham?: number;
  recommended: number;
  tdee: number;
  method: string;
}

export interface ProportionAnalysis {
  measurement: string;
  current: number;
  ideal: number;
  percentage: number;
  status: 'excelente' | 'bom' | 'adequado' | 'fraco' | 'muito-fraco';
  recommendation: string;
}

export interface AnthropometricResults {
  tmb: TMBResult;
  proportions: ProportionAnalysis[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  overallScore: number;
}

/**
 * Calcula o ângulo entre três pontos (landmarks) em um espaço 2D ou 3D.
 * @param a - O primeiro ponto (ex: ombro).
 * @param b - O ponto do vértice do ângulo (ex: cotovelo).
 * @param c - O terceiro ponto (ex: pulso).
 * @returns O ângulo em graus.
 */
export const calculateJointAngle = (a: Landmark, b: Landmark, c: Landmark): number => {
  // Cria os vetores BA e BC
  const vectorAB = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
  const vectorCB = { x: c.x - b.x, y: c.y - b.y, z: c.z - b.z };

  // Calcula o produto escalar
  const dotProduct = vectorAB.x * vectorCB.x + vectorAB.y * vectorCB.y + vectorAB.z * vectorCB.z;

  // Calcula a magnitude (comprimento) de cada vetor
  const magnitudeAB = Math.sqrt(vectorAB.x ** 2 + vectorAB.y ** 2 + vectorAB.z ** 2);
  const magnitudeCB = Math.sqrt(vectorCB.x ** 2 + vectorCB.y ** 2 + vectorCB.z ** 2);

  // Calcula o cosseno do ângulo e o ângulo em graus
  const cosAngle = dotProduct / (magnitudeAB * magnitudeCB);
  const angleRad = Math.acos(Math.min(Math.max(cosAngle, -1), 1)); // Clamp para evitar NaN com imprecisão de ponto flutuante
  const angleDeg = angleRad * (180 / Math.PI);

  return angleDeg;
};

// Cálculo TMB usando Fórmula Mifflin-St Jeor
export const calculateMifflinStJeor = (weight: number, height: number, age: number, sex: string): number => {
  const base = (10 * weight) + (6.25 * height) - (5 * age);
  return sex === 'masculino' ? base + 5 : base - 161;
};

// Cálculo TMB usando Fórmula Cunningham (para atletas com % gordura conhecida)
export const calculateCunningham = (weight: number, bodyFat: number): number => {
  const leanMass = weight * (1 - bodyFat / 100);
  return 500 + (22 * leanMass);
};

// Cálculo TDEE baseado no nível de atividade
export const calculateTDEE = (tmb: number, activityLevel: string): number => {
  const multipliers: Record<string, number> = {
    'sedentario': 1.2,
    'leve': 1.375,
    'moderado': 1.55,
    'ativo': 1.725,
    'muito-ativo': 1.9
  };
  
  return tmb * (multipliers[activityLevel] || 1.55);
};

// Cálculo de proporções ideais baseadas no fisiculturismo clássico
export const calculateIdealProportions = (height: number): Record<string, number> => {
  const heightInInches = height / 2.54;
  
  return {
    braço: heightInInches * 0.53 * 2.54,
    coxa: heightInInches * 0.53 * 2.54,
    panturrilha: heightInInches * 0.34 * 2.54, // ~64% do braço
    cintura: height * 0.46,
    peito: heightInInches * 1.40 * 2.54
  };
};

// Análise de status baseada na porcentagem do ideal
export const getProportionStatus = (percentage: number): 'excelente' | 'bom' | 'adequado' | 'fraco' | 'muito-fraco' => {
  if (percentage >= 95) return 'excelente';
  if (percentage >= 90) return 'bom';
  if (percentage >= 85) return 'adequado';
  if (percentage >= 75) return 'fraco';
  return 'muito-fraco';
};

// Gerar recomendações específicas baseadas nas deficiências
export const generateRecommendations = (proportions: ProportionAnalysis[]): string[] => {
  const recommendations: string[] = [];
  
  proportions.forEach(prop => {
    if (prop.status === 'fraco' || prop.status === 'muito-fraco') {
      switch (prop.measurement) {
        case 'Braços':
          recommendations.push('Foque em exercícios compostos como supino, remada e desenvolvimento. Adicione trabalho isolado para bíceps e tríceps.');
          break;
        case 'Peito':
          recommendations.push('Priorize supino inclinado, supino reto e crucifixo. Varie ângulos e amplitudes.');
          break;
        case 'Coxas':
          recommendations.push('Intensifique agachamentos, leg press e afundos. Inclua trabalho unilateral.');
          break;
        case 'Panturrilhas':
          recommendations.push('Adicione elevação de panturrilha em pé e sentado. Varie velocidades e amplitudes.');
          break;
        case 'Cintura':
          if (prop.percentage > 100) {
            recommendations.push('Reduza gordura corporal através de déficit calórico e exercícios cardiovasculares.');
          } else {
            recommendations.push('Desenvolva músculos do core com exercícios específicos.');
          }
          break;
      }
    }
  });
  
  if (recommendations.length === 0) {
    recommendations.push('Mantenha a consistência no treinamento e nutrição para preservar suas excelentes proporções.');
  }
  
  return recommendations;
};

// Análise antropométrica completa
export const performAnthropometricAnalysis = (data: AnthropometricData): AnthropometricResults => {
  // Cálculo TMB
  const mifflinStJeor = calculateMifflinStJeor(data.weight, data.height, data.age, data.sex);
  
  let cunningham: number | undefined;
  let recommendedTMB = mifflinStJeor;
  let method = 'Mifflin-St Jeor (padrão)';
  
  // Se temos % gordura e é atleta/muito ativo, usar Cunningham
  if (data.bodyFat && data.bodyFat < 15 && data.activityLevel === 'muito-ativo') {
    cunningham = calculateCunningham(data.weight, data.bodyFat);
    recommendedTMB = cunningham;
    method = 'Cunningham (atleta)';
  }
  
  const tdee = calculateTDEE(recommendedTMB, data.activityLevel);
  
  const tmb: TMBResult = {
    mifflinStJeor,
    cunningham,
    recommended: recommendedTMB,
    tdee,
    method
  };
  
  // Análise de proporções
  const idealProportions = calculateIdealProportions(data.height);
  const proportions: ProportionAnalysis[] = [];
  
  // Análise de braços (média dos dois braços)
  if (data.leftArm && data.rightArm) {
    const avgArm = (data.leftArm + data.rightArm) / 2;
    const percentage = (avgArm / idealProportions.braço) * 100;
    proportions.push({
      measurement: 'Braços',
      current: avgArm,
      ideal: idealProportions.braço,
      percentage,
      status: getProportionStatus(percentage),
      recommendation: percentage < 85 ? 'Desenvolver massa muscular nos braços' : 'Manter desenvolvimento atual'
    });
  }
  
  // Análise de peito
  if (data.chest) {
    const percentage = (data.chest / idealProportions.peito) * 100;
    proportions.push({
      measurement: 'Peito',
      current: data.chest,
      ideal: idealProportions.peito,
      percentage,
      status: getProportionStatus(percentage),
      recommendation: percentage < 85 ? 'Intensificar treino de peito' : 'Manter desenvolvimento atual'
    });
  }
  
  // Análise de coxas (média das duas coxas)
  if (data.leftThigh && data.rightThigh) {
    const avgThigh = (data.leftThigh + data.rightThigh) / 2;
    const percentage = (avgThigh / idealProportions.coxa) * 100;
    proportions.push({
      measurement: 'Coxas',
      current: avgThigh,
      ideal: idealProportions.coxa,
      percentage,
      status: getProportionStatus(percentage),
      recommendation: percentage < 85 ? 'Focar no desenvolvimento das pernas' : 'Manter desenvolvimento atual'
    });
  }
  
  // Análise de panturrilhas (média das duas panturrilhas)
  if (data.leftCalf && data.rightCalf) {
    const avgCalf = (data.leftCalf + data.rightCalf) / 2;
    const percentage = (avgCalf / idealProportions.panturrilha) * 100;
    proportions.push({
      measurement: 'Panturrilhas',
      current: avgCalf,
      ideal: idealProportions.panturrilha,
      percentage,
      status: getProportionStatus(percentage),
      recommendation: percentage < 85 ? 'Adicionar trabalho específico para panturrilhas' : 'Manter desenvolvimento atual'
    });
  }
  
  // Análise de cintura
  if (data.waist) {
    const percentage = (data.waist / idealProportions.cintura) * 100;
    const status = percentage <= 105 ? getProportionStatus(Math.min(percentage, 100)) : 'fraco';
    proportions.push({
      measurement: 'Cintura',
      current: data.waist,
      ideal: idealProportions.cintura,
      percentage,
      status,
      recommendation: percentage > 105 ? 'Reduzir gordura corporal' : 'Manter proporção ideal'
    });
  }
  
  // Identificar pontos fortes e fracos
  const strengths = proportions
    .filter(p => p.percentage >= 95)
    .map(p => p.measurement);
    
  const weaknesses = proportions
    .filter(p => p.percentage < 85)
    .map(p => p.measurement);
  
  // Gerar recomendações
  const recommendations = generateRecommendations(proportions);
  
  // Calcular score geral
  const overallScore = proportions.length > 0 
    ? proportions.reduce((sum, p) => sum + Math.min(p.percentage, 100), 0) / proportions.length
    : 0;
  
  return {
    tmb,
    proportions,
    strengths,
    weaknesses,
    recommendations,
    overallScore
  };
};

// Função auxiliar para formatar resultados para exibição
export const formatAnthropometricResults = (results: AnthropometricResults) => {
  return {
    metabolismo: {
      tmb: Math.round(results.tmb.recommended),
      tdee: Math.round(results.tmb.tdee),
      metodo: results.tmb.method
    },
    proporcoes: results.proportions.map(p => ({
      medicao: p.measurement,
      atual: `${p.current.toFixed(1)} cm`,
      ideal: `${p.ideal.toFixed(1)} cm`,
      percentual: `${p.percentage.toFixed(1)}%`,
      status: p.status,
      recomendacao: p.recommendation
    })),
    resumo: {
      pontoFortes: results.strengths,
      pontosFracos: results.weaknesses,
      scoreGeral: `${results.overallScore.toFixed(1)}%`,
      recomendacoes: results.recommendations
    }
  };
};
