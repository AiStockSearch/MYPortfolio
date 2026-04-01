import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";

function readFirebaseConfig(): FirebaseOptions | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID;
  const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
  if (!apiKey || !projectId || !appId || !measurementId) return null;
  const authDomain =
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? `${projectId}.firebaseapp.com`;
  const storageBucket =
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? `${projectId}.appspot.com`;
  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId,
    measurementId,
  };
}

let analyticsReady: Promise<Analytics | null> | null = null;

/**
 * Инициализирует Firebase App и возвращает Analytics (или null, если окружение не задано / не поддерживается).
 * Безопасно при HMR: повторно использует уже созданное приложение.
 */
export function initFirebaseAnalytics(): Promise<Analytics | null> {
  if (analyticsReady) return analyticsReady;
  const config = readFirebaseConfig();
  if (!config) {
    analyticsReady = Promise.resolve(null);
    return analyticsReady;
  }
  analyticsReady = (async () => {
    try {
      const app = getApps().length > 0 ? getApp() : initializeApp(config);
      if (!(await isSupported())) return null;
      return getAnalytics(app);
    } catch (err) {
      console.warn("[firebase] Analytics init failed:", err);
      return null;
    }
  })();
  return analyticsReady;
}

/** page_view для SPA (React Router). */
export async function logAnalyticsPageView(path: string) {
  const analytics = await initFirebaseAnalytics();
  if (!analytics || typeof window === "undefined") return;
  logEvent(analytics, "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

const GA_PARAM_MAX = 100;

function clipParam(value: string, max = GA_PARAM_MAX) {
  if (value.length <= max) return value;
  return value.slice(0, max - 1) + "…";
}

/**
 * Произвольное событие GA4 (имена параметров — латиница и подчёркивание, значения укорачиваются).
 */
export async function logAnalyticsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  const analytics = await initFirebaseAnalytics();
  if (!analytics) return;
  const safe: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(params ?? {})) {
    const key = clipParam(k, 40);
    if (typeof v === "boolean") safe[key] = v ? 1 : 0;
    else if (typeof v === "number" && Number.isFinite(v)) safe[key] = v;
    else safe[key] = clipParam(String(v));
  }
  logEvent(analytics, eventName, safe);
}

/** Унифицированный клик по CTA (в отчётах — событие `cta_click`). */
export async function logCtaClick(args: {
  id: string;
  location: string;
  destination: string;
  label?: string;
}) {
  await logAnalyticsEvent("cta_click", {
    cta_id: clipParam(args.id, 40),
    cta_location: clipParam(args.location),
    link_url: clipParam(args.destination),
    ...(args.label ? { cta_label: clipParam(args.label) } : {}),
  });
}

/** Fire-and-forget: удобно в onClick без await. */
export function trackCta(
  ctaId: string,
  location: string,
  destination: string,
  label?: string
) {
  void logCtaClick({ id: ctaId, location, destination, label });
}
