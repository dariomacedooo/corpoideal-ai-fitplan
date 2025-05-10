
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Wifi, WifiOff, Download, Check, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export function OfflineMode() {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineEnabled, setOfflineEnabled] = useState<boolean>(localStorage.getItem('offlineMode') === 'true');
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadType, setDownloadType] = useState<string>("all");
  
  // Dados mockados para offline
  const offlineData = {
    all: {
      size: "42 MB",
      items: ["Planos de treino", "Planos de dieta", "Exercícios", "Receitas"],
      downloaded: false
    },
    workouts: {
      size: "18 MB",
      items: ["Planos de treino", "Exercícios"],
      downloaded: true
    },
    diet: {
      size: "15 MB",
      items: ["Planos de dieta", "Receitas"],
      downloaded: false
    },
    progress: {
      size: "4 MB",
      items: ["Histórico de progresso", "Gráficos"],
      downloaded: false
    }
  };
  
  // Monitor network status
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
  
  // Save offline mode preference
  useEffect(() => {
    localStorage.setItem('offlineMode', offlineEnabled.toString());
  }, [offlineEnabled]);
  
  const handleToggleOfflineMode = () => {
    setOfflineEnabled(!offlineEnabled);
    
    toast({
      title: !offlineEnabled ? "Modo offline ativado" : "Modo offline desativado",
      description: !offlineEnabled 
        ? "Os dados serão armazenados para uso sem internet." 
        : "Os dados não serão mais armazenados localmente.",
    });
  };
  
  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          
          toast({
            title: "Download concluído",
            description: `Dados para ${
              downloadType === 'all' ? 'uso offline' : 
              downloadType === 'workouts' ? 'treinos' : 
              downloadType === 'diet' ? 'dieta' : 'progresso'
            } baixados com sucesso.`,
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            {isOnline ? (
              <Wifi className="h-5 w-5 mr-2" />
            ) : (
              <WifiOff className="h-5 w-5 mr-2" />
            )}
            Modo Offline
          </CardTitle>
          <Badge variant={isOnline ? "outline" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Ativar modo offline</h3>
              <p className="text-sm text-gray-500">
                Baixe os dados para usar o app sem conexão com a internet
              </p>
            </div>
            <Switch 
              checked={offlineEnabled}
              onCheckedChange={handleToggleOfflineMode}
            />
          </div>
          
          {offlineEnabled && (
            <>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Dados para download</Label>
                  <Select 
                    defaultValue="all"
                    onValueChange={setDownloadType}
                    disabled={isDownloading}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os dados</SelectItem>
                      <SelectItem value="workouts">Treinos</SelectItem>
                      <SelectItem value="diet">Dieta</SelectItem>
                      <SelectItem value="progress">Progresso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tamanho:</span>
                    <span className="font-medium">{offlineData[downloadType as keyof typeof offlineData].size}</span>
                  </div>
                  <div className="text-sm">
                    <span className="mb-1 block">Inclui:</span>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {offlineData[downloadType as keyof typeof offlineData].items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {offlineData[downloadType as keyof typeof offlineData].downloaded && (
                    <div className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Já baixado
                    </div>
                  )}
                </div>
                
                {isDownloading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso:</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <Progress value={downloadProgress} className="h-2" />
                  </div>
                )}
                
                <Button 
                  className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                  onClick={handleDownload}
                  disabled={isDownloading || offlineData[downloadType as keyof typeof offlineData].downloaded}
                >
                  {isDownloading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Baixando...
                    </span>
                  ) : offlineData[downloadType as keyof typeof offlineData].downloaded ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      Baixado
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar para uso offline
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium mb-1">Importante:</p>
                  <p>O modo offline permite acessar conteúdo baixado, mas algumas funcionalidades como comunidade e compartilhamento só estão disponíveis online.</p>
                </div>
              </div>
            </>
          )}
          
          {!isOnline && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium mb-1">Você está offline</p>
                <p>Conecte-se à internet para obter acesso a todas as funcionalidades.</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
