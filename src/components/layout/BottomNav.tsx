
import { Home, User, Camera, BarChart3, Dumbbell, Apple, Download, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Início", path: "/home" },
    { icon: User, label: "Perfil", path: "/profile" },
    { icon: Camera, label: "Fotos", path: "/upload" },
    { icon: Dumbbell, label: "Treino", path: "/training" },
    { icon: Apple, label: "Nutrição", path: "/nutrition" },
    { icon: BarChart3, label: "Progresso", path: "/progress" },
    { icon: Settings, label: "Recursos", path: "/features" },
    { icon: Download, label: "Backup", path: "/import-export" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-1 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-1 rounded-lg transition-colors ${
                isActive
                  ? "text-corpoideal-purple bg-corpoideal-purple/10"
                  : "text-gray-500 hover:text-corpoideal-purple"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
