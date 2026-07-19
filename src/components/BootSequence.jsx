import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './LoginScreen';
import VideoBuddy from './VideoBuddy';

export default function BootSequence({ onComplete }) {
  const containerRef = useRef(null);
  // Steps: bios1, bootmenu1, cursor, setup_loading, setup_welcome, bios2, bootmenu2, xp_loading, welcome_screen
  const [step, setStep] = useState('f11_prompt');
  const [memory, setMemory] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [biosLines, setBiosLines] = useState([]);
  const [setupStatus, setSetupStatus] = useState('Press F6 if you need to install a third party SCSI or RAID Driver...');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Selected option in the boot menu: 0 = Start Windows Normally, 1 = Install Windows
  const [selectedOption, setSelectedOption] = useState(0);

  // Store the preloaded startup sound so we can play it later
  const [startupAudio] = useState(() => {
    const audio = new Audio('/sounds/startup.wav');
    audio.preload = 'auto';
    return audio;
  });

  // Clean up audio on unmount to stop playback if skipped
  useEffect(() => {
    return () => {
      startupAudio.pause();
      startupAudio.currentTime = 0;
    };
  }, [startupAudio]);

  // Blinking Cursor interval
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Global Audio Unlocker on User Gesture to bypass browser autoplay blocks
  useEffect(() => {
    const unlock = () => {
      startupAudio.volume = 0;
      startupAudio.play()
        .then(() => {
          startupAudio.pause();
          startupAudio.currentTime = 0;
          startupAudio.volume = 1;
          // Successfully unlocked, remove listeners
          document.removeEventListener('click', unlock);
          document.removeEventListener('keydown', unlock);
        })
        .catch(() => {});
    };
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);
    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
    };
  }, [startupAudio]);

  // Auto scroll to bottom on BIOS text updates or menu selection display
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [biosLines, step]);

  // STEP 1: BIOS 1 Animation
  useEffect(() => {
    if (step !== 'bios1') return;
    
    // RAM counting
    let memValue = 0;
    const targetMem = 524288; // 524,288K OK
    const memInterval = setInterval(() => {
      memValue += 32768;
      if (memValue >= targetMem) {
        setMemory(targetMem);
        clearInterval(memInterval);
      } else {
        setMemory(memValue);
      }
    }, 20);

    const sequence = [
      { delay: 100, text: 'Award Modular BIOS v6.00PG, An Energy Star Ally' },
      { delay: 200, text: 'Copyright (C) 1984-2003, Award Software, Inc.' },
      { delay: 350, text: 'ASUS P4S800-MX ACPI BIOS Revision 1008' },
      { delay: 450, text: 'Copyright (C) 2003, ASUSTeK COMPUTER INC.' },
      { delay: 600, text: '' },
      { delay: 700, text: 'Main Processor : Intel(R) Pentium(R) 4 CPU 2.40GHz' },
      // Memory testing line is handled dynamically
      { delay: 1100, text: 'IDE Channel 0 Device 0 : WDC WD400BB-00JRA0  40.0GB  Ultra DMA Mode-5' },
      { delay: 1250, text: 'IDE Channel 0 Device 1 : None' },
      { delay: 1400, text: 'IDE Channel 1 Device 0 : ASUS DVD-E616A3     48x/16x DVD-ROM' },
      { delay: 1550, text: 'IDE Channel 1 Device 1 : None' },
      { delay: 1750, text: '' },
      { delay: 1900, text: 'Verifying DMI Pool Data ......' },
      { delay: 2150, text: 'Boot from Hard Disk...' }
    ];

    sequence.forEach((line) => {
      setTimeout(() => {
        setBiosLines(prev => [...prev, line.text]);
      }, line.delay);
    });

    // Advance to boot menu after BIOS 1 completes
    const transitionTimer = setTimeout(() => {
      setStep('bootmenu1');
    }, 2800);

    return () => {
      clearInterval(memInterval);
      clearTimeout(transitionTimer);
    };
  }, [step]);

  // Keyboard navigation for Boot Menus
  useEffect(() => {
    const isBootMenu = step === 'bootmenu1' || step === 'bootmenu2';
    if (!isBootMenu) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedOption(prev => (prev === 0 ? 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(selectedOption);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, selectedOption]);

  const handleSelect = (optionIdx) => {
    // Unlock audio during user gesture so it can play later on the welcome screen
    startupAudio.volume = 0;
    startupAudio.play().then(() => {
      startupAudio.pause();
      startupAudio.currentTime = 0;
      startupAudio.volume = 1;
    }).catch(() => {});

    if (step === 'bootmenu1') {
      if (optionIdx === 0) {
        // Start Windows Normally -> bypass Setup
        setStep('xp_loading');
      } else {
        // Install Windows -> go to Setup
        setStep('cursor');
      }
    } else if (step === 'bootmenu2') {
      if (optionIdx === 0) {
        setStep('xp_loading');
      } else {
        // Reboot back to setup
        setStep('cursor');
      }
    }
  };

  // STEP 3: Cursor -> Setup Text
  useEffect(() => {
    if (step !== 'cursor') return;
    const timer = setTimeout(() => {
      setStep('setup_loading');
    }, 1200);
    return () => clearTimeout(timer);
  }, [step]);

  // STEP 4: Setup Text screen animations
  useEffect(() => {
    if (step !== 'setup_loading') return;

    // Change status bar text over time
    const s1 = setTimeout(() => {
      setSetupStatus('Setup is loading files (hal.dll)...');
    }, 1000);
    const s2 = setTimeout(() => {
      setSetupStatus('Setup is loading files (ntfs.sys)...');
    }, 1800);
    const s3 = setTimeout(() => {
      setSetupStatus('Setup is starting Windows...');
    }, 2800);
    const s4 = setTimeout(() => {
      setStep('setup_welcome');
    }, 3800);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, [step]);

  // STEP 5: Setup Welcome Screen -> BIOS 2
  useEffect(() => {
    if (step !== 'setup_welcome') return;
    const timer = setTimeout(() => {
      setStep('bios2');
    }, 2800);
    return () => clearTimeout(timer);
  }, [step]);

  // STEP 6: BIOS 2 (Restart phase)
  useEffect(() => {
    if (step !== 'bios2') return;

    // Fast-track BIOS lines and memory check
    setMemory(524288);
    setBiosLines([
      'Award Modular BIOS v6.00PG, An Energy Star Ally',
      'Copyright (C) 1984-2003, Award Software, Inc.',
      'ASUS P4S800-MX ACPI BIOS Revision 1008',
      'Copyright (C) 2003, ASUSTeK COMPUTER INC.',
      '',
      'Main Processor : Intel(R) Pentium(R) 4 CPU 2.40GHz',
      'IDE Channel 0 Device 0 : WDC WD400BB-00JRA0  40.0GB  Ultra DMA Mode-5',
      'IDE Channel 0 Device 1 : None',
      'IDE Channel 1 Device 0 : ASUS DVD-E616A3     48x/16x DVD-ROM',
      'IDE Channel 1 Device 1 : None',
      '',
      'Verifying DMI Pool Data ......',
      'Boot from Hard Disk...'
    ]);

    const timer = setTimeout(() => {
      setStep('bootmenu2');
    }, 1200);

    return () => clearTimeout(timer);
  }, [step]);

  // STEP 7: XP Animated Loading Screen
  useEffect(() => {
    if (step !== 'xp_loading') return;

    // Segment progress ticks
    const interval = setInterval(() => {
      setLoadingProgress(prev => (prev + 1) % 15);
    }, 150);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setStep('welcome_screen');
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [step]);

  // STEP 8: Welcome Screen -> Complete (Desktop)
  useEffect(() => {
    if (step !== 'welcome_screen') return;

    // Play the pre-unlocked Windows XP Startup Sound
    startupAudio.currentTime = 0;
    startupAudio.volume = 1;
    startupAudio.play().catch(err => console.log('Audio playback prevented:', err));

    const timer = setTimeout(() => {
      onComplete();
    }, 4200);
    return () => clearTimeout(timer);
  }, [step, onComplete, startupAudio]);

  return (
    <div className="w-full h-full bg-black relative select-none overflow-hidden font-bios text-gray-300">
      <AnimatePresence mode="wait">
        
        {/* Step 1 & 6: BIOS POST Screen */}
        {(step === 'bios1' || step === 'bios2' || step === 'bootmenu1' || step === 'bootmenu2') && (
          <motion.div
            ref={containerRef}
            key="bios"
            className="absolute inset-0 bg-black text-gray-300 font-bios text-[11px] md:text-[13px] leading-normal p-4 md:p-6 flex flex-col overflow-y-auto no-scrollbar"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex flex-col gap-4">
              {/* BIOS Specs */}
              <div className="space-y-0.5">
                {biosLines.slice(0, 4).map((line, i) => (
                  <div key={i} className="min-h-[1.2rem]">{line}</div>
                ))}
                
                {/* Dynamic Processor info */}
                {biosLines.length >= 5 && (
                  <div className="min-h-[1.2rem] mt-2">{biosLines[4]}</div>
                )}
                {biosLines.length >= 6 && (
                  <div className="min-h-[1.2rem]">{biosLines[5]}</div>
                )}

                {/* Memory Test */}
                <div className="min-h-[1.2rem]">
                  Memory Testing : {memory.toLocaleString()}K{memory === 524288 ? ' OK' : ''}
                </div>

                {/* IDE Lines */}
                {biosLines.slice(6).map((line, i) => (
                  <div key={i} className="min-h-[1.2rem]">{line}</div>
                ))}
              </div>

              {/* Step 2 & 6b: Interactive Boot device selection menu */}
              {(step === 'bootmenu1' || step === 'bootmenu2') && (
                <div className="w-[320px] md:w-[400px] bg-black border border-[#4a5d75] font-bios flex flex-col self-start shadow-md mb-6 z-20">
                  {/* Title */}
                  <div className="bg-[#2d3d52] text-white font-semibold px-3 py-1.5 border-b border-gray-600">
                    Please select boot device:
                  </div>
                  {/* Options list */}
                  <div className="flex flex-col p-1 gap-0.5 bg-black text-white">
                    <div 
                      className={`px-2 py-1 font-medium cursor-pointer shadow-sm transition-colors ${
                        selectedOption === 0 ? 'bg-gray-200 text-black' : 'text-gray-200 hover:bg-gray-800'
                      }`}
                      onMouseEnter={() => setSelectedOption(0)}
                      onClick={() => handleSelect(0)}
                    >
                      Start Windows Normally
                    </div>
                    <div 
                      className={`px-2 py-1 font-medium cursor-pointer shadow-sm transition-colors ${
                        selectedOption === 1 ? 'bg-gray-200 text-black' : 'text-gray-200 hover:bg-gray-800'
                      }`}
                      onMouseEnter={() => setSelectedOption(1)}
                      onClick={() => handleSelect(1)}
                    >
                      Install Windows
                    </div>
                    <div className="h-[1px] bg-gray-700 my-1 mx-1" />
                    <div className="text-gray-500 px-2 py-1 select-none pointer-events-none">Onboard NIC (IPv4)</div>
                    <div className="text-gray-500 px-2 py-1 select-none pointer-events-none">Onboard NIC (IPv6)</div>
                    <div className="text-gray-500 px-2 py-1 select-none pointer-events-none">BIOS Setup</div>
                    <div className="text-gray-500 px-2 py-1 select-none pointer-events-none">Device Configuration</div>
                    <div className="text-gray-500 px-2 py-1 select-none pointer-events-none">BIOS Flash Update</div>
                    <div className="text-gray-500 px-2 py-1 select-none pointer-events-none">Change Boot Mode Settings</div>
                  </div>
                  <div className="bg-black text-gray-400 border-t border-gray-800 text-[10px] px-3 py-1 flex justify-between">
                    <span>↑↓ to move</span>
                    <span>Enter to select</span>
                    <span>Tap option on touch</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom details */}
            <div className="mt-auto pt-6 flex justify-between items-center text-[10px] text-gray-500 border-t border-gray-900/40">
              <span>Press DEL to enter Setup, F8 for Boot Menu</span>
              <span>07/15/2026-ASUS-P4S800-MX</span>
            </div>
          </motion.div>
        )}

        {/* Step 3: Blank cursor screen */}
        {step === 'cursor' && (
          <motion.div
            key="cursor"
            className="absolute inset-0 bg-black flex items-start justify-start p-6 text-white font-bios text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {showCursor && <span>_</span>}
          </motion.div>
        )}

        {/* Step 4: Windows XP Setup Text Screen */}
        {step === 'setup_loading' && (
          <motion.div
            key="setup_loading"
            className="absolute inset-0 bg-[#000080] text-gray-300 font-bios text-xs md:text-sm p-0 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header bar */}
            <div className="bg-gray-300 text-[#000080] px-6 py-1 font-bold">
              Windows XP Professional Setup
            </div>

            {/* Middle info */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white">
              <div className="max-w-md space-y-4">
                <p>Welcome to Setup.</p>
                <p className="text-gray-300 text-xs">Setup is copying files and initializing configuration...</p>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="bg-gray-300 text-black px-6 py-1 text-xs">
              {setupStatus}
            </div>
          </motion.div>
        )}

        {/* Step 5: Setup Welcome Options Screen */}
        {step === 'setup_welcome' && (
          <motion.div
            key="setup_welcome"
            className="absolute inset-0 bg-[#000080] text-gray-300 font-bios text-xs md:text-sm p-0 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-gray-300 text-[#000080] px-6 py-1 font-bold">
              Windows XP Professional Setup
            </div>

            {/* Welcome Text Content */}
            <div className="flex-1 px-12 py-10 text-white space-y-6">
              <h1 className="text-lg font-bold">Welcome to Setup.</h1>
              
              <div className="space-y-4 leading-relaxed">
                <p>This portion of the Setup program prepares Microsoft(R) Windows(R) XP to run on your computer.</p>
                
                <div className="pl-6 space-y-3 mt-6">
                  <p>• To set up Windows XP now, press ENTER.</p>
                  <p>• To repair a Windows XP installation using Recovery Console, press R.</p>
                  <p>• To quit Setup without installing Windows XP, press F3.</p>
                </div>
              </div>
            </div>

            {/* Bottom status options */}
            <div className="bg-gray-300 text-black px-6 py-1 text-xs flex justify-between font-bold">
              <span>ENTER=Continue</span>
              <span>R=Repair</span>
              <span>F3=Quit</span>
            </div>
          </motion.div>
        )}

        {/* Step 7: Windows XP Animated Loading Screen */}
        {step === 'xp_loading' && (
          <motion.div
            key="xp_loading"
            className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Windows XP Logo Flag */}
            <div className="flex flex-col items-center -mb-8 md:-mb-12">
              <img src="/xp-logo.svg" className="w-[380px] md:w-[480px] h-auto object-contain select-none pointer-events-none" alt="Windows XP Logo" />
            </div>

            {/* Segmented Progress Bar */}
            <div className="w-44 h-3.5 border border-gray-500 rounded-[3px] p-[2px] bg-black flex items-center relative overflow-hidden">
              <div 
                className="h-full flex gap-[2.5px] absolute"
                style={{
                  left: `${(loadingProgress * 9.5) - 20}%`,
                  transition: loadingProgress === 0 ? 'none' : 'left 0.15s linear'
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-[9px] h-full bg-gradient-to-r from-[#2c7bf6] via-[#65a3ff] to-[#1258d3] rounded-[1px]"></div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-10 left-10 text-[10px] text-gray-500 font-sans">
              Copyright © Microsoft Corporation
            </div>
            <div className="absolute bottom-8 right-10 text-gray-400 font-bold text-sm tracking-tight font-sans">
              Microsoft
            </div>
          </motion.div>
        )}

        {/* Step 8: Welcome Screen */}
        {step === 'welcome_screen' && (
          <motion.div
            key="welcome"
            className="absolute inset-0 select-none overflow-hidden flex flex-col justify-between"
            style={{
              background: 'radial-gradient(circle at 12% 25%, #91b5f6 0%, #5a7edc 35%, #5a7edc 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header top blue bar */}
            <div className="h-[12%] w-full bg-[#00218d] border-b-2 border-[#1258d3]"></div>

            {/* Middle Welcome Text */}
            <div className="flex-1 flex items-center justify-center">
              <h1 
                className="text-white text-5xl md:text-6xl font-bold italic tracking-wide font-sans select-none"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 32, 141, 0.6)'
                }}
              >
                Welcome
              </h1>
            </div>

            {/* Footer and Orange Accent Bar */}
            <div className="w-full flex flex-col">
              <div className="h-[3px] w-full bg-[#ff9c00]"></div>
              <div className="h-[12vh] bg-gradient-to-r from-[#21116d] to-[#00218d] flex items-center justify-between px-10">
                {/* Clean footer bar without branding text */}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step: F11 Fullscreen Prompt */}
        {step === 'f11_prompt' && (
          <div className="absolute inset-0 bg-black w-full h-full">
            <VideoBuddy onFinish={() => setStep('bios1')} />
          </div>
        )}

      </AnimatePresence>

      {/* Persistent Skip Intro Button across all phases */}
      <button
        onClick={() => onComplete()}
        className="absolute top-5 right-5 z-[10000] px-4 py-1 text-xs text-black border border-[#002276] rounded-[3px] shadow-[1px_1px_2px_rgba(0,0,0,0.4)] hover:border-[#316ac5] hover:brightness-105 active:brightness-95 transition cursor-pointer select-none font-sans font-medium"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #ece9d8 100%)',
          pointerEvents: 'auto'
        }}
      >
        Skip Intro
      </button>
    </div>
  );
}
