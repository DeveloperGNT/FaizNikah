import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  HelpCircle,
  ArrowRight,
  Building
} from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onOpenCounselor: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenCounselor }) => {
  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.pricing-header',
      { opacity: 0, y: 22, force3D: true },
      { opacity: 1, y: 0, duration: 0.75, ease: EASINGS.editorial, delay: 0.08 }
    );

    // Cards reveal
    gsap.fromTo(
      '.pricing-main-card',
      { opacity: 0, y: 28, scale: 0.98, force3D: true },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: EASINGS.cinematic, delay: 0.18 }
    );

    gsap.fromTo(
      '.pricing-contrast-card',
      { opacity: 0, y: 28, force3D: true },
      { opacity: 1, y: 0, duration: 0.8, ease: EASINGS.editorial, delay: 0.28 }
    );

    // FAQs on scroll
    gsap.fromTo(
      '.pricing-faq-item',
      { opacity: 0, y: 22, force3D: true },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#pricing-faq-section',
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
        
        {/* Header */}
        <div className="pricing-header max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>Non-Profit Philanthropic Subsidy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11150D] font-medium tracking-tight">
            Sacred Matrimonial Covenant
          </h1>
          <p className="text-sm sm:text-base text-[#404946] mt-3 leading-relaxed">
            No tiered paywalls, no hidden unlock charges, and zero commissions upon Nikah. A single honest contribution supporting charitable community initiatives.
          </p>
        </div>

        {/* Pricing Comparison Card */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Main FaizNikah Plan */}
          <div className="pricing-main-card md:col-span-7 bg-[#E8E4D6]/70 border-2 border-[#0B4940] rounded-xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#0B4940] text-[#F7F4EA] text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-bl-lg">
              Official Foundation Rate
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-1">
                Universal Family Membership
              </span>
              <h2 className="font-serif text-3xl text-[#11150D] font-medium">
                Faiz Matrimonial Access
              </h2>
              <div className="mt-4 mb-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#0B4940]">
                  ₹1,999/-
                </span>
                <span className="text-xs font-semibold text-[#526333]">
                  Full 18 Months Complete Validity
                </span>
              </div>
              <p className="text-xs text-[#404946] mb-8 leading-relaxed">
                Covers registration, document review, telephonic Wali verification, unrestricted access to 2,000+ dossiers, and counselor consultation across all bureaus.
              </p>

              {/* Inclusions */}
              <div className="space-y-3 text-xs sm:text-sm text-[#191d14] mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#0B4940] flex-shrink-0" />
                  <span>Unlimited access to Sunni, Shia &amp; Bohra dossiers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#0B4940] flex-shrink-0" />
                  <span>Direct verified Wali / Guardian telephone contacts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#0B4940] flex-shrink-0" />
                  <span>In-person family consultation at Pune, Aurangabad, Solapur</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#0B4940] flex-shrink-0" />
                  <span>Subsidizes Primary School, Sartaj Library &amp; Roti Bank</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#0B4940] flex-shrink-0" />
                  <span>Zero commission or broker cut upon marriage</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('create-profile')}
              className="w-full bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] font-semibold text-xs py-3.5 rounded transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>Enroll Family for 18 Months Access</span>
            </button>
          </div>

          {/* Contrast Against Commercial Sites */}
          <div className="pricing-contrast-card md:col-span-5 bg-[#E8E4D6]/30 border border-[#C8C5B4] rounded-xl p-8 flex flex-col justify-between text-xs">
            <div>
              <h3 className="font-serif text-xl text-[#11150D] font-medium mb-2">
                Commercial Brokers &amp; Apps
              </h3>
              <p className="text-[#404946] mb-6 leading-relaxed">
                Why thousands of families turn away from corporate matrimonial portals and exploitative matchmakers:
              </p>

              <div className="space-y-4 text-[#404946]">
                <div className="flex items-start gap-2.5">
                  <XCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Expensive recurring packages (₹15,000 - ₹50,000+).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <XCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Demanding a percentage of dowry or Nikah settlement.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <XCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Unverified dating-style chat without parental knowledge.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <XCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Fake profiles and paywalled contact unlocks.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C8C5B4]/50 text-center">
              <span className="text-[11px] text-[#526333] font-semibold block mb-2">
                Need Financial Assistance?
              </span>
              <p className="text-[11px] text-[#404946] mb-3">
                For destitute families and orphan candidates, membership is completely sponsored by the Foundation.
              </p>
              <button 
                onClick={onOpenCounselor}
                className="text-xs font-semibold text-[#0B4940] hover:underline"
              >
                Apply for Foundation Sponsorship →
              </button>
            </div>
          </div>
        </div>

        {/* FAQs on Fees */}
        <div id="pricing-faq-section" className="max-w-3xl mx-auto space-y-6">
          <h3 className="font-serif text-2xl text-[#11150D] text-center font-medium">
            Frequently Asked Questions Regarding Membership
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="pricing-faq-item bg-[#E8E4D6]/40 border border-[#C8C5B4]/60 p-5 rounded-lg">
              <h4 className="font-semibold text-[#11150D] mb-1.5">
                Why does the Foundation charge ₹1,999/-?
              </h4>
              <p className="text-[#404946] leading-relaxed">
                As a registered philanthropic trust, this fee sustains staff verification calls, regional bureau maintenance, and directly subsidizes the Haji Mehmed Isaac Farash Foundation's community school, Sartaj library, and weekly roti bank food drives.
              </p>
            </div>

            <div className="pricing-faq-item bg-[#E8E4D6]/40 border border-[#C8C5B4]/60 p-5 rounded-lg">
              <h4 className="font-semibold text-[#11150D] mb-1.5">
                Are there any post-Nikah charges or gifts requested?
              </h4>
              <p className="text-[#404946] leading-relaxed">
                None whatsoever. We never charge commission, percentage fees, or brokerage upon the successful solemnization of a marriage. Our counselors pray for your barakah and ask only for your duas.
              </p>
            </div>

            <div className="pricing-faq-item bg-[#E8E4D6]/40 border border-[#C8C5B4]/60 p-5 rounded-lg">
              <h4 className="font-semibold text-[#11150D] mb-1.5">
                Can I visit the Pune office to pay in cash?
              </h4>
              <p className="text-[#404946] leading-relaxed">
                Yes. Families are welcome to visit our Pune Head Office (Kondhwa Khurd) or regional bureaus in Aurangabad, Sangamner, and Solapur to register and receive an official printed receipt.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
