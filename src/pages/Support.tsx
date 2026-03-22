import { Editable, EditableImage } from '@/src/components/Editable';
import { Heart, Shield, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Support() {
  const tiers = [
    {
      name: 'Yellowjacket Partner',
      price: '$50 - $249',
      icon: <Star className="h-8 w-8 text-primary" />,
      benefits: ['Name in induction program', 'Hall of Fame window decal']
    },
    {
      name: 'Bronze Sponsor',
      price: '$250 - $499',
      icon: <Award className="h-8 w-8 text-primary" />,
      benefits: ['All previous benefits', '2 tickets to the induction banquet']
    },
    {
      name: 'Silver Sponsor',
      price: '$500 - $999',
      icon: <Shield className="h-8 w-8 text-primary" />,
      benefits: ['All previous benefits', 'Reserved seating at banquet', 'Quarter-page program ad']
    },
    {
      name: 'Gold Sponsor',
      price: '$1,000+',
      icon: <Heart className="h-8 w-8 text-primary" />,
      benefits: ['All previous benefits', 'Full-page program ad', 'Recognition on digital gallery']
    }
  ];

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-on-surface overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <EditableImage 
            id="support_hero_bg"
            src="https://picsum.photos/seed/support/1920/1080"
            alt="Support Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Invest in Excellence</span>
          <h1 className="text-surface font-headline font-black text-5xl md:text-7xl tracking-tighter mb-8">Support the Hall</h1>
          <Editable id="support_hero_desc" as="p" className="text-surface-container-highest text-xl md:text-2xl leading-relaxed font-light">
            Your contributions ensure that the legends of Roanoke Rapids High School athletics are never forgotten. Help us preserve our history and inspire the next generation of Yellowjackets.
          </Editable>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black font-headline mb-4">Sponsorship Opportunities</h2>
            <p className="text-secondary max-w-2xl mx-auto">Choose a level of support that works for you. Every donation directly funds the preservation of archives and the annual induction ceremony.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier, idx) => (
              <div key={idx} className="bg-surface-container-low p-8 border border-outline-variant flex flex-col h-full hover:border-primary transition-colors">
                <div className="mb-6">{tier.icon}</div>
                <h3 className="text-xl font-black font-headline mb-2">{tier.name}</h3>
                <p className="text-2xl font-black text-primary mb-6">{tier.price}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="text-sm text-secondary flex items-start gap-2">
                      <span className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-on-surface text-surface py-3 font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
                  Donate Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy a Brick Section */}
      <section className="py-24 px-8 bg-surface border-t border-outline-variant">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Commemorative Walkway</span>
              <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-8 leading-tight">
                <Editable id="brick_title">Leave Your Legacy: Buy a Brick</Editable>
              </h2>
              <div className="space-y-6 mb-10">
                <Editable id="brick_desc" as="p" className="text-secondary text-lg leading-relaxed">
                  Be a permanent part of Roanoke Rapids High School history. Our commemorative brick walkway honors the athletes, coaches, and families who have shaped our athletic tradition.
                </Editable>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-surface-container-low border border-outline-variant">
                    <h4 className="text-lg font-black font-headline mb-2">4" x 8" Brick</h4>
                    <p className="text-2xl font-black text-primary mb-2">$100</p>
                    <p className="text-xs text-secondary uppercase font-bold tracking-widest">3 Lines of Text • 18 Characters per line</p>
                  </div>
                  <div className="p-6 bg-surface-container-low border border-outline-variant">
                    <h4 className="text-lg font-black font-headline mb-2">8" x 8" Brick</h4>
                    <p className="text-2xl font-black text-primary mb-2">$200</p>
                    <p className="text-xs text-secondary uppercase font-bold tracking-widest">6 Lines of Text • 18 Characters per line</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/brick-order"
                  className="bg-on-surface text-surface px-10 py-4 font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all text-center"
                >
                  Order Online
                </Link>
                <a 
                  href="https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/486098625_1073145228167837_5839508851868731633_n.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-outline-variant px-10 py-4 font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-all text-center"
                >
                  Download Form
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] bg-surface-container-highest shadow-2xl">
                <EditableImage 
                  id="brick_flyer_img"
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/486122430_1073145164834510_1727982092100028645_n.jpg"
                  alt="Buy a Brick Flyer"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-24 px-8 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black font-headline mb-12 text-center">Other Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Endowment Fund</h3>
              <p className="text-secondary leading-relaxed">Ensure long-term sustainability by contributing to our permanent endowment fund. These gifts provide lasting support for the Hall of Fame's mission.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Artifact Donation</h3>
              <p className="text-secondary leading-relaxed">Do you have historical RRHS athletic memorabilia? We are always looking to expand our collection of jerseys, photos, and equipment.</p>
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-surface border border-outline-variant text-center">
            <h3 className="text-xl font-black font-headline mb-4">Questions about giving?</h3>
            <p className="text-secondary mb-6">Contact our committee treasurer for more information on tax-deductible donations and corporate matching.</p>
            <a href="mailto:support@rrhs-hof.org" className="text-primary font-bold hover:underline">support@rrhs-hof.org</a>
          </div>
        </div>
      </section>
    </div>
  );
}
