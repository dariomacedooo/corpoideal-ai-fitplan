
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export function RegisterForm({ onToggleForm }: { onToggleForm: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'aluno' | 'professor'>('aluno');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
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
      
      if (password.length < 6) {
        toast({
          title: "Erro no cadastro",
          description: "A senha deve ter pelo menos 6 caracteres.",
          variant: "destructive",
        });
        return;
      }
      
      // Sign up without email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        // Update the profile with the selected role
        await supabase
          .from('profiles')
          .update({ role, name })
          .eq('id', data.user.id);

        toast({
          title: "Cadastro realizado com sucesso",
          description: "Bem-vindo ao CorpoIdeal AI!",
        });
        
        // Direct navigation based on role
        if (role === 'professor') {
          navigate('/coach/dashboard');
        } else {
          navigate('/profile');
        }
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white mb-2">Cadastre-se</CardTitle>
        <CardDescription className="text-gray-300">
          Crie sua conta e comece sua transformação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Nome completo</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-lime"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-lime"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Tipo de conta</Label>
            <RadioGroup value={role} onValueChange={(value: 'aluno' | 'professor') => setRole(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aluno" id="aluno" className="border-white text-neon-lime" />
                <Label htmlFor="aluno" className="text-white">Aluno</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professor" id="professor" className="border-white text-neon-lime" />
                <Label htmlFor="professor" className="text-white">Professor</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-lime"
              required
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirme sua senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-lime"
              required
              minLength={6}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-neon-lime text-black font-bold hover:bg-neon-lime/90 disabled:opacity-50"
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={onToggleForm} 
          className="text-neon-lime hover:text-neon-lime/80"
        >
          Já possui uma conta? Entre
        </Button>
      </CardFooter>
    </Card>
  );
}
