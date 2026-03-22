import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Image, Settings, Save, CloudUpload, ChevronRight, Home, Info, Trophy, Heart, ShieldCheck } from 'lucide-react';
import { useContent } from '@/src/contexts/ContentContext';

const navItems = [
  { label: 'Dashboard', path: '/editor', icon: LayoutDashboard },
  { label: 'Home Page', path: '/editor/home', icon: Home },
  { label: 'About Page', path: '/editor/about', icon: Info },
  { label: 'Inductees Page', path: '/editor/inductees', icon: Trophy },
  { label: 'Inductee Profiles', path: '/editor/profiles', icon: Users },
  { label: 'Sponsors', path: '/editor/sponsors', icon: Heart },
  { label: 'Privacy Policy', path: '/editor/privacy', icon: ShieldCheck },
];

export function EditorLayout() {
  const location = useLocation();
  const { saveContent, triggerBuild, downloadZip } = useContent();
  const [showDeployModal, setShowDeployModal] = React.useState(false);
  const [isBuilding, setIsBuilding] = React.useState(false);

  const handleBuild = async () => {
    setIsBuilding(true);
    await triggerBuild();
    setIsBuilding(false);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-outline-variant flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Settings className="text-on-primary" size={20} />
          </div>
          <span className="font-black uppercase tracking-tighter text-lg">Site Editor</span>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface/60 hover:bg-on-surface/5 hover:text-on-surface'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant space-y-2">
          <button
            onClick={saveContent}
            className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            <Save size={18} />
            Save to Source
          </button>
          <button
            onClick={() => setShowDeployModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-surface-container-highest text-on-surface py-3 rounded-xl font-bold hover:bg-on-surface/5 transition-all"
          >
            <CloudUpload size={18} />
            Export & Hosting
          </button>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-xl font-bold hover:bg-on-surface/5 transition-all"
          >
            View Live Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Deployment Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-surface-container-high w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant">
            <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface-container-highest">
              <div>
                <h2 className="text-2xl font-black font-headline tracking-tight uppercase">Hosting Export</h2>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Prepare your site for InMotion Hosting</p>
              </div>
              <button 
                onClick={() => setShowDeployModal(false)}
                className="p-2 hover:bg-on-surface/10 rounded-full transition-colors"
              >
                <ChevronRight size={24} className="rotate-90" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                <p className="text-sm text-on-surface/70 leading-relaxed mb-4">
                  Follow these steps to update your live site:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">1</div>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Ensure you have clicked "Save to Source" in the sidebar.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">2</div>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Generate a fresh production build below.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">3</div>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Download the ZIP and upload its contents to your host.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleBuild}
                  disabled={isBuilding}
                  className="flex items-center justify-center gap-3 bg-on-surface text-surface py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all shadow-lg disabled:opacity-50"
                >
                  {isBuilding ? 'Building...' : 'Generate Build'}
                </button>
                <button
                  onClick={downloadZip}
                  className="flex items-center justify-center gap-3 border-2 border-outline-variant text-on-surface py-4 rounded-xl font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all"
                >
                  Download ZIP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
