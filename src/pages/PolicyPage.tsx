import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  HeartHandshake, 
  HelpCircle 
} from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface PolicyPageProps {
  initialTab?: 'privacy' | 'terms' | 'refund';
  onNavigate: (page: string) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund'>(initialTab);

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.policy-header',
      { opacity: 0, y: 20, force3D: true },
      { opacity: 1, y: 0, duration: 0.7, ease: EASINGS.editorial, delay: 0.08 }
    );

    // Tabs reveal
    gsap.fromTo(
      '.policy-tabs',
      { opacity: 0, y: 15, force3D: true },
      { opacity: 1, y: 0, duration: 0.65, ease: EASINGS.editorial, delay: 0.15 }
    );

    // Content box reveal
    gsap.fromTo(
      '#policy-content',
      { opacity: 0, y: 18, force3D: true },
      { opacity: 1, y: 0, duration: 0.6, ease: EASINGS.editorial, delay: 0.2 }
    );
  }, [activeTab]);

  return (
    <div ref={containerRef} className="w-full bg-[#f8fbed] min-h-screen py-10">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="policy-header text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>Governance &amp; Trust Charter</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#11150D] font-medium tracking-tight">
            Policies &amp; Sacred Covenant
          </h1>
          <p className="text-xs sm:text-sm text-[#404946] mt-2">
            Haji Mehmed Isaac Farash Foundation operates under strict moral, Sharia, and privacy guidelines.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="policy-tabs flex justify-center border-b border-[#C8C5B4]/50 mb-10">
          <div className="flex gap-2 sm:gap-6">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'privacy'
                  ? 'border-[#0B4940] text-[#0B4940]'
                  : 'border-transparent text-[#404946] hover:text-[#11150D]'
              }`}
            >
              <Lock size={15} />
              <span>Privacy &amp; Data Modesty Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'terms'
                  ? 'border-[#0B4940] text-[#0B4940]'
                  : 'border-transparent text-[#404946] hover:text-[#11150D]'
              }`}
            >
              <FileText size={15} />
              <span>Terms of Covenant &amp; Code of Conduct</span>
            </button>

            <button
              onClick={() => setActiveTab('refund')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'refund'
                  ? 'border-[#0B4940] text-[#0B4940]'
                  : 'border-transparent text-[#404946] hover:text-[#11150D]'
              }`}
            >
              <HeartHandshake size={15} />
              <span>Philanthropic Subsidy &amp; Refunds</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div id="policy-content" className="bg-[#E8E4D6]/50 border border-[#C8C5B4] rounded-xl p-8 sm:p-12 shadow-sm text-xs sm:text-sm text-[#191d14] leading-relaxed space-y-6">
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#11150D] font-medium mb-2">
                  Privacy &amp; Data Modesty Safeguards
                </h3>
                <p className="text-[#404946]">
                  Last reviewed: January 2025 • Haji Mehmed Isaac Farash Foundation, Pune.
                </p>
              </div>

              <div className="space-y-4 font-light text-[#404946]">
                <p>
                  <strong>1. Guardian Ownership of Information:</strong> All matrimonial biodata, contact records, and educational credentials submitted to FaizNikah are treated as confidential family trusts. We never sell, monetize, or disclose candidate details to external marketing agencies or ad networks.
                </p>
                <p>
                  <strong>2. Photo Privacy Controls:</strong> For bride candidates who select "Guardian Consent Required" (On Request), photographs remain blurred until their registered Wali reviews and explicitly consents to the inquiring family's profile.
                </p>
                <p>
                  <strong>3. Restricted Access:</strong> Contact details (phone numbers and residential addresses) are never exposed to anonymous guests. They are accessible solely to verified members whose accounts have passed counselor review.
                </p>
                <p>
                  <strong>4. Right to Deletion / Archival:</strong> Upon solemnization of marriage or at the request of the family, a biodata dossier is permanently deactivated and archived from public view within 24 hours.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#11150D] font-medium mb-2">
                  Terms of Sacred Covenant &amp; Code of Conduct
                </h3>
                <p className="text-[#404946]">
                  Governing principles for all participating families, guardians, and candidates.
                </p>
              </div>

              <div className="space-y-4 font-light text-[#404946]">
                <p>
                  <strong>1. Honesty of Representation:</strong> Candidates and Walis affirm that all statements regarding age, marital status, education, occupation, and religious tradition are accurate and truthful. Any deliberate falsification results in immediate dossier termination.
                </p>
                <p>
                  <strong>2. Prohibition of Commercial Dowry (Dahej):</strong> FaizNikah explicitly condemns unwholesome demands for dowry, high cash settlements, luxury vehicles, or onerous financial obligations levied upon the bride's household. Families found demanding dowry will be removed from our registry.
                </p>
                <p>
                  <strong>3. Respectful Communication:</strong> All phone calls, WhatsApp messages, and meetings facilitated by bureau counselors must maintain the highest standards of Islamic adab and courtesy.
                </p>
                <p>
                  <strong>4. Solely Matrimonial Purpose:</strong> This platform is strictly dedicated to sacred Nikah. Casual dating, friendship solicitation, or non-matrimonial interactions are strictly prohibited.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#11150D] font-medium mb-2">
                  Philanthropic Subsidy &amp; Membership Guidelines
                </h3>
                <p className="text-[#404946]">
                  Transparency regarding registration fees and foundation contributions.
                </p>
              </div>

              <div className="space-y-4 font-light text-[#404946]">
                <p>
                  <strong>1. Non-Profit Allocation:</strong> The ₹1,999/- fee covers 18 months of continuous bureau verification, phone support, and administrative maintenance. A substantial portion directly supports the Foundation's Primary School, Sartaj Library, and weekly Roti Bank food distribution.
                </p>
                <p>
                  <strong>2. 7-Day Inactivation Grace Period:</strong> If a family requests dossier cancellation prior to verification calls taking place, a full refund can be issued upon written notice to our Pune Central Bureau.
                </p>
                <p>
                  <strong>3. Compassionate Fee Waiver:</strong> Deserving families experiencing financial hardship, as well as orphan candidates, are exempt from registration fees under our Philanthropic Charter.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
