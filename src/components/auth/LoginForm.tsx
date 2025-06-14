
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function LoginForm({ onToggleForm }: { onToggleForm: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login
    if (email && password) {
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao CorpoIdeal AI!",
      });
      
      // In a real app, you would use Firebase Auth here
      localStorage.setItem('userLoggedIn', 'true');
      
      // Redirect to the root path for the 'gatekeeper' (Index.tsx) to handle navigation
      navigate('/');
    } else {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-center text-white">Entrar</CardTitle>
        <CardDescription className="text-center">
          Acesse sua conta para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5"
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
                className="bg-white/5"
              />
            </div>
            <Button type="submit" className="w-full bg-neon-lime text-black font-bold hover:bg-neon-lime/90">
              Entrar
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={onToggleForm} className="text-neon-lime hover:text-neon-lime/80">
          Não tem uma conta? Cadastre-se
        </Button>
      </CardFooter>
    </Card>
  );
}
