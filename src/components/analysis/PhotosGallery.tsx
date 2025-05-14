
import React from 'react';

interface PhotosGalleryProps {
  frontPhotoUrl: string | null;
  backPhotoUrl: string | null;
  leftSidePhotoUrl: string | null;
  rightSidePhotoUrl: string | null;
}

export function PhotosGallery({ 
  frontPhotoUrl, 
  backPhotoUrl, 
  leftSidePhotoUrl, 
  rightSidePhotoUrl 
}: PhotosGalleryProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div>
          <img 
            src={frontPhotoUrl || '/placeholder.svg'} 
            alt="Foto frontal"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Frontal</p>
        </div>
        <div>
          <img 
            src={backPhotoUrl || '/placeholder.svg'} 
            alt="Foto de costas"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Costas</p>
        </div>
        <div>
          <img 
            src={leftSidePhotoUrl || '/placeholder.svg'} 
            alt="Foto lateral esquerda"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Lateral Esq.</p>
        </div>
        <div>
          <img 
            src={rightSidePhotoUrl || '/placeholder.svg'} 
            alt="Foto lateral direita"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Lateral Dir.</p>
        </div>
      </div>
    </div>
  );
}
