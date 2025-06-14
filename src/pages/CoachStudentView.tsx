
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Dumbbell, Apple, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const CoachStudentView = () => {
  const { studentId } = useParams();
  const { profile, loading } = useAuth();
  const [student, setStudent] = useState<UserProfile | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && profile?.role !== 'professor') {
      navigate('/home');
      return;
    }

    if (studentId && profile?.id) {
      fetchStudent();
    }
  }, [studentId, profile, loading, navigate]);

  const fetchStudent = async () => {
    if (!studentId || !profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', studentId)
        .eq('coach_id', profile.id)
        .single();

      if (error) {
        console.error('Error fetching student:', error);
        toast({
          title: "Erro",
          description: "Aluno não encontrado ou você não tem permissão para visualizá-lo.",
          variant: "destructive",
        });
        navigate('/coach/dashboard');
      } else {
        setStudent(data);
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      navigate('/coach/dashboard');
    } finally {
      setLoadingStudent(false);
    }
  };

  if (loading || loadingStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Aluno não encontrado</h2>
          <Button onClick={() => navigate('/coach/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
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
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-corpoideal-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {student.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-corpoideal-purple">
                {student.name || 'Aluno'}
              </h1>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="text-xs">
              <User className="h-4 w-4 mr-1" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="training" className="text-xs">
              <Dumbbell className="h-4 w-4 mr-1" />
              Treino
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs">
              <Apple className="h-4 w-4 mr-1" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs">
              <TrendingUp className="h-4 w-4 mr-1" />
              Progresso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Aluno</CardTitle>
                <CardDescription>
                  Dados pessoais e informações básicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Nome:</span>
                    <p>{student.name || 'Não informado'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p>{student.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Cadastro:</span>
                    <p>{new Date(student.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Atualização:</span>
                    <p>{new Date(student.updated_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Planos de Treino</CardTitle>
                <CardDescription>
                  Gerencie os treinos do seu aluno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Funcionalidade em desenvolvimento</p>
                  <p className="text-sm text-gray-400">
                    Em breve você poderá criar e gerenciar planos de treino personalizados
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Planos de Nutrição</CardTitle>
                <CardDescription>
                  Gerencie a dieta do seu aluno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Apple className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Funcionalidade em desenvolvimento</p>
                  <p className="text-sm text-gray-400">
                    Em breve você poderá criar e gerenciar planos nutricionais personalizados
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Acompanhamento de Progresso</CardTitle>
                <CardDescription>
                  Monitore a evolução do seu aluno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Funcionalidade em desenvolvimento</p>
                  <p className="text-sm text-gray-400">
                    Em breve você poderá acompanhar métricas e evolução detalhada
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default CoachStudentView;
