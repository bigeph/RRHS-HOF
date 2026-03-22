import * as React from 'react';
import initialContent from '../data/content.json';

interface ContentContextType {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  content: Record<string, string>;
  updateContent: (id: string, value: string) => void;
  saveContent: () => Promise<void>;
  triggerBuild: () => Promise<void>;
  downloadZip: () => void;
  getDeploymentData: () => string;
}

const ContentContext = React.createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState<Record<string, string>>(initialContent);

  // Load content from localStorage on mount (overlays the hardcoded defaults)
  React.useEffect(() => {
    const saved = localStorage.getItem('rrhs_hall_of_fame_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
  }, []);

  const updateContent = (id: string, value: string) => {
    setContent((prev) => ({ ...prev, [id]: value }));
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
        alert('Changes saved successfully to permanent storage.');
      } else {
        alert('Saved to browser, but failed to update permanent storage.');
      }
    } catch (error) {
      console.error('Failed to save to server:', error);
      alert('Saved to browser, but failed to connect to server for permanent storage.');
    }
    
    setIsEditing(false);
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
    return JSON.stringify(content, null, 2);
  };

  return (
    <ContentContext.Provider value={{ 
      isEditing, 
      setIsEditing, 
      content, 
      updateContent, 
      saveContent, 
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
