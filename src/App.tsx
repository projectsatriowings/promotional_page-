import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './routes';

const DigitalMarketingCoursePage = lazy(() => import('./digital-marketing/DigitalMarketingCoursePage'));
const KidsCoursePage = lazy(() => import('./kids/KidsCoursePage'));
const KidsWorkshopPage = lazy(() => import('./workshop/KidsWorkshopPage'));
const WorkshopPage = lazy(() => import('./workshop/WorkshopPage'));
const DigitalMarketingWorkshopPage = lazy(() => import('./workshop/DigitalMarketingWorkshopPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

function RouteWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic SEO titles per route
    if (pathname === ROUTES.DM_WORKSHOP || pathname === ROUTES.DM_WORKSHOP_ALIAS) {
      document.title = 'AI-Powered Digital Marketing Masterclass · Digital Ghuru Webinar';
    } else if (pathname === ROUTES.KIDS_WORKSHOP || pathname === '/workshop/kids' || pathname === '/workshop/4-kids') {
      document.title = '3 Kids AI and Tech Program — Coding, Robotics & Creative AI for Kids | Chennai';
    } else if (pathname === ROUTES.KIDS_COURSE || pathname === ROUTES.KIDS_ALIAS) {
      document.title = 'Digital Ghuru 4 Kids — Creative AI & Technology Program | Chennai';
    } else {
      document.title = 'Digital Ghuru — Master Digital Marketing Course | Build Your Digital Future';
    }
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <>
      <RouteWatcher />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading Digital Ghuru...</p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* PAGE 1: Digital Marketing COURSE Page (Original) */}
          <Route path={ROUTES.DM_COURSE} element={<DigitalMarketingCoursePage />} />

          {/* PAGE 2: 3 Kids AI & Tech Program COURSE Page (Original Restored) */}
          <Route path={ROUTES.KIDS_COURSE} element={<KidsCoursePage />} />
          <Route path={ROUTES.KIDS_ALIAS} element={<Navigate to={ROUTES.KIDS_COURSE} replace />} />

          {/* PAGE 3: Digital Marketing WORKSHOP Page */}
          <Route path={ROUTES.DM_WORKSHOP} element={<DigitalMarketingWorkshopPage />} />
          <Route path={ROUTES.DM_WORKSHOP_ALIAS} element={<Navigate to={ROUTES.DM_WORKSHOP} replace />} />

          {/* PAGE 4: 3 Kids AI & Tech WORKSHOP Page */}
          <Route path={ROUTES.KIDS_WORKSHOP} element={<KidsWorkshopPage />} />
          <Route path="/workshop/kids" element={<Navigate to={ROUTES.KIDS_WORKSHOP} replace />} />
          <Route path="/workshop/4-kids" element={<Navigate to={ROUTES.KIDS_WORKSHOP} replace />} />

          {/* Redirect Old Workshop Overview Paths to Digital Marketing Workshop */}
          <Route path={ROUTES.WORKSHOP} element={<Navigate to={ROUTES.DM_WORKSHOP} replace />} />
          <Route path={ROUTES.WORKSHOPS} element={<Navigate to={ROUTES.DM_WORKSHOP} replace />} />

          {/* Root Default & Aliases */}
          <Route path={ROUTES.HOME} element={<DigitalMarketingCoursePage />} />
          <Route path="/digitalghuru" element={<Navigate to={ROUTES.DM_COURSE} replace />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
