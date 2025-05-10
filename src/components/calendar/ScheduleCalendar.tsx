
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Apple } from "lucide-react";

export function ScheduleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for workouts and meals
  const workoutDates = [
    new Date(2025, 4, 12),
    new Date(2025, 4, 14),
    new Date(2025, 4, 16),
    new Date(2025, 4, 19),
    new Date(2025, 4, 21),
  ];
  
  const mealDates = [
    new Date(2025, 4, 10),
    new Date(2025, 4, 11),
    new Date(2025, 4, 12),
    new Date(2025, 4, 13),
    new Date(2025, 4, 14),
    new Date(2025, 4, 15),
    new Date(2025, 4, 16),
    new Date(2025, 4, 17),
    new Date(2025, 4, 18),
    new Date(2025, 4, 19),
    new Date(2025, 4, 20),
    new Date(2025, 4, 21),
  ];
  
  // Mock events for selected date
  const getWorkoutsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    return [
      { 
        id: 1, 
        time: '07:00', 
        name: 'Treino de Peito e Tríceps', 
        duration: '60 min'
      },
      { 
        id: 2, 
        time: '18:00', 
        name: 'Cardio', 
        duration: '30 min'
      },
    ];
  };
  
  const getMealsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    return [
      { id: 1, time: '07:30', name: 'Café da manhã', description: 'Ovos, torrada integral e café' },
      { id: 2, time: '10:30', name: 'Lanche da manhã', description: 'Iogurte com frutas' },
      { id: 3, time: '13:00', name: 'Almoço', description: 'Frango grelhado, arroz integral e salada' },
      { id: 4, time: '16:00', name: 'Lanche da tarde', description: 'Shake de proteína e banana' },
      { id: 5, time: '19:30', name: 'Jantar', description: 'Salmão, batata doce e legumes' },
    ];
  };
  
  const workouts = getWorkoutsForDate(date);
  const meals = getMealsForDate(date);
  
  // Helper function to highlight dates with events
  const isDayWithWorkout = (day: Date) => {
    return workoutDates.some(workoutDay => 
      workoutDay.getDate() === day.getDate() && 
      workoutDay.getMonth() === day.getMonth() &&
      workoutDay.getFullYear() === day.getFullYear()
    );
  };
  
  const isDayWithMeal = (day: Date) => {
    return mealDates.some(mealDay => 
      mealDay.getDate() === day.getDate() && 
      mealDay.getMonth() === day.getMonth() &&
      mealDay.getFullYear() === day.getFullYear()
    );
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple">Calendário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              modifiers={{
                workout: isDayWithWorkout,
                meal: isDayWithMeal
              }}
              modifiersStyles={{
                workout: { fontWeight: 'bold', textDecoration: 'underline' },
                meal: { fontWeight: 'bold' }
              }}
            />
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-corpoideal-purple rounded-full"></div>
                <span>Treino</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-corpoideal-darkpurple rounded-full"></div>
                <span>Refeição</span>
              </div>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="workouts">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="workouts"><Dumbbell className="mr-1 h-4 w-4" />Treinos</TabsTrigger>
                <TabsTrigger value="meals"><Apple className="mr-1 h-4 w-4" />Refeições</TabsTrigger>
              </TabsList>
              
              <TabsContent value="workouts" className="mt-4">
                {workouts.length > 0 ? (
                  <div className="space-y-3">
                    {workouts.map(workout => (
                      <div key={workout.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{workout.name}</span>
                          <Badge variant="outline">{workout.time}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">Duração: {workout.duration}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-6">Nenhum treino agendado para este dia.</p>
                )}
              </TabsContent>
              
              <TabsContent value="meals" className="mt-4">
                {meals.length > 0 ? (
                  <div className="space-y-3">
                    {meals.map(meal => (
                      <div key={meal.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{meal.name}</span>
                          <Badge variant="outline">{meal.time}</Badge>
                        </div>
                        <p className="text-xs text-gray-600">{meal.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-6">Nenhuma refeição agendada para este dia.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
