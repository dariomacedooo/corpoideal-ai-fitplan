
import { useState } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { AchievementSystem } from "@/components/gamification/AchievementSystem";
import { MacroCalculator } from "@/components/nutrition/MacroCalculator";
import { OfflineMode } from "@/components/offline/OfflineMode";
import { WearableIntegration } from "@/components/wearables/WearableIntegration";
import { CommunityForum } from "@/components/community/CommunityForum";
import { PeriodicAssessment } from "@/components/progress/PeriodicAssessment";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("achievements");
  
  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-6">Recursos do CorpoIdeal AI</h1>
        
        <Tabs defaultValue="achievements" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex w-auto min-w-full">
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora</TabsTrigger>
              <TabsTrigger value="community">Comunidade</TabsTrigger>
              <TabsTrigger value="assessment">Avaliações</TabsTrigger>
              <TabsTrigger value="offline">Modo Offline</TabsTrigger>
              <TabsTrigger value="wearables">Wearables</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mt-6">
            <TabsContent value="achievements">
              <AchievementSystem />
            </TabsContent>
            
            <TabsContent value="calculator">
              <MacroCalculator />
            </TabsContent>
            
            <TabsContent value="community">
              <CommunityForum />
            </TabsContent>
            
            <TabsContent value="assessment">
              <PeriodicAssessment />
            </TabsContent>
            
            <TabsContent value="offline">
              <OfflineMode />
            </TabsContent>
            
            <TabsContent value="wearables">
              <WearableIntegration />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default FeaturesPage;
