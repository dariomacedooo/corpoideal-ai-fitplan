
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { FOOD_DATABASE, FoodCategory, FoodPrice } from "@/utils/foodDatabase";

type Workout = {
  // Exemplo de tipo de treino; adapte conforme dados reais
  title: string;
  description: string;
};

type DietItemSelection = {
  name: string;
  grams: number;
};

type DietSelection = {
  [category in FoodCategory]: DietItemSelection[];
};

export default function ProfessorWorkoutDietPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  // Estados para dados mockados/salvos localmente (trocar para API no futuro)
  const [workout, setWorkout] = useState<Workout>({ title: "", description: "" });
  const [diet, setDiet] = useState<DietSelection>({
    carboidrato: [],
    proteina: [],
    gordura: [],
  });

  // Filtros de alimento
  const [dietCategory, setDietCategory] = useState<FoodCategory>("carboidrato");
  const [dietPrice, setDietPrice] = useState<FoodPrice | "all">("all");

  // Helpers
  const filteredFoods = FOOD_DATABASE.filter(
    f => f.category === dietCategory && (dietPrice === "all" || f.price === dietPrice)
  );

  // Handlers
  const handleAddFood = (item: FoodItem) => {
    // Adiciona alimento com quantidade padrão (ex: 50g)
    setDiet(prev => ({
      ...prev,
      [item.category]: [
        ...prev[item.category],
        { name: item.name, grams: 50 }
      ],
    }));
  };

  const handleGramsChange = (item: DietItemSelection, v: number) => {
    setDiet(prev => ({
      ...prev,
      [dietCategory]: prev[dietCategory].map(f =>
        f.name === item.name ? { ...f, grams: v } : f
      ),
    }));
  };

  // Exemplo de submissão (trocar por integração com Supabase)
  const handleSave = () => {
    alert("Funcionalidade de salvar treino e dieta será integrada ao banco em breve!");
  };

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-corpoideal-purple mb-1">Treino e Dieta do Aluno</h1>
        <p className="text-gray-600 mb-4">ID do aluno: <b>{studentId}</b></p>

        <div className="bg-white border rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-lg font-semibold text-corpoideal-purple mb-3">Treino</h2>
          <input
            className="w-full mb-2 border px-3 py-1 rounded"
            placeholder="Título do treino"
            value={workout.title}
            onChange={e => setWorkout({ ...workout, title: e.target.value })}
          />
          <textarea
            className="w-full border px-3 py-1 rounded mb-2"
            placeholder="Descrição/Lista de exercícios..."
            value={workout.description}
            rows={3}
            onChange={e => setWorkout({ ...workout, description: e.target.value })}
          />
        </div>

        {/* Dieta */}
        <div className="bg-white border rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-lg font-semibold text-corpoideal-purple mb-3">Plano de Dieta</h2>
          <div className="flex gap-2 mb-2">
            <select
              value={dietCategory}
              onChange={e => setDietCategory(e.target.value as FoodCategory)}
              className="border px-3 py-1 rounded"
            >
              <option value="carboidrato">Carboidrato</option>
              <option value="proteina">Proteína</option>
              <option value="gordura">Gordura saudável</option>
            </select>
            <select
              value={dietPrice}
              onChange={e => setDietPrice(e.target.value as FoodPrice | "all")}
              className="border px-3 py-1 rounded"
            >
              <option value="all">Todos preços</option>
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap mb-3">
            {filteredFoods.map(f => (
              <button
                key={f.name}
                className="bg-corpoideal-purple/10 text-corpoideal-purple px-2 py-1 rounded mb-2 hover:bg-corpoideal-purple/20"
                onClick={() => handleAddFood(f)}
                type="button"
              >
                + {f.name}
              </button>
            ))}
          </div>
          {/* Exibe alimentos escolhidos dessa categoria */}
          <div className="mb-2">
            <ul className="text-sm">
              {diet[dietCategory].length === 0 && <li className="text-gray-400">Nenhum alimento adicionado</li>}
              {diet[dietCategory].map((item, idx) => (
                <li key={item.name + idx} className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{item.name}</span>
                  <input
                    type="number"
                    value={item.grams}
                    onChange={e => handleGramsChange(item, parseInt(e.target.value) || 0)}
                    className="w-16 border px-2 py-0.5 rounded text-xs"
                    min={0}
                  />
                  <span className="text-xs text-gray-500">g</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button className="bg-corpoideal-purple text-white w-full mb-2" onClick={handleSave}>
          Salvar treino e dieta
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => navigate(`/professor/student/${studentId}`)}>
          Voltar
        </Button>
      </div>
      <BottomNav />
    </div>
  );
}
