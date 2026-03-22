import * as React from 'react';
import { inductees } from '@/src/data/inductees';
import { SectionEditor } from './SectionEditor';
import { Search, User, ChevronRight } from 'lucide-react';

export function InducteeProfilesEditor() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');

  const filteredInductees = inductees.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.year.toString().includes(search)
  );

  if (selectedId) {
    const inductee = inductees.find(i => i.id === selectedId);
    if (!inductee) return null;

    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedId(null)}
          className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronRight size={14} className="rotate-180" />
          Back to List
        </button>
        
        <SectionEditor
          title={`Edit: ${inductee.name}`}
          description={`Manage biography, gallery, and details for ${inductee.name}`}
          fields={[
            { id: `inductee_name_${inductee.id}`, label: 'Name', type: 'text' },
            { id: `inductee_bio_${inductee.id}`, label: 'Biography', type: 'textarea' },
            { id: `inductee_hero_${inductee.id}`, label: 'Profile Image URL', type: 'image' },
            { id: `inductee_gallery_${inductee.id}`, label: 'Gallery Images', type: 'gallery' },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-6xl font-black font-headline tracking-tighter uppercase mb-2">Inductee Profiles</h1>
        <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Select an inductee to edit their profile details</p>
      </header>

      <div className="bg-surface-container-high rounded-2xl border border-outline-variant shadow-xl overflow-hidden">
        <div className="p-8 border-b border-outline-variant bg-surface-container-highest flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <input
              type="text"
              placeholder="Search by name or year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-on-surface/5 border border-outline-variant rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-outline-variant/10 max-h-[600px] overflow-y-auto">
          {filteredInductees.map((inductee) => (
            <button
              key={inductee.id}
              onClick={() => setSelectedId(inductee.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-on-surface/5 transition-colors text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight">{inductee.name}</h3>
                  <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mt-1">
                    Class of {inductee.year} • {inductee.sports.join(', ')}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-on-surface/20 group-hover:text-primary transition-colors" />
            </button>
          ))}
          {filteredInductees.length === 0 && (
            <div className="p-12 text-center text-on-surface/30">
              <p className="text-xs font-bold uppercase tracking-widest">No inductees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
