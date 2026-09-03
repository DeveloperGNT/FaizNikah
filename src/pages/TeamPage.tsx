import React, { useState, useMemo } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Search, 
  MapPin, 
  Building, 
  HeartHandshake, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { FAIZ_TEAM_MEMBERS, FaizTeamMember, FOUNDATION_DISCLAIMER } from '../data/teamMembersData';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface TeamPageProps {
  onNavigate: (page: string) => void;
  onOpenCounselor: (profileId?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate, onOpenCounselor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    gsap.fromTo(
      '.team-hero-header',
      { opacity: 0, y: 24, force3D: true },
      { opacity: 1, y: 0, duration: 0.75, ease: EASINGS.editorial, delay: 0.1 }
    );

    gsap.fromTo(
      '.team-filter-bar',
      { opacity: 0, y: 16, force3D: true },
      { opacity: 1, y: 0, duration: 0.65, ease: EASINGS.smooth, delay: 0.25 }
    );

    gsap.fromTo(
      '.team-member-card',
      { opacity: 0, y: 22, force3D: true },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: EASINGS.editorial, delay: 0.35 }
    );

    gsap.fromTo(
      '.team-office-strip-item',
      { opacity: 0, y: 20, force3D: true },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#team-offices-strip',
          start: 'top 88%',
          once: true,
          fastScrollEnd: true
        }
      }
    );
  }, [selectedCity, searchQuery]);

  // Unique normalized cities for filter pills
  const cities = useMemo(() => {
    const list = ['All'];
    const counts: Record<string, number> = { All: FAIZ_TEAM_MEMBERS.length };
    
    FAIZ_TEAM_MEMBERS.forEach((m) => {
      let c = m.location.trim();
      // Normalize casing
      if (c.toLowerCase() === 'pune') c = 'Pune';
      if (c.toLowerCase() === 'solapure' || c.toLowerCase() === 'solapur') c = 'Solapur';
      if (c.toLowerCase() === 'bombay') c = 'Mumbai / Bombay';
      if (c.toLowerCase() === 'mahad bombay') c = 'Mahad / Konkan';
      if (c.toLowerCase() === 'kolapur') c = 'Kolhapur';
      if (c.toLowerCase() === 'pipri-chinchawad') c = 'Pimpri-Chinchwad';
      
      counts[c] = (counts[c] || 0) + 1;
      if (!list.includes(c)) list.push(c);
    });

    return { list, counts };
  }, []);

  const filteredMembers = useMemo(() => {
    return FAIZ_TEAM_MEMBERS.filter((member) => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCity === 'All') return true;

      const loc = member.location.toLowerCase();
      if (selectedCity === 'Pune') return loc.includes('pune');
      if (selectedCity === 'Solapur') return loc.includes('solapur') || loc.includes('solapure');
      if (selectedCity === 'Mumbai / Bombay') return loc.includes('bombay') || loc.includes('mumbai');
      if (selectedCity === 'Mahad / Konkan') return loc.includes('mahad');
      if (selectedCity === 'Kolhapur') return loc.includes('kolapur') || loc.includes('kolhapur');
      if (selectedCity === 'Pimpri-Chinchwad') return loc.includes('pipri') || loc.includes('pimpri');
      if (selectedCity === 'Nigdi') return loc.includes('nigdi');
      if (selectedCity === 'Aurangabad') return loc.includes('aurangabad');
      if (selectedCity === 'Sangamner') return loc.includes('sangamner');
      if (selectedCity === 'Nagpur') return loc.includes('nagpur');
      if (selectedCity === 'Miraj') return loc.includes('miraj');
      if (selectedCity === 'Akola') return loc.includes('akola');
      if (selectedCity === 'Surat') return loc.includes('surat');

      return member.location.toLowerCase() === selectedCity.toLowerCase();
    });
  }, [searchQuery, selectedCity]);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div ref={containerRef} className="w-full bg-[#f8fbed] min-h-screen py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb & Trust Marker */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-[#526333]">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-[#0B4940] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-[#0B4940] transition-colors"
            >
              The Foundation
            </button>
            <span>/</span>
            <span className="font-semibold text-[#11150D]">Meet Our Team</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8E4D6]/80 border border-[#C8C5B4]/70 rounded-full text-[11px] font-semibold text-[#0B4940]">
            <ShieldCheck size={13} className="text-[#0B4940]" />
            <span>36 Verified Voluntary Counselors Across Maharashtra</span>
          </div>
        </div>

        {/* Hero Card Container (Mirrors the exact faiznikah.com card layout) */}
        <div className="bg-[#F7F4EA] border border-[#C8C5B4]/80 rounded-2xl shadow-[0_8px_30px_-6px_rgba(17,21,13,0.06)] p-6 sm:p-10 mb-10">
          
          {/* Main Title & Section Header */}
          <div className="team-hero-header text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#526333] font-bold block mb-2">
              Haji Mohammad Isaac Farash Foundation, Pune
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#11150D] font-bold tracking-tight">
              Meet Our Team
            </h1>
            <div className="w-20 h-1 bg-[#0B4940] mx-auto my-4 rounded-full"></div>
            <p className="text-sm sm:text-base text-[#404946] leading-relaxed">
              Dedicated voluntary counselors, community elders, and regional mediators who have facilitated over <strong className="text-[#0B4940]">5,600 blessed Nikahs</strong> across 15 districts of Maharashtra over the past 13+ years.
            </p>
          </div>

          {/* Search & Filter Suite */}
          <div className="team-filter-bar mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#526333]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search team member or city..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#E8E4D6]/50 border border-[#C8C5B4] rounded-lg focus:outline-none focus:border-[#0B4940] text-[#11150D] placeholder-[#404946]/60 transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#526333] hover:text-[#11150D]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status & Helpline */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs text-[#404946]">
                <span className="font-medium text-[#11150D]">
                  Showing <strong className="text-[#0B4940]">{filteredMembers.length}</strong> of {FAIZ_TEAM_MEMBERS.length} members
                </span>
                <span className="text-[#C8C5B4]">•</span>
                <a 
                  href="tel:9503801999" 
                  className="inline-flex items-center gap-1 text-[#0B4940] font-semibold hover:underline"
                >
                  <Phone size={13} />
                  <span>+91 9503801999</span>
                </a>
              </div>
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#526333] flex-shrink-0 mr-1 flex items-center gap-1">
                <MapPin size={12} />
                Bureaus:
              </span>
              {['All', 'Pune', 'Solapur', 'Aurangabad', 'Mumbai / Bombay', 'Sangamner', 'PCMC', 'Nagpur', 'Kolhapur', 'Miraj', 'Akola', 'Surat'].map((cityKey) => {
                const isSelected = 
                  cityKey === 'PCMC' 
                    ? selectedCity === 'Pimpri-Chinchwad' || selectedCity === 'Nigdi'
                    : selectedCity === cityKey;

                return (
                  <button
                    key={cityKey}
                    onClick={() => {
                      if (cityKey === 'PCMC') setSelectedCity('Pimpri-Chinchwad');
                      else setSelectedCity(cityKey);
                    }}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-xs font-medium ${
                      isSelected
                        ? 'bg-[#0B4940] text-[#F7F4EA] shadow-sm font-semibold'
                        : 'bg-[#E8E4D6]/70 text-[#404946] hover:bg-[#E8E4D6] hover:text-[#11150D]'
                    }`}
                  >
                    {cityKey}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team Grid: 4 Columns on lg/desktop, 3 on md, 2 on mobile (Matches col-lg-3 col-6 of faiznikah.com) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            {filteredMembers.map((member) => {
              const hasError = imageErrors[member.id];
              // Primary image: local downloaded asset; if fails, fall back to original web URL or user.png
              const displaySrc = hasError 
                ? (member.originalUrl || '/team/user.png')
                : member.imageUrl;

              return (
                <div 
                  key={member.id}
                  className="team-member-card flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#E8E4D6]/40 transition-all group border border-transparent hover:border-[#C8C5B4]/50"
                >
                  {/* Circular Avatar: 150px x 150px rounded-full matching faiznikah.com exact styling */}
                  <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] mb-3">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#C8C5B4]/80 group-hover:border-[#0B4940] transition-colors shadow-sm bg-[#E8E4D6] flex items-center justify-center">
                      <img 
                        src={displaySrc} 
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(member.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    {/* Active Verification Indicator */}
                    <div 
                      className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
                      title="Verified Foundation Counselor"
                    ></div>
                  </div>

                  {/* Name: Exact uppercase bold styling as in faiznikah.com */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#11150D] uppercase tracking-wide leading-snug">
                    {member.name}
                  </h3>

                  {/* Location: Exact location styling as in faiznikah.com */}
                  <p className="text-xs sm:text-[13px] text-[#0B4940] font-medium mt-0.5 capitalize flex items-center gap-1">
                    <MapPin size={11} className="text-[#526333] flex-shrink-0" />
                    <span>{member.location}</span>
                  </p>

                  {/* Role descriptor */}
                  {member.role && (
                    <span className="text-[10.5px] text-[#404946] bg-[#E8E4D6]/70 px-2 py-0.5 rounded mt-1.5 inline-block line-clamp-1 max-w-[170px]" title={member.role}>
                      {member.role}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-16 text-[#404946]">
              <Users size={36} className="mx-auto text-[#C8C5B4] mb-3" />
              <p className="text-base font-medium text-[#11150D]">No team members found</p>
              <p className="text-xs text-[#404946] mt-1">Try clearing your search query or selecting "All" bureaus.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCity('All'); }}
                className="mt-4 px-4 py-2 bg-[#0B4940] text-white text-xs font-semibold rounded-md"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>

        {/* Foundation Charter & Disclaimer Box (Matching exact footer disclaimer of faiznikah.com) */}
        <div className="bg-[#E8E4D6]/70 border border-[#C8C5B4] rounded-2xl p-6 sm:p-10 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#0B4940] text-[#F7F4EA] rounded-xl flex-shrink-0 hidden sm:block shadow-sm">
              <Sparkles size={24} />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#526333]">
                  Official Trust Disclaimer &amp; Mission
                </span>
                <span className="text-[#C8C5B4]">•</span>
                <span className="text-xs font-semibold text-[#0B4940]">faiznikah.com</span>
              </div>

              <div className="text-xs sm:text-[13px] text-[#404946] leading-relaxed space-y-3 font-normal">
                <p>
                  <strong>Assalaam Walekum and Rahmatullah Barkathu Friends</strong> — Haji Mohammad Isaac Farash Foundation Pune is a registered organization. Under this, along with Primary School, Sartaj Library, Roti Bank, and the Marriage Bureau, the work of matrimonial counseling has been going on continuously for the last 13 years so that every marriage is solemnized with right timing and Sunnah simplicity.
                </p>
                <p>
                  <em>"Of course, the best Mu'ashera (virtuous society) begins with the best marriage."</em>
                </p>
                <p>
                  Allah Subhanu wa Ta'ala has made Faiz Marriage Bureau a means of connecting over <strong>5,600 blessed relationships</strong> to date. Our dedicated volunteers give their valuable time for the well-being and betterment of families alongside handling their personal household responsibilities.
                </p>
                <p>
                  So far, successful relationships have been solemnized in <strong>15 districts</strong> through Faiz Marriage Bureau. In every procession, a vow is upheld not to eat the food of the bride's house, guarding against any undue dowry or financial burden.
                </p>
                <p className="font-semibold text-[#11150D]">
                  Currently, active regional bureaus are functioning in Aurangabad, Sangamner, Solapur, with Head Office situated at Kondhwa Khurd, Pune.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenCounselor()}
                  className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow"
                >
                  <Phone size={14} />
                  <span>Book Consultation With Senior Mediator</span>
                </button>
                <a
                  href="https://wa.me/919503801999"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow"
                >
                  <MessageSquare size={14} />
                  <span>Chat on WhatsApp (+91 9503801999)</span>
                </a>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#F7F4EA] hover:bg-white text-[#11150D] border border-[#C8C5B4] px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  View All Regional Bureau Addresses
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Offices Quick Contact Strip */}
        <div id="team-offices-strip" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="team-office-strip-item bg-[#F7F4EA] p-5 rounded-xl border border-[#C8C5B4]/80 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#526333] block mb-1">
              Central Head Office
            </span>
            <h4 className="font-serif text-base font-semibold text-[#11150D]">Pune Bureau</h4>
            <p className="text-xs text-[#404946] mt-1">Near Welcome Hall, Kondhwa Khurd, Pune - 411048</p>
            <a href="tel:9503801999" className="text-xs font-bold text-[#0B4940] block mt-2 hover:underline">
              +91 9503801999
            </a>
          </div>

          <div className="team-office-strip-item bg-[#F7F4EA] p-5 rounded-xl border border-[#C8C5B4]/80 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#526333] block mb-1">
              Regional Bureau
            </span>
            <h4 className="font-serif text-base font-semibold text-[#11150D]">Solapur Bureau</h4>
            <p className="text-xs text-[#404946] mt-1">Shanti Nagar / Dandoti Center, Solapur</p>
            <a href="tel:9503801999" className="text-xs font-bold text-[#0B4940] block mt-2 hover:underline">
              In-Charge: Matin Bagwan
            </a>
          </div>

          <div className="team-office-strip-item bg-[#F7F4EA] p-5 rounded-xl border border-[#C8C5B4]/80 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#526333] block mb-1">
              Regional Bureau
            </span>
            <h4 className="font-serif text-base font-semibold text-[#11150D]">Aurangabad Bureau</h4>
            <p className="text-xs text-[#404946] mt-1">Kiradpura / Roshan Gate, Chhatrapati Sambhajinagar</p>
            <a href="tel:9503801999" className="text-xs font-bold text-[#0B4940] block mt-2 hover:underline">
              In-Charge: Farzana Shamim
            </a>
          </div>

          <div className="team-office-strip-item bg-[#F7F4EA] p-5 rounded-xl border border-[#C8C5B4]/80 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#526333] block mb-1">
              Regional Bureau
            </span>
            <h4 className="font-serif text-base font-semibold text-[#11150D]">Sangamner Bureau</h4>
            <p className="text-xs text-[#404946] mt-1">Ahmednagar District Office, Sangamner</p>
            <a href="tel:9503801999" className="text-xs font-bold text-[#0B4940] block mt-2 hover:underline">
              In-Charge: Haji Mubin Suleman
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
