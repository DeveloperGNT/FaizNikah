import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Upload, 
  Sparkles, 
  FileText,
  User,
  Heart,
  Briefcase,
  Users,
  Eye,
  Send
} from 'lucide-react';
import { CommunityType } from '../types';

interface CreateProfilePageProps {
  onNavigate: (page: string) => void;
}

export const CreateProfilePage: React.FC<CreateProfilePageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: '',
    gender: 'Female' as 'Female' | 'Male',
    dob: '',
    height: "5'4\"",
    phone: '',
    whatsapp: '',
    email: '',

    // Step 2: Personal Details & Faith
    community: 'Sunni' as CommunityType,
    subCommunity: 'Hanafi',
    motherTongue: 'Urdu',
    maritalStatus: 'Never Married',
    physique: 'Normal',
    complexion: 'Fair',
    diet: 'Halal Only',

    // Step 3: Education & Profession
    highestDegree: '',
    fieldOfStudy: '',
    institute: '',
    occupation: '',
    companyName: '',
    annualIncome: '₹ 5 - 10 Lakhs',
    workingCity: 'Pune',

    // Step 4: Family Information
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    brothers: '1',
    sisters: '1',
    nativePlace: 'Pune / Solapur',
    waliName: '',
    waliRelation: 'Father',
    waliContact: '',

    // Step 5: Partner Preferences
    prefAgeMin: 23,
    prefAgeMax: 30,
    prefHeightMin: "5'2\"",
    prefHeightMax: "6'0\"",
    prefEducation: 'Graduate or Postgraduate',
    prefCommunities: ['Sunni'],
    prefLocations: 'Pune, Mumbai, Aurangabad',
    zeroDowryPledge: true,

    // Step 6: Profile Photo
    photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=600',
    photoPrivacy: 'OnRequest' as 'Public' | 'OnRequest' | 'Blur',

    // Step 7: Personal Reflections
    aboutSelf: '',
    aboutFamily: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `FN-2025-${randomNum}`;
    setGeneratedId(id);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsList = [
    { num: 1, title: 'Basic Information' },
    { num: 2, title: 'Personal & Faith' },
    { num: 3, title: 'Education & Career' },
    { num: 4, title: 'Family & Wali' },
    { num: 5, title: 'Partner Preferences' },
    { num: 6, title: 'Photo & Privacy' },
    { num: 7, title: 'Values & Reflections' },
    { num: 8, title: 'Review & Submit' },
  ];

  if (submitted) {
    return (
      <div className="w-full bg-[#f8fbed] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#E8E4D6]/70 border border-[#C8C5B4] rounded-xl p-8 sm:p-10 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 bg-[#0B4940] text-[#F7F4EA] rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#526333] font-bold">
                Registration Received with Barakah
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#11150D]">
                Biodata Dossier Created
              </h2>
              <div className="inline-block bg-[#0B4940] text-[#F7F4EA] px-4 py-1.5 rounded font-mono text-sm tracking-wider font-bold my-2">
                Assigned Dossier ID: {generatedId}
              </div>
            </div>

            <p className="text-sm text-[#404946] max-w-lg mx-auto leading-relaxed">
              Your registration is now pending verification under the Haji Mehmed Isaac Farash Foundation protocol. Senior mediator Intekhab Farash or Parveen Farash will reach out to the specified Wali ({formData.waliName || 'Guardian'}) within 24 to 48 hours for confidential verification.
            </p>

            <div className="bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg p-5 text-left text-xs space-y-2 text-[#191d14]">
              <div className="font-semibold text-sm text-[#11150D] flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#526333]" />
                <span>Next Steps in Your Nikah Journey:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#404946] pl-1">
                <li>Telephonic Wali verification call from Head Office (+91 9503801999).</li>
                <li>Document authentication (Identity proof / Degree certificate review).</li>
                <li>Activating your 18-month membership access.</li>
                <li>Option to schedule an in-person introductory meeting at our Pune, Aurangabad, or Solapur offices.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => onNavigate('find-partner')}
                className="w-full sm:w-auto bg-[#0B4940] text-[#F7F4EA] px-6 py-3 rounded text-xs font-semibold hover:bg-[#14584C] transition-colors"
              >
                Browse Matrimonial Dossiers
              </button>
              <button 
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto bg-[#F7F4EA] text-[#11150D] border border-[#C8C5B4] px-6 py-3 rounded text-xs font-semibold hover:bg-[#E8E4D6] transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fbed] min-h-screen py-10">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#526333] font-semibold block mb-1">
            Dignified &amp; Guardian-Governed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#11150D] font-medium">
            Create Your Matrimonial Biodata
          </h1>
          <p className="text-xs sm:text-sm text-[#404946] mt-2">
            Guided by Sunnah values. All information is confidential and protected by guardian consent.
          </p>
        </div>

        {/* Multi-Step Indicator Bar */}
        <div className="bg-[#E8E4D6]/70 border border-[#C8C5B4] rounded-lg p-4 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px]">
            {stepsList.map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <div key={step.num} className="flex items-center">
                  <div 
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive 
                        ? 'text-[#0B4940] font-bold' 
                        : isPast 
                          ? 'text-[#526333] font-medium' 
                          : 'text-[#404946]/60'
                    }`}
                    onClick={() => {
                      if (step.num < currentStep) setCurrentStep(step.num);
                    }}
                  >
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                        isActive 
                          ? 'bg-[#0B4940] text-[#F7F4EA] ring-2 ring-[#B3A16A]' 
                          : isPast 
                            ? 'bg-[#526333] text-[#F7F4EA]' 
                            : 'bg-[#C8C5B4]/50 text-[#404946]'
                      }`}
                    >
                      {step.num}
                    </div>
                    <span className="text-xs hidden md:inline">{step.title}</span>
                  </div>
                  {step.num < totalSteps && (
                    <div className="w-6 lg:w-10 h-px bg-[#C8C5B4] mx-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#E8E4D6]/40 border border-[#C8C5B4] rounded-xl p-6 sm:p-10 shadow-[0_10px_30px_rgba(17,21,13,0.05)]">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 01: Basic Information</h3>
                  <p className="text-xs text-[#404946]">Basic personal identifier details for the candidate.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Candidate Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Amina Begum Shaikh"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Gender *
                    </label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option value="Female">Female (Bride Profile)</option>
                      <option value="Male">Male (Groom Profile)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Date of Birth *
                    </label>
                    <input 
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Height *
                    </label>
                    <select 
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option>5'0"</option>
                      <option>5'2"</option>
                      <option>5'4"</option>
                      <option>5'6"</option>
                      <option>5'8"</option>
                      <option>5'10"</option>
                      <option>6'0"</option>
                      <option>6'2"</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Contact Phone Number (Wali / Guardian) *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 95038 01999"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      WhatsApp Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+91 95038 01999"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Personal Details & Faith */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 02: Personal Details &amp; Faith Tradition</h3>
                  <p className="text-xs text-[#404946]">Maslak, community jurisprudence, and lifestyle observances.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Community Tradition *
                    </label>
                    <select 
                      value={formData.community}
                      onChange={(e) => setFormData({ ...formData, community: e.target.value as CommunityType })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option value="Sunni">Sunni Muslim</option>
                      <option value="Shia">Shia Muslim</option>
                      <option value="Bohra">Dawoodi Bohra</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Sub-Community / Maslak
                    </label>
                    <input 
                      type="text"
                      value={formData.subCommunity}
                      onChange={(e) => setFormData({ ...formData, subCommunity: e.target.value })}
                      placeholder="e.g. Hanafi, Shafi'i, Ithna Ashari, Syed..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Mother Tongue
                    </label>
                    <select 
                      value={formData.motherTongue}
                      onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option>Urdu</option>
                      <option>Marathi</option>
                      <option>Hindi</option>
                      <option>Gujarati</option>
                      <option>English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Marital Status *
                    </label>
                    <select 
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option>Never Married</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Education & Career */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 03: Education &amp; Profession</h3>
                  <p className="text-xs text-[#404946]">Academic background, professional credentials, and workplace details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Highest Qualification *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.highestDegree}
                      onChange={(e) => setFormData({ ...formData, highestDegree: e.target.value })}
                      placeholder="e.g. M.S., M.D., B.Tech, MBA, Chartered Accountant..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Profession / Job Title *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="e.g. Senior Software Architect, Resident Doctor, Teacher..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Organization / Firm / Self-Employed Field
                    </label>
                    <input 
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Multinational IT Company, Private Clinic, Family Business..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Current City of Residence *
                    </label>
                    <select 
                      value={formData.workingCity}
                      onChange={(e) => setFormData({ ...formData, workingCity: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option>Pune (Kondhwa / Camp / PCMC)</option>
                      <option>Aurangabad (Chhatrapati Sambhajinagar)</option>
                      <option>Sangamner / Ahmednagar</option>
                      <option>Solapur</option>
                      <option>Mumbai / Navi Mumbai / Thane</option>
                      <option>Other City</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Family Information & Wali */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 04: Family Information &amp; Wali Guardian</h3>
                  <p className="text-xs text-[#404946]">FaizNikah places sacred value on verified parental and guardian mediation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Wali / Guardian Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.waliName}
                      onChange={(e) => setFormData({ ...formData, waliName: e.target.value })}
                      placeholder="e.g. Mohammed Isaac Farash"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Wali Relationship *
                    </label>
                    <select 
                      value={formData.waliRelation}
                      onChange={(e) => setFormData({ ...formData, waliRelation: e.target.value })}
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    >
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Elder Brother</option>
                      <option>Paternal Uncle</option>
                      <option>Maternal Uncle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Father's Occupation
                    </label>
                    <input 
                      type="text"
                      value={formData.fatherOccupation}
                      onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                      placeholder="e.g. Retired Civil Engineer, Merchant, Educator..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Family Native Place / Roots *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.nativePlace}
                      onChange={(e) => setFormData({ ...formData, nativePlace: e.target.value })}
                      placeholder="e.g. Established business family from Solapur, settled in Pune"
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Partner Preferences */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 05: Partner Preferences &amp; Nikah Covenant</h3>
                  <p className="text-xs text-[#404946]">Specify your expectations, preferred age, education, and Sunnah simplicity commitment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Preferred Age Spectrum
                    </label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number"
                        min={18}
                        max={60}
                        value={formData.prefAgeMin}
                        onChange={(e) => setFormData({ ...formData, prefAgeMin: Number(e.target.value) })}
                        className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14]"
                      />
                      <span className="text-xs text-[#404946]">to</span>
                      <input 
                        type="number"
                        min={18}
                        max={60}
                        value={formData.prefAgeMax}
                        onChange={(e) => setFormData({ ...formData, prefAgeMax: Number(e.target.value) })}
                        className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Preferred Educational Background
                    </label>
                    <input 
                      type="text"
                      value={formData.prefEducation}
                      onChange={(e) => setFormData({ ...formData, prefEducation: e.target.value })}
                      placeholder="e.g. Any Professional Graduate, Post Graduate, Doctor..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-2.5 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    />
                  </div>
                </div>

                {/* Zero Dowry Simplicity Pledge */}
                <div className="bg-[#F7F4EA] border border-[#526333]/40 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox"
                      id="zeroDowry"
                      checked={formData.zeroDowryPledge}
                      onChange={(e) => setFormData({ ...formData, zeroDowryPledge: e.target.checked })}
                      className="mt-1 rounded text-[#0B4940] focus:ring-0 border-[#C8C5B4]"
                    />
                    <label htmlFor="zeroDowry" className="text-xs text-[#191d14] cursor-pointer">
                      <strong className="font-semibold text-sm text-[#0B4940] block mb-1">
                        The FaizNikah Sunnah Simplicity Pledge
                      </strong>
                      I and my family solemnly pledge to adhere to Islamic Sunnah simplicity. We reject all forms of dowry (Dahej), unwholesome monetary demands, and wasteful hall extravagances. We intend to solemnize the Nikah with dignity, barakah, and mutual honor.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Profile Photo & Privacy */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 06: Profile Photograph &amp; Privacy Controls</h3>
                  <p className="text-xs text-[#404946]">Choose how your portrait is displayed. FaizNikah ensures strict family modesty safeguards.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-[#11150D]">
                      Photo Privacy Setting *
                    </label>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-3 rounded border border-[#C8C5B4] bg-[#F7F4EA] cursor-pointer">
                        <input 
                          type="radio"
                          name="photoPrivacy"
                          value="OnRequest"
                          checked={formData.photoPrivacy === 'OnRequest'}
                          onChange={() => setFormData({ ...formData, photoPrivacy: 'OnRequest' })}
                          className="mt-0.5 text-[#0B4940] focus:ring-0"
                        />
                        <div className="text-xs">
                          <strong className="block text-[#11150D]">Visible on Guardian Request (Recommended)</strong>
                          <span className="text-[#404946]">Photo remains blurred until candidate's Wali approves viewing.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 rounded border border-[#C8C5B4] bg-[#F7F4EA] cursor-pointer">
                        <input 
                          type="radio"
                          name="photoPrivacy"
                          value="Public"
                          checked={formData.photoPrivacy === 'Public'}
                          onChange={() => setFormData({ ...formData, photoPrivacy: 'Public' })}
                          className="mt-0.5 text-[#0B4940] focus:ring-0"
                        />
                        <div className="text-xs">
                          <strong className="block text-[#11150D]">Visible to Verified Members Only</strong>
                          <span className="text-[#404946]">Visible only to logged-in, authenticated families.</span>
                        </div>
                      </label>
                    </div>

                    <div className="pt-2">
                      <div className="border-2 border-dashed border-[#C8C5B4] rounded-lg p-6 text-center bg-[#F7F4EA] space-y-2">
                        <Upload size={24} className="mx-auto text-[#526333]" />
                        <div className="text-xs font-semibold text-[#11150D]">
                          Select or Drop Dignified Portrait
                        </div>
                        <p className="text-[11px] text-[#404946]">
                          High-resolution modest photo with plain background. JPG or PNG up to 5MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Live Preview of Photo */}
                  <div className="bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg p-5 text-center space-y-3">
                    <span className="text-xs font-semibold text-[#526333] uppercase tracking-wider block">
                      Preview as it appears in Dossier
                    </span>
                    <div className="w-32 h-40 rounded mx-auto overflow-hidden border border-[#C8C5B4] relative bg-[#E8E4D6]">
                      <img 
                        src={formData.photoUrl} 
                        alt="Preview" 
                        className={`w-full h-full object-cover ${formData.photoPrivacy === 'OnRequest' ? 'blur-sm scale-105' : ''}`}
                      />
                      {formData.photoPrivacy === 'OnRequest' && (
                        <div className="absolute inset-0 bg-[#11150D]/60 flex flex-col items-center justify-center p-2 text-[#F7F4EA]">
                          <Lock size={16} className="text-[#B3A16A] mb-1" />
                          <span className="text-[9px] font-medium leading-tight">Guardian Consent Required</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-[#404946] italic">
                      {formData.photoPrivacy === 'OnRequest' ? 'Blurred to general public' : 'Clear for verified members'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Values & Reflections */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 07: Personal Reflections &amp; Marital Values</h3>
                  <p className="text-xs text-[#404946]">Describe religious practice, nature, hobbies, and vision for home life.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      About the Candidate (Character, Religious Practice, Hobbies) *
                    </label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.aboutSelf}
                      onChange={(e) => setFormData({ ...formData, aboutSelf: e.target.value })}
                      placeholder="e.g. Practicing Muslim who values regular prayer, family gatherings, books, and quiet weekends. Seeks an educated partner with gentle speech and mutual respect..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-3 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11150D] mb-1">
                      Family Overview &amp; Community Standing
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.aboutFamily}
                      onChange={(e) => setFormData({ ...formData, aboutFamily: e.target.value })}
                      placeholder="e.g. We are a close-knit, deen-conscious family residing in Kondhwa, Pune. Values honesty and simple living..."
                      className="w-full bg-[#F7F4EA] border border-[#C8C5B4] rounded p-3 text-xs text-[#191d14] focus:border-[#0B4940] focus:ring-0"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Review & Submit */}
            {currentStep === 8 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#C8C5B4]/50 pb-3">
                  <h3 className="font-serif text-2xl text-[#11150D]">Step 08: Review Biodata Dossier</h3>
                  <p className="text-xs text-[#404946]">Please verify all entered credentials prior to official submission.</p>
                </div>

                <div className="bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg p-6 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#C8C5B4]/40">
                    <div>
                      <span className="text-[#404946] block">Full Name:</span>
                      <strong className="text-sm text-[#11150D]">{formData.fullName || 'Candidate'}</strong>
                    </div>
                    <div>
                      <span className="text-[#404946] block">Gender &amp; Height:</span>
                      <span className="font-medium text-[#11150D]">{formData.gender}, {formData.height}</span>
                    </div>
                    <div>
                      <span className="text-[#404946] block">Tradition / Maslak:</span>
                      <span className="font-medium text-[#11150D]">{formData.community} ({formData.subCommunity})</span>
                    </div>
                    <div>
                      <span className="text-[#404946] block">Education &amp; Profession:</span>
                      <span className="font-medium text-[#11150D]">{formData.highestDegree} • {formData.occupation}</span>
                    </div>
                    <div>
                      <span className="text-[#404946] block">Wali Guardian:</span>
                      <span className="font-medium text-[#11150D]">{formData.waliName} ({formData.waliRelation})</span>
                    </div>
                    <div>
                      <span className="text-[#404946] block">Contact Phone:</span>
                      <span className="font-medium text-[#11150D]">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#0B4940] font-semibold text-xs pt-1">
                    <CheckCircle size={16} />
                    <span>Zero Dowry &amp; Sunnah Simplicity Pledge Accepted</span>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded text-xs text-amber-900 leading-relaxed">
                  <strong>Declaration of Truth:</strong> By submitting this biodata, I affirm that all personal, academic, and family information provided is truthful and submitted with the full knowledge and consent of the specified Wali/Guardian.
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-[#C8C5B4]/60 flex items-center justify-between">
              {currentStep > 1 ? (
                <button 
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 rounded bg-[#F7F4EA] border border-[#C8C5B4] text-xs font-semibold text-[#11150D] hover:bg-[#E8E4D6] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] text-xs font-semibold px-6 py-2.5 rounded transition-colors flex items-center gap-1.5 shadow"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button 
                  type="submit"
                  className="bg-[#0B4940] hover:bg-[#14584C] text-[#F7F4EA] text-xs font-semibold px-8 py-3 rounded transition-all shadow-md flex items-center gap-2"
                >
                  <Send size={15} />
                  <span>Submit Matrimonial Biodata</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
