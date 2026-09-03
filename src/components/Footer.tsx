import React from 'react';
import { MapPin, Phone, Mail, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { CommunityType } from '../types';

interface FooterProps {
  onNavigate: (page: string, params?: { community?: CommunityType; policyTab?: 'privacy' | 'terms' | 'refund' }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#11150D] text-[#C8C5B4] border-t border-[#B3A16A]/20 pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* Top Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Foundation Overview & Philosophy */}
          <div className="lg:col-span-4 pr-0 lg:pr-6 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-lg border border-[#B3A16A]/50 overflow-hidden bg-[#F7F4EA] flex items-center justify-center p-0.5 shadow-sm group-hover:border-[#B3A16A] transition-colors">
                <img 
                  src="/logo.png" 
                  alt="FaizNikah Emblem" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif text-2xl text-[#B3A16A] tracking-tight font-medium">
                FaizNikah
              </span>
            </div>
            <p className="text-sm text-[#C8C5B4]/80 leading-relaxed font-light">
              FaizNikah is a certified matrimonial sanctuary under the registered Haji Mehmed Isaac Farash Foundation, Pune. Continuously serving families across Maharashtra for over 13 years with a verified Marriage Bureau, Primary School, Sartaj Library, and Roti Bank.
            </p>
            <div className="text-xs text-[#C8C5B4]/60 pt-1 border-t border-[#C8C5B4]/10">
              Dedicated to connecting over 5,600+ blessed unions with dignity, Islamic principles, and strict absence of dowry obligations.
            </div>
          </div>

          {/* Column 2: Sacred Charters & Pages */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-[#F7F4EA] tracking-wide font-medium">
              Sacred Charters
            </h4>
            <ul className="space-y-2 text-sm text-[#C8C5B4]/80">
              <li>
                <button 
                  onClick={() => onNavigate('policy', { policyTab: 'terms' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Sacred Matrimonial Charter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('policy', { policyTab: 'privacy' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Wali Verification Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('policy', { policyTab: 'privacy' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Confidentiality &amp; Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Regional Consulates &amp; Bureaus
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blogs')} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Islamic Guidance &amp; Insights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('policy', { policyTab: 'terms' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Terms of Covenant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('policy', { policyTab: 'refund' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Refund &amp; Cancellation Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Profile Directories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg text-[#F7F4EA] tracking-wide font-medium">
              Directories
            </h4>
            <ul className="space-y-2 text-sm text-[#C8C5B4]/80">
              <li>
                <button 
                  onClick={() => onNavigate('find-partner', { community: 'Sunni' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Sunni Muslim (1,400+)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('find-partner', { community: 'Shia' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Shia Muslim (Verified)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('find-partner', { community: 'Bohra' })} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Dawoodi Bohra
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('success-stories')} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Success Reflections
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')} 
                  className="hover:text-[#F7F4EA] transition-colors text-left"
                >
                  Pricing &amp; Access (₹1,999)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('team')} 
                  className="hover:text-[#F7F4EA] transition-colors text-left font-medium text-[#B3A16A]"
                >
                  Meet Our Team (36 Members)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Direct Assistance */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-[#F7F4EA] tracking-wide font-medium">
              Direct Assistance
            </h4>
            <div className="space-y-2.5 text-sm text-[#C8C5B4]/80">
              <p className="flex items-start gap-2.5">
                <MapPin size={17} className="text-[#B3A16A] flex-shrink-0 mt-0.5" />
                <span>Near Welcome Hall, Kondhwa Khurd, Pune, Maharashtra 411048.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={17} className="text-[#B3A16A] flex-shrink-0" />
                <a href="tel:9503801999" className="hover:text-[#B3A16A] transition-colors">
                  +91 9503801999
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={17} className="text-[#B3A16A] flex-shrink-0" />
                <a href="mailto:info@faiznikah.com" className="hover:text-[#B3A16A] transition-colors">
                  info@faiznikah.com
                </a>
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/919503801999" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs bg-[#526333]/30 border border-[#526333]/50 text-[#F7F4EA] px-3 py-1.5 rounded hover:bg-[#526333]/50 transition-colors"
                >
                  <span>Chat on WhatsApp (+91 9503801999)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Separator & Copyright */}
        <div className="pt-8 border-t border-[#B3A16A]/20 flex flex-col md:flex-row justify-between items-center text-xs text-[#C8C5B4]/70 gap-4">
          <div>
            © 2025 FaizNikah Matrimonial Platform. Dedicated to sacred unions and family integrity. Pune • Aurangabad • Sangamner • Solapur.
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <span className="text-[#C8C5B4]/50">In association with Haji Mehmed Isaac Farash Foundation</span>
            <a 
              href="https://faiznikah.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#B3A16A] hover:underline flex items-center gap-1 font-medium"
            >
              <span>www.faiznikah.com</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
