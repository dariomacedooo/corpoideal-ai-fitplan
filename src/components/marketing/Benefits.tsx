
import { Dumbbell, UtensilsCrossed, TrendingUp, HeartPulse } from "lucide-react";

const benefits = [
    {
        icon: Dumbbell,
        title: "Treinos Personalizados",
        description: "Algoritmos que criam treinos sob medida para seus objetivos e corpo.",
    },
    {
        icon: UtensilsCrossed,
        title: "Planos Alimentares",
        description: "Dietas flexíveis e acessíveis, criadas para otimizar seus resultados.",
    },
    {
        icon: TrendingUp,
        title: "Acompanhamento Diário",
        description: "Monitore seu progresso com gráficos e métricas fáceis de entender.",
    },
    {
        icon: HeartPulse,
        title: "Resultados Saudáveis",
        description: "Foco na sua saúde e bem-estar, para uma transformação sustentável.",
    },
]

export function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center p-6 border border-white/10 rounded-lg hover:border-neon-lime/50 transition-all duration-300 hover:bg-white/5">
                    <benefit.icon className="w-12 h-12 mb-4 text-neon-lime" strokeWidth={1.5}/>
                    <h3 className="text-xl font-bold font-montserrat mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
