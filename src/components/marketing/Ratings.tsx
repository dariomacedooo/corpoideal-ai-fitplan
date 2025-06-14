
import { Star } from "lucide-react";

export function Ratings() {
  return (
    <div className="flex flex-col items-center mt-6 mb-2">
      <div className="flex gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-orange-400 w-7 h-7 fill-orange-400 drop-shadow" strokeWidth={1.5} />
        ))}
      </div>
      <span className="text-sm md:text-base text-gray-600 font-medium">Avaliação 5.0 de 890+ usuários</span>
    </div>
  );
}
