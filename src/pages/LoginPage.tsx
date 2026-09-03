import React, { useState } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  UserCheck,
  KeyRound
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'Guardian' | 'Candidate'>('Guardian');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const newOtp = [...otpCode];
      newOtp[index] = val;
      setOtpCode(newOtp);
      // Auto advance
      if (val && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setLoginCompleted(true);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="w-full bg-[#f8fbed] min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#F7F4EA] border border-[#C8C5B4] shadow-sm p-1.5 mb-3 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="FaizNikah Emblem" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="font-serif text-3xl text-[#11150D] font-medium">FaizNikah Access</h2>
          <p className="text-xs text-[#526333] font-semibold mt-1">
            Guardian &amp; Candidate Verification Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#E8E4D6]/50 border border-[#C8C5B4] rounded-xl p-8 shadow-[0_12px_36px_-8px_rgba(17,21,13,0.08)]">
          {loginCompleted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-[#0B4940] text-[#F7F4EA] rounded-full flex items-center justify-center mx-auto shadow">
                <CheckCircle size={28} />
              </div>
              <h3 className="font-serif text-2xl text-[#11150D]">
                Authenticated Successfully
              </h3>
              <p className="text-xs text-[#404946] leading-relaxed">
                Welcome back to FaizNikah. Your verified session is active with full access to confidential guardian dossiers.
              </p>
              <button 
                onClick={() => onNavigate('find-partner')}
                className="w-full bg-[#0B4940] text-[#F7F4EA] py-2.5 rounded text-xs font-semibold hover:bg-[#14584C] transition-colors"
              >
                Browse Curated Dossiers
              </button>
            </div>
          ) : step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              {/* Role selector */}
              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-2">
                  Signing in as:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setRole('Guardian')}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      role === 'Guardian' 
                        ? 'bg-[#0B4940] text-[#F7F4EA] border-[#0B4940]' 
                        : 'bg-[#F7F4EA] text-[#404946] border-[#C8C5B4] hover:bg-[#E8E4D6]'
                    }`}
                  >
                    Parent / Guardian (Wali)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRole('Candidate')}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      role === 'Candidate' 
                        ? 'bg-[#0B4940] text-[#F7F4EA] border-[#0B4940]' 
                        : 'bg-[#F7F4EA] text-[#404946] border-[#C8C5B4] hover:bg-[#E8E4D6]'
                    }`}
                  >
                    Candidate
                  </button>
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-1.5">
                  Registered Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs text-[#404946] font-semibold border-r border-[#C8C5B4] pr-2">
                    +91
                  </div>
                  <input 
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="95038 01999"
                    className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded pl-14 pr-3 py-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0 font-mono tracking-wider"
                  />
                </div>
                <span className="text-[11px] text-[#404946] mt-1 block">
                  A 4-digit verification code will be sent to this number.
                </span>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] text-xs font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>Send One-Time Passcode (OTP)</span>
                <ArrowRight size={14} />
              </button>

              <div className="pt-3 border-t border-[#C8C5B4]/40 text-center text-xs text-[#404946]">
                Don't have a registered biodata yet?{' '}
                <button 
                  type="button"
                  onClick={() => onNavigate('create-profile')}
                  className="text-[#0B4940] font-semibold hover:underline"
                >
                  Register Biodata
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center space-y-1">
                <div className="text-xs text-[#404946]">
                  Passcode sent to <strong className="text-[#11150D]">+91 {phoneNumber}</strong>
                </div>
                <button 
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[11px] text-[#526333] hover:underline"
                >
                  Change number
                </button>
              </div>

              {/* 4 Digit OTP Inputs */}
              <div>
                <label className="block text-xs font-semibold text-[#11150D] mb-2 text-center">
                  Enter 4-Digit Passcode (Demo code: 7 8 6 0)
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input 
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otpCode[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-bold bg-[#F7F4EA] border border-[#C8C5B4] rounded focus:border-[#0B4940] focus:ring-0 text-[#11150D]"
                    />
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] text-xs font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2 shadow disabled:opacity-50"
              >
                {isVerifying ? (
                  <span>Authenticating with Bureau...</span>
                ) : (
                  <>
                    <KeyRound size={14} />
                    <span>Verify &amp; Access Sanctuary</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setOtpCode(['7', '8', '6', '0'])}
                  className="text-[11px] text-[#526333] font-semibold hover:underline"
                >
                  Auto-fill demo passcode (7860)
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-6 text-center text-xs text-[#404946] flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-[#526333]" />
          <span>Parental privacy protected under Haji Mehmed Isaac Farash Foundation</span>
        </div>
      </div>
    </div>
  );
};
