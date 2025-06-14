
import { Instagram, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer id="footer" className="bg-black border-t border-white/10 py-12">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
                <div className="flex justify-center gap-6 mb-6">
                    <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-neon-lime transition-colors"><Instagram /></a>
                    <a href="#" aria-label="Youtube" className="text-muted-foreground hover:text-neon-lime transition-colors"><Youtube /></a>
                </div>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
                    <a href="#" className="hover:text-neon-lime transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-neon-lime transition-colors">Termos de Uso</a>
                    <a href="#" className="hover:text-neon-lime transition-colors">Suporte</a>
                </div>
                <p className="text-sm">Contato: <a href="mailto:suporte@appfitness.com" className="hover:text-neon-lime transition-colors">suporte@appfitness.com</a></p>
                <p className="text-xs mt-6">&copy; {new Date().getFullYear()} CorpoIdeal. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}
