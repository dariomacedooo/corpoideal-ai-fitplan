
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Headphones, Apple, Watch, Activity, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Device {
  id: string;
  name: string;
  type: "smartwatch" | "fitnessband" | "smartscale";
  brand: string;
  connected: boolean;
  icon: JSX.Element;
  lastSync?: string;
}

export function WearableIntegration() {
  const { toast } = useToast();
  
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Apple Watch",
      type: "smartwatch",
      brand: "Apple",
      connected: true,
      icon: <Watch className="h-8 w-8 text-corpoideal-purple" />,
      lastSync: "Hoje, 09:45"
    },
    {
      id: "2",
      name: "Mi Band 6",
      type: "fitnessband",
      brand: "Xiaomi",
      connected: false,
      icon: <Activity className="h-8 w-8 text-corpoideal-purple" />
    }
  ]);
  
  const [activityData] = useState([
    { day: 'Seg', steps: 8423, calories: 320, heart: 68 },
    { day: 'Ter', steps: 10251, calories: 412, heart: 72 },
    { day: 'Qua', steps: 6892, calories: 280, heart: 65 },
    { day: 'Qui', steps: 9432, calories: 378, heart: 70 },
    { day: 'Sex', steps: 12105, calories: 452, heart: 75 },
    { day: 'Sab', steps: 15204, calories: 560, heart: 78 },
    { day: 'Dom', steps: 6502, calories: 260, heart: 62 }
  ]);
  
  const [activeData, setActiveData] = useState<"steps" | "calories" | "heart">("steps");
  
  const [syncInProgress, setSyncInProgress] = useState<string | null>(null);
  
  const handleConnect = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId
        ? { ...device, connected: true, lastSync: "Agora" }
        : device
    ));
    
    toast({
      title: "Dispositivo conectado",
      description: "Seu dispositivo foi conectado com sucesso.",
    });
  };
  
  const handleDisconnect = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId
        ? { ...device, connected: false, lastSync: undefined }
        : device
    ));
    
    toast({
      title: "Dispositivo desconectado",
      description: "Seu dispositivo foi desconectado.",
    });
  };
  
  const handleSync = (deviceId: string) => {
    setSyncInProgress(deviceId);
    
    setTimeout(() => {
      setSyncInProgress(null);
      
      setDevices(devices.map(device => 
        device.id === deviceId
          ? { ...device, lastSync: "Agora" }
          : device
      ));
      
      toast({
        title: "Sincronização completa",
        description: "Dados do dispositivo sincronizados com sucesso.",
      });
    }, 2000);
  };
  
  const connectableDevices = [
    {
      name: "Apple Watch",
      brand: "Apple",
      icon: <Apple className="h-8 w-8" />
    },
    {
      name: "Fitbit Versa",
      brand: "Fitbit",
      icon: <Watch className="h-8 w-8" />
    },
    {
      name: "Samsung Galaxy Watch",
      brand: "Samsung",
      icon: <Watch className="h-8 w-8" />
    },
    {
      name: "Mi Band 6",
      brand: "Xiaomi",
      icon: <Activity className="h-8 w-8" />
    },
    {
      name: "Withings Body+",
      brand: "Withings",
      icon: <Activity className="h-8 w-8" />
    }
  ];
  
  const getDataKey = () => {
    switch (activeData) {
      case "steps": return "steps";
      case "calories": return "calories";
      case "heart": return "heart";
      default: return "steps";
    }
  };
  
  const getDataColor = () => {
    switch (activeData) {
      case "steps": return "#8B5CF6";
      case "calories": return "#EF4444";
      case "heart": return "#EC4899";
      default: return "#8B5CF6";
    }
  };
  
  const getDataTitle = () => {
    switch (activeData) {
      case "steps": return "Passos";
      case "calories": return "Calorias (kcal)";
      case "heart": return "Freq. Cardíaca (bpm)";
      default: return "Passos";
    }
  };
  
  const connectedDevice = devices.find(device => device.connected);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Headphones className="h-5 w-5 mr-2" />
            Dispositivos Wearables
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1">
                <PlusCircle className="h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Conectar novo dispositivo</DialogTitle>
                <DialogDescription>
                  Selecione um dispositivo para conectar com o CorpoIdeal AI.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {connectableDevices.map((device, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:border-corpoideal-purple cursor-pointer"
                    onClick={() => {
                      // Simular adição de novo dispositivo
                      const newDevice: Device = {
                        id: `new-${index}`,
                        name: device.name,
                        type: "smartwatch",
                        brand: device.brand,
                        connected: true,
                        icon: device.icon,
                        lastSync: "Agora"
                      };
                      
                      setDevices([...devices, newDevice]);
                      
                      toast({
                        title: "Dispositivo adicionado",
                        description: `${device.name} foi conectado com sucesso.`,
                      });
                    }}
                  >
                    {device.icon}
                    <div className="text-center">
                      <p className="font-medium">{device.name}</p>
                      <p className="text-xs text-gray-500">{device.brand}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Dispositivos</h3>
            <div className="space-y-3">
              {devices.length > 0 ? (
                devices.map(device => (
                  <div key={device.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        {device.icon}
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-xs text-gray-500">{device.brand}</p>
                          {device.connected && device.lastSync && (
                            <p className="text-xs text-gray-500">Última sincronização: {device.lastSync}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`device-${device.id}`} className="text-sm">
                            {device.connected ? "Conectado" : "Desconectado"}
                          </Label>
                          <Switch 
                            id={`device-${device.id}`}
                            checked={device.connected}
                            onCheckedChange={() => 
                              device.connected 
                                ? handleDisconnect(device.id)
                                : handleConnect(device.id)
                            }
                          />
                        </div>
                        
                        {device.connected && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={syncInProgress === device.id}
                            onClick={() => handleSync(device.id)}
                          >
                            {syncInProgress === device.id ? "Sincronizando..." : "Sincronizar"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum dispositivo adicionado.</p>
                  <p className="text-sm">Clique em "Adicionar" para conectar seu primeiro dispositivo.</p>
                </div>
              )}
            </div>
          </div>
          
          {connectedDevice && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Dados de Atividade</h3>
                <div className="flex gap-2">
                  <Button 
                    variant={activeData === "steps" ? "default" : "outline"}
                    size="sm"
                    className={activeData === "steps" ? "bg-corpoideal-purple" : ""}
                    onClick={() => setActiveData("steps")}
                  >
                    Passos
                  </Button>
                  <Button 
                    variant={activeData === "calories" ? "default" : "outline"}
                    size="sm"
                    className={activeData === "calories" ? "bg-corpoideal-purple" : ""}
                    onClick={() => setActiveData("calories")}
                  >
                    Calorias
                  </Button>
                  <Button 
                    variant={activeData === "heart" ? "default" : "outline"}
                    size="sm"
                    className={activeData === "heart" ? "bg-corpoideal-purple" : ""}
                    onClick={() => setActiveData("heart")}
                  >
                    Freq. Cardíaca
                  </Button>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={getDataKey()}
                      stroke={getDataColor()}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Média Diária</p>
                  <p className="text-xl font-semibold">
                    {activeData === "steps" 
                      ? "9,830" 
                      : activeData === "calories" 
                        ? "380" 
                        : "70"}
                  </p>
                  <p className="text-xs text-gray-500">{getDataTitle()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Máximo</p>
                  <p className="text-xl font-semibold">
                    {activeData === "steps" 
                      ? "15,204" 
                      : activeData === "calories" 
                        ? "560" 
                        : "78"}
                  </p>
                  <p className="text-xs text-gray-500">{getDataTitle()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Mínimo</p>
                  <p className="text-xl font-semibold">
                    {activeData === "steps" 
                      ? "6,502" 
                      : activeData === "calories" 
                        ? "260" 
                        : "62"}
                  </p>
                  <p className="text-xs text-gray-500">{getDataTitle()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
