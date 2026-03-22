import * as React from 'react';
import { useContent } from '@/src/contexts/ContentContext';
import { LayoutDashboard, Save, CloudUpload, Edit3, Trash2, Plus } from 'lucide-react';

export function EditorDashboard() {
  const { content, triggerBuild, downloadZip } = useContent();
  const changedCount = Object.keys(content).length;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-6xl font-black font-headline tracking-tighter uppercase mb-2">Editor Dashboard</h1>
        <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Welcome to the Roanoke Rapids Hall of Fame Editor</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant shadow-xl">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
            <Edit3 size={24} />
          </div>
          <h3 className="text-4xl font-black font-headline mb-2">{changedCount}</h3>
          <p className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Modified Sections</p>
        </div>

        <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant shadow-xl">
          <div className="w-12 h-12 bg-green-600/10 text-green-600 rounded-xl flex items-center justify-center mb-6">
            <Save size={24} />
          </div>
          <h3 className="text-4xl font-black font-headline mb-2">Draft</h3>
          <p className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Current Status</p>
        </div>

        <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant shadow-xl">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
            <CloudUpload size={24} />
          </div>
          <h3 className="text-4xl font-black font-headline mb-2">Ready</h3>
          <p className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Deployment Status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-high rounded-2xl border border-outline-variant shadow-xl overflow-hidden">
          <div className="p-8 border-b border-outline-variant bg-surface-container-highest">
            <h2 className="text-2xl font-black font-headline tracking-tight uppercase">Recent Changes</h2>
          </div>
          <div className="p-8">
            {changedCount > 0 ? (
              <div className="space-y-4">
                {Object.entries(content).slice(0, 5).map(([id, value]) => (
                  <div key={id} className="flex items-center justify-between p-4 bg-on-surface/5 rounded-xl border border-outline-variant/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{id}</span>
                      <span className="text-sm font-medium text-on-surface/80 truncate max-w-md">{value}</span>
                    </div>
                  </div>
                ))}
                {changedCount > 5 && (
                  <p className="text-center text-xs font-bold text-on-surface/30 uppercase tracking-widest pt-4">
                    + {changedCount - 5} more changes
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-on-surface/30">
                <p className="text-xs font-bold uppercase tracking-widest">No changes recorded yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface-container-high rounded-2xl border border-outline-variant shadow-xl overflow-hidden">
          <div className="p-8 border-b border-outline-variant bg-surface-container-highest">
            <h2 className="text-2xl font-black font-headline tracking-tight uppercase">Deployment & Export</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary">Step 1: Save to Source</h3>
              <p className="text-sm text-on-surface/60 leading-relaxed">
                Clicking "Save Draft" in the sidebar updates the permanent <code>content.json</code> file in the project source code.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary">Step 2: Generate Build</h3>
              <p className="text-sm text-on-surface/60 leading-relaxed">
                Trigger a production build to bake your changes into the static files. This may take up to 60 seconds.
              </p>
              <button 
                onClick={() => triggerBuild()}
                className="w-full bg-on-surface text-surface py-4 font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-3"
              >
                <CloudUpload size={20} />
                Generate Production Build
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary">Step 3: Download for Hosting</h3>
              <p className="text-sm text-on-surface/60 leading-relaxed">
                Download a ZIP file containing the <code>dist</code> folder. Upload the contents of this ZIP to your Inmotion Hosting account.
              </p>
              <button 
                onClick={() => downloadZip()}
                className="w-full border-2 border-outline-variant text-on-surface py-4 font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all flex items-center justify-center gap-3"
              >
                <Save size={20} />
                Download Hosting ZIP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
