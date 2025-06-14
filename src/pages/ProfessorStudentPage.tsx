
import { useParams, useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";

// Página para gerenciamento do aluno escolhido pelo professor
const ProfessorStudentPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  // Aqui, buscar info real do aluno (futuro: chamada à API/Supabase)
  const student = {
    id: studentId,
    name: "Aluno Exemplo",
    email: "aluno@email.com",
    // outros dados relevantes...
  };

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-1">
          {student.name}
        </h1>
        <div className="text-gray-600 mb-4">{student.email}</div>
        <div className="flex flex-col gap-4 mb-8">
          <Button
            className="bg-corpoideal-purple text-white"
            onClick={() => navigate(`/professor/student/${student.id}/workout`)}
          >
            Criar/Editar Treino
          </Button>
          <Button
            className="bg-gradient-to-r from-corpoideal-purple to-purple-deep text-white"
            onClick={() => navigate(`/professor/student/${student.id}/diet`)}
          >
            Criar/Editar Dieta
          </Button>
        </div>
        <Button variant="ghost" onClick={() => navigate("/professor/dashboard")}>
          Voltar para dashboard
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfessorStudentPage;
