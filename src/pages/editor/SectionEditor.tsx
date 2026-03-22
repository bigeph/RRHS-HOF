import * as React from 'react';
import { useContent } from '@/src/contexts/ContentContext';
import { Save, Image as ImageIcon, Type, Trash2, Plus, Edit2, Lock, Unlock } from 'lucide-react';

interface SectionEditorProps {
  title: string;
  description: string;
  fields: {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'gallery';
    placeholder?: string;
  }[];
}

export function SectionEditor({ title, description, fields }: SectionEditorProps) {
  const { content, updateContent, saveContent } = useContent();
  const [unlockedFields, setUnlockedFields] = React.useState<Set<string>>(new Set());

  const toggleLock = (id: string) => {
    setUnlockedFields((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-6xl font-black font-headline tracking-tighter uppercase mb-2">{title}</h1>
        <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">{description}</p>
      </header>

      <div className="bg-surface-container-high rounded-2xl border border-outline-variant shadow-xl overflow-hidden">
        <div className="p-8 border-b border-outline-variant bg-surface-container-highest flex justify-between items-center">
          <h2 className="text-2xl font-black font-headline tracking-tight uppercase">Content Fields</h2>
          <button
            onClick={saveContent}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
          >
            <Save size={18} />
            Save Draft
          </button>
        </div>
        
        <div className="p-8 space-y-8">
          {fields.map((field) => {
            const value = content[field.id] || '';
            const isLocked = value !== '' && !unlockedFields.has(field.id);
            
            return (
              <div key={field.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={field.id} className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    {field.type === 'image' || field.type === 'gallery' ? <ImageIcon size={14} /> : <Type size={14} />}
                    {field.label}
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-on-surface/30 uppercase tracking-widest">{field.id}</span>
                    {value !== '' && (
                      <button 
                        onClick={() => toggleLock(field.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                          isLocked 
                            ? 'bg-on-surface/10 text-on-surface/60 hover:bg-primary/20 hover:text-primary' 
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        }`}
                      >
                        {isLocked ? <Lock size={10} /> : <Unlock size={10} />}
                        {isLocked ? 'Unlock to Edit' : 'Lock Field'}
                      </button>
                    )}
                  </div>
                </div>

                {isLocked ? (
                  <div className="w-full bg-on-surface/5 border border-outline-variant rounded-xl p-6 flex items-center justify-between group cursor-pointer hover:bg-on-surface/10 transition-all" onClick={() => toggleLock(field.id)}>
                    <div className="flex-grow overflow-hidden">
                      {field.type === 'image' ? (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-outline-variant flex-shrink-0">
                            <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="text-sm font-medium text-on-surface/40 truncate">{value}</span>
                        </div>
                      ) : field.type === 'gallery' ? (
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-4">
                            {(() => {
                              try {
                                const imgs = JSON.parse(value);
                                return imgs.slice(0, 3).map((img: string, i: number) => (
                                  <div key={i} className="w-10 h-10 rounded-lg border-2 border-surface-container-high overflow-hidden">
                                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  </div>
                                ));
                              } catch (e) { return null; }
                            })()}
                          </div>
                          <span className="text-xs font-bold text-on-surface/40 uppercase tracking-widest ml-4">
                            {(() => {
                              try {
                                const imgs = JSON.parse(value);
                                return `${imgs.length} Images in Gallery`;
                              } catch (e) { return 'Gallery Data'; }
                            })()}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-on-surface/40 line-clamp-2 italic">
                          "{value}"
                        </p>
                      )}
                    </div>
                    <Lock size={16} className="text-on-surface/20 group-hover:text-primary transition-colors ml-4" />
                  </div>
                ) : (
                  <>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        value={value}
                        onChange={(e) => updateContent(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={6}
                        className="w-full bg-on-surface/5 border border-outline-variant rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                      />
                    ) : field.type === 'image' ? (
                      <div className="flex gap-4 items-start">
                        <div className="flex-grow">
                          <input
                            id={field.id}
                            type="text"
                            value={value}
                            onChange={(e) => updateContent(field.id, e.target.value)}
                            placeholder={field.placeholder || 'Enter image URL...'}
                            className="w-full bg-on-surface/5 border border-outline-variant rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          />
                        </div>
                        {value && (
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-outline-variant bg-surface-container-highest flex-shrink-0">
                            <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>
                    ) : field.type === 'gallery' ? (
                      <GalleryEditor id={field.id} />
                    ) : (
                      <input
                        id={field.id}
                        type="text"
                        value={value}
                        onChange={(e) => updateContent(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-on-surface/5 border border-outline-variant rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GalleryEditor({ id }: { id: string }) {
  const { content, updateContent } = useContent();
  const imagesJson = content[id];
  const images: string[] = React.useMemo(() => {
    if (imagesJson) {
      try {
        return JSON.parse(imagesJson);
      } catch (e) {
        console.error('Failed to parse gallery images', e);
      }
    }
    return [];
  }, [imagesJson]);

  const handleAdd = () => {
    const url = window.prompt('Enter new image URL:');
    if (url) {
      updateContent(id, JSON.stringify([...images, url]));
    }
  };

  const handleRemove = (index: number) => {
    if (window.confirm('Remove this image?')) {
      const newImages = images.filter((_, i) => i !== index);
      updateContent(id, JSON.stringify(newImages));
    }
  };

  const handleEdit = (index: number) => {
    const url = window.prompt('Edit image URL:', images[index]);
    if (url && url !== images[index]) {
      const newImages = [...images];
      newImages[index] = url;
      updateContent(id, JSON.stringify(newImages));
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container-highest">
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => handleEdit(idx)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleRemove(idx)} className="p-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleAdd}
          className="aspect-square rounded-xl border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center text-on-surface/30 hover:text-primary gap-2"
        >
          <Plus size={24} />
          <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
        </button>
      </div>
    </div>
  );
}
