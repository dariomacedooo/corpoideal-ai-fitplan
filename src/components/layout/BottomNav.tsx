
import { Home, Activity, Utensils, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-corpoideal-purple" : "text-gray-500";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      <Link to="/home" className={`bottom-nav-item ${isActive('/home')}`}>
        <Home className="bottom-nav-icon" />
        <span>Início</span>
      </Link>
      <Link to="/training" className={`bottom-nav-item ${isActive('/training')}`}>
        <Activity className="bottom-nav-icon" />
        <span>Treino</span>
      </Link>
      <Link to="/nutrition" className={`bottom-nav-item ${isActive('/nutrition')}`}>
        <Utensils className="bottom-nav-icon" />
        <span>Nutrição</span>
      </Link>
      <Link to="/progress" className={`bottom-nav-item ${isActive('/progress')}`}>
        <TrendingUp className="bottom-nav-icon" />
        <span>Progresso</span>
      </Link>
    </div>
  );
}
