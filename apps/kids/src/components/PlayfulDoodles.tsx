import React from 'react';

export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#F59E0B'
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L14.3 8.7L21.5 9.1L16 13.8L17.8 20.9L12 17.2L6.2 20.9L8 13.8L2.5 9.1L9.7 8.7L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${color}22`}
    />
  </svg>
);

export const DoodleSparkle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#38BDF8'
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3V21M3 12H21M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleArrow: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#EC4899'
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 30C14 26 22 18 30 12M30 12H18M30 12V24"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleSpiral: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#8B5CF6'
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 16C17 16 18 15 18 14C18 12.5 16.5 11 15 11C12.5 11 11 13 11 15.5C11 19 14 21 17 21C21 21 24 18 24 14C24 9 19.5 6 15 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleCircuit: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#10B981'
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 24H18L24 12L30 36L36 24H42"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="24" r="3" fill={color} />
    <circle cx="42" cy="24" r="3" fill={color} />
  </svg>
);

export const PaperCloud: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-10',
  color = '#E0F2FE'
}) => (
  <svg
    viewBox="0 0 64 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 32H48C54 32 58 27.5 58 22C58 17 54 13 49 13C48.5 13 47.8 13.1 47.2 13.3C45.2 8.3 40.2 5 34.5 5C27 5 21 10.5 20.3 17.5C19.6 17.2 18.8 17 18 17C12.5 17 8 21.5 8 27C8 30 11.5 32 18 32Z"
      fill={color}
      stroke="#BAE6FD"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleCodeBracket: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#F97316'
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 6L3 12L8 18M16 6L21 12L16 18M13 4L11 20"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

