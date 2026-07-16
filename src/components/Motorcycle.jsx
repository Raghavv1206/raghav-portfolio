import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Motorcycle() {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timeoutId;

    const triggerAnimation = () => {
      setIsVisible(true);
      // Repeatedly come after every 130 seconds
      timeoutId = setTimeout(triggerAnimation, 130000);
    };

    // First come after 10 seconds of landing to desktop page
    timeoutId = setTimeout(triggerAnimation, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  const videoWidth = 240; // Good size for a motorcycle video crossing the screen

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="boost-opacity">
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 2.2 -0.05
            "
          />
        </filter>
      </svg>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="motorcycle-container"
            initial={{ x: -videoWidth }}
            animate={{ x: windowWidth }}
            exit={{ x: windowWidth }}
            transition={{ duration: 7, ease: 'linear' }}
            onAnimationComplete={() => setIsVisible(false)}
            style={{
              position: 'fixed',
              left: 0,
              bottom: '40px', // Just on top of the taskbar
              width: `${videoWidth}px`,
              height: '110px',
              zIndex: 9998, // Behind start menu/taskbar dropdowns but above desktop icons
              pointerEvents: 'none',
            }}
          >
            <video
              src="/motorcycle_transparent.webm"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0.99,
                filter: 'url(#boost-opacity) contrast(1.1) saturate(1.1)',
                willChange: 'transform',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
