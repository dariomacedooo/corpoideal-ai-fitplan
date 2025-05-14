import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WorkoutPlan } from "@/components/training/WorkoutPlan";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TrainingPage = () => {
  const [goal, setGoal] = useState<string>('');
  const [trainingLocation, setTrainingLocation] = useState<string>('academia');
  const [experience, setExperience] = useState<string>('intermediario');
  
  useEffect(() => {
    // Get selected goal from localStorage
    const savedGoal = localStorage.getItem('selectedGoal');
    if (savedGoal) {
      setGoal(savedGoal);
    } else {
      // Default to weight loss if no goal is set
      setGoal('perder-peso');
    }
    
    // Get user profile for training location and experience
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (profile.trainingLocation) {
        setTrainingLocation(profile.trainingLocation);
      }
      if (profile.experience) {
        setExperience(profile.experience);
      }
    }
  }, []);
  
  // Generate workout plans based on the goal and training location
  const getWorkoutPlans = () => {
    // Base workouts that will be modified based on training location
    const baseWorkouts = {
      'perder-peso': getPerderPesoPlans(),
      'ganhar-massa': getGanharMassaPlans(),
      'corrigir-postura': getCorrigirPosturaPlans(),
      'ganhar-peso': getGanharPesoPlans(),
      'manter-peso': getManterPesoPlans()
    };
    
    return baseWorkouts[goal as keyof typeof baseWorkouts] || baseWorkouts['perder-peso'];
  };
  
  // Different workout plans based on goals and training location
  const getPerderPesoPlans = () => {
    if (trainingLocation === 'academia') {
      return [
        {
          day: 'Segunda',
          focus: 'HIIT e Core',
          exercises: [
            {
              name: 'Esteira Intervalada',
              sets: 1,
              reps: '20 minutos (30s sprint/30s descanso)',
              videoUrl: 'https://www.youtube.com/watch?v=e7m205ZIxBE',
              tip: 'Alterne entre alta intensidade e recuperação ativa.',
              equipment: 'Esteira'
            },
            {
              name: 'Abdominal na Máquina',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=_O1xunCfYEM',
              tip: 'Controle o movimento na subida e na descida.',
              equipment: 'Máquina abdominal'
            },
            {
              name: 'Prancha no Bosu',
              sets: 3,
              reps: '30 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=QB8z-MMjfrE',
              tip: 'Mantenha o core engajado durante todo o exercício.',
              equipment: 'Bosu'
            },
            {
              name: 'Leg Press',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
              tip: 'Use um peso moderado e foque na intensidade.',
              equipment: 'Leg press'
            }
          ]
        },
        {
          day: 'Terça',
          focus: 'Inferior',
          exercises: [
            {
              name: 'Agachamento com Barra',
              sets: 4,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=SW_C1A-rejs',
              tip: 'Mantenha os joelhos alinhados com os pés durante o movimento.',
              equipment: 'Barra e suporte'
            },
            {
              name: 'Cadeira Extensora',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
              tip: 'Controle o movimento na descida para maior ativação muscular.',
              equipment: 'Cadeira extensora'
            },
            {
              name: 'Cadeira Flexora',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
              tip: 'Foque na contração dos isquiotibiais no topo do movimento.',
              equipment: 'Cadeira flexora'
            },
            {
              name: 'Panturrilha no Aparelho',
              sets: 3,
              reps: '20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=JbyjNymZOt0',
              tip: 'Eleve-se o mais alto possível em cada repetição.',
              equipment: 'Máquina de panturrilha'
            }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Cardio',
          exercises: [
            {
              name: 'Elíptico',
              sets: 1,
              reps: '30 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=xLc-bN0gUkw',
              tip: 'Mantenha um ritmo constante aumentando a resistência periodicamente.',
              equipment: 'Elíptico'
            },
            {
              name: 'Bicicleta Ergométrica Intervalada',
              sets: 10,
              reps: '30s sprint / 30s descanso',
              videoUrl: 'https://www.youtube.com/watch?v=NByZOAFZjfA',
              tip: 'Mantenha a intensidade alta nos sprints.',
              equipment: 'Bicicleta ergométrica'
            },
            {
              name: 'Pular Corda',
              sets: 3,
              reps: '2 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=u3zgHI8QnqE',
              tip: 'Pule apenas o suficiente para que a corda passe por baixo.',
              equipment: 'Corda'
            },
            {
              name: 'Step',
              sets: 3,
              reps: '3 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=3TXejOfMx-o',
              tip: 'Mantenha um ritmo constante e controle a respiração.',
              equipment: 'Step'
            }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Superior',
          exercises: [
            {
              name: 'Supino Reto',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
              tip: 'Mantenha os cotovelos em ângulo de 45 graus em relação ao corpo.',
              equipment: 'Barra e banco'
            },
            {
              name: 'Puxada na Máquina',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
              tip: 'Puxe com os cotovelos próximos ao corpo para maior ativação das costas.',
              equipment: 'Máquina de puxada'
            },
            {
              name: 'Elevação Lateral',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
              tip: 'Mantenha uma leve flexão nos cotovelos durante todo o movimento.',
              equipment: 'Halteres'
            },
            {
              name: 'Tríceps na Polia',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
              tip: 'Mantenha os cotovelos junto ao corpo durante todo o movimento.',
              equipment: 'Polia'
            }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Full Body',
          exercises: [
            {
              name: 'Hack Squat',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=0tn5K9NlCfo',
              tip: 'Mantenha os pés posicionados na parte baixa da plataforma para maior foco nos quadríceps.',
              equipment: 'Máquina Hack Squat'
            },
            {
              name: 'Remada Baixa',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
              tip: 'Puxe a barra em direção ao abdômen, contraindo as escápulas ao final.',
              equipment: 'Máquina de remada'
            },
            {
              name: 'Desenvolvimento na Máquina',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=Wqq-LW2_dGU',
              tip: 'Não trave os cotovelos no topo do movimento para manter tensão muscular.',
              equipment: 'Máquina de desenvolvimento'
            },
            {
              name: 'Abdominal no Aparelho',
              sets: 3,
              reps: '20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=_O1xunCfYEM',
              tip: 'Controle o movimento na descida para maior ativação abdominal.',
              equipment: 'Máquina de abdominal'
            }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Cardio e Core',
          exercises: [
            {
              name: 'Escada Ergométrica',
              sets: 1,
              reps: '20 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=xSB39wbN_eI',
              tip: 'Mantenha uma postura ereta, sem se apoiar demais no corrimão.',
              equipment: 'Escada ergométrica'
            },
            {
              name: 'Prancha com Bosu',
              sets: 3,
              reps: '45 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=QB8z-MMjfrE',
              tip: 'Mantenha o corpo alinhado e o core engajado durante todo o exercício.',
              equipment: 'Bosu'
            },
            {
              name: 'Russian Twist na Bola',
              sets: 3,
              reps: '20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
              tip: 'Gire o tronco completamente, tocando a bola nas laterais.',
              equipment: 'Bola suíça e medicine ball'
            }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso',
          exercises: [
            {
              name: 'Descanso Ativo',
              sets: 1,
              reps: 'Todo o dia',
              videoUrl: 'https://www.youtube.com/watch?v=O3FdaDNcBnU',
              tip: 'Faça atividades leves como caminhada ou yoga leve.'
            }
          ]
        }
      ];
    } else if (trainingLocation === 'casa') {
      return [
        {
          day: 'Segunda',
          focus: 'HIIT e Core',
          exercises: [
            {
              name: 'Jumping Jacks',
              sets: 3,
              reps: '30 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
              tip: 'Mantenha um ritmo constante para maximizar o cardio.'
            },
            {
              name: 'Mountain Climbers',
              sets: 3,
              reps: '30 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
              tip: 'Mantenha os quadris baixos e o core engajado.'
            },
            {
              name: 'Pranchas',
              sets: 3,
              reps: '30 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
              tip: 'Mantenha os glúteos contraídos e o corpo em linha reta.'
            },
            {
              name: 'Burpees',
              sets: 3,
              reps: '10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
              tip: 'Faça cada repetição com foco na técnica, não na velocidade.'
            }
          ]
        },
        {
          day: 'Terça',
          focus: 'Inferior',
          exercises: [
            {
              name: 'Agachamentos',
              sets: 4,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
              tip: 'Mantenha os joelhos alinhados com os pés durante o movimento.'
            },
            {
              name: 'Afundos',
              sets: 3,
              reps: '12 por perna',
              videoUrl: 'https://www.youtube.com/watch?v=3fr6yxccG1c',
              tip: 'Mantenha o tronco ereto e os joelhos a 90 graus no ponto mais baixo.'
            },
            {
              name: 'Agachamento com Salto',
              sets: 3,
              reps: '10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=Azl5tkCzDcc',
              tip: 'Aterrisse suavemente, amortecendo com os joelhos.'
            },
            {
              name: 'Elevação de Panturrilha',
              sets: 3,
              reps: '20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k',
              tip: 'Eleve-se o mais alto possível em cada repetição.'
            }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Cardio',
          exercises: [
            {
              name: 'Corrida Parada',
              sets: 3,
              reps: '1 minuto',
              videoUrl: 'https://www.youtube.com/watch?v=CxwJrzEdw1U',
              tip: 'Levante os joelhos o mais alto possível.'
            },
            {
              name: 'Polichinelo',
              sets: 3,
              reps: '1 minuto',
              videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
              tip: 'Mantenha um ritmo constante sem perder a forma.'
            },
            {
              name: 'Escalador',
              sets: 3,
              reps: '1 minuto',
              videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
              tip: 'Mantenha um ritmo rápido mas controlado.'
            },
            {
              name: 'Pular Corda (imaginária)',
              sets: 3,
              reps: '1 minuto',
              videoUrl: 'https://www.youtube.com/watch?v=u3zgHI8QnqE',
              tip: 'Simule o movimento mesmo sem a corda para o mesmo benefício cardiovascular.'
            }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Superior',
          exercises: [
            {
              name: 'Flexões',
              sets: 3,
              reps: '10-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
              tip: 'Mantenha o corpo reto como uma tábua.'
            },
            {
              name: 'Tríceps no Banco',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
              tip: 'Use uma cadeira estável ou sofá para apoiar as mãos.'
            },
            {
              name: 'Remada com Garrafa PET',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
              tip: 'Mantenha as costas retas e puxe com os cotovelos.'
            },
            {
              name: 'Elevação Lateral com Garrafa',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
              tip: 'Mantenha uma leve flexão nos cotovelos durante todo o movimento.'
            }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Full Body',
          exercises: [
            {
              name: 'Agachamento com Elevação',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=xqQZHtg5w5E',
              tip: 'Estenda completamente os braços acima da cabeça no topo do movimento.'
            },
            {
              name: 'Prancha com Toque no Ombro',
              sets: 3,
              reps: '10 por lado',
              videoUrl: 'https://www.youtube.com/watch?v=QOCn3_iOAro',
              tip: 'Evite balançar os quadris de um lado para o outro.'
            },
            {
              name: 'Flexão e Rotação',
              sets: 3,
              reps: '8 por lado',
              videoUrl: 'https://www.youtube.com/watch?v=n5GaVl1fhXI',
              tip: 'Faça uma flexão completa antes de cada rotação.'
            },
            {
              name: 'Russian Twist',
              sets: 3,
              reps: '20 repetições total',
              videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
              tip: 'Gire a partir do tronco, não apenas os braços.'
            }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Alongamento',
          exercises: [
            {
              name: 'Alongamento Completo',
              sets: 1,
              reps: '30 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=sTxC3J3gQEU',
              tip: 'Mantenha cada alongamento por pelo menos 30 segundos.'
            }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso',
          exercises: [
            {
              name: 'Descanso Ativo',
              sets: 1,
              reps: 'Todo o dia',
              videoUrl: 'https://www.youtube.com/watch?v=O3FdaDNcBnU',
              tip: 'Faça atividades leves como caminhada ou yoga leve.'
            }
          ]
        }
      ];
    } else { // ar-livre
      return [
        {
          day: 'Segunda',
          focus: 'HIIT e Core',
          exercises: [
            {
              name: 'Sprint Intervalado',
              sets: 10,
              reps: '30s sprint / 30s descanso',
              videoUrl: 'https://www.youtube.com/watch?v=e7m205ZIxBE',
              tip: 'Use um espaço aberto como um parque para os sprints.'
            },
            {
              name: 'Prancha ao ar livre',
              sets: 3,
              reps: '45 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
              tip: 'Use um tapete de exercício sobre uma superfície plana.'
            },
            {
              name: 'Mountain Climbers',
              sets: 3,
              reps: '40 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
              tip: 'Mantenha os quadris baixos e o core engajado.'
            },
            {
              name: 'Burpees',
              sets: 4,
              reps: '10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
              tip: 'Encontre um espaço plano com grama ou solo macio para os burpees.'
            }
          ]
        },
        {
          day: 'Terça',
          focus: 'Inferior',
          exercises: [
            {
              name: 'Agachamentos',
              sets: 4,
              reps: '20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
              tip: 'Use um banco de parque para agachamentos mais profundos.'
            },
            {
              name: 'Afundos em Caminhada',
              sets: 3,
              reps: '20 passos (10 por perna)',
              videoUrl: 'https://www.youtube.com/watch?v=3fr6yxccG1c',
              tip: 'Encontre um caminho plano para realizar os afundos em progressão.'
            },
            {
              name: 'Step-up em Banco',
              sets: 3,
              reps: '15 por perna',
              videoUrl: 'https://www.youtube.com/watch?v=uyTdQbWiKQs',
              tip: 'Use um banco de parque ou degraus para os step-ups.'
            },
            {
              name: 'Saltos no Banco',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=52r_Ul5k03g',
              tip: 'Certifique-se de que o banco é estável antes de fazer os saltos.'
            }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Cardio',
          exercises: [
            {
              name: 'Corrida em Trilha',
              sets: 1,
              reps: '30 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=xcPT3JjgHO0',
              tip: 'Varie o ritmo entre trechos mais rápidos e mais lentos.'
            },
            {
              name: 'Subida de Escadas',
              sets: 5,
              reps: '1-2 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=y-wV4Venusw',
              tip: 'Encontre uma escadaria em um parque ou área urbana.'
            },
            {
              name: 'Polichinelos',
              sets: 4,
              reps: '40 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
              tip: 'Faça em um espaço aberto com superfície plana.'
            },
            {
              name: 'Shuttle Run',
              sets: 5,
              reps: '30 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=McXKVBZM0QY',
              tip: 'Coloque dois objetos a 10 metros de distância e corra entre eles.'
            }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Superior',
          exercises: [
            {
              name: 'Flexões',
              sets: 4,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
              tip: 'Use um tapete de exercício sobre uma superfície plana.'
            },
            {
              name: 'Flexões em Declive',
              sets: 3,
              reps: '10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=SKPab1YWdP4',
              tip: 'Use um banco de parque para elevar os pés.'
            },
            {
              name: 'Dips em Banco',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
              tip: 'Use um banco de parque firme para os dips.'
            },
            {
              name: 'Elevação em Barra (se disponível)',
              sets: 3,
              reps: 'máximo possível',
              videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
              tip: 'Muitos parques têm barras de exercícios que você pode usar.'
            }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Full Body',
          exercises: [
            {
              name: 'Burpee com Salto',
              sets: 3,
              reps: '10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
              tip: 'Faça o movimento completo com flexão e salto.'
            },
            {
              name: 'Agachamento com Salto',
              sets: 3,
              reps: '15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=Azl5tkCzDcc',
              tip: 'Aterrisse suavemente, amortecendo com os joelhos.'
            },
            {
              name: 'Flexões com Batida de Palmas',
              sets: 3,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=LMmJsDRvs4g',
              tip: 'Para iniciantes, faça flexões normais sem as palmas.'
            },
            {
              name: 'Mountain Climbers',
              sets: 3,
              reps: '45 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
              tip: 'Mantenha um ritmo constante e o core engajado.'
            }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Trilha ou Caminhada',
          exercises: [
            {
              name: 'Caminhada em Trilha',
              sets: 1,
              reps: '60 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
              tip: 'Escolha terrenos variados para trabalhar diferentes grupos musculares.'
            },
            {
              name: 'Exercícios de Mobilidade',
              sets: 1,
              reps: '10 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=N5JmG4uhvBY',
              tip: 'Faça estes exercícios em um espaço aberto durante a caminhada.'
            }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso',
          exercises: [
            {
              name: 'Descanso Ativo',
              sets: 1,
              reps: 'Todo o dia',
              videoUrl: 'https://www.youtube.com/watch?v=O3FdaDNcBnU',
              tip: 'Faça atividades leves como caminhada ou yoga leve ao ar livre.'
            }
          ]
        }
      ];
    }
  };

  // Similar functions for other goals
  const getGanharMassaPlans = () => {
    if (trainingLocation === 'academia') {
      return [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            {
              name: 'Supino Reto',
              sets: 4,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
              tip: 'Use uma carga desafiadora que permita manter a técnica.',
              equipment: 'Barra, anilhas e banco'
            },
            {
              name: 'Supino Inclinado',
              sets: 4,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=SrqOu55lrYU',
              tip: 'Mantenha os cotovelos em um ângulo de 45 graus em relação ao corpo.',
              equipment: 'Barra, anilhas e banco inclinado'
            },
            {
              name: 'Crucifixo com Halteres',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
              tip: 'Mantenha uma leve flexão nos cotovelos durante todo o movimento.',
              equipment: 'Halteres e banco'
            },
            {
              name: 'Tríceps na Polia',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
              tip: 'Mantenha os cotovelos fixos ao lado do corpo.',
              equipment: 'Polia'
            },
            {
              name: 'Tríceps Testa',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=NIWHwlkMG_M',
              tip: 'Mantenha os cotovelos apontados para frente durante todo o movimento.',
              equipment: 'Barra EZ e banco'
            }
          ]
        },
        {
          day: 'Terça',
          focus: 'Pernas',
          exercises: [
            {
              name: 'Agachamento com Barra',
              sets: 4,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=SW_C1A-rejs',
              tip: 'Desça até que as coxas estejam paralelas ao chão.',
              equipment: 'Barra e suporte'
            },
            {
              name: 'Leg Press',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
              tip: 'Coloque os pés na posição média da plataforma para trabalhar os quadríceps e glúteos.',
              equipment: 'Leg Press'
            },
            {
              name: 'Cadeira Extensora',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
              tip: 'Estenda completamente as pernas e faça uma contração isométrica no topo.',
              equipment: 'Cadeira extensora'
            },
            {
              name: 'Cadeira Flexora',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
              tip: 'Contraia os isquiotibiais no topo do movimento.',
              equipment: 'Cadeira flexora'
            },
            {
              name: 'Panturrilha em Pé',
              sets: 4,
              reps: '15-20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=JbyjNymZOt0',
              tip: 'Eleve-se o mais alto possível em cada repetição.',
              equipment: 'Máquina de panturrilha'
            }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Descanso ou Cardio',
          exercises: [
            {
              name: 'Esteira em Baixa Intensidade',
              sets: 1,
              reps: '20-30 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
              tip: 'Mantenha um ritmo moderado para promover recuperação.',
              equipment: 'Esteira'
            }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Costas e Bíceps',
          exercises: [
            {
              name: 'Puxada pela Frente',
              sets: 4,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
              tip: 'Puxe a barra até o peito com as escápulas contraídas.',
              equipment: 'Máquina de puxada'
            },
            {
              name: 'Remada Curvada',
              sets: 4,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
              tip: 'Mantenha as costas retas e puxe a barra até o abdômen.',
              equipment: 'Barra e anilhas'
            },
            {
              name: 'Remada Unilateral',
              sets: 3,
              reps: '10-12 por braço',
              videoUrl: 'https://www.youtube.com/watch?v=dFzUjzfih7k',
              tip: 'Apoie a mão e o joelho no banco para estabilizar o corpo.',
              equipment: 'Haltere e banco'
            },
            {
              name: 'Rosca Direta',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
              tip: 'Mantenha os cotovelos fixos ao lado do corpo.',
              equipment: 'Barra e anilhas'
            },
            {
              name: 'Rosca Alternada',
              sets: 3,
              reps: '12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=sAq_ocpRh_I',
              tip: 'Gire o punho durante o movimento para maior ativação.',
              equipment: 'Halteres'
            }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Ombros e Trapézio',
          exercises: [
            {
              name: 'Desenvolvimento com Barra',
              sets: 4,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
              tip: 'Mantenha o core engajado para proteger a coluna lombar.',
              equipment: 'Barra e anilhas'
            },
            {
              name: 'Elevação Lateral',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
              tip: 'Levante os braços até a altura dos ombros.',
              equipment: 'Halteres'
            },
            {
              name: 'Elevação Frontal',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=ttvfGg9d76c',
              tip: 'Alterne os braços para maior controle do movimento.',
              equipment: 'Halteres'
            },
            {
              name: 'Encolhimento de Ombros',
              sets: 4,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=cJRVVxmytaM',
              tip: 'Erga os ombros o mais alto possível e segure por um segundo.',
              equipment: 'Halteres ou barra'
            }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Braços e Abdômen',
          exercises: [
            {
              name: 'Supino Fechado',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=nEF0bv2FW94',
              tip: 'Mantenha os cotovelos junto ao corpo durante o movimento.',
              equipment: 'Barra e banco'
            },
            {
              name: 'Rosca Scott',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
              tip: 'Não balance o corpo para ajudar no movimento.',
              equipment: 'Barra EZ e banco Scott'
            },
            {
              name: 'Tríceps na Máquina',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=YO-GPr8o_2I',
              tip: 'Estenda completamente os braços no final do movimento.',
              equipment: 'Máquina de tríceps'
            },
            {
              name: 'Abdominal na Máquina',
              sets: 4,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=_O1xunCfYEM',
              tip: 'Contraia o abdômen durante todo o movimento.',
              equipment: 'Máquina de abdominal'
            }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso',
          exercises: [
            {
              name: 'Descanso Completo',
              sets: 1,
              reps: 'Todo o dia',
              videoUrl: 'https://www.youtube.com/watch?v=O3FdaDNcBnU',
              tip: 'Permita que seu corpo se recupere completamente.'
            }
          ]
        }
      ];
    } else {
      // Default to home or outdoor workouts for ganhar-massa plans
      return [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            {
              name: 'Flexão Declinada',
              sets: 4,
              reps: '8-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=SKPab1YWdP4',
              tip: 'Eleve os pés para aumentar a intensidade.'
            },
            {
              name: 'Flexão Diamante',
              sets: 4,
              reps: '8-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=J0DnG1_S92I',
              tip: 'Forme um diamante com as mãos e mantenha os cotovelos perto do corpo.'
            },
            {
              name: 'Dips em Cadeira',
              sets: 3,
              reps: '8-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
              tip: 'Desça até que os cotovelos estejam em um ângulo de 90 graus.'
            },
            {
              name: 'Flexão com Braços Abertos',
              sets: 3,
              reps: '8-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=KyMgrVEMX7o',
              tip: 'Posicione as mãos mais afastadas que a largura dos ombros.'
            }
          ]
        },
        {
          day: 'Terça',
          focus: 'Pernas',
          exercises: [
            {
              name: 'Agachamento Búlgaro',
              sets: 4,
              reps: '8-10 por perna',
              videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
              tip: 'Mantenha o joelho da frente alinhado com o pé.'
            },
            {
              name: 'Agachamento Sumô',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=Ij7gzx1Nf8Q',
              tip: 'Mantenha os joelhos para fora durante todo o movimento.'
            },
            {
              name: 'Avanço',
              sets: 3,
              reps: '10 por perna',
              videoUrl: 'https://www.youtube.com/watch?v=3fr6yxccG1c',
              tip: 'Dê um passo grande o suficiente para que o joelho da frente forme 90 graus.'
            },
            {
              name: 'Elevação de Panturrilha',
              sets: 4,
              reps: '15-20 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=YMmgqO8Jo-k',
              tip: 'Faça uma pausa no topo de cada repetição.'
            }
          ]
        },
        {
          day: 'Quarta',
          focus: 'Descanso ou Cardio',
          exercises: [
            {
              name: 'Caminhada',
              sets: 1,
              reps: '30 minutos',
              videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
              tip: 'Mantenha um ritmo constante para promover recuperação.'
            }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Costas e Bíceps',
          exercises: [
            {
              name: 'Remada com Garrafa PET',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
              tip: 'Mantenha as costas retas e puxe com os cotovelos.'
            },
            {
              name: 'Superman',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=z6PJMT2y8GQ',
              tip: 'Levante braços e pernas simultaneamente e segure por 2 segundos.'
            },
            {
              name: 'Curl com Garrafa PET',
              sets: 4,
              reps: '10-12 por braço',
              videoUrl: 'https://www.youtube.com/watch?v=av7-8igSXTs',
              tip: 'Mantenha os cotovelos fixos ao lado do corpo.'
            },
            {
              name: 'Pranchas com Rotação',
              sets: 3,
              reps: '8-10 por lado',
              videoUrl: 'https://www.youtube.com/watch?v=wqzrb67Dwf8',
              tip: 'Gire lentamente para cada lado, mantendo o corpo estável.'
            }
          ]
        },
        {
          day: 'Sexta',
          focus: 'Ombros e Core',
          exercises: [
            {
              name: 'Elevação Lateral com Garrafa',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
              tip: 'Levante até a altura dos ombros e desça lentamente.'
            },
            {
              name: 'Elevação Frontal',
              sets: 4,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=ttvfGg9d76c',
              tip: 'Mantenha os braços retos e eleve até a altura dos ombros.'
            },
            {
              name: 'Prancha',
              sets: 3,
              reps: '30-60 segundos',
              videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
              tip: 'Mantenha o corpo em uma linha reta dos ombros aos tornozelos.'
            },
            {
              name: 'Russian Twist',
              sets: 3,
              reps: '12-15 por lado',
              videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
              tip: 'Gire todo o tronco, não apenas os braços.'
            }
          ]
        },
        {
          day: 'Sábado',
          focus: 'Full Body',
          exercises: [
            {
              name: 'Burpees',
              sets: 3,
              reps: '8-10 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
              tip: 'Faça o movimento completo com flexão e salto.'
            },
            {
              name: 'Flexões',
              sets: 3,
              reps: '10-12 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
              tip: 'Desça até o peito quase tocar o chão.'
            },
            {
              name: 'Agachamentos',
              sets: 3,
              reps: '12-15 repetições',
              videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
              tip: 'Mantenha os joelhos atrás da linha dos dedos dos pés.'
            },
            {
              name: 'Mountain Climbers',
              sets: 3,
              reps: '20 por perna',
              videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
              tip: 'Mantenha ritmo constante e o core engajado.'
            }
          ]
        },
        {
          day: 'Domingo',
          focus: 'Descanso',
          exercises: [
            {
              name: 'Descanso Completo',
              sets: 1,
              reps: 'Todo o dia',
              videoUrl: 'https://www.youtube.com/watch?v=O3FdaDNcBnU',
              tip: 'Permita que seu corpo se recupere completamente.'
            }
          ]
        }
      ];
    }
  };

  const getCorrigirPosturaPlans = () => {
    return [
      {
        day: 'Segunda',
        focus: 'Mobilidade e Postura',
        exercises: [
          {
            name: 'Cat-Cow Stretch',
            sets: 3,
            reps: '10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA',
            tip: 'Alterne entre arquear e curvar a coluna suavemente.'
          },
          {
            name: 'Bird Dog',
            sets: 3,
            reps: '10 por lado',
            videoUrl: 'https://www.youtube.com/watch?v=wiFNA3sqjCA',
            tip: 'Estique o braço e a perna opostos mantendo o tronco estável.'
          },
          {
            name: 'Wall Angels',
            sets: 3,
            reps: '10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=M_ooIhKYs7c',
            tip: 'Mantenha a coluna e a parte de trás da cabeça em contato com a parede.'
          },
          {
            name: 'Face Pull com Banda',
            sets: 3,
            reps: '15 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=V8dZ3pyiCBo',
            tip: 'Puxe a banda para as orelhas, abrindo os cotovelos.'
          }
        ]
      },
      {
        day: 'Terça',
        focus: 'Core e Estabilização',
        exercises: [
          {
            name: 'Dead Bug',
            sets: 3,
            reps: '10 por lado',
            videoUrl: 'https://www.youtube.com/watch?v=4XLEnwUr1d8',
            tip: 'Mantenha as costas pressionadas contra o chão durante todo o movimento.'
          },
          {
            name: 'Prancha',
            sets: 3,
            reps: '30-60 segundos',
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            tip: 'Mantenha o corpo em uma linha reta e o core engajado.'
          },
          {
            name: 'Superman',
            sets: 3,
            reps: '10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=z6PJMT2y8GQ',
            tip: 'Levante braços e pernas simultaneamente e segure por 3 segundos.'
          },
          {
            name: 'Glute Bridge',
            sets: 3,
            reps: '15 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=GkqI7dQJ4WM',
            tip: 'Aperte os glúteos no topo do movimento e mantenha por 2 segundos.'
          }
        ]
      },
      {
        day: 'Quarta',
        focus: 'Alongamento',
        exercises: [
          {
            name: 'Alongamento de Peitorais',
            sets: 3,
            reps: '30 segundos por lado',
            videoUrl: 'https://www.youtube.com/watch?v=SV7l1sfEmO0',
            tip: 'Sinta o alongamento na parte anterior do ombro e peito.'
          },
          {
            name: 'Alongamento de Quadril',
            sets: 3,
            reps: '30 segundos por lado',
            videoUrl: 'https://www.youtube.com/watch?v=YQmpO9VT2X4',
            tip: 'Mantenha o alongamento sem forçar além do limite confortável.'
          },
          {
            name: 'Child\'s Pose',
            sets: 3,
            reps: '30 segundos',
            videoUrl: 'https://www.youtube.com/watch?v=eqVMAPM00DM',
            tip: 'Respire profundamente e relaxe os ombros.'
          },
          {
            name: 'Rotação Torácica',
            sets: 3,
            reps: '10 por lado',
            videoUrl: 'https://www.youtube.com/watch?v=Yl8_LGnjnX4',
            tip: 'Gire a partir do tronco, mantendo os quadris estáveis.'
          }
        ]
      },
      {
        day: 'Quinta',
        focus: 'Fortalecimento Posterior',
        exercises: [
          {
            name: 'Retração de Escápula',
            sets: 3,
            reps: '15 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=LiJPOKeQ_Yk',
            tip: 'Aperte as escápulas juntas como se estivesse segurando um lápis entre elas.'
          },
          {
            name: 'Y-T-W-L com Peso Leve',
            sets: 3,
            reps: '8 de cada',
            videoUrl: 'https://www.youtube.com/watch?v=3ZwxgL61FKI',
            tip: 'Mantenha as escápulas deprimidas durante todos os movimentos.'
          },
          {
            name: 'Remada Invertida',
            sets: 3,
            reps: '12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
            tip: 'Puxe os cotovelos para trás e aperte as escápulas no final.'
          },
          {
            name: 'Extensão de Coluna',
            sets: 3,
            reps: '12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=p39DJC-iFWY',
            tip: 'Levante apenas até a altura confortável, sem hiperlordose.'
          }
        ]
      },
      {
        day: 'Sexta',
        focus: 'Mobilidade Geral',
        exercises: [
          {
            name: 'Círculos de Ombros',
            sets: 2,
            reps: '10 em cada direção',
            videoUrl: 'https://www.youtube.com/watch?v=JaCy7RMRkPU',
            tip: 'Faça círculos grandes e lentos.'
          },
          {
            name: 'Rotações de Quadril',
            sets: 2,
            reps: '10 em cada direção',
            videoUrl: 'https://www.youtube.com/watch?v=Lwy2skCQbDc',
            tip: 'Movimente os quadris em círculos completos.'
          },
          {
            name: 'Mobilidade de Tornozelo',
            sets: 2,
            reps: '10 em cada direção',
            videoUrl: 'https://www.youtube.com/watch?v=_xJLWnZ2Tnc',
            tip: 'Mova o tornozelo em todas as direções.'
          },
          {
            name: 'Chin Tucks',
            sets: 3,
            reps: '10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=wQylqaCl8Zo',
            tip: 'Puxe o queixo para trás como se estivesse fazendo um "duplo queixo".'
          }
        ]
      },
      {
        day: 'Sábado',
        focus: 'Fortalecimento Funcional',
        exercises: [
          {
            name: 'Agachamento com Postura',
            sets: 3,
            reps: '12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
            tip: 'Mantenha o peito para cima e a coluna neutra.'
          },
          {
            name: 'Prancha Lateral',
            sets: 2,
            reps: '30 segundos por lado',
            videoUrl: 'https://www.youtube.com/watch?v=6HMYVyQA-C0',
            tip: 'Mantenha o corpo em linha reta e o core engajado.'
          },
          {
            name: 'Ponte Unilateral',
            sets: 3,
            reps: '10 por perna',
            videoUrl: 'https://www.youtube.com/watch?v=3NXv0Nany-Q',
            tip: 'Mantenha os quadris nivelados ao levantar uma perna.'
          },
          {
            name: 'Wall Slide',
            sets: 3,
            reps: '10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=M_ooIhKYs7c',
            tip: 'Mantenha contato da coluna e braços com a parede.'
          }
        ]
      },
      {
        day: 'Domingo',
        focus: 'Caminhada Postural',
        exercises: [
          {
            name: 'Caminhada com Foco na Postura',
            sets: 1,
            reps: '30 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=OJcbDpVRGp8',
            tip: 'Caminhe com atenção à postura: ombros para trás, queixo paralelo ao chão, core engajado.'
          }
        ]
      }
    ];
  };

  const getGanharPesoPlans = () => {
    return [
      {
        day: 'Segunda',
        focus: 'Força e Massa Total',
        exercises: [
          {
            name: 'Agachamento com Peso',
            sets: 4,
            reps: '6-8 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
            tip: 'Use o peso máximo que permita manter a técnica correta.'
          },
          {
            name: 'Supino',
            sets: 4,
            reps: '6-8 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
            tip: 'Concentre-se em movimentos controlados e lentos.'
          },
          {
            name: 'Remada',
            sets: 4,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
            tip: 'Puxe o peso com controle e aperte as escápulas no final.'
          },
          {
            name: 'Shoulder Press',
            sets: 3,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
            tip: 'Mantenha o core engajado para proteger a coluna.'
          }
        ]
      },
      {
        day: 'Terça',
        focus: 'Alimentação e Recuperação',
        exercises: [
          {
            name: 'Caminhada Leve',
            sets: 1,
            reps: '20 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
            tip: 'Foque em consumir mais calorias do que gasta hoje.'
          },
          {
            name: 'Alongamento Completo',
            sets: 1,
            reps: '15 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=sTxC3J3gQEU',
            tip: 'Alongue todos os principais grupos musculares.'
          }
        ]
      },
      {
        day: 'Quarta',
        focus: 'Pernas e Core',
        exercises: [
          {
            name: 'Leg Press',
            sets: 4,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
            tip: 'Use um peso desafiador com boa técnica.'
          },
          {
            name: 'Extensão de Pernas',
            sets: 3,
            reps: '10-12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
            tip: 'Concentre-se na contração do quadríceps no topo.'
          },
          {
            name: 'Flexão de Pernas',
            sets: 3,
            reps: '10-12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
            tip: 'Trabalhe os isquiotibiais com controle total.'
          },
          {
            name: 'Prancha',
            sets: 3,
            reps: '30-45 segundos',
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            tip: 'Mantenha a postura correta durante toda a execução.'
          }
        ]
      },
      {
        day: 'Quinta',
        focus: 'Alimentação e Recuperação',
        exercises: [
          {
            name: 'Caminhada Leve',
            sets: 1,
            reps: '20 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
            tip: 'Consuma refeições ricas em proteínas e carboidratos.'
          },
          {
            name: 'Alongamento Completo',
            sets: 1,
            reps: '15 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=sTxC3J3gQEU',
            tip: 'Priorize qualidade do sono para recuperação muscular.'
          }
        ]
      },
      {
        day: 'Sexta',
        focus: 'Superior e Braços',
        exercises: [
          {
            name: 'Supino Inclinado',
            sets: 4,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=SrqOu55lrYU',
            tip: 'Foque na parte superior do peito.'
          },
          {
            name: 'Puxada Alta',
            sets: 4,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
            tip: 'Puxe a barra até o peito com as escápulas contraídas.'
          },
          {
            name: 'Rosca Direta',
            sets: 3,
            reps: '10-12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
            tip: 'Mantenha os cotovelos estáveis durante o movimento.'
          },
          {
            name: 'Tríceps Corda',
            sets: 3,
            reps: '10-12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
            tip: 'Estenda completamente os braços sem travar os cotovelos.'
          }
        ]
      },
      {
        day: 'Sábado',
        focus: 'Força Total',
        exercises: [
          {
            name: 'Levantamento Terra',
            sets: 4,
            reps: '6-8 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
            tip: 'Mantenha a coluna neutra e use as pernas para levantar o peso.'
          },
          {
            name: 'Desenvolvimento de Ombros',
            sets: 4,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
            tip: 'Mantenha o core engajado para proteger a coluna lombar.'
          },
          {
            name: 'Remada Sentada',
            sets: 4,
            reps: '8-10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
            tip: 'Puxe com os cotovelos para trás, apertando as escápulas.'
          },
          {
            name: 'Panturrilha em Pé',
            sets: 4,
            reps: '15-20 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=JbyjNymZOt0',
            tip: 'Eleve-se o mais alto possível em cada repetição.'
          }
        ]
      },
      {
        day: 'Domingo',
        focus: 'Descanso e Alimentação',
        exercises: [
          {
            name: 'Descanso Ativo',
            sets: 1,
            reps: 'Todo o dia',
            videoUrl: 'https://www.youtube.com/watch?v=O3FdaDNcBnU',
            tip: 'Foque na ingestão calórica e proteica adequada.'
          }
        ]
      }
    ];
  };

  const getManterPesoPlans = () => {
    return [
      {
        day: 'Segunda',
        focus: 'Cardio e Força',
        exercises: [
          {
            name: 'Corrida Intervalada',
            sets: 1,
            reps: '20 minutos (1 min rápido, 1 min lento)',
            videoUrl: 'https://www.youtube.com/watch?v=e7m205ZIxBE',
            tip: 'Alterne entre esforço de 80% e 60% da sua capacidade.'
          },
          {
            name: 'Agachamento',
            sets: 3,
            reps: '12-15 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
            tip: 'Mantenha o peso nos calcanhares durante o movimento.'
          },
          {
            name: 'Flexões',
            sets: 3,
            reps: '10-12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
            tip: 'Mantenha o core engajado durante todo o exercício.'
          },
          {
            name: 'Prancha',
            sets: 3,
            reps: '30-45 segundos',
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            tip: 'Mantenha o corpo alinhado dos ombros aos calcanhares.'
          }
        ]
      },
      {
        day: 'Terça',
        focus: 'Flexibilidade e Mobilidade',
        exercises: [
          {
            name: 'Yoga Básico',
            sets: 1,
            reps: '30 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
            tip: 'Foque na respiração e na execução correta das posturas.'
          },
          {
            name: 'Alongamento Dinâmico',
            sets: 1,
            reps: '15 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=nPHfEnZD1Wk',
            tip: 'Faça movimentos controlados, aumentando a amplitude gradualmente.'
          }
        ]
      },
      {
        day: 'Quarta',
        focus: 'Força Total',
        exercises: [
          {
            name: 'Agachamento com Salto',
            sets: 3,
            reps: '10 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=Azl5tkCzDcc',
            tip: 'Aterrisse suavemente, amortecendo com os joelhos.'
          },
          {
            name: 'Remada',
            sets: 3,
            reps: '12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
            tip: 'Mantenha as costas retas e puxe com os cotovelos.'
          },
          {
            name: 'Supino ou Flexões',
            sets: 3,
            reps: '12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
            tip: 'Mantenha um ritmo controlado de execução.'
          },
          {
            name: 'Russian Twist',
            sets: 3,
            reps: '20 repetições totais',
            videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
            tip: 'Gire a partir do tronco, não apenas os braços.'
          }
        ]
      },
      {
        day: 'Quinta',
        focus: 'Cardio Moderado',
        exercises: [
          {
            name: 'Caminhada/Corrida',
            sets: 1,
            reps: '30 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
            tip: 'Mantenha um ritmo constante em que ainda consiga conversar.'
          },
          {
            name: 'Circuito de Mobilidade',
            sets: 1,
            reps: '15 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=N5JmG4uhvBY',
            tip: 'Realize movimentos que trabalham as articulações em suas amplitudes.'
          }
        ]
      },
      {
        day: 'Sexta',
        focus: 'Força e Resistência',
        exercises: [
          {
            name: 'Circuito Full Body',
            sets: 4,
            reps: '45 segundos por exercício',
            videoUrl: 'https://www.youtube.com/watch?v=CBr_-P1R9KU',
            tip: 'Faça cada exercício por 45 segundos com 15 segundos de descanso entre eles.'
          },
          {
            name: 'Core Training',
            sets: 3,
            reps: '45 segundos por exercício',
            videoUrl: 'https://www.youtube.com/watch?v=DHD1-2P94DI',
            tip: 'Inclua diferentes exercícios para abdômen, lombar e estabilizadores.'
          }
        ]
      },
      {
        day: 'Sábado',
        focus: 'Atividade Recreativa',
        exercises: [
          {
            name: 'Esporte ou Atividade de Lazer',
            sets: 1,
            reps: '60 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=jGc3KZscPF4',
            tip: 'Escolha uma atividade que você goste: ciclismo, natação, esportes coletivos, etc.'
          }
        ]
      },
      {
        day: 'Domingo',
        focus: 'Descanso Ativo',
        exercises: [
          {
            name: 'Caminhada Leve',
            sets: 1,
            reps: '30 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=3Ka7B3hCg08',
            tip: 'Faça uma caminhada relaxante em um parque ou área verde.'
          },
          {
            name: 'Alongamento Completo',
            sets: 1,
            reps: '15 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=sTxC3J3gQEU',
            tip: 'Alongue todos os principais grupos musculares.'
          }
        ]
      }
    ];
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Seu Plano de Treino</h1>
        <p className="text-gray-600 mb-6">
          Criado especialmente para você com base nos seus objetivos e análise corporal.
        </p>
        
        {goal && (
          <WorkoutPlan 
            goal={goal}
            workoutDays={getWorkoutPlans()}
            trainingLocation={trainingLocation}
            experience={experience}
          />
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default TrainingPage;
