# DigitalGhuru — Static Course Promotional Website

A unified, high-converting static promotional web application for **Digital Ghuru** featuring two dedicated, conversion-focused landing pages.

---

## Active Routes

| Route | Course Landing Page | Target Audience |
| :--- | :--- | :--- |
| **`/digital-marketing-course`** | **Digital Marketing Course** | College students, fresh graduates, beginners, working professionals, business owners, entrepreneurs, freelancers |
| **`/4-kids-chennai`** | **4 Kids Course** | Parents, children, school students (Grades 1–12 / Ages 6–17) |
| **`/`** | Default Landing Page | Seamless redirect/entry to Digital Marketing |
| **`/kids`** | Alias Route | Redirects to `/4-kids-chennai` |
| **`/digital-marketing`** | Alias Route | Redirects to `/digital-marketing-course` |

---

## Implemented Sections Breakdown

### Page 1: Digital Marketing Course (`/digital-marketing-course`)
1. **Section 1: Hero Section** — Headline: *"Master Digital Marketing. Build Your Digital Future."*, verified course highlights, CTAs ("Explore Course", "Enquire Now"), command center hero image.
2. **Section 2: About the Course** — Two-column layout with real problem-section image, explaining what digital marketing is, its importance, and what students gain.
3. **Section 3: Who Can Join This Course?** — 7 responsive audience cards (College Students, Fresh Graduates, Beginners, Working Professionals, Business Owners, Entrepreneurs, Freelancers).
4. **Section 4: Complete Course Curriculum** — 20 modular curriculum topics with expandable details and PDF syllabus download CTA.
5. **Section 5: Practical Training and Live Projects** — Step-by-step visual learning journey (SEO lab, campaign simulation, analytics) with authentic workshop method diagrams.
6. **Section 6: Tools and Technologies** — Google Ads, GA4, Search Console, Canva, WordPress, Meta Ads Manager, ChatGPT, Zapier, Semrush.
7. **Section 7: Why Choose Digital Ghuru?** — Student-focused learning, beginner-friendly teaching, practical approach, mentor feedback, updated AI content.
8. **Section 8: Career Opportunities** — 9 career direction cards (Digital Marketing Executive, SEO Specialist, Social Media Manager, Google Ads Specialist, etc.).
9. **Section 9: Student Projects, Gallery and Mentors** — Real workshop classroom photos, interactive lightbox modal, mentor spotlights (Bala Sir, Prakash Sir, Soorya Sir).
10. **Section 10: Course Details** — Duration (3+1 Months), Mode (Classroom Chennai/Hyderabad & Online), Timings, Fees, Eligibility, Campus locations.
11. **Section 11: Student Enquiry / Admission CTA** — Call Now, WhatsApp Enquiry (+91 8825948859), Visit Centre, and static lead form directly linked to WhatsApp.
12. **Section 12: Frequently Asked Questions (FAQ)** — 10 functional accordion questions addressing all essential student queries.
13. **Section 13: Final Call to Action** — *"Your Digital Future Starts Here"* with direct WhatsApp and Call buttons.

---

### Page 2: 4 Kids Course (`/4-kids-chennai`)
1. **Section 1: Hero Section** — Headline: *"Big Dreams Start with Little Steps!"*, friendly badges, CTAs ("Explore the Programme", "Enquire for Your Child").
2. **Section 2: About the 4 Kids Programme** — Explains the programme's purpose in making children active creators rather than passive consumers.
3. **Section 3: Who Can Join?** — 4 age pathways:
   - Little Explorers (Grades 1–6 / Ages 6–10)
   - Young Innovators (Grades 7–8 / Ages 11–13)
   - Junior Tech Leaders (Grades 9–10 / Ages 14–15)
   - Future AI Creators (Grades 11–12 / Ages 16–17)
4. **Section 4: What Will Kids Learn?** — Creative AI, visual coding, prompt craft, logical thinking, robotics, and presentation skills.
5. **Section 5: Interactive and Practical Learning Activities** — Robot animation lab, digital storybook studio, team logic puzzles, and Show & Tell day.
6. **Section 6: Benefits for Children** — 8 benefit cards covering creativity, confidence, communication, math logic, and digital safety.
7. **Section 7: Why Choose Digital Ghuru for Your Child?** — Child-safe environment, 1:8 mentor-to-student ratio, regular parent progress updates.
8. **Section 8: Programme Details** — Schedule (Weekend 2-hr sessions), modes (Chennai lab & live online), fees, parent coordinator contact.
9. **Section 9: Learning Environment and Gallery** — Authentic brand banners for all 4 grade cohorts with full-resolution lightbox viewer.
10. **Section 10: Parent Testimonials** — Authentic parent reflections on their children's creative growth.
11. **Section 11: Parent Enquiry Section** — Child grade dropdown, parent name, phone, questions, and direct WhatsApp counseling launch.
12. **Section 12: Parent FAQs** — 10 accordion parent questions covering safety, batch times, and teaching style.
13. **Section 13: Final Parent CTA** — *"Let's Make Learning an Exciting Journey for Your Child!"* with instant WhatsApp and Call buttons.

---

### Shared Components
- **Navbar** (`src/shared/Navbar.tsx`):
  - Digital Ghuru logo
  - Links to Main Website (`https://digitalghuru.com/`), Digital Marketing (`/digital-marketing-course`), 4 Kids (`/4-kids-chennai`), About Us, Contact Us
  - "Enquire Now" CTA button (scrolls to current page's enquiry section)
  - Sticky header, active route pill, responsive mobile drawer
- **Footer** (`src/shared/Footer.tsx`):
  - Brand information & logo
  - Quick links
  - Course links
  - Verified contact information (+91 8825948859, admissions@digitalghuru.com, Chennai & Hyderabad campuses)
  - Social media icons (Instagram, Facebook, YouTube, LinkedIn)
  - Copyright 2026 Digital Ghuru
- **Lightbox** (`src/shared/Lightbox.tsx`):
  - Accessible image modal with ESC key dismiss and backdrop blur

---

## Commands

- **Development Server**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  ```
