
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export function NextMealCard() {
  const next = JSON.parse(localStorage.getItem("nextMeal") || '{}');
  const navigate = useNavigate();
  return (
    <Card className="transition shadow-md hover:shadow-xl border-0 bg-white font-playfair">
      <CardContent className="px-4 py-2 flex flex-col items-start justify-between h-full">
        <div className="flex items-center mb-2 w-full">
          <Heart className="w-5 h-5 text-green-400 mr-2" />
          <div className="font-semibold text-md text-green-700">Próxima Refeição</div>
        </div>
        <div className="text-gray-800 font-bold text-lg mb-1">
          {next.name || "Não cadastrada"}
        </div>
        <div className="text-xs text-gray-500 mb-3">
          {next.time ? `Hoje às ${next.time}` : "Preencha sua dieta para ver aqui."}
        </div>
        <button
          onClick={() => navigate("/nutrition")}
          className="w-full mt-auto bg-green-100 hover:bg-green-300 text-green-700 rounded-xl py-2 font-medium transition"
        >
          Ver Dieta
        </button>
      </CardContent>
    </Card>
  )
}
