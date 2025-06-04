
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

interface ResultsDisplayProps {
  calculatedData: any;
  chartData: Array<{ name: string; value: number; color: string }>;
}

export function ResultsDisplay({ calculatedData, chartData }: ResultsDisplayProps) {
  if (!calculatedData) return null;

  return (
    <div>
      {chartData.length > 0 && (
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-corpoideal-purple/10 to-blue-50 p-4 rounded-lg border border-corpoideal-purple/20">
          <h3 className="font-medium text-corpoideal-purple mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Resultado Científico:
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold">{calculatedData.calories} kcal</p>
              <p className="text-sm text-gray-500">Calorias diárias • Biotipo: {calculatedData.biotipo}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded border">
                <p className="font-medium">TMB: {calculatedData.bmr} kcal</p>
                <p className="text-gray-500">Mifflin-St Jeor</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-medium">GCD: {calculatedData.tdee} kcal</p>
                <p className="text-gray-500">WHO/FAO/UNU</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-2 rounded border">
                <p className="text-lg font-bold">{calculatedData.macros.proteinG}g</p>
                <p className="text-xs text-gray-500">Proteínas ({calculatedData.macros.protein}%)</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="text-lg font-bold">{calculatedData.macros.carbsG}g</p>
                <p className="text-xs text-gray-500">Carboidratos ({calculatedData.macros.carbs}%)</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="text-lg font-bold">{calculatedData.macros.fatG}g</p>
                <p className="text-xs text-gray-500">Gorduras ({calculatedData.macros.fat}%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Distribution */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-bold text-blue-700 mb-2">📋 Distribuição das Refeições:</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white p-2 rounded">
              <p className="font-medium">{calculatedData.mealPlan.mealsCount} refeições</p>
              <p className="text-gray-500">Otimizada</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="font-medium">{calculatedData.mealPlan.caloriesPerMeal} kcal</p>
              <p className="text-gray-500">Por refeição</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="font-medium">{calculatedData.mealPlan.proteinPerMeal}g</p>
              <p className="text-gray-500">Proteína/refeição</p>
            </div>
          </div>
        </div>

        {/* Scientific References */}
        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
          <strong>📚 Embasamento Científico:</strong><br/>
          • TMB: Mifflin-St Jeor (Journal of the American Dietetic Association, 1990)<br/>
          • Proteína: {calculatedData.goal === 'ganhar-massa' ? '2.0-2.2g/kg' : calculatedData.goal === 'perder-peso' ? '2.2-2.5g/kg' : '2.0g/kg'} (Brad Schoenfeld, 2018)<br/>
          • Distribuição: ≥0.4g/kg por refeição (Moore et al., 2009)<br/>
          • Fatores atividade: WHO/FAO/UNU Expert Consultation
        </div>
      </div>
    </div>
  );
}
