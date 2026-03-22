export type SectionType = 'hero' | 'news' | 'inductees' | 'about' | 'nominate' | 'sponsors' | 'cta';

export interface ContentSection {
  id: string;
  type: SectionType;
  data: any;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  sections: ContentSection[];
}

export interface SiteContent {
  pages: PageContent[];
  settings: {
    siteName: string;
    logoUrl: string;
    primaryColor: string;
  };
}
