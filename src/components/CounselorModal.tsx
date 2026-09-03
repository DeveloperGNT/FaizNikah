import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Calendar,
  Send,
  Building
} from 'lucide-react';
import { OFFICES } from '../data/faizNikahData';

interface CounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProfileId?: string;
}

export const CounselorModal: React.FC<CounselorModalProps> = ({
  isOpen,
  onClose,
  defaultProfileId,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Pune',
    relation: 'Parent / Wali',
    preferredOffice: 'pune-hq',
    candidateId: defaultProfileId || '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11150D]/65 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg shadow-[0_20px_50px_rgba(17,21,13,0.25)] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#E8E4D6] px-6 py-4 border-b border-[#C8C5B4] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl text-[#11150D] font-medium">
              Consult with a FaizNikah Family Counselor
            </h3>
            <p className="text-xs text-[#526333] font-medium mt-0.5">
              Confidential, Non-Commercial Guidance under Haji Mehmed Isaac Farash Foundation
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#404946] hover:text-[#11150D] hover:bg-[#C8C5B4]/40 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Direct Actions Bar */}
        <div className="bg-[#11150D] text-[#C8C5B4] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Head Office Hotline Active:</span>
            <a href="tel:9503801999" className="text-white font-bold hover:underline">
              +91 9503801999
            </a>
          </div>
          <a 
            href="https://wa.me/919503801999?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20consult%20regarding%20FaizNikah%20matrimonial%20matchmaking."
            target="_blank"
            rel="noreferrer"
            className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] px-3.5 py-1.5 rounded flex items-center gap-1.5 font-semibold text-xs border border-emerald-600 transition-colors"
          >
            <MessageSquare size={14} />
            <span>Direct WhatsApp</span>
          </a>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={28} />
              </div>
              <h4 className="font-serif text-2xl text-[#11150D]">
                Consultation Request Received
              </h4>
              <p className="text-sm text-[#404946] max-w-md mx-auto">
                Our senior counselor (Intekhab Farash or Parveen Farash) will contact you discreetly within 24 hours at the provided number.
              </p>
              <div className="pt-2 text-xs text-[#526333] font-semibold">
                May Allah (SWT) bring barakah to your family's search.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#11150D] mb-1">
                    Your Full Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Abdul Rahman / Fatima Begum"
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-sm text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#11150D] mb-1">
                    Contact Phone Number (WhatsApp preferred) *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-sm text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#11150D] mb-1">
                    Your Role / Relation
                  </label>
                  <select 
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-sm text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                  >
                    <option>Father / Wali Guardian</option>
                    <option>Mother / Family Elder</option>
                    <option>Self (Prospective Groom)</option>
                    <option>Self (Prospective Bride)</option>
                    <option>Sibling / Relative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#11150D] mb-1">
                    Nearest Bureau Office
                  </label>
                  <select 
                    value={formData.preferredOffice}
                    onChange={(e) => setFormData({ ...formData, preferredOffice: e.target.value })}
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-sm text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                  >
                    {OFFICES.map((off) => (
                      <option key={off.id} value={off.id}>
                        {off.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-1">
                  Referenced Dossier ID (Optional)
                </label>
                <input 
                  type="text" 
                  value={formData.candidateId}
                  onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                  placeholder="e.g. FN-PUN-8402 (if inquiring about specific candidate)"
                  className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-sm text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-1">
                  Notes for Counselors (Matrimonial Preferences / Consultation Topic)
                </label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding family background, maslak preference, or if you prefer an in-person meeting at our office..."
                  className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-sm text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#404946]">
                  100% Confidential • Zero Spam
                </span>
                <button 
                  type="submit"
                  className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] font-semibold text-xs px-6 py-2.5 rounded transition-all shadow flex items-center gap-1.5"
                >
                  <Send size={14} />
                  <span>Request Callback</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
