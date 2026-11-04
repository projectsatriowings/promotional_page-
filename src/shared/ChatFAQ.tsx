import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
  followUps?: string[];
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'What is digital marketing?',
    answer:
      'Digital marketing is the practice of promoting products, brands, or services using internet channels such as search engines (Google), social media platforms (Instagram, Facebook, LinkedIn), email, and websites to connect with prospective customers.',
    followUps: ['Can beginners join this course?', 'What tools will I learn?'],
  },
  {
    question: 'Can beginners join this course?',
    answer:
      'Yes, absolutely! The course is structured from fundamental concepts to advanced practical strategies. No prior coding, web development, or marketing knowledge is required.',
    followUps: ['What topics are covered?', 'How long is the course?'],
  },
  {
    question: 'What topics are covered?',
    answer:
      'The curriculum covers 20 comprehensive modules including SEO, Keyword Research, Technical SEO, Meta Ads, Google Ads (SEM), Content Creation, Email Marketing, GA4 Analytics, AI Prompt Craft, and Full-Funnel Campaign Planning.',
    followUps: ['What tools will I learn?', 'Is practical training included?'],
  },
  {
    question: 'How long is the course?',
    answer:
      'The core training spans 3 months of comprehensive classroom/online sessions, followed by 1 month of dedicated live project work and portfolio building.',
    followUps: ['Is classroom training available?', 'What are the course fees?'],
  },
  {
    question: 'Is practical training included?',
    answer:
      'Yes! Over 70% of the course is hands-on. Students work on actual campaign setup simulations, SEO audits, live website builds on WordPress, and ad creative designs.',
    followUps: ['What tools will I learn?', 'Can beginners join this course?'],
  },
  {
    question: 'What tools will I learn?',
    answer:
      'You will learn Google Ads, GA4, Google Search Console, Meta Ads Manager, Canva, WordPress, ChatGPT for marketing copy, Zapier for automation, and keyword research tools.',
    followUps: ['Is practical training included?', 'What topics are covered?'],
  },
  {
    question: 'Is classroom training available?',
    answer:
      'Yes! We conduct offline classroom training at our modern campus in Chennai (with sessions in Hyderabad), as well as interactive live online batches for remote learners.',
    followUps: ['Where is Digital Ghuru located?', 'What are the course fees?'],
  },
  {
    question: 'What are the course fees?',
    answer:
      'Our course fees are structured transparently with flexible installment and scholarship options. Contact our admissions desk through the enquiry form or WhatsApp for current batch fee details.',
    followUps: ['How can I enquire?', 'How long is the course?'],
  },
  {
    question: 'How can I enquire?',
    answer:
      'You can submit the enquiry form on this page, chat with our admissions team directly via WhatsApp (+91 8825948859), or call our course centre directly.',
    followUps: ['What are the course fees?', 'Where is Digital Ghuru located?'],
  },
  {
    question: 'Where is Digital Ghuru located?',
    answer:
      'Digital Ghuru learning centres are located in Chennai and Hyderabad, conducted in partnership with Jaighurudeva Academy. Campus visits are welcomed during working hours.',
    followUps: ['Is classroom training available?', 'How can I enquire?'],
  },
];

interface ChatMessage {
  id: string;
  sender: 'student' | 'bot';
  text: string;
  questionIndex?: number;
  isTyping?: boolean;
  followUps?: string[];
  timestamp: string;
}

export interface ChatFAQProps {
  id?: string;
  badge?: string;
  heading?: string;
  highlight?: string;
  subtitle?: string;
  botName?: string;
  botStatus?: string;
  welcome?: string;
  inputHint?: string;
  ctaText?: string;
  theme?: 'default' | 'kids';
  faqs?: FaqItem[];
  onCtaClick?: () => void;
  onTalkToCounsellor?: () => void;
}

