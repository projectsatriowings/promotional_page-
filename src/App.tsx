import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoursesShowcase } from './components/CoursesShowcase';
import { WhySection } from './components/WhySection';
import { AboutUsSection } from './components/AboutUsSection';
import { StudentGallerySection } from './components/StudentGallerySection';
import { ParentTrustSection } from './components/ParentTrustSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';

export function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCourseId, setEnquiryCourseId] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (courseId?: string) => {
    setEnquiryCourseId(courseId);
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

  const scrollToAboutUs = () => {
    const el = document.getElementById('about-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 antialiased selection:bg-orange-600 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section — AI for Kids */}
        <HeroSection
          onExploreCourses={scrollToCourses}
          onDiscoverAbout={scrollToAboutUs}
        />

        {/* 2. Four AI Kids Courses — Main Promotional Section */}
        <CoursesShowcase onOpenEnquiry={handleOpenEnquiry} />

        {/* 3. Why Choose DigitalGhuru Section */}
        <WhySection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 4. About DigitalGhuru Section */}
        <AboutUsSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 5. Learning Experience / Student Deliverables */}
        <StudentGallerySection onOpenEnquiry={handleOpenEnquiry} />

        {/* 6. Parent Trust & Safeguards */}
        <ParentTrustSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 7. Final Call to Action */}
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
      />

      {/* Admissions & Syllabus Request Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        initialCourseId={enquiryCourseId}
      />
    </div>
  );
}

export default App;
