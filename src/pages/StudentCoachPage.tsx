
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UserCheck, UserX, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/useAuth';

const StudentCoachPage = () => {
  const { profile, loading } = useAuth();
  const [coach, setCoach] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCoach, setLoadingCoach] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile?.role !== 'aluno') {
      navigate('/home');
      return;
    }

    if (profile?.coach_id) {
      fetchCoach();
    } else {
      setLoadingCoach(false);
    }
  }, [profile, loading, navigate]);

  const fetchCoach = async () => {
    if (!profile?.coach_id) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profile.coach_id)
        .single();

      if (error) {
        console.error('Error fetching coach:', error);
      } else {
        setCoach(data);
      }
    } catch (error) {
      console.error('Error fetching coach:', error);
    } finally {
      setLoadingCoach(false);
    }
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !profile?.id) return;

    setIsLoading(true);

    try {
      // Check if the email belongs to a professor
      const { data: coachProfile } = await supabase
        .from('profiles')
        .select('id, name, role')
        .eq('email', email.trim())
        .eq('role', 'professor')
        .single();

      if (!coachProfile) {
        toast({
          title: "Professor não encontrado",
          description: "Não foi encontrado um professor com este email.",
          variant: "destructive",
        });
        return;
      }

      // Update student's coach_id
      const { error } = await supabase
        .from('profiles')
        .update({ coach_id: coachProfile.id })
        .eq('id', profile.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Convite enviado com sucesso!",
        description: `Você foi vinculado ao professor ${coachProfile.name}.`,
      });

      // Refresh the page to show the new coach
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Erro ao enviar convite",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoach = async () => {
    if (!profile?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ coach_id: null })
        .eq('id', profile.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Professor removido",
        description: "Você não está mais vinculado a um professor.",
      });

      setCoach(null);
    } catch (error: any) {
      toast({
        title: "Erro ao remover professor",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  if (loading || loadingCoach) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple"></div>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-corpoideal-purple mb-2">
            Meu Professor
          </h1>
          <p className="text-gray-600">
            Gerencie a conexão com seu professor pessoal.
          </p>
        </div>

        {coach ? (
          /* Current Coach */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-500" />
                Professor Atual
              </CardTitle>
              <CardDescription>
                Você está conectado com um professor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-corpoideal-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {coach.name?.charAt(0).toUpperCase() || 'P'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{coach.name || 'Professor'}</h3>
                    <p className="text-sm text-gray-500">{coach.email}</p>
                    <p className="text-xs text-green-600 font-medium">Conectado</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveCoach}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <UserX className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Invite Coach Form */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Conectar com Professor
              </CardTitle>
              <CardDescription>
                Digite o email do seu professor para se conectar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email do Professor</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="professor@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  {isLoading ? "Conectando..." : "Conectar com Professor"}
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Como funciona?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Digite o email do seu professor</li>
                  <li>• Ele poderá ver seu progresso e criar planos para você</li>
                  <li>• Você pode remover a conexão a qualquer momento</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default StudentCoachPage;
