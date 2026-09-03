import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Building, 
  CheckCircle, 
  Send,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { OFFICES } from '../data/faizNikahData';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onOpenCounselor: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenCounselor }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    office: 'Pune Central Bureau',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactData({
        name: '',
        phone: '',
        email: '',
        office: 'Pune Central Bureau',
        message: '',
      });
    }, 3000);
  };

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.contact-header',
      { opacity: 0, y: 22, force3D: true },
      { opacity: 1, y: 0, duration: 0.75, ease: EASINGS.editorial, delay: 0.08 }
    );

    // Hotline banner reveal
    gsap.fromTo(
      '#contact-hotline',
      { opacity: 0, y: 24, scale: 0.99, force3D: true },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: EASINGS.cinematic, delay: 0.16 }
    );

    // Offices cards scroll reveal
    gsap.fromTo(
      '.contact-office-card',
      { opacity: 0, y: 26, force3D: true },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#contact-offices-grid',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    // Form and info columns
    gsap.fromTo(
      '#contact-form-col',
      { opacity: 0, y: 28, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#contact-form-section',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    gsap.fromTo(
      '#contact-info-col',
      { opacity: 0, y: 28, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#contact-form-section',
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
        <div className="contact-header max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>Physical Bureau Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11150D] font-medium tracking-tight">
            Connect with Our Matrimonial Bureaus
          </h1>
          <p className="text-sm sm:text-base text-[#404946] mt-3 leading-relaxed">
            Visit our verified bureaus in person or schedule a confidential telephone consultation with our family counselors.
          </p>
        </div>

        {/* Hotlines Banner */}
        <div id="contact-hotline" className="bg-[#11150D] text-[#C8C5B4] rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#B3A16A]/20 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] text-[#B3A16A] uppercase font-semibold tracking-wider">
              Central Helpline &amp; WhatsApp Facilitation
            </span>
            <div className="font-serif text-2xl text-[#F7F4EA]">
              +91 9503801999 • +91 9503802999
            </div>
            <p className="text-xs text-[#C8C5B4]/70">
              Monday through Saturday: 10:00 AM – 7:00 PM IST (Except Friday Jumaah prayer hour)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/919503801999"
              target="_blank"
              rel="noreferrer"
              className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] px-5 py-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-600"
            >
              <MessageSquare size={15} />
              <span>WhatsApp Bureau</span>
            </a>
            <button 
              onClick={onOpenCounselor}
              className="bg-[#F7F4EA] text-[#11150D] px-5 py-2.5 rounded text-xs font-semibold hover:bg-[#E8E4D6] transition-colors"
            >
              Book In-Person Visit
            </button>
          </div>
        </div>

        {/* 4 Physical Offices Grid */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-[#11150D] mb-6 font-medium">
            Accredited Regional Centers
          </h2>
          <div id="contact-offices-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFICES.map((office) => (
              <div 
                key={office.id}
                className="contact-office-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-xl p-6 flex flex-col justify-between hover:border-[#0B4940]/40 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B4940] bg-[#0B4940]/10 px-2 py-0.5 rounded">
                      {office.type}
                    </span>
                    <Building size={16} className="text-[#526333]" />
                  </div>

                  <h3 className="font-serif text-xl text-[#11150D] font-medium mb-1">
                    {office.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#526333] mb-3">
                    {office.city}, Maharashtra
                  </div>

                  <p className="text-xs text-[#404946] leading-relaxed mb-4">
                    {office.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C8C5B4]/40 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#191d14]">
                    <Phone size={13} className="text-[#526333]" />
                    <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="hover:underline font-mono">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#404946]">
                    <Clock size={13} className="text-[#526333]" />
                    <span>{office.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Foundation Map Section */}
        <div id="contact-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div id="contact-form-col" className="lg:col-span-7 bg-[#E8E4D6]/50 border border-[#C8C5B4] rounded-xl p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-[#11150D] font-medium mb-1">
              Send an Official Inquiry
            </h3>
            <p className="text-xs text-[#404946] mb-6">
              Our bureau team responds to all matrimonial and foundation inquiries within 24 business hours.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center space-y-2">
                <CheckCircle size={28} className="text-emerald-700 mx-auto" />
                <h4 className="font-serif text-xl text-emerald-900">Message Received</h4>
                <p className="text-xs text-emerald-700">
                  Thank you. A counselor from your selected bureau office will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#11150D] mb-1">
                      Your Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Mohammed Farooq"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#11150D] mb-1">
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+91 95038 01999"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#11150D] mb-1">
                      Email Address (Optional)
                    </label>
                    <input 
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#11150D] mb-1">
                      Preferred Bureau
                    </label>
                    <select 
                      value={contactData.office}
                      onChange={(e) => setContactData({ ...contactData, office: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option>Pune Central Bureau (Headquarters)</option>
                      <option>Aurangabad Regional Bureau</option>
                      <option>Sangamner Bureau</option>
                      <option>Solapur Bureau</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#11150D] mb-1">
                    Your Message / Inquiry *
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="How can our matrimonial counselors assist your family?"
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] font-semibold px-6 py-2.5 rounded transition-colors flex items-center gap-1.5 shadow"
                >
                  <Send size={14} />
                  <span>Send Bureau Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Foundation Accreditation & Map info */}
          <div id="contact-info-col" className="lg:col-span-5 bg-[#E8E4D6]/30 border border-[#C8C5B4] rounded-xl p-8 space-y-6 shadow-sm">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#526333] block mb-1">
                Headquarters Address
              </span>
              <h4 className="font-serif text-xl text-[#11150D] font-medium">
                Faiz Marriage Bureau HQ
              </h4>
              <p className="text-xs text-[#404946] mt-2 leading-relaxed">
                Haji Mehmed Isaac Farash Foundation, Kondhwa Khurd, Pune - 411048, Maharashtra, India.
              </p>
            </div>

            <div className="pt-4 border-t border-[#C8C5B4]/50 space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#526333]" />
                <span className="text-[#11150D] font-medium">Certified Registered Philanthropic Trust</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#526333]" />
                <span className="text-[#404946]">Walk-in family consultations welcomed</span>
              </div>
            </div>

            <div className="p-4 bg-[#F7F4EA] border border-[#C8C5B4] rounded text-xs space-y-2">
              <div className="font-semibold text-[#11150D]">Looking to verify a biodata?</div>
              <p className="text-[11px] text-[#404946]">
                Provide the Dossier ID (e.g. FN-PUN-8402) when calling to expedite verification with the candidate's designated Wali.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
