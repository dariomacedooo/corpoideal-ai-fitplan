
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Invitation {
  id: string;
  invitee_email: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

const CoachInvites = () => {
  const { profile, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile?.role !== 'professor') {
      navigate('/home');
      return;
    }

    if (profile?.id) {
      fetchInvitations();
    }
  }, [profile, loading, navigate]);

  const fetchInvitations = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('inviter_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching invitations:', error);
      } else {
        setInvitations(data || []);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoadingInvites(false);
    }
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !profile?.id) return;

    setIsLoading(true);

    try {
      // Check if user already exists with this email
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, coach_id')
        .eq('email', email.trim())
        .single();

      if (existingProfile) {
        if (existingProfile.coach_id === profile.id) {
          toast({
            title: "Aluno já vinculado",
            description: "Este aluno já está vinculado a você.",
            variant: "destructive",
          });
          return;
        } else if (existingProfile.coach_id) {
          toast({
            title: "Aluno já tem professor",
            description: "Este aluno já está vinculado a outro professor.",
            variant: "destructive",
          });
          return;
        }

        // User exists but has no coach, link directly
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ coach_id: profile.id })
          .eq('id', existingProfile.id);

        if (updateError) {
          throw updateError;
        }

        toast({
          title: "Aluno vinculado com sucesso!",
          description: `${email} foi vinculado como seu aluno.`,
        });
      } else {
        // Create invitation for non-existing user
        const { error } = await supabase
          .from('invitations')
          .insert([
            {
              inviter_id: profile.id,
              invitee_email: email.trim(),
              status: 'pending'
            }
          ]);

        if (error) {
          throw error;
        }

        toast({
          title: "Convite enviado!",
          description: `Um convite foi enviado para ${email}.`,
        });
      }

      setEmail('');
      fetchInvitations();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'accepted':
        return 'Aceito';
      case 'declined':
        return 'Recusado';
      default:
        return 'Desconhecido';
    }
  };

  if (loading) {
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
          <Button
            variant="ghost"
            onClick={() => navigate('/coach/dashboard')}
            className="mb-4 -ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <h1 className="text-2xl font-bold text-corpoideal-purple mb-2">
            Convites de Alunos
          </h1>
          <p className="text-gray-600">
            Envie convites para novos alunos e gerencie convites pendentes.
          </p>
        </div>

        {/* Send Invite Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Enviar Novo Convite
            </CardTitle>
            <CardDescription>
              Digite o email do aluno que você deseja convidar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email do Aluno</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="aluno@email.com"
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
                {isLoading ? "Enviando..." : "Enviar Convite"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Invitations List */}
        <Card>
          <CardHeader>
            <CardTitle>Convites Enviados</CardTitle>
            <CardDescription>
              Histórico de todos os convites enviados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingInvites ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corpoideal-purple mx-auto"></div>
                <p className="text-gray-500 mt-2">Carregando convites...</p>
              </div>
            ) : invitations.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum convite enviado ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{invitation.invitee_email}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(invitation.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invitation.status)}
                      <span className="text-sm font-medium">
                        {getStatusText(invitation.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default CoachInvites;
