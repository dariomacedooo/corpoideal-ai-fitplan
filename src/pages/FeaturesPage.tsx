
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WearableIntegration } from "@/components/wearables/WearableIntegration";
import { CommunityForum } from "@/components/community/CommunityForum";
import { OfflineMode } from "@/components/offline/OfflineMode";
import { ScheduleCalendar } from "@/components/calendar/ScheduleCalendar";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

const FeaturesPage = () => {
  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Recursos Avançados</h1>
        <p className="text-gray-600 mb-6">
          Explore todas as funcionalidades do CorpoIdeal AI para maximizar seus resultados.
        </p>
        
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="calendar">Agenda</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
            <TabsTrigger value="wearables">Dispositivos</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <ScheduleCalendar />
          </TabsContent>
          
          <TabsContent value="community" className="space-y-6">
            <CommunityForum />
          </TabsContent>
          
          <TabsContent value="wearables" className="space-y-6">
            <WearableIntegration />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationCenter />
          </TabsContent>
          
          <TabsContent value="offline" className="space-y-6">
            <OfflineMode />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default FeaturesPage;
