import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Inductees', href: '/inductees' },
    { name: 'Nominate', href: '/nominate' },
    { name: 'Banquets', href: '/banquets' },
    { name: 'Sponsors', href: '/sponsors' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://cmsv2-assets.apptegy.net/uploads/690/logo/504/rrhs.png" 
              alt="RRHS Yellowjacket Mascot" 
              className="h-12 w-12 object-contain group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">RRHS ATHLETIC</span>
              <span className="text-xs font-bold tracking-widest text-primary">HALL OF FAME</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-bold tracking-tight transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-on-surface"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/support" className="bg-on-surface text-surface px-6 py-2 font-bold text-sm hover:scale-95 transition-all">
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-bold hover:bg-surface-container-low",
                  isActive(link.href) ? "text-primary" : "text-on-surface"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/support" 
              onClick={() => setIsOpen(false)}
              className="w-full block text-center px-3 py-2 text-base font-bold bg-primary text-on-primary"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
