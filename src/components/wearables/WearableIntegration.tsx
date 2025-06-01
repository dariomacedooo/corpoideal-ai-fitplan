
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Watch, Smartphone, Activity, Heart, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function WearableIntegration() {
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const { toast } = useToast();

  const wearableDevices = [
    { id: 'apple-watch', name: 'Apple Watch', icon: Watch, color: 'bg-gray-900' },
    { id: 'samsung-galaxy', name: 'Samsung Galaxy Watch', icon: Watch, color: 'bg-blue-600' },
    { id: 'fitbit', name: 'Fitbit', icon: Activity, color: 'bg-green-600' },
    { id: 'garmin', name: 'Garmin', icon: Heart, color: 'bg-red-600' },
    { id: 'xiaomi', name: 'Mi Band', icon: Zap, color: 'bg-orange-600' },
  ];

  const handleConnect = (deviceId: string, deviceName: string) => {
    if (connectedDevices.includes(deviceId)) {
      setConnectedDevices(prev => prev.filter(id => id !== deviceId));
      toast({
        title: "Dispositivo desconectado",
        description: `${deviceName} foi desconectado com sucesso.`,
      });
    } else {
      setConnectedDevices(prev => [...prev, deviceId]);
      toast({
        title: "Dispositivo conectado",
        description: `${deviceName} foi conectado com sucesso.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Smartphone className="h-5 w-5 mr-2" />
          Dispositivos Conectados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wearableDevices.map((device) => {
            const Icon = device.icon;
            const isConnected = connectedDevices.includes(device.id);
            
            return (
              <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${device.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-sm text-gray-500">
                      {isConnected ? 'Sincronizando dados' : 'Não conectado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isConnected && (
                    <Badge variant="secondary" className="text-green-600">
                      Conectado
                    </Badge>
                  )}
                  <Button
                    variant={isConnected ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleConnect(device.id, device.name)}
                  >
                    {isConnected ? 'Desconectar' : 'Conectar'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        {connectedDevices.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-corpoideal-purple mb-2">Dados Sincronizados</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Passos hoje:</span>
                <p className="font-medium">8.547 passos</p>
              </div>
              <div>
                <span className="text-gray-600">Calorias queimadas:</span>
                <p className="font-medium">342 kcal</p>
              </div>
              <div>
                <span className="text-gray-600">Frequência cardíaca:</span>
                <p className="font-medium">72 bpm</p>
              </div>
              <div>
                <span className="text-gray-600">Sono:</span>
                <p className="font-medium">7h 23min</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
