import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { FOUNDATION_EVENTS } from '../data/faizNikahData';
import { FoundationEvent } from '../types';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface EventsPageProps {
  onNavigate: (page: string) => void;
  onOpenCounselor: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, onOpenCounselor }) => {
  const [selectedEvent, setSelectedEvent] = useState<FoundationEvent | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    attendees: '2',
    relation: 'Parent / Wali',
  });

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setSelectedEvent(null);
    }, 2500);
  };

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.events-header',
      { opacity: 0, y: 22, force3D: true },
      { opacity: 1, y: 0, duration: 0.75, ease: EASINGS.editorial, delay: 0.08 }
    );

    // Events grid cards
    gsap.fromTo(
      '.event-card',
      { opacity: 0, y: 28, force3D: true },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#events-grid',
          start: 'top 85%',
          once: true,
          fastScrollEnd: true
        }
      }
    );

    // Protocol card
    gsap.fromTo(
      '#events-protocol',
      { opacity: 0, y: 24, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.editorial,
        immediateRender: false,
        scrollTrigger: {
          trigger: '#events-protocol',
          start: 'top 88%',
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
        <div className="events-header max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>Community Gatherings &amp; Direct Facilitation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11150D] font-medium tracking-tight">
            Matrimonial Jalsas &amp; Conferences
          </h1>
          <p className="text-sm sm:text-base text-[#404946] mt-3 leading-relaxed">
            In-person gatherings organized under the guidance of Islamic scholars and experienced counselors, offering dignified family introductions in a respectful, blessed environment.
          </p>
        </div>

        {/* Events Grid */}
        <div id="events-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {FOUNDATION_EVENTS.map((event) => (
            <div 
              key={event.id}
              className="event-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-xl overflow-hidden shadow-[0_12px_36px_-8px_rgba(17,21,13,0.06)] hover:border-[#0B4940]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-56 overflow-hidden relative bg-[#C8C5B4]">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11150D]/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 right-4">
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                      event.category === 'Upcoming' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#11150D]/70 text-[#C8C5B4]'
                    }`}>
                      {event.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 text-[#F7F4EA]">
                    <div className="text-[11px] uppercase font-semibold text-[#B3A16A] tracking-wider mb-0.5">
                      {event.city} Gathering
                    </div>
                    <h3 className="font-serif text-2xl text-[#F7F4EA] font-medium leading-snug">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#191d14] bg-[#F7F4EA] p-3 rounded border border-[#C8C5B4]/50">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-[#526333]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#526333]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <MapPin size={15} className="text-[#526333] flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#404946] leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#C8C5B4]/40">
                    <span className="text-[#526333] font-semibold flex items-center gap-1.5">
                      <Users size={14} />
                      <span>{event.capacity || 'Pre-screened Members'}</span>
                    </span>
                    <span className="text-[#404946] font-mono text-[11px]">
                      Entry by Prior Verification
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                {event.category === 'Upcoming' ? (
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Request Family RSVP Invitation</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] text-[#404946] hover:text-[#11150D] py-2.5 rounded text-xs font-semibold transition-colors"
                  >
                    <span>View Event Proceedings &amp; Resolutions</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Foundation Charter Note */}
        <div id="events-protocol" className="p-8 bg-[#E8E4D6]/60 border border-[#C8C5B4] rounded-xl text-center max-w-3xl mx-auto space-y-3 shadow-sm">
          <div className="font-serif text-xl text-[#11150D] font-medium">
            Protocol of FaizNikah Matrimonial Jalsas
          </div>
          <p className="text-xs sm:text-sm text-[#404946] leading-relaxed max-w-xl mx-auto">
            All attendees are registered members whose family background and identity credentials have been pre-screened. Separate comfortable seating is arranged for elders and guardians, facilitating dignified, non-commercial introductions.
          </p>
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11150D]/65 backdrop-blur-sm">
          <div className="bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 text-[#404946] hover:text-[#11150D] hover:bg-[#E8E4D6] rounded-full"
            >
              <X size={20} />
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={28} />
                </div>
                <h3 className="font-serif text-2xl text-[#11150D]">
                  Invitation Pass Reserved
                </h3>
                <p className="text-xs text-[#404946]">
                  Our event coordinator will confirm your family's seating and entrance pass via WhatsApp/Call.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="text-xs font-semibold text-[#526333] uppercase">Family Invitation Request</span>
                  <h3 className="font-serif text-2xl text-[#11150D] font-medium mt-1">
                    {selectedEvent.title}
                  </h3>
                  <div className="text-xs text-[#404946] mt-1">
                    {selectedEvent.date} • {selectedEvent.venue}
                  </div>
                </div>

                <form onSubmit={handleRsvp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Guardian / Head of Family Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="e.g. Mohammed Isaac Farash"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#11150D] mb-1">
                        Contact Phone *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={rsvpData.phone}
                        onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                        placeholder="+91 95038 01999"
                        className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#11150D] mb-1">
                        Number of Attendees
                      </label>
                      <select 
                        value={rsvpData.attendees}
                        onChange={(e) => setRsvpData({ ...rsvpData, attendees: e.target.value })}
                        className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                      >
                        <option>1 (Self / Wali)</option>
                        <option>2 (Parents)</option>
                        <option>3 (Parents + Candidate)</option>
                        <option>4 (Family Delegation)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-[#526333] font-semibold">Strict Modesty &amp; Verification</span>
                    <button 
                      type="submit"
                      className="bg-[#0B4940] text-[#F7F4EA] px-5 py-2.5 rounded font-semibold hover:bg-[#14584C] flex items-center gap-1.5 shadow"
                    >
                      <Send size={14} />
                      <span>Confirm Reservation</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
