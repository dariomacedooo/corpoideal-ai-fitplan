
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";

interface StudentProfile {
  id: string;
  name: string;
  email?: string;
}

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    // Verifica login e papel
    const userProfile = localStorage.getItem("userProfile");
    if (!userProfile) {
      navigate("/auth");
      return;
    }

    const profile = JSON.parse(userProfile);
    if (profile.role !== "professor") {
      navigate("/");
      return;
    }

    // Simulação: Busca alunos vinculados (mock)
    // Futuramente, substituir por requisição à API/Supabase
    // Aqui, pode buscar via supabase os profiles onde coach_id = professor.id
    setStudents([
      { id: "student1", name: "Aluno Exemplo 1", email: "aluno1@email.com" },
      { id: "student2", name: "Aluno Exemplo 2", email: "aluno2@email.com" },
    ]);
  }, [navigate]);

  // Navegar para tela de criar treino/dieta para o aluno escolhido
  const handleManageStudent = (studentId: string) => {
    navigate(`/professor/student/${studentId}`);
  };

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-2">Dashboard do Professor</h1>
        <p className="mb-6 text-gray-600">Gerencie e acompanhe seus alunos:</p>
        <div className="mb-4 flex justify-end">
          <Button
            className="bg-gradient-to-r from-purple-vibrant to-purple-deep text-white px-4 py-2 rounded shadow"
            onClick={() => navigate("/professor/invite")}
          >
            Convidar novo aluno
          </Button>
        </div>
        <div className="grid gap-4">
          {students.length === 0 ? (
            <div className="text-gray-500 text-center p-4">Nenhum aluno vinculado.</div>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="bg-card-soft rounded-lg px-6 py-4 flex items-center justify-between shadow"
              >
                <div>
                  <div className="font-semibold">{student.name}</div>
                  {student.email && <div className="text-sm text-gray-500">{student.email}</div>}
                </div>
                <Button
                  size="sm"
                  className="bg-corpoideal-purple text-white"
                  onClick={() => handleManageStudent(student.id)}
                >
                  Gerenciar
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfessorDashboard;
