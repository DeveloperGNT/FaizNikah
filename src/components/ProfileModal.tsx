import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Heart, 
  CheckCircle, 
  Phone, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  Sparkles,
  Lock,
  UserCheck,
  Building,
  GraduationCap,
  MapPin,
  FileCheck
} from 'lucide-react';
import { Profile } from '../types';

interface ProfileModalProps {
  profile: Profile | null;
  isOpen?: boolean;
  onClose: () => void;
  isShortlisted: boolean;
  onToggleShortlist: (profileId: string) => void;
  onOpenCounselor: (profileId?: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen = true,
  onClose,
  isShortlisted,
  onToggleShortlist,
  onOpenCounselor,
}) => {
  const [photoRequested, setPhotoRequested] = useState(false);
  const [interestSent, setInterestSent] = useState(false);

  if (!isOpen || !profile) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11150D]/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg shadow-[0_20px_50px_rgba(17,21,13,0.25)] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#E8E4D6] px-6 py-4 border-b border-[#C8C5B4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#0B4940] text-[#F7F4EA] text-xs font-semibold px-2.5 py-1 rounded tracking-wider">
              {profile.id}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#526333]">
              <ShieldCheck size={16} />
              <span>Wali Verified &amp; Bureau Accredited</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#404946] hover:text-[#11150D] hover:bg-[#C8C5B4]/40 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Dossier Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-[#C8C5B4]/50">
            {/* Portrait Frame */}
            <div className="w-36 h-44 rounded bg-[#E8E4D6] border border-[#C8C5B4] overflow-hidden flex-shrink-0 relative shadow-sm">
              <img 
                src={profile.photoUrl} 
                alt={profile.name}
                className={`w-full h-full object-cover transition-all ${
                  profile.photoPrivacy === 'OnRequest' && !photoRequested ? 'blur-md scale-105' : ''
                }`}
              />
              {profile.photoPrivacy === 'OnRequest' && !photoRequested && (
                <div className="absolute inset-0 bg-[#11150D]/50 flex flex-col items-center justify-center p-2 text-center text-[#F7F4EA]">
                  <Lock size={18} className="mb-1 text-[#B3A16A]" />
                  <span className="text-[11px] font-medium leading-tight">
                    Guardian Photo Consent Required
                  </span>
                  <button 
                    onClick={() => setPhotoRequested(true)}
                    className="mt-2 text-[10px] bg-[#B3A16A] text-[#11150D] font-bold px-2 py-0.5 rounded hover:bg-[#E8E4D6] transition-colors"
                  >
                    Request Unlock
                  </button>
                </div>
              )}
              {photoRequested && (
                <div className="absolute top-1 right-1 bg-[#0B4940] text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                  Unlocked for Session
                </div>
              )}
            </div>

            {/* Profile Info Summary */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl md:text-3xl text-[#11150D] font-medium">
                  {profile.name}
                </h3>
                <button 
                  onClick={() => onToggleShortlist(profile.id)}
                  className={`p-2 rounded-full border transition-all ${
                    isShortlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-[#E8E4D6]/60 border-[#C8C5B4] text-[#404946] hover:text-[#11150D]'
                  }`}
                  title={isShortlisted ? 'Remove from shortlist' : 'Save to shortlist'}
                >
                  <Heart size={18} className={isShortlisted ? 'fill-rose-600' : ''} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[#E8E4D6] text-[#526333] px-2.5 py-1 rounded font-semibold">
                  {profile.community} • {profile.subCommunity}
                </span>
                <span className="bg-[#E8E4D6] text-[#404946] px-2.5 py-1 rounded">
                  {profile.age} Years • {profile.height}
                </span>
                <span className="bg-[#E8E4D6] text-[#404946] px-2.5 py-1 rounded">
                  {profile.maritalStatus}
                </span>
                <span className="bg-emerald-100 text-[#0B4940] px-2.5 py-1 rounded font-medium flex items-center gap-1">
                  <CheckCircle size={12} />
                  <span>Zero Dowry Pledge Signed</span>
                </span>
              </div>

              <div className="pt-2 text-sm text-[#404946] space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#526333]" />
                  <span className="font-medium text-[#191d14]">{profile.education}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-[#526333]" />
                  <span>{profile.profession} — {profile.companyOrField}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#526333]" />
                  <span>{profile.district}, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>

          {/* About / Personal Reflection */}
          <div>
            <h4 className="font-serif text-lg text-[#11150D] font-medium mb-2">
              Values &amp; Personality Statement
            </h4>
            <div className="bg-[#E8E4D6]/50 border border-[#C8C5B4]/70 rounded p-4 text-sm text-[#404946] leading-relaxed italic font-serif">
              "{profile.about}"
            </div>
          </div>

          {/* Detailed Verification Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Family & Lineage */}
            <div className="bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded p-4 space-y-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-[#526333] flex items-center gap-1.5">
                <UserCheck size={14} />
                <span>Family Background &amp; Lineage</span>
              </h5>
              <div className="text-xs space-y-1 text-[#191d14]">
                <div className="flex justify-between py-1 border-b border-[#C8C5B4]/30">
                  <span className="text-[#404946]">Roots:</span>
                  <span className="font-medium">{profile.familyRoots}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C8C5B4]/30">
                  <span className="text-[#404946]">Wali Guardian:</span>
                  <span className="font-medium">{profile.waliGuardian} ({profile.waliRelation})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#404946]">Liaison Status:</span>
                  <span className="font-semibold text-[#0B4940]">Parental Approval on File</span>
                </div>
              </div>
            </div>

            {/* Nikah Charter Alignment */}
            <div className="bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded p-4 space-y-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-[#526333] flex items-center gap-1.5">
                <FileCheck size={14} />
                <span>Nikah Expectation &amp; Simplicity</span>
              </h5>
              <div className="text-xs space-y-1 text-[#191d14]">
                <div className="flex justify-between py-1 border-b border-[#C8C5B4]/30">
                  <span className="text-[#404946]">Solemnization:</span>
                  <span className="font-medium text-[#0B4940]">{profile.nikahView}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C8C5B4]/30">
                  <span className="text-[#404946]">Dowry Demands:</span>
                  <span className="font-bold text-emerald-800">Strictly Forbidden</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#404946]">Coordination:</span>
                  <span className="font-medium">Direct In-Person Meeting at Bureau</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Safe Mediation Notice */}
          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded text-xs text-amber-900 leading-snug">
            <strong>Parental Sanctity Protocol:</strong> In accordance with Islamic values and the FaizNikah Charter, candidate contact numbers are never broadcast publicly. All mutual introductions occur via verified Wali mediation or at our accredited Pune, Aurangabad, or Solapur offices.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#E8E4D6] px-6 py-4 border-t border-[#C8C5B4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#404946]">
            Bureau Counselor: <strong className="text-[#11150D]">Intekhab Farash</strong> (Pune Central)
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => {
                onClose();
                onOpenCounselor(profile.id);
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded bg-transparent border border-[#526333] text-[#11150D] text-xs font-semibold hover:bg-[#C8C5B4]/40 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={14} className="text-[#526333]" />
              <span>Discuss with Counselor</span>
            </button>

            <button 
              onClick={() => {
                setInterestSent(true);
                setTimeout(() => setInterestSent(false), 3500);
              }}
              className={`w-full sm:w-auto px-5 py-2.5 rounded text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                interestSent 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA]'
              }`}
            >
              {interestSent ? (
                <>
                  <CheckCircle size={15} />
                  <span>Guardian Request Logged!</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Express Guardian Interest</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
