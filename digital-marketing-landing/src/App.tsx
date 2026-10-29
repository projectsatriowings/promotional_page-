import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarketingCoursesShowcase } from './components/MarketingCoursesShowcase';
import { CurriculumSection } from './components/CurriculumSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { AboutUsSection } from './components/AboutUsSection';
import { StudentProjectsSection } from './components/StudentProjectsSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';

export const App: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (courseId?: string) => {
    setSelectedCourseForEnquiry(courseId);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCurriculum = () => {
    const el = document.getElementById('curriculum');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Sticky Official Navbar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main>
        {/* Hero Section */}
        <HeroSection 
          onExploreCourses={scrollToCourses}
          onViewCurriculum={scrollToCurriculum}
        />

        {/* Courses Interactive Showcase with click-to-view details */}
        <MarketingCoursesShowcase onOpenEnquiry={handleOpenEnquiry} />

        {/* 12-Module Curriculum Accordion */}
        <CurriculumSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Why Choose DigitalGhuru */}
        <WhyChooseSection onOpenEnquiry={handleOpenEnquiry} />

        {/* About DigitalGhuru & Academic Partner */}
        <AboutUsSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Student Portfolios & Real Agency Briefs */}
        <StudentProjectsSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Final Enrolment CTA */}
        <FinalCtaSection onOpenEnquiry={() => handleOpenEnquiry()} />
      </main>

      {/* Official Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Enquiry / Admissions Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        initialCourseId={selectedCourseForEnquiry}
      />
    </div>
  );
};

export default App;

