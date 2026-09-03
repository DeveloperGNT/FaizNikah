import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Heart, 
  Eye, 
  X, 
  CheckCircle, 
  Lock,
  Building,
  GraduationCap,
  MapPin,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PROFILES } from '../data/faizNikahData';
import { Profile, CommunityType } from '../types';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface FindPartnerPageProps {
  initialCommunity?: CommunityType;
  onSelectProfile: (profile: Profile) => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
  onOpenCounselor: (profileId?: string) => void;
  onNavigate: (page: string) => void;
}

export const FindPartnerPage: React.FC<FindPartnerPageProps> = ({
  initialCommunity = 'All',
  onSelectProfile,
  shortlistedIds,
  onToggleShortlist,
  onOpenCounselor,
  onNavigate,
}) => {
  // Filters
  const [activeTab, setActiveTab] = useState<'all' | 'shortlist'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType>(initialCommunity);
  const [selectedGender, setSelectedGender] = useState<'All' | 'Female' | 'Male'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string>('All');
  const [waliOnly, setWaliOnly] = useState(true);
  const [dowryFreeOnly, setDowryFreeOnly] = useState(false);
  const [maxAge, setMaxAge] = useState(38);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCommunity('All');
    setSelectedGender('All');
    setSelectedDistrict('All');
    setSelectedMaritalStatus('All');
    setWaliOnly(false);
    setDowryFreeOnly(false);
    setMaxAge(38);
  };

  const filteredProfiles = useMemo(() => {
    return PROFILES.filter((profile) => {
      // Tab filter
      if (activeTab === 'shortlist' && !shortlistedIds.includes(profile.id)) {
        return false;
      }

      // Keyword query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          profile.name.toLowerCase().includes(q) ||
          profile.profession.toLowerCase().includes(q) ||
          profile.education.toLowerCase().includes(q) ||
          profile.city.toLowerCase().includes(q) ||
          profile.id.toLowerCase().includes(q) ||
          profile.familyRoots.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Community
      if (selectedCommunity !== 'All' && profile.community !== selectedCommunity) {
        return false;
      }

      // Gender
      if (selectedGender !== 'All' && profile.gender !== selectedGender) {
        return false;
      }

      // District
      if (selectedDistrict !== 'All' && !profile.district.includes(selectedDistrict)) {
        return false;
      }

      // Marital Status
      if (selectedMaritalStatus !== 'All' && profile.maritalStatus !== selectedMaritalStatus) {
        return false;
      }

      // Age
      if (profile.age > maxAge) {
        return false;
      }

      // Wali
      if (waliOnly && !profile.verified) {
        return false;
      }

      // Zero dowry
      if (dowryFreeOnly && !profile.zeroDowryPledge) {
        return false;
      }

      return true;
    });
  }, [
    activeTab, 
    shortlistedIds, 
    searchQuery, 
    selectedCommunity, 
    selectedGender, 
    selectedDistrict, 
    selectedMaritalStatus, 
    maxAge, 
    waliOnly, 
    dowryFreeOnly
  ]);

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    gsap.fromTo(
      '.find-partner-header',
      { opacity: 0, y: 20, force3D: true },
      { opacity: 1, y: 0, duration: 0.65, ease: EASINGS.editorial, delay: 0.08 }
    );

    gsap.fromTo(
      '.find-partner-sidebar',
      { opacity: 0, x: -16, force3D: true },
      { opacity: 1, x: 0, duration: 0.7, ease: EASINGS.editorial, delay: 0.12 }
    );

    gsap.fromTo(
      '.find-partner-card',
      { opacity: 0, y: 20, force3D: true },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: EASINGS.editorial, delay: 0.16 }
    );
  }, [selectedCommunity, selectedGender, selectedDistrict, activeTab]);

  return (
    <div ref={containerRef} className="w-full bg-[#f8fbed] min-h-screen py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="find-partner-header pb-8 border-b border-[#C8C5B4]/40 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
                <span>Verified Family Matrimonial Registry</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#11150D] font-medium tracking-tight">
                Curated Matrimonial Dossiers
              </h1>
              <p className="text-sm text-[#404946] max-w-2xl mt-1.5 leading-relaxed">
                Explore authentic biodatas across Sunni, Shia, and Bohra traditions. Every dossier includes verified guardian contacts and adheres to the Sunnah Simplicity Charter.
              </p>
            </div>

            {/* Tab switchers: All vs Shortlist */}
            <div className="flex items-center bg-[#E8E4D6] p-1 rounded-md border border-[#C8C5B4]">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 text-xs font-semibold rounded transition-all ${
                  activeTab === 'all' 
                    ? 'bg-[#0B4940] text-[#F7F4EA] shadow-sm' 
                    : 'text-[#404946] hover:text-[#11150D]'
                }`}
              >
                All Dossiers ({PROFILES.length})
              </button>
              <button 
                onClick={() => setActiveTab('shortlist')}
                className={`px-4 py-1.5 text-xs font-semibold rounded transition-all flex items-center gap-1.5 ${
                  activeTab === 'shortlist' 
                    ? 'bg-[#0B4940] text-[#F7F4EA] shadow-sm' 
                    : 'text-[#404946] hover:text-[#11150D]'
                }`}
              >
                <Heart size={13} className={shortlistedIds.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                <span>Shortlist ({shortlistedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Stream Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-6">
            {(['All', 'Sunni', 'Shia', 'Bohra'] as CommunityType[]).map((comm) => (
              <button
                key={comm}
                onClick={() => setSelectedCommunity(comm)}
                className={`text-xs px-3.5 py-1.5 rounded transition-all border ${
                  selectedCommunity === comm
                    ? 'bg-[#526333] text-[#F7F4EA] border-[#526333] font-semibold'
                    : 'bg-[#F7F4EA] text-[#404946] border-[#C8C5B4] hover:bg-[#E8E4D6]/70'
                }`}
              >
                {comm === 'All' ? 'All Traditions' : `${comm} Muslim`}
              </button>
            ))}

            <div className="h-6 w-px bg-[#C8C5B4] mx-1 hidden sm:block self-center"></div>

            {(['All', 'Female', 'Male'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`text-xs px-3.5 py-1.5 rounded transition-all border ${
                  selectedGender === gender
                    ? 'bg-[#0B4940] text-[#F7F4EA] border-[#0B4940] font-semibold'
                    : 'bg-[#F7F4EA] text-[#404946] border-[#C8C5B4] hover:bg-[#E8E4D6]/70'
                }`}
              >
                {gender === 'All' ? 'Both Genders' : gender === 'Female' ? 'Brides' : 'Grooms'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Filters + Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar */}
          <aside className="find-partner-sidebar lg:col-span-4 bg-[#E8E4D6]/50 border border-[#C8C5B4]/70 rounded-lg p-6 self-start space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#C8C5B4]/40">
              <h3 className="text-sm font-bold text-[#11150D] flex items-center gap-2">
                <Filter size={16} />
                <span>Search Refinements</span>
              </h3>
              <button 
                onClick={resetFilters}
                className="text-xs text-[#526333] hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold text-[#11150D] mb-1.5">
                Keyword or Profile ID
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-[#404946]" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Doctor, Engineer, Pune, FN-PUN..."
                  className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded pl-8 pr-3 py-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-[#404946] hover:text-[#11150D]"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Location / District */}
            <div>
              <label className="block text-xs font-semibold text-[#11150D] mb-1.5">
                District / Region
              </label>
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded px-3 py-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
              >
                <option value="All">All Maharashtra Districts</option>
                <option value="Pune">Pune &amp; PCMC</option>
                <option value="Aurangabad">Aurangabad (Chhatrapati Sambhajinagar)</option>
                <option value="Sangamner">Sangamner / Ahmednagar</option>
                <option value="Solapur">Solapur &amp; Western Maharashtra</option>
              </select>
            </div>

            {/* Max Age Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#11150D] mb-1.5">
                <span>Maximum Age</span>
                <span className="text-[#526333]">{maxAge} Years</span>
              </div>
              <input 
                type="range"
                min={21}
                max={45}
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="w-full accent-[#0B4940] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#404946] mt-1">
                <span>21 yrs</span>
                <span>35 yrs</span>
                <span>45 yrs</span>
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-xs font-semibold text-[#11150D] mb-1.5">
                Marital Status
              </label>
              <select 
                value={selectedMaritalStatus}
                onChange={(e) => setSelectedMaritalStatus(e.target.value)}
                className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded px-3 py-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
              >
                <option value="All">All Marital Statuses</option>
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* Toggles */}
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
                  <span className="block text-[11px] text-[#404946]">Direct parental / guardian consent checked.</span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={dowryFreeOnly}
                  onChange={(e) => setDowryFreeOnly(e.target.checked)}
                  className="mt-0.5 rounded text-[#0B4940] focus:ring-0 border-[#C8C5B4]"
                />
                <span className="text-xs text-[#191d14]">
                  <strong>Strict Zero-Dowry Pledge</strong>
                  <span className="block text-[11px] text-[#404946]">Signed agreement to forgo dowry and hall ostentation.</span>
                </span>
              </label>
            </div>

            {/* Direct Consultation Box */}
            <div className="p-4 bg-[#F7F4EA] border border-[#C8C5B4] rounded text-xs space-y-2">
              <div className="font-semibold text-[#11150D]">Need Personalized Matching?</div>
              <p className="text-[#404946] text-[11px]">
                Speak directly with senior mediator Intekhab Farash or Parveen Farash for confidential matchmaking.
              </p>
              <button 
                onClick={() => onOpenCounselor()}
                className="w-full bg-[#0B4940] text-[#F7F4EA] py-2 rounded text-xs font-semibold hover:bg-[#14584C] transition-colors"
              >
                Speak to Bureau Counselor
              </button>
            </div>
          </aside>

          {/* Right Column: Profile Cards Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4 text-xs text-[#404946]">
              <span>
                Displaying <strong>{filteredProfiles.length}</strong> matching verified dossiers
              </span>
              <span>
                Consulate verification active
              </span>
            </div>

            {filteredProfiles.length === 0 ? (
              <div className="bg-[#E8E4D6]/40 border border-[#C8C5B4] rounded-lg p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#C8C5B4]/50 flex items-center justify-center mx-auto text-[#404946]">
                  <Search size={22} />
                </div>
                <h3 className="font-serif text-xl text-[#11150D]">
                  No Dossiers Match Current Criteria
                </h3>
                <p className="text-xs text-[#404946] max-w-md mx-auto">
                  Try relaxing your age or district filters, or reset the criteria to browse all available biodatas.
                </p>
                <button 
                  onClick={resetFilters}
                  className="bg-[#0B4940] text-[#F7F4EA] px-4 py-2 rounded text-xs font-semibold hover:bg-[#14584C]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProfiles.map((p) => {
                  const isShortlisted = shortlistedIds.includes(p.id);
                  return (
                    <div 
                      key={p.id}
                      className="find-partner-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_32px_-8px_rgba(17,21,13,0.09)] transition-all group"
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
                              className="text-[#404946] hover:text-rose-600 transition-colors p-1"
                              title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                            >
                              <Heart size={16} className={isShortlisted ? 'fill-rose-600 text-rose-600' : ''} />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
