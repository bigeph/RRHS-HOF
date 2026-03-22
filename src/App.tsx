/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ContentProvider } from './contexts/ContentContext';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Inductees } from './pages/Inductees';
import { InducteeProfile } from './pages/InducteeProfile';
import { Nominate } from './pages/Nominate';
import { Banquets } from './pages/Banquets';
import { Sponsors } from './pages/Sponsors';
import { Support } from './pages/Support';
import { BrickOrder } from './pages/BrickOrder';
import { Privacy } from './pages/Privacy';

// Editor Pages
import { EditorLayout } from './pages/editor/EditorLayout';
import { EditorDashboard } from './pages/editor/EditorDashboard';
import { HomeEditor, AboutEditor, InducteesEditor, SponsorsEditor, PrivacyEditor } from './pages/editor/SectionEditors';
import { InducteeProfilesEditor } from './pages/editor/InducteeProfilesEditor';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ContentProvider>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Main Site Routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/inductees" element={<Inductees />} />
                    <Route path="/inductees/:id" element={<InducteeProfile />} />
                    <Route path="/nominate" element={<Nominate />} />
                    <Route path="/banquets" element={<Banquets />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/brick-order" element={<BrickOrder />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />

            {/* Editor Routes */}
            <Route path="/editor" element={<EditorLayout />}>
              <Route index element={<EditorDashboard />} />
              <Route path="home" element={<HomeEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="inductees" element={<InducteesEditor />} />
              <Route path="profiles" element={<InducteeProfilesEditor />} />
              <Route path="sponsors" element={<SponsorsEditor />} />
              <Route path="privacy" element={<PrivacyEditor />} />
            </Route>
          </Routes>
        </div>
      </ContentProvider>
    </Router>
  );
}
