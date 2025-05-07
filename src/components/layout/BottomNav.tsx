
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Dumbbell, 
  Apple, 
  LineChart,
  User
} from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: "/home", icon: Home, label: "Início" },
    { path: "/training", icon: Dumbbell, label: "Treino" },
    { path: "/nutrition", icon: Apple, label: "Nutrição" },
    { path: "/progress", icon: LineChart, label: "Progresso" },
    { path: "/profile", icon: User, label: "Perfil" }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] flex justify-around p-2 z-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center py-1 px-3 rounded-md transition-colors ${
            isActive(item.path)
              ? "text-corpoideal-purple"
              : "text-gray-500 hover:text-corpoideal-purple"
          }`}
        >
          <item.icon size={20} />
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
