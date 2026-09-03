import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Heart, 
  FileText, 
  Sparkles,
  Building,
  Users,
  BookOpen,
  Calendar,
  Lock,
  UserCheck,
  Award,
  ArrowRight,
  Clock
} from 'lucide-react';
import { CommunityType } from '../types';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface NavbarProps {
  currentPage: string;
  onNavigate: (
    page: string, 
    params?: { 
      community?: CommunityType; 
      profileId?: string; 
      blogId?: string; 
      policyTab?: 'privacy' | 'terms' | 'refund';
    }
  ) => void;
  shortlistCount: number;
  onOpenCounselor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  shortlistCount,
  onOpenCounselor 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'partner' | 'foundation' | 'resources' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  // Scroll elevation detector
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header entrance sequence on first load
  useEffect(() => {
    if (isReducedMotion() || !headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nav-brand-group',
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.7, ease: EASINGS.editorial, delay: 0.1 }
      );
      gsap.fromTo(
        '.desktop-nav-link',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: EASINGS.smooth, delay: 0.25 }
      );
      gsap.fromTo(
        '.nav-cta-group',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.55, ease: EASINGS.editorial, delay: 0.35 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // GSAP-choreographed mobile menu reveal
  useEffect(() => {
    if (!mobileMenuOpen || !mobileDrawerRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mobileDrawerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: EASINGS.editorial }
      );
      gsap.fromTo(
        '.mobile-stagger-item',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.03, ease: EASINGS.smooth, delay: 0.05 }
      );
    }, mobileDrawerRef);

    return () => ctx.revert();
  }, [mobileMenuOpen]);

  // Close mobile menu when page changes
  const handleNav = (
    page: string, 
    params?: { 
      community?: CommunityType; 
      profileId?: string; 
      blogId?: string; 
      policyTab?: 'privacy' | 'terms' | 'refund';
    }
  ) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(page, params);
  };

  const handleMouseEnter = (menu: 'partner' | 'foundation' | 'resources') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility & Trust Bar */}
      <div className={`w-full bg-[#11150D] text-[#C8C5B4] px-4 md:px-8 border-b border-[#B3A16A]/20 text-[11px] sm:text-xs transition-all duration-300 ${
        isScrolled ? 'py-1.5 opacity-95' : 'py-2'
      }`}>
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          
          {/* Trust Accreditation */}
          <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 text-[#B3A16A] font-semibold tracking-wide uppercase text-[10px]">
              <ShieldCheck size={13} className="text-[#B3A16A]" />
              Registered Trust
            </span>
            <span className="hidden sm:inline text-[#C8C5B4]/40">•</span>
            <span className="text-[#C8C5B4]/90 font-light">
              Haji Mehmed Isaac Farash Foundation, Pune — Established 2012
            </span>
            <span className="hidden lg:inline text-[#C8C5B4]/40">•</span>
            <span className="hidden lg:inline text-[#C8C5B4]/70">
              5,600+ Blessed Nikahs
            </span>
          </div>

          {/* Quick Contact & Consultation Triggers */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#C8C5B4]/80 text-[11px] sm:text-xs">
            <a 
              href="tel:9503801999" 
              className="hover:text-[#F7F4EA] transition-colors flex items-center gap-1.5 font-medium"
              title="Official Matrimonial Helpline"
            >
              <Phone size={12} className="text-[#B3A16A]" />
              <span className="font-mono text-xs">+91 9503801999</span>
            </a>

            <span className="text-[#C8C5B4]/30">|</span>

            <a 
              href="https://wa.me/919503801999" 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-semibold text-[11px]"
              title="Chat with Senior Counselor on WhatsApp"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Bureau</span>
            </a>

            {onOpenCounselor && (
              <>
                <span className="hidden sm:inline text-[#C8C5B4]/30">|</span>
                <button
                  onClick={onOpenCounselor}
                  className="hidden sm:inline-flex items-center gap-1 text-[#B3A16A] hover:text-[#F7F4EA] transition-colors font-medium text-[11px]"
                >
                  <Clock size={12} />
                  <span>Book Consultation</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`bg-[#F7F4EA]/98 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-[#C8C5B4]/80 shadow-[0_8px_28px_-6px_rgba(17,21,13,0.12)]' 
          : 'border-[#C8C5B4]/50 shadow-[0_4px_24px_-6px_rgba(17,21,13,0.06)]'
      }`}>
        <div className={`max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          
          {/* Brand Wordmark & Emblem */}
          <div 
            onClick={() => handleNav('home')} 
            className="nav-brand-group flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNav('home')}
            aria-label="FaizNikah Home"
          >
            <div className="w-11 h-11 border border-[#0B4940]/25 rounded-lg overflow-hidden flex items-center justify-center bg-[#F7F4EA] group-hover:border-[#0B4940] transition-all shadow-sm p-0.5">
              <img 
                src="/logo.png" 
                alt="FaizNikah Emblem" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-serif text-2xl md:text-[25px] tracking-tight text-[#0B4940] leading-none font-semibold">
                FaizNikah
              </div>
              <span className="text-[9.5px] tracking-widest uppercase font-semibold text-[#526333]/90 block mt-1">
                Sacred Matrimonial Sanctuary
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-medium text-[#404946]">
            
            {/* 1. Find Partner Dropdown */}
            <div 
              className="desktop-nav-link relative"
              onMouseEnter={() => handleMouseEnter('partner')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => handleNav('find-partner')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors relative group ${
                  currentPage === 'find-partner' 
                    ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                    : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
                }`}
                aria-expanded={activeDropdown === 'partner'}
              >
                <span>Find Partner</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'partner' ? 'rotate-180 text-[#0B4940]' : 'text-[#526333]'}`} />
                {currentPage === 'find-partner' && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0B4940] rounded-full"></span>
                )}
              </button>

              {activeDropdown === 'partner' && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-[#F7F4EA] border border-[#C8C5B4]/70 rounded-lg p-2.5 shadow-[0_16px_36px_-8px_rgba(17,21,13,0.14)] space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#526333]">
                      Browse Matrimonial Dossiers
                    </div>
                    <button 
                      onClick={() => handleNav('find-partner', { community: 'All' })}
                      className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users size={16} className="text-[#0B4940] group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-sm font-medium text-[#11150D]">All Verified Dossiers</div>
                          <div className="text-[11px] text-[#404946]/80">Across Maharashtra &amp; Pan-India</div>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-semibold text-[#526333] bg-[#E8E4D6] px-2 py-0.5 rounded">2,000+</span>
                    </button>
                    <button 
                      onClick={() => handleNav('find-partner', { community: 'Sunni' })}
                      className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <UserCheck size={16} className="text-[#0B4940] group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-sm font-medium text-[#11150D]">Sunni Muslim Dossiers</div>
                          <div className="text-[11px] text-[#404946]/80">Hanafi, Shafi &amp; Sunni traditions</div>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-semibold text-[#526333] bg-[#E8E4D6] px-2 py-0.5 rounded">1,400+</span>
                    </button>
                    <button 
                      onClick={() => handleNav('find-partner', { community: 'Shia' })}
                      className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={16} className="text-[#0B4940] group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-sm font-medium text-[#11150D]">Shia Muslim Dossiers</div>
                          <div className="text-[11px] text-[#404946]/80">Ithna Ashari &amp; verified families</div>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-semibold text-[#526333] bg-[#E8E4D6] px-2 py-0.5 rounded">Verified</span>
                    </button>
                    <button 
                      onClick={() => handleNav('find-partner', { community: 'Bohra' })}
                      className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Lock size={16} className="text-[#0B4940] group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-sm font-medium text-[#11150D]">Dawoodi Bohra Dossiers</div>
                          <div className="text-[11px] text-[#404946]/80">Confidential family profiles</div>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-semibold text-[#526333] bg-[#E8E4D6] px-2 py-0.5 rounded">Confidential</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Success Stories */}
            <button 
              onClick={() => handleNav('success-stories')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'success-stories' 
                  ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                  : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
              }`}
            >
              Success Stories
            </button>

            {/* Team Link matching faiznikah.com */}
            <button 
              onClick={() => handleNav('team')}
              className={`px-3 py-2 rounded-md transition-colors ${
                ['team', 'team-members'].includes(currentPage)
                  ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                  : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
              }`}
            >
              Team
            </button>

            {/* 3. The Foundation Dropdown (Institutional Pillars) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('foundation')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => handleNav('about')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                  ['about', 'team', 'contact', 'policy'].includes(currentPage)
                    ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                    : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
                }`}
                aria-expanded={activeDropdown === 'foundation'}
              >
                <span>The Foundation</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'foundation' ? 'rotate-180 text-[#0B4940]' : 'text-[#526333]'}`} />
              </button>

              {activeDropdown === 'foundation' && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-[#F7F4EA] border border-[#C8C5B4]/70 rounded-lg p-2.5 shadow-[0_16px_36px_-8px_rgba(17,21,13,0.14)] space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#526333]">
                      Trust Governance &amp; Counselors
                    </div>
                    <button 
                      onClick={() => handleNav('about')}
                      className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <Building size={16} className="text-[#0B4940] mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#11150D]">About the Foundation</div>
                        <div className="text-[11px] text-[#404946]/80">13+ years of philanthropic service, library &amp; school</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('team')}
                      className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <Users size={16} className="text-[#0B4940] mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#11150D]">Meet Our Team (36 Counselors)</div>
                        <div className="text-[11px] text-[#404946]/80">Haji Intekhab, Parveen Farash &amp; 15 regional bureaus</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('contact')}
                      className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <Building size={16} className="text-[#0B4940] mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#11150D]">Regional Bureaus</div>
                        <div className="text-[11px] text-[#404946]/80">Pune HQ, Aurangabad, Sangamner, Solapur</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('policy')}
                      className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <ShieldCheck size={16} className="text-[#0B4940] mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#11150D]">Trust Policies &amp; Charter</div>
                        <div className="text-[11px] text-[#404946]/80">Modesty safeguards, Wali consent &amp; zero dowry</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Guidance & Events Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => handleNav('blogs')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                  ['blogs', 'events'].includes(currentPage)
                    ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                    : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
                }`}
                aria-expanded={activeDropdown === 'resources'}
              >
                <span>Guidance &amp; Events</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-[#0B4940]' : 'text-[#526333]'}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-[#F7F4EA] border border-[#C8C5B4]/70 rounded-lg p-2.5 shadow-[0_16px_36px_-8px_rgba(17,21,13,0.14)] space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#526333]">
                      Community Knowledge
                    </div>
                    <button 
                      onClick={() => handleNav('blogs')}
                      className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <BookOpen size={16} className="text-[#0B4940] mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#11150D]">Islamic Guidance &amp; Articles</div>
                        <div className="text-[11px] text-[#404946]/80">Sunnah simplicity, Mahr ethics &amp; marital rights</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('events')}
                      className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#E8E4D6]/70 transition-colors group"
                    >
                      <Calendar size={16} className="text-[#0B4940] mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#11150D]">Events &amp; Sammelans</div>
                        <div className="text-[11px] text-[#404946]/80">In-person verified family gatherings &amp; Jalsas</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Membership Plan */}
            <button 
              onClick={() => handleNav('pricing')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'pricing' 
                  ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                  : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
              }`}
            >
              Membership
            </button>

            {/* 6. Regional Bureaus (Contact) */}
            <button 
              onClick={() => handleNav('contact')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'contact' 
                  ? 'text-[#0B4940] font-semibold bg-[#E8E4D6]/70' 
                  : 'hover:text-[#0B4940] hover:bg-[#E8E4D6]/40'
              }`}
            >
              Bureaus
            </button>
          </nav>

          {/* Right Action Suite */}
          <div className="nav-cta-group flex items-center gap-2 sm:gap-3">
            {/* Shortlisted Dossiers Button */}
            <button 
              onClick={() => handleNav('find-partner', { community: 'All' })}
              title="Saved Shortlisted Dossiers"
              className="relative p-2 text-[#404946] hover:text-[#0B4940] hover:bg-[#E8E4D6]/60 rounded-md transition-colors active:scale-95"
              aria-label={`Saved Shortlisted Dossiers (${shortlistCount})`}
            >
              <Heart size={19} className={shortlistCount > 0 ? "fill-rose-700 text-rose-700" : "text-[#404946]"} />
              {shortlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#0B4940] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {shortlistCount}
                </span>
              )}
            </button>

            {/* Member Sign In */}
            <button 
              onClick={() => handleNav('login')}
              className="text-xs md:text-sm font-semibold text-[#404946] hover:text-[#0B4940] hover:bg-[#E8E4D6]/50 px-3 py-2 rounded-md transition-colors hidden sm:inline-block active:scale-95"
            >
              Sign In
            </button>

            {/* Primary Action Button */}
            <button 
              onClick={() => handleNav('create-profile')}
              className="bg-[#0B4940] text-[#F7F4EA] text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-2.5 rounded-md border border-[#0B4940] hover:bg-[#14584C] hover:border-[#14584C] transition-all shadow-[0_2px_8px_rgba(11,73,64,0.18)] flex items-center gap-1.5 active:scale-[0.98] group"
            >
              <FileText size={15} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
              <span className="hidden md:inline">Register Matrimonial Biodata</span>
              <span className="md:hidden">Register</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#191d14] hover:bg-[#E8E4D6]/70 rounded-md transition-colors"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div 
            ref={mobileDrawerRef} 
            className="lg:hidden bg-[#F7F4EA] border-b border-[#C8C5B4] px-5 py-6 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-5 text-sm font-medium text-[#191d14]">
              
              {/* Community Grid */}
              <div className="mobile-stagger-item pb-3 border-b border-[#C8C5B4]/50">
                <span className="text-[11px] uppercase tracking-wider text-[#526333] font-bold block mb-2.5">
                  Browse by Faith Tradition
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleNav('find-partner', { community: 'All' })}
                    className="p-2.5 text-left bg-[#E8E4D6]/60 rounded-md text-xs font-semibold text-[#11150D] hover:bg-[#E8E4D6] transition-colors"
                  >
                    All Dossiers (2,000+)
                  </button>
                  <button 
                    onClick={() => handleNav('find-partner', { community: 'Sunni' })}
                    className="p-2.5 text-left bg-[#E8E4D6]/60 rounded-md text-xs font-semibold text-[#11150D] hover:bg-[#E8E4D6] transition-colors"
                  >
                    Sunni Muslim (1,400+)
                  </button>
                  <button 
                    onClick={() => handleNav('find-partner', { community: 'Shia' })}
                    className="p-2.5 text-left bg-[#E8E4D6]/60 rounded-md text-xs font-semibold text-[#11150D] hover:bg-[#E8E4D6] transition-colors"
                  >
                    Shia Muslim
                  </button>
                  <button 
                    onClick={() => handleNav('find-partner', { community: 'Bohra' })}
                    className="p-2.5 text-left bg-[#E8E4D6]/60 rounded-md text-xs font-semibold text-[#11150D] hover:bg-[#E8E4D6] transition-colors"
                  >
                    Dawoodi Bohra
                  </button>
                </div>
              </div>

              {/* Main Directory Links */}
              <div className="mobile-stagger-item space-y-1 pb-3 border-b border-[#C8C5B4]/50">
                <span className="text-[11px] uppercase tracking-wider text-[#526333] font-bold block mb-1.5">
                  Navigation
                </span>
                <button 
                  onClick={() => handleNav('find-partner')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D] flex items-center justify-between"
                >
                  <span>Search Matrimonial Dossiers</span>
                  <ArrowRight size={14} className="text-[#526333]" />
                </button>
                <button 
                  onClick={() => handleNav('success-stories')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D] flex items-center justify-between"
                >
                  <span>Success Stories (5,600+ Nikahs)</span>
                  <ArrowRight size={14} className="text-[#526333]" />
                </button>
                <button 
                  onClick={() => handleNav('team')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D] flex items-center justify-between"
                >
                  <span>Meet Our Team (36 Members)</span>
                  <ArrowRight size={14} className="text-[#526333]" />
                </button>
                <button 
                  onClick={() => handleNav('pricing')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D] flex items-center justify-between"
                >
                  <span>Membership &amp; Subsidy (₹1,999)</span>
                  <ArrowRight size={14} className="text-[#526333]" />
                </button>
              </div>

              {/* Foundation & Guidance */}
              <div className="space-y-1 pb-3 border-b border-[#C8C5B4]/50">
                <span className="text-[11px] uppercase tracking-wider text-[#526333] font-bold block mb-1.5">
                  The Foundation &amp; Guidance
                </span>
                <button 
                  onClick={() => handleNav('about')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D]"
                >
                  About Haji Mehmed Isaac Farash Foundation
                </button>
                <button 
                  onClick={() => handleNav('team')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D]"
                >
                  Counselor Council (Farash Family)
                </button>
                <button 
                  onClick={() => handleNav('blogs')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D]"
                >
                  Islamic Guidance &amp; Articles
                </button>
                <button 
                  onClick={() => handleNav('events')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D]"
                >
                  Foundation Events &amp; Jalsas
                </button>
                <button 
                  onClick={() => handleNav('contact')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D]"
                >
                  Regional Bureaus (Pune, Aurangabad, Sangamner, Solapur)
                </button>
                <button 
                  onClick={() => handleNav('policy')}
                  className="w-full text-left py-2 px-2 hover:bg-[#E8E4D6]/60 rounded text-sm text-[#11150D]"
                >
                  Privacy &amp; Data Modesty Policies
                </button>
              </div>

              {/* Login & Helpline */}
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleNav('login')}
                    className="flex-1 bg-[#E8E4D6] hover:bg-[#dcd7c5] text-[#11150D] text-xs font-semibold py-2.5 rounded text-center transition-colors"
                  >
                    Candidate / Guardian Login
                  </button>
                  <button 
                    onClick={() => handleNav('create-profile')}
                    className="flex-1 bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] text-xs font-semibold py-2.5 rounded text-center transition-colors"
                  >
                    Register Biodata
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-[#404946]">
                  <a 
                    href="tel:9503801999" 
                    className="flex items-center gap-1.5 text-[#0B4940] font-semibold"
                  >
                    <Phone size={13} />
                    <span>Call: +91 9503801999</span>
                  </a>
                  <a 
                    href="https://wa.me/919503801999" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-emerald-700 font-semibold"
                  >
                    <MessageSquare size={13} />
                    <span>WhatsApp Bureau</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};
