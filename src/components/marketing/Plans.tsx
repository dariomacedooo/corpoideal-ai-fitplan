
import { Button } from "@/components/ui/button";

export function Plans() {
  const plans = [
    {
      name: "Essencial",
      price: "Grátis",
      color: "from-purple-soft to-purple-light",
      features: [
        "Avaliação corporal com IA",
        "Treino personalizado (básico)",
        "Monitoramento de progresso",
        "Acesso parcial a dicas premium"
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "R$ 19/mês",
      color: "from-orange-soft to-orange-light",
      features: [
        "Tudo do Essencial",
        "Planos de treino avançados",
        "Plano nutricional completo",
        "Acesso ilimitado a IA",
        "Dicas premium exclusivas"
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "R$ 39/mês",
      color: "from-purple-vibrant to-corpoideal-purple",
      features: [
        "Tudo do Pro",
        "Consultoria individual",
        "Avaliações ilimitadas",
        "Prioridade no suporte"
      ],
      highlight: false,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-card-soft to-white py-12 px-2">
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-corpoideal-dark text-center mb-5">
        Planos e preços
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-8 max-w-4xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-2xl p-8 shadow-modern border-2 border-purple-border bg-gradient-to-br ${plan.color} ${
              plan.highlight ? "scale-105 ring-4 ring-orange-300" : ""
            }`}
          >
            <h3 className="font-bold text-lg text-corpoideal-purple mb-2 uppercase tracking-wide">{plan.name}</h3>
            <div className="text-3xl font-extrabold mb-4 text-corpoideal-dark">{plan.price}</div>
            <ul className="mb-6 text-left space-y-2 text-corpoideal-dark">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-corpoideal-purple rounded-full"></span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full ${
                plan.highlight
                  ? "modern-button bg-gradient-to-r from-orange-soft to-orange-400 text-white"
                  : "modern-button"
              }`}
              disabled
            >
              {plan.highlight ? "Assinar (em breve)" : "Em breve"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
