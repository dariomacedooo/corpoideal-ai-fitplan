
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, Heart, BarChart3, Users } from "lucide-react";

const actions = [
  {
    title: "Treino",
    icon: Activity,
    color: "from-purple-400 to-purple-600",
    route: "/training",
  },
  {
    title: "Nutrição",
    icon: Heart,
    color: "from-green-400 to-green-600",
    route: "/nutrition",
  },
  {
    title: "Progresso",
    icon: BarChart3,
    color: "from-blue-400 to-blue-600",
    route: "/progress",
  },
  {
    title: "Perfil",
    icon: Users,
    color: "from-orange-400 to-orange-600",
    route: "/profile",
  },
];

export function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
      {actions.map(({ title, icon: Icon, color, route }) => (
        <Button
          onClick={() => navigate(route)}
          key={title}
          className={`w-full flex flex-col px-0 py-4 items-center justify-center bg-gradient-to-br ${color} text-white rounded-xl shadow-md font-bold text-xs sm:text-sm hover:scale-105 transition`}
          style={{ minHeight: 70 }}
        >
          <Icon className="w-7 h-7 mb-1" />
          <span>{title}</span>
        </Button>
      ))}
    </div>
  )
}
