import { Edit3, Save, Eye, X } from 'lucide-react';
import { useContent } from '@/src/contexts/ContentContext';

export function EditorToolbar() {
  const { isEditing, setIsEditing, saveContent } = useContent();

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {isEditing ? (
        <>
          <button
            onClick={saveContent}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-green-700 transition-all font-bold"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-red-700 transition-all font-bold"
          >
            <X className="h-5 w-5" />
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full shadow-2xl hover:brightness-110 transition-all font-bold"
        >
          <Edit3 className="h-5 w-5" />
          Edit Page
        </button>
      )}
    </div>
  );
}
