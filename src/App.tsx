/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { EditorToolbar } from './components/editor/EditorToolbar';
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ContentProvider>
        <div className="min-h-screen flex flex-col">
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
              {/* Fallback for other routes */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <EditorToolbar />
        </div>
      </ContentProvider>
    </Router>
  );
}
