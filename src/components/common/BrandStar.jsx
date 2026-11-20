import React from 'react';

/**
 * Asterisk / 8-pointed sparkle motif matching the Kanya Kiran brand art
 */
export default function BrandStar({
  className = 'w-10 h-10 text-[#ff46a2]',
  strokeWidth = 3,
  ...props
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Invisible bounding hitbox so hover triggers anywhere over the star frame */}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="transparent"
        className="pointer-events-auto"
      />

      {/* Vertical ray */}
      <line
        x1="50"
        y1="5"
        x2="50"
        y2="95"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Horizontal ray */}
      <line
        x1="5"
        y1="50"
        x2="95"
        y2="50"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* 45-degree diagonal ray */}
      <line
        x1="18.18"
        y1="18.18"
        x2="81.82"
        y2="81.82"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* 135-degree diagonal ray */}
      <line
        x1="18.18"
        y1="81.82"
        x2="81.82"
        y2="18.18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
