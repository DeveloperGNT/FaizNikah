import React, { useState } from 'react';
import { 
  Heart, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  X,
  ShieldCheck, 
  Quote
} from 'lucide-react';
import { SUCCESS_STORIES } from '../data/faizNikahData';
import { SuccessStory } from '../types';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface SuccessStoriesPageProps {
  onNavigate: (page: string) => void;
  onOpenCounselor: () => void;
}

export const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ onNavigate, onOpenCounselor }) => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.stories-header',
      { opacity: 0, y: 22, force3D: true },
      { opacity: 1, y: 0, duration: 0.75, ease: EASINGS.editorial, delay: 0.08 }
    );

    // Stories cards reveal
    gsap.fromTo(
      '.story-card',
      { opacity: 0, y: 30, force3D: true },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#stories-grid',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    // Bottom CTA
    gsap.fromTo(
      '#stories-cta',
      { opacity: 0, y: 26, scale: 0.98, force3D: true },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: EASINGS.cinematic,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#stories-cta',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#f8fbed] min-h-screen py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="stories-header max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>5,600+ Sacred Unions Solemnized</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11150D] font-medium tracking-tight">
            Blessed Unions &amp; Sunnah Reflections
          </h1>
          <p className="text-sm sm:text-base text-[#404946] mt-3 leading-relaxed">
            Real families, real blessings. Discover how couples across Maharashtra celebrated their Nikah with dignity, zero dowry, and profound mutual peace.
          </p>
        </div>

        {/* Stories Grid */}
        <div id="stories-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SUCCESS_STORIES.map((story) => (
            <div 
              key={story.id}
              className="story-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-xl overflow-hidden shadow-[0_12px_36px_-8px_rgba(17,21,13,0.06)] hover:border-[#0B4940]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-64 sm:h-72 overflow-hidden relative bg-[#C8C5B4]">
                  <img 
                    src={story.imageUrl} 
                    alt={story.coupleNames} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11150D]/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-5 right-5 text-[#F7F4EA]">
                    <div className="text-[11px] uppercase font-semibold text-[#B3A16A] tracking-wider mb-0.5">
                      {story.community} • Solemnized {story.year}
                    </div>
                    <h3 className="font-serif text-2xl text-[#F7F4EA] font-medium">
                      {story.coupleNames}
                    </h3>
                    <div className="text-xs text-[#C8C5B4] flex items-center gap-1.5 mt-1">
                      <MapPin size={13} className="text-[#B3A16A]" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="text-xs bg-[#526333]/10 text-[#526333] px-3 py-1.5 rounded inline-block font-semibold">
                    {story.nikahHighlight}
                  </div>

                  <blockquote className="font-serif text-base text-[#11150D] italic leading-relaxed">
                    {story.quote}
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#404946] line-clamp-3 leading-relaxed font-light">
                    {story.fullStory}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button 
                  onClick={() => setSelectedStory(story)}
                  className="w-full bg-[#F7F4EA] border border-[#0B4940]/30 hover:bg-[#0B4940] hover:text-[#F7F4EA] text-[#0B4940] py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Read Complete Family Journey</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div id="stories-cta" className="bg-[#11150D] text-[#C8C5B4] rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 border border-[#B3A16A]/20 shadow-2xl">
          <Quote size={32} className="mx-auto text-[#B3A16A] opacity-60" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F4EA] font-medium">
            Begin Your Sacred Matrimonial Journey
          </h3>
          <p className="text-xs sm:text-sm text-[#C8C5B4]/80 max-w-lg mx-auto leading-relaxed">
            Join thousands of respected families who chose the path of Sunnah simplicity, guardian transparency, and mutual honor.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('create-profile')}
              className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] text-xs font-semibold px-6 py-3 rounded border border-emerald-600 transition-colors shadow"
            >
              Register Matrimonial Biodata
            </button>
            <button 
              onClick={onOpenCounselor}
              className="bg-transparent border border-[#C8C5B4] text-[#F7F4EA] text-xs font-semibold px-6 py-3 rounded hover:bg-[#C8C5B4]/10 transition-colors"
            >
              Speak to Family Counselor
            </button>
          </div>
        </div>
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11150D]/65 backdrop-blur-sm">
          <div className="bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-1.5 text-[#404946] hover:text-[#11150D] hover:bg-[#E8E4D6] rounded-full"
            >
              <X size={20} />
            </button>

            <div className="space-y-4">
              <div className="text-xs text-[#526333] uppercase tracking-wider font-semibold">
                Solemnized Union Reflection • {selectedStory.year}
              </div>
              <h2 className="font-serif text-3xl text-[#11150D] font-medium">
                {selectedStory.coupleNames}
              </h2>
              <div className="text-xs text-[#404946] flex items-center gap-1.5 pb-2 border-b border-[#C8C5B4]/40">
                <MapPin size={14} className="text-[#B3A16A]" />
                <span>{selectedStory.location}</span>
                <span>•</span>
                <span className="font-semibold text-[#0B4940]">{selectedStory.community}</span>
              </div>

              <div className="w-full h-56 rounded bg-[#E8E4D6] overflow-hidden">
                <img 
                  src={selectedStory.imageUrl} 
                  alt={selectedStory.coupleNames} 
                  className="w-full h-full object-cover"
                />
              </div>

              <blockquote className="font-serif text-lg text-[#0B4940] italic bg-[#E8E4D6]/50 p-4 rounded border-l-4 border-[#526333]">
                {selectedStory.quote}
              </blockquote>

              <div className="text-xs sm:text-sm text-[#404946] leading-relaxed space-y-3 font-light">
                <p>{selectedStory.fullStory}</p>
                <p>
                  "Faiz Marriage Bureau's counselors ensured that neither family felt burdened by financial posturing. We sealed our covenant with pure hearts, knowing our Nikah is blessed by the Sunnah of our beloved Prophet ﷺ."
                </p>
              </div>

              <div className="pt-4 border-t border-[#C8C5B4]/50 flex justify-between items-center text-xs">
                <div className="text-[#526333] font-semibold flex items-center gap-1">
                  <ShieldCheck size={16} />
                  <span>Verified Alumni of FaizNikah</span>
                </div>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="bg-[#0B4940] text-[#F7F4EA] px-4 py-2 rounded font-semibold hover:bg-[#14584C]"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
