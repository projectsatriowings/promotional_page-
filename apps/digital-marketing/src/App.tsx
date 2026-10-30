import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarketingCoursesShowcase } from './components/MarketingCoursesShowcase';
import { CampaignShowcaseSection } from './components/CampaignShowcaseSection';
import { LearningJourneySection } from './components/LearningJourneySection';
import { CurriculumSection } from './components/CurriculumSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { AboutUsSection } from './components/AboutUsSection';
import { StudentProjectsSection } from './components/StudentProjectsSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { LoginModal, RegisterModal } from './components/AuthModals';

export const App: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<string | undefined>(undefined);
  
  // Auth Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased selection:bg-orange-600 selection:text-white">
      {/* Sticky Clean Light Navbar */}
      <Navbar 
        onOpenEnquiry={handleOpenEnquiry}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <main>
        {/* Hero Section: Clean Editorial Marketing Command Center */}
        <HeroSection 
          onExploreCourses={scrollToCourses}
          onViewCurriculum={scrollToCurriculum}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Advanced Courses Editorial Showcase */}
        <MarketingCoursesShowcase onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 4: Interactive Campaign Showcase & Agency Simulator */}
        <CampaignShowcaseSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Section 6: Digital Marketing Learning Journey & Roadmap */}
        <LearningJourneySection onOpenEnquiry={handleOpenEnquiry} />

        {/* 12-Module Comprehensive Curriculum Accordion */}
        <CurriculumSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Why Choose DigitalGhuru (Agency Standards & Stats) */}
        <WhyChooseSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Student Capstone Portfolios & Agency Briefs */}
        <StudentProjectsSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* About DigitalGhuru & Academic Partner Jaighurudeva */}
        <AboutUsSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Final Conversion Enrolment CTA */}
        <FinalCtaSection onOpenEnquiry={() => handleOpenEnquiry()} />
      </main>

      {/* Official Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Enquiry / Admissions Lead Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        initialCourseId={selectedCourseForEnquiry}
      />

      {/* Section 8: Interactive Authentication (Login Modal) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      {/* Section 9: Candidate Onboarding Portal (Multi-Step Registration Modal) */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        initialCourseId={selectedCourseForEnquiry}
      />
    </div>
  );
};

export default App;
