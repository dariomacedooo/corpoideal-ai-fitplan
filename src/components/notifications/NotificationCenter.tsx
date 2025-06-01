
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Clock, Dumbbell, Apple, Droplets, Trophy } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'workout' | 'meal' | 'water' | 'achievement';
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Hora do treino!',
      message: 'Seu treino de peito está programado para agora',
      time: '2min atrás',
      type: 'workout',
      read: false
    },
    {
      id: '2',
      title: 'Lembrete de hidratação',
      message: 'Que tal beber um copo de água?',
      time: '15min atrás',
      type: 'water',
      read: false
    },
    {
      id: '3',
      title: 'Conquista desbloqueada!',
      message: 'Você completou 7 dias seguidos de treino!',
      time: '1h atrás',
      type: 'achievement',
      read: true
    },
    {
      id: '4',
      title: 'Hora do lanche',
      message: 'Seu lanche da tarde está programado',
      time: '2h atrás',
      type: 'meal',
      read: true
    }
  ]);

  const [settings, setSettings] = useState({
    workoutReminders: true,
    mealReminders: true,
    waterReminders: true,
    achievementNotifications: true,
    weeklyReport: true
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, read: true }
        : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Dumbbell className="h-4 w-4" />;
      case 'meal': return <Apple className="h-4 w-4" />;
      case 'water': return <Droplets className="h-4 w-4" />;
      case 'achievement': return <Trophy className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'workout': return 'bg-blue-100 text-blue-800';
      case 'meal': return 'bg-orange-100 text-orange-800';
      case 'water': return 'bg-cyan-100 text-cyan-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-corpoideal-purple flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificações
            </CardTitle>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Badge className="bg-red-500">
                  {unreadCount} não lidas
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Marcar todas como lidas
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  notification.read ? 'bg-gray-50' : 'bg-white border-corpoideal-purple/20'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-corpoideal-purple rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-corpoideal-purple">
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Lembretes de treino</h4>
                <p className="text-sm text-gray-500">Receba notificações para seus treinos programados</p>
              </div>
              <Switch
                checked={settings.workoutReminders}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, workoutReminders: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Lembretes de refeição</h4>
                <p className="text-sm text-gray-500">Notificações para suas refeições programadas</p>
              </div>
              <Switch
                checked={settings.mealReminders}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, mealReminders: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Lembretes de hidratação</h4>
                <p className="text-sm text-gray-500">Lembretes para beber água regularmente</p>
              </div>
              <Switch
                checked={settings.waterReminders}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, waterReminders: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações de conquistas</h4>
                <p className="text-sm text-gray-500">Seja notificado quando atingir suas metas</p>
              </div>
              <Switch
                checked={settings.achievementNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, achievementNotifications: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Relatório semanal</h4>
                <p className="text-sm text-gray-500">Receba um resumo semanal do seu progresso</p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, weeklyReport: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
