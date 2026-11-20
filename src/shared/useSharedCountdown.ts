import { useCallback, useSyncExternalStore } from 'react';

export const COUNTDOWN_STORAGE_KEY_DM = 'dg_timer_deadline_dm';
export const COUNTDOWN_STORAGE_KEY_KIDS = 'dg_timer_deadline_kids';
export const COUNTDOWN_STORAGE_KEY_WORKSHOP = 'dg_timer_deadline_workshop';
const DEFAULT_DURATION_MINUTES = 15;

export interface CountdownState {
  minutes: number;
  seconds: number;
  formattedMin: string;
  formattedSec: string;
  totalSeconds: number;
  isExpired: boolean;
}

export type CourseCategory = 'dm' | 'kids' | 'workshop';

// Clean up any stale legacy countdowns from previous sessions in localStorage
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('dg_counselling_offer_deadline');
    localStorage.removeItem('dg_counselling_offer_deadline_dm');
    localStorage.removeItem('dg_counselling_offer_deadline_kids');
    localStorage.removeItem('dg_counselling_offer_deadline_workshop');
    localStorage.removeItem(COUNTDOWN_STORAGE_KEY_DM);
    localStorage.removeItem(COUNTDOWN_STORAGE_KEY_KIDS);
    localStorage.removeItem(COUNTDOWN_STORAGE_KEY_WORKSHOP);
  } catch {}
}

export function resolveCategory(category?: string): CourseCategory {
  if (category) {
    const lower = category.toLowerCase();
    if (lower.includes('workshop')) {
      return 'workshop';
    }
    if (lower.includes('kid') || lower.includes('children')) {
      return 'kids';
    }
    return 'dm';
  }
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('workshop')) {
      return 'workshop';
    }
    if (path.includes('kids') || path.includes('4-kids')) {
      return 'kids';
    }
  }
  return 'dm';
}

// Internal singleton countdown manager per category
class CountdownManager {
  private category: CourseCategory;
  private storageKey: string;
  private targetTime: number;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<() => void>();
  private currentSnapshot: CountdownState;

  constructor(category: CourseCategory) {
    this.category = category;
    this.storageKey =
      category === 'workshop'
        ? COUNTDOWN_STORAGE_KEY_WORKSHOP
        : category === 'kids'
        ? COUNTDOWN_STORAGE_KEY_KIDS
        : COUNTDOWN_STORAGE_KEY_DM;
    this.targetTime = this.initTargetTime();
    this.currentSnapshot = this.computeSnapshot();
    this.startTimer();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKey && e.newValue) {
          const parsed = parseInt(e.newValue, 10);
          if (!isNaN(parsed) && parsed !== this.targetTime) {
            this.targetTime = parsed;
            this.tick();
          }
        }
      });
    }
  }

  private initTargetTime(): number {
    try {
      // Use sessionStorage so the timer lives only during the active browsing session
      const stored = sessionStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > Date.now()) {
          return parsed;
        }
      }
      // Fresh 15-minute deadline for this individual category started when this page is opened
      const newDeadline = Date.now() + DEFAULT_DURATION_MINUTES * 60 * 1000;
      sessionStorage.setItem(this.storageKey, String(newDeadline));
      return newDeadline;
    } catch {
      return Date.now() + DEFAULT_DURATION_MINUTES * 60 * 1000;
    }
  }

  private computeSnapshot(): CountdownState {
    const now = Date.now();
    let diffMs = this.targetTime - now;

    // When countdown completes and passes 00:00, automatically reset to 15:00 (900 seconds)
    if (diffMs <= 0) {
      this.targetTime = now + DEFAULT_DURATION_MINUTES * 60 * 1000;
      try {
        sessionStorage.setItem(this.storageKey, String(this.targetTime));
      } catch {}
      diffMs = this.targetTime - now;
    }

    // Ceil ensures starting exactly at 900 seconds (15:00) rather than losing 1 second on start
    const totalSeconds = Math.min(
      DEFAULT_DURATION_MINUTES * 60,
      Math.max(0, Math.ceil(diffMs / 1000))
    );
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
      minutes,
      seconds,
      formattedMin: String(minutes).padStart(2, '0'),
      formattedSec: String(seconds).padStart(2, '0'),
      totalSeconds,
      isExpired: false,
    };
  }

  private tick = () => {
    const nextSnapshot = this.computeSnapshot();

    // Only notify listeners if seconds or expiration status actually changed
    if (
      nextSnapshot.totalSeconds !== this.currentSnapshot.totalSeconds ||
      nextSnapshot.isExpired !== this.currentSnapshot.isExpired
    ) {
      this.currentSnapshot = nextSnapshot;
      this.listeners.forEach((listener) => listener());
    }
  };

  private startTimer() {
    if (!this.timerId) {
      this.timerId = setInterval(this.tick, 1000);
    }
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    // Ensure timer is always running
    if (!this.timerId) {
      this.startTimer();
    }
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot = (): CountdownState => {
    return this.currentSnapshot;
  };

  public reset = (durationMinutes: number = DEFAULT_DURATION_MINUTES) => {
    this.targetTime = Date.now() + durationMinutes * 60 * 1000;
    try {
      sessionStorage.setItem(this.storageKey, String(this.targetTime));
    } catch {}
    this.currentSnapshot = this.computeSnapshot();
    this.listeners.forEach((listener) => listener());
  };

  public setDeadline = (newTime: number | Date) => {
    const target = typeof newTime === 'number' ? newTime : newTime.getTime();
    this.targetTime = target;
    try {
      sessionStorage.setItem(this.storageKey, String(target));
    } catch {}

    this.currentSnapshot = this.computeSnapshot();
    if (!this.currentSnapshot.isExpired) {
      this.startTimer();
    }
    this.listeners.forEach((listener) => listener());
  };
}

