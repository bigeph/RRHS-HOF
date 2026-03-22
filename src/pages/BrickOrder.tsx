import React, { useState } from 'react';
import { ArrowLeft, Send, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BrickOrder() {
  const [brickSize, setBrickSize] = useState<'4x8' | '8x8'>('4x8');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    lines: Array(6).fill('').map(() => Array(18).fill(''))
  });

  const handleCharChange = (lineIdx: number, charIdx: number, value: string) => {
    const newLines = [...formData.lines];
    newLines[lineIdx][charIdx] = value.toUpperCase().slice(0, 1);
    setFormData({ ...formData, lines: newLines });
    
    // Auto-focus next input
    if (value && charIdx < 17) {
      const nextInput = document.getElementById(`char-${lineIdx}-${charIdx + 1}`);
      nextInput?.focus();
    }
  };

  const lineCount = brickSize === '4x8' ? 3 : 6;

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/support" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Support
        </Link>

        <div className="bg-surface-container-low border border-outline-variant p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black font-headline tracking-tighter mb-4">Brick Order Form</h1>
            <p className="text-secondary uppercase tracking-widest text-xs font-bold">Roanoke Rapids Athletic Hall of Fame Commemorative Walkway</p>
          </div>

          <form className="space-y-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-black font-headline border-b border-outline-variant pb-2 uppercase tracking-tight">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Full Name</label>
                  <input type="text" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Phone Number</label>
                  <input type="tel" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
                  <input type="email" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Mailing Address</label>
                  <input type="text" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                </div>
                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">City</label>
                    <input type="text" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">State</label>
                    <input type="text" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Zip</label>
                    <input type="text" className="w-full bg-surface border border-outline-variant p-3 focus:border-primary outline-none transition-colors" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Brick Selection */}
            <div className="space-y-6">
              <h2 className="text-xl font-black font-headline border-b border-outline-variant pb-2 uppercase tracking-tight">Select Brick Size</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setBrickSize('4x8')}
                  className={`p-6 border-2 text-left transition-all ${brickSize === '4x8' ? 'border-primary bg-surface-container-highest' : 'border-outline-variant hover:border-primary/50'}`}
                >
                  <h4 className="font-black text-lg mb-1">4" x 8" Brick</h4>
                  <p className="text-primary font-black text-xl mb-2">$100.00</p>
                  <p className="text-xs text-secondary uppercase font-bold tracking-widest">3 Lines of Text • 18 Characters per line</p>
                </button>
                <button
                  type="button"
                  onClick={() => setBrickSize('8x8')}
                  className={`p-6 border-2 text-left transition-all ${brickSize === '8x8' ? 'border-primary bg-surface-container-highest' : 'border-outline-variant hover:border-primary/50'}`}
                >
                  <h4 className="font-black text-lg mb-1">8" x 8" Brick</h4>
                  <p className="text-primary font-black text-xl mb-2">$200.00</p>
                  <p className="text-xs text-secondary uppercase font-bold tracking-widest">6 Lines of Text • 18 Characters per line</p>
                </button>
              </div>
            </div>

            {/* Engraving Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <h2 className="text-xl font-black font-headline uppercase tracking-tight">Engraving Information</h2>
                <div className="flex items-center gap-2 text-secondary">
                  <Info className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">One character per box</span>
                </div>
              </div>
              
              <div className="space-y-4 overflow-x-auto pb-4">
                {Array(lineCount).fill(0).map((_, lineIdx) => (
                  <div key={lineIdx} className="flex gap-1 min-w-max">
                    <span className="w-8 flex items-center justify-center text-[10px] font-black text-outline-variant">L{lineIdx + 1}</span>
                    {Array(18).fill(0).map((_, charIdx) => (
                      <input
                        key={charIdx}
                        id={`char-${lineIdx}-${charIdx}`}
                        type="text"
                        maxLength={1}
                        className="w-8 h-10 bg-surface border border-outline-variant text-center font-mono font-bold focus:border-primary focus:bg-surface-container-highest outline-none transition-all uppercase"
                        value={formData.lines[lineIdx][charIdx]}
                        onChange={(e) => handleCharChange(lineIdx, charIdx, e.target.value)}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-xs text-secondary italic">Spaces and punctuation count as characters. All text will be centered on the brick.</p>
            </div>

            {/* Submission */}
            <div className="pt-8 border-t border-outline-variant">
              <div className="bg-surface-container-highest p-6 mb-8 border-l-4 border-primary">
                <p className="text-sm font-bold leading-relaxed">
                  By submitting this form, you will be directed to our secure payment portal to complete your donation. Your brick will not be ordered until payment is received.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-on-surface text-surface py-5 font-black uppercase tracking-[0.2em] text-lg hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-3"
              >
                Proceed to Payment <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
