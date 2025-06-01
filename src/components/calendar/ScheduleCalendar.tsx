
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Dumbbell, Apple, Droplets } from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  type: 'workout' | 'meal' | 'water' | 'rest';
  completed?: boolean;
}

export function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<ScheduleEvent[]>([
    { id: '1', title: 'Treino de Peito', time: '07:00', type: 'workout', completed: true },
    { id: '2', title: 'Café da manhã', time: '08:30', type: 'meal', completed: true },
    { id: '3', title: 'Lembrete: Água', time: '10:00', type: 'water', completed: false },
    { id: '4', title: 'Almoço', time: '12:30', type: 'meal', completed: false },
    { id: '5', title: 'Lanche da tarde', time: '15:00', type: 'meal', completed: false },
    { id: '6', title: 'Treino de Pernas', time: '18:00', type: 'workout', completed: false },
    { id: '7', title: 'Jantar', time: '20:00', type: 'meal', completed: false },
    { id: '8', title: 'Descanso/Sono', time: '22:00', type: 'rest', completed: false },
  ]);

  const toggleEventCompletion = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, completed: !event.completed }
        : event
    ));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Dumbbell className="h-4 w-4" />;
      case 'meal': return <Apple className="h-4 w-4" />;
      case 'water': return <Droplets className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string, completed: boolean) => {
    if (completed) return 'bg-green-100 text-green-800';
    
    switch (type) {
      case 'workout': return 'bg-blue-100 text-blue-800';
      case 'meal': return 'bg-orange-100 text-orange-800';
      case 'water': return 'bg-cyan-100 text-cyan-800';
      case 'rest': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedEvents = events.filter(e => e.completed).length;
  const totalEvents = events.length;
  const progressPercentage = Math.round((completedEvents / totalEvents) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Agenda do Dia
          </CardTitle>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <Badge className={progressPercentage === 100 ? 'bg-green-600' : 'bg-corpoideal-purple'}>
              {completedEvents}/{totalEvents} concluídos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                  event.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getEventColor(event.type, event.completed)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <h4 className={`font-medium ${event.completed ? 'line-through text-gray-500' : ''}`}>
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                <Button
                  variant={event.completed ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleEventCompletion(event.id)}
                >
                  {event.completed ? 'Desfazer' : 'Concluir'}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-corpoideal-purple/10 rounded-lg">
            <h4 className="font-medium text-corpoideal-purple mb-2">Progresso do Dia</h4>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-corpoideal-purple h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progressPercentage}% das atividades concluídas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
