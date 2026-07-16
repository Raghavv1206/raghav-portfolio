import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ShutdownScreen({ onRestart }) {
  useEffect(() => {
    // Listen for any keypress or click to restart
    const handleTrigger = () => {
      onRestart();
    };

    window.addEventListener('keydown', handleTrigger);
    window.addEventListener('click', handleTrigger);

    return () => {
      window.removeEventListener('keydown', handleTrigger);
      window.removeEventListener('click', handleTrigger);
    };
  }, [onRestart]);

  return (
    <motion.div
      className="w-full h-full bg-black flex flex-col items-center justify-center font-bios select-none p-4 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col items-center max-w-lg w-full gap-2">
        {/* Top Spacer/Line */}
        <div className="w-[85%] max-w-[400px] h-[3px] bg-[#c85000]" />
        
        {/* Main Text */}
        <h1 
          className="text-[#c85000] text-center text-lg md:text-2xl font-normal leading-relaxed uppercase tracking-wider py-4 select-none"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
        >
          It is now safe<br />to turn off your computer.
        </h1>

        {/* Bottom Spacer/Line */}
        <div className="w-[85%] max-w-[400px] h-[3px] bg-[#c85000]" />
      </div>

      {/* Retro prompt to restart */}
      <div className="mt-20 flex flex-col items-center gap-1.5 animate-pulse text-gray-600 font-mono text-[10px] md:text-xs">
        <span>Press any key or click to turn back on</span>
        <div className="w-1.5 h-3 bg-gray-600" />
      </div>
    </motion.div>
  );
}
