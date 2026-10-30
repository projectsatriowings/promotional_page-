import React, { useState } from 'react';
import { 
  X, Eye, EyeOff, Lock, Mail, User, Phone, CheckCircle2, 
  ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Building2, 
  GraduationCap, Calendar, BarChart3, TrendingUp
} from 'lucide-react';
import { MARKETING_COURSES } from '../data/marketingCoursesData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Registered email or student ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
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
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity"
    >
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] overflow-y-auto text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close login dialog"
          className="absolute top-5 right-5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Editorial Left Side Panel */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/brand/logo-navbar.webp" 
                alt="DigitalGhuru" 
                className="h-9 w-auto object-contain"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-500/30">
                LMS Student Portal
              </span>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight leading-snug mb-3">
              Access Your Agency Simulation Lab
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Sign in to manage live ad campaigns, submit capstone sprint deliverables, and track placement interview referrals.
            </p>

            {/* Campaign Metrics Teaser */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Live Cohort Performance
                </span>
                <span className="text-emerald-400 font-bold">Active Sprint</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Avg. Campaign ROAS</span>
                  <span className="text-lg font-black text-white">4.18x</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Placement Referrals</span>
                  <span className="text-lg font-black text-emerald-400">100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>ISO 9001:2015 Certified</span>
            <span className="text-slate-300">Jaighurudeva Academy</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Enter your credentials to continue your marketing journey.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Authentication Successful
                </h4>
                <p className="text-xs text-slate-600">
                  Redirecting to your student dashboard and campaign terminal...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Email field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Student Email / ID
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
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="student@digitalghuru.com"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <span>•</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your registered email.')}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="••••••••••••"
                      className={`w-full pl-10 pr-11 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <span>•</span> {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember me & Security */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500/20"
                    />
                    <span className="text-xs text-slate-600">Remember this device</span>
                  </label>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    256-Bit Encrypted
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Switch to Register */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-600">
                Not enrolled in a program yet?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-orange-600 hover:text-orange-700 font-bold transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Apply & Register for Next Batch
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  initialCourseId?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  initialCourseId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    courseId: initialCourseId || MARKETING_COURSES[0].id,
    campus: 'Chennai — Anna Nagar (Flagship Hub)',
    batchType: 'Weekend Cohort (Sat & Sun)',
    experienceLevel: 'Fresher / Recent Graduate',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (initialCourseId) {
      setFormData((prev) => ({ ...prev, courseId: initialCourseId }));
    }
  }, [initialCourseId]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required for batch updates';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Create a secure password (min 6 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.courseId) errs.courseId = 'Please select a program track';
    if (!formData.campus) errs.campus = 'Please choose a campus or online mode';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      setErrors({ terms: 'Please agree to the admissions and placement policy' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1400);
  };

  const selectedCourse = MARKETING_COURSES.find((c) => c.id === formData.courseId) || MARKETING_COURSES[0];

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity"
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/brand/logo-navbar.webp" 
              alt="DigitalGhuru" 
              className="h-8 w-auto object-contain"
            />
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <span className="text-xs font-bold text-slate-700 hidden sm:block">
              Candidate Onboarding Portal
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close registration dialog"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Progress Indicator */}
        <div className="bg-slate-100/70 px-6 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200] text-white shadow-xs' : 'bg-slate-300 text-slate-600'
              }`}>
                1
              </span>
              <span className={`text-xs font-semibold ${step === 1 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                Account Details
              </span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200]' : 'bg-slate-300'}`} />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200] text-white shadow-xs' : 'bg-slate-300 text-slate-600'
              }`}>
                2
              </span>
              <span className={`text-xs font-semibold ${step === 2 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                Program & Campus
              </span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200]' : 'bg-slate-300'}`} />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3 ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200] text-white shadow-xs' : 'bg-slate-300 text-slate-600'
              }`}>
                3
              </span>
              <span className={`text-xs font-semibold ${step === 3 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-8 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Enrolment Application Received!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Welcome to DigitalGhuru, <strong className="text-slate-900">{formData.fullName}</strong>. 
                Your seat application for <span className="text-orange-700 font-bold">{selectedCourse.title}</span> ({formData.campus}) has been registered.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Batch Schedule:</span>
                  <span className="text-slate-900 font-bold">{formData.batchType}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Admissions Cell Contact:</span>
                  <span className="text-emerald-700 font-bold">+91 8825948859</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Confirmation Dispatched To:</span>
                  <span className="text-slate-900 font-semibold">{formData.email}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Close & Explore Courses
              </button>
            </div>
          ) : (
            <div>
              {/* STEP 1: Account Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Create Candidate Profile</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill in your legal contact information for batch accreditation and placement records.
                    </p>
                  </div>

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
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Arun Kumar"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">• {errors.fullName}</p>}
                  </div>

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
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="arun@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
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
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1">• {errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                      />
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">• {errors.password}</p>}
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Already enrolled? <span className="text-orange-600 font-bold underline">Sign In</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-sm shadow-md cursor-pointer"
                    >
                      <span>Next: Program Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Course & Campus Selection */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Select Program Track & Campus</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose which verified DigitalGhuru program and learning venue fits your schedule.
                    </p>
                  </div>

                  {/* Course radio cards */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Choose Your Track
                    </label>
                    {MARKETING_COURSES.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setFormData({ ...formData, courseId: c.id })}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                          formData.courseId === c.id
                            ? 'bg-orange-50/70 border-orange-500 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center mt-0.5 ${
                            formData.courseId === c.id ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200] text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {c.number}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                            <p className="text-xs text-slate-500">{c.duration} • {c.badge}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-orange-700 bg-orange-100/60 px-2.5 py-1 rounded-full border border-orange-200 whitespace-nowrap ml-2">
                          {c.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Campus & Batch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Preferred Campus
                      </label>
                      <select
                        value={formData.campus}
                        onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                      >
                        <option value="Chennai — Anna Nagar (Flagship Hub)">Chennai — Anna Nagar</option>
                        <option value="Chennai — Korattur (Technology Lab)">Chennai — Korattur</option>
                        <option value="Hyderabad — Ameerpet (Executive Hub)">Hyderabad — Ameerpet</option>
                        <option value="Live Interactive Online Campus">Live Interactive Online</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Cohort Schedule
                      </label>
                      <select
                        value={formData.batchType}
                        onChange={(e) => setFormData({ ...formData, batchType: e.target.value })}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-orange-500"
                      >
                        <option value="Weekend Cohort (Sat & Sun)">Weekend Cohort (Sat & Sun)</option>
                        <option value="Weekday Morning Cohort">Weekday Morning (9 AM - 12 PM)</option>
                        <option value="Weekday Evening Cohort">Weekday Evening (6 PM - 9 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-sm shadow-md cursor-pointer"
                    >
                      <span>Next: Review & Confirm</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review & Final Confirmation */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Review Enrolment Summary</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Verify your application details before reserving your cohort seat.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-orange-700">Selected Program</span>
                        <h4 className="text-base font-black text-slate-900">{selectedCourse.title}</h4>
                      </div>
                      <span className="text-base font-black text-slate-900">{selectedCourse.price}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">Candidate:</span>
                        <span className="text-slate-900 font-semibold">{formData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Contact Phone:</span>
                        <span className="text-slate-900 font-semibold">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Campus Location:</span>
                        <span className="text-slate-900 font-semibold">{formData.campus}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Schedule:</span>
                        <span className="text-slate-900 font-semibold">{formData.batchType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptedTerms}
                        onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-orange-600 mt-0.5"
                      />
                      <span className="text-xs text-slate-700 leading-relaxed">
                        I confirm my application for DigitalGhuru's agency training program and acknowledge that the 100% placement cell support is subject to 85% attendance and capstone completion.
                      </span>
                    </label>
                    {errors.terms && <p className="text-xs text-red-500 mt-2">• {errors.terms}</p>}
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-black text-sm shadow-md shadow-orange-500/25 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Securing Seat...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Enrolment Request</span>
                          <CheckCircle2 className="w-4 h-4 text-amber-200" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
