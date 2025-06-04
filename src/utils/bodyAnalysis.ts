
// Scientific body analysis based on ISAK anthropometry and golden ratio principles
export interface BodyProportions {
  chest: number;
  leftArm: number;
  rightArm: number;
  waist: number;
  hips: number;
  leftThigh: number;
  rightThigh: number;
  leftCalf: number;
  rightCalf: number;
  height: number;
}

export interface ProportionAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  proportionScores: {
    [key: string]: {
      current: number;
      ideal: number;
      percentage: number;
      status: 'above' | 'ideal' | 'below';
    };
  };
}

// Classical bodybuilding proportion formulas
export const calculateIdealProportions = (height: number, chest: number): any => {
  return {
    arm: chest * 0.5, // Braço = 0,5 x circunferência do tórax
    thigh: chest * 0.53, // Coxa = 0,53 x quadril (aproximado pelo tórax)
    calf: chest * 0.5, // Panturrilha = Braço
    waist: height * 0.46, // Cintura controlada: 45–47% da altura (usando 46% como ideal)
    chest: chest, // Referência base
  };
};

export const analyzeBodyProportions = (measurements: BodyProportions): ProportionAnalysis => {
  const { height, chest, leftArm, rightArm, waist, leftThigh, rightThigh, leftCalf, rightCalf } = measurements;
  
  const idealProps = calculateIdealProportions(height, chest);
  const avgArm = (leftArm + rightArm) / 2;
  const avgThigh = (leftThigh + rightThigh) / 2;
  const avgCalf = (leftCalf + rightCalf) / 2;

  const proportionScores = {
    arms: {
      current: avgArm,
      ideal: idealProps.arm,
      percentage: (avgArm / idealProps.arm) * 100,
      status: avgArm >= idealProps.arm * 0.95 && avgArm <= idealProps.arm * 1.05 ? 'ideal' as const :
               avgArm > idealProps.arm * 1.05 ? 'above' as const : 'below' as const
    },
    thighs: {
      current: avgThigh,
      ideal: idealProps.thigh,
      percentage: (avgThigh / idealProps.thigh) * 100,
      status: avgThigh >= idealProps.thigh * 0.95 && avgThigh <= idealProps.thigh * 1.05 ? 'ideal' as const :
               avgThigh > idealProps.thigh * 1.05 ? 'above' as const : 'below' as const
    },
    calves: {
      current: avgCalf,
      ideal: idealProps.calf,
      percentage: (avgCalf / idealProps.calf) * 100,
      status: avgCalf >= idealProps.calf * 0.95 && avgCalf <= idealProps.calf * 1.05 ? 'ideal' as const :
               avgCalf > idealProps.calf * 1.05 ? 'above' as const : 'below' as const
    },
    waist: {
      current: waist,
      ideal: idealProps.waist,
      percentage: (waist / idealProps.waist) * 100,
      status: waist <= idealProps.waist * 1.05 ? 'ideal' as const :
               waist > idealProps.waist * 1.15 ? 'above' as const : 'below' as const
    }
  };

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  // Analyze each proportion
  Object.entries(proportionScores).forEach(([key, score]) => {
    const bodyPart = {
      arms: 'Braços',
      thighs: 'Coxas', 
      calves: 'Panturrilhas',
      waist: 'Cintura'
    }[key];

    if (score.status === 'above' && key !== 'waist') {
      strengths.push(`${bodyPart}: ${score.percentage.toFixed(1)}% da proporção ideal (acima da média)`);
    } else if (score.status === 'ideal') {
      strengths.push(`${bodyPart}: ${score.percentage.toFixed(1)}% da proporção ideal (proporção clássica)`);
    } else if (score.status === 'below') {
      weaknesses.push(`${bodyPart}: ${score.percentage.toFixed(1)}% da proporção ideal (abaixo da média)`);
      
      // Specific recommendations
      if (key === 'arms') {
        recommendations.push('Foco em exercícios para braços: rosca direta, tríceps pulley, martelo');
      } else if (key === 'thighs') {
        recommendations.push('Intensificar treino de pernas: agachamento, leg press, afundo');
      } else if (key === 'calves') {
        recommendations.push('Adicionar volume para panturrilhas: elevação em pé e sentado');
      }
    }

    if (key === 'waist' && score.status === 'above') {
      weaknesses.push(`${bodyPart}: ${score.percentage.toFixed(1)}% da proporção ideal (acima do recomendado)`);
      recommendations.push('Foco em definição: cardio HIIT, controle calórico mais rigoroso');
    }
  });

  return {
    strengths,
    weaknesses,
    recommendations,
    proportionScores
  };
};

// Biotipo classification for training and nutrition
export const classifyBiotipo = (waist: number, height: number, bodyFat?: number): string => {
  const waistToHeightRatio = waist / height;
  
  if (waistToHeightRatio < 0.43) {
    return 'Ectomorfo'; // Naturally lean, fast metabolism
  } else if (waistToHeightRatio > 0.53) {
    return 'Endomorfo'; // Tendency to store fat, slower metabolism
  } else {
    return 'Mesomorfo'; // Naturally muscular, balanced metabolism
  }
};
