import * as React from 'react';
import { SectionEditor } from './SectionEditor';

export function HomeEditor() {
  return (
    <SectionEditor
      title="Home Page Editor"
      description="Manage hero text, call to action, and featured sections"
      fields={[
        { id: 'hero_bg', label: 'Hero Background Image URL', type: 'image' },
        { id: 'hero_tagline', label: 'Hero Tagline', type: 'text', placeholder: 'Honor, Tradition, Excellence' },
        { id: 'hero_title_prefix', label: 'Hero Title Prefix', type: 'text', placeholder: 'Class of ' },
        { id: 'hero_title_year', label: 'Hero Title Year', type: 'text', placeholder: '2025' },
        { id: 'hero_description', label: 'Hero Description', type: 'textarea' },
        { id: 'featured_heading', label: 'Featured Heading', type: 'text', placeholder: 'Hall of Fame Inductees' },
      ]}
    />
  );
}

export function AboutEditor() {
  return (
    <SectionEditor
      title="About Page Editor"
      description="Manage the history and mission of the Hall of Fame"
      fields={[
        { id: 'about_hero_title', label: 'Hero Title', type: 'text', placeholder: 'Preserving the Legacy of Yellowjacket Athletics' },
        { id: 'about_hero_intro', label: 'Hero Intro Text', type: 'textarea' },
        { id: 'about_mission_title', label: 'Mission Title', type: 'text', placeholder: 'Our Mission' },
        { id: 'about_mission_text', label: 'Mission Content', type: 'textarea' },
        { id: 'about_mission_img', label: 'Mission Image URL', type: 'image' },
        { id: 'about_celebration_text', label: 'Celebration Content', type: 'textarea' },
        { id: 'about_celebration_img', label: 'Celebration Image URL', type: 'image' },
      ]}
    />
  );
}

export function InducteesEditor() {
  return (
    <SectionEditor
      title="Inductees Editor"
      description="Manage the inductee gallery and profile sections"
      fields={[
        { id: 'inductees_hero_title', label: 'Hero Title', type: 'text', placeholder: 'The Hall of Fame' },
        { id: 'inductees_hero_subtitle', label: 'Hero Subtitle', type: 'text', placeholder: 'Browse the legends who have shaped our athletic history' },
        { id: 'inductees_hero_image', label: 'Hero Image URL', type: 'image' },
      ]}
    />
  );
}

export function SponsorsEditor() {
  return (
    <SectionEditor
      title="Sponsors Editor"
      description="Manage the sponsors and support sections"
      fields={[
        { id: 'sponsors_hero_title', label: 'Hero Title', type: 'text', placeholder: 'Support the Legacy' },
        { id: 'sponsors_intro', label: 'Sponsors Intro Text', type: 'textarea' },
        { id: 'sponsors_hero_image', label: 'Hero Image URL', type: 'image' },
      ]}
    />
  );
}

export function PrivacyEditor() {
  return (
    <SectionEditor
      title="Privacy Policy Editor"
      description="Manage the legal and privacy information"
      fields={[
        { id: 'privacy_title', label: 'Page Title', type: 'text', placeholder: 'Privacy Policy' },
        { id: 'privacy_last_updated', label: 'Last Updated Date', type: 'text', placeholder: 'March 22, 2026' },
        { id: 'privacy_content', label: 'Policy Content', type: 'textarea' },
      ]}
    />
  );
}
