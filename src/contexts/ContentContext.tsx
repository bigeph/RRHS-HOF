import * as React from 'react';
import initialContent from '../data/content.json';
import { inductees as initialInductees, Inductee } from '../data/inductees';

interface ContentContextType {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  content: Record<string, string>;
  inductees: Inductee[];
  updateContent: (id: string, value: string) => void;
  updateInductee: (inductee: Inductee) => void;
  addInductee: (inductee: Inductee) => void;
  deleteInductee: (id: string) => void;
  saveContent: () => Promise<void>;
  saveInductees: () => Promise<void>;
  triggerBuild: () => Promise<void>;
  downloadZip: () => void;
  getDeploymentData: () => string;
}

const ContentContext = React.createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState<Record<string, string>>(initialContent);
  const [inductees, setInductees] = React.useState<Inductee[]>(initialInductees);

  // Load content and inductees from localStorage on mount
  React.useEffect(() => {
    const savedContent = localStorage.getItem('rrhs_hall_of_fame_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }

    const savedInductees = localStorage.getItem('rrhs_hall_of_fame_inductees');
    if (savedInductees) {
      try {
        const parsed = JSON.parse(savedInductees);
        setInductees(parsed);
      } catch (e) {
        console.error('Failed to parse saved inductees', e);
      }
    }
  }, []);

  const updateContent = (id: string, value: string) => {
    setContent((prev) => ({ ...prev, [id]: value }));
  };

  const updateInductee = (updated: Inductee) => {
    setInductees(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  const addInductee = (newInductee: Inductee) => {
    setInductees(prev => [...prev, newInductee]);
  };

  const deleteInductee = (id: string) => {
    setInductees(prev => prev.filter(i => i.id !== id));
  };

  const saveContent = async () => {
    localStorage.setItem('rrhs_hall_of_fame_content', JSON.stringify(content));
    
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert('Site content saved successfully.');
      } else {
        alert('Saved to browser, but failed to update permanent storage.');
      }
    } catch (error) {
      console.error('Failed to save to server:', error);
      alert('Saved to browser, but failed to connect to server.');
    }
    
    setIsEditing(false);
  };

  const saveInductees = async () => {
    localStorage.setItem('rrhs_hall_of_fame_inductees', JSON.stringify(inductees));
    
    try {
      const response = await fetch('/api/save-inductees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inductees),
      });
      
      if (response.ok) {
        alert('Inductees saved successfully.');
      } else {
        alert('Saved to browser, but failed to update permanent storage.');
      }
    } catch (error) {
      console.error('Failed to save inductees to server:', error);
      alert('Saved to browser, but failed to connect to server.');
    }
  };

  const triggerBuild = async () => {
    try {
      const response = await fetch('/api/build', { method: 'POST' });
      const result = await response.json();
      if (result.success) {
        alert('Build completed successfully. You can now download the ZIP.');
      } else {
        alert('Build failed: ' + result.error);
      }
    } catch (error) {
      console.error('Build error:', error);
      alert('Failed to trigger build.');
    }
  };

  const downloadZip = () => {
    window.location.href = '/api/download-zip';
  };

  const getDeploymentData = () => {
    return JSON.stringify({ content, inductees }, null, 2);
  };

  return (
    <ContentContext.Provider value={{ 
      isEditing, 
      setIsEditing, 
      content, 
      inductees,
      updateContent, 
      updateInductee,
      addInductee,
      deleteInductee,
      saveContent, 
      saveInductees,
      triggerBuild, 
      downloadZip, 
      getDeploymentData 
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = React.useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
