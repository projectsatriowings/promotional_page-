import { useSyncExternalStore } from 'react';

export const COUNTDOWN_STORAGE_KEY = 'dg_counselling_offer_deadline';
const DEFAULT_DURATION_MINUTES = 15;

export interface CountdownState {
  minutes: number;
  seconds: number;
  formattedMin: string;
  formattedSec: string;
  totalSeconds: number;
  isExpired: boolean;
}

// Internal singleton countdown manager
class CountdownManager {
  private targetTime: number;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<() => void>();
  private currentSnapshot: CountdownState;

  constructor() {
    this.targetTime = this.initTargetTime();
    this.currentSnapshot = this.computeSnapshot();
    this.startTimer();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === COUNTDOWN_STORAGE_KEY && e.newValue) {
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
      const stored = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > Date.now()) {
          return parsed;
        }
      }
      const newDeadline = Date.now() + DEFAULT_DURATION_MINUTES * 60 * 1000;
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(newDeadline));
      return newDeadline;
    } catch {
      return Date.now() + DEFAULT_DURATION_MINUTES * 60 * 1000;
    }
  }

  private computeSnapshot(): CountdownState {
    const now = Date.now();
    let diffMs = this.targetTime - now;

    // When countdown completes and passes 00:00, automatically reset to 15:00 (900 seconds)
    if (diffMs < 0) {
      this.targetTime = now + DEFAULT_DURATION_MINUTES * 60 * 1000;
      try {
        localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(this.targetTime));
      } catch {}
      diffMs = this.targetTime - now;
    }

    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
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
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(this.targetTime));
    } catch {}
    this.currentSnapshot = this.computeSnapshot();
    this.listeners.forEach((listener) => listener());
  };

  public setDeadline = (newTime: number | Date) => {
    const target = typeof newTime === 'number' ? newTime : newTime.getTime();
    this.targetTime = target;
    try {
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(target));
    } catch {}

    this.currentSnapshot = this.computeSnapshot();
    if (!this.currentSnapshot.isExpired) {
      this.startTimer();
    }
    this.listeners.forEach((listener) => listener());
  };
}

// Single instance shared across all components and pages
const countdownManager = new CountdownManager();

/**
 * Custom hook providing a synchronized countdown state across
 * Counselling Popup, In-page Contact Card, and Sticky Footer.
 */
export function useSharedCountdown(): CountdownState {
  return useSyncExternalStore(
    countdownManager.subscribe,
    countdownManager.getSnapshot,
    countdownManager.getSnapshot
  );
}

/**
 * Set a custom offer deadline across all components.
 */
export function setSharedCountdownDeadline(newDeadline: number | Date): void {
  countdownManager.setDeadline(newDeadline);
}

/**
 * Reset the shared countdown back to 15 minutes (or custom minutes).
 */
export function resetSharedCountdown(durationMinutes?: number): void {
  countdownManager.reset(durationMinutes);
}

export default useSharedCountdown;
