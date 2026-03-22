import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { inductees } from '../data/inductees';
import { ArrowLeft, Trophy, Calendar, Award, Star } from 'lucide-react';
import { Editable, EditableImage } from '@/src/components/Editable';
import { EditableImageSlider } from '../components/EditableImageSlider';
import { useContent } from '@/src/contexts/ContentContext';

export function InducteeProfile() {
  const { id } = useParams<{ id: string }>();
  const { inductees } = useContent();
  const inductee = inductees.find(i => i.id === id);

  if (!inductee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Inductee Not Found</h1>
          <Link to="/inductees" className="text-primary font-bold hover:underline">Return to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={inductee.image || `https://picsum.photos/seed/${inductee.id}/1920/1080`}
          alt={inductee.name}
          className="w-full h-full object-cover grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-surface to-transparent">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/inductees" className="inline-flex items-center gap-2 text-on-surface/70 hover:text-primary transition-colors mb-8 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Gallery</span>
            </Link>
            <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter mb-4">
              {inductee.name}
            </h1>
            {inductee.graduationYear && (
              <p className="text-2xl font-bold text-secondary mb-6">
                RRHS Class of {inductee.graduationYear}
              </p>
            )}
            <div className="flex flex-wrap gap-6 text-on-surface/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest">Induction Class of {inductee.year}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {inductee.sports.map(sport => (
                  <Link 
                    key={sport} 
                    to={`/inductees?sport=${sport}`}
                    className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    <Trophy size={16} className="text-primary group-hover:text-on-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest">{sport}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        {inductee.gallery && inductee.gallery.length > 0 && (
          <div className="mb-24">
            <EditableImageSlider 
              id={`inductee_gallery_${inductee.id}`} 
              defaultImages={inductee.gallery} 
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black font-headline mb-8 border-b border-outline-variant pb-4 flex items-center gap-3">
              <Award size={24} className="text-primary" />
              Legacy & Biography
            </h2>
            <div className="prose prose-invert max-w-none text-on-surface/70 leading-relaxed whitespace-pre-wrap">
              {inductee.bio || `A legendary figure in the history of Roanoke Rapids High School athletics, ${inductee.name} was inducted into the Hall of Fame in ${inductee.year} for their outstanding contributions to ${inductee.sports.join(' and ')}. Their dedication, skill, and sportsmanship continue to inspire generations of Yellowjackets.`}
            </div>
          </div>
          
          <div className="space-y-12">
            {inductee.allConference && inductee.allConference.length > 0 && (
              <div className="bg-surface-container p-8 border border-outline-variant">
                <h3 className="text-xl font-black font-headline mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Star size={20} className="text-primary" />
                  All-Conference
                </h3>
                <ul className="space-y-4">
                  {inductee.allConference.map((item, idx) => (
                    <li key={idx} className="text-sm font-bold border-l-2 border-primary/30 pl-4 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {inductee.allConferenceHonorableMention && inductee.allConferenceHonorableMention.length > 0 && (
              <div className="bg-surface-container p-8 border border-outline-variant">
                <h3 className="text-xl font-black font-headline mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Star size={20} className="text-primary/50" />
                  All-Conference Honorable Mention
                </h3>
                <ul className="space-y-4">
                  {inductee.allConferenceHonorableMention.map((item, idx) => (
                    <li key={idx} className="text-sm font-bold border-l-2 border-primary/10 pl-4 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {inductee.allState && inductee.allState.length > 0 && (
              <div className="bg-surface-container p-8 border border-outline-variant">
                <h3 className="text-xl font-black font-headline mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Trophy size={20} className="text-secondary" />
                  All-State & Honors
                </h3>
                <ul className="space-y-4">
                  {inductee.allState.map((item, idx) => (
                    <li key={idx} className="text-sm font-bold border-l-2 border-secondary/30 pl-4 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {inductee.allStateHonorableMention && inductee.allStateHonorableMention.length > 0 && (
              <div className="bg-surface-container p-8 border border-outline-variant">
                <h3 className="text-xl font-black font-headline mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Trophy size={20} className="text-secondary/50" />
                  All-State Honorable Mention
                </h3>
                <ul className="space-y-4">
                  {inductee.allStateHonorableMention.map((item, idx) => (
                    <li key={idx} className="text-sm font-bold border-l-2 border-secondary/10 pl-4 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-surface-container p-8 border border-outline-variant">
              <h3 className="text-xl font-black font-headline mb-6 uppercase tracking-tight">Induction Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-xs font-bold uppercase text-on-surface/50">Induction Year</span>
                  <span className="text-sm font-bold">{inductee.year}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-xs font-bold uppercase text-on-surface/50">Categories</span>
                  <span className="text-sm font-bold">{inductee.sports.join(', ') || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-xs font-bold uppercase text-on-surface/50">Type</span>
                  <span className="text-sm font-bold">{inductee.isTeam ? 'Team' : (inductee.isCoach ? 'Coach' : 'Individual Athlete')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
