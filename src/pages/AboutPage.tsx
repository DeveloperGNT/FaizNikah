import React from 'react';
import { 
  Building, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  CheckCircle, 
  Users, 
  Award, 
  ArrowRight,
  Handshake
} from 'lucide-react';
import { FOUNDATION_CHARTER, FOUNDATION_STATS, TEAM_MEMBERS } from '../data/faizNikahData';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenCounselor: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenCounselor }) => {
  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.about-header',
      { opacity: 0, y: 22, force3D: true },
      { opacity: 1, y: 0, duration: 0.75, ease: EASINGS.editorial, delay: 0.1 }
    );

    // Heritage story section
    gsap.fromTo(
      '.about-story-text',
      { opacity: 0, y: 28, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#about-heritage',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    gsap.fromTo(
      '.about-story-media',
      { opacity: 0, scale: 0.96, force3D: true },
      {
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#about-heritage',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    // Philanthropic initiative cards
    gsap.fromTo(
      '.about-initiative-card',
      { opacity: 0, y: 28, force3D: true },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#about-initiatives-grid',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    // Covenant charter callout
    gsap.fromTo(
      '#about-charter',
      { opacity: 0, y: 26, scale: 0.98, force3D: true },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: EASINGS.cinematic,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#about-charter',
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
        
        {/* Editorial Header */}
        <div className="about-header max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-4 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>Established 2011 • Reg. Maharashtra Philanthropic Trust</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11150D] font-medium tracking-tight">
            The Haji Mehmed Isaac Farash Foundation
          </h1>
          <p className="text-base sm:text-lg text-[#404946] mt-4 leading-relaxed font-light">
            Founded with an enduring mission: to restore faith, modesty, and family honor to Islamic matchmaking, while actively uplifting underprivileged communities through education, nourishment, and moral empowerment.
          </p>
        </div>

        {/* Story Section: Asymmetric Layout */}
        <div id="about-heritage" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="about-story-text lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block">
              Our 13-Year Heritage
            </span>
            <h2 className="font-serif text-3xl text-[#11150D] font-medium leading-tight">
              A Noble Stand Against Matrimonial Commercialism
            </h2>
            <div className="text-xs sm:text-sm text-[#404946] leading-relaxed space-y-4 font-light">
              <p>
                In 2011, community elders and social servants observed a troubling shift in matrimonial practices: exorbitant broker commissions, transactional dating algorithms, and the crippling burden of dowry (Dahej) placed on middle-class and working families.
              </p>
              <p>
                Under the visionary leadership of Haji Mehmed Isaac Farash and senior mediators Intekhab Farash and Parveen Farash, Faiz Marriage Bureau was established in Kondhwa, Pune. From day one, it was instituted not as a business venture, but as a consecrated public service.
              </p>
              <p>
                Every union facilitated by FaizNikah is grounded in verified Wali guardian consent, direct parental liaison, and a firm commitment to the Sunnah of simplicity. Today, with over 5,600 blessed marriages, our network spans four physical bureaus across Maharashtra.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button 
                onClick={onOpenCounselor}
                className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] px-6 py-3 rounded text-xs font-semibold transition-colors shadow"
              >
                Consult Bureau Elders
              </button>
              <button 
                onClick={() => onNavigate('team')}
                className="text-xs font-semibold text-[#0B4940] hover:underline"
              >
                Meet Counselor Council →
              </button>
            </div>
          </div>

          <div className="about-story-media lg:col-span-6 relative">
            <div className="bg-[#E8E4D6] border border-[#C8C5B4] p-3 rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
                alt="Faiz Marriage Bureau Community Mediation Council" 
                className="w-full h-80 sm:h-96 object-cover rounded"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#F7F4EA] border border-[#C8C5B4] p-4 rounded-lg shadow-lg max-w-xs">
              <div className="font-serif text-2xl font-bold text-[#0B4940]">13+ Years</div>
              <p className="text-xs text-[#404946] mt-0.5">
                Continuous community service with physical bureaus in Pune, Aurangabad, Sangamner &amp; Solapur.
              </p>
            </div>
          </div>
        </div>

        {/* Foundation Pillars: School, Library, Roti Bank */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-2">
              Beyond Matrimony
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#11150D] font-medium">
              Philanthropic Arms of the Foundation
            </h2>
            <p className="text-xs sm:text-sm text-[#404946] mt-2">
              Your registration fee directly subsidizes charitable initiatives serving underprivileged children and families.
            </p>
          </div>

          <div id="about-initiatives-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FOUNDATION_CHARTER.initiatives.map((init, idx) => (
              <div 
                key={idx}
                className="about-initiative-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-xl p-6 flex flex-col justify-between hover:border-[#0B4940]/40 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#0B4940]/10 border border-[#0B4940]/20 flex items-center justify-center mb-5 text-[#0B4940]">
                    {idx === 0 ? <Building size={22} /> : idx === 1 ? <BookOpen size={22} /> : <Heart size={22} />}
                  </div>
                  <h3 className="font-serif text-xl text-[#11150D] font-medium mb-3">
                    {init.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404946] leading-relaxed mb-6 font-light">
                    {init.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#C8C5B4]/40 text-xs font-semibold text-[#526333]">
                  Active Philanthropic Branch
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sacred Pledge & Charter Section */}
        <div id="about-charter" className="bg-[#11150D] text-[#C8C5B4] rounded-xl p-8 sm:p-12 mb-16 border border-[#B3A16A]/20 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B3A16A] font-semibold">
              Sacred Covenant
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F4EA] font-medium">
              The Sunnah Simplicity Charter
            </h3>
            <blockquote className="font-serif text-lg sm:text-xl text-[#F7F4EA]/90 italic leading-relaxed pt-2">
              "We believe that a blessed home is built upon mutual taqwa, modesty, and honor. We refuse to participate in the commercialization of our daughters and sons. Every marriage solemnized under our banner stands as a testimony that dignity does not require extravagance."
            </blockquote>
            <div className="pt-4 text-xs text-[#B3A16A]">
              — Haji Mehmed Isaac Farash Foundation Charter, Clause IV
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
