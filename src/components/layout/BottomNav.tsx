
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
    <nav className="fixed bottom-0 left-0 right-0 bg-velocity-charcoal/95 backdrop-blur-md border-t border-velocity-lime/20 px-2 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 relative ${
                isActive
                  ? "text-velocity-lime bg-velocity-lime/10 shadow-lg"
                  : "text-velocity-lime/60 hover:text-velocity-electric hover:bg-velocity-lime/5"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-velocity-lime/20 to-velocity-electric/20 rounded-lg blur-sm"></div>
              )}
              <Icon className={`h-5 w-5 relative z-10 transition-all duration-300 ${
                isActive ? "animate-glow-pulse" : ""
              }`} />
              <span className={`text-xs mt-1 font-medium relative z-10 ${
                isActive ? "text-velocity-lime" : ""
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-8 h-0.5 bg-gradient-to-r from-velocity-lime to-velocity-electric rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
