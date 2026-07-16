export const AboutIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#555" strokeWidth="1"/>
      <path d="M24 2 A22 22 0 0 1 46 24 L24 24 Z" fill="#66A5ED" />
      <path d="M46 24 A22 22 0 0 1 24 46 L24 24 Z" fill="#9CD155" />
      <path d="M24 46 A22 22 0 0 1 2 24 L24 24 Z" fill="#D29948" />
      <path d="M2 24 A22 22 0 0 1 24 2 L24 24 Z" fill="#D35F4D" />
      <circle cx="24" cy="24" r="22" fill="none" stroke="#fff" strokeWidth="2" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="22" stroke="#555" strokeWidth="1" />
      <path d="M24 8 L24 38 M18 14 L24 8 L30 14 M18 32 L24 38 L30 32" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 9 L24 37 L30 31 M24 37 L18 31 M24 9 L18 15 M24 9 L30 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.5"/>
    </g>
  </svg>
);

export const PdfIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <path d="M10 6 L28 6 L38 16 L38 42 L10 42 Z" fill="#fff" stroke="#999" strokeWidth="1" />
      <path d="M28 6 L28 16 L38 16" fill="#f0f0f0" stroke="#999" strokeWidth="1" />
      <rect x="6" y="10" width="22" height="10" fill="#E23028" rx="2" />
      <text x="8" y="18" fill="#fff" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold">PDF</text>
      <path d="M20 26 C16 26 15 32 18 34 C21 36 21 28 24 25 C26 23 30 23 31 25 C33 28 32 36 28 36" stroke="#E23028" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="34" r="2" stroke="#E23028" strokeWidth="1" fill="none" />
      <circle cx="28" cy="36" r="2" stroke="#E23028" strokeWidth="1" fill="none" />
    </g>
  </svg>
);

export const IeIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <text x="24" y="38" fill="#13A0E9" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="bold" fontStyle="italic" textAnchor="middle">e</text>
      <path d="M8 28 C 10 16, 26 12, 42 20 O 38 18, 20 28 Z" fill="#FAD144" />
      <path d="M12 26 C 24 20, 36 24, 40 30 C 26 26, 12 30, 8 36 Z" fill="#FAD144" />
    </g>
  </svg>
);

export const MailIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="6" y="14" width="36" height="24" fill="#fff" stroke="#90CAF9" strokeWidth="2" />
      <path d="M6 14 L24 26 L42 14" stroke="#90CAF9" strokeWidth="2" fill="none" />
      <path d="M6 38 L16 26 M42 38 L32 26" stroke="#90CAF9" strokeWidth="2" fill="none" />
      <path d="M6 24 L2 20 M6 32 L2 36 M42 24 L46 20 M42 32 L46 36" stroke="#42A5F5" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="14" r="4" fill="#42A5F5" />
      <path d="M21 16 L24 22 L27 16 Z" fill="#42A5F5" />
    </g>
  </svg>
);

export const FolderUpIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 10 L16 10 L20 16 L44 16 L44 38 L4 38 Z" fill="#FAD144" stroke="#D1A721" strokeWidth="2"/>
    <path d="M4 18 L44 18 L40 40 L8 40 Z" fill="#FCE182" stroke="#D1A721" strokeWidth="1"/>
    <path d="M24 24 L24 34 M20 28 L24 24 L28 28" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BackIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#9CD155" stroke="#719A3E" strokeWidth="1" />
    <path d="M14 8 L10 12 L14 16" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8 L10 12 L14 16" stroke="#555" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" transform="translate(0, 1)" />
  </svg>
);

export const ForwardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="#e0e0e0" stroke="#bbb" strokeWidth="1" />
    <path d="M10 8 L14 12 L10 16" stroke="#aaa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StartIcon = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} className={props.className}>
    {/* Waving Flag Group rotated -12 degrees */}
    <g transform="translate(5, 5) rotate(-12 45 45)" filter="drop-shadow(2px 2.5px 2px rgba(0,0,0,0.45))">
      {/* Red Pane (Top Left) */}
      <path 
        d="M20 28 C26 25, 32 30, 42 27 C42 41, 32 44, 20 47 C20 40, 20 34, 20 28 Z" 
        fill="url(#redGrad)" 
      />
      {/* Green Pane (Top Right) */}
      <path 
        d="M46 26 C53 23, 62 27, 72 23 C72 37, 63 39, 46 42 C46 36, 46 31, 46 26 Z" 
        fill="url(#greenGrad)" 
      />
      {/* Blue Pane (Bottom Left) */}
      <path 
        d="M20 50 C26 47, 32 52, 42 49 C42 63, 32 66, 20 69 C20 62, 20 56, 20 50 Z" 
        fill="url(#blueGrad)" 
      />
      {/* Yellow Pane (Bottom Right) */}
      <path 
        d="M46 45 C53 42, 62 46, 72 42 C72 56, 63 58, 46 61 C46 55, 46 50, 46 45 Z" 
        fill="url(#yellowGrad)" 
      />
    </g>
    
    <defs>
      {/* Linear gradients to match the glossy curved look in the screenshot */}
      <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff6c47" />
        <stop offset="40%" stopColor="#e04a2f" />
        <stop offset="100%" stopColor="#b02510" />
      </linearGradient>
      <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a4e048" />
        <stop offset="40%" stopColor="#76b82a" />
        <stop offset="100%" stopColor="#4c8210" />
      </linearGradient>
      <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4da0f0" />
        <stop offset="40%" stopColor="#2972b5" />
        <stop offset="100%" stopColor="#124a80" />
      </linearGradient>
      <linearGradient id="yellowGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffdb43" />
        <stop offset="40%" stopColor="#f2b200" />
        <stop offset="100%" stopColor="#b88300" />
      </linearGradient>
    </defs>
  </svg>
);

