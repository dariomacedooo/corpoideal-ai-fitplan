import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Circle, Dumbbell, Apple } from "lucide-react";
export function WeeklyCalendar() {
  const today = new Date();
  const currentDay = today.getDay();
  const weekDays = [{
    name: 'Dom',
    day: 0,
    workout: false,
    nutrition: true
  }, {
    name: 'Seg',
    day: 1,
    workout: true,
    nutrition: true
  }, {
    name: 'Ter',
    day: 2,
    workout: false,
    nutrition: true
  }, {
    name: 'Qua',
    day: 3,
    workout: true,
    nutrition: true
  }, {
    name: 'Qui',
    day: 4,
    workout: false,
    nutrition: false
  }, {
    name: 'Sex',
    day: 5,
    workout: true,
    nutrition: true
  }, {
    name: 'Sab',
    day: 6,
    workout: false,
    nutrition: true
  }];
  const isCompleted = (day: number) => day < currentDay;
  const isToday = (day: number) => day === currentDay;
  return <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-corpoideal-purple text-lg text-slate-50">
          <Calendar className="h-5 w-5 mr-2" />
          Calendário Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(day => <div key={day.name} className={`p-3 rounded-lg text-center transition-colors ${isToday(day.day) ? 'bg-corpoideal-purple text-white' : isCompleted(day.day) ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="text-xs font-medium mb-2">{day.name}</div>
              
              <div className="space-y-1">
                {day.workout && <div className="flex justify-center">
                    {isCompleted(day.day) ? <CheckCircle className="h-3 w-3 text-green-600" /> : <Dumbbell className={`h-3 w-3 ${isToday(day.day) ? 'text-white' : 'text-blue-600'}`} />}
                  </div>}
                
                {day.nutrition && <div className="flex justify-center">
                    {isCompleted(day.day) ? <CheckCircle className="h-3 w-3 text-green-600" /> : <Apple className={`h-3 w-3 ${isToday(day.day) ? 'text-white' : 'text-green-600'}`} />}
                  </div>}
                
                {!day.workout && !day.nutrition && <Circle className={`h-3 w-3 ${isToday(day.day) ? 'text-white' : 'text-gray-400'}`} />}
              </div>
            </div>)}
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="flex items-center">
            <Dumbbell className="h-3 w-3 text-blue-600 mr-1" />
            <span>Treino</span>
          </div>
          <div className="flex items-center">
            <Apple className="h-3 w-3 text-green-600 mr-1" />
            <span>Nutrição</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
            <span>Completo</span>
          </div>
        </div>
      </CardContent>
    </Card>;
}