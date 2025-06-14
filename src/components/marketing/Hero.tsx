
import { Button } from "@/components/ui/button";

export function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="hero" className="relative w-full pt-20 h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1950&q=80"
          alt="Pessoas treinando em uma academia moderna"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>
      <div className="relative z-10 px-4 max-w-4xl">
        <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
          Transforme seu Corpo. Alcance seu Melhor.
        </h1>
        <p className="text-lg md:text-xl text-white/80 font-light mb-8 drop-shadow animate-fade-in" style={{animationDelay: '0.4s'}}>
          Treinos, dieta personalizada e motivação. Tudo em um só lugar.
        </p>
        <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Button
              className="text-lg px-10 py-6 uppercase tracking-wide font-bold bg-neon-lime text-black hover:bg-neon-lime/90"
              onClick={onCTA}
            >
              Comece Agora – É Grátis!
            </Button>
        </div>
      </div>
    </section>
  );
}
