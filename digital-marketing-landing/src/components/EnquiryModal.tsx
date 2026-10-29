import React, { useState } from 'react';
import { X, CheckCircle2, Send, Calendar, User, Mail, Phone, Sparkles } from 'lucide-react';
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
  const [campus, setCampus] = useState('Anna Nagar (Chennai)');
  const [background, setBackground] = useState('Career Switcher / Job Seeker');
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialCourseId) {
      setSelectedCourse(initialCourseId);
    }
  }, [initialCourseId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="h-2 w-full bg-orange-600" />

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 text-white shadow-lg bg-orange-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Brochure & Syllabus Dispatched!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                Thank you, <strong className="text-slate-800">{name || 'Learner'}</strong>. 
                Our admissions advisor will send the detailed 12-module curriculum, fee structure, and upcoming cohort schedule for{' '}
                <span className="font-semibold text-slate-900">{courseObj.title}</span> to{' '}
                <span className="font-semibold">{email || 'your email'}</span>.
              </p>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 text-left text-xs text-slate-600 mb-6 space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Course Selected:</span>
                  <span className="font-bold text-slate-900">{courseObj.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Program Fee:</span>
                  <span className="font-bold text-orange-600">{courseObj.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Learning Center:</span>
                  <span>{campus}</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white shadow-md transition-all bg-orange-600 hover:bg-orange-500"
              >
                Return to Course Overview
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900">
                  DigitalGhuru Admissions
                </span>
                <span className="text-xs text-slate-500">• 100% Placement Support</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                Download Syllabus & Enquire
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Receive the complete 12-module curriculum roadmap, tools checklist, and fee payment plans.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Select Digital Marketing Track
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {MARKETING_COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} — {c.price} ({c.duration.split('(')[0].trim()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Preferred Learning Mode
                    </label>
                    <select
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Anna Nagar (Chennai)">Anna Nagar Campus (Chennai)</option>
                      <option value="Korattur (Chennai)">Korattur Campus (Chennai)</option>
                      <option value="Ameerpet (Hyderabad)">Ameerpet Campus (Hyderabad)</option>
                      <option value="Live Online Interactive">Live Online Interactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Your Current Profile
                  </label>
                  <select
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="College Student / Fresh Graduate">College Student / Fresh Graduate</option>
                    <option value="Working Professional (Career Switch)">Working Professional (Career Switch)</option>
                    <option value="Entrepreneur / Business Owner">Entrepreneur / Business Owner</option>
                    <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 bg-orange-600 hover:bg-orange-500"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Syllabus & Fee Details</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    DigitalGhuru will never spam. In academic collaboration with Jaighurudeva Academy.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

