
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Brain, Sparkles } from "lucide-react";
import { useAICoach } from "@/hooks/useAICoach";

export function AICoachTips() {
  const { dailyTips, isLoading, regenerateTips } = useAICoach();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nutrition':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'training':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'curiosity':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'supplement':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'nutrition':
        return 'Nutrição';
      case 'training':
        return 'Treino';
      case 'curiosity':
        return 'Curiosidade';
      case 'supplement':
        return 'Suplemento';
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-corpoideal-purple">
            <Brain className="h-5 w-5 mr-2" />
            Coach Virtual IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corpoideal-purple"></div>
            <span className="ml-3 text-gray-600">Gerando dicas personalizadas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-corpoideal-purple">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Coach Virtual IA
            <Sparkles className="h-4 w-4 ml-1 text-yellow-500" />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={regenerateTips}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyTips.map((tip) => (
            <div
              key={tip.id}
              className="p-4 rounded-2xl border bg-card-soft shadow-subtle"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{tip.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(tip.type)}`}
                    >
                      {getTypeLabel(tip.type)}
                    </span>
                    <h4 className="font-medium text-corpoideal-dark">{tip.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
