import { ArrowRight, Facebook } from 'lucide-react';
import { Editable, EditableImage } from '@/src/components/Editable';

export function LatestNews() {
  const newsItems = [
    {
      id: 'news_1',
      title: '2025 Induction Banquet Tickets On Sale',
      date: 'MARCH 12, 2025',
      image: 'https://picsum.photos/seed/banquet/800/600',
      category: 'EVENT',
      description: 'The Roanoke Rapids High School Hall of Fame Committee is proud to announce the ticket launch for the upcoming banquet on May 15th.'
    },
    {
      id: 'news_2',
      title: 'Committee Updates: New Board Members Named',
      date: 'MARCH 08, 2025',
      image: 'https://picsum.photos/seed/meeting/400/400',
      category: 'UPDATE'
    },
    {
      id: 'news_3',
      title: 'Legacy Spotlight: Remembering the 1968 State Champs',
      date: 'FEBRUARY 24, 2025',
      image: 'https://picsum.photos/seed/athlete/400/400',
      category: 'LEGACY'
    }
  ];

  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Latest Updates</span>
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">Latest News</h2>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://www.facebook.com/profile.php?id=100046589299304" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
              Follow on Facebook
            </a>
            <a href="/news" className="text-primary font-bold flex items-center gap-2 hover:underline transition-all">
              View All News <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Featured News */}
          <div className="lg:col-span-7 group">
            <div className="relative aspect-video overflow-hidden mb-8">
              <EditableImage
                id="featured_news_img"
                src={newsItems[0].image}
                alt="Featured News"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-4 py-2 font-black text-sm">
                {newsItems[0].category}
              </div>
            </div>
            <h3 className="text-3xl font-bold font-headline mb-4 group-hover:text-primary transition-colors">
              <Editable id="featured_news_title">{newsItems[0].title}</Editable>
            </h3>
            <p className="text-secondary text-lg mb-6 leading-relaxed">
              <Editable id="featured_news_desc">{newsItems[0].description}</Editable>
            </p>
            <span className="text-sm font-black tracking-widest text-on-surface uppercase">
              <Editable id="featured_news_date">{newsItems[0].date}</Editable>
            </span>
          </div>

          {/* Sidebar News / Facebook Feed Simulation */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="bg-surface p-8 border border-outline-variant">
              <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Facebook className="h-4 w-4 text-[#1877F2]" />
                Latest from Facebook
              </h4>
              <iframe 
                src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100046589299304&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`} 
                width="100%" 
                height="500" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
