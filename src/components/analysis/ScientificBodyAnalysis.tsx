
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Ruler, User2 } from "lucide-react";
import { analyzeBodyProportions, classifyBiotipo, calculateIdealProportions } from "@/utils/bodyAnalysis";
import { useUserProfile } from "@/hooks/useUserProfile";

export function ScientificBodyAnalysis() {
  const { profile } = useUserProfile();

  if (!profile || !profile.height || !profile.chest) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <User2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Análise Científica Indisponível
          </h3>
          <p className="text-gray-500">
            Complete suas medidas corporais no perfil para ver a análise baseada em proporções clássicas.
          </p>
        </CardContent>
      </Card>
    );
  }

  const measurements = {
    height: parseFloat(profile.height),
    chest: parseFloat(profile.chest || '0'),
    leftArm: parseFloat(profile.leftArm || '0'),
    rightArm: parseFloat(profile.rightArm || '0'),
    waist: parseFloat(profile.waist || '0'),
    hips: parseFloat(profile.hips || '0'),
    leftThigh: parseFloat(profile.leftThigh || '0'),
    rightThigh: parseFloat(profile.rightThigh || '0'),
    leftCalf: parseFloat(profile.leftCalf || '0'),
    rightCalf: parseFloat(profile.rightCalf || '0')
  };

  const analysis = analyzeBodyProportions(measurements);
  const biotipo = classifyBiotipo(measurements.waist, measurements.height, parseFloat(profile.bodyFat || '0'));
  const idealProps = calculateIdealProportions(measurements.height, measurements.chest);

  return (
    <div className="space-y-6">
      {/* Biotipo Classification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-corpoideal-purple flex items-center">
            <User2 className="h-5 w-5 mr-2" />
            Classificação Científica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-corpoideal-purple/10 rounded-lg">
              <h4 className="font-semibold text-corpoideal-purple">Biotipo</h4>
              <Badge variant="outline" className="mt-1">{biotipo}</Badge>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-700">Relação Cintura/Altura</h4>
              <span className="text-sm font-medium">
                {((measurements.waist / measurements.height) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            <strong>Base Científica:</strong> Classificação antropométrica baseada em ISAK (International Society for the Advancement of Kinanthropometry) 
            e proporções áureas aplicadas ao físico humano.
          </div>
        </CardContent>
      </Card>

      {/* Proportional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-corpoideal-purple flex items-center">
            <Ruler className="h-5 w-5 mr-2" />
            Análise de Proporções Clássicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analysis.proportionScores).map(([key, score]) => {
              const bodyPart = {
                arms: 'Braços',
                thighs: 'Coxas',
                calves: 'Panturrilhas', 
                waist: 'Cintura'
              }[key];

              const isGood = score.status === 'ideal' || (score.status === 'above' && key !== 'waist');
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {isGood ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className="font-medium">{bodyPart}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">
                        {score.current.toFixed(1)}cm / {score.ideal.toFixed(1)}cm
                      </span>
                      <Badge 
                        variant={isGood ? "default" : "destructive"} 
                        className="ml-2 text-xs"
                      >
                        {score.percentage.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(score.percentage, 120)} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            <strong>Fórmulas Aplicadas:</strong><br/>
            • Braço = 50% da circunferência do tórax<br/>
            • Coxa = 53% do quadril (estimado pelo tórax)<br/>
            • Panturrilha = Igual ao braço<br/>
            • Cintura ideal = 46% da altura
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-700 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Pontos Fortes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.strengths.length > 0 ? (
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start">
                    <Target className="h-3 w-3 mt-1 mr-2 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Nenhum ponto forte identificado com base nas proporções clássicas.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-700 flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Pontos Fracos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-start">
                    <Target className="h-3 w-3 mt-1 mr-2 flex-shrink-0" />
                    {weakness}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Excelente! Suas proporções estão dentro dos padrões clássicos.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-corpoideal-purple flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Recomendações Estratégicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="bg-corpoideal-purple/5 p-3 rounded-lg border border-corpoideal-purple/20">
                  <div className="flex items-start">
                    <div className="bg-corpoideal-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-corpoideal-purple font-medium">{recommendation}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-bold text-blue-700 mb-1">💡 Estratégia de Desenvolvimento:</h4>
              <p className="text-xs text-blue-600">
                {biotipo === 'Ectomorfo' && 'Foco em volume e força. Priorize exercícios compostos e evite excesso de cardio.'}
                {biotipo === 'Mesomorfo' && 'Excelente potencial. Balance treino de força e hipertrofia conforme objetivos.'}
                {biotipo === 'Endomorfo' && 'Combine treino de força com cardio estratégico. Controle alimentar é fundamental.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
