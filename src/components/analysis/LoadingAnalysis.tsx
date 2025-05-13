
import React from 'react';

export function LoadingAnalysis() {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-16 h-16 border-4 border-corpoideal-purple border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Analisando suas fotos...</p>
    </div>
  );
}
