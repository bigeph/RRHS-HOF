import * as React from 'react';

interface ContentContextType {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  content: Record<string, string>;
  updateContent: (id: string, value: string) => void;
  saveContent: () => void;
}

const ContentContext = React.createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState<Record<string, string>>({});

  // Load content from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('rrhs_hall_of_fame_content');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
  }, []);

  const updateContent = (id: string, value: string) => {
    setContent((prev) => ({ ...prev, [id]: value }));
  };

  const saveContent = () => {
    localStorage.setItem('rrhs_hall_of_fame_content', JSON.stringify(content));
    alert('Changes saved successfully to your browser storage.');
    setIsEditing(false);
  };

  return (
    <ContentContext.Provider value={{ isEditing, setIsEditing, content, updateContent, saveContent }}>
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
