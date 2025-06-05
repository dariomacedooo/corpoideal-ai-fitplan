
import { Home, User, Camera, BarChart3, Dumbbell, Apple, Download, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Início", path: "/home" },
    { icon: Dumbbell, label: "Treino", path: "/training" },
    { icon: Apple, label: "Nutrição", path: "/nutrition" },
    { icon: BarChart3, label: "Progresso", path: "/progress" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-fitness-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 relative min-w-[60px] ${
                isActive
                  ? "bg-fitness-lime/20 text-fitness-lime scale-105"
                  : "text-fitness-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-fitness-lime/10 rounded-2xl animate-pulse-lime"></div>
              )}
              
              <Icon className={`h-6 w-6 relative z-10 transition-all duration-300 ${
                isActive ? "animate-pulse-lime" : ""
              }`} />
              
              <span className={`text-xs mt-1 font-medium relative z-10 transition-all duration-300 ${
                isActive ? "text-fitness-lime" : ""
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <div className="absolute -bottom-1 w-8 h-1 bg-fitness-lime rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
