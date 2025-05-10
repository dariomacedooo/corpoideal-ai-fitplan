
import { Bell } from "lucide-react";
import { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'workout' | 'meal' | 'progress' | 'system';
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Treino de Hoje",
      message: "Não esqueça do seu treino de pernas às 19:00.",
      time: "Há 30 minutos",
      read: false,
      type: "workout"
    },
    {
      id: 2,
      title: "Lembrete de Refeição",
      message: "Está na hora do seu almoço conforme o plano nutricional.",
      time: "Há 1 hora",
      read: false,
      type: "meal"
    },
    {
      id: 3,
      title: "Check-in Semanal",
      message: "Amanhã é dia de registrar seu progresso semanal.",
      time: "Há 3 horas",
      read: true,
      type: "progress"
    },
    {
      id: 4,
      title: "Conquista Desbloqueada",
      message: "Parabéns! Você completou 5 treinos seguidos.",
      time: "Há 1 dia",
      read: true,
      type: "system"
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'workout':
        return <div className="w-2 h-2 rounded-full bg-blue-500"></div>;
      case 'meal':
        return <div className="w-2 h-2 rounded-full bg-green-500"></div>;
      case 'progress':
        return <div className="w-2 h-2 rounded-full bg-yellow-500"></div>;
      case 'system':
        return <div className="w-2 h-2 rounded-full bg-purple-500"></div>;
      default:
        return null;
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-medium">Notificações</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="text-xs h-8"
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 border-b last:border-b-0 ${notification.read ? 'bg-white' : 'bg-gray-50'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-2">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`text-sm font-medium ${notification.read ? '' : 'text-corpoideal-purple'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-[10px] text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>Nenhuma notificação.</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
