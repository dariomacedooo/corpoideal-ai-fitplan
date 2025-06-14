
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { UserPlus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/useAuth';
import { CoachStats } from '@/components/coach/CoachStats';
import { StudentList } from '@/components/coach/StudentList';
import { CreateWorkoutDialog } from '@/components/coach/CreateWorkoutDialog';
import { CreateDietDialog } from '@/components/coach/CreateDietDialog';

const CoachDashboard = () => {
  const { profile, loading } = useAuth();
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [totalWorkoutPlans, setTotalWorkoutPlans] = useState(0);
  const [totalDietPlans, setTotalDietPlans] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [workoutDialogOpen, setWorkoutDialogOpen] = useState(false);
  const [dietDialogOpen, setDietDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{id: string, name: string} | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile?.role !== 'professor') {
      navigate('/home');
      return;
    }

    if (profile?.id) {
      fetchData();
    }
  }, [profile, loading, navigate]);

  const fetchData = async () => {
    if (!profile?.id) return;

    try {
      // Fetch students
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('*')
        .eq('coach_id', profile.id);

      // Fetch workout plans count
      const { count: workoutCount } = await supabase
        .from('workout_plans')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', profile.id);

      // Fetch diet plans count
      const { count: dietCount } = await supabase
        .from('diet_plans')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', profile.id);

      setStudents(studentsData || []);
      setTotalWorkoutPlans(workoutCount || 0);
      setTotalDietPlans(dietCount || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateWorkout = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent({ id: studentId, name: student.name || 'Aluno' });
      setWorkoutDialogOpen(true);
    }
  };

  const handleCreateDiet = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent({ id: studentId, name: student.name || 'Aluno' });
      setDietDialogOpen(true);
    }
  };

  const handlePlanCreated = () => {
    fetchData(); // Refresh data after creating a plan
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corpoideal-purple"></div>
      </div>
    );
  }

  // Calculate active students (students created in last 30 days)
  const activeStudents = students.filter(student => {
    const createdDate = new Date(student.created_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  }).length;

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-corpoideal-purple mb-2">
            Dashboard do Professor
          </h1>
          <p className="text-gray-600">
            Olá, {profile?.name}! Gerencie seus alunos e crie planos personalizados.
          </p>
        </div>

        {/* Statistics Cards */}
        <CoachStats
          totalStudents={students.length}
          totalWorkoutPlans={totalWorkoutPlans}
          totalDietPlans={totalDietPlans}
          activeStudents={activeStudents}
        />

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
        <StudentList
          students={students}
          onCreateWorkout={handleCreateWorkout}
          onCreateDiet={handleCreateDiet}
        />

        {/* Dialogs */}
        {selectedStudent && (
          <>
            <CreateWorkoutDialog
              open={workoutDialogOpen}
              onOpenChange={setWorkoutDialogOpen}
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              onSuccess={handlePlanCreated}
            />
            <CreateDietDialog
              open={dietDialogOpen}
              onOpenChange={setDietDialogOpen}
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              onSuccess={handlePlanCreated}
            />
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CoachDashboard;
