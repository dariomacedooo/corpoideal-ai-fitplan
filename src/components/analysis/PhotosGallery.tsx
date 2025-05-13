
import React from 'react';

interface PhotosGalleryProps {
  frontPhotoUrl: string | null;
  backPhotoUrl: string | null;
  sidePhotoUrl: string | null;
}

export function PhotosGallery({ frontPhotoUrl, backPhotoUrl, sidePhotoUrl }: PhotosGalleryProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div>
          <img 
            src={frontPhotoUrl || ''} 
            alt="Foto frontal"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Frontal</p>
        </div>
        <div>
          <img 
            src={backPhotoUrl || ''} 
            alt="Foto de costas"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Costas</p>
        </div>
        <div>
          <img 
            src={sidePhotoUrl || ''} 
            alt="Foto lateral"
            className="rounded-lg w-full h-32 object-cover"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">Lateral</p>
        </div>
      </div>
    </div>
  );
}
