
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Target, TrendingUp, AlertCircle } from "lucide-react";
import { getComprehensiveAnalysis, formatAnthropometricResults } from "@/utils/nutritionCalculator";

interface ScientificAnalysisProps {
  userProfile: any;
}

export function ScientificAnalysis({ userProfile }: ScientificAnalysisProps) {
  if (!userProfile) return null;

  const analysis = getComprehensiveAnalysis(userProfile);
  const formattedResults = formatAnthropometricResults(analysis);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelente': return 'bg-green-500';
      case 'bom': return 'bg-blue-500';
      case 'adequado': return 'bg-yellow-500';
      case 'fraco': return 'bg-orange-500';
      case 'muito-fraco': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excelente': return 'Excelente';
      case 'bom': return 'Bom';
      case 'adequado': return 'Adequado';
      case 'fraco': return 'Precisa melhorar';
      case 'muito-fraco': return 'Muito fraco';
      default: return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      {/* Análise Metabólica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-corpoideal-purple">
            <Activity className="h-5 w-5" />
            Análise Metabólica Científica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Taxa Metabólica Basal</div>
              <div className="text-xl font-bold text-corpoideal-purple">
                {formattedResults.metabolismo.tmb} kcal/dia
              </div>
              <div className="text-xs text-gray-500">{formattedResults.metabolismo.metodo}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Gasto Energético Total</div>
              <div className="text-xl font-bold text-corpoideal-purple">
                {formattedResults.metabolismo.tdee} kcal/dia
              </div>
              <div className="text-xs text-gray-500">TDEE calculado</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise de Proporções */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-corpoideal-purple">
            <Target className="h-5 w-5" />
            Proporções Clássicas (Padrão Fisiculturismo)
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Score Geral:</span>
            <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
              {formattedResults.resumo.scoreGeral}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formattedResults.proporcoes.map((prop, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{prop.medicao}</span>
                <Badge className={`${getStatusColor(prop.status)} text-white border-0`}>
                  {getStatusText(prop.status)}
                </Badge>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Atual: {prop.atual}</span>
                <span>Ideal: {prop.ideal}</span>
                <span className="font-medium">{prop.percentual}</span>
              </div>
              
              <Progress 
                value={Math.min(parseFloat(prop.percentual), 100)} 
                className="h-2"
              />
              
              <div className="text-xs text-gray-500 italic">
                {prop.recomendacao}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pontos Fortes e Fracos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <TrendingUp className="h-5 w-5" />
              Pontos Fortes (≥95% ideal)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formattedResults.resumo.pontoFortes.length > 0 ? (
              <ul className="space-y-2">
                {formattedResults.resumo.pontoFortes.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Nenhum ponto forte identificado ainda. Continue treinando!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              Pontos Fracos (&lt;85% ideal)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formattedResults.resumo.pontosFracos.length > 0 ? (
              <ul className="space-y-2">
                {formattedResults.resumo.pontosFracos.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Excelente! Todas as proporções estão adequadas.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recomendações Específicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-corpoideal-purple">
            Recomendações Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {formattedResults.resumo.recomendacoes.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-corpoideal-purple text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
