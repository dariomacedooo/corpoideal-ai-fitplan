
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Dumbbell, Apple, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/hooks/useAuth";

interface StudentListProps {
  students: UserProfile[];
  onCreateWorkout: (studentId: string) => void;
  onCreateDiet: (studentId: string) => void;
}

export function StudentList({ students, onCreateWorkout, onCreateDiet }: StudentListProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Meus Alunos ({students.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Você ainda não tem alunos</p>
            <Button 
              onClick={() => navigate('/coach/invites')}
              className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
            >
              Convidar Primeiro Aluno
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-corpoideal-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {student.name?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{student.name || 'Sem nome'}</h3>
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Desde {new Date(student.created_at).toLocaleDateString('pt-BR')}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCreateWorkout(student.id)}
                    className="text-purple-600 border-purple-600 hover:bg-purple-50"
                  >
                    <Dumbbell className="h-4 w-4 mr-1" />
                    Treino
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCreateDiet(student.id)}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <Apple className="h-4 w-4 mr-1" />
                    Dieta
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/coach/student/${student.id}`)}
                    className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
