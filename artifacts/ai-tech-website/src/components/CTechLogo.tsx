import React from "react";

interface CTechLogoProps {
  white?: boolean;
  className?: string;
}

/**
 * C TECH brand logo — SVG arc icon + wordmark.
 * white=true renders a fully white version for dark backgrounds.
 */
export function CTechLogo({ white = false, className = "" }: CTechLogoProps) {
  const teal = white ? "#FCDFC5" : "#5C0E14";
  const textPrimary = white ? "rgba(252,223,197,0.95)" : "#5C0E14";
  const textSub = white ? "rgba(252,223,197,0.55)" : "#9B4A52";

  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      {/* ── Icon: Concentric C arcs ── */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/*
          Outer arc — bold, 300° sweep, opens to the right.
          Circle center (19,19) radius 16.
          Open gap from ~30° to 330° (upper-right to lower-right).
          Start: (19 + 16·cos30°, 19 − 16·sin30°) = (32.86, 11)
          End:   (19 + 16·cos30°, 19 + 16·sin30°) = (32.86, 27)
        */}
        <path
          d="M 32.86 11 A 16 16 0 1 0 32.86 27"
          stroke={teal}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/*
          Inner arc — thinner, 270° sweep, same open direction.
          Circle center (19,19) radius 9.
          Open gap from ~45° to 315°.
          Start: (19 + 9·cos45°, 19 − 9·sin45°) = (25.36, 12.64)
          End:   (19 + 9·cos45°, 19 + 9·sin45°) = (25.36, 25.36)
        */}
        <path
          d="M 25.36 12.64 A 9 9 0 1 0 25.36 25.36"
          stroke={teal}
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity={white ? 0.45 : 0.3}
          fill="none"
        />

        {/* End-cap dot at the opening of the outer arc */}
        <circle cx="32.86" cy="11" r="2.5" fill={teal} />
      </svg>

      {/* ── Wordmark ── */}
      <span
        className="text-[13px] font-semibold tracking-[0.55em] uppercase leading-none"
        style={{ color: textPrimary }}
      >
        TECH
      </span>
    </div>
  );
}
