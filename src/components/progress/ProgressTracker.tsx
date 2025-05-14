
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhotoUpload } from "../photo/PhotoUpload";
import { useToast } from "@/components/ui/use-toast";

interface ProgressEntry {
  date: string;
  frontPhoto: string;
  sidePhoto: string;
  notes?: string;
}

interface ProgressTrackerProps {
  entries: ProgressEntry[];
  onAddProgress: (frontPhoto: File, sidePhoto: File) => void;
}

export function ProgressTracker({ entries, onAddProgress }: ProgressTrackerProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);
  const { toast } = useToast();

  const handlePhotoUploaded = (file: File, type: 'front' | 'back' | 'leftSide' | 'rightSide') => {
    if (type === 'front') {
      setFrontPhoto(file);
    } else if (type === 'rightSide') {
      setSidePhoto(file);
    }
  };

  const handleSaveProgress = () => {
    if (frontPhoto && sidePhoto) {
      onAddProgress(frontPhoto, sidePhoto);
      setShowUpload(false);
      setFrontPhoto(null);
      setSidePhoto(null);
      
      toast({
        title: "Progresso salvo",
        description: "Suas fotos foram adicionadas com sucesso!",
      });
    } else {
      toast({
        title: "Erro ao salvar progresso",
        description: "Por favor, envie ambas as fotos.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-corpoideal-purple">Seu Progresso</CardTitle>
        {!showUpload && (
          <Button 
            variant="outline"
            onClick={() => setShowUpload(true)}
          >
            Adicionar fotos
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {showUpload ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2 text-center">Foto Frontal</h3>
                <PhotoUpload 
                  type="front" 
                  onPhotoUploaded={handlePhotoUploaded}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 text-center">Foto Lateral</h3>
                <PhotoUpload 
                  type="rightSide" 
                  onPhotoUploaded={handlePhotoUploaded}
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowUpload(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProgress}
                disabled={!frontPhoto || !sidePhoto}
                className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
              >
                Salvar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {entries.length > 0 ? (
              <div className="space-y-6">
                {entries.map((entry, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="mb-2">
                      <h3 className="font-medium">{entry.date}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img 
                          src={entry.frontPhoto} 
                          alt={`Foto frontal em ${entry.date}`}
                          className="rounded-md w-full h-48 object-cover"
                        />
                      </div>
                      <div>
                        <img 
                          src={entry.sidePhoto} 
                          alt={`Foto lateral em ${entry.date}`}
                          className="rounded-md w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-500 mt-2">{entry.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Ainda não há registros de progresso</p>
                <Button
                  onClick={() => setShowUpload(true)}
                  className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  Adicionar primeiras fotos
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
