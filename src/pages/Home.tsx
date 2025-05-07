
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-corpoideal-purple mb-2">Bem-vindo ao CorpoIdeal AI</h1>
          <p className="text-gray-600">Seu personal trainer com inteligência artificial</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-corpoideal-purple to-corpoideal-darkpurple text-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Comece sua jornada</h2>
            <p className="mb-4">Envie suas fotos para receber uma análise corporal personalizada e um plano de treino sob medida.</p>
            <Button 
              variant="secondary"
              onClick={() => navigate('/upload')}
              className="w-full"
            >
              Iniciar análise corporal
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/training')}
              className="h-32 flex flex-col"
            >
              <span className="text-lg font-medium mb-2">Treinos</span>
              <span className="text-xs text-gray-500">Seus exercícios personalizados</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/nutrition')}
              className="h-32 flex flex-col"
            >
              <span className="text-lg font-medium mb-2">Nutrição</span>
              <span className="text-xs text-gray-500">Plano alimentar personalizado</span>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/progress')}
            className="w-full"
          >
            Ver meu progresso
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Home;
