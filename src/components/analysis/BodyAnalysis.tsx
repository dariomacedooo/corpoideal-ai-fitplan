
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BodyAnalysisProps {
  posture: string;
  fatPercentage: string;
  symmetry: string;
  bmi?: string;  // Adding the optional bmi prop
}

export function BodyAnalysis({ posture, fatPercentage, symmetry, bmi }: BodyAnalysisProps) {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple">Análise Corporal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Postura</h3>
          <div className="flex items-center gap-2">
            <Badge variant={posture === 'Alinhada' ? 'default' : 'secondary'}>
              {posture}
            </Badge>
            <p className="text-sm text-gray-700">
              {posture === 'Alinhada' 
                ? 'Sua postura parece bem alinhada. Continue mantendo uma boa postura!' 
                : 'Sua postura apresenta alguns desalinhamentos que podem ser corrigidos com exercícios específicos.'}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Composição Corporal</h3>
          <div className="flex items-center gap-2">
            <Badge variant={fatPercentage === 'Baixa' ? 'default' : fatPercentage === 'Moderada' ? 'outline' : 'secondary'}>
              Gordura {fatPercentage}
            </Badge>
            <p className="text-sm text-gray-700">
              {fatPercentage === 'Baixa' 
                ? 'Sua porcentagem de gordura corporal parece estar abaixo da média.' 
                : fatPercentage === 'Moderada' 
                  ? 'Sua porcentagem de gordura corporal parece estar na média.' 
                  : 'Sua porcentagem de gordura corporal parece estar acima da média.'}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Simetria</h3>
          <div className="flex items-center gap-2">
            <Badge variant={symmetry === 'Equilibrado' ? 'default' : 'secondary'}>
              {symmetry}
            </Badge>
            <p className="text-sm text-gray-700">
              {symmetry === 'Equilibrado' 
                ? 'Seu corpo apresenta boa simetria entre os lados.' 
                : 'Seu corpo apresenta algumas assimetrias que podem ser equilibradas com exercícios específicos.'}
            </p>
          </div>
        </div>
        
        {/* Add BMI display if provided */}
        {bmi && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Índice de Massa Corporal (IMC)</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                IMC: {bmi}
              </Badge>
              <p className="text-sm text-gray-700">
                {parseFloat(bmi) < 18.5 
                  ? 'Seu IMC indica que você está abaixo do peso ideal.' 
                  : parseFloat(bmi) < 25 
                    ? 'Seu IMC está na faixa considerada saudável.' 
                    : parseFloat(bmi) < 30
                      ? 'Seu IMC indica sobrepeso.'
                      : 'Seu IMC indica obesidade.'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
