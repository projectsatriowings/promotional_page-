import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './shared/Navbar';
import { Footer } from './shared/Footer';
import { ROUTES } from './routes';
import { Home, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#16130f] font-['Inter',system-ui,sans-serif]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#ee6a12] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            404 Page Not Found
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#16130f] mb-3">
            Lost in the Learning Galaxy?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has moved. Here are the main sections you can explore:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            <Link
              to={ROUTES.DM_COURSE}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ee6a12] hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ee6a12] transition-colors">
                  Digital Marketing Program
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ee6a12] transition-colors" />
              </div>
              <p className="text-[11px] text-slate-500">Comprehensive course for college students &amp; professionals</p>
            </Link>

            <Link
              to={ROUTES.KIDS_COURSE}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ee6a12] hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ee6a12] transition-colors">
                  3 Kids AI &amp; Tech Program
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ee6a12] transition-colors" />
              </div>
              <p className="text-[11px] text-slate-500">Coding, robotics &amp; AI innovation for grades 6–12</p>
            </Link>

            <Link
              to={ROUTES.DM_WORKSHOP}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ee6a12] hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ee6a12] transition-colors">
                  Digital Marketing Workshop
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ee6a12] transition-colors" />
              </div>
              <p className="text-[11px] text-slate-500">AI tools, paid ads &amp; SEO masterclass</p>
            </Link>

            <Link
              to={ROUTES.KIDS_WORKSHOP}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#ee6a12] hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#ee6a12] transition-colors">
                  3 Kids AI &amp; Tech Workshop
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ee6a12] transition-colors" />
              </div>
              <p className="text-[11px] text-slate-500">Hands-on coding &amp; robotics workshop for kids</p>
            </Link>
          </div>

          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f97c1c] to-[#e8550f] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