export const ContactSyncIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <path d="M12 24 A 12 12 0 0 1 36 24" fill="none" stroke="#2A7BDE" strokeWidth="4" />
      <path d="M36 24 L32 20 M36 24 L40 20" stroke="#2A7BDE" strokeWidth="4" />
      <path d="M36 24 A 12 12 0 0 1 12 24" fill="none" stroke="#4B9FF3" strokeWidth="4" />
      <path d="M12 24 L8 28 M12 24 L16 28" stroke="#4B9FF3" strokeWidth="4" />
      <rect x="16" y="19" width="16" height="10" fill="#fff" stroke="#ccc" strokeWidth="1" />
      <path d="M16 19 L24 24 L32 19" fill="none" stroke="#ccc" strokeWidth="1" />
    </g>
  </svg>
);

export const MusicPlayerIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="12" y="8" width="24" height="32" rx="4" fill="#e0e0e0" stroke="#999" strokeWidth="2" />
      <rect x="16" y="12" width="16" height="12" rx="2" fill="#fff" stroke="#ccc" strokeWidth="1" />
      <circle cx="24" cy="32" r="6" fill="#fff" stroke="#ccc" strokeWidth="2" />
      <circle cx="24" cy="32" r="2" fill="#e0e0e0" />
      <path d="M19 19 L21 16 L27 16 L27 22 L24 22 L24 18 L21 21 Z" fill="#2A7BDE" />
    </g>
  </svg>
);

export const MediaPlayerIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <circle cx="24" cy="24" r="18" fill="#fff" stroke="#4B9FF3" strokeWidth="2" />
      <circle cx="24" cy="24" r="14" fill="#FAD144" />
      <circle cx="24" cy="24" r="10" fill="#13A0E9" />
      <path d="M21 18 L31 24 L21 30 Z" fill="#fff" />
    </g>
  </svg>
);

export const PaintIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <path d="M14 20 L34 20 L30 40 L18 40 Z" fill="#E2E2E2" stroke="#999" strokeWidth="2" />
      <path d="M20 8 L22 20 L24 20 L22 8 Z" fill="#D35F4D" />
      <path d="M26 6 L24 20 L26 20 L28 6 Z" fill="#9CD155" />
      <path d="M32 10 L28 20 L30 20 L34 10 Z" fill="#13A0E9" />
    </g>
  </svg>
);

export const DoodleDevIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="8" y="8" width="32" height="32" fill="#fff" stroke="#999" strokeWidth="2" />
      <path d="M8 16L40 16 M8 24L40 24 M8 32L40 32" stroke="#eee" strokeWidth="2" />
      <path d="M16 8L16 40 M24 8L24 40 M32 8L32 40" stroke="#eee" strokeWidth="2" />
      <text x="12" y="32" fill="#46a64f" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">D</text>
      <text x="26" y="38" fill="#38883e" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">D</text>
    </g>
  </svg>
);

export const PlayArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <path d="M6 6 L18 12 L6 18 Z" fill="currentColor" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <rect x="2" y="2" width="20" height="20" rx="5" fill="#E1306C" />
     <rect x="6" y="6" width="12" height="12" rx="3" stroke="#fff" strokeWidth="2" fill="none"/>
     <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2" fill="none"/>
     <circle cx="16" cy="8" r="1.5" fill="#fff"/>
  </svg>
);

export const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <circle cx="12" cy="12" r="11" fill="#fff" stroke="#333" strokeWidth="1" />
     <path d="M12 5 Q17 5 18 10 Q18 15 15 17 Q15 20 12 21 Q9 20 9 17 Q6 15 6 10 Q7 5 12 5 Z" fill="#333" />
     <path d="M15 17 L15 21 M9 17 L9 21 M12 21 L12 23" stroke="#333" strokeWidth="2" />
  </svg>
);

export const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <rect x="2" y="2" width="20" height="20" rx="2" fill="#0077b5" />
     <text x="6" y="17" fill="#fff" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">in</text>
  </svg>
);

export const RecentlyUsedIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <rect x="4" y="2" width="14" height="18" fill="#fff" stroke="#999" strokeWidth="1"/>
     <circle cx="16" cy="16" r="6" fill="#fff" stroke="#13A0E9" strokeWidth="1"/>
     <path d="M16 12 L16 16 L18 18" stroke="#f00" strokeWidth="1.5" />
  </svg>
);

