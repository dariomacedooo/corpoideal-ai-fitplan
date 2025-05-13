
import React from 'react';

interface UserProfile {
  height?: string;
  weight?: string;
  bodyFat?: string;
  age?: string;
  sex?: string;
  lifestyle?: string;
  waist?: string;
  thigh?: string;
  calf?: string;
  profileCompleted?: boolean;
}

interface ProfileSummaryProps {
  userProfile: UserProfile | null;
}

export function ProfileSummary({ userProfile }: ProfileSummaryProps) {
  if (!userProfile) return null;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="font-medium text-corpoideal-purple mb-2">Seus dados</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {userProfile.height && userProfile.weight && (
          <>
            <div>Altura: {userProfile.height} cm</div>
            <div>Peso: {userProfile.weight} kg</div>
          </>
        )}
        {userProfile.bodyFat && (
          <div>Gordura corporal: {userProfile.bodyFat}%</div>
        )}
        {userProfile.age && (
          <div>Idade: {userProfile.age} anos</div>
        )}
        {userProfile.sex && (
          <div>Sexo: {userProfile.sex === 'masculino' ? 'Masculino' : 'Feminino'}</div>
        )}
        {userProfile.lifestyle && (
          <div className="col-span-2">
            Estilo de vida: {
              userProfile.lifestyle === 'sedentario' ? 'Sedentário' :
              userProfile.lifestyle === 'leve' ? 'Levemente ativo' :
              userProfile.lifestyle === 'moderado' ? 'Moderadamente ativo' :
              userProfile.lifestyle === 'ativo' ? 'Muito ativo' : 'Extremamente ativo'
            }
          </div>
        )}
        
        {/* Mostrar medidas adicionais se disponíveis */}
        {(userProfile.waist || userProfile.thigh || userProfile.calf) && (
          <div className="col-span-2 mt-2 border-t pt-2">
            <span className="font-medium">Medidas corporais:</span>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {userProfile.waist && (
                <div>Cintura: {userProfile.waist} cm</div>
              )}
              {userProfile.thigh && (
                <div>Coxa: {userProfile.thigh} cm</div>
              )}
              {userProfile.calf && (
                <div>Panturrilha: {userProfile.calf} cm</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
