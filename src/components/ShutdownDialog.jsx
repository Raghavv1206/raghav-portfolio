import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ShutdownDialog({ onCancel, onShutDown, onRestart, onStandby }) {
  // Listen for Escape key to cancel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/15 select-none font-sans pointer-events-auto">
      {/* Dialog Window Container */}
      <motion.div
        className="w-[360px] sm:w-[410px] h-[240px] sm:h-[260px] bg-[#00309c] border border-black shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
      >
        {/* Header Section */}
        <div className="h-[60px] sm:h-[70px] flex items-center justify-between px-5 select-none">
          <span 
            className="text-[20px] sm:text-[24px] font-normal text-white select-none tracking-wide"
            style={{ 
              fontFamily: '"Trebuchet MS", Tahoma, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Turn off computer
          </span>
          
          {/* Windows XP Logo from public */}
          <div className="relative pr-1 flex items-center justify-center">
            <img 
              src="/xp-logo.svg" 
              alt="Windows XP Logo" 
              className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] object-contain select-none pointer-events-none" 
            />
          </div>
        </div>

        {/* Middle Band Section (Light Blue Gradient) */}
        <div 
          className="h-[110px] sm:h-[120px] flex justify-center items-center gap-8 px-6 border-y border-[#3a58ad] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          style={{
            background: 'linear-gradient(to bottom, #4365cd 0%, #7695eb 15%, #9cb5f3 50%, #7695eb 85%, #4365cd 100%)'
          }}
        >
          {/* Stand By Option */}
          <button 
            onClick={onStandby}
            className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent outline-none focus:outline-none"
          >
            <div 
              className="w-[52px] h-[52px] rounded-[8px] border-2 border-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150 opacity-75 saturate-[0.6] group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-105 group-hover:shadow-[0_0_8px_#ffffff] active:scale-95"
              style={{
                background: 'linear-gradient(to bottom, #f9c542 0%, #f5a300 100%)'
              }}
            >
              <svg viewBox="0 0 24 24" className="w-[32px] h-[32px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v6M8.5 8.5a5 5 0 1 0 7 0" />
              </svg>
            </div>
            <span 
              className="text-[11px] sm:text-xs text-white font-bold select-none tracking-wide group-hover:underline"
              style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.8)' }}
            >
              Stand By
            </span>
          </button>

          {/* Turn Off Option */}
          <button 
            onClick={onShutDown}
            className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent outline-none focus:outline-none"
          >
            <div 
              className="w-[52px] h-[52px] rounded-[8px] border-2 border-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150 opacity-75 saturate-[0.6] group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-105 group-hover:shadow-[0_0_8px_#ffffff] active:scale-95"
              style={{
                background: 'linear-gradient(to bottom, #e35a3e 0%, #b81c00 100%)'
              }}
            >
              <svg viewBox="0 0 24 24" className="w-[32px] h-[32px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="6" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </div>
            <span 
              className="text-[11px] sm:text-xs text-white font-bold select-none tracking-wide group-hover:underline"
              style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.8)' }}
            >
              Turn Off
            </span>
          </button>

          {/* Restart Option */}
          <button 
            onClick={onRestart}
            className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent outline-none focus:outline-none"
          >
            <div 
              className="w-[52px] h-[52px] rounded-[8px] border-2 border-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150 opacity-75 saturate-[0.6] group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-105 group-hover:shadow-[0_0_8px_#ffffff] active:scale-95"
              style={{
                background: 'linear-gradient(to bottom, #69bd43 0%, #2d7d1b 100%)'
              }}
            >
              <svg viewBox="0 0 24 24" className="w-[32px] h-[32px] text-white" fill="currentColor">
                {/* Spoke wheel of small circles */}
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
                <circle cx="7.05" cy="7.05" r="1.5" />
                <circle cx="16.95" cy="16.95" r="1.5" />
                <circle cx="16.95" cy="7.05" r="1.5" />
                <circle cx="7.05" cy="16.95" r="1.5" />
              </svg>
            </div>
            <span 
              className="text-[11px] sm:text-xs text-white font-bold select-none tracking-wide group-hover:underline"
              style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.8)' }}
            >
              Restart
            </span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="h-[60px] sm:h-[70px] flex items-center justify-end px-5 select-none">
          <button 
            onClick={onCancel}
            className="w-[75px] h-[22px] sm:w-[82px] sm:h-[24px] text-xs text-black border border-[#002276] rounded-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-105 active:scale-[0.98] transition cursor-pointer select-none font-sans font-normal"
            style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, #ece9d8 100%)',
              boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
