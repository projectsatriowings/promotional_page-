import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { InteractiveRobot, type RobotMood } from './InteractiveRobot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedAge, setSelectedAge] = useState('Ages 6–8 (Early Explorers)');
  const [parentConsent, setParentConsent] = useState(false);
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Determine robot mood based on focused field and states
  let robotMood: RobotMood = 'idle';
  if (isSuccess) {
    robotMood = 'celebrating';
  } else if (focusedField === 'password' || focusedField === 'confirmPassword') {
    robotMood = showPassword ? 'tracking' : 'covering-eyes';
  } else if (focusedField === 'email' || focusedField === 'name') {
    robotMood = 'tracking';
  }

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-stone-200' };
    if (pass.length < 6) return { score: 1, label: 'Needs more characters (min 6)', color: 'bg-rose-500' };
    const hasNum = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    if (hasNum && hasSpecial && pass.length >= 8) {
      return { score: 3, label: 'Super Strong & Safe! 🌟', color: 'bg-emerald-500' };
    }
    return { score: 2, label: 'Good password 👍', color: 'bg-amber-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (mode === 'register') {
      if (!fullName) {
        setErrorMessage('Please provide your name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (!parentConsent) {
        setErrorMessage('Please confirm parental consent to create a junior account.');
        return;
      }
    }

    setIsLoading(true);

    // Simulated authentic authentication flow
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-stone-200 overflow-hidden transform transition-all duration-300 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Playful Ribbon */}
        <div className="h-3 bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Header with Robot Mascot */}
          <div className="text-center mb-6">
            <div className="inline-block relative">
              <InteractiveRobot 
                mood={robotMood}
                pointerPos={focusedField === 'email' ? { x: -0.4, y: 0.5 } : { x: 0, y: 0.2 }}
                size="sm"
                className="mx-auto mb-2"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-1">
              <img 
                src="/brand/favicon.svg" 
                alt="DigitalGhuru Icon" 
                className="w-5 h-5 object-contain"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                DigitalGhuru AI Kids Portal
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'Welcome Back, Explorer!' : 'Start Your AI Adventure'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login' 
                ? 'Sign in to access your coding labs, lessons & project badges' 
                : 'Create your junior learner profile with parent guidance'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-stone-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register Junior Account
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Notification */}
          {isSuccess && (
            <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-sm text-emerald-800 font-bold animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{mode === 'login' ? 'Sign in successful! Entering lab...' : 'Account registered! Welcome aboard!'}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name for Registration */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student / Parent Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Age Pathway Selector for Registration */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Age Group Pathway
                </label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                >
                  <option value="Ages 6–8 (Early Explorers)">Ages 6–8 (Early Explorers — ₹8,000)</option>
                  <option value="Ages 9–10 (AI Innovators)">Ages 9–10 (AI Innovators — ₹10,000)</option>
                  <option value="Ages 11–12 (AI Young Leaders)">Ages 11–12 (AI Young Leaders — ₹12,000)</option>
                </select>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Parent / Guardian Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="parent@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('A reset link has been sent to your registered email.')}
                    className="text-[11px] font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator for Registration */}
              {mode === 'register' && password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.score >= 1 ? strength.color : 'bg-transparent'} w-1/3 transition-all`} />
                    <div className={`h-full ${strength.score >= 2 ? strength.color : 'bg-transparent'} w-1/3 transition-all`} />
                    <div className={`h-full ${strength.score >= 3 ? strength.color : 'bg-transparent'} w-1/3 transition-all`} />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{strength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password for Registration */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Parental Consent Checkbox for Registration */}
            {mode === 'register' && (
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={parentConsent}
                  onChange={(e) => setParentConsent(e.target.checked)}
                  className="mt-0.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-[11px] text-slate-600 leading-tight">
                  I am a parent or guardian and give permission for my child to participate in DigitalGhuru AI for Kids educational activities.
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                <span>Success! Redirecting...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Student Lab' : 'Create Junior Profile'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footnote */}
          <div className="mt-6 pt-4 border-t border-stone-100 text-center text-[11px] text-slate-400">
            Protected by DigitalGhuru Responsible AI & Child Safety Guidelines
          </div>

        </div>
      </div>
    </div>
  );
};
