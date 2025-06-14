
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Dumbbell, Apple, TrendingUp, Edit, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { CreateWorkoutDialog } from '@/components/coach/CreateWorkoutDialog';
import { CreateDietDialog } from '@/components/coach/CreateDietDialog';

const CoachStudentView = () => {
  const { studentId } = useParams();
  const { profile, loading } = useAuth();
  const [student, setStudent] = useState<UserProfile | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<any[]>([]);
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [workoutDialogOpen, setWorkoutDialogOpen] = useState(false);
  const [dietDialogOpen, setDietDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && profile?.role !== 'professor') {
      navigate('/home');
      return;
    }

    if (studentId && profile?.id) {
      fetchStudentData();
    }
  }, [studentId, profile, loading, navigate]);

  const fetchStudentData = async () => {
    if (!studentId || !profile?.id) return;

    try {
      // Fetch student profile
      const { data: studentData, error: studentError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', studentId)
        .eq('coach_id', profile.id)
        .single();

      if (studentError) {
        console.error('Error fetching student:', studentError);
        toast({
          title: "Erro",
          description: "Aluno não encontrado ou você não tem permissão para visualizá-lo.",
          variant: "destructive",
        });
        navigate('/coach/dashboard');
        return;
      }

      // Fetch workout plans
      const { data: workoutData } = await supabase
        .from('workout_plans')
        .select('*')
        .eq('client_id', studentId)
        .eq('author_id', profile.id)
        .order('created_at', { ascending: false });

      // Fetch diet plans
      const { data: dietData } = await supabase
        .from('diet_plans')
        .select('*')
        .eq('client_id', studentId)
        .eq('author_id', profile.id)
        .order('created_at', { ascending: false });

      setStudent(studentData);
      setWorkoutPlans(workoutData || []);
      setDietPlans(dietData || []);
    } catch (error) {
      console.error('Error fetching student data:', error);
      navigate('/coach/dashboard');
    } finally {
      setLoadingStudent(false);
    }
  };

  const handleDeleteWorkoutPlan = async (planId: string) => {
    try {
      const { error } = await supabase
        .from('workout_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;

      toast({
        title: "Plano removido",
        description: "Plano de treino removido com sucesso.",
      });

      fetchStudentData(); // Refresh data
    } catch (error: any) {
      toast({
        title: "Erro ao remover plano",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDietPlan = async (planId: string) => {
    try {
      const { error } = await supabase
        .from('diet_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;

      toast({
        title: "Plano removido",
        description: "Plano de dieta removido com sucesso.",
      });

      fetchStudentData(); // Refresh data
    } catch (error: any) {
      toast({
        title: "Erro ao remover plano",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
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
              Treinos
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs">
              <Apple className="h-4 w-4 mr-1" />
              Dietas
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Planos de Treino</CardTitle>
                  <CardDescription>
                    Gerencie os treinos do seu aluno
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setWorkoutDialogOpen(true)}
                  size="sm"
                  className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Treino
                </Button>
              </CardHeader>
              <CardContent>
                {workoutPlans.length === 0 ? (
                  <div className="text-center py-8">
                    <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Nenhum plano de treino criado</p>
                    <Button
                      onClick={() => setWorkoutDialogOpen(true)}
                      className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                    >
                      Criar Primeiro Plano
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {workoutPlans.map((plan) => (
                      <div key={plan.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{plan.title}</h3>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteWorkoutPlan(plan.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                        <p className="text-xs text-gray-500">
                          Criado em {new Date(plan.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Planos de Nutrição</CardTitle>
                  <CardDescription>
                    Gerencie a dieta do seu aluno
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setDietDialogOpen(true)}
                  size="sm"
                  className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Dieta
                </Button>
              </CardHeader>
              <CardContent>
                {dietPlans.length === 0 ? (
                  <div className="text-center py-8">
                    <Apple className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Nenhum plano de dieta criado</p>
                    <Button
                      onClick={() => setDietDialogOpen(true)}
                      className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                    >
                      Criar Primeiro Plano
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dietPlans.map((plan) => (
                      <div key={plan.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{plan.title}</h3>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteDietPlan(plan.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                        <p className="text-xs text-gray-500">
                          Criado em {new Date(plan.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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

        {/* Dialogs */}
        <CreateWorkoutDialog
          open={workoutDialogOpen}
          onOpenChange={setWorkoutDialogOpen}
          studentId={student.id}
          studentName={student.name || 'Aluno'}
          onSuccess={fetchStudentData}
        />
        <CreateDietDialog
          open={dietDialogOpen}
          onOpenChange={setDietDialogOpen}
          studentId={student.id}
          studentName={student.name || 'Aluno'}
          onSuccess={fetchStudentData}
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default CoachStudentView;
