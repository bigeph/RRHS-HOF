import { History, Image, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Editable } from '@/src/components/Editable';

export function QuickLinks() {
  const links = [
    {
      id: 'ql_1',
      icon: <History className="h-12 w-12 text-primary group-hover:text-on-primary transition-colors" />,
      title: 'Nominate a Yellowjacket',
      desc: 'Submit a candidate for the Class of 2026. Honor those who made an impact.',
      href: '/nominate'
    },
    {
      id: 'ql_2',
      icon: <Image className="h-12 w-12 text-primary group-hover:text-on-primary transition-colors" />,
      title: 'View the Gallery',
      desc: 'A visual journey through championships, records, and unforgettable moments.',
      href: '/inductees'
    },
    {
      id: 'ql_3',
      icon: <Heart className="h-12 w-12 text-primary group-hover:text-on-primary transition-colors" />,
      title: 'Donate to the Foundation',
      desc: 'Support the preservation of our history and the annual induction banquet.',
      href: '/support'
    }
  ];

  return (
    <section className="bg-surface py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1">
        {links.map((link, idx) => (
          <Link
            key={link.id}
            to={link.href}
            className="group relative bg-surface-container-low p-12 transition-all duration-500 hover:bg-primary overflow-hidden"
          >
            <div className="relative z-10">
              <div className="mb-6 block transition-colors">
                {link.icon}
              </div>
              <h3 className="text-2xl font-black font-headline mb-4 group-hover:text-on-primary transition-colors">
                <Editable id={`ql_title_${idx}`}>{link.title}</Editable>
              </h3>
              <p className="text-secondary group-hover:text-on-primary/80 transition-colors">
                <Editable id={`ql_desc_${idx}`}>{link.desc}</Editable>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
