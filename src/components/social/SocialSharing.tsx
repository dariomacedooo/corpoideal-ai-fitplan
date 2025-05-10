
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Share,
  Facebook,
  Instagram,
  Twitter,
  Copy
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SocialSharingProps {
  achievementName?: string;
  progressValue?: number;
  workoutName?: string;
}

export function SocialSharing({ 
  achievementName = "5 treinos completados", 
  progressValue = 15, 
  workoutName = "Treino de Força" 
}: SocialSharingProps) {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  
  // Mock templates for sharing
  const templates = [
    {
      title: "Conquista",
      message: `🏆 Acabei de desbloquear "${achievementName}" no meu aplicativo de fitness! #CorpoIdealAI #FitnessJourney`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop"
    },
    {
      title: "Progresso",
      message: `💪 Estou ${progressValue}% mais perto do meu objetivo fitness! #CorpoIdealAI #FitnessProgress`,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop"
    },
    {
      title: "Treino",
      message: `🔥 Acabei de completar meu "${workoutName}"! Sentindo-me incrível! #CorpoIdealAI #WorkoutComplete`,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1740&auto=format&fit=crop"
    }
  ];
  
  const handleShare = (platform: string) => {
    // Na vida real, abriríamos uma janela de compartilhamento
    // ou usaríamos as APIs de compartilhamento
    toast({
      title: `Compartilhado no ${platform}`,
      description: "Sua conquista foi compartilhada com sucesso!",
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(templates[selectedTemplate].message);
    toast({
      title: "Link copiado",
      description: "Texto copiado para a área de transferência.",
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Share className="h-5 w-5 mr-2" />
          Compartilhar Progresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {templates.map((template, index) => (
              <div 
                key={index}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedTemplate === index 
                    ? 'ring-2 ring-corpoideal-purple' 
                    : 'hover:border-corpoideal-purple/50'
                }`}
                onClick={() => setSelectedTemplate(index)}
              >
                <div className="h-24 overflow-hidden">
                  <img 
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium">{template.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Prévia:</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src={templates[selectedTemplate].image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm">{templates[selectedTemplate].message}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className="flex gap-2"
              onClick={() => handleShare("Facebook")}
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </Button>
            <Button 
              variant="outline"
              className="flex gap-2"
              onClick={() => handleShare("Instagram")}
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Button>
            <Button 
              variant="outline"
              className="flex gap-2"
              onClick={() => handleShare("Twitter")}
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Button>
            <Button 
              variant="outline"
              className="flex gap-2"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
              <span>Copiar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
