import React, { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles, Calendar, User, Mail, MessageSquare } from 'lucide-react';
import { COURSES } from '../data/coursesData';

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
    initialCourseId || COURSES[0].id
  );
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredCampus, setPreferredCampus] = useState('Online Cohort');
  const [inquiryType, setInquiryType] = useState('course-syllabus');
  const [notes, setNotes] = useState('');
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

  const activeCourseObj = COURSES.find((c) => c.id === selectedCourse) || COURSES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all max-h-[92vh] overflow-y-auto">
        {/* Header decoration bar */}
        <div
          className="h-2 w-full transition-colors duration-300"
          style={{ backgroundColor: activeCourseObj.accent.hex }}
        />

        {/* Close Button */}
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
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 text-white shadow-lg bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200]"
              >
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Enquiry Received!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                Thank you, <strong className="text-slate-800">{parentName || 'Parent'}</strong>. 
                DigitalGhuru's academic advisor will share the verified syllabus framework and cohort timetable for{' '}
                <span className="font-semibold text-slate-900">{activeCourseObj.title}</span> to{' '}
                <span className="font-semibold">{email || 'your email'}</span> within 24 business hours.
              </p>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 text-left text-xs text-slate-600 mb-6 space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Course Track:</span>
                  <span className="font-bold text-slate-900">{activeCourseObj.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Target Grade:</span>
                  <span>{activeCourseObj.gradeBadge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Official Course Fee:</span>
                  <span className="font-bold text-orange-600">{activeCourseObj.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Delivery Preference:</span>
                  <span>{preferredCampus}</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white shadow-md transition-all bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105"
              >
                Return to DigitalGhuru AI Tracks
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: activeCourseObj.accent.lightHex,
                    color: activeCourseObj.accent.hex,
                  }}
                >
                  DigitalGhuru Academic Admissions
                </span>
                <span className="text-xs text-slate-500">• {activeCourseObj.price}</span>
              </div>

              <h2 id="modal-title" className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                Request Syllabus & Cohort Schedule
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Receive the complete curriculum roadmap, project deliverables, and upcoming term dates.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Select AI Super Kids Track
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.gradeBadge}: {c.title} ({c.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Parent / Guardian Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Email */}
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
                        placeholder="parent@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Campus Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Campus / Learning Mode
                    </label>
                    <div className="relative">
                      <select
                        value={preferredCampus}
                        onChange={(e) => setPreferredCampus(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Online Cohort">Live Online Interactive Cohort</option>
                        <option value="Anna Nagar Campus (Chennai)">Anna Nagar Campus (Chennai)</option>
                        <option value="Korattur Campus (Chennai)">Korattur Campus (Chennai)</option>
                        <option value="Ameerpet Campus (Hyderabad)">Ameerpet Campus (Hyderabad)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Inquiry Type Radio */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Information Requested
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        inquiryType === 'course-syllabus'
                          ? 'border-orange-600 bg-orange-50 font-semibold text-orange-950'
                          : 'border-stone-200 text-slate-600 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value="course-syllabus"
                        checked={inquiryType === 'course-syllabus'}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="sr-only"
                      />
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>Full Syllabus & Modules</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        inquiryType === 'consultation'
                          ? 'border-orange-600 bg-orange-50 font-semibold text-orange-950'
                          : 'border-stone-200 text-slate-600 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value="consultation"
                        checked={inquiryType === 'consultation'}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="sr-only"
                      />
                      <Sparkles className="w-4 h-4 text-orange-600" />
                      <span>Free Academic Consultation</span>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Child's School, Grade & Interests (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. In Grade 8, curious about robotics and AI game design..."
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105"
                  >
                    <Send className="w-4 h-4" />
                    Submit Admissions Enquiry
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    DigitalGhuru adheres to strict privacy ethics. In collaboration with Jaighurudeva Academy.
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
