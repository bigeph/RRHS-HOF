import * as React from 'react';
import { Editable } from '@/src/components/Editable';
import { Trophy, Users, UserPlus, Heart, ExternalLink } from 'lucide-react';

export function Nominate() {
  const nominationTypes = [
    {
      title: 'Athlete',
      icon: <Trophy className="text-primary" size={32} />,
      url: 'https://docs.google.com/a/rrgsd.org/forms/d/e/1FAIpQLSdH3DGqkBR4oM2eoNpOVxeLD8XhxAxBmjtClXiyMRF8y6c8CQ/viewform',
      description: 'Nominate a former RRHS athlete who demonstrated outstanding skill and sportsmanship.'
    },
    {
      title: 'Coach',
      icon: <UserPlus className="text-primary" size={32} />,
      url: 'https://docs.google.com/a/rrgsd.org/forms/d/e/1FAIpQLSf-f_2I2SgArS3cfO1bgqSKR81tuojM55X6x10-L3t8SHxzxg/viewform',
      description: 'Nominate a coach who made a significant impact on the RRHS athletic program.'
    },
    {
      title: 'Team',
      icon: <Users className="text-primary" size={32} />,
      url: 'https://docs.google.com/a/rrgsd.org/forms/d/e/1FAIpQLSdSjvVlJhpp_l5b70rErf8JJST0d8UlAIMN4641lhIC1amz5A/viewform',
      description: 'Nominate an entire RRHS team that achieved exceptional success during their season.'
    },
    {
      title: 'Contributor / Other',
      icon: <Heart className="text-primary" size={32} />,
      url: 'https://docs.google.com/a/rrgsd.org/forms/d/e/1FAIpQLSeGpbCLWwVdoWjoH376msmgQ9dMp1JVdIJM_JRvAx85sQJtbw/viewform',
      description: 'Nominate an individual who has provided extraordinary service or support to RRHS athletics.'
    }
  ];

  return (
    <div className="bg-surface py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Call for Nominations</span>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8">Nominate a Yellowjacket</h1>
          
          <Editable id="nominate_intro" as="p" className="text-xl md:text-2xl text-secondary leading-relaxed max-w-3xl">
            Help us honor the best of Roanoke Rapids High School athletics. Please select the appropriate category below to submit your nomination via our official forms.
          </Editable>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {nominationTypes.map((type) => (
            <a 
              key={type.title}
              href={type.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface-container-low p-8 border border-outline-variant hover:border-primary transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 flex justify-between items-start">
                  {type.icon}
                  <ExternalLink size={20} className="text-on-surface/30 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-black font-headline mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {type.title} Nomination
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">
                  {type.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                Open Form <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-outline-variant pt-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black font-headline mb-8 uppercase tracking-tight">Nomination Guidelines</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Athletes</h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Athletes must have graduated from Roanoke Rapids High School at least 10 years prior to their nomination.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Coaches</h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Coaches must have served at least 5 years in the RRHS athletic program and be retired from coaching at RRHS for at least 5 years.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Teams</h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Teams are eligible 10 years after their specific season of achievement.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Contributors</h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Individuals who have made significant, long-term contributions to the athletic program through service or support.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container p-8 border border-outline-variant h-fit">
            <h3 className="text-xl font-black font-headline mb-6 uppercase tracking-tight">Need Help?</h3>
            <p className="text-sm text-secondary leading-relaxed mb-8">
              If you have questions about the nomination process or need assistance with the forms, please contact the RRHS Athletic Department.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface/50">Email</span>
                <span className="text-sm font-bold">athletics@rrgsd.org</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface/50">Phone</span>
                <span className="text-sm font-bold">(252) 519-7100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
