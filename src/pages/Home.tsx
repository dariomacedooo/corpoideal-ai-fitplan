
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleCalendar } from "@/components/calendar/ScheduleCalendar";
import { SocialSharing } from "@/components/social/SocialSharing";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Carregar nome do usuário do localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserName(profile.name || "");
    }
  }, []);

  return (
    <div className="pb-16 pt-14">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm flex items-center justify-between px-4 py-2 z-10">
        <div className="flex items-center">
          <h1 className="font-bold text-lg text-corpoideal-purple">CorpoIdeal AI</h1>
        </div>
        <NotificationCenter />
      </div>
      
      <div className="px-4 py-6">
        <DashboardSummary userName={userName} />
        
        <div className="mt-8">
          <Tabs defaultValue="calendar">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar">
              <ScheduleCalendar />
            </TabsContent>
            
            <TabsContent value="social">
              <SocialSharing />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button 
            className="h-24 bg-gradient-to-br from-corpoideal-purple to-corpoideal-darkpurple hover:opacity-90"
            onClick={() => navigate('/training')}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium mb-1">Treinos</span>
              <span className="text-xs">Ver seu plano</span>
            </div>
          </Button>
          
          <Button 
            className="h-24 bg-gradient-to-br from-corpoideal-darkpurple to-corpoideal-purple hover:opacity-90"
            onClick={() => navigate('/nutrition')}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium mb-1">Nutrição</span>
              <span className="text-xs">Ver seu plano</span>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="h-24 border-corpoideal-purple text-corpoideal-purple hover:bg-corpoideal-purple/10"
            onClick={() => navigate('/progress')}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium mb-1">Progresso</span>
              <span className="text-xs">Acompanhar evolução</span>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="h-24 border-corpoideal-purple text-corpoideal-purple hover:bg-corpoideal-purple/10"
            onClick={() => navigate('/profile')}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium mb-1">Perfil</span>
              <span className="text-xs">Gerenciar dados</span>
            </div>
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Home;
