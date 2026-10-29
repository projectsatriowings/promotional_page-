import React, { useState } from 'react';
import { X, CheckCircle2, Send, Calendar, User, Mail, Phone, Sparkles, Building2 } from 'lucide-react';
import { MARKETING_COURSES } from '../data/marketingCoursesData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCourseId,
}) => {
  const [selectedCourse, setSelectedCourse] = useState(
    initialCourseId || MARKETING_COURSES[0].id
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [campus, setCampus] = useState('Chennai — Anna Nagar (Flagship Hub)');
  const [background, setBackground] = useState('Career Switcher / Job Seeker');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (initialCourseId) {
      setSelectedCourse(initialCourseId);
    }
  }, [initialCourseId]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Enter a valid 10-digit mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const courseObj = MARKETING_COURSES.find((c) => c.id === selectedCourse) || MARKETING_COURSES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200]" />

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 text-white shadow-md bg-gradient-to-r from-[#FFA800] to-[#FF5200]">
                <CheckCircle2 className="w-9 h-9 text-amber-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Brochure & Syllabus Dispatched!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                Thank you, <strong className="text-slate-900">{name || 'Learner'}</strong>. 
                Our admissions advisor will send the detailed 12-module curriculum, fee structure, and upcoming cohort schedule for{' '}
                <span className="font-semibold text-orange-700">{courseObj.title}</span> to{' '}
                <span className="font-semibold text-slate-900">{email || 'your email'}</span>.
              </p>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs text-slate-700 mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Course Selected:</span>
                  <span className="font-bold text-slate-900">{courseObj.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Campus Location:</span>
                  <span className="font-bold text-slate-900">{campus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Admissions Desk Direct:</span>
                  <span className="font-bold text-emerald-700">+91 8825948859</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all cursor-pointer"
              >
                Done & Return to Page
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Admissions & Brochure Request</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Enrol In DigitalGhuru Cohorts
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Receive the complete 12-module syllabus, fee structure, and upcoming cohort schedules instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Course selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Select Program Track
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                  >
                    {MARKETING_COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.number}. {c.title} ({c.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Arun Kumar"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">• {errors.name}</p>}
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="arun@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">• {errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">• {errors.phone}</p>}
                  </div>
                </div>

                {/* Campus & Background */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Campus / Mode
                    </label>
                    <select
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                    >
                      <option value="Chennai — Anna Nagar (Flagship Hub)">Chennai — Anna Nagar</option>
                      <option value="Chennai — Korattur (Technology Lab)">Chennai — Korattur</option>
                      <option value="Hyderabad — Ameerpet (Executive Hub)">Hyderabad — Ameerpet</option>
                      <option value="Live Interactive Online Campus">Live Online Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Current Background
                    </label>
                    <select
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                    >
                      <option value="Career Switcher / Job Seeker">Career Switcher / Job Seeker</option>
                      <option value="College Student / Fresh Graduate">College Student / Graduate</option>
                      <option value="Working Marketing Professional">Working Professional</option>
                      <option value="Business Owner / Entrepreneur">Business Owner</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Syllabus & Cohort Details</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
