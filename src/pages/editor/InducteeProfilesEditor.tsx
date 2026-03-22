import * as React from 'react';
import { useContent } from '@/src/contexts/ContentContext';
import { Search, User, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { InducteeForm } from './InducteeForm';

export function InducteeProfilesEditor() {
  const { inductees, deleteInductee, saveInductees } = useContent();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filteredInductees = inductees.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.year.toString().includes(search)
  );

  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) {
      deleteInductee(id);
      await saveInductees();
    }
  };

  if (selectedId || isAdding) {
    const inductee = selectedId ? inductees.find(i => i.id === selectedId) : undefined;
    
    return (
      <InducteeForm 
        inductee={inductee} 
        onClose={() => {
          setSelectedId(null);
          setIsAdding(false);
        }} 
      />
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black font-headline tracking-tighter uppercase mb-2">Inductee Profiles</h1>
          <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Manage biography, awards, and gallery for all inductees</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
          <Plus size={18} />
          Add New Inductee
        </button>
      </header>

      <div className="bg-surface-container-high rounded-[2rem] border border-outline-variant shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-outline-variant bg-surface-container-highest flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/30" size={20} />
            <input
              type="text"
              placeholder="Search by name or year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-on-surface/5 border border-outline-variant rounded-2xl pl-16 pr-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-outline-variant/10 max-h-[600px] overflow-y-auto custom-scrollbar">
          {filteredInductees.map((inductee) => (
            <div
              key={inductee.id}
              onClick={() => setSelectedId(inductee.id)}
              className="w-full flex items-center justify-between p-8 hover:bg-on-surface/5 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 transition-all duration-300">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">{inductee.name}</h3>
                  <p className="text-[11px] font-bold text-on-surface/40 uppercase tracking-[0.15em] mt-1">
                    Class of {inductee.year} • {inductee.sports.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleDelete(e, inductee.id, inductee.name)}
                  className="p-3 rounded-xl text-on-surface/20 hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Inductee"
                >
                  <Trash2 size={18} />
                </button>
                <ChevronRight size={24} className="text-on-surface/20 group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          ))}
          {filteredInductees.length === 0 && (
            <div className="p-24 text-center text-on-surface/30">
              <User size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-xs font-black uppercase tracking-[0.2em]">No inductees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
