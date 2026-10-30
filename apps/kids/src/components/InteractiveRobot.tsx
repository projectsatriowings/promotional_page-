import React, { useEffect, useState } from 'react';

export type RobotMood = 'idle' | 'tracking' | 'covering-eyes' | 'celebrating' | 'curious';

interface InteractiveRobotProps {
  mood?: RobotMood;
  pointerPos?: { x: number; y: number }; // normalized -1 to 1
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InteractiveRobot: React.FC<InteractiveRobotProps> = ({
  mood = 'tracking',
  pointerPos = { x: 0, y: 0 },
  size = 'md',
  className = ''
}) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Compute pupil offsets
  const pupilOffsetX = Math.max(-5, Math.min(5, pointerPos.x * 5));
  const pupilOffsetY = Math.max(-4, Math.min(4, pointerPos.y * 4));

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48'
  }[size];

  const isCoveringEyes = mood === 'covering-eyes';
  const isCelebrating = mood === 'celebrating';

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Floating Sparkles when celebrating */}
      {isCelebrating && (
        <div className="absolute -top-3 -right-3 text-amber-400 animate-bounce text-xl font-bold">
          ✨
        </div>
      )}

      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-lg filter transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <g className="origin-bottom transition-transform duration-500 hover:rotate-12">
          <line
            x1="80"
            y1="34"
            x2="80"
            y2="14"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="80"
            cy="12"
            r="7"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="2"
            className="animate-pulse"
          />
          <circle cx="78" cy="10" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Robot Ears / Headphones */}
        <rect x="22" y="58" width="8" height="24" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        <rect x="130" y="58" width="8" height="24" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />

        {/* Robot Head Body */}
        <rect
          x="28"
          y="34"
          width="104"
          height="82"
          rx="24"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="3.5"
        />

        {/* Subtle Cheek Blushes */}
        <ellipse cx="44" cy="88" rx="6" ry="3.5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="116" cy="88" rx="6" ry="3.5" fill="#FDA4AF" opacity="0.8" />

        {/* Robot Screen Face (Navy / Dark Teal) */}
        <rect
          x="38"
          y="46"
          width="84"
          height="54"
          rx="16"
          fill="#0F172A"
        />

        {/* Robot Screen Reflection Highlight */}
        <path
          d="M44 52C44 50 48 48 54 48H76L64 62H44V52Z"
          fill="rgba(255, 255, 255, 0.08)"
        />

        {/* EYES LAYER */}
        {!isCoveringEyes ? (
          <g>
            {/* Left Eye */}
            <g transform={`translate(${pupilOffsetX}, ${pupilOffsetY})`}>
              {blink ? (
                <line x1="50" y1="71" x2="66" y2="71" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              ) : isCelebrating ? (
                <path d="M50 74C52 66 64 66 66 74" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
              ) : (
                <>
                  <circle cx="58" cy="70" r="8" fill="#38BDF8" />
                  <circle cx="56" cy="68" r="2.5" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* Right Eye */}
            <g transform={`translate(${pupilOffsetX}, ${pupilOffsetY})`}>
              {blink ? (
                <line x1="94" y1="71" x2="110" y2="71" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              ) : isCelebrating ? (
                <path d="M94 74C96 66 108 66 110 74" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
              ) : (
                <>
                  <circle cx="102" cy="70" r="8" fill="#38BDF8" />
                  <circle cx="100" cy="68" r="2.5" fill="#FFFFFF" />
                </>
              )}
            </g>
          </g>
        ) : (
          /* Peek / Shy Line Eyes under hands */
          <g>
            <path d="M52 70Q58 74 64 70" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M96 70Q102 74 108 70" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Mouth */}
        {isCelebrating ? (
          <path d="M72 86Q80 94 88 86" stroke="#34D399" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M74 86Q80 91 86 86" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        )}

        {/* Robot Hands - Normal vs Covering Eyes */}
        {isCoveringEyes ? (
          <g className="transition-all duration-300">
            {/* Left Hand covering left eye */}
            <rect
              x="46"
              y="58"
              width="24"
              height="26"
              rx="8"
              fill="#F97316"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            {/* Right Hand covering right eye */}
            <rect
              x="90"
              y="58"
              width="24"
              height="26"
              rx="8"
              fill="#F97316"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
          </g>
        ) : (
          /* Normal Hands resting on the sides */
          <g>
            <rect x="20" y="86" width="12" height="18" rx="6" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
            <rect x="128" y="86" width="12" height="18" rx="6" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
          </g>
        )}

        {/* Little Collar / Tie Badge */}
        <polygon points="76,116 84,116 80,126" fill="#F59E0B" stroke="#0F172A" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