// Lazy manager map: each course timer is only instantiated when that course is actually visited/opened
const managers = new Map<CourseCategory, CountdownManager>();

export function getCountdownManager(category?: string): CountdownManager {
  const cat = resolveCategory(category);
  let manager = managers.get(cat);
  if (!manager) {
    manager = new CountdownManager(cat);
    managers.set(cat, manager);
  }
  return manager;
}

/**
 * When moved out of the website (closing tab/window or navigating away),
 * wipe all timers so each timer resets to 15 minutes when re-entering.
 */
if (typeof window !== 'undefined') {
  const resetAllOnExit = () => {
    try {
      sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY_DM);
      sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY_KIDS);
      sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY_WORKSHOP);
      localStorage.removeItem(COUNTDOWN_STORAGE_KEY_DM);
      localStorage.removeItem(COUNTDOWN_STORAGE_KEY_KIDS);
      localStorage.removeItem(COUNTDOWN_STORAGE_KEY_WORKSHOP);
      localStorage.removeItem('dg_counselling_offer_deadline');
      localStorage.removeItem('dg_counselling_offer_deadline_dm');
      localStorage.removeItem('dg_counselling_offer_deadline_kids');
      localStorage.removeItem('dg_counselling_offer_deadline_workshop');
    } catch {}
    managers.clear();
  };

  window.addEventListener('beforeunload', resetAllOnExit);
  window.addEventListener('pagehide', resetAllOnExit);
}

/**
 * Custom hook providing a synchronized countdown state across
 * Counselling Popup, In-page Contact Card, and Sticky Footer for a specific course/category.
 */
export function useSharedCountdown(category?: CourseCategory | string): CountdownState {
  const cat = resolveCategory(category);
  const manager = getCountdownManager(cat);

  const subscribe = useCallback(
    (onStoreChange: () => void) => manager.subscribe(onStoreChange),
    [manager]
  );
  const getSnapshot = useCallback(() => manager.getSnapshot(), [manager]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/**
 * Set a custom offer deadline across all components for a specific course category.
 */
export function setSharedCountdownDeadline(newDeadline: number | Date, category?: string): void {
  const manager = getCountdownManager(category);
  manager.setDeadline(newDeadline);
}

/**
 * Reset the shared countdown back to 15 minutes (or custom minutes) for a specific course category.
 */
export function resetSharedCountdown(durationMinutes?: number, category?: string): void {
  const manager = getCountdownManager(category);
  manager.reset(durationMinutes);
}

/**
 * Reset all 3 timers back to 15 minutes.
 */
export function resetAllCountdowns(durationMinutes: number = DEFAULT_DURATION_MINUTES): void {
  managers.forEach((m) => m.reset(durationMinutes));
  try {
    sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY_DM);
    sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY_KIDS);
    sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY_WORKSHOP);
  } catch {}
  managers.clear();
}

export default useSharedCountdown;
