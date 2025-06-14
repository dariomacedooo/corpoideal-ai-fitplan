import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RegisterForm({ onToggleForm }: { onToggleForm: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'aluno' | 'professor'>('aluno');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate registration
    toast({
      title: "Cadastro realizado com sucesso",
      description: "Bem-vindo ao CorpoIdeal AI!",
    });

    // Salva os dados de cadastro no localStorage, incluindo o papel (role)
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem(
      'userProfile',
      JSON.stringify({
        name,
        email,
        role, // salva o papel
        profileCompleted: false,
      })
    );

    // Redireciona conforme o papel
    if (role === 'professor') {
      navigate('/professor/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-corpoideal-purple">Cadastre-se</CardTitle>
        <CardDescription className="text-center">
          Crie sua conta para começar sua jornada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Você é:</Label>
              <RadioGroup value={role} onValueChange={v => setRole(v as 'aluno' | 'professor')} className="flex gap-4">
                <div>
                  <RadioGroupItem value="aluno" id="aluno" className="peer sr-only" />
                  <Label htmlFor="aluno" className="flex items-center gap-2 cursor-pointer">
                    <span className="block w-3 h-3 rounded-full border border-corpoideal-purple bg-white peer-data-[state=checked]:bg-corpoideal-purple mr-1"></span>
                    Aluno
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="professor" id="professor" className="peer sr-only" />
                  <Label htmlFor="professor" className="flex items-center gap-2 cursor-pointer">
                    <span className="block w-3 h-3 rounded-full border border-corpoideal-purple bg-white peer-data-[state=checked]:bg-corpoideal-purple mr-1"></span>
                    Professor
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple">
              Cadastrar
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={onToggleForm}>
          Já possui uma conta? Entre
        </Button>
      </CardFooter>
    </Card>
  );
}
