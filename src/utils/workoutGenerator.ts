import { scientificWorkouts } from '@/data/scientificWorkouts';
import { femaleWorkoutPlans, femaleExercises } from '@/data/femaleWorkouts';

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: any[];
}

export const generateWorkoutPlan = (
  goal: string,
  experience: string,
  location: string,
  sex: string,
  age: number,
  trainingDays: string[]
): WorkoutDay[] => {

  // 1. LÓGICA ESPECÍFICA PARA O SEXO FEMININO
  if (sex === 'feminino') {
    const getAgeGroup = (age: number): string => {
      if (age >= 17 && age <= 25) return '17-25';
      if (age >= 26 && age <= 39) return '26-39';
      if (age >= 40 && age <= 59) return '40-59';
      if (age >= 60) return '60+';
      return '17-25'; // Default
    };

    const ageGroup = getAgeGroup(age);
    const plansForAge = femaleWorkoutPlans[ageGroup as keyof typeof femaleWorkoutPlans];

    if (plansForAge) {
      const mainPlanTemplate = plansForAge.find(p => p.objective.includes(goal)) || plansForAge[0];

      const workoutBlocks: { [key: string]: Omit<WorkoutDay, 'day'> } = {
        'A': {
          focus: `${mainPlanTemplate.name}`,
          exercises: mainPlanTemplate.exercises,
        },
        'B': {
          focus: 'Superiores e Core',
          exercises: [
            ...femaleExercises.superiores.filter(ex => ex.difficulty !== (experience === 'iniciante' ? 'avancado' : 'iniciante')).slice(0, 3),
            ...femaleExercises.abdomen.filter(ex => ex.difficulty !== (experience === 'iniciante' ? 'avancado' : 'iniciante')).slice(0, 2),
          ],
        },
        'C': {
          focus: 'Cardio e Funcional',
          exercises: [
            ...femaleExercises.cardio.slice(0, 2),
            ...femaleExercises.abdomen.slice(0, 1),
          ],
        },
      };

      const splitMap: { [key: number]: string[] } = {
        1: ['A'],
        2: ['A', 'B'],
        3: ['A', 'B', 'A'],
        4: ['A', 'B', 'A', 'C'],
        5: ['A', 'B', 'A', 'B', 'C'],
        6: ['A', 'B', 'A', 'C', 'A', 'B'],
        7: ['A', 'B', 'C', 'A', 'B', 'A', 'C'],
      };

      const weeklySplit = splitMap[trainingDays.length] || ['A', 'B', 'C'];

      return trainingDays.map((day, index) => {
        const blockKey = weeklySplit[index];
        const workoutDay = workoutBlocks[blockKey];
        return {
          ...workoutDay,
          day: day,
        };
      });
    }
  }

  // 2. LÓGICA PARA O SEXO MASCULINO E FALLBACK
  const effectiveGoal = goal === 'ganhar-massa' ? 'bulking' : goal;
  const trainingConfig = scientificWorkouts[experience as keyof typeof scientificWorkouts]?.[effectiveGoal as keyof typeof scientificWorkouts[typeof experience]]?.[location as keyof typeof scientificWorkouts[typeof experience][typeof effectiveGoal]];
  const daysPerWeek = trainingDays.length;

  if (trainingConfig?.divisoes?.[daysPerWeek] && trainingConfig?.blocos) {
    const divisaoSemanal = trainingConfig.divisoes[daysPerWeek];
    return trainingDays.map((day, index) => {
      const blocoKey = divisaoSemanal[index % divisaoSemanal.length] as keyof typeof trainingConfig.blocos;
      const workoutBlock = trainingConfig.blocos[blocoKey];
      return {
        day: day,
        focus: workoutBlock.focus,
        exercises: workoutBlock.exercises,
      };
    });
  }

  // 3. PLANO PADRÃO DE FALLBACK PARA EVITAR TELA EM BRANCO
  console.warn(`Nenhuma configuração de treino encontrada para: ${sex}, ${experience}, ${goal}, ${location}, ${daysPerWeek} dias. Usando plano padrão.`);
  const fallbackPlan = scientificWorkouts.iniciante['ganhar-massa'].academia;
  const fallbackDivisao = fallbackPlan.divisoes[3]; 
  return trainingDays.map((day, index) => ({
    day: day,
    focus: "Full Body - Padrão",
    exercises: fallbackPlan.blocos[fallbackDivisao[index % fallbackDivisao.length]].exercises,
  }));
}; // <<== A função termina aqui corretamente.
