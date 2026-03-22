import { Editable, EditableImage } from '@/src/components/Editable';

export function Banquets() {
  return (
    <div className="bg-surface py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Annual Celebration</span>
            <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tighter mb-8 leading-tight">
              <Editable id="banquet_title">2025 Induction Banquet</Editable>
            </h1>
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-surface-container-highest flex items-center justify-center font-black text-primary">DATE</div>
                <Editable id="banquet_date" className="text-xl font-bold">Saturday, May 15, 2025</Editable>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-surface-container-highest flex items-center justify-center font-black text-primary">TIME</div>
                <Editable id="banquet_time" className="text-xl font-bold">6:00 PM Reception | 7:00 PM Dinner</Editable>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-surface-container-highest flex items-center justify-center font-black text-primary">LOC</div>
                <Editable id="banquet_location" className="text-xl font-bold">RRHS Gymnasium & Auditorium</Editable>
              </div>
            </div>
            <button className="bg-on-surface text-surface px-12 py-5 font-bold text-lg hover:bg-primary hover:text-on-primary transition-all">
              Purchase Tickets
            </button>
          </div>
          <div className="aspect-video bg-surface-container-highest overflow-hidden">
            <EditableImage 
              id="banquet_hero_img"
              src="https://picsum.photos/seed/banquet_hero/1200/800"
              alt="Banquet Setting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 border border-outline-variant">
            <h3 className="text-xl font-black font-headline mb-4">Individual Tickets</h3>
            <p className="text-3xl font-black text-primary mb-4">$50</p>
            <p className="text-secondary text-sm leading-relaxed">Includes full dinner service and admission to the induction ceremony.</p>
          </div>
          <div className="p-8 border border-outline-variant bg-surface-container-low">
            <h3 className="text-xl font-black font-headline mb-4">Table Sponsorship</h3>
            <p className="text-3xl font-black text-primary mb-4">$500</p>
            <p className="text-secondary text-sm leading-relaxed">Reserved table for 8 guests with special recognition in the event program.</p>
          </div>
          <div className="p-8 border border-outline-variant">
            <h3 className="text-xl font-black font-headline mb-4">Program Ad</h3>
            <p className="text-3xl font-black text-primary mb-4">From $100</p>
            <p className="text-secondary text-sm leading-relaxed">Honor an inductee or promote your business in our commemorative program.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
