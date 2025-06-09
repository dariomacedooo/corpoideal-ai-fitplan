
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useAICoach } from "@/hooks/useAICoach";

export function MotivationalQuote() {
  const { motivationalQuote, isLoading } = useAICoach();

  if (isLoading || !motivationalQuote) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-purple-vibrant to-purple-deep text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Quote className="h-8 w-8 text-white/80 flex-shrink-0 mt-1" />
          <div>
            <p className="text-lg font-medium leading-relaxed mb-2">
              "{motivationalQuote.text}"
            </p>
            <p className="text-white/80 text-sm">
              — {motivationalQuote.author}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
