import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';
import { CounselorModal } from './components/CounselorModal';
import { 
  gsap, 
  ScrollTrigger, 
  EASINGS, 
  isReducedMotion, 
  initSmoothScroll, 
  scrollToTop, 
  refreshScrollTriggers 
} from './utils/motion';

// Pages
import { HomePage } from './pages/HomePage';
import { FindPartnerPage } from './pages/FindPartnerPage';
import { CreateProfilePage } from './pages/CreateProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { EventsPage } from './pages/EventsPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';

import { Profile, CommunityType } from './types';
import { PROFILES } from './data/faizNikahData';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParams, setNavParams] = useState<{
    community?: CommunityType;
    profileId?: string;
    blogId?: string;
    policyTab?: 'privacy' | 'terms' | 'refund';
  }>({});

  // Active selected profile for detail dossier modal
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Counselor modal state
  const [isCounselorOpen, setIsCounselorOpen] = useState(false);
  const [counselorProfileId, setCounselorProfileId] = useState<string | undefined>(undefined);

  // Shortlist state with localStorage
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('faiz_shortlist');
      return saved ? JSON.parse(saved) : ['FN-PUN-8402'];
    } catch {
      return ['FN-PUN-8402'];
    }
  });

  const handleToggleShortlist = (id: string) => {
    setShortlistedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('faiz_shortlist', JSON.stringify(next));
      } catch (e) {
        // ignore storage error
      }
      return next;
    });
  };

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    initSmoothScroll();
  }, []);

  const handleNavigate = (
    page: string, 
    params?: { community?: CommunityType; profileId?: string; blogId?: string; policyTab?: 'privacy' | 'terms' | 'refund' }
  ) => {
    setCurrentPage(page);
    if (params) {
      setNavParams(params);
      if (params.profileId) {
        const found = PROFILES.find((p) => p.id === params.profileId);
        if (found) setSelectedProfile(found);
      }
    } else {
      setNavParams({});
    }
    scrollToTop(true);
  };

  const handleOpenCounselor = (profileId?: string) => {
    setCounselorProfileId(profileId);
    setIsCounselorOpen(true);
  };

  // Subtle luxury page transition - pure opacity to avoid transform interference with ScrollTrigger
  const pageContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollToTop(true);
    if (!pageContainerRef.current) return;
    if (isReducedMotion()) return;

    gsap.fromTo(
      pageContainerRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.35, 
        ease: 'power2.out',
        onComplete: () => {
          refreshScrollTriggers();
        }
      }
    );
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fbed] text-[#191d14] font-sans antialiased selection:bg-[#526333]/20 selection:text-[#11150D]">
      {/* Top Editorial Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        shortlistCount={shortlistedIds.length}
        onOpenCounselor={() => handleOpenCounselor()}
      />

      {/* Main View Router with transition wrapper */}
      <main ref={pageContainerRef} className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate}
            onSelectProfile={(p) => setSelectedProfile(p)}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
            onOpenCounselor={handleOpenCounselor}
          />
        )}

        {currentPage === 'find-partner' && (
          <FindPartnerPage 
            initialCommunity={navParams.community || 'All'}
            onSelectProfile={(p) => setSelectedProfile(p)}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
            onOpenCounselor={handleOpenCounselor}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'create-profile' && (
          <CreateProfilePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'login' && (
          <LoginPage 
            onNavigate={handleNavigate} 
            onLoginSuccess={() => handleNavigate('find-partner')} 
          />
        )}

        {currentPage === 'success-stories' && (
          <SuccessStoriesPage 
            onNavigate={handleNavigate} 
            onOpenCounselor={() => handleOpenCounselor()} 
          />
        )}

        {currentPage === 'events' && (
          <EventsPage 
            onNavigate={handleNavigate} 
            onOpenCounselor={() => handleOpenCounselor()} 
          />
        )}

        {currentPage === 'blogs' && (
          <BlogPage 
            initialBlogId={navParams.blogId}
            onNavigate={handleNavigate}
            onOpenCounselor={() => handleOpenCounselor()}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate} 
            onOpenCounselor={() => handleOpenCounselor()} 
          />
        )}

        {(currentPage === 'team' || currentPage === 'team-members') && (
          <TeamPage 
            onNavigate={handleNavigate} 
            onOpenCounselor={handleOpenCounselor} 
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage 
            onNavigate={handleNavigate} 
            onOpenCounselor={() => handleOpenCounselor()} 
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={handleNavigate} 
            onOpenCounselor={() => handleOpenCounselor()} 
          />
        )}

        {currentPage === 'policy' && (
          <PolicyPage 
            initialTab={navParams.policyTab || 'privacy'}
            onNavigate={handleNavigate} 
          />
        )}
      </main>

      {/* Floating Counselor Contact Pill */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <a 
          href="https://wa.me/919503801999?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20inquire%20about%20FaizNikah%20matchmaking."
          target="_blank"
          rel="noreferrer"
          className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] px-4 py-2.5 rounded-full shadow-[0_8px_20px_rgba(11,73,64,0.35)] flex items-center gap-2 text-xs font-semibold border border-emerald-600 transition-all hover:scale-105 active:scale-95"
          title="Direct WhatsApp Consultation with Bureau Counselor"
        >
          <MessageSquare size={16} />
          <span className="hidden sm:inline">Counselor WhatsApp:</span>
          <span>+91 95038 01999</span>
        </a>
      </div>

      {/* Global Dossier Detail Modal */}
      <ProfileModal 
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        isShortlisted={selectedProfile ? shortlistedIds.includes(selectedProfile.id) : false}
        onToggleShortlist={handleToggleShortlist}
        onOpenCounselor={handleOpenCounselor}
      />

      {/* Global Counselor Inquiry Modal */}
      <CounselorModal 
        isOpen={isCounselorOpen}
        onClose={() => setIsCounselorOpen(false)}
        defaultProfileId={counselorProfileId}
      />

      {/* Editorial Forest Obsidian Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
