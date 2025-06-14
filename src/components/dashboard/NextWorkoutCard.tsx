
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";

export function NextWorkoutCard() {
  // Use aqui os dados reais do próximo treino
  const next = JSON.parse(localStorage.getItem("nextWorkout") || '{}');
  const navigate = useNavigate();

  return (
    <Card className="transition shadow-md hover:shadow-xl border-0 bg-white font-playfair">
      <CardContent className="px-4 py-2 flex flex-col items-start justify-between h-full">
        <div className="flex items-center mb-2 w-full">
          <Activity className="w-5 h-5 text-purple-400 mr-2" />
          <div className="font-semibold text-md text-corpoideal-purple">Próximo Treino</div>
        </div>
        <div className="text-gray-800 font-bold text-lg mb-1">
          {next.name || "Nenhum agendado"}
        </div>
        <div className="text-xs text-gray-500 mb-3">
          {next.time ? `Hoje às ${next.time}` : "Agende seu treino agora!"}
        </div>
        <button
          onClick={() => navigate("/training")}
          className="w-full mt-auto bg-purple-100 hover:bg-purple-300 text-purple-700 rounded-xl py-2 font-medium transition"
        >
          Iniciar Treino
        </button>
      </CardContent>
    </Card>
  )
}
