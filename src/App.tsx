import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const DigitalMarketingCoursePage = lazy(() => import('./digital-marketing/DigitalMarketingCoursePage'));
const KidsCoursePage = lazy(() => import('./kids/KidsCoursePage'));

function RouteWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic SEO titles per route
    if (pathname.includes('4-kids') || pathname.includes('kids')) {
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
          {/* Main Requested Route 1: Digital Marketing Course */}
          <Route path="/digital-marketing-course" element={<DigitalMarketingCoursePage />} />

          {/* Main Requested Route 2: 4 Kids Course (both /4-kids-chennai and /kids directly show the Kids course) */}
          <Route path="/4-kids-chennai" element={<KidsCoursePage />} />
          <Route path="/kids" element={<KidsCoursePage />} />

          {/* Root Default & Aliases */}
          <Route path="/" element={<DigitalMarketingCoursePage />} />
          <Route path="/digital-marketing" element={<Navigate to="/digital-marketing-course" replace />} />
          <Route path="/digitalghuru" element={<Navigate to="/digital-marketing-course" replace />} />

          {/* Fallback to Digital Marketing Course */}
          <Route path="*" element={<Navigate to="/digital-marketing-course" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