export const CommandPromptIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <rect x="2" y="4" width="20" height="16" rx="1" fill="#000" stroke="#333" strokeWidth="1"/>
     <path d="M2 4 L22 4 L22 8 L2 8 Z" fill="#316ac5" />
     <text x="5" y="16" fill="#fff" fontFamily="Courier, monospace" fontSize="8">C:\_</text>
  </svg>
);

export const ImageViewerIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="8" y="12" width="32" height="24" fill="#13A0E9" stroke="#999" strokeWidth="2" />
      <path d="M8 30 L18 20 L26 28 L32 22 L40 30 L40 36 L8 36 Z" fill="#9CD155" />
      <circle cx="32" cy="18" r="4" fill="#FAD144" />
    </g>
  </svg>
);

export const LogOffIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#gradLogoff)" stroke="#D49900" strokeWidth="1" />
     <defs>
       <linearGradient id="gradLogoff" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="#FAD144" />
         <stop offset="100%" stopColor="#D28F00" />
       </linearGradient>
     </defs>
     <path d="M14 8 A 3 3 0 1 0 12 13 L 8 17 L 8 19 L 6 19 L 6 17 L 7 16 L 7 15 L 8 14 L 10.5 11.5 A 3 3 0 0 0 14 8 Z" fill="#fff" stroke="#D49900" strokeWidth="0.5" />
     <circle cx="14" cy="8" r="1.5" fill="#D49900" />
  </svg>
);

export const ShutDownIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#gradShutdown)" stroke="#A00" strokeWidth="1" />
     <defs>
       <linearGradient id="gradShutdown" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="#fa4444" />
         <stop offset="100%" stopColor="#bd0000" />
       </linearGradient>
     </defs>
     <path d="M12 6 L 12 12 M 8.5 8.5 A 5 5 0 1 0 15.5 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MinesweeperIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="6" y="6" width="36" height="36" fill="#c0c0c0" stroke="#808080" strokeWidth="2" />
      <circle cx="24" cy="24" r="10" fill="#333" />
      <path d="M24 10 L24 38 M10 24 L38 24 M14 14 L34 34 M14 34 L34 14" stroke="#333" strokeWidth="3" />
      <rect x="21" y="21" width="3" height="3" fill="#fff" />
      <rect x="18" y="18" width="2" height="2" fill="#ff0000" />
    </g>
  </svg>
);

export const FolderIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <path d="M4 10 L16 10 L20 16 L44 16 L44 38 L4 38 Z" fill="#FAD144" stroke="#D1A721" strokeWidth="2"/>
      <path d="M4 18 L44 18 L40 40 L8 40 Z" fill="#FCE182" stroke="#D1A721" strokeWidth="1"/>
    </g>
  </svg>
);

export const ShortcutIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="10" y="6" width="28" height="36" rx="2" fill="#fff" stroke="#999" strokeWidth="1.5" />
      <path d="M14 12 L34 12 M14 18 L30 18 M14 24 L24 24" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      {/* Shortcut Arrow overlay */}
      <rect x="6" y="28" width="12" height="12" rx="2" fill="#fff" stroke="#0055e5" strokeWidth="1.5" />
      <path d="M12 36 L12 32 L8 32 M12 32 L8 36" stroke="#0055e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

export const TextDocIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="10" y="6" width="28" height="36" rx="2" fill="#fff" stroke="#5590D2" strokeWidth="1.5" />
      <path d="M16 14 h16 M16 20 h12 M16 26 h16 M16 32 h10" stroke="#5590D2" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const GiftIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <rect x="6" y="20" width="36" height="22" rx="1" fill="#d4433f" stroke="#7c1613" strokeWidth="1"/>
      <rect x="6" y="20" width="36" height="7" fill="#f06c5f"/>
      <rect x="21" y="20" width="6" height="22" fill="#f4c531"/>
      <path d="M6 18h36v6H6z" fill="#c23a35" stroke="#7c1613" stroke-width="1"/>
      <path d="M21 18h6v24h-6z" fill="#f9d658"/>
      <path d="M14 18c-4 0-6-3-6-6 0-2 2-4 4-4 4 0 8 5 10 10-3 0-6 0-8 0z" fill="#f4c531" stroke="#a9832f" stroke-width="1"/>
      <path d="M34 18c4 0 6-3 6-6 0-2-2-4-4-4-4 0-8 5-10 10 3 0 6 0 8 0z" fill="#f4c531" stroke="#a9832f" stroke-width="1"/>
    </g>
  </svg>
);

export const SearchIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.5))">
      <circle cx="20" cy="20" r="11" stroke="#1C64B4" strokeWidth="4.5" fill="none" />
      <line x1="28" y1="28" x2="40" y2="40" stroke="#1C64B4" strokeWidth="6" strokeLinecap="round" />
      <line x1="29.5" y1="29.5" x2="38.5" y2="38.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="7" fill="none" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.5" />
    </g>
  </svg>
);


