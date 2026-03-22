import React from 'react';
import { Link } from 'react-router-dom';
import { Editable, EditableImage } from '@/src/components/Editable';
import { inductees } from '../../data/inductees';

export function InducteeGrid() {
  // Show a few featured legends
  const featuredIds = ['don-curtis', 'kareem-martin', 'brian-howard'];
  const featuredInductees = inductees.filter(i => featuredIds.includes(i.id));

  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Featured Legends</span>
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">Hall of Fame Inductees</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredInductees.map((inductee) => (
            <Link key={inductee.id} to={`/inductees/${inductee.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-surface-container-highest">
                <EditableImage
                  id={`inductee_img_${inductee.id}`}
                  src={inductee.image || `https://picsum.photos/seed/${inductee.id}/400/500`}
                  alt={inductee.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="text-2xl font-black font-headline mb-1 group-hover:text-primary transition-colors">
                <Editable id={`inductee_name_${inductee.id}`}>{inductee.name}</Editable>
              </h3>
              <div className="flex flex-col gap-1 text-xs font-bold tracking-widest text-secondary uppercase">
                <Editable id={`inductee_class_${inductee.id}`}>{`Induction Class of ${inductee.year}`}</Editable>
                {inductee.graduationYear && (
                  <Editable id={`inductee_grad_${inductee.id}`}>{`RRHS Class of ${inductee.graduationYear}`}</Editable>
                )}
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-outline-variant rounded-full"></span>
                  <Editable id={`inductee_sport_${inductee.id}`}>{inductee.sports.join(', ')}</Editable>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/inductees"
            className="inline-block bg-surface-container-highest text-on-surface px-8 py-4 font-bold hover:bg-primary hover:text-on-primary transition-all"
          >
            View All Inductees
          </Link>
        </div>
      </div>
    </section>
  );
}
