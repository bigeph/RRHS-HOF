import { Sponsors as SponsorsSection } from '@/src/components/sections/Sponsors';
import { Editable } from '@/src/components/Editable';

export function Sponsors() {
  return (
    <div className="bg-surface">
      <div className="py-24 px-8 bg-on-surface border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Community Partners</span>
          <h1 className="text-5xl font-black font-headline tracking-tighter mb-8 text-white">Support the Legacy</h1>
          <Editable id="sponsors_intro" as="p" className="text-xl text-white/70 leading-relaxed">
            Our Hall of Fame is made possible through the generous support of local businesses and individuals who believe in preserving the athletic heritage of Roanoke Rapids High School.
          </Editable>
        </div>
      </div>
      
      <div className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black font-headline mb-12 text-center">Sponsorship Levels</h2>
          <div className="space-y-6">
            {[
              { level: 'Platinum Jacket', price: '$2,500+', desc: 'Primary recognition on all event materials, full-page program ad, and two reserved tables.' },
              { level: 'Gold Jacket', price: '$1,000+', desc: 'Recognition on website and event signage, half-page program ad, and one reserved table.' },
              { level: 'Silver Jacket', price: '$500+', desc: 'Recognition in event program and four complimentary banquet tickets.' },
              { level: 'Bronze Jacket', price: '$250+', desc: 'Recognition in event program and two complimentary banquet tickets.' }
            ].map((tier, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-surface border border-outline-variant gap-6">
                <div>
                  <h3 className="text-xl font-black font-headline mb-1">{tier.level}</h3>
                  <p className="text-secondary text-sm max-w-md">{tier.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">{tier.price}</p>
                  <button className="mt-4 text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-all">
                    Select Level
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <SponsorsSection />
    </div>
  );
}
