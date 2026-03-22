import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Editable, EditableImage } from '@/src/components/Editable';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-on-surface">
      <div className="absolute inset-0 z-0">
        <EditableImage
          id="hero_bg"
          src="https://www.rrhsalum.org/images/rrhischool-old.jpg"
          alt="Roanoke Rapids High School Building"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-24">
        <div className="max-w-3xl">
          <Editable id="hero_tagline" className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
            Honor, Tradition, Excellence
          </Editable>
          
          <h1 className="text-surface font-headline font-black text-6xl md:text-8xl leading-tight mb-8 tracking-tighter">
            <Editable id="hero_title_prefix" as="span">Class of </Editable>
            <Editable id="hero_title_year" as="span" className="text-primary">2025</Editable>
          </h1>
          
          <Editable id="hero_description" as="p" className="text-surface-container-highest text-xl md:text-2xl mb-12 leading-relaxed font-light max-w-2xl">
            Celebrating the legends who defined Yellowjacket athletics. Join us as we welcome the newest icons to the Roanoke Rapids Hall of Fame.
          </Editable>
          
          <div className="flex flex-wrap gap-6">
            <Link 
              to="/inductees?year=2025"
              className="bg-primary text-on-primary px-10 py-5 font-bold text-lg hover:brightness-110 transition-all flex items-center gap-3"
            >
              Meet the Inductees
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/banquets"
              className="border-2 border-surface/30 text-surface px-10 py-5 font-bold text-lg hover:bg-surface hover:text-on-surface transition-all"
            >
              2025 Banquet Info
            </Link>
          </div>
        </div>
      </div>

      {/* Asymmetric Floating Element */}
      <div className="absolute right-0 bottom-8 hidden lg:block z-20">
        <div className="bg-primary/90 backdrop-blur-md p-12 w-[400px]">
          <h3 className="text-on-primary font-headline font-black text-3xl mb-4">Legacy in Motion</h3>
          <p className="text-on-primary/80 mb-6">Explore over 100 years of athletic history in our interactive digital gallery.</p>
          <Link to="/inductees" className="inline-flex items-center gap-2 font-bold border-b-2 border-on-primary pb-1 hover:brightness-110 transition-all">
            Open Gallery <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
