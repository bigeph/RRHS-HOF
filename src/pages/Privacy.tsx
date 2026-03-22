import React from 'react';
import { Editable } from '@/src/components/Editable';

export function Privacy() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <div className="py-24 px-8 bg-on-surface border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Legal Information</span>
          <h1 className="text-5xl font-black font-headline tracking-tighter mb-8 text-white">Privacy Policy</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Your privacy is important to us. This policy outlines how we handle and protect your information.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-24 px-8">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">1. Information Collection</h2>
            <Editable id="privacy_collection" as="p" className="text-secondary leading-relaxed mb-4">
              We collect information that you provide directly to us, such as when you submit a nomination form, order a commemorative brick, or contact us through our website. This may include your name, email address, phone number, and any other details relevant to your request.
            </Editable>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">2. Use of Information</h2>
            <Editable id="privacy_use" as="p" className="text-secondary leading-relaxed mb-4">
              The information we collect is used solely for the purpose of managing the Roanoke Rapids High School Athletic Hall of Fame. This includes processing nominations, fulfilling orders, and communicating with our supporters and the community. We do not sell or share your personal information with third parties for marketing purposes.
            </Editable>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">3. Data Security</h2>
            <Editable id="privacy_security" as="p" className="text-secondary leading-relaxed mb-4">
              We take reasonable measures to protect the information we collect from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </Editable>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">4. Cookies and Tracking</h2>
            <Editable id="privacy_cookies" as="p" className="text-secondary leading-relaxed mb-4">
              Our website may use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you interact with our site. You can choose to disable cookies through your browser settings, although this may affect some functionality.
            </Editable>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">5. Changes to This Policy</h2>
            <Editable id="privacy_changes" as="p" className="text-secondary leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
            </Editable>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">6. Contact Us</h2>
            <Editable id="privacy_contact" as="p" className="text-secondary leading-relaxed mb-4">
              If you have any questions or concerns about our Privacy Policy or data practices, please contact the Roanoke Rapids Athletic Hall of Fame Committee at our physical address or via the contact information provided in the footer of our website.
            </Editable>
          </section>

          <div className="pt-12 border-t border-outline-variant">
            <p className="text-xs font-bold text-secondary uppercase tracking-widest">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