export const ChatFAQ: React.FC<ChatFAQProps> = ({
  id = 'faq',
  badge = 'Frequently Asked Questions',
  heading = 'Ask Us Anything',
  highlight = 'Anything',
  subtitle = 'Tap a question to get an instant answer about admissions, course structure and tools.',
  botName = 'Digital Ghuru Admissions',
  botStatus = 'Online · replies instantly',
  welcome = "Hi! I'm here to help. Pick any question on the left and I'll answer it right here.",
  inputHint = 'Choose a question from the list…',
  ctaText = 'Still have questions? Talk to a counsellor →',
  theme = 'default',
  faqs = DEFAULT_FAQS,
  onCtaClick,
  onTalkToCounsellor,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const chatCardRef = useRef<HTMLDivElement | null>(null);
  const messageLogRef = useRef<HTMLDivElement | null>(null);

  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [askedIndices, setAskedIndices] = useState<Set<number>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedMsgId, setHighlightedMsgId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const welcomeAnimatedRef = useRef(false);

  // Avatar initials (e.g. "DG" from "Digital Ghuru Admissions" or "Digital Ghuru Academic Mentor")
  const avatarInitials =
    botName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || 'DG';

  // Handle CTA trigger
  const handleCta = useCallback(() => {
    if (onCtaClick) {
      onCtaClick();
    } else if (onTalkToCounsellor) {
      onTalkToCounsellor();
    } else {
      const targetId = theme === 'kids' ? 'enquiry-kids' : 'enquiry';
      const el = document.getElementById(targetId) || document.getElementById('enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onCtaClick, onTalkToCounsellor, theme]);

  // Auto-scroll chat log to bottom
  const scrollToBottom = useCallback(() => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTo({
        top: messageLogRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  // Section entry observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredView(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Welcome message entry animation with typewriter effect
  useEffect(() => {
    if (!hasEnteredView || welcomeAnimatedRef.current) return;
    welcomeAnimatedRef.current = true;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const welcomeText = welcome;

    if (isReduced) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: welcomeText,
          timestamp: 'Just now',
        },
      ]);
      return;
    }

    // Step 1: Show typing dots after card rises (350ms)
    const timer1 = setTimeout(() => {
      setMessages([
        {
          id: 'welcome-typing',
          sender: 'bot',
          text: '',
          isTyping: true,
          timestamp: 'Just now',
        },
      ]);
      scrollToBottom();

      // Step 2: Replace with typewriter text
      const timer2 = setTimeout(() => {
        const welcomeId = 'welcome-1';
        setMessages([
          {
            id: welcomeId,
            sender: 'bot',
            text: '',
            timestamp: 'Just now',
          },
        ]);

        const duration = Math.min(1000, Math.max(500, welcomeText.length * 12));
        const startTime = performance.now();

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentLen = Math.max(1, Math.round(progress * welcomeText.length));
          const currentText = welcomeText.slice(0, currentLen);

          setMessages([
            {
              id: welcomeId,
              sender: 'bot',
              text: currentText,
              timestamp: 'Just now',
            },
          ]);
          scrollToBottom();

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      }, 550);

      return () => clearTimeout(timer2);
    }, 350);

    return () => clearTimeout(timer1);
  }, [hasEnteredView, scrollToBottom, welcome]);

  // Handle asking a question
  const handleAskQuestion = useCallback(
    (index: number) => {
      if (isTyping) return;

      const item = faqs[index];
      if (!item) return;

      // On mobile, scroll chat window into view
      if (window.innerWidth <= 640 && chatCardRef.current) {
        chatCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // If already asked, scroll to that message and highlight it
      if (askedIndices.has(index)) {
        const existingBotMsg = messages.find(
          (m) => m.sender === 'bot' && m.questionIndex === index
        );
        if (existingBotMsg) {
          setHighlightedMsgId(existingBotMsg.id);
          const el = document.getElementById(`chat-msg-${existingBotMsg.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          setTimeout(() => setHighlightedMsgId(null), 1800);
        }
        return;
      }

      // Mark as asked
      setAskedIndices((prev) => new Set(prev).add(index));

      // 1. Add user / parent message (350ms pop-in via CSS)
      const studentMsgId = `student-${Date.now()}`;
      const studentMsg: ChatMessage = {
        id: studentMsgId,
        sender: 'student',
        text: item.question,
        questionIndex: index,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, studentMsg]);
      setIsTyping(true);

      setTimeout(() => {
        scrollToBottom();
      }, 40);

      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Immediate display if reduced motion
      if (isReduced) {
        const botMsgId = `bot-${Date.now()}`;
        const botMsg: ChatMessage = {
          id: botMsgId,
          sender: 'bot',
          text: item.answer,
          questionIndex: index,
          followUps: item.followUps,
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        setTimeout(scrollToBottom, 40);
        return;
      }

      // 2. Typing indicator appears after 300ms
      setTimeout(() => {
        const typingId = `typing-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          {
            id: typingId,
            sender: 'bot',
            text: '',
            isTyping: true,
            timestamp: 'Just now',
          },
        ]);
        scrollToBottom();

        // 3. Typing bubble turns into answer after 900ms total (300ms + 600ms)
        setTimeout(() => {
          const botMsgId = `bot-${Date.now()}`;
          const fullAnswer = item.answer;
          const totalDuration = Math.min(1500, fullAnswer.length * 15);
          const startTime = performance.now();

          // Replace typing bubble with empty bot message
          setMessages((prev) => [
            ...prev.filter((m) => !m.isTyping),
            {
              id: botMsgId,
              sender: 'bot',
              text: '',
              questionIndex: index,
              timestamp: 'Just now',
            },
          ]);

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);
            const currentLen = Math.max(1, Math.round(progress * fullAnswer.length));
            const currentText = fullAnswer.slice(0, currentLen);

            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: currentText } : m))
            );
            scrollToBottom();

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId
                    ? { ...m, text: fullAnswer, followUps: item.followUps }
                    : m
                )
              );
              setIsTyping(false);
              scrollToBottom();
            }
          };

          requestAnimationFrame(step);
        }, 600);
      }, 300);
    },
    [isTyping, faqs, askedIndices, messages, scrollToBottom]
  );

  // Handle follow up chip click (supports exact match, keyword lookup, or CTA action)
  const handleFollowUpClick = (questionText: string) => {
    const qLower = questionText.toLowerCase();

    // If it's a CTA action like "Talk to an Academic Mentor →"
    if (
      qLower.includes('talk to') ||
      qLower.includes('mentor') ||
      qLower.includes('counsellor') ||
      qLower.includes('counselor')
    ) {
      handleCta();
      return;
    }

    // 1. Direct exact or lowercase match
    let matchIdx = faqs.findIndex(
      (f) => f.question.toLowerCase() === qLower
    );

    // 2. Specific intelligent grade/topic routing
    if (matchIdx === -1) {
      if (qLower.includes('6–8') || qLower.includes('6-8')) {
        matchIdx = faqs.findIndex((f) => f.question.includes('6–8') || f.question.includes('6-8'));
      } else if (qLower.includes('9–10') || qLower.includes('9-10')) {
        matchIdx = faqs.findIndex((f) => f.question.includes('9–10') || f.question.includes('9-10'));
      } else if (qLower.includes('11–12') || qLower.includes('11-12')) {
        matchIdx = faqs.findIndex((f) => f.question.includes('11–12') || f.question.includes('11-12'));
      } else if (qLower.includes('where') && (qLower.includes('class') || qLower.includes('held') || qLower.includes('conduct'))) {
        matchIdx = faqs.findIndex((f) => f.question.toLowerCase().includes('where'));
      } else if (qLower.includes('enroll') || qLower.includes('enrol')) {
        matchIdx = faqs.findIndex((f) => f.question.toLowerCase().includes('enroll') || f.question.toLowerCase().includes('speak'));
      } else if (qLower.includes('build') || qLower.includes('show') || qLower.includes('deliverable')) {
        matchIdx = faqs.findIndex((f) => f.question.toLowerCase().includes('show') || f.question.toLowerCase().includes('build'));
      } else if (qLower.includes('timing') || qLower.includes('schedule') || qLower.includes('days')) {
        matchIdx = faqs.findIndex((f) => f.question.toLowerCase().includes('timing') || f.question.toLowerCase().includes('days'));
      } else if (qLower.includes('prereq') || qLower.includes('prior') || qLower.includes('coding')) {
        matchIdx = faqs.findIndex((f) => f.question.toLowerCase().includes('prereq') || f.question.toLowerCase().includes('prior'));
      }
    }

    // 3. Fallback: Word overlap scoring
    if (matchIdx === -1) {
      const qWords = qLower.replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((w) => w.length > 2);
      let bestScore = 0;
      let bestIdx = -1;

      faqs.forEach((faq, fIdx) => {
        const fText = faq.question.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        let score = 0;
        qWords.forEach((word) => {
          if (fText.includes(word)) score += 2;
        });
        if (score > bestScore) {
          bestScore = score;
          bestIdx = fIdx;
        }
      });

      if (bestScore > 0) {
        matchIdx = bestIdx;
      }
    }

    if (matchIdx !== -1) {
      handleAskQuestion(matchIdx);
    } else {
      handleCta();
    }
  };

  // Filter chips based on search query
  const filteredFaqs = faqs
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Handle Search Submit / Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredFaqs.length > 0) {
      handleAskQuestion(filteredFaqs[0].originalIndex);
      setSearchQuery('');
    }
  };

  // Render Heading with Highlight Gradient Text
  const renderHeading = () => {
    if (highlight && heading.includes(highlight)) {
      const parts = heading.split(highlight);
      return (
        <h2 className="faq-main-heading">
          {parts[0]}
          <span className="faq-gradient-text">{highlight}</span>
          {parts.slice(1).join(highlight)}
        </h2>
      );
    }
    return <h2 className="faq-main-heading">{heading}</h2>;
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      data-theme={theme}
      className={`faq-chat-section-wrapper chat-faq ${hasEnteredView ? 'faq-in-view' : ''}`}
    >
      {/* ================= SEO Structured Data (JSON-LD) ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* ================= Visually Hidden Q&A for Web Crawlers & Screen Readers ================= */}
      <div className="sr-only">
        <h2>{heading}</h2>
        <dl>
          {faqs.map((faq, i) => (
            <div key={`seo-faq-${i}`}>
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="faq-container">
        {/* ================= 1. SECTION HEADER (CENTERED) ================= */}
        <div className="faq-header-centered">
          <div className="faq-badge-wrap">
            <span className="faq-pill-badge">{badge}</span>
          </div>
          {renderHeading()}
          <p className="faq-subtitle">{subtitle}</p>
        </div>

        {/* ================= 2. SPLIT LAYOUT ================= */}
        <div className="faq-chat-grid">
          {/* ================= LEFT: QUESTION CHIPS ================= */}
          <div className="faq-left-col">
            <div className="faq-chips-label">Popular Questions</div>

            <div className="faq-chips-scroll-container">
              <div className="faq-chips-list">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => {
                    const idx = faq.originalIndex;
                    const isAsked = askedIndices.has(idx);

                    return (
                      <button
                        key={`chip-${idx}`}
                        type="button"
                        disabled={isTyping}
                        onClick={() => handleAskQuestion(idx)}
                        className={`faq-chip-btn ${isAsked ? 'is-asked' : ''}`}
                        aria-label={`Ask: ${faq.question}${isAsked ? ' (Already asked)' : ''}`}
                      >
                        <span className="faq-chip-text">{faq.question}</span>
                        {isAsked ? (
                          <span className="faq-chip-asked-tag">Asked</span>
                        ) : (
                          <span className="faq-chip-arrow" aria-hidden="true">
                            →
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="faq-no-results">
                    No matching questions. Try searching a different keyword.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom link: Talk to a mentor / counsellor */}
            <div className="faq-counsellor-link-wrap">
              <button
                type="button"
                onClick={handleCta}
                className="faq-counsellor-link"
              >
                {ctaText}
              </button>
            </div>
          </div>

          {/* ================= RIGHT: CHAT WINDOW ================= */}
          <div ref={chatCardRef} className="faq-chat-card">
            {/* Header bar */}
            <div className="faq-chat-header">
              <div className="faq-avatar-wrap">
                <div className="faq-avatar-circle">{avatarInitials}</div>
                <div className="faq-online-indicator" aria-hidden="true" />
              </div>
              <div className="faq-header-info">
                <div className="faq-agent-name">{botName}</div>
                <div className="faq-agent-status">{botStatus}</div>
              </div>
            </div>

            {/* Message log */}
            <div
              ref={messageLogRef}
              role="log"
              aria-live="polite"
              aria-label={`${botName} chat log`}
              className="faq-message-log"
            >
              {messages.map((msg) => {
                const isStudent = msg.sender === 'student';
                const isHighlight = highlightedMsgId === msg.id;

                if (msg.isTyping) {
                  return (
                    <div key={msg.id} className="faq-msg-row bot-row animate-fade-in">
                      <div className="faq-typing-bubble">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    id={`chat-msg-${msg.id}`}
                    className={`faq-msg-row ${isStudent ? 'student-row' : 'bot-row'} ${
                      isHighlight ? 'is-highlighted' : ''
                    }`}
                  >
                    <div
                      className={`faq-bubble ${
                        isStudent ? 'student-bubble' : 'bot-bubble'
                      }`}
                    >
                      <div className="faq-bubble-text">{msg.text}</div>

                      {/* Follow up suggestions */}
                      {msg.followUps && msg.followUps.length > 0 && (
                        <div className="faq-followups-wrap">
                          <span className="faq-followup-hint">Suggested follow-ups:</span>
                          <div className="faq-followups-row">
                            {msg.followUps.map((qText, fIdx) => (
                              <button
                                key={`fu-${fIdx}`}
                                type="button"
                                disabled={isTyping}
                                onClick={() => handleFollowUpClick(qText)}
                                className="faq-followup-pill"
                              >
                                {qText}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="faq-msg-timestamp">{msg.timestamp}</div>
                  </div>
                );
              })}
            </div>

            {/* Footer Bar: Interactive Search Input & Send Button */}
            <form onSubmit={handleSearchSubmit} className="faq-chat-footer">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={inputHint}
                className="faq-chat-input"
                aria-label="Search FAQ questions"
              />
              <button
                type="submit"
                className="faq-chat-send-btn"
                aria-label="Send or ask question"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

