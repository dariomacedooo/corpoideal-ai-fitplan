
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/useAuth';

const CoachDashboard = () => {
  const { profile, loading } = useAuth();
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile?.role !== 'professor') {
      navigate('/home');
      return;
    }

    if (profile?.id) {
      fetchStudents();
    }
  }, [profile, loading, navigate]);

  const fetchStudents = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('coach_id', profile.id);

      if (error) {
        console.error('Error fetching students:', error);
      } else {
        setStudents(data || []);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoadingStudents(false);
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
          <h1 className="text-2xl font-bold text-corpoideal-purple mb-2">
            Área do Professor
          </h1>
          <p className="text-gray-600">
            Olá, {profile?.name}! Gerencie seus alunos e crie planos personalizados.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => navigate('/coach/invites')}
            className="h-20 flex flex-col items-center justify-center bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
          >
            <UserPlus className="h-6 w-6 mb-1" />
            <span className="text-sm">Convidar Aluno</span>
          </Button>
          <Button
            onClick={() => navigate('/coach/invites')}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center border-corpoideal-purple text-corpoideal-purple hover:bg-corpoideal-purple hover:text-white"
          >
            <Calendar className="h-6 w-6 mb-1" />
            <span className="text-sm">Ver Convites</span>
          </Button>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Seus Alunos ({students.length})
            </CardTitle>
            <CardDescription>
              Gerencie os treinos e dietas dos seus alunos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingStudents ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corpoideal-purple mx-auto"></div>
                <p className="text-gray-500 mt-2">Carregando alunos...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Você ainda não tem alunos</p>
                <Button 
                  onClick={() => navigate('/coach/invites')}
                  className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  Enviar Primeiro Convite
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-corpoideal-purple rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {student.name?.charAt(0).toUpperCase() || 'A'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{student.name || 'Sem nome'}</h3>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/coach/student/${student.id}`)}
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Ver Perfil
                      </Button>
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

export default CoachDashboard;
