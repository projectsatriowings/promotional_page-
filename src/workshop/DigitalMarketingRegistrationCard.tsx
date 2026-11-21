import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  MessageCircle,
  Mail,
  MapPin,
  Briefcase,
  Target,
  MessageSquare,
  Sparkles,
  Video,
  Languages,
  Laptop,
  Award,
  Lock,
  Check,
  ArrowRight,
} from 'lucide-react';
import './DigitalMarketingRegistrationCard.css';

export const DM_REGISTRATION_CONFIG = {
  badge: 'EARLY BIRD OFFER · LIVE WEBINAR',
  title: 'Reserve Your Seat Today',
  meta: 'Wed, Dec 9, 2026 · 7:00 PM IST · Live on Zoom · Tamil',
  price: '₹99',
  oldPrice: '₹1,999',
  saveText: 'SAVE 95%',
  countdownTarget: '2026-12-09T19:00:00+05:30',
  seatsTotal: 10,
  seatsLeft: 3,
};

export const DigitalMarketingRegistrationCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardInView, setIsCardInView] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    role: 'Working Professional',
    goal: 'Grow my business',
    learnTopic: '',
  });

  // Validation & Error states
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Countdown & Seats state
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [ticks, setTicks] = useState({ d: false, h: false, m: false, s: false });
  const prevTimeRef = useRef({ d: '00', h: '00', m: '00', s: '00' });
  const [seatsDisplay, setSeatsDisplay] = useState(DM_REGISTRATION_CONFIG.seatsTotal);
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  // Validate individual required field
  const isFieldValid = (field: 'name' | 'phone' | 'email' | 'city'): boolean => {
    const val = formData[field].trim();
    if (!val) return false;
    if (field === 'phone') {
      const clean = val.replace(/\D/g, '');
      return /^[6-9]\d{9}$/.test(clean);
    }
    if (field === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    if (field === 'name') {
      return val.length >= 2;
    }
    if (field === 'city') {
      return val.length >= 2;
    }
    return true;
  };

  const validCount = ['name', 'phone', 'email', 'city'].filter((f) =>
    isFieldValid(f as 'name' | 'phone' | 'email' | 'city')
  ).length;

  // Entrance observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardInView(true);
            observer.disconnect();

            // Animate seats count down
            let n = DM_REGISTRATION_CONFIG.seatsTotal;
            const step = () => {
              if (n > DM_REGISTRATION_CONFIG.seatsLeft) {
                n--;
                setSeatsDisplay(n);
                setTimeout(step, 180);
              }
            };
            setTimeout(step, 900);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Countdown timer with digit flip effect
  useEffect(() => {
    const target = new Date(DM_REGISTRATION_CONFIG.countdownTarget).getTime();
    const pad = (n: number) => String(n).padStart(2, '0');

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
      const h = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
      const m = pad(Math.floor((diff / (1000 * 60)) % 60));
      const s = pad(Math.floor((diff / 1000) % 60));

      const newTicks = {
        d: d !== prevTimeRef.current.d,
        h: h !== prevTimeRef.current.h,
        m: m !== prevTimeRef.current.m,
        s: s !== prevTimeRef.current.s,
      };

      prevTimeRef.current = { d, h, m, s };
      setTicks(newTicks);
      setTimeLeft({ d, h, m, s });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trust Strip highlighting loop (every 1.6s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrustIndex((prev) => (prev + 1) % 4);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  // Fire confetti on successful reservation
  const fireConfetti = () => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + 140;

    const colors = ['#f97c1c', '#e8550f', '#ffd2ad', '#22c55e', '#fff36b', '#16130f'];

    for (let i = 0; i < 90; i++) {
      const p = document.createElement('span');
      p.className = 'reg-confetti';
      p.style.background = colors[i % colors.length];
      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 320;
      const destX = cx + Math.cos(angle) * velocity;
      const destY = cy + Math.sin(angle) * velocity * 0.6 + 400;

      p.animate(
        [
          { transform: `translate(${cx}px, ${cy}px) rotate(0deg)`, opacity: 1 },
          { transform: `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
        ],
        {
          duration: 1400 + Math.random() * 900,
          easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)',
        }
      ).onfinish = () => p.remove();
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, boolean> = {
      name: !isFieldValid('name'),
      phone: !isFieldValid('phone'),
      email: !isFieldValid('email'),
      city: !isFieldValid('city'),
    };

    setFieldErrors(errors);

    const firstInvalid = ['name', 'phone', 'email', 'city'].find((k) => errors[k]);
    if (firstInvalid) {
      const el = document.querySelector<HTMLInputElement>(`input[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate backend / payment verification then show success
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      fireConfetti();

      // Trigger background mailto
      try {
        const subject = encodeURIComponent(`Digital Marketing Webinar Registration - ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nWhatsApp: ${formData.phone}\nEmail: ${formData.email}\nCity: ${formData.city}\nRole: ${formData.role}\nGoal: ${formData.goal}\nLearn: ${formData.learnTopic || 'N/A'}\nFee: ${DM_REGISTRATION_CONFIG.price}`
        );
        const link = document.createElement('a');
        link.href = `mailto:admissions@digitalghuru.com?subject=${subject}&body=${body}`;
        link.target = '_blank';
      } catch {}
    }, 1300);
  };

  return (
    <section className="reg-sec" id="register" aria-label="Webinar Registration">
      <div ref={cardRef} className={`reg-card ${isCardInView ? 'reg-in' : ''}`}>
        <div className="reg-inner">

          {/* ---------- 2. ORANGE HEADER ---------- */}
          <div className="reg-head">
            {/* 5 Twinkling Sparkles */}
            <span className="reg-spark" style={{ left: '12%', top: '20%', animationDelay: '0s' }} />
            <span className="reg-spark" style={{ left: '38%', top: '70%', animationDelay: '0.8s' }} />
            <span className="reg-spark" style={{ left: '62%', top: '25%', animationDelay: '1.6s', width: 4, height: 4 }} />
            <span className="reg-spark" style={{ left: '78%', top: '75%', animationDelay: '2.2s' }} />
            <span className="reg-spark" style={{ left: '90%', top: '15%', animationDelay: '1.1s', width: 4, height: 4 }} />

            <div className="reg-row">
              <div>
                <span className="reg-badge">
                  <span className="reg-blink" />
                  <Sparkles className="w-3.5 h-3.5" />
                  {DM_REGISTRATION_CONFIG.badge}
                </span>
                <h2 className="reg-title">{DM_REGISTRATION_CONFIG.title}</h2>
                <p className="reg-meta">{DM_REGISTRATION_CONFIG.meta}</p>
              </div>

              <div className="reg-price">
                <span className="reg-old">{DM_REGISTRATION_CONFIG.oldPrice}</span>
                <span className="reg-now">{DM_REGISTRATION_CONFIG.price}</span>
                <span className="reg-save">{DM_REGISTRATION_CONFIG.saveText}</span>
              </div>
            </div>

            {/* Bottom seats & countdown strip */}
            <div className="reg-strip">
              <div className="reg-seats">
                <span className="reg-live" />
                <span>
                  <b className="reg-seats__left">{seatsDisplay}</b> of {DM_REGISTRATION_CONFIG.seatsTotal} early bird seats left
                </span>
                <div className="reg-seats__bar">
                  <div
                    className="reg-seats__fill"
                    style={{
                      width: `${((DM_REGISTRATION_CONFIG.seatsTotal - seatsDisplay) / DM_REGISTRATION_CONFIG.seatsTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="reg-mini-cd">
                <span>Offer ends in</span>
                <b key={`d-${timeLeft.d}`} className={ticks.d ? 'reg-tick' : ''}>
                  {timeLeft.d}
                </b>
                <span>d</span>
                <b key={`h-${timeLeft.h}`} className={ticks.h ? 'reg-tick' : ''}>
                  {timeLeft.h}
                </b>
                <span>h</span>
                <b key={`m-${timeLeft.m}`} className={ticks.m ? 'reg-tick' : ''}>
                  {timeLeft.m}
                </b>
                <span>m</span>
                <b key={`s-${timeLeft.s}`} className={ticks.s ? 'reg-tick' : ''}>
                  {timeLeft.s}
                </b>
                <span>s</span>
              </div>
            </div>
          </div>

          {/* ---------- 3. FORM BODY ---------- */}
          <div className="reg-body">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} noValidate>
                {/* Form Header with Progress Tracker */}
                <div className="reg-top">
                  <div>
                    <h3 className="reg-h">Workshop Registration</h3>
                    <p className="reg-p">We'll send the Zoom link and reminders on WhatsApp and email.</p>
                  </div>
                  <div className="reg-prog">
                    <div className="reg-prog__bar">
                      <div
                        className="reg-prog__fill"
                        style={{ width: `${(validCount / 4) * 100}%` }}
                      />
                    </div>
                    <span className="reg-prog__txt">{validCount}/4 done</span>
                  </div>
                </div>

                <div className="reg-grid">
                  {/* Field 1: Full Name * */}
                  <div className="reg-f" style={{ '--i': 0 } as React.CSSProperties}>
                    <label>
                      Full Name <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${isFieldValid('name') ? 'reg-valid' : ''} ${fieldErrors.name ? 'reg-bad' : ''}`}
                    >
                      <User className="reg-ic" />
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Karthik Raj"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: false });
                        }}
                      />
                      <span className="reg-ok">
                        <Check />
                      </span>
                    </div>
                  </div>

                  {/* Field 2: WhatsApp Mobile Number * */}
                  <div className="reg-f" style={{ '--i': 1 } as React.CSSProperties}>
                    <label>
                      WhatsApp Mobile Number <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${isFieldValid('phone') ? 'reg-valid' : ''} ${fieldErrors.phone ? 'reg-bad' : ''}`}
                    >
                      <MessageCircle className="reg-ic" />
                      <input
                        name="phone"
                        type="tel"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: digitsOnly });
                          if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: false });
                        }}
                      />
                      <span className="reg-ok">
                        <Check />
                      </span>
                    </div>
                  </div>

                  {/* Field 3: Email Address * */}
                  <div className="reg-f" style={{ '--i': 2 } as React.CSSProperties}>
                    <label>
                      Email Address <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${isFieldValid('email') ? 'reg-valid' : ''} ${fieldErrors.email ? 'reg-bad' : ''}`}
                    >
                      <Mail className="reg-ic" />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: false });
                        }}
                      />
                      <span className="reg-ok">
                        <Check />
                      </span>
                    </div>
                  </div>

                  {/* Field 4: City * */}
                  <div className="reg-f" style={{ '--i': 3 } as React.CSSProperties}>
                    <label>
                      City <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${isFieldValid('city') ? 'reg-valid' : ''} ${fieldErrors.city ? 'reg-bad' : ''}`}
                    >
                      <MapPin className="reg-ic" />
                      <input
                        name="city"
                        type="text"
                        required
                        placeholder="e.g. Chennai"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (fieldErrors.city) setFieldErrors({ ...fieldErrors, city: false });
                        }}
                      />
                      <span className="reg-ok">
                        <Check />
                      </span>
                    </div>
                  </div>

                  {/* Field 5: I am a… */}
                  <div className="reg-f" style={{ '--i': 4 } as React.CSSProperties}>
                    <label>I am a…</label>
                    <div className="reg-box reg-sel">
                      <Briefcase className="reg-ic" />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="College Student">College Student</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Job Seeker">Job Seeker</option>
                      </select>
                      <svg
                        className="reg-chev"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {/* Field 6: Main goal */}
                  <div className="reg-f" style={{ '--i': 5 } as React.CSSProperties}>
                    <label>Main goal</label>
                    <div className="reg-box reg-sel">
                      <Target className="reg-ic" />
                      <select
                        name="goal"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      >
                        <option value="Grow my business">Grow my business</option>
                        <option value="Get a marketing job">Get a marketing job</option>
                        <option value="Start freelancing">Start freelancing</option>
                        <option value="Learn AI tools for marketing">Learn AI tools for marketing</option>
                      </select>
                      <svg
                        className="reg-chev"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {/* Field 7: What do you want to learn most? (Optional, full width) */}
                  <div className="reg-f reg-f--full" style={{ '--i': 6 } as React.CSSProperties}>
                    <label>
                      What do you want to learn most? <small>(Optional)</small>
                    </label>
                    <div className="reg-box">
                      <MessageSquare className="reg-ic" />
                      <textarea
                        name="learnTopic"
                        rows={2}
                        placeholder="e.g. How to run Instagram ads for my boutique"
                        value={formData.learnTopic}
                        onChange={(e) => setFormData({ ...formData, learnTopic: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* ---------- 4. TRUST STRIP ---------- */}
                <div className="reg-trust reg-f" style={{ '--i': 7 } as React.CSSProperties}>
                  <div className={`reg-trust-item ${activeTrustIndex === 0 ? 'reg-hi' : ''}`}>
                    <Video />
                    <span>Live on Zoom</span>
                  </div>
                  <div className={`reg-trust-item ${activeTrustIndex === 1 ? 'reg-hi' : ''}`}>
                    <Languages />
                    <span>Taught in Tamil</span>
                  </div>
                  <div className={`reg-trust-item ${activeTrustIndex === 2 ? 'reg-hi' : ''}`}>
                    <Laptop />
                    <span>Hands-on Practice</span>
                  </div>
                  <div className={`reg-trust-item ${activeTrustIndex === 3 ? 'reg-hi' : ''}`}>
                    <Award />
                    <span>Certificate Included</span>
                  </div>
                </div>

                {/* ---------- 5. SUBMIT ROW ---------- */}
                <div className="reg-act reg-f" style={{ '--i': 8 } as React.CSSProperties}>
                  <button
                    type="submit"
                    className={`reg-btn ${isSubmitting ? 'reg-btn--loading reg-loading' : ''}`}
                    aria-label={`Reserve Seat for ${DM_REGISTRATION_CONFIG.price}`}
                  >
                    <span className="reg-btn__label">
                      Reserve Seat for <span className="reg-btn__price">{DM_REGISTRATION_CONFIG.price}</span>
                      <span className="reg-btn__arrow">→</span>
                    </span>
                    <span className="reg-btn__spinner" />
                  </button>

                  <span className="reg-safe">
                    <Lock className="w-3.5 h-3.5" />
                    Your details are private and never shared.
                  </span>
                </div>
              </form>
            ) : (
              /* ---------- 6. SUCCESS STATE ---------- */
              <div className="reg-done">
                <div className="reg-done__ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>You're In! 🎉</h3>
                <p>
                  We've sent the Zoom meeting link and prep sheet to{' '}
                  <strong className="text-slate-900">{formData.phone}</strong> and{' '}
                  <strong className="text-slate-900">{formData.email}</strong>.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/918825948859?text=${encodeURIComponent(
                      `Hello Digital Ghuru! I have registered for the Digital Marketing Masterclass.\nName: ${formData.name}\nPhone: ${formData.phone}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm on WhatsApp Instantly</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingRegistrationCard;
