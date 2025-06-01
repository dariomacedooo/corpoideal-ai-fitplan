
import { useState } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, FileText, Database } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const ImportExportPage = () => {
  const [importData, setImportData] = useState('');
  const { profile } = useUserProfile();
  const { toast } = useToast();

  const exportUserData = () => {
    const exportObject = {
      profile: profile,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportObject, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `corpoideal-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Dados exportados!",
      description: "Seu backup foi baixado com sucesso.",
    });
  };

  const exportToExcel = () => {
    // Criar dados CSV para abertura no Excel
    let csvContent = "RELATÓRIO CORPO IDEAL\n\n";
    
    if (profile) {
      csvContent += "DADOS PESSOAIS\n";
      csvContent += `Nome:,${profile.name || 'Não informado'}\n`;
      csvContent += `Altura:,${profile.height}cm\n`;
      csvContent += `Peso:,${profile.weight}kg\n`;
      csvContent += `Idade:,${profile.age} anos\n`;
      csvContent += `Sexo:,${profile.sex}\n`;
      csvContent += `Objetivo:,${profile.goal}\n`;
      csvContent += `Experiência:,${profile.trainingExperience}\n`;
      csvContent += `Local de treino:,${profile.trainingLocation}\n`;
      csvContent += `Orçamento:,${profile.budget}\n\n`;
      
      csvContent += "MEDIDAS CORPORAIS\n";
      csvContent += `Peito:,${profile.chest || 'Não informado'}cm\n`;
      csvContent += `Braço esquerdo:,${profile.leftArm || 'Não informado'}cm\n`;
      csvContent += `Braço direito:,${profile.rightArm || 'Não informado'}cm\n`;
      csvContent += `Cintura:,${profile.waist || 'Não informado'}cm\n`;
      csvContent += `Quadril:,${profile.hips || 'Não informado'}cm\n`;
      csvContent += `Coxa esquerda:,${profile.leftThigh || 'Não informado'}cm\n`;
      csvContent += `Coxa direita:,${profile.rightThigh || 'Não informado'}cm\n`;
      csvContent += `Panturrilha esquerda:,${profile.leftCalf || 'Não informado'}cm\n`;
      csvContent += `Panturrilha direita:,${profile.rightCalf || 'Não informado'}cm\n\n`;
      
      if (profile.healthIssues && profile.healthIssues.length > 0) {
        csvContent += "QUESTÕES DE SAÚDE\n";
        profile.healthIssues.forEach(issue => {
          csvContent += `${issue}\n`;
        });
        csvContent += "\n";
      }
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-corpoideal-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Relatório Excel exportado!",
      description: "Arquivo CSV criado para abertura no Excel.",
    });
  };

  const importUserData = () => {
    try {
      const data = JSON.parse(importData);
      
      if (data.profile) {
        localStorage.setItem('userProfile', JSON.stringify(data.profile));
        
        toast({
          title: "Dados importados!",
          description: "Seus dados foram restaurados com sucesso.",
        });
        
        setImportData('');
        
        // Recarregar a página para atualizar os dados
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error('Formato inválido');
      }
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Formato de dados inválido. Verifique o arquivo.",
        variant: "destructive",
      });
    }
  };

  const generateTemplateData = () => {
    const template = {
      profile: {
        name: "Seu Nome",
        height: "170",
        weight: "70",
        age: "30",
        sex: "masculino",
        goal: "ganhar-massa",
        trainingExperience: "intermediario",
        trainingLocation: "academia",
        budget: "301-500",
        lifestyle: "ativo",
        bodyFat: "15",
        chest: "100",
        leftArm: "35",
        rightArm: "35",
        waist: "80",
        hips: "95",
        leftThigh: "55",
        rightThigh: "55",
        leftCalf: "35",
        rightCalf: "35",
        healthIssues: [],
        additionalInfo: "",
        profileCompleted: true
      },
      instructions: {
        goal_options: ["perder-peso", "ganhar-massa", "ganhar-peso", "manter-peso"],
        experience_options: ["iniciante", "intermediario", "avancado"],
        location_options: ["academia", "casa", "ar-livre"],
        budget_options: ["100-300", "301-500", "501-800", "801+"],
        lifestyle_options: ["sedentario", "leve", "moderado", "ativo"],
        sex_options: ["masculino", "feminino"]
      }
    };

    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template-corpoideal.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Template baixado!",
      description: "Use este arquivo como modelo para importação.",
    });
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Importar/Exportar Dados</h1>
        <p className="text-gray-600 mb-6">
          Faça backup dos seus dados ou importe informações de outro dispositivo.
        </p>
        
        <div className="space-y-6">
          {/* Exportar Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-corpoideal-purple flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Exportar Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Baixe seus dados para fazer backup ou transferir para outro dispositivo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={exportUserData}
                  className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Exportar Backup Completo
                </Button>
                
                <Button 
                  onClick={exportToExcel}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar para Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Importar Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-corpoideal-purple flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Importar Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Cole o conteúdo do arquivo de backup para restaurar seus dados.
              </p>
              
              <Textarea
                placeholder="Cole o conteúdo do arquivo JSON aqui..."
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
                className="font-mono text-xs"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={importUserData}
                  disabled={!importData.trim()}
                  className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Dados
                </Button>
                
                <Button 
                  onClick={generateTemplateData}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Template
                </Button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  <strong>Atenção:</strong> Importar dados irá substituir todas as informações atuais. 
                  Certifique-se de fazer backup antes de importar novos dados.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Instruções */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-corpoideal-purple">Como usar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Exportar:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                    <li>Use "Backup Completo" para salvar todos os dados em formato JSON</li>
                    <li>Use "Exportar para Excel" para gerar relatório em formato CSV</li>
                  </ul>
                </div>
                
                <div>
                  <strong>Importar:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                    <li>Abra o arquivo de backup em um editor de texto</li>
                    <li>Copie todo o conteúdo e cole na área acima</li>
                    <li>Clique em "Importar Dados" para restaurar</li>
                  </ul>
                </div>
                
                <div>
                  <strong>Template:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                    <li>Baixe o template para ver a estrutura dos dados</li>
                    <li>Edite conforme necessário e importe</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ImportExportPage;
