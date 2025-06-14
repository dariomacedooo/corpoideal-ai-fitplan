
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ProfessorInvitePage = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Digite o email do aluno para enviar o convite.",
        variant: "destructive",
      });
      return;
    }

    // Aqui faremos chamada futura para inserir convite no Supabase
    // Por hora apenas simula feedback
    toast({
      title: "Convite enviado!",
      description: `O convite para ${email} foi enviado com sucesso.`,
    });
    setEmail("");
    setTimeout(() => {
      navigate("/professor/dashboard");
    }, 1200);
  };

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      <div className="px-4 py-8 max-w-md mx-auto">
        <h2 className="font-bold text-xl text-corpoideal-purple mb-3">Convidar novo aluno</h2>
        <form onSubmit={handleSendInvite}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email do aluno"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-corpoideal-purple text-white">
            Enviar convite
          </Button>
        </form>
        <div className="mt-6">
          <Button variant="ghost" className="w-full" onClick={() => navigate("/professor/dashboard")}>
            Voltar para dashboard
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfessorInvitePage;
