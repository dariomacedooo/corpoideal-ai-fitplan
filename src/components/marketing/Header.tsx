
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function Header({ onLogin, onRegister }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto h-20 flex justify-between items-center px-4">
        <a href="#" className="text-2xl font-bold font-montserrat text-neon-lime">
          CorpoIdeal
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#benefits" className="hover:text-neon-lime transition-colors">Sobre</a>
          <a href="#plans" className="hover:text-neon-lime transition-colors">Planos</a>
          <a href="#testimonials" className="hover:text-neon-lime transition-colors">Resultados</a>
          <a href="#footer" className="hover:text-neon-lime transition-colors">Contato</a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" onClick={onLogin} className="hover:bg-white/10 hover:text-white">Login</Button>
          <Button onClick={onRegister} className="bg-neon-lime text-black font-bold hover:bg-neon-lime/90">Cadastre-se</Button>
        </div>
        <div className="md:hidden">
            <Button onClick={onRegister} size="sm" className="bg-neon-lime text-black font-bold hover:bg-neon-lime/90">Começar</Button>
        </div>
      </div>
    </header>
  );
}
