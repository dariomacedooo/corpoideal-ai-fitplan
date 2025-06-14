
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

export function WeeklyProgressChart() {
  // Exemplo de dados reais (substitua se necessário)
  const data = JSON.parse(localStorage.getItem("progressChart") || '[]') || [
    { name: "Seg", Progresso: 1 },
    { name: "Ter", Progresso: 2 },
    { name: "Qua", Progresso: 1 },
    { name: "Qui", Progresso: 0 },
    { name: "Sex", Progresso: 1 },
    { name: "Sab", Progresso: 2 },
    { name: "Dom", Progresso: 0 },
  ];

  return (
    <Card className="bg-white/80 border-0 font-playfair shadow">
      <CardContent className="py-5 px-2">
        <div className="text-xs font-semibold text-gray-800 mb-2 ml-2">Progresso Semanal</div>
        <div className="w-full h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="Progresso" fill="#8B5CF6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
