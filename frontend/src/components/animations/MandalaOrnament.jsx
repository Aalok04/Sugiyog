import React from 'react';

/**
 * MandalaOrnament - Sacred geometry 16-point Vedic mandala
 * Renders an intricate luxury gold rotating or static ornament
 */
export default function MandalaOrnament({ size = 320, opacity = 0.12, rotate = true, className = '' }) {
  return (
    <div
      className={`mandala-ornament-wrapper ${rotate ? 'mandala-rotating' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Outer boundary circles */}
        <circle cx="200" cy="200" r="195" stroke="#C49A45" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="185" stroke="#E3CC9A" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="175" stroke="#C49A45" strokeWidth="0.5" />

        {/* 16 Radial Petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={i} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M200 25 C215 90 235 130 200 175 C165 130 185 90 200 25 Z"
                stroke="#C49A45"
                strokeWidth="0.8"
                fill="none"
              />
              <circle cx="200" cy="25" r="3.5" fill="#C49A45" />
              <line x1="200" y1="60" x2="200" y2="140" stroke="#E3CC9A" strokeWidth="0.5" />
            </g>
          );
        })}

        {/* Mid Ring Petals */}
        <circle cx="200" cy="200" r="120" stroke="#C49A45" strokeWidth="1" />
        <circle cx="200" cy="200" r="105" stroke="#E3CC9A" strokeWidth="0.6" strokeDasharray="4 2" />

        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 + 22.5;
          return (
            <g key={i} transform={`rotate(${angle} 200 200)`}>
              <polygon
                points="200,85 218,120 200,155 182,120"
                stroke="#C49A45"
                strokeWidth="0.8"
                fill="rgba(196, 154, 69, 0.03)"
              />
            </g>
          );
        })}

        {/* Sacred Core Lotus */}
        <circle cx="200" cy="200" r="60" stroke="#C49A45" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="40" stroke="#E3CC9A" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="15" fill="#C49A45" fillOpacity="0.3" stroke="#C49A45" strokeWidth="1" />
        <circle cx="200" cy="200" r="4" fill="#E3CC9A" />
      </svg>
    </div>
  );
}
