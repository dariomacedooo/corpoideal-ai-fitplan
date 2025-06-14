
import { Button } from "@/components/ui/button";

export function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative w-full h-[480px] md:h-[540px] lg:h-[640px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-purple-vibrant via-purple-deep to-corpoideal-purple">
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80"
        alt="Fitness Woman"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="relative z-10 text-center px-5 max-w-3xl">
        <h1 className="font-montserrat text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          CorpoIdeal AI – Seu Fitness do Jeito Inteligente
        </h1>
        <p className="text-lg md:text-2xl font-inter text-white/90 font-medium mb-6 drop-shadow">
          Transforme seu corpo com avaliações inteligentes e planos personalizados de treino e dieta. Inteligência, praticidade e resultados premium!
        </p>
        <Button
          className="modern-button text-lg px-8 py-4 uppercase tracking-wide"
          onClick={onCTA}
        >
          Comece Agora
        </Button>
      </div>
    </section>
  );
}
