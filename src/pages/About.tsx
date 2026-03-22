import * as React from 'react';
import { Editable, EditableImage } from '@/src/components/Editable';
import { ImageSlider } from '../components/ImageSlider';
import { Trophy, Users, UserPlus, Heart, Shield, Award, UsersRound } from 'lucide-react';

export function About() {
  const committeeMembers = [
    { name: 'Chairman', role: 'Alumni Member' },
    { name: 'Vice Chairman', role: 'Alumni Member' },
    { name: 'Treasurer', role: 'Alumni Member' },
    { name: 'Secretary', role: 'Alumni Member' },
    { name: 'Committee Member', role: 'Alumni Member' },
    { name: 'Committee Member', role: 'Alumni Member' },
    { name: 'Committee Member', role: 'Alumni Member' },
    { name: 'Media Representative', role: 'Community Context' },
    { name: 'Athletic Director', role: 'Advisory Member / Record Keeper' }
  ];

  const galleryImages = [
    'https://picsum.photos/seed/rrhs1/1200/800',
    'https://picsum.photos/seed/rrhs2/1200/800',
    'https://picsum.photos/seed/rrhs3/1200/800',
    'https://picsum.photos/seed/rrhs4/1200/800',
    'https://picsum.photos/seed/rrhs5/1200/800'
  ];

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <div className="relative py-32 px-8 border-b border-outline-variant overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.venom.net/hof/rrhofframed.jpg" 
            alt="RRHS Hall of Fame" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-on-surface/85 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">About the RRHS Athletic Hall of Fame</span>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 text-white">
            <Editable id="about_hero_title">Preserving the Legacy of Yellowjacket Athletics</Editable>
          </h1>
          <Editable id="about_hero_intro" as="p" className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl">
            Since 2010, the Roanoke Rapids High School Athletic Hall of Fame has stood as a testament to the dedication, talent, and community spirit that defines our athletic programs.
          </Editable>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-24 space-y-32">
        {/* Our Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black font-headline uppercase tracking-tight flex items-center gap-3">
              <Shield className="text-primary" size={28} />
              Our Mission
            </h2>
            <Editable id="about_mission_text" as="p" className="text-lg text-secondary leading-relaxed">
              The purpose of the Roanoke Rapids High School Athletic Hall of Fame is to recognize, honor, and provide an enduring memorial for the individuals and teams whose outstanding contributions have enriched our athletic program and brought honor to our school. By celebrating these historic achievements, we aim to provide inspiring models for future generations of Yellowjackets to emulate both on and off the field.
            </Editable>
          </div>
          <div className="aspect-square overflow-hidden bg-surface-container-highest border border-outline-variant">
            <EditableImage 
              id="about_mission_img" 
              src="https://picsum.photos/seed/mission/1000/1000" 
              alt="RRHS Athletics Mission"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </section>

        {/* A Standard of Excellence */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black font-headline uppercase tracking-tight mb-6">A Standard of Excellence</h2>
            <p className="text-secondary leading-relaxed">
              Induction into the Hall of Fame is the highest athletic honor awarded by Roanoke Rapids High School. We recognize greatness across four distinct categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Athletes', icon: <Award />, desc: 'Graduates who demonstrated exceptional ability in a varsity sport sanctioned by the NCHSAA (eligible 5 years after graduation).' },
              { title: 'Coaches', icon: <UserPlus />, desc: 'Varsity Head Coaches who dedicated a minimum of three years to leading and developing RRHS student-athletes (eligible 3 years after their last coaching assignment).' },
              { title: 'Teams', icon: <Users />, desc: 'Historic RRHS rosters that exhibited exemplary qualities and reached the highest levels of achievement (eligible 5 years after their qualifying season).' },
              { title: 'Contributors', icon: <Heart />, desc: 'Individuals who, while not athletes or coaches, have made significant, lasting contributions to the RRHS Athletic Program.' }
            ].map((cat) => (
              <div key={cat.title} className="bg-surface-container-low p-8 border border-outline-variant flex flex-col gap-4">
                <div className="text-primary">{cat.icon}</div>
                <h3 className="text-xl font-black font-headline uppercase tracking-tight">{cat.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-highest p-8 border border-outline-variant text-center max-w-4xl mx-auto mt-12">
            <p className="text-sm font-bold text-on-surface/70 italic leading-relaxed">
              To preserve the integrity of the Hall of Fame, all inductees must exhibit strong moral character, serve as role models for current and future generations, and remain a source of pride for the Roanoke Rapids community. Each year, a maximum of ten exceptional candidates are selected for this prestigious honor.
            </p>
          </div>
        </section>

        {/* Celebrating Our Inductees */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 aspect-video overflow-hidden bg-surface-container-highest border border-outline-variant">
            <EditableImage 
              id="about_celebration_img" 
              src="https://picsum.photos/seed/celebration/1200/800" 
              alt="Induction Celebration"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-3xl font-black font-headline uppercase tracking-tight flex items-center gap-3">
              <Trophy className="text-primary" size={28} />
              Celebrating Our Inductees
            </h2>
            <Editable id="about_celebration_text" as="p" className="text-lg text-secondary leading-relaxed">
              Earning a place in the Hall of Fame is a community celebration. Each year’s class is formally honored at our annual Induction Banquet, recognized publicly at a regular-season Yellowjackets football game, and immortalized on a permanent display plaque located on the Roanoke Rapids High School campus.
            </Editable>
          </div>
        </section>

        {/* The Selection Committee */}
        <section className="space-y-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black font-headline uppercase tracking-tight flex items-center gap-3 mb-8">
              <UsersRound className="text-primary" size={28} />
              The Selection Committee
            </h2>
            <div className="space-y-6 text-secondary leading-relaxed">
              <p>
                The Hall of Fame is governed by a dedicated nine-member selection committee entrusted with reviewing nominations and preserving the history of RRHS athletics.
              </p>
              <p>
                The committee is composed of:
              </p>
              <ul className="space-y-4 list-none">
                <li className="flex gap-4 border-l-2 border-primary/30 pl-4">
                  <span className="font-bold text-on-surface">Seven Alumni Members:</span>
                  <span>Appointed initially by the RRGSD Superintendent for four-year terms, with subsequent appointments made by committee consensus.</span>
                </li>
                <li className="flex gap-4 border-l-2 border-primary/30 pl-4">
                  <span className="font-bold text-on-surface">One Media Representative:</span>
                  <span>Appointed by the committee to provide historical and community context.</span>
                </li>
                <li className="flex gap-4 border-l-2 border-primary/30 pl-4">
                  <span className="font-bold text-on-surface">The RRHS Athletic Director:</span>
                  <span>Serving as an essential, non-voting advisory member and official record keeper.</span>
                </li>
              </ul>
              <p className="pt-4 italic text-sm">
                Guided by a Chairman, Vice Chairman, Treasurer, and Secretary, the committee meets annually beginning in June to carefully review all community nominations and vote on the incoming class.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low border border-outline-variant">
            <div className="p-8 border-b border-outline-variant">
              <h3 className="text-xl font-black font-headline uppercase tracking-tight">Current Selection Committee</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {committeeMembers.map((member, idx) => (
                <div key={idx} className="p-8 border-r border-b border-outline-variant last:border-r-0 group hover:bg-primary/5 transition-colors">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{member.role}</div>
                  <div className="text-lg font-black font-headline uppercase tracking-tight group-hover:text-primary transition-colors">
                    <Editable id={`committee_member_${idx}`}>{member.name}</Editable>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface/50 mb-8 text-center">Committee Archive & Gallery</h3>
            <ImageSlider images={galleryImages} />
          </div>
        </section>
      </div>
    </div>
  );
}
