import React from 'react';
import { ChatFAQ, DEFAULT_FAQS, FaqItem } from '../../shared/ChatFAQ';

export { DEFAULT_FAQS };
export type { FaqItem };

export interface FaqChatSectionProps {
  faqs?: FaqItem[];
  onTalkToCounsellor?: () => void;
}

export const FaqChatSection: React.FC<FaqChatSectionProps> = ({
  faqs,
  onTalkToCounsellor,
}) => {
  return (
    <ChatFAQ
      id="faq"
      badge="FREQUENTLY ASKED QUESTIONS"
      heading="Ask Us Anything"
      highlight="Anything"
      subtitle="Tap a question to get an instant answer about admissions, course structure and tools."
      botName="Digital Ghuru Admissions"
      botStatus="Online · replies instantly"
      welcome="Hi! I'm here to help. Pick any question on the left and I'll answer it right here."
      inputHint="Choose a question from the list…"
      ctaText="Still have questions? Talk to a counsellor →"
      theme="default"
      faqs={faqs}
      onTalkToCounsellor={onTalkToCounsellor}
    />
  );
};

export default FaqChatSection;
