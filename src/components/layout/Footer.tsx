import { Share2, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://cmsv2-assets.apptegy.net/uploads/690/logo/504/rrhs.png" 
                alt="RRHS Yellowjacket Mascot" 
                className="h-10 w-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-black tracking-tighter">RRHS HALL OF FAME</span>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest leading-relaxed text-secondary mb-8">
              Preserving the rich history of Yellowjacket athletics for generations to come.
            </p>
            <div className="flex gap-4">
              <Share2 className="h-5 w-5 text-secondary cursor-pointer hover:text-primary transition-colors" />
              <Mail className="h-5 w-5 text-secondary cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/inductees" className="text-xs font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors underline-offset-4 underline">Inductees</Link></li>
              <li><Link to="/banquets" className="text-xs font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors underline-offset-4 underline">Banquet Info</Link></li>
              <li><Link to="/nominate" className="text-xs font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors underline-offset-4 underline">Nominate</Link></li>
              <li><Link to="/support" className="text-xs font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors underline-offset-4 underline">Support the Hall</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest text-secondary">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>800 Hamilton Street<br />Roanoke Rapids, NC 27870</span>
              </li>
              <li>Roanoke Rapids School District</li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors underline-offset-4 underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant py-8 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">
          © {new Date().getFullYear()} Roanoke Rapids Athletic Hall of Fame Committee
        </p>
      </div>
    </footer>
  );
}
