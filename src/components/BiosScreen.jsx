import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BiosScreen({ onComplete }) {
  const [memory, setMemory] = useState(0);
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  // Animate blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400);
    return () => clearInterval(cursorInterval);
  }, []);

  // Animate Memory Count and boot text lines
  useEffect(() => {
    // Memory Count Animation (starts immediately)
    let memStart = 0;
    const targetMemory = 16777216; // 16GB RAM in KB
    const memInterval = setInterval(() => {
      memStart += 524288; // Step up
      if (memStart >= targetMemory) {
        setMemory(targetMemory);
        clearInterval(memInterval);
      } else {
        setMemory(memStart);
      }
    }, 30);

    // Boot lines animations with delays
    const textSequence = [
      { delay: 100, text: 'Award Modular BIOS v6.00PG, An Energy Star Ally' },
      { delay: 200, text: 'Copyright (C) 1984-2003 Award Software, Inc.' },
      { delay: 400, text: '' },
      { delay: 500, text: 'Intel(R) Core(TM) i9 CPU @ 3.60GHz' },
      { delay: 600, text: 'Main Processor : Intel(R) Core(TM) i9 CPU' },
      { delay: 1100, text: 'Memory Testing : Completed' },
      { delay: 1300, text: 'Award Plug and Play BIOS Extension v1.0A' },
      { delay: 1400, text: 'Copyright (C) 2003 Award Software, Inc.' },
      { delay: 1600, text: 'Detecting IDE Primary Master ... [OK]' },
      { delay: 1800, text: 'Detecting IDE Primary Slave  ... [OK]' },
      { delay: 2000, text: 'Detecting IDE Secondary Master ... [OK]' },
      { delay: 2100, text: 'Detecting IDE Secondary Slave  ... [OK]' },
      { delay: 2300, text: 'Trend ChipAwayVirus(R) On Board' },
      { delay: 2500, text: '' },
      { delay: 2600, text: 'Press DEL to enter Setup, F8 for Boot Menu' },
      { delay: 2800, text: '07/15/2026-i9-875P-6A79AM4KC-00' }
    ];

    textSequence.forEach((item) => {
      setTimeout(() => {
        setLines(prev => [...prev, item.text]);
      }, item.delay);
    });

    // Complete boot screen after 3.8 seconds
    const endTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearInterval(memInterval);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="w-full h-full bg-black text-gray-300 font-mono text-xs md:text-sm p-6 select-none flex flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className="flex flex-col gap-1 leading-normal">
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm md:text-base">Phoenix - AwardBIOS v6.00PG</span>
            <span className="text-gray-400">Copyright (C) 1984-2003 Phoenix Technologies, LTD</span>
          </div>

          {/* Energy Star Logo (Retro ASCII Art) */}
          <div className="text-sky-400 text-[8px] md:text-[10px] leading-[1] font-bold text-right">
            <div>&nbsp;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_</div>
            <div>&nbsp;/&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|</div>
            <div>/&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|</div>
            <div>|&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\|_|_&nbsp;|_|&nbsp;&nbsp;|_|</div>
            <div>|&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;_&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;__</div>
            <div>\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;\&nbsp;&nbsp;&nbsp;/&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;|&nbsp;__</div>
            <div>&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;/&nbsp;&nbsp;|_|_&nbsp;|_|&nbsp;&nbsp;|__|</div>
            <div>&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</div>
            <div className="text-gray-500 text-[8px] mt-0.5">energy</div>
            <div className="text-gray-500 text-[8px]">EPA POLLUTION PREVENTER</div>
          </div>
        </div>

        {/* Dynamic Log Lines */}
        <div className="space-y-0.5">
          {lines.slice(0, 5).map((line, idx) => (
            <div key={idx} className="min-h-[1.2rem]">{line}</div>
          ))}

          {/* Animated Memory Counter */}
          <div className="min-h-[1.2rem]">
            Memory Test : {memory.toLocaleString()}K OK
          </div>

          {/* Rest of BIOS lines */}
          {lines.slice(5).map((line, idx) => (
            <div key={idx} className="min-h-[1.2rem]">{line}</div>
          ))}
        </div>
      </div>

      {/* Bottom status bar with cursor */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-gray-500">System Booting...</span>
        {showCursor && <div className="w-2 h-4 bg-gray-300" />}
      </div>
    </motion.div>
  );
}
