
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WorkoutPlan } from "@/components/training/WorkoutPlan";
import { useEffect, useState } from "react";

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
  
  // This would come from a backend in a real app
  // Here we're generating mock workout plans based on the goal
  const workoutPlans = {
    'perder-peso': [
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
            name: 'Corrida Intervalada',
            sets: 10,
            reps: '30s sprint / 30s descanso',
            videoUrl: 'https://www.youtube.com/watch?v=e7m205ZIxBE',
            tip: 'Mantenha a intensidade alta nos sprints.'
          },
          {
            name: 'Pular Corda',
            sets: 3,
            reps: '2 minutos',
            videoUrl: 'https://www.youtube.com/watch?v=u3zgHI8QnqE',
            tip: 'Pule apenas o suficiente para que a corda passe por baixo.'
          },
          {
            name: 'Agachamento com Salto',
            sets: 3,
            reps: '12 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=Azl5tkCzDcc',
            tip: 'Aterrisse suavemente, amortecendo com os joelhos.'
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
            name: 'Remada com Garrafa PET',
            sets: 3,
            reps: '15 repetições',
            videoUrl: 'https://www.youtube.com/watch?v=FSGDM9-dZ9w',
            tip: 'Puxe com os cotovelos próximos ao corpo.'
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
            name: 'Polichinelo',
            sets: 3,
            reps: '30 segundos',
            videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
            tip: 'Mantenha um ritmo constante para maximizar o cardio.'
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
    ],
    'ganhar-massa': [
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
    ],
    'corrigir-postura': [
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
    ]
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
            workoutDays={workoutPlans[goal as keyof typeof workoutPlans] || workoutPlans['perder-peso']}
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
