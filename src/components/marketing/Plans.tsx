
import { Button } from "@/components/ui/button";

export function Plans({ onSelectPlan }: { onSelectPlan: () => void }) {
  const plans = [
    {
      name: "Starter",
      price: "R$ 29",
      period: "/mês",
      features: [
        "Acesso básico a treinos",
        "Dietas padrão",
        "Suporte via comunidade",
        "Acompanhamento básico",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "R$ 59",
      period: "/mês",
      features: [
        "Tudo do Starter",
        "Personalização completa",
        "Suporte prioritário",
        "Acesso a todas as receitas",
      ],
      highlight: true,
    },
    {
      name: "VIP",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Tudo do Pro",
        "Consultor fitness dedicado",
        "Lives e aulas exclusivas",
        "Plano de suplementação",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="plans" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-12">
          Escolha o plano ideal para você
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col rounded-xl p-8 border ${
                plan.highlight ? "border-neon-lime ring-2 ring-neon-lime shadow-neon-lime/20 shadow-lg" : "border-white/10"
              } bg-gray-900/50 hover:border-neon-lime/50 transition-all duration-300 ${plan.highlight ? 'scale-105' : 'hover:scale-105'}`}
            >
              <h3 className="font-bold text-xl text-white font-montserrat mb-2 uppercase tracking-wide">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mb-8 text-left space-y-3 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={onSelectPlan}
                className={`w-full mt-auto font-bold py-3 ${
                  plan.highlight
                    ? "bg-neon-lime text-black hover:bg-neon-lime/90"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Quero Esse Plano
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
