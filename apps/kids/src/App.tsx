import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoursesShowcase } from './components/CoursesShowcase';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhySection } from './components/WhySection';
import { AboutUsSection } from './components/AboutUsSection';
import { StudentGallerySection } from './components/StudentGallerySection';
import { ParentTrustSection } from './components/ParentTrustSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { AuthModal } from './components/AuthModal';

export function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCourseId, setEnquiryCourseId] = useState<string | undefined>(undefined);

  // Auth modal state (Login & Registration)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleOpenEnquiry = (courseId?: string) => {
    setEnquiryCourseId(courseId);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAboutUs = () => {
    const el = document.getElementById('about-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 antialiased selection:bg-orange-600 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar 
        onOpenEnquiry={handleOpenEnquiry}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section — Playful AI Motion Lab */}
        <HeroSection
          onExploreCourses={scrollToCourses}
          onDiscoverAbout={scrollToAboutUs}
          onDiscoverHowItWorks={scrollToHowItWorks}
        />

        {/* 2. Three AI Kids Courses — Showcase with 3D Tilt & Hidden/Hover CTAs */}
        <CoursesShowcase onOpenEnquiry={handleOpenEnquiry} />

        {/* 3. Interactive Learning Journey (How Kids Learn AI) */}
        <HowItWorksSection
          onExploreCourses={scrollToCourses}
          onOpenEnquiry={() => handleOpenEnquiry()}
        />

        {/* 4. Why Choose DigitalGhuru Section */}
        <WhySection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 5. About DigitalGhuru & Jaighurudeva Academy */}
        <AboutUsSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 6. Learning Experience / Student Deliverables */}
        <StudentGallerySection onOpenEnquiry={handleOpenEnquiry} />

        {/* 7. Parent Trust & Safeguards */}
        <ParentTrustSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 8. Final Call to Action */}
        <FinalCtaSection
          onOpenEnquiry={() => handleOpenEnquiry()}
          onExploreCourses={scrollToCourses}
        />
      </main>

      {/* Official Branded Footer */}
      <Footer
        onSelectCourse={(courseId) => {
          scrollToCourses();
          handleOpenEnquiry(courseId);
        }}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenAuth={handleOpenAuth}
      />

      {/* Admissions & Syllabus Request Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        initialCourseId={enquiryCourseId}
      />

      {/* Dedicated Child & Parent Portal (Sign In & Registration) with Interactive Mascot */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        initialMode={authMode}
      />
    </div>
  );
}

export default App;
