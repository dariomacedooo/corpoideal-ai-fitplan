import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { User, Users, BarChart3, FileText, Image } from "lucide-react";

interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  progress?: number; // Percentual fictício, para demonstrar no mock
}

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [professor, setProfessor] = useState({ name: "Professor Exemplo" });

  useEffect(() => {
    // Pega info do professor logado
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
    setProfessor({ name: profile.name || "Professor Exemplo" });

    // Mock dos alunos do professor (futuro: buscar do Supabase)
    setStudents([
      { id: "student1", name: "Aluno Exemplo 1", email: "aluno1@email.com", progress: 70 },
      { id: "student2", name: "Aluno Exemplo 2", email: "aluno2@email.com", progress: 40 },
    ]);
  }, [navigate]);

  const handleManageStudent = (studentId: string) => {
    navigate(`/professor/student/${studentId}`);
  };

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Nome do Professor */}
        <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow">
          <User className="text-corpoideal-purple w-7 h-7" />
          <div>
            <h2 className="text-xl font-bold text-corpoideal-purple">{professor.name}</h2>
            <div className="text-xs text-gray-500">Professor Parceiro</div>
          </div>
        </div>
        {/* Resumo CRM */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-corpoideal-purple to-purple-deep rounded-xl p-4 text-white shadow flex flex-col items-center">
            <Users className="w-6 h-6 mb-1" />
            <span className="font-semibold text-lg">{students.length}</span>
            <span className="text-xs">Alunos vinculados</span>
          </div>
          <div className="bg-gradient-to-r from-purple-vibrant to-purple-deep rounded-xl p-4 text-white shadow flex flex-col items-center">
            <FileText className="w-6 h-6 mb-1" />
            <span className="font-semibold text-lg">{students.length * 2}</span>
            <span className="text-xs">Treinos/dietas criados</span>
          </div>
        </div>
        {/* Lista de alunos */}
        <div>
          <h3 className="font-semibold mb-2 text-corpoideal-purple">Meus Alunos</h3>
          <div className="grid gap-4">
            {students.length === 0 ? (
              <div className="text-gray-500 text-center p-4">Nenhum aluno vinculado.</div>
            ) : (
              students.map((student) => (
                <div
                  key={student.id}
                  className="bg-card-soft rounded-lg px-5 py-4 flex flex-col md:flex-row md:items-center justify-between shadow"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{student.name}</span>
                    {student.email && <span className="text-xs text-gray-500">{student.email}</span>}
                    <div className="w-32 mt-1">
                      <div className="bg-gray-200 rounded h-2">
                        <div
                          className="bg-corpoideal-purple h-2 rounded"
                          style={{ width: `${student.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{student.progress || 0}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <Button
                      size="sm"
                      className="bg-corpoideal-purple text-white"
                      onClick={() => navigate(`/professor/student/${student.id}/workout`)}
                    >
                      Criar Treino/Dieta
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-corpoideal-purple"
                      onClick={() => navigate(`/professor/student/${student.id}/progress`)}
                    >
                      <BarChart3 className="w-4 h-4 mr-1" /> Progresso
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-corpoideal-purple"
                      onClick={() => navigate(`/professor/student/${student.id}/photos`)}
                    >
                      <Image className="w-4 h-4 mr-1" /> Fotos
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Atalho para convidar */}
        <div className="flex justify-end">
          <Button
            className="bg-gradient-to-r from-purple-vibrant to-purple-deep text-white px-4 py-2 rounded shadow"
            onClick={() => navigate("/professor/invite")}
          >
            Convidar novo aluno
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfessorDashboard;
