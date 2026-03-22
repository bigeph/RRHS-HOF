import { Link, useLocation } from 'react-router-dom';
import { Editable } from '@/src/components/Editable';
import { useContent } from '@/src/contexts/ContentContext';

export function Sponsors() {
  const { isEditing, content, updateContent } = useContent();
  const location = useLocation();

  const sponsors = [
    { id: 'sp_1', name: 'G.W. HUX & CO.', defaultUrl: '#' },
    { id: 'sp_2', name: "STEVE'S TIRE & AUTO", defaultUrl: '#' },
    { id: 'sp_3', name: 'RRSD DISTRICT', defaultUrl: '#' },
    { id: 'sp_4', name: 'THE DAILY HERALD', defaultUrl: '#' },
    { id: 'sp_5', name: 'JACKET PRIDE', defaultUrl: '#' }
  ];

  const handleLinkEdit = (id: string, currentUrl: string) => {
    if (!isEditing) return;
    const newUrl = window.prompt('Enter sponsor website URL:', currentUrl);
    if (newUrl !== null && newUrl !== currentUrl) {
      updateContent(`${id}_url`, newUrl);
    }
  };

  const handleButtonClick = () => {
    if (location.pathname === '/sponsors') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-black tracking-[0.4em] uppercase text-white mb-12">Our Generous Sponsors</h2>
        <div className="flex flex-wrap justify-center items-center gap-16">
          {sponsors.map((sponsor, idx) => {
            const urlId = `${sponsor.id}_url`;
            const url = content[urlId] || sponsor.defaultUrl;

            return (
              <div key={sponsor.id} className="relative group">
                <a
                  href={isEditing ? undefined : url}
                  onClick={(e) => {
                    if (isEditing) {
                      e.preventDefault();
                      handleLinkEdit(sponsor.id, url);
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl font-black uppercase tracking-tight text-primary hover:text-white transition-all cursor-pointer block"
                >
                  <Editable id={`sponsor_name_${idx}`}>{sponsor.name}</Editable>
                </a>
                {isEditing && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to edit URL
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-20">
          <Link 
            to="/sponsors"
            onClick={handleButtonClick}
            className="inline-block bg-primary text-on-primary px-10 py-4 text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
    </section>
  );
}
