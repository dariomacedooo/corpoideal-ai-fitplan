
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <div>
          <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
            <img 
              src={frontPhotoUrl || '/placeholder.svg'} 
              alt="Foto frontal"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-xs text-white font-medium">Frontal</p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
            <img 
              src={backPhotoUrl || '/placeholder.svg'} 
              alt="Foto de costas"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-xs text-white font-medium">Costas</p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
            <img 
              src={leftSidePhotoUrl || '/placeholder.svg'} 
              alt="Foto lateral esquerda"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-xs text-white font-medium">Lateral Esq.</p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
            <img 
              src={rightSidePhotoUrl || '/placeholder.svg'} 
              alt="Foto lateral direita"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-xs text-white font-medium">Lateral Dir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
