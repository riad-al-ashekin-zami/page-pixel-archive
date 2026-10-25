/**
 * Decorative SVG motifs used behind hero sections.
 * Each motif is non-interactive (pointer-events-none applied by caller),
 * inherits `currentColor`, and scales via viewBox.
 */

type MotifProps = { className?: string };

/* Website Design — pixel grid with a few "lit" cells */
export function PixelGridField({ className = "" }: MotifProps) {
  const cells = Array.from({ length: 8 * 6 }, (_, i) => i);
  const lit = new Set([5, 6, 14, 21, 27, 30, 33, 38, 41]);
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <g>
        {cells.map((i) => {
          const x = (i % 8) * 40 + 4;
          const y = Math.floor(i / 8) * 40 + 4;
          const on = lit.has(i);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="32"
              height="32"
              rx="4"
              fill={on ? "currentColor" : "none"}
              stroke="currentColor"
              strokeOpacity={on ? "0" : "0.35"}
              opacity={on ? "0.55" : "1"}
            >
              {on && (
                <animate attributeName="opacity" values="0.25;0.7;0.25" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
              )}
            </rect>
          );
        })}
      </g>
    </svg>
  );
}

/* Website Redesign — before/after split with polish sparkle */
export function SplitShadeField({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="sf-old" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-new" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="16" y="24" width="140" height="192" rx="14" fill="url(#sf-old)" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="164" y="24" width="140" height="192" rx="14" fill="url(#sf-new)" stroke="currentColor" strokeOpacity="0.5" />
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1="30" x2="140" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      {[60, 90, 120, 150, 180].map((y, i) => (
        <rect key={y} x="180" y={y - 8} width={90 - i * 6} height="10" rx="3" fill="currentColor" opacity={0.25 + i * 0.05} />
      ))}
      <g transform="translate(160 120)">
        <circle r="14" fill="none" stroke="currentColor" strokeWidth="2">
          <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

/* Website Migration — data stream from left to right */
export function DataStreamField({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect x="16" y="40" width="70" height="160" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="234" y="40" width="70" height="160" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.55" />
      {[70, 100, 130, 160, 180].map((y, i) => (
        <g key={y}>
          <path d={`M86 ${y} C 140 ${y - 20}, 200 ${y + 20}, 234 ${y}`} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle r="3" fill="currentColor">
            <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" path={`M86 ${y} C 140 ${y - 20}, 200 ${y + 20}, 234 ${y}`} />
          </circle>
        </g>
      ))}
      {[60, 90, 120, 150, 180].map((y) => (
        <line key={`l${y}`} x1="26" x2="76" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      ))}
      {[60, 90, 120, 150, 180].map((y) => (
        <line key={`r${y}`} x1="244" x2="294" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
      ))}
    </svg>
  );
}

/* Multi-Location — clustered map pins */
export function MapPinField({ className = "" }: MotifProps) {
  const pins = [
    { x: 60, y: 70 },
    { x: 130, y: 50 },
    { x: 210, y: 90 },
    { x: 270, y: 60 },
    { x: 90, y: 150 },
    { x: 180, y: 170 },
    { x: 250, y: 190 },
  ];
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <pattern id="mpf-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="240" fill="url(#mpf-grid)" />
      <path d="M0 130 C 80 110, 160 150, 320 100" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M0 60 C 100 80, 200 40, 320 70" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" />
      {pins.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r="4" fill="currentColor" />
          <circle r="4" fill="none" stroke="currentColor" strokeOpacity="0.6">
            <animate attributeName="r" values="4;16;4" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
          </circle>
          <path d="M0 -4 C 5 -4 5 4 0 10 C -5 4 -5 -4 0 -4" fill="currentColor" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

/* Ecommerce — product tiles with a floating cart */
export function CartGridField({ className = "" }: MotifProps) {
  const tiles = [
    { x: 20, y: 30 },
    { x: 110, y: 30 },
    { x: 200, y: 30 },
    { x: 20, y: 130 },
    { x: 110, y: 130 },
    { x: 200, y: 130 },
  ];
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      {tiles.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y})`}>
          <rect width="80" height="80" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="10" y="10" width="60" height="42" rx="6" fill="currentColor" opacity="0.12" />
          <rect x="10" y="58" width="40" height="6" rx="3" fill="currentColor" opacity="0.3" />
          <rect x="10" y="68" width="28" height="6" rx="3" fill="currentColor" opacity="0.2" />
          <circle cx="66" cy="66" r="6" fill="currentColor" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <g transform="translate(240 170)">
        <path d="M0 0 H 40 L 46 26 H 12 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="34" r="3" fill="currentColor" />
        <circle cx="40" cy="34" r="3" fill="currentColor" />
        <path d="M-8 -8 H 0" stroke="currentColor" strokeWidth="2" />
        <text x="20" y="-8" textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.7">+1</text>
      </g>
    </svg>
  );
}

/* Support & Maintenance — heartbeat pulse line */
export function PulseField({ className = "" }: MotifProps) {
  const path =
    "M0 120 L 40 120 L 60 100 L 80 140 L 100 60 L 120 180 L 140 120 L 200 120 L 220 90 L 240 150 L 260 120 L 320 120";
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="pf-fade" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 40, 80].map((dy) => (
        <path key={dy} d={path} transform={`translate(0 ${dy - 40})`} fill="none" stroke="currentColor" strokeOpacity={dy === 40 ? 0 : 0.15} strokeWidth="1.5" />
      ))}
      <path d={path} fill="none" stroke="url(#pf-fade)" strokeWidth="2.5" />
      <circle r="5" fill="currentColor">
        <animateMotion dur="4s" repeatCount="indefinite" path={path} />
      </circle>
      <g fontFamily="ui-monospace, monospace" fontSize="10" fill="currentColor" opacity="0.55">
        <text x="20" y="30">uptime 99.98%</text>
        <text x="220" y="220">last check 2s</text>
      </g>
    </svg>
  );
}

/* Add-On Services — stackable modular blocks clicking together */
export function ModuleGridField({ className = "" }: MotifProps) {
  const modules = [
    { x: 30, y: 30, w: 90, h: 60 },
    { x: 130, y: 30, w: 60, h: 60 },
    { x: 200, y: 30, w: 90, h: 60 },
    { x: 30, y: 100, w: 60, h: 60 },
    { x: 100, y: 100, w: 120, h: 60 },
    { x: 230, y: 100, w: 60, h: 60 },
    { x: 60, y: 170, w: 200, h: 50 },
  ];
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      {modules.map((m, i) => (
        <g key={i}>
          <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="8" fill="currentColor" opacity={0.06 + (i % 3) * 0.05} stroke="currentColor" strokeOpacity="0.35" />
          <circle cx={m.x + 10} cy={m.y + 10} r="2.5" fill="currentColor" opacity="0.7" />
          <circle cx={m.x + m.w - 10} cy={m.y + 10} r="2.5" fill="currentColor" opacity="0.7" />
          <line x1={m.x + 14} x2={m.x + m.w - 14} y1={m.y + m.h / 2 + 4} y2={m.y + m.h / 2 + 4} stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
        </g>
      ))}
      <g>
        <circle cx="120" cy="90" r="4" fill="currentColor">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="160" r="4" fill="currentColor">
          <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
