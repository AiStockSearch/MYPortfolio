import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logAnalyticsPageView } from "../lib/firebaseAnalytics";

/** Отправляет page_view в Firebase / GA4 при смене маршрута. */
export default function AnalyticsRouteListener() {
  const location = useLocation();
  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    void logAnalyticsPageView(path);
  }, [location.pathname, location.search, location.hash]);
  return null;
}
