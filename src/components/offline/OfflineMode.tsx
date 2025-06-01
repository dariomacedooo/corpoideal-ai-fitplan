
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Download, Upload, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && offlineData.length > 0) {
      toast({
        title: "Conexão restaurada",
        description: "Sincronizando dados offline...",
      });
      // Simulate sync
      setTimeout(() => {
        setOfflineData([]);
        toast({
          title: "Sincronização concluída",
          description: "Todos os dados offline foram sincronizados.",
        });
      }, 2000);
    }
  }, [isOnline, offlineData.length, toast]);

  const downloadOfflineData = () => {
    // Simulate downloading offline data
    const essentialData = {
      workouts: localStorage.getItem('workoutPlan'),
      nutrition: localStorage.getItem('nutritionPlan'),
      profile: localStorage.getItem('userProfile'),
      progress: localStorage.getItem('progressData')
    };

    const blob = new Blob([JSON.stringify(essentialData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corpoideal-offline-data.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download concluído",
      description: "Dados para uso offline baixados com sucesso.",
    });
  };

  const mockOfflineActions = [
    { id: 1, action: "Treino de Peito concluído", time: "10:30", synced: false },
    { id: 2, action: "Refeição registrada", time: "12:15", synced: false },
    { id: 3, action: "Água registrada (500ml)", time: "14:20", synced: true },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <WifiOff className="h-5 w-5 mr-2" />
            Modo Offline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-medium">
                Status: {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? 'Conectado' : 'Desconectado'}
            </Badge>
          </div>

          <div className="space-y-4">
            <Button
              onClick={downloadOfflineData}
              className="w-full"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar dados para uso offline
            </Button>

            {!isOnline && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Você está offline. Suas ações serão sincronizadas quando a conexão for restaurada.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-corpoideal-purple">
            Ações Pendentes de Sincronização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockOfflineActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{action.action}</p>
                  <p className="text-sm text-gray-500">{action.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {action.synced ? (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Sincronizado
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Upload className="h-3 w-3 mr-1" />
                      Pendente
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
