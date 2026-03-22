import * as React from 'react';
import { Inductee } from '@/src/data/inductees';
import { useContent } from '@/src/contexts/ContentContext';
import { X, Plus, Trash2, Save, ChevronLeft } from 'lucide-react';

interface InducteeFormProps {
  inductee?: Inductee;
  onClose: () => void;
}

export function InducteeForm({ inductee, onClose }: InducteeFormProps) {
  const { updateInductee, addInductee, saveInductees } = useContent();
  const [formData, setFormData] = React.useState<Inductee>(() => {
    if (inductee) return { ...inductee };
    return {
      id: `new-${Date.now()}`,
      name: '',
      year: new Date().getFullYear(),
      sports: [],
      bio: '',
      image: '',
      gallery: [],
      allConference: [],
      allState: [],
      allConferenceHonorableMention: [],
      allStateHonorableMention: []
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: keyof Inductee, index: number, value: string) => {
    setFormData(prev => {
      const arr = [...(prev[field] as string[])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addToArray = (field: keyof Inductee) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeFromArray = (field: keyof Inductee, index: number) => {
    setFormData(prev => {
      const arr = [...(prev[field] as string[])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inductee) {
      updateInductee(formData);
    } else {
      addInductee(formData);
    }
    await saveInductees();
    onClose();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft size={16} />
          Back to List
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Save size={16} />
          Save Inductee
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6 bg-surface-container-high p-8 rounded-3xl border border-outline-variant">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b border-outline-variant pb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-on-surface/5 border border-outline-variant rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-2">Induction Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-on-surface/5 border border-outline-variant rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-2">Profile Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-on-surface/5 border border-outline-variant rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-2">Biography</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={6}
                className="w-full bg-on-surface/5 border border-outline-variant rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sports & Awards */}
        <div className="space-y-6 bg-surface-container-high p-8 rounded-3xl border border-outline-variant">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b border-outline-variant pb-4">Sports & Awards</h2>
          
          <div className="space-y-6">
            {/* Sports */}
            <ArrayField
              label="Sports Played"
              items={formData.sports}
              onAdd={() => addToArray('sports')}
              onChange={(idx, val) => handleArrayChange('sports', idx, val)}
              onRemove={(idx) => removeFromArray('sports', idx)}
            />

            {/* All-Conference */}
            <ArrayField
              label="All-Conference Selections"
              items={formData.allConference}
              onAdd={() => addToArray('allConference')}
              onChange={(idx, val) => handleArrayChange('allConference', idx, val)}
              onRemove={(idx) => removeFromArray('allConference', idx)}
            />

            {/* All-State */}
            <ArrayField
              label="All-State Selections"
              items={formData.allState}
              onAdd={() => addToArray('allState')}
              onChange={(idx, val) => handleArrayChange('allState', idx, val)}
              onRemove={(idx) => removeFromArray('allState', idx)}
            />

            {/* All-Conference Honorable Mention */}
            <ArrayField
              label="All-Conference Honorable Mention"
              items={formData.allConferenceHonorableMention || []}
              onAdd={() => addToArray('allConferenceHonorableMention')}
              onChange={(idx, val) => handleArrayChange('allConferenceHonorableMention', idx, val)}
              onRemove={(idx) => removeFromArray('allConferenceHonorableMention', idx)}
            />

            {/* All-State Honorable Mention */}
            <ArrayField
              label="All-State Honorable Mention"
              items={formData.allStateHonorableMention || []}
              onAdd={() => addToArray('allStateHonorableMention')}
              onChange={(idx, val) => handleArrayChange('allStateHonorableMention', idx, val)}
              onRemove={(idx) => removeFromArray('allStateHonorableMention', idx)}
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="lg:col-span-2 space-y-6 bg-surface-container-high p-8 rounded-3xl border border-outline-variant">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b border-outline-variant pb-4">Photo Gallery</h2>
          <ArrayField
            label="Gallery Image URLs"
            items={formData.gallery}
            onAdd={() => addToArray('gallery')}
            onChange={(idx, val) => handleArrayChange('gallery', idx, val)}
            onRemove={(idx) => removeFromArray('gallery', idx)}
            placeholder="https://..."
          />
        </div>
      </form>
    </div>
  );
}

interface ArrayFieldProps {
  label: string;
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder?: string;
}

function ArrayField({ label, items, onAdd, onChange, onRemove, placeholder }: ArrayFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/40">{label}</label>
        <button
          type="button"
          onClick={onAdd}
          className="p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(idx, e.target.value)}
              placeholder={placeholder}
              className="flex-grow bg-on-surface/5 border border-outline-variant rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="p-2 rounded-xl hover:bg-error/10 text-error transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-[10px] font-bold text-on-surface/20 uppercase tracking-widest text-center py-2 border border-dashed border-outline-variant rounded-xl">
            None added
          </p>
        )}
      </div>
    </div>
  );
}
