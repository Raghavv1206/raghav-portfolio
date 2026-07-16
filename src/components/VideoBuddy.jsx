import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Source clip structure (vercetti_transparent_v2.webm), ~20.25s total:
//   0s  -> 4s   walk cycle
//   4s  -> 16s  wave / hold (12s)
//   16s -> end  walk cycle again
const HOLD_DURATION = 9.8;

export default function VideoBuddy({ onFinish }) {
  const [x, setX] = useState(-400);
  const [facing, setFacing] = useState('right');
  const [balloonVisible, setBalloonVisible] = useState(false);
  const [walkDuration, setWalkDuration] = useState(4.0); // 4.0s walk-in
  const [isHidden, setIsHidden] = useState(false);
  const timeoutsRef = useRef([]);
  const videoRef = useRef(null);
  const [typedIndex, setTypedIndex] = useState(0);

  // References and states for Page Visibility API sync
  const startedRef = useRef(false);
  const movementStartTimeRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 600;
  
  // Calculate scale based on width
  let targetScale = isMobile ? 0.65 : windowWidth < 900 ? 0.85 : 1.0;
  
  // Downscale if the screen height is too small to fit both the character and speech bubble
  if (windowHeight < 620) {
    const heightScale = (windowHeight - 45) / 560; // leaves safety margins
    targetScale = Math.min(targetScale, heightScale);
  }
  
  const scale = Math.max(0.45, targetScale);
  
  // Responsive hold positions
  const holdX = isMobile 
    ? (windowWidth / 2 - 120) 
    : Math.max(120, Math.min(280, windowWidth * 0.15));

  const [targetHoldX, setTargetHoldX] = useState(0);
  const holdXRef = useRef(holdX);

  useEffect(() => {
    holdXRef.current = holdX;
  }, [holdX]);

  useEffect(() => {
    if (!balloonVisible) {
      setTypedIndex(0);
      return;
    }
    const totalLength = 16 + 3 + 83; // 102
    let cur = 0;
    const timer = setInterval(() => {
      cur += 1;
      setTypedIndex(cur);
      if (cur >= totalLength) {
        clearInterval(timer);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [balloonVisible]);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const syncToElapsed = (elapsed) => {
    const video = videoRef.current;
    clearAllTimeouts();

    if (elapsed >= 19300) {
      // Sequence completed - skip to the end state
      if (video) video.pause();
      setIsHidden(true);
      if (onFinish) onFinish();
      return;
    }

    if (elapsed < 4000) {
      // Phase 1: Walk-in
      setFacing('right');
      setBalloonVisible(false);
      const remainingDuration = (4000 - elapsed) / 1000;
      setWalkDuration(remainingDuration);
      setX(holdXRef.current);

      if (video) {
        video.playbackRate = 1.0;
        video.currentTime = elapsed / 1000;
        video.play().catch(() => {});
      }
    } else if (elapsed < 13600) {
      // Phase 2: Hold / Wave
      setX(holdXRef.current);
      setFacing('right');
      
      // Determine balloon visibility
      if (elapsed >= 5520) {
        setBalloonVisible(true);
      } else {
        setBalloonVisible(false);
        addTimeout(() => {
          setBalloonVisible(true);
        }, 5520 - elapsed);
      }

      // Schedule return walk
      addTimeout(() => {
        if (video) {
          video.playbackRate = 1.0;
        }
        setBalloonVisible(false);
        setFacing('left');
        setWalkDuration(5.7);
        setX(-400);
      }, 13600 - elapsed);

      if (video) {
        video.playbackRate = 1.25;
        video.currentTime = 4.0 + (((elapsed - 4000) / 1000) * 1.25);
        video.play().catch(() => {});
      }
    } else {
      // Phase 3: Walk-out
      setBalloonVisible(false);
      setFacing('left');
      const remainingDuration = (19300 - elapsed) / 1000;
      setWalkDuration(remainingDuration);
      setX(-400);

      if (video) {
        video.playbackRate = 1.0;
        video.currentTime = 16.0 + ((elapsed - 13600) / 1000);
        video.play().catch(() => {});
      }
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      const video = videoRef.current;
      if (video) video.pause();
      clearAllTimeouts();
    } else {
      if (!startedRef.current) {
        // Restart kickoff
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.pause();
        }
        setX(-400);
        addTimeout(() => {
          startedRef.current = true;
          movementStartTimeRef.current = Date.now();
          const v = videoRef.current;
          if (v) {
            v.currentTime = 0;
            v.playbackRate = 1.0;
            v.play().catch(() => {});
          }
          setX(holdXRef.current);
        }, 500);
      } else {
        const elapsed = Date.now() - movementStartTimeRef.current;
        syncToElapsed(elapsed);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setTargetHoldX(holdX);

    // Start walking in: video and on-screen movement start together after 0.5s
    addTimeout(() => {
      startedRef.current = true;
      movementStartTimeRef.current = Date.now();
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.playbackRate = 1.0;
        video.play().catch(() => {});
      }
      setX(holdX);
    }, 500);

    return () => {
      clearAllTimeouts();
      const video = videoRef.current;
      if (video) video.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoveComplete = () => {
    const video = videoRef.current;

    // Tolerance check to handle window resizes or subpixels
    if (Math.abs(x - targetHoldX) < 1) {
      // Reached hold position - let the video play its wave/hold segment continuously.
      if (video) {
        video.playbackRate = 1.25;
      }
      addTimeout(() => {
        setBalloonVisible(true);
      }, 1520);

      // Hold for 9.6 seconds, then walk off-screen back to the left
      addTimeout(() => {
        if (video) {
          video.playbackRate = 1.0;
        }
        setBalloonVisible(false);
        setFacing('left');
        setWalkDuration(5.7); // Slower return walk (5.7s)
        setX(-400); // Returns to exact original starting position (-400)
      }, HOLD_DURATION * 1000);
    } else if (x === -400) {
      // Walked off-screen - pause the video and signal completion.
      if (video) {
        video.pause();
      }
      setIsHidden(true);
      if (onFinish) {
        onFinish();
      }
    }
  };

  if (isHidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        bottom: '10px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{ x: x, scale: scale }}
        transition={{
          x: { type: 'tween', ease: 'linear', duration: walkDuration },
          scale: { duration: 0.1 }
        }}
        onAnimationComplete={handleMoveComplete}
        style={{
          width: '240px',
          height: '480px',
          position: 'relative',
          transformOrigin: 'bottom center',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <video
            ref={videoRef}
            src="/vercetti_transparent_v2.webm"
            muted
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Tooltip Balloon */}
        <AnimatePresence>
          {balloonVisible && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { type: 'spring', damping: 12, stiffness: 90 },
                opacity: { duration: 0.2 },
              }}
              style={{
                position: 'absolute',
                bottom: '350px',
                left: isMobile ? '-60px' : '160px',
                transformOrigin: isMobile ? '180px 185px' : '45px 185px',
                pointerEvents: 'auto',
                width: '360px',
                height: '210px',
                zIndex: 99999,
                willChange: 'transform, opacity',
              }}
            >
              <div className="bubble-bob" style={{ width: '100%', height: '100%', position: 'relative' }}>
              <svg
                width="360"
                height="210"
                viewBox="0 0 360 210"
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="neon-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff00aa" />
                    <stop offset="100%" stopColor="#00f0ff" />
                  </linearGradient>
                  <linearGradient id="sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff00aa" />
                    <stop offset="100%" stopColor="#ffe600" />
                  </linearGradient>
                  <linearGradient id="palm-sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff5e00" />
                    <stop offset="100%" stopColor="#ffe600" />
                  </linearGradient>
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <mask id="sun-mask">
                    <rect x="0" y="0" width="360" height="210" fill="white" />
                    <rect x="100" y="72" width="160" height="3" fill="black" />
                    <rect x="100" y="80" width="160" height="4" fill="black" />
                    <rect x="100" y="90" width="160" height="5" fill="black" />
                    <rect x="100" y="102" width="160" height="6" fill="black" />
                    <rect x="100" y="116" width="160" height="7" fill="black" />
                  </mask>
                </defs>
  
                <line x1="20" y1="110" x2="340" y2="110" stroke="rgba(255, 0, 170, 0.15)" strokeWidth="0.5" />
                <line x1="15" y1="122" x2="345" y2="122" stroke="rgba(255, 0, 170, 0.2)" strokeWidth="0.5" />
                <line x1="10" y1="135" x2="350" y2="135" stroke="rgba(255, 0, 170, 0.25)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="40" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="90" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="135" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="180" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="225" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="270" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                <line x1="180" y1="90" x2="320" y2="150" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
  
                <circle cx="180" cy="90" r="40" fill="url(#sun-grad)" mask="url(#sun-mask)" opacity="0.4" />
                <circle cx="285" cy="125" r="16" fill="url(#palm-sun-grad)" opacity="0.4" />
  
                <path d="M 276 142 Q 274 130 270 120" stroke="#00f0ff" strokeWidth="1.5" fill="none" opacity="0.8" />
                <path d="M 270 120 Q 262 118 256 121" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 270 120 Q 264 114 261 108" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 270 120 Q 272 112 278 109" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 270 120 Q 278 116 282 120" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 270 120 Q 276 123 280 129" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
  
                <path d="M 291 142 Q 288 126 284 112" stroke="#00f0ff" strokeWidth="1.5" fill="none" opacity="0.8" />
                <path d="M 284 112 Q 275 110 268 114" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 284 112 Q 277 104 273 98" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 284 112 Q 287 102 294 99" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 284 112 Q 293 107 298 112" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                <path d="M 284 112 Q 290 116 294 123" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
  
                <polygon points="220,10 260,10 160,150 120,150" fill="white" opacity="0.04" />
                <polygon points="275,10 290,10 195,150 180,150" fill="white" opacity="0.02" />
  
                <path
                  d={isMobile 
                    ? "M 30 10 H 330 A 20 20 0 0 1 350 30 V 130 A 20 20 0 0 1 330 150 H 200 L 180 185 L 160 150 H 30 A 20 20 0 0 1 10 130 V 30 A 20 20 0 0 1 30 10 Z" 
                    : "M 30 10 H 330 A 20 20 0 0 1 350 30 V 130 A 20 20 0 0 1 330 150 H 85 L 45 185 L 45 150 H 30 A 20 20 0 0 1 10 130 V 30 A 20 20 0 0 1 30 10 Z"
                  }
                  stroke="url(#neon-grad)"
                  strokeWidth="5"
                  fill="rgba(15, 8, 25, 0.72)"
                  filter="url(#neon-glow)"
                />
                <path
                  d={isMobile 
                    ? "M 30 10 H 330 A 20 20 0 0 1 350 30 V 130 A 20 20 0 0 1 330 150 H 200 L 180 185 L 160 150 H 30 A 20 20 0 0 1 10 130 V 30 A 20 20 0 0 1 30 10 Z"
                    : "M 30 10 H 330 A 20 20 0 0 1 350 30 V 130 A 20 20 0 0 1 330 150 H 85 L 45 185 L 45 150 H 30 A 20 20 0 0 1 10 130 V 30 A 20 20 0 0 1 30 10 Z"
                  }
                  stroke="url(#neon-grad)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
  
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '25px',
                  width: '310px',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontFamily: '"Segoe UI", Roboto, Helvetica, sans-serif',
                  userSelect: 'text',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '6px',
                    color: '#ff00aa',
                    textShadow: '0 0 8px rgba(255, 0, 170, 0.6)',
                    letterSpacing: '0.5px',
                  }}
                >
                  Tommy
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: '#e2f9ff',
                    textShadow: '0 0 6px rgba(0, 240, 255, 0.4)',
                  }}
                >
                  {typedIndex > 0 && (
                    <>
                      <span>{"Hi there! Press ".slice(0, typedIndex)}</span>
                      {typedIndex > 16 && (
                        <>
                          <strong style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0, 240, 255, 0.8)' }}>
                            {"F11".slice(0, typedIndex - 16)}
                          </strong>
                          {typedIndex > 19 && (
                            <span>
                              {" for a full-screen experience to get the best vintage portfolio experience!".slice(0, typedIndex - 19)}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <style>{`
        @keyframes bubbleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .bubble-bob {
          animation: bubbleBob 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}