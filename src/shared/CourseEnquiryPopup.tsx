import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, CheckCircle2, MessageCircle, ChevronDown, AlertCircle } from 'lucide-react';

interface CourseEnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  defaultRole?: string;
  roleOptions?: string[];
}

export const CourseEnquiryPopup: React.FC<CourseEnquiryPopupProps> = ({
  isOpen,
  onClose,
  courseName,
  defaultRole,
  roleOptions,
}) => {
  // 14 minutes 30 seconds countdown matching the reference design
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 30);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: defaultRole || 'College student',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const defaultRoles = roleOptions || [
    'College student',
    'Fresh graduate / Job seeker',
    'Working professional',
    'Business owner / Entrepreneur',
    'Parent (for Kids Course)',
    'School student',
    'Other',
  ];

  // Countdown timer ticking down every second
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 14 * 60 + 30));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Sync defaultRole if changed
  useEffect(() => {
    if (defaultRole) {
      setFormData((prev) => ({ ...prev, role: defaultRole }));
    }
  }, [defaultRole]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedMin = String(minutes).padStart(2, '0');
  const formattedSec = String(seconds).padStart(2, '0');

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter student name';
    }
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please enter phone number';
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      nextErrors.phone = 'Enter valid 10-digit number';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter valid email address';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger email mailto draft in background
    const subject = encodeURIComponent(`Free Counselling & Syllabus Request - ${courseName}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCategory: ${formData.role}\nCourse: ${courseName}\nMessage: ${formData.message || 'N/A'}`
    );

    try {
      const mailtoLink = `mailto:admissions@digitalghuru.com?subject=${subject}&body=${body}`;
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.target = '_blank';
    } catch {
      // fallback
    }

    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Digital Ghuru, I would like to request free counselling and syllabus for ${courseName}.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nRole: ${formData.role}`
    );
    window.open(`https://wa.me/918825948859?text=${text}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-orange-200/50 transition-all animate-scale-up max-h-[92vh] flex flex-col"
        style={{
          backgroundColor: '#FAF8F5',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        }}
      >
        {/* ==============================================================
            ORANGE URGENCY HEADER (Compact height)
            ============================================================== */}
        <div className="relative bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#c2410c] text-white px-5 py-3.5 sm:px-6 sm:py-4 flex-shrink-0">
          {/* Top Row: Pill Badge + Close Button */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-orange-100 text-[11px] font-semibold backdrop-blur-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              <span>Limited seats</span>
              <span className="text-white/40">•</span>
              <span>Next batch</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialogue"
              className="w-6 h-6 rounded-lg bg-black/20 hover:bg-black/35 text-white/90 hover:text-white flex items-center justify-center transition border border-white/15 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Headline */}
          <h2 id="enquiry-popup-title" className="text-base sm:text-lg font-extrabold tracking-tight text-white mb-2 leading-tight">
            Free counselling offer ends in
          </h2>

          {/* Countdown timer & teaser */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Minutes Box */}
            <div className="bg-white text-slate-900 rounded-lg px-2 py-1 shadow-xs flex flex-col items-center justify-center min-w-[46px] sm:min-w-[50px]">
              <span className="text-xl sm:text-2xl font-black leading-none tracking-tight">{formattedMin}</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">MIN</span>
            </div>

            <span className="text-white/80 font-black text-lg pb-0.5">:</span>

            {/* Seconds Box */}
            <div className="bg-white text-slate-900 rounded-lg px-2 py-1 shadow-xs flex flex-col items-center justify-center min-w-[46px] sm:min-w-[50px]">
              <span className="text-xl sm:text-2xl font-black leading-none tracking-tight">{formattedSec}</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">SEC</span>
            </div>

            {/* Teaser copy */}
            <p className="text-white text-xs sm:text-[13px] font-semibold leading-tight ml-1.5">
              Book now and get the full syllabus free
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-black/25 rounded-full overflow-hidden mt-2.5">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-700"
              style={{ width: '84%' }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-orange-100/90 font-medium mt-1">
            <span>Seats fill fast. Book soon.</span>
            <span className="text-amber-200 font-bold">84% Claimed</span>
          </div>
        </div>

        {/* ==============================================================
            FORM BODY: BRAND COLOR #FAF8F5 (Compact & Light)
            ============================================================== */}
        <div
          className="px-5 py-3.5 sm:px-6 sm:py-4 overflow-y-auto flex-grow"
          style={{ backgroundColor: '#FAF8F5' }}
        >
          {isSubmitted ? (
            <div className="py-4 sm:py-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-3 shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">Seat Enquiry Booked!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-5 leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our admissions counsellor for{' '}
                <span className="text-orange-600 font-semibold">{courseName}</span> will contact you shortly via phone & email.
              </p>

              <div className="w-full flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-2.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  Request course syllabus and counselling
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Fill this quick form to connect with our admissions counsellor.
                </p>
              </div>

              {/* Row 1: Student Name & Phone Number (2 columns to save height) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Student name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sangeetha"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition shadow-xs ${
                      errors.name
                        ? 'border border-red-400 ring-1 ring-red-400'
                        : 'border border-slate-300/80 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition shadow-xs ${
                      errors.phone
                        ? 'border border-red-400 ring-1 ring-red-400'
                        : 'border border-slate-300/80 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email Address & I am a (2 columns to save height) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email address <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition shadow-xs ${
                      errors.email
                        ? 'border border-red-400 ring-1 ring-red-400'
                        : 'border border-slate-300/80 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">I am a</label>
                  <div className="relative">
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white border border-slate-300/80 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none transition shadow-xs appearance-none cursor-pointer pr-8"
                    >
                      {defaultRoles.map((role) => (
                        <option key={role} value={role} className="text-slate-900 py-1">
                          {role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Message or questions (optional) - single line height */}
              <div className="mb-2.5">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Message or questions (optional)
                </label>
                <input
                  type="text"
                  placeholder="Ask about batch timings, fees or curriculum"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 border border-slate-300/80 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none transition shadow-xs"
                />
              </div>

              {/* Submit Button (Vibrant Header Gradient Color) */}
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs uppercase sm:text-sm tracking-wider text-white bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#c2410c] hover:brightness-105 active:scale-[0.99] transition shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book my seat by email</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Privacy Footer Note */}
              <p className="text-center text-[10px] text-slate-500 mt-2 font-normal">
                Your details go only to our admissions team.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEnquiryPopup;
