import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Editable, EditableImage } from '@/src/components/Editable';
import { inductees } from '../data/inductees';

export function Inductees() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sportQuery = searchParams.get('sport');
  const yearQuery = searchParams.get('year');
  const [selectedCategory, setSelectedCategory] = React.useState(sportQuery || 'All');
  
  const categories = ['All', 'Football', 'Basketball', 'Baseball', 'Soccer', 'Tennis', 'Golf', 'Coach', 'Team', 'Contributor'];
  
  React.useEffect(() => {
    if (sportQuery) {
      setSelectedCategory(sportQuery);
    } else {
      setSelectedCategory('All');
    }
  }, [sportQuery]);

  const filteredInductees = inductees.filter(inductee => {
    const matchesYear = yearQuery ? inductee.year.toString() === yearQuery : true;
    if (!matchesYear) return false;

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Coach') return inductee.isCoach;
    if (selectedCategory === 'Team') return inductee.isTeam;
    return inductee.sports.includes(selectedCategory);
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ sport: cat });
    }
  };

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <EditableImage
          id="inductees_hero_image"
          src="https://picsum.photos/seed/inductees/1920/1080"
          alt="Inductees Hero"
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-gradient-to-t from-surface to-transparent">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Archive</span>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter mb-4 text-white">
            <Editable id="inductees_hero_title">Hall of Fame Inductees</Editable>
          </h1>
          <Editable id="inductees_hero_subtitle" as="p" className="text-lg font-bold text-white/70 uppercase tracking-widest max-w-2xl">
            Browse the legends who have shaped our athletic history
          </Editable>
        </div>
      </div>

      <div className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-on-primary border-primary' 
                    : 'border-outline-variant hover:bg-primary/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredInductees.map((inductee) => (
            <Link key={inductee.id} to={`/inductees/${inductee.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-surface-container-highest">
                <EditableImage 
                  id={`inductee_list_img_${inductee.id}`}
                  src={inductee.image || `https://picsum.photos/seed/${inductee.id}/400/500`}
                  alt={inductee.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">
                <Editable id={`inductee_list_name_${inductee.id}`}>{inductee.name}</Editable>
              </h3>
              <p className="text-xs font-bold tracking-widest text-secondary uppercase">
                <Editable id={`inductee_list_meta_${inductee.id}`}>Induction Class of {inductee.year} • {inductee.sports.join(', ')}</Editable>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}
