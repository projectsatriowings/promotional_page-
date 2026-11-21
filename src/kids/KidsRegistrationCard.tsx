import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  MessageCircle,
  Mail,
  Smile,
  ShieldCheck,
  Users,
  Award,
  HeartHandshake,
  Lock,
  Check,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import './KidsRegistrationCard.css';

export const KIDS_REGISTRATION_CONFIG = {
  badge: 'Early bird offer · Limited seats per batch',
  title: "Reserve Your Child's Seat Today",
  meta: 'Sat, Dec 12, 2026 · 10:00 AM IST · Chennai Hub & Live Online',
  price: '₹99',
  oldPrice: '₹1,999',
  saveText: '-95%',
  countdownTarget: '2026-12-12T10:00:00+05:30',
  seatsTotal: 8,
  seatsLeft: 3,
};

export const KidsRegistrationCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isCardInView, setIsCardInView] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    parent: '',
    phone: '',
    email: '',
    child: '',
    grade: 'Grades 2–5 · Little Explorers (Scratch & AI Stories)',
    mode: 'Chennai Centre (In-Person Hands-On)',
    notes: '',
  });

  // Validation & Error states
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Countdown & Seats state
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [ticks, setTicks] = useState({ d: false, h: false, m: false, s: false });
  const prevTimeRef = useRef({ d: '00', h: '00', m: '00', s: '00' });
  const [seatsDisplay, setSeatsDisplay] = useState(KIDS_REGISTRATION_CONFIG.seatsTotal);
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  // Validate individual required field
  const isFieldValid = (field: 'parent' | 'phone' | 'email' | 'child'): boolean => {
    const val = formData[field].trim();
    if (!val) return false;
    if (field === 'phone') {
      const clean = val.replace(/\D/g, '');
      return /^[6-9]\d{9}$/.test(clean);
    }
    if (field === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    if (field === 'parent' || field === 'child') {
      return val.length >= 2;
    }
    return true;
  };

  const validCount = ['parent', 'phone', 'email', 'child'].filter((f) =>
    isFieldValid(f as 'parent' | 'phone' | 'email' | 'child')
  ).length;

  // Entrance observer for Card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardInView(true);
            observer.disconnect();

            // Animate seats count down
            let n = KIDS_REGISTRATION_CONFIG.seatsTotal;
            const step = () => {
              if (n > KIDS_REGISTRATION_CONFIG.seatsLeft) {
                n--;
                setSeatsDisplay(n);
                setTimeout(step, 180);
              }
            };
            setTimeout(step, 900);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Countdown Timer with flip animation on digit change
  useEffect(() => {
    const target = new Date(KIDS_REGISTRATION_CONFIG.countdownTarget).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      const nextTicks = {
        d: d !== prevTimeRef.current.d,
        h: h !== prevTimeRef.current.h,
        m: m !== prevTimeRef.current.m,
        s: s !== prevTimeRef.current.s,
      };

      prevTimeRef.current = { d, h, m, s };
      setTimeLeft({ d, h, m, s });
      setTicks(nextTicks);

      setTimeout(() => {
        setTicks({ d: false, h: false, m: false, s: false });
      }, 400);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trust Strip cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrustIndex((prev) => (prev + 1) % 4);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  // =========================================================================
  // ROBOT PRICE SWAP ENGINE (ONE requestAnimationFrame Loop + Physics)
  // =========================================================================
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let isDestroyed = false;
    let animFrameId: number | null = null;

    const robo = stage.querySelector<HTMLElement>('.reg-robo');
    const svg = robo?.querySelector<SVGElement>('.reg-robo__svg');
    const arm = svg?.querySelector<SVGElement>('.reg-arm');
    const legs = svg?.querySelectorAll<SVGElement>('.reg-leg');
    const eyes = svg?.querySelector<SVGElement>('.reg-eyes');
    const nail = stage.querySelector<HTMLElement>('.reg-nail');
    const shadow = stage.querySelector<HTMLElement>('.reg-gshadow');
    const bubble = stage.querySelector<HTMLElement>('.reg-bubble');
    const burst = stage.querySelector<HTMLElement>('.reg-burst');
    const oldTagEl = stage.querySelector<HTMLElement>('.reg-tag--old');
    const newTagEl = stage.querySelector<HTMLElement>('.reg-tag--new');

    if (!robo || !svg || !arm || !legs || legs.length < 2 || !eyes || !nail || !shadow || !bubble || !burst || !oldTagEl || !newTagEl) {
      return;
    }

    const roboEl = robo;
    const svgEl = svg;
    const armEl = arm;
    const leg1El = legs[0];
    const leg2El = legs[1];
    const eyesEl = eyes;
    const nailEl = nail;
    const shadowEl = shadow;
    const bubbleEl = bubble;
    const burstEl = burst;

    const H = 124;
    const GROUND = 6;
    const SH = { x: 59, y: 57 };
    const ARM = 17;
    const TOP0 = H - GROUND - 90;
    const G = 1700;
    const D2R = Math.PI / 180;
    let W = stage.clientWidth || 290;
    let PIN = { x: W - 52, y: 4 };

    interface RobotState {
      x: number;
      y: number;
      sx: number;
      sy: number;
      rot: number;
      arm: number;
      ex: number;
      walk: boolean;
      wave: boolean;
      phase: number;
      bob: number;
    }

    const R: RobotState = {
      x: 0,
      y: 0,
      sx: 1,
      sy: 1,
      rot: 0,
      arm: 25,
      ex: 0,
      walk: false,
      wave: false,
      phase: 0,
      bob: 0,
    };

    interface TagState {
      el: HTMLElement;
      mode: 'pin' | 'hand' | 'free' | 'gone';
      p: { x: number; y: number };
      v: { x: number; y: number };
      a: { x: number; y: number };
      phi: number;
      w: number;
      sw: number;
      swv: number;
      blend: number;
      fx: number;
      fy: number;
      fvx: number;
      fvy: number;
      hg: number;
      len: number;
    }

    function mkTag(el: HTMLElement): TagState {
      return {
        el,
        mode: 'pin',
        p: { x: 0, y: 0 },
        v: { x: 0, y: 0 },
        a: { x: 0, y: 0 },
        phi: 0,
        w: 0,
        sw: 0,
        swv: 0,
        blend: 1,
        fx: 0,
        fy: 0,
        fvx: 0,
        fvy: 0,
        hg: 60,
        len: 40,
      };
    }

    const OLD = mkTag(oldTagEl);
    const NEW = mkTag(newTagEl);

    interface TweenItem {
      from: Record<string, number>;
      to: Partial<RobotState>;
      dur: number;
      t: number;
      e: (p: number) => number;
      res: () => void;
    }

    const tweens: TweenItem[] = [];
    const waiters: { fn: () => boolean; res: () => void }[] = [];

    const E = {
      io: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      o: (t: number) => 1 - Math.pow(1 - t, 3),
      i: (t: number) => t * t * t,
      back: (t: number) => {
        const c = 1.7;
        return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
      },
    };

    const tw = (to: Partial<RobotState>, dur: number, e = E.io): Promise<void> =>
      new Promise((res) => {
        if (isDestroyed) {
          res();
          return;
        }
        const from: Record<string, number> = {};
        for (const k in to) {
          from[k] = (R as any)[k];
        }
        tweens.push({ from, to, dur, t: 0, e, res });
      });

    const wait = (s: number) => tw({}, s);

    const until = (fn: () => boolean): Promise<void> =>
      new Promise((res) => {
        if (isDestroyed || fn()) {
          res();
        } else {
          waiters.push({ fn, res });
        }
      });

    const say = (t: string) => {
      if (isDestroyed) return;
      bubbleEl.textContent = t;
      bubbleEl.classList.add('reg-show');
      roboEl.classList.remove('reg-talk');
      void roboEl.offsetWidth;
      roboEl.classList.add('reg-talk');
    };

    const hush = () => {
      if (isDestroyed) return;
      bubbleEl.classList.remove('reg-show');
    };

    // Hand position in stage px for robot state
    function handOf(S: Partial<RobotState> & { x: number; y: number; sx: number; sy: number; rot: number; bob?: number }, armDeg: number) {
      const th = armDeg * D2R;
      const px = SH.x + ARM * Math.sin(th);
      const py = SH.y + ARM * Math.cos(th);
      const dx = (px - 37) * S.sx;
      const dy = (py - 90) * S.sy;
      const r = S.rot * D2R;
      const c = Math.cos(r);
      const s = Math.sin(r);
      return {
        x: S.x + 37 + dx * c - dy * s,
        y: H - GROUND - S.y - (S.bob || 0) + dx * s + dy * c,
      };
    }

    // Pivot where tag hole ends up when gripped
    function pivotFrom(h: { x: number; y: number }, armDeg: number, rot: number, hg: number) {
      const t = (armDeg - rot) * D2R;
      return {
        x: h.x + hg * Math.sin(t),
        y: h.y + hg * Math.cos(t),
      };
    }

    function sparkle(x: number, y: number) {
      if (isDestroyed) return;
      burstEl.style.transform = `translate(${x}px,${y}px)`;
      burstEl.innerHTML = '';
      for (let i = 0; i < 14; i++) {
        const d = document.createElement('i');
        burstEl.appendChild(d);
        const a = (i / 14) * Math.PI * 2;
        const r = 30 + Math.random() * 22;
        d.animate(
          [
            { transform: 'translate(0,0) scale(1.2)', opacity: 1 },
            {
              transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r}px) scale(0.2)`,
              opacity: 0,
            },
          ],
          {
            duration: 650 + Math.random() * 250,
            easing: 'cubic-bezier(.2,.8,.3,1)',
            fill: 'forwards',
          }
        );
      }
    }

    function stepTag(T: TagState, dt: number, armDeg: number) {
      if (T.mode === 'gone') return;
      if (T.mode === 'free') {
        T.fvy += G * dt;
        T.fvx *= 1 - 0.15 * dt;
        T.fx += T.fvx * dt;
        T.fy += T.fvy * dt;
        T.phi += T.w * dt;
        if (T.fy > H + 500 || T.fx > W + 500) T.mode = 'gone';
        return;
      }
      const px = T.p.x;
      const py = T.p.y;
      const pphi = T.phi;

      if (T.mode === 'hand') {
        const h = handOf(R, armDeg);
        const tgt = pivotFrom(h, armDeg, R.rot, T.hg);
        const tPhi = Math.PI - (armDeg - R.rot) * D2R;
        T.swv += (-160 * T.sw - 11 * T.swv - T.a.x * 0.0016) * dt;
        T.sw += T.swv * dt;
        T.blend = Math.min(1, T.blend + dt * 6);
        const k = T.blend;
        const dphi = (((tPhi + T.sw - T.phi + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        T.phi += dphi * (k < 1 ? Math.min(1, dt * 14) : 1);
        T.p.x += (tgt.x - T.p.x) * (k < 1 ? Math.min(1, dt * 14) : 1);
        T.p.y += (tgt.y - T.p.y) * (k < 1 ? Math.min(1, dt * 14) : 1);
      } else {
        const k = Math.min(1, dt * 18);
        T.p.x += (PIN.x - T.p.x) * k;
        T.p.y += (PIN.y - T.p.y) * k;
        const acc = -(G / T.len) * Math.sin(T.phi) + (T.a.x / T.len) * Math.cos(T.phi) - 1.15 * T.w;
        T.w += acc * dt;
        T.phi += T.w * dt;
      }

      const vx = (T.p.x - px) / dt;
      const vy = (T.p.y - py) / dt;
      T.a.x += ((vx - T.v.x) / dt - T.a.x) * 0.3;
      T.a.x = Math.max(-8000, Math.min(8000, T.a.x));
      T.v.x = vx;
      T.v.y = vy;
      if (T.mode === 'hand') T.w = (T.phi - pphi) / dt;
    }

    function release(T: TagState, bx: number, by: number) {
      T.mode = 'free';
      T.fx = T.p.x;
      T.fy = T.p.y;
      T.fvx = Math.max(-200, Math.min(900, T.v.x * 0.35)) + bx;
      T.fvy = Math.max(-900, Math.min(300, T.v.y * 0.35)) + by;
      T.w = Math.max(-16, Math.min(16, T.w * 0.6));
    }

    function hangOnNail(T: TagState) {
      T.mode = 'pin';
      T.w *= 0.5;
      T.a.x = 0;
    }

    function drawTag(T: TagState) {
      const x = T.mode === 'free' ? T.fx : T.p.x;
      const y = T.mode === 'free' ? T.fy : T.p.y;
      T.el.style.transform = `translate(${x - 48}px,${y}px) rotate(${T.phi}rad)`;
      const sp = T.mode === 'free' ? Math.hypot(T.fvx, T.fvy) : 0;
      T.el.style.filter =
        sp > 600
          ? `drop-shadow(0 6px 6px rgba(0,0,0,.22)) blur(${Math.min(1.8, sp / 900)}px)`
          : '';
      T.el.style.visibility = T.mode === 'gone' ? 'hidden' : 'visible';
    }

    let last = 0;
    let clock = 0;

    function frame(now: number) {
      if (isDestroyed) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      clock += dt;

      for (let i = tweens.length - 1; i >= 0; i--) {
        const t = tweens[i];
        t.t += dt;
        const p = Math.min(1, t.t / t.dur);
        const e = t.e(p);
        for (const k in t.to) {
          (R as any)[k] = t.from[k] + ((t.to as any)[k] - t.from[k]) * e;
        }
        if (p >= 1) {
          tweens.splice(i, 1);
          t.res();
        }
      }

      for (let i = waiters.length - 1; i >= 0; i--) {
        if (waiters[i].fn()) {
          waiters[i].res();
          waiters.splice(i, 1);
        }
      }

      if (R.walk) {
        R.phase += dt * 15;
        R.bob = Math.abs(Math.sin(R.phase)) * 2.5;
      } else {
        R.phase = 0;
        R.bob *= 0.7;
      }

      const armNow = R.wave ? 150 + Math.sin(clock * 11) * 22 : R.arm;
      const top = TOP0 - R.y - R.bob;

      roboEl.style.transform = `translate(${R.x}px,${top}px)`;
      svgEl.style.transform = `rotate(${R.rot}deg) scale(${R.sx},${R.sy})`;
      armEl.setAttribute('transform', `rotate(${-armNow} ${SH.x} ${SH.y})`);

      const s1 = R.walk ? Math.max(0, Math.sin(R.phase)) * 4 : 0;
      const s2 = R.walk ? Math.max(0, -Math.sin(R.phase)) * 4 : 0;
      leg1El.setAttribute('transform', `translate(0,${-s1})`);
      leg2El.setAttribute('transform', `translate(0,${-s2})`);
      eyesEl.setAttribute('transform', `translate(${R.ex},0)`);

      shadowEl.style.transform = `translate(${R.x + 37}px,${H - GROUND + 1}px) scale(${Math.max(
        0.45,
        1 - R.y / 60
      )})`;
      shadowEl.style.opacity = String(Math.max(0.35, 1 - R.y / 80));

      bubbleEl.style.transform = `translate(${Math.max(
        0,
        Math.min(W - 150, R.x + 40)
      )}px,${top - 22}px)`;

      for (let i = 0; i < 4; i++) {
        stepTag(OLD, dt / 4, armNow);
        stepTag(NEW, dt / 4, armNow);
      }
      drawTag(OLD);
      drawTag(NEW);

      animFrameId = requestAnimationFrame(frame);
    }

    function measure() {
      OLD.hg = OLD.el.offsetHeight - 7;
      OLD.len = OLD.el.offsetHeight * 0.6;
      NEW.hg = NEW.el.offsetHeight - 7;
      NEW.len = NEW.el.offsetHeight * 0.6;
    }

    function layout() {
      if (!stage) return;
      W = stage.clientWidth || 290;
      PIN = { x: W - 52, y: 4 };
      nailEl.style.transform = `translate(${PIN.x}px,${PIN.y}px)`;
    }

    function solveHand(target: { x: number; y: number }, armDeg: number) {
      const h = handOf({ x: 0, y: 0, sx: 1, sy: 1, rot: 0 }, armDeg);
      return { x: target.x - h.x, hop: Math.max(0, h.y - target.y) };
    }

    function solvePivot(T: TagState, armDeg: number) {
      const h = handOf({ x: 0, y: 0, sx: 1, sy: 1, rot: 0 }, armDeg);
      const pv = pivotFrom(h, armDeg, 0, T.hg);
      return { x: PIN.x - pv.x, hop: Math.max(0, pv.y - PIN.y) };
    }

    function reset() {
      tweens.length = 0;
      Object.assign(R, {
        x: 0,
        y: 0,
        sx: 1,
        sy: 1,
        rot: 0,
        arm: 25,
        ex: 0,
        walk: false,
        wave: false,
      });
      Object.assign(OLD, {
        mode: 'pin' as const,
        p: { x: PIN.x, y: PIN.y - 70 },
        v: { x: 0, y: 0 },
        a: { x: 0, y: 0 },
        phi: 0.35,
        w: 0,
        sw: 0,
        swv: 0,
      });
      Object.assign(NEW, {
        mode: 'gone' as const,
        p: { ...PIN },
        v: { x: 0, y: 0 },
        a: { x: 0, y: 0 },
        phi: 0,
        w: 0,
        sw: 0,
        swv: 0,
      });
      OLD.el.style.opacity = '1';
      NEW.el.style.opacity = '1';
      NEW.el.classList.remove('reg-hung');
    }

    async function jump(h: number) {
      await tw({ sy: 0.8, sx: 1.14 }, 0.13, E.o);
      tw({ sy: 1.08, sx: 0.94 }, 0.12);
      await tw({ y: h }, Math.max(0.16, 0.1 + h / 120), E.o);
    }

    async function land() {
      tw({ sy: 1, sx: 1 }, 0.1);
      await tw({ y: 0 }, Math.max(0.15, 0.1 + R.y / 140), E.i);
      await tw({ sy: 0.82, sx: 1.14 }, 0.07, E.o);
      await tw({ sy: 1, sx: 1 }, 0.22, E.back);
    }

    async function walkTo(x: number) {
      const dir = Math.sign(x - R.x) || 1;
      const d = Math.abs(x - R.x);
      if (d < 2) return;
      R.walk = true;
      tw({ rot: 5 * dir }, 0.15);
      await tw({ x }, Math.max(0.4, d / 115), E.io);
      R.walk = false;
      await tw({ rot: 0 }, 0.25, E.back);
    }

    async function run() {
      if (isDestroyed) return;
      reset();
      measure();
      const ARMUP = 150;
      const grab = solveHand({ x: PIN.x, y: PIN.y + OLD.el.offsetHeight - 8 }, ARMUP);

      await wait(1);
      if (isDestroyed) return;
      R.ex = 2.5;
      say('₹1,999? Way too much!');
      await wait(1.6);
      if (isDestroyed) return;
      hush();

      await walkTo(grab.x);
      if (isDestroyed) return;
      tw({ arm: ARMUP }, 0.3, E.o);
      await jump(grab.hop + 2);
      if (isDestroyed) return;

      OLD.mode = 'hand';
      OLD.blend = 0;
      OLD.sw = 0;
      OLD.swv = 0;

      await land();
      if (isDestroyed) return;
      say('Bye bye! 👋');

      await walkTo(grab.x - 40);
      if (isDestroyed) return;
      await tw({ rot: -14, arm: 215 }, 0.4, E.io);
      if (isDestroyed) return;

      const swing = tw({ rot: 10, arm: 45 }, 0.2, E.i);
      await until(() => R.arm < 125);
      if (isDestroyed) return;

      release(OLD, 520, -760);
      await swing;
      if (isDestroyed) return;
      await tw({ rot: 0, arm: 20 }, 0.3, E.back);
      if (isDestroyed) return;

      await wait(0.3);
      if (isDestroyed) return;
      hush();
      R.ex = -2.5;

      // Pull new tag out from behind
      NEW.mode = 'hand';
      NEW.blend = 1;
      NEW.el.style.opacity = '0';
      await tw({ arm: -25 }, 0.3, E.io);
      if (isDestroyed) return;

      const lift = tw({ arm: ARMUP }, 0.6, E.io);
      await until(() => R.arm > 40);
      if (isDestroyed) return;

      NEW.el.style.transition = 'opacity .15s';
      NEW.el.style.opacity = '1';
      R.ex = 1.5;
      await lift;
      if (isDestroyed) return;
      NEW.el.style.transition = '';

      const hang = solvePivot(NEW, ARMUP);
      await walkTo(hang.x);
      if (isDestroyed) return;
      await jump(hang.hop + 1);
      if (isDestroyed) return;

      hangOnNail(NEW);
      NEW.el.classList.add('reg-hung');
      sparkle(PIN.x, PIN.y + 40);
      tw({ arm: 30 }, 0.3, E.o);

      await land();
      if (isDestroyed) return;
      R.ex = 2;
      say('Now just ₹99! 🎉');

      await wait(0.7);
      if (isDestroyed) return;
      await walkTo(0);
      if (isDestroyed) return;

      R.wave = true;
      await wait(2.2);
      if (isDestroyed) return;
      hush();
      R.wave = false;
      tw({ arm: 25 }, 0.3);

      await wait(6);
      if (isDestroyed) return;

      NEW.el.style.transition = 'opacity .4s';
      NEW.el.style.opacity = '0';
      await wait(0.45);
      if (isDestroyed) return;
      NEW.el.style.transition = '';
      NEW.mode = 'gone';

      run();
    }

    layout();
    reset();
    measure();

    const handleResize = () => {
      layout();
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      OLD.mode = 'gone';
      NEW.mode = 'pin';
      NEW.p = { ...PIN };
      NEW.el.classList.add('reg-hung');
      NEW.el.style.opacity = '1';
      animFrameId = requestAnimationFrame(frame);
    } else {
      animFrameId = requestAnimationFrame(frame);
      const stageObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              stageObs.disconnect();
              run();
            }
          });
        },
        { threshold: 0.3 }
      );
      stageObs.observe(stage);
    }

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Web Animations API Confetti Explosion
  const fireConfetti = () => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + 120;
    const cols = ['#f97c1c', '#e8550f', '#ffd2ad', '#22c55e', '#fff36b', '#16130f'];

    for (let i = 0; i < 90; i++) {
      const p = document.createElement('span');
      p.className = 'reg-confetti';
      p.style.background = cols[i % cols.length];
      document.body.appendChild(p);

      const a = Math.random() * Math.PI * 2;
      const v = 200 + Math.random() * 320;

      p.animate(
        [
          { transform: `translate(${cx}px,${cy}px) rotate(0)`, opacity: 1 },
          {
            transform: `translate(${cx + Math.cos(a) * v}px,${
              cy + Math.sin(a) * v * 0.6 + 400
            }px) rotate(${Math.random() * 720}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1400 + Math.random() * 900,
          easing: 'cubic-bezier(.2,.7,.4,1)',
        }
      ).onfinish = () => p.remove();
    }
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: ('parent' | 'phone' | 'email' | 'child')[] = [
      'parent',
      'phone',
      'email',
      'child',
    ];
    let firstBadField: string | null = null;
    const newErrors: Record<string, boolean> = {};

    requiredFields.forEach((field) => {
      const valid = isFieldValid(field);
      if (!valid) {
        newErrors[field] = true;
        if (!firstBadField) firstBadField = field;
      }
    });

    setFieldErrors(newErrors);

    if (firstBadField) {
      const el = document.querySelector<HTMLInputElement>(`input[name="${firstBadField}"]`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    // Send WhatsApp notification & switch to success state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      fireConfetti();

      // Open WhatsApp direct confirmation
      const phoneNum = '+918825948859';
      const msg = encodeURIComponent(
        `Hi Digital Ghuru Team,\n\nI just reserved a seat for my child in the 3 Kids AI and Tech Program at ₹99!\n\nParent: ${formData.parent}\nChild: ${formData.child}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nGrade: ${formData.grade}\nMode: ${formData.mode}\nNotes: ${formData.notes || 'None'}\n\nPlease confirm our orientation kit and schedule.`
      );
      window.open(`https://wa.me/${phoneNum.replace(/\D/g, '')}?text=${msg}`, '_blank');
    }, 1400);
  };

  const trustItems = [
    { label: '100% Kid-Safe AI', icon: ShieldCheck },
    { label: 'Max 8 Kids / Batch', icon: Users },
    { label: 'Certificate of Merit', icon: Award },
    { label: 'Chennai Mentors', icon: HeartHandshake },
  ];

  return (
    <section className="reg-sec" id="register" aria-label="Parent Registration Form">
      <div ref={cardRef} className={`reg-card ${isCardInView ? 'reg-in' : ''}`}>
        <div className="reg-card__inner">

          {/* ==============================================================
              HEADER BANNER
              ============================================================== */}
          <div className="reg-head">
            {/* 5 Floating Doodles */}
            <span className="reg-doodle" style={{ left: '4%', top: '58%', width: '26px', height: '26px', animationDelay: '0s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
              </svg>
            </span>
            <span className="reg-doodle" style={{ left: '46%', top: '8%', width: '22px', height: '22px', animationDelay: '1.2s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
              </svg>
            </span>
            <span className="reg-doodle" style={{ left: '55%', top: '62%', width: '24px', height: '24px', animationDelay: '2.4s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 22h4" />
                <path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z" />
              </svg>
            </span>
            <span className="reg-doodle" style={{ left: '30%', top: '80%', width: '20px', height: '20px', animationDelay: '3.3s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
              </svg>
            </span>
            <span className="reg-doodle" style={{ left: '70%', top: '6%', width: '22px', height: '22px', animationDelay: '0.6s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
              </svg>
            </span>

            {/* 5 Twinkling Sparkles */}
            <span className="reg-spark" style={{ left: '12%', top: '20%', animationDelay: '0s' }} />
            <span className="reg-spark" style={{ left: '38%', top: '70%', animationDelay: '0.8s' }} />
            <span className="reg-spark" style={{ left: '62%', top: '25%', animationDelay: '1.6s', width: '4px', height: '4px' }} />
            <span className="reg-spark" style={{ left: '78%', top: '75%', animationDelay: '2.2s' }} />
            <span className="reg-spark" style={{ left: '90%', top: '15%', animationDelay: '1.1s', width: '4px', height: '4px' }} />

            <div className="reg-row">
              {/* Left Column: Badge, Title, Meta */}
              <div>
                <span className="reg-badge">
                  <span className="reg-blink" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
                  </svg>
                  {KIDS_REGISTRATION_CONFIG.badge}
                </span>
                <h2 className="reg-title">{KIDS_REGISTRATION_CONFIG.title}</h2>
                <p className="reg-meta">{KIDS_REGISTRATION_CONFIG.meta}</p>
              </div>

              {/* Right Column: Physics-Based Robot Price Swap Scene */}
              <div ref={stageRef} className="reg-deal" aria-label="Price ₹99, was ₹1,999">
                {/* Nail */}
                <span className="reg-nail" />

                {/* Ground Shadow */}
                <span className="reg-gshadow" />

                {/* Speech Bubble */}
                <span className="reg-bubble" />

                {/* Old Price Tag (MRP ₹1,999) */}
                <div className="reg-tag reg-tag--old">
                  <i className="reg-str" />
                  <div className="reg-tag__body">
                    <span className="reg-tag__hole" />
                    <small>MRP</small>
                    <b>{KIDS_REGISTRATION_CONFIG.oldPrice}</b>
                  </div>
                </div>

                {/* New Price Tag (Struck-through + -95% + ₹99) */}
                <div className="reg-tag reg-tag--new">
                  <i className="reg-str" />
                  <div className="reg-tag__body">
                    <span className="reg-tag__hole" />
                    <span className="reg-tag__row">
                      <s>{KIDS_REGISTRATION_CONFIG.oldPrice}</s>
                      <em>{KIDS_REGISTRATION_CONFIG.saveText}</em>
                    </span>
                    <b>{KIDS_REGISTRATION_CONFIG.price}</b>
                  </div>
                </div>

                {/* Robot (74×90 inline SVG with rotatable arm) */}
                <div className="reg-robo">
                  <svg className="reg-robo__svg" viewBox="0 0 74 90" aria-hidden="true">
                    {/* Antenna */}
                    <line x1="37" y1="6" x2="37" y2="16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    <circle className="reg-bulb" cx="37" cy="6" r="5" fill="#ffd2ad" />

                    {/* Legs */}
                    <rect className="reg-leg reg-l1" x="25" y="76" width="8" height="12" rx="3" fill="#f3ece6" />
                    <rect className="reg-leg reg-l2" x="41" y="76" width="8" height="12" rx="3" fill="#f3ece6" />

                    {/* Head */}
                    <rect x="10" y="16" width="54" height="40" rx="14" fill="#ffffff" />
                    <rect x="17" y="23" width="40" height="24" rx="10" fill="#2b2420" />

                    {/* Mint Eyes */}
                    <g className="reg-eyes">
                      <ellipse className="reg-eye" cx="29" cy="34" rx="4" ry="5" fill="#7ef0c4" />
                      <ellipse className="reg-eye" cx="45" cy="34" rx="4" ry="5" fill="#7ef0c4" />
                    </g>

                    {/* Mouth */}
                    <rect className="reg-mouth" x="32" y="41" width="10" height="2.5" rx="1.2" fill="#7ef0c4" />

                    {/* Torso & Orange Dot */}
                    <rect x="20" y="56" width="34" height="24" rx="8" fill="#ffffff" />
                    <circle cx="37" cy="68" r="4" fill="#ee6a12" />

                    {/* Left Arm */}
                    <g transform="rotate(25 15 60)">
                      <rect x="12" y="58" width="6" height="16" rx="3" fill="#ffffff" />
                    </g>

                    {/* Right Arm (Rotated around shoulder 59, 57) */}
                    <g className="reg-arm">
                      <rect x="56" y="57" width="6" height="16" rx="3" fill="#ffffff" />
                      <circle cx="59" cy="74" r="4" fill="#ffffff" />
                    </g>
                  </svg>
                </div>

                {/* Sparkle Burst */}
                <span className="reg-burst" />
              </div>
            </div>

            {/* Bottom Strip: Seats Left + Countdown Timer */}
            <div className="reg-strip">
              <div className="reg-seats">
                <span className="reg-live" />
                <span>
                  <b>{seatsDisplay}</b> of {KIDS_REGISTRATION_CONFIG.seatsTotal} seats left this batch
                </span>
                <div className="reg-seats__bar">
                  <div
                    className="reg-seats__fill"
                    style={{
                      width: `${
                        ((KIDS_REGISTRATION_CONFIG.seatsTotal - seatsDisplay) /
                          KIDS_REGISTRATION_CONFIG.seatsTotal) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="reg-mini-cd">
                <span>Offer ends in</span>
                <b className={ticks.d ? 'reg-tick' : ''}>{timeLeft.d}</b>d{' '}
                <b className={ticks.h ? 'reg-tick' : ''}>{timeLeft.h}</b>h{' '}
                <b className={ticks.m ? 'reg-tick' : ''}>{timeLeft.m}</b>m{' '}
                <b className={ticks.s ? 'reg-tick' : ''}>{timeLeft.s}</b>s
              </div>
            </div>
          </div>

          {/* ==============================================================
              FORM BODY
              ============================================================== */}
          <div className="reg-body">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="reg-top">
                  <div>
                    <h3 className="reg-h">Parent &amp; Student Registration</h3>
                    <p className="reg-p">
                      We'll send the syllabus brochure, batch timings and kit checklist.
                    </p>
                  </div>
                  <div className="reg-prog">
                    <div className="reg-prog__bar">
                      <div
                        className="reg-prog__fill"
                        style={{ width: `${(validCount / 4) * 100}%` }}
                      />
                    </div>
                    <span>{validCount}/4 done</span>
                  </div>
                </div>

                <div className="reg-grid">
                  {/* Field 1: Parent Name */}
                  <div className="reg-f" style={{ '--i': 0 } as React.CSSProperties}>
                    <label>
                      Parent / Guardian Name <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${
                        isFieldValid('parent') ? 'reg-valid' : fieldErrors.parent ? 'reg-bad' : ''
                      }`}
                    >
                      <User className="reg-ic" />
                      <input
                        type="text"
                        name="parent"
                        required
                        minLength={2}
                        placeholder="e.g. Sangeetha Kumar"
                        value={formData.parent}
                        onChange={(e) => {
                          setFormData({ ...formData, parent: e.target.value });
                          if (fieldErrors.parent) {
                            setFieldErrors({ ...fieldErrors, parent: false });
                          }
                        }}
                      />
                      <span className="reg-ok">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  </div>

                  {/* Field 2: Phone */}
                  <div className="reg-f" style={{ '--i': 1 } as React.CSSProperties}>
                    <label>
                      WhatsApp Mobile Number <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${
                        isFieldValid('phone') ? 'reg-valid' : fieldErrors.phone ? 'reg-bad' : ''
                      }`}
                    >
                      <MessageCircle className="reg-ic" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: val });
                          if (fieldErrors.phone) {
                            setFieldErrors({ ...fieldErrors, phone: false });
                          }
                        }}
                      />
                      <span className="reg-ok">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  </div>

                  {/* Field 3: Email */}
                  <div className="reg-f" style={{ '--i': 2 } as React.CSSProperties}>
                    <label>
                      Email Address <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${
                        isFieldValid('email') ? 'reg-valid' : fieldErrors.email ? 'reg-bad' : ''
                      }`}
                    >
                      <Mail className="reg-ic" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (fieldErrors.email) {
                            setFieldErrors({ ...fieldErrors, email: false });
                          }
                        }}
                      />
                      <span className="reg-ok">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  </div>

                  {/* Field 4: Child's Name */}
                  <div className="reg-f" style={{ '--i': 3 } as React.CSSProperties}>
                    <label>
                      Child's Name <i>*</i>
                    </label>
                    <div
                      className={`reg-box ${
                        isFieldValid('child') ? 'reg-valid' : fieldErrors.child ? 'reg-bad' : ''
                      }`}
                    >
                      <Smile className="reg-ic" />
                      <input
                        type="text"
                        name="child"
                        required
                        minLength={2}
                        placeholder="e.g. Aarav"
                        value={formData.child}
                        onChange={(e) => {
                          setFormData({ ...formData, child: e.target.value });
                          if (fieldErrors.child) {
                            setFieldErrors({ ...fieldErrors, child: false });
                          }
                        }}
                      />
                      <span className="reg-ok">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  </div>

                  {/* Field 5: Grade Pathway */}
                  <div className="reg-f" style={{ '--i': 4 } as React.CSSProperties}>
                    <label>Age / Grade Pathway</label>
                    <div className="reg-box reg-sel">
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      >
                        <option value="Grades 2–5 · Little Explorers (Scratch & AI Stories)">
                          Grades 2–5 · Little Explorers (Scratch &amp; AI Stories)
                        </option>
                        <option value="Grades 6–8 · AI Innovators (Games, Python & Robotics)">
                          Grades 6–8 · AI Innovators (Games, Python &amp; Robotics)
                        </option>
                        <option value="Grades 9–12 · Future Leaders (AI Projects & Entrepreneurship)">
                          Grades 9–12 · Future Leaders (AI Projects &amp; Entrepreneurship)
                        </option>
                      </select>
                      <ChevronDown className="reg-chev" />
                    </div>
                  </div>

                  {/* Field 6: Learning Mode */}
                  <div className="reg-f" style={{ '--i': 5 } as React.CSSProperties}>
                    <label>Preferred Learning Mode</label>
                    <div className="reg-box reg-sel">
                      <select
                        name="mode"
                        value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      >
                        <option value="Chennai Centre (In-Person Hands-On)">
                          Chennai Centre (In-Person Hands-On)
                        </option>
                        <option value="Live Online (Zoom)">Live Online (Zoom)</option>
                      </select>
                      <ChevronDown className="reg-chev" />
                    </div>
                  </div>

                  {/* Field 7: Specific Interests / Questions (Optional) */}
                  <div className="reg-f reg-f--full" style={{ '--i': 6 } as React.CSSProperties}>
                    <label>
                      Any specific interests or questions? <small>(Optional)</small>
                    </label>
                    <div className="reg-box">
                      <textarea
                        name="notes"
                        placeholder="e.g. My child has tried Scratch before / Does the robotics kit come with the course?"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Trust Strip */}
                <div className="reg-trust reg-f" style={{ '--i': 7 } as React.CSSProperties}>
                  {trustItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={idx === activeTrustIndex ? 'reg-hi' : ''}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action CTA */}
                <div className="reg-act reg-f" style={{ '--i': 8 } as React.CSSProperties}>
                  <button
                    type="submit"
                    className={`reg-btn ${isSubmitting ? 'reg-btn--loading reg-loading' : ''}`}
                    aria-label={`Reserve Seat for ${KIDS_REGISTRATION_CONFIG.price}`}
                  >
                    <span className="reg-btn__label">
                      Reserve Seat for <span className="reg-btn__price">{KIDS_REGISTRATION_CONFIG.price}</span>
                      <span className="reg-btn__arrow">→</span>
                    </span>
                    <span className="reg-btn__spinner" />
                  </button>

                  <span className="reg-safe">
                    <Lock />
                    <span>Your details are private and never shared.</span>
                  </span>
                </div>
              </form>
            ) : (
              <div className="reg-done reg-show">
                <div className="reg-done__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>Seat Reserved! 🎉</h3>
                <p>We've sent the curriculum kit and batch schedule to your WhatsApp &amp; email.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default KidsRegistrationCard;
