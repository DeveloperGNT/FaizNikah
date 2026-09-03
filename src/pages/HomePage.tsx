import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Heart,
  CheckCircle,
  Eye,
  BookOpen,
  Building,
  Phone,
  Lock,
  Search,
  Filter,
  Users,
  Compass,
  Handshake,
  MapPin,
  Calendar,
  Check
} from 'lucide-react';
import {
  FOUNDATION_STATS,
  PROFILES,
  OFFICES,
  BLOG_ARTICLES,
  SUCCESS_STORIES,
  TEAM_MEMBERS
} from '../data/faizNikahData';
import { Profile, CommunityType } from '../types';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion, isMobileScreen } from '../utils/motion';

interface HomePageProps {
  onNavigate: (page: string, params?: { community?: CommunityType; profileId?: string; blogId?: string }) => void;
  onSelectProfile: (profile: Profile) => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
  onOpenCounselor: (profileId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProfile,
  shortlistedIds,
  onToggleShortlist,
  onOpenCounselor,
}) => {
  // Live interactive filters for the curated preview section
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [waliOnly, setWaliOnly] = useState<boolean>(true);
  const [dowryOnly, setDowryOnly] = useState<boolean>(true);

  // Filter 4 preview profiles
  const previewProfiles = PROFILES.filter((p) => {
    if (selectedCommunity !== 'All' && p.community !== selectedCommunity) return false;
    if (selectedDistrict !== 'All' && !p.district.includes(selectedDistrict)) return false;
    if (waliOnly && !p.verified) return false;
    if (dowryOnly && !p.zeroDowryPledge) return false;
    return true;
  }).slice(0, 4);

  // Premium Agency-Grade GSAP Choreographed Motion Engine
  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    const isMobile = isMobileScreen();

    // 1. HERO SIGNATURE CINEMATIC ENTRANCE TIMELINE
    const heroTl = gsap.timeline({
      defaults: { ease: EASINGS.editorial }
    });

    heroTl
      .fromTo(
        '.hero-eyebrow',
        { autoAlpha: 0, y: isMobile ? 12 : 18 },
        { autoAlpha: 1, y: 0, duration: 0.65 }
      )
      .fromTo(
        '.hero-headline',
        { autoAlpha: 0, y: isMobile ? 20 : 32 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: EASINGS.cinematic },
        '-=0.45'
      )
      .fromTo(
        '.hero-paragraph',
        { autoAlpha: 0, y: isMobile ? 14 : 20 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        '-=0.55'
      )
      .fromTo(
        '.hero-cta-btn',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.hero-trust-item',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55, ease: EASINGS.smooth },
        '-=0.35'
      )
      .fromTo(
        '.hero-arch-frame',
        { autoAlpha: 0, clipPath: 'inset(10% 0% 0% 0%)' },
        { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: EASINGS.editorial },
        '-=0.9'
      )
      .fromTo(
        '.hero-arch-img',
        { scale: 1.08 },
        { scale: 1, duration: 1.25, ease: EASINGS.cinematic },
        '-=1.0'
      )
      .fromTo(
        '.hero-floating-card',
        { autoAlpha: 0, y: 20, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: EASINGS.editorial },
        '-=0.5'
      );

    // Hero Floating Card Count-Up (5,600+)
    const heroCountObj = { val: 0 };
    gsap.to(heroCountObj, {
      val: 5600,
      duration: 1.6,
      ease: 'power2.out',
      delay: 0.35,
      onUpdate: () => {
        const el = document.getElementById('hero-count-val');
        if (el) el.textContent = `${Math.round(heroCountObj.val).toLocaleString()}+`;
      }
    });

    // Subtle Parallax on Hero Image (Desktop only)
    if (!isMobile) {
      gsap.to('.hero-arch-img', {
        y: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-arch-frame',
          start: 'top 70%',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // 2. FOUNDATION STATS SECTION & COUNT-UPS
    gsap.fromTo(
      '.stat-item',
      { autoAlpha: 0, y: isMobile ? 16 : 26 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#foundation-stats-section',
          start: 'top 86%',
          once: true
        }
      }
    );

    const statsTargets = [
      { id: 'stat-val-0', num: 5600, suffix: '+' },
      { id: 'stat-val-1', num: 5000, suffix: '+' },
      { id: 'stat-val-2', num: 15, suffix: '' },
      { id: 'stat-val-3', num: 4, suffix: '' },
    ];

    statsTargets.forEach((target) => {
      const el = document.getElementById(target.id);
      if (!el) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target.num,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#foundation-stats-section',
          start: 'top 86%',
          once: true
        },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val).toLocaleString()}${target.suffix}`;
        }
      });
    });

    // 3. TARGETED COMMUNITY STREAMS
    gsap.fromTo(
      '#community-streams-header',
      { autoAlpha: 0, y: isMobile ? 16 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#community-streams-header',
          start: 'top 88%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.community-stream-card',
      { autoAlpha: 0, y: isMobile ? 20 : 32 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: EASINGS.editorial,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '#community-streams-grid',
          start: 'top 86%',
          once: true
        }
      }
    );

    // 4. CURATED DOSSIERS GRID & FILTER
    gsap.fromTo(
      '#dossiers-header',
      { autoAlpha: 0, y: isMobile ? 16 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#dossiers-header',
          start: 'top 88%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '#dossiers-filter-sidebar',
      { autoAlpha: 0, y: isMobile ? 18 : 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#profiles-section',
          start: 'top 84%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.dossier-card',
      { autoAlpha: 0, y: isMobile ? 18 : 28 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: EASINGS.editorial,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '#dossier-cards-grid',
          start: 'top 86%',
          once: true
        }
      }
    );

    // 5. SACRED MATRIMONIAL JOURNEY (FOUR PILLARS)
    gsap.fromTo(
      '#journey-header',
      { autoAlpha: 0, y: isMobile ? 16 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#journey-header',
          start: 'top 88%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.pillar-step',
      { autoAlpha: 0, y: isMobile ? 20 : 30 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: EASINGS.editorial,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '#journey-pillars-grid',
          start: 'top 86%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '#journey-pledge',
      { autoAlpha: 0, y: isMobile ? 14 : 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#journey-pledge',
          start: 'top 90%',
          once: true
        }
      }
    );

    // 6. SUCCESS REFLECTIONS (Obsidian dark section)
    gsap.fromTo(
      '#success-reflections-quote',
      { autoAlpha: 0, y: isMobile ? 20 : 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: EASINGS.cinematic,
        scrollTrigger: {
          trigger: '#success-reflections',
          start: 'top 82%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '#counselor-council-card',
      { autoAlpha: 0, y: isMobile ? 18 : 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#counselor-council-card',
          start: 'top 84%',
          once: true
        }
      }
    );

    // 7. COUNSELING & GUIDANCE ARTICLES
    gsap.fromTo(
      '#guidance-header',
      { autoAlpha: 0, y: isMobile ? 16 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#guidance-header',
          start: 'top 88%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.article-card',
      { autoAlpha: 0, y: isMobile ? 20 : 30 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: EASINGS.editorial,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '#guidance-articles-grid',
          start: 'top 86%',
          once: true
        }
      }
    );

    // 8. MEMBERSHIP COVENANT CARD
    gsap.fromTo(
      '#pricing-covenant-card',
      { autoAlpha: 0, y: isMobile ? 20 : 32, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: EASINGS.cinematic,
        scrollTrigger: {
          trigger: '#pricing-covenant-card',
          start: 'top 85%',
          once: true
        }
      }
    );

    // 9. REGIONAL BUREAUS
    gsap.fromTo(
      '#bureaus-header',
      { autoAlpha: 0, y: isMobile ? 16 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#bureaus-header',
          start: 'top 88%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.bureau-card',
      { autoAlpha: 0, y: isMobile ? 18 : 28 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: EASINGS.editorial,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '#bureaus-grid',
          start: 'top 86%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '#bureaus-cta-btn',
      { autoAlpha: 0, y: 15 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: EASINGS.editorial,
        scrollTrigger: {
          trigger: '#bureaus-cta-btn',
          start: 'top 92%',
          once: true
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col">
      {/* SECTION 1: EDITORIAL HERO SECTION (Wide Asymmetric Layout) */}
      <section className="relative pt-10 pb-20 border-b border-[#C8C5B4]/30 overflow-hidden parchment-pattern">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Editorial Statement & Dignity Manifesto */}
            <div className="lg:col-span-7 pr-0 lg:pr-4">
              {/* Trust Charter Badge */}
              <div className="hero-eyebrow inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#526333]"></span>
                <span className="text-[11px] font-semibold text-[#11150D] uppercase tracking-wider">
                  13+ Years of Sacred Family Counseling • Maharashtra
                </span>
              </div>

              <h1 className="hero-headline font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#11150D] leading-[1.14] mb-6 tracking-tight font-medium">
                Find Your Life Partner with Faith, Dignity &amp; Uncompromised Trust
              </h1>

              <p className="hero-paragraph text-base sm:text-lg text-[#404946] max-w-2xl mb-8 leading-relaxed font-light">
                Under the auspices of Haji Mehmed Isaac Farash Foundation, FaizNikah provides an intentional, guardian-governed sanctuary for prospective brides and grooms. Over 5,600 sacred unions solemnized in accordance with Sunnah simplicity—strictly free of dowry and ostentation.
              </p>

              {/* Dual Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => onNavigate('find-partner')}
                  className="hero-cta-btn bg-[#0B4940] text-[#F7F4EA] font-semibold text-sm px-6 sm:px-7 py-3.5 rounded border border-[#14584C] hover:bg-[#14584C] transition-all shadow-[0_12px_24px_-8px_rgba(11,73,64,0.3)] flex items-center gap-2.5 active:scale-[0.99] group"
                >
                  <Compass size={19} className="group-hover:rotate-45 transition-transform duration-300" />
                  <span>Explore Curated Dossiers</span>
                </button>
                <button
                  onClick={() => onOpenCounselor()}
                  className="hero-cta-btn bg-[#F7F4EA] text-[#11150D] border border-[#667047]/60 font-semibold text-sm px-6 py-3.5 rounded hover:bg-[#E8E4D6]/50 transition-colors flex items-center gap-2 active:scale-[0.99] group"
                >
                  <Phone size={17} className="text-[#526333] group-hover:scale-110 transition-transform duration-200" />
                  <span>Speak to Family Counselor</span>
                </button>
              </div>

              {/* Trust Marks (Hairline Separators) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#C8C5B4]/40 text-xs text-[#191d14]">
                <div className="hero-trust-item flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#526333]" />
                  <span>Wali &amp; Guardian Verified</span>
                </div>
                <div className="hero-trust-item flex items-center gap-2">
                  <Handshake size={18} className="text-[#526333]" />
                  <span>No Dowry Simplicity Pledge</span>
                </div>
                <div className="hero-trust-item flex items-center gap-2">
                  <Lock size={18} className="text-[#526333]" />
                  <span>Confidential Matching</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Arch Editorial Portrait Frame */}
            <div className="lg:col-span-5 relative pl-0 lg:pl-4">
              <div className="hero-arch-frame relative z-10 p-3 bg-[#E8E4D6] border border-[#C8C5B4]/70 shadow-[0_20px_48px_-12px_rgba(17,21,13,0.12)] rounded-t-[140px] rounded-b-lg">
                <div className="overflow-hidden arch-mask h-[440px] sm:h-[480px] bg-[#C8C5B4]/20 relative">
                  <img
                    src="/assets/hero-couple-BSsNtkr_.jpg"
                    alt="Pious Muslim Bride and Groom in dignified Sunnah wedding attire"
                    className="hero-arch-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11150D]/75 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 text-[#F7F4EA]">
                    <div className="text-[11px] font-semibold tracking-widest uppercase text-[#B3A16A] mb-1">
                      Pious Covenant
                    </div>
                    <div className="font-serif text-lg sm:text-xl italic font-normal">
                      {/* "And He placed between you affection and mercy." */}
                    </div>
                    <div className="text-[11px] text-[#C8C5B4] mt-1">
                      Surah Ar-Rum 30:21
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Credential Card */}
              <div className="hero-floating-card absolute -bottom-6 -left-2 sm:-left-6 z-20 bg-[#F7F4EA] border border-[#C8C5B4]/80 rounded-lg p-4 sm:p-5 shadow-[0_16px_36px_-8px_rgba(17,21,13,0.15)] max-w-[250px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#C8C5B4]/80 bg-[#F7F4EA] flex items-center justify-center p-0.5 shadow-sm flex-shrink-0">
                    <img
                      src="/logo.png"
                      alt="FaizNikah Emblem"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div id="hero-count-val" className="font-serif text-xl text-[#0B4940] leading-none font-bold">5,600+</div>
                    <div className="text-[11px] font-semibold text-[#526333]">Blessed Unions</div>
                  </div>
                </div>
                <p className="text-[11px] text-[#404946] leading-snug">
                  Organized with care across 15 Maharashtra districts through intentional mediation.
                </p>
              </div>

              {/* Architectural Accent Motif */}
              <div className="absolute -top-4 -right-4 w-40 h-40 border border-[#B3A16A]/30 rounded-t-[80px] -z-0 pointer-events-none hidden sm:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: KEY FOUNDATION METRICS & IMPACT BANNER */}
      <section id="foundation-stats-section" className="py-12 bg-[#F7F4EA] border-b border-[#C8C5B4]/30">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#C8C5B4]/40">
            {FOUNDATION_STATS.map((stat, idx) => (
              <div key={idx} className={`stat-item pt-4 sm:pt-0 sm:px-4 ${idx === 0 ? 'sm:pl-0' : ''} ${idx === 3 ? 'sm:pr-0' : ''}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span id={`stat-val-${idx}`} className="font-serif text-3xl lg:text-[34px] font-medium text-[#0B4940]">
                    {stat.value}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#11150D] mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-[#404946] leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TARGETED COMMUNITY STREAMS */}
      <section className="py-20 bg-[#f8fbed] border-b border-[#C8C5B4]/30">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div id="community-streams-header" className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-2">
              Dedicated Communal Paths
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#11150D] mb-4 font-medium">
              Dossiers Categorized by Maslak &amp; Heritage
            </h2>
            <p className="text-sm md:text-base text-[#404946] leading-relaxed">
              Respecting traditions, jurisprudence, and familial expectations. Every stream maintains independent verified listings with mutual confidentiality.
            </p>
          </div>

          <div id="community-streams-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sunni Stream */}
            <div className="community-stream-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/60 rounded-lg p-7 hover:border-[#0B4940]/40 transition-all hover:bg-[#E8E4D6]/60 group flex flex-col justify-between hover:-translate-y-1 duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0B4940]/10 border border-[#0B4940]/20 flex items-center justify-center mb-6 text-[#0B4940] group-hover:bg-[#0B4940] group-hover:text-[#F7F4EA] transition-colors">
                  <BookOpen size={22} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-[#11150D] font-medium">Sunni Muslim Dossiers</h3>
                  <span className="text-[11px] font-semibold bg-[#526333]/10 text-[#526333] px-2 py-0.5 rounded">
                    1,400+ Profiles
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#404946] mb-6 leading-relaxed">
                  Extensive directory of professionals, scholars, software engineers, and medical practitioners across Pune, Mumbai, Solapur and Ahmednagar.
                </p>
                <div className="space-y-2 mb-6 text-xs text-[#191d14]">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#526333]" />
                    <span>Hanafi, Shafi'i and general Ahle Sunnah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#526333]" />
                    <span>Certified Guardian Consent Verification</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('find-partner', { community: 'Sunni' })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4940] group-hover:text-[#14584C] transition-colors underline underline-offset-4 decoration-[#B3A16A] text-left"
              >
                <span>Explore Sunni Candidates</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Shia Stream */}
            <div className="community-stream-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/60 rounded-lg p-7 hover:border-[#0B4940]/40 transition-all hover:bg-[#E8E4D6]/60 group flex flex-col justify-between hover:-translate-y-1 duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0B4940]/10 border border-[#0B4940]/20 flex items-center justify-center mb-6 text-[#0B4940] group-hover:bg-[#0B4940] group-hover:text-[#F7F4EA] transition-colors">
                  <Sparkles size={22} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-[#11150D] font-medium">Shia Muslim Dossiers</h3>
                  <span className="text-[11px] font-semibold bg-[#526333]/10 text-[#526333] px-2 py-0.5 rounded">
                    Curated Group
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#404946] mb-6 leading-relaxed">
                  Dedicated, respectful registry for Ithna Ashari families, Syed and allied community biodatas accompanied by trusted parental mediation.
                </p>
                <div className="space-y-2 mb-6 text-xs text-[#191d14]">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#526333]" />
                    <span>Ja'fari jurisprudence respect &amp; authenticity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#526333]" />
                    <span>Strictly gated family contact protocol</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('find-partner', { community: 'Shia' })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4940] group-hover:text-[#14584C] transition-colors underline underline-offset-4 decoration-[#B3A16A] text-left"
              >
                <span>Explore Shia Candidates</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Bohra Stream */}
            <div className="community-stream-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/60 rounded-lg p-7 hover:border-[#0B4940]/40 transition-all hover:bg-[#E8E4D6]/60 group flex flex-col justify-between hover:-translate-y-1 duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0B4940]/10 border border-[#0B4940]/20 flex items-center justify-center mb-6 text-[#0B4940] group-hover:bg-[#0B4940] group-hover:text-[#F7F4EA] transition-colors">
                  <Building size={22} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-[#11150D] font-medium">Bohra Muslim Dossiers</h3>
                  <span className="text-[11px] font-semibold bg-[#526333]/10 text-[#526333] px-2 py-0.5 rounded">
                    High Discretion
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#404946] mb-6 leading-relaxed">
                  Specialized directory for mercantile, professional, and corporate Dawoodi Bohra candidates observing traditional cultural harmony.
                </p>
                <div className="space-y-2 mb-6 text-xs text-[#191d14]">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#526333]" />
                    <span>Business &amp; professional community ties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#526333]" />
                    <span>Confidential counselor facilitation</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('find-partner', { community: 'Bohra' })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4940] group-hover:text-[#14584C] transition-colors underline underline-offset-4 decoration-[#B3A16A] text-left"
              >
                <span>Explore Bohra Candidates</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DISCOVERY SUITE & CURATED DOSSIERS GRID */}
      <section className="py-20 bg-[#F7F4EA]/60 border-b border-[#C8C5B4]/30" id="profiles-section">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Header Controls */}
          <div id="dossiers-header" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-[#C8C5B4]/40 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-1">
                Active Candidate Directory
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#11150D] font-medium">
                Curated Matrimonial Dossiers
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#404946]">
              <span>
                Showing <strong className="text-[#11150D]">{previewProfiles.length} of {PROFILES.length}</strong> Sample Dossiers
              </span>
              <div className="hidden sm:block h-4 w-px bg-[#C8C5B4]"></div>
              <span className="flex items-center gap-1.5 text-[#526333]">
                <span className="w-2 h-2 rounded-full bg-[#526333] animate-pulse"></span>
                <span>Counselors Active Today</span>
              </span>
              <button
                onClick={() => onNavigate('find-partner')}
                className="font-semibold text-[#0B4940] hover:underline"
              >
                Open Full Search Suite →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Filter Sidebar */}
            <aside id="dossiers-filter-sidebar" className="lg:col-span-4 bg-[#E8E4D6]/50 border border-[#C8C5B4]/60 rounded-lg p-6 self-start space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#C8C5B4]/40">
                <h3 className="text-sm font-bold text-[#11150D] flex items-center gap-2">
                  <Filter size={16} />
                  <span>Refine Parameters</span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedCommunity('All');
                    setSelectedDistrict('All');
                    setWaliOnly(false);
                    setDowryOnly(false);
                  }}
                  className="text-xs text-[#526333] hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Community / Maslak */}
              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-1.5">
                  Maslak / Community Tradition
                </label>
                <select
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value as CommunityType)}
                  className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded px-3 py-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                >
                  <option value="All">All Communities (Sunni, Shia, Bohra)</option>
                  <option value="Sunni">Sunni — Hanafi / Shafi'i</option>
                  <option value="Shia">Shia — Ithna Ashari</option>
                  <option value="Bohra">Dawoodi Bohra</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-1.5">
                  Location / Regional Bureau
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded px-3 py-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                >
                  <option value="All">All Maharashtra Districts</option>
                  <option value="Pune">Pune (Kondhwa, Camp, Hadapsar)</option>
                  <option value="Aurangabad">Aurangabad (Chhatrapati Sambhajinagar)</option>
                  <option value="Sangamner">Sangamner / Ahmednagar</option>
                  <option value="Solapur">Solapur &amp; Western Maharashtra</option>
                </select>
              </div>

              {/* Age Range Slider display */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#11150D] mb-1.5">
                  <span>Age Spectrum</span>
                  <span className="text-[#526333]">21 — 35 Years</span>
                </div>
                <div className="w-full bg-[#C8C5B4]/40 h-1.5 rounded-full relative">
                  <div className="absolute left-1/4 right-1/4 bg-[#0B4940] h-1.5 rounded-full"></div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="pt-3 border-t border-[#C8C5B4]/40 space-y-2.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waliOnly}
                    onChange={(e) => setWaliOnly(e.target.checked)}
                    className="mt-0.5 rounded text-[#0B4940] focus:ring-0 border-[#C8C5B4]"
                  />
                  <span className="text-xs text-[#191d14]">
                    <strong>Wali Verified Only</strong>
                    <span className="block text-[11px] text-[#404946]">Profile verified with registered guardian.</span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dowryOnly}
                    onChange={(e) => setDowryOnly(e.target.checked)}
                    className="mt-0.5 rounded text-[#0B4940] focus:ring-0 border-[#C8C5B4]"
                  />
                  <span className="text-xs text-[#191d14]">
                    <strong>No Dowry Commitment</strong>
                    <span className="block text-[11px] text-[#404946]">Signed pledge against wedding extravagances.</span>
                  </span>
                </label>
              </div>

              <button
                onClick={() => onNavigate('find-partner', { community: selectedCommunity })}
                className="w-full bg-[#11150D] text-[#C8C5B4] hover:text-[#F7F4EA] py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Search size={14} />
                <span>Search All 2,000+ Profiles</span>
              </button>
            </aside>

            {/* Right Grid of 4 Editorial Dossiers */}
            <div id="dossier-cards-grid" className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {previewProfiles.map((p) => {
                const isShortlisted = shortlistedIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="dossier-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_36px_-8px_rgba(17,21,13,0.12)] hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-[#526333]/10 text-[#526333] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck size={13} />
                          <span>Wali Verified</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#404946] font-mono">{p.id}</span>
                          <button
                            onClick={() => onToggleShortlist(p.id)}
                            className="text-[#404946] hover:text-rose-600 transition-colors"
                            title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                          >
                            <Heart size={15} className={isShortlisted ? 'fill-rose-600 text-rose-600' : ''} />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4 mb-4">
                        <div className="w-20 h-24 rounded bg-[#C8C5B4]/30 overflow-hidden border border-[#C8C5B4] flex-shrink-0 relative">
                          <img
                            src={p.photoUrl}
                            alt={p.name}
                            className={`w-full h-full object-cover ${p.photoPrivacy === 'OnRequest' ? 'blur-sm scale-105' : ''}`}
                          />
                          {p.photoPrivacy === 'OnRequest' && (
                            <div className="absolute bottom-0 inset-x-0 bg-[#11150D]/75 py-0.5 text-center text-[8px] text-[#F7F4EA] font-medium">
                              Consent Req.
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg text-[#11150D] font-medium truncate">
                            {p.name} ({p.age} yrs, {p.height})
                          </h4>
                          <p className="text-xs font-semibold text-[#0B4940] truncate mt-0.5">
                            {p.education}
                          </p>
                          <p className="text-xs text-[#404946] truncate">
                            {p.profession}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-semibold text-[#526333] uppercase">
                            {p.community} • {p.subCommunity}
                          </span>
                        </div>
                      </div>

                      {/* Structured Value Divider */}
                      <div className="border-t border-b border-[#C8C5B4]/50 py-2.5 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#404946]">Family Root:</span>
                          <span className="text-[#191d14] font-medium truncate ml-2">{p.familyRoots}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#404946]">Wali Guardian:</span>
                          <span className="text-[#191d14] font-medium truncate ml-2">{p.waliGuardian}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#404946]">Nikah View:</span>
                          <span className="text-[#526333] font-medium truncate ml-2">{p.nikahView}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <button
                        onClick={() => onSelectProfile(p)}
                        className="w-full bg-[#F7F4EA] border border-[#0B4940]/40 text-[#0B4940] hover:bg-[#0B4940] hover:text-[#F7F4EA] py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye size={15} />
                        <span>View Full Guardian Biodata</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE SACRED MATRIMONIAL JOURNEY (Four Pillars of Discovery) */}
      <section className="py-20 bg-[#f8fbed] border-b border-[#C8C5B4]/30" id="discovery-pillars">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div id="journey-header" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-2">
              A Covenant of Integrity
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#11150D] mb-4 font-medium">
              The Four Pillars of FaizNikah Discovery
            </h2>
            <p className="text-sm md:text-base text-[#404946]">
              Moving decisively away from modern dating algorithms and superficial browsing. Every step is governed by verified family contact and genuine intention.
            </p>
          </div>

          <div id="journey-pillars-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting progress line on large screens */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#B3A16A]/40 via-[#0B4940]/30 to-[#526333]/40 z-0 pointer-events-none" />

            {/* Step 1 */}
            <div className="pillar-step relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-[#F7F4EA] border-2 border-[#B3A16A] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-[#0B4940] transition-transform duration-300">
                <span className="font-serif text-2xl text-[#0B4940] font-bold">01</span>
              </div>
              <h3 className="font-serif text-lg text-[#11150D] mb-2 font-medium">
                Intent &amp; Registration
              </h3>
              <p className="text-xs sm:text-sm text-[#404946] leading-relaxed">
                Complete a comprehensive matrimonial biodata with career, educational, sectarian, and Wali guardian contact details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="pillar-step relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-[#F7F4EA] border-2 border-[#0B4940] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-[#526333] transition-transform duration-300">
                <span className="font-serif text-2xl text-[#0B4940] font-bold">02</span>
              </div>
              <h3 className="font-serif text-lg text-[#11150D] mb-2 font-medium">
                Verification &amp; Review
              </h3>
              <p className="text-xs sm:text-sm text-[#404946] leading-relaxed">
                Foundation counselors verify references, authenticate documents, and conduct discreet family background validation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="pillar-step relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-[#F7F4EA] border-2 border-[#526333] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-[#0B4940] transition-transform duration-300">
                <span className="font-serif text-2xl text-[#0B4940] font-bold">03</span>
              </div>
              <h3 className="font-serif text-lg text-[#11150D] mb-2 font-medium">
                Mutual Wali Liaison
              </h3>
              <p className="text-xs sm:text-sm text-[#404946] leading-relaxed">
                Profiles are introduced through respectful, moderated telephone conferences or in-person meetings at our Pune, Aurangabad, or Solapur offices.
              </p>
            </div>

            {/* Step 4 */}
            <div className="pillar-step relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-[#0B4940] border-2 border-[#B3A16A] flex items-center justify-center mb-6 text-[#F7F4EA] shadow-md group-hover:scale-105 transition-transform duration-300">
                <Heart size={26} className="fill-[#F7F4EA]" />
              </div>
              <h3 className="font-serif text-lg text-[#11150D] mb-2 font-medium">
                Nikah with Sunnah Simplicity
              </h3>
              <p className="text-xs sm:text-sm text-[#404946] leading-relaxed">
                Assisting families to solemnize barakah-filled marriages free of lavish demands, excessive halls, or dowry encumbrances.
              </p>
            </div>
          </div>

          <div id="journey-pledge" className="mt-14 p-6 bg-[#E8E4D6]/60 border border-[#C8C5B4]/80 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#526333]/20 flex items-center justify-center text-[#526333] flex-shrink-0">
                <Handshake size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#11150D]">
                  The Faiz Sacred Simplicity Pledge
                </h4>
                <p className="text-xs text-[#404946]">
                  "In every procession, according to their wishes, a vow is made not to burden the bride's household."
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="text-xs font-semibold text-[#0B4940] hover:underline whitespace-nowrap"
            >
              Read our Foundation Charter →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: SUCCESS REFLECTIONS (Immersive Forest Obsidian Pull-Quote) */}
      <section className="py-24 bg-[#11150D] text-[#C8C5B4] relative overflow-hidden" id="success-reflections">
        <div className="absolute top-0 right-0 w-96 h-96 border border-[#B3A16A]/10 rounded-full -mr-20 -mt-20 pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div id="success-reflections-quote" className="lg:col-span-8">
              <span className="text-xs uppercase tracking-widest text-[#B3A16A] font-semibold block mb-4">
                Real Unions • Real Blessings
              </span>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#F7F4EA] leading-snug mb-8 font-light">
                “We wanted a Nikah grounded entirely in Sunnah simplicity—without the burden of opulent banquet halls or dowry expectations. Through Faiz Marriage Bureau, our families met in complete mutual honor and solemnized our vows in the Masjid.”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#B3A16A]/50 p-0.5">
                  <div className="w-full h-full rounded-full bg-[#0B4940] flex items-center justify-center text-[#B3A16A]">
                    <Check size={20} />
                  </div>
                </div>
                <div>
                  <div className="font-serif text-lg text-[#F7F4EA] font-medium">Imran &amp; Shaheen Shaikh</div>
                  <div className="text-xs text-[#C8C5B4]/80">
                    Solemnized at Kondhwa Khurd, Pune • Active FaizNikah Alumni
                  </div>
                </div>
              </div>
            </div>

            {/* Counselor Council Sidebar */}
            <div id="counselor-council-card" className="lg:col-span-4 bg-[#11150D]/80 border border-[#C8C5B4]/20 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="font-serif text-lg text-[#F7F4EA] mb-4 flex items-center gap-2 font-medium">
                <Users size={18} className="text-[#B3A16A]" />
                <span>Our Counselor Council</span>
              </h4>
              <div className="space-y-4 text-xs">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.id} className="pb-3 border-b border-[#C8C5B4]/15 last:border-0 last:pb-0">
                    <div className="font-semibold text-[#F7F4EA] text-sm">{member.name}</div>
                    <div className="text-[11px] text-[#C8C5B4]/70">{member.role}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#C8C5B4]/20">
                <button
                  onClick={() => onNavigate('team')}
                  className="text-xs text-[#B3A16A] hover:underline flex items-center gap-1"
                >
                  <span>Meet the Full Council</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FOUNDATION GUIDANCE & ISLAMIC FAMILY COUNSELING (Editorial Articles) */}
      <section className="py-20 bg-[#f8fbed] border-b border-[#C8C5B4]/30" id="counseling-guidance">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div id="guidance-header" className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-2">
                Editorial Insights &amp; Marital Ethics
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#11150D] font-medium">
                Islamic Guidance &amp; Counselor Reflections
              </h2>
            </div>
            <button
              onClick={() => onNavigate('blogs')}
              className="text-xs font-semibold text-[#0B4940] hover:underline flex items-center gap-1"
            >
              <span>Browse All Guidance Articles</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div id="guidance-articles-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className="article-card bg-[#E8E4D6]/30 border border-[#C8C5B4]/60 rounded-lg p-6 flex flex-col justify-between hover:border-[#0B4940]/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <span className="text-xs text-[#526333] font-semibold block mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-xl text-[#11150D] mb-3 leading-snug font-medium">
                    {article.originalTitleHindi || article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404946] mb-6 line-clamp-4 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8C5B4]/40 flex items-center justify-between text-xs">
                  <span className="text-[#404946] font-medium">{article.author}</span>
                  <button
                    onClick={() => onNavigate('blogs', { blogId: article.id })}
                    className="font-semibold text-[#0B4940] hover:underline"
                  >
                    Read Treatise →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TRANSPARENT MATRIMONIAL MEMBERSHIP PLAN */}
      <section className="py-20 bg-[#F7F4EA] border-b border-[#C8C5B4]/30" id="pricing">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div id="pricing-covenant-card" className="max-w-3xl mx-auto bg-[#E8E4D6]/70 border border-[#C8C5B4] rounded-xl p-8 sm:p-10 shadow-[0_12px_36px_-8px_rgba(17,21,13,0.06)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 border border-[#B3A16A]/40 rounded-full pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-1">
                  Non-Profit Philanthropic Subsidy
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#11150D] font-medium">
                  Sacred Matrimonial Covenant
                </h2>
                <p className="text-xs sm:text-sm text-[#404946] mt-1">
                  Single, un-gated fee designed to support the Haji Mehmed Isaac Farash Foundation activities.
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="font-serif text-3xl font-bold text-[#0B4940]">₹1,999/-</div>
                <div className="text-xs font-semibold text-[#526333]">Full 18 Months Access</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pt-6 border-t border-[#C8C5B4]/50 text-xs sm:text-sm text-[#191d14]">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#526333]" />
                <span>Full Access to 2,000+ Biodatas</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#526333]" />
                <span>Direct Wali Guardian Contact Verification</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#526333]" />
                <span>Personal In-Person Counseling at Offices</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#526333]" />
                <span>Invitations to Community Jalsa &amp; Gatherings</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#526333]" />
                <span>No Dowry Assistance &amp; Mediation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#526333]" />
                <span>Confidential Biodata Privacy Controls</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#C8C5B4]/50 gap-4">
              <div className="text-xs text-[#404946] text-center sm:text-left">
                <span>Supports our Primary School, Sartaj Library &amp; Roti Bank initiatives.</span>
              </div>
              <button
                onClick={() => onNavigate('create-profile')}
                className="w-full sm:w-auto bg-[#0B4940] text-[#F7F4EA] font-semibold text-xs px-8 py-3 rounded border border-[#14584C] hover:bg-[#14584C] transition-all shadow-[0_4px_16px_rgba(11,73,64,0.2)] flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} />
                <span>Enroll for 18 Months Access</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: REGIONAL CONSULATES & BUREAUS OVERVIEW */}
      <section className="py-20 bg-[#f8fbed] border-b border-[#C8C5B4]/30" id="foundation-charter">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div id="bureaus-header" className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-2">
              Physical In-Person Verification
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#11150D] mb-4 font-medium">
              Our Regional Matrimonial Bureaus
            </h2>
            <p className="text-sm md:text-base text-[#404946]">
              Families who prefer traditional, face-to-face consultation are warmly invited to visit our accredited bureau locations in Maharashtra.
            </p>
          </div>

          <div id="bureaus-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFICES.map((office) => (
              <div key={office.id} className="bureau-card bg-[#E8E4D6]/30 border border-[#C8C5B4]/60 rounded-lg p-6 flex flex-col justify-between hover:border-[#0B4940]/40 hover:-translate-y-1 transition-all duration-300 group">
                <div>
                  <div className="flex items-center gap-2 text-[#0B4940] mb-3">
                    <Building size={18} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {office.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-[#11150D] font-medium mb-2">
                    {office.city}
                  </h3>
                  <p className="text-xs text-[#404946] mb-4 leading-relaxed">
                    {office.address}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#C8C5B4]/30 text-xs text-[#526333] font-medium">
                  {office.timing}
                </div>
              </div>
            ))}
          </div>

          <div id="bureaus-cta-btn" className="mt-12 text-center">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B4940] hover:underline"
            >
              <span>View Bureau Map, Full Contact Numbers &amp; Appointments</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
