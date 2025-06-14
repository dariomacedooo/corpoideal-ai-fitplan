
import { Button } from "@/components/ui/button";

export function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="hero" className="relative w-full pt-16 sm:pt-20 h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1950&q=80"
          alt="Pessoas treinando em uma academia moderna"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight animate-fade-in" style={{animationDelay: '0.2s'}}>
          <span className="bg-gradient-to-r from-white via-neon-lime to-white bg-clip-text text-transparent drop-shadow-lg">
            Transforme
          </span>{" "}
          seu Corpo.{" "}
          <span className="bg-gradient-to-r from-neon-lime via-white to-neon-lime bg-clip-text text-transparent drop-shadow-lg">
            Alcance
          </span>{" "}
          seu Melhor.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-8 leading-relaxed animate-fade-in px-4" style={{animationDelay: '0.4s'}}>
          <span className="bg-gradient-to-r from-white to-neon-lime/80 bg-clip-text text-transparent font-medium">
            Treinos, dieta personalizada
          </span>{" "}
          e motivação. Tudo em um só lugar.
        </p>
        <div className="animate-fade-in px-4" style={{animationDelay: '0.6s'}}>
          <Button
            className="text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 uppercase tracking-wide font-bold bg-gradient-to-r from-neon-lime to-green-400 text-black hover:from-green-400 hover:to-neon-lime transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-neon-lime/50 border-2 border-neon-lime/30 w-full sm:w-auto max-w-sm"
            onClick={onCTA}
          >
            <span className="drop-shadow-sm">
              Comece Agora – É Grátis!
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
