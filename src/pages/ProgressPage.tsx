
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressTracker } from "@/components/progress/ProgressTracker";

// Interface for progress entries
interface ProgressEntry {
  date: string;
  frontPhoto: string;
  sidePhoto: string;
  notes?: string;
}

const ProgressPage = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  
  useEffect(() => {
    // In a real app, this would be loaded from a database/server
    // For this MVP, we'll check localStorage for any initial photos
    const frontPhotoUrl = localStorage.getItem('frontPhotoUrl');
    const sidePhotoUrl = localStorage.getItem('sidePhotoUrl');
    
    if (frontPhotoUrl && sidePhotoUrl) {
      // Add initial entry with the analysis photos
      const initialEntry: ProgressEntry = {
        date: new Date().toLocaleDateString('pt-BR'),
        frontPhoto: frontPhotoUrl,
        sidePhoto: sidePhotoUrl,
        notes: 'Fotos iniciais para análise'
      };
      
      setEntries([initialEntry]);
    }
  }, []);
  
  const handleAddProgress = (frontPhoto: File, sidePhoto: File) => {
    // Create URLs for the photos
    const frontPhotoUrl = URL.createObjectURL(frontPhoto);
    const sidePhotoUrl = URL.createObjectURL(sidePhoto);
    
    // Create new entry
    const newEntry: ProgressEntry = {
      date: new Date().toLocaleDateString('pt-BR'),
      frontPhoto: frontPhotoUrl,
      sidePhoto: sidePhotoUrl
    };
    
    // Add to entries
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Acompanhe seu Progresso</h1>
        <p className="text-gray-600 mb-6">
          Registre suas fotos semanalmente para visualizar sua evolução ao longo do tempo.
        </p>
        
        <ProgressTracker 
          entries={entries}
          onAddProgress={handleAddProgress}
        />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProgressPage;
