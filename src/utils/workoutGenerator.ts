import { scientificWorkouts } from '@/data/scientificWorkouts'; // Supondo que esta seja a nova fonte de dados
import { femaleWorkoutPlans } from '@/data/femaleWorkouts'; // Mantendo a lógica para treinos femininos

// A interface para um dia de treino permanece a mesma
interface WorkoutDay {
  day: string;
  focus: string;
  exercises: any[]; // Use 'any' por enquanto para flexibilidade
}

// A NOVA FUNÇÃO DINÂMICA
export const generateWorkoutPlan = (
  goal: string,
  experience: string,
  location: string,
  sex: string,
  healthIssues: string[],
  trainingDays: string[],
  userPhotos?: any // Mantido para compatibilidade, mas não usado na lógica principal
): WorkoutDay[] => {
  
  const daysPerWeek = trainingDays.length;

  // Manter a lógica de treino feminino se for o caso
  if (sex === 'feminino' && experience !== 'iniciante') {
     // A lógica para femaleWorkoutPlans pode ser mais elaborada aqui,
     // mas por enquanto vamos focar na geração principal.
     // Esta é uma simplificação.
     const plan = femaleWorkoutPlans[experience as keyof typeof femaleWorkoutPlans]?.[0];
     if (plan) {
       return trainingDays.map((day, index) => ({
         day: day,
         focus: plan.name,
         exercises: plan.exercises,
       }));
     }
  }

  // Acessa a configuração de treino com base no perfil do usuário
  // @ts-ignore
  const trainingConfig = scientificWorkouts[experience]?.[goal]?.[location];

  // Se não houver uma configuração específica, retorna um plano vazio para evitar erros
  if (!trainingConfig || !trainingConfig.divisoes || !trainingConfig.blocos) {
    console.warn(`Nenhuma configuração de treino científico encontrada para: ${experience}, ${goal}, ${location}`);
    return []; // Retorna vazio para que a UI possa mostrar uma mensagem de "plano não disponível"
  }

  // Pega a divisão semanal correta com base no número de dias
  const divisaoSemanal = trainingConfig.divisoes[daysPerWeek] || trainingConfig.divisoes[Object.keys(trainingConfig.divisoes)[0]];

  if (!divisaoSemanal) {
    console.error(`Nenhuma divisão semanal encontrada para ${daysPerWeek} dias.`);
    return [];
  }

  // Mapeia os dias selecionados pelo usuário para os blocos de treino da divisão
  const weeklyPlan = trainingDays.map((day, index) => {
    // Pega a letra do bloco para o dia atual (ex: 'A', 'B', 'C')
    // O operador '%' garante que a divisão se repita se houver mais dias de treino do que blocos (ex: ABCABC)
    const blocoKey = divisaoSemanal[index % divisaoSemanal.length];
    
    // Pega os detalhes do bloco de treino (foco e exercícios)
    const workoutBlock = trainingConfig.blocos[blocoKey];

    if (!workoutBlock) {
      console.error(`Bloco de treino '${blocoKey}' não encontrado.`);
      return {
        day,
        focus: 'Dia de Descanso (Erro)',
        exercises: [],
      };
    }

    return {
      day: day, // O dia que o usuário selecionou (ex: 'segunda')
      focus: workoutBlock.focus,
      exercises: workoutBlock.exercises,
    };
  });

  return weeklyPlan;
};

// As funções antigas abaixo NÃO SÃO MAIS NECESSÁRIAS e podem ser APAGADAS:
// analyzeBodyFromPhotos
// getDayFocus
// generateMondayWorkout
// generateTuesdayWorkout
// generateWednesdayWorkout
// generateThursdayWorkout
// generateFridayWorkout
// generateSaturdayWorkout
// generateSundayWorkout
