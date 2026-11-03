import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const DigitalMarketingApp = lazy(() => import('./digital-marketing/App'));
const KidsApp = lazy(() => import('./kids/App'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading DigitalGhuru...</p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Digital Marketing at root / */}
          <Route path="/" element={<DigitalMarketingApp />} />

          {/* Kids Promotional Page at /kids */}
          <Route path="/kids" element={<KidsApp />} />

          {/* Direct Aliases */}
          <Route path="/digital-marketing" element={<Navigate to="/" replace />} />
          <Route path="/digitalghuru" element={<Navigate to="/" replace />} />

          {/* 404 / Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
