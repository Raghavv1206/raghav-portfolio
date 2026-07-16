import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  IeIcon, ContactSyncIcon, AboutIcon, MediaPlayerIcon,
  PaintIcon, PlayArrowIcon, LogOffIcon, ShutDownIcon,
  GithubIcon, LinkedinIcon, PdfIcon, MinesweeperIcon,
  MailIcon
} from './Icons';

const themeStyles = {
  blue: {
    headerBg: 'linear-gradient(to bottom, #1d62f0 0%, #1646a7 100%)',
    headerBorder: '1px solid #73a9f9',
    border: 'border-[#135ce4]',
    rightColBg: 'bg-[#d3e5fa]',
    rightColBorder: 'border-l border-white',
    rightColDivider: 'bg-gradient-to-r from-transparent via-blue-300 to-transparent',
    footerBg: 'linear-gradient(to bottom, #1d62f0 0%, #1646a7 100%)',
    footerBorder: '1px solid #73a9f9'
  },
  olive: {
    headerBg: 'linear-gradient(to bottom, #7c9e52 0%, #566f36 100%)',
    headerBorder: '1px solid #a8c886',
    border: 'border-[#657f41]',
    rightColBg: 'bg-[#e6ebd7]',
    rightColBorder: 'border-l border-white',
    rightColDivider: 'bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent',
    footerBg: 'linear-gradient(to bottom, #7c9e52 0%, #566f36 100%)',
    footerBorder: '1px solid #a8c886'
  },
  silver: {
    headerBg: 'linear-gradient(to bottom, #a2a2ab 0%, #73737b 100%)',
    headerBorder: '1px solid #dcdce1',
    border: 'border-[#7b7b84]',
    rightColBg: 'bg-[#e3e3e7]',
    rightColBorder: 'border-l border-white',
    rightColDivider: 'bg-gradient-to-r from-transparent via-gray-400/40 to-transparent',
    footerBg: 'linear-gradient(to bottom, #a2a2ab 0%, #73737b 100%)',
    footerBorder: '1px solid #dcdce1'
  }
};

export default function StartMenu({
  isOpen,
  toggleStartMenu,
  openWindow,
  theme = 'blue',
  setTheme,
  soundEnabled,
  setSoundEnabled,
  playSound
}) {
  if (!isOpen) return null;

  const style = themeStyles[theme] || themeStyles.blue;
  const [allProgramsOpen, setAllProgramsOpen] = useState(false);
  const flyoutTimeout = useRef(null);

  const handleSocialClick = (url) => {
    if (playSound) playSound('click');
    window.open(url, '_blank', 'noopener,noreferrer');
    toggleStartMenu();
  };

  const handleShutDown = () => {
    if (playSound) playSound('shutdown');
    // Reload to boot/loading screen
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const handleAllProgramsEnter = () => {
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current);
    setAllProgramsOpen(true);
  };

  const handleAllProgramsLeave = () => {
    flyoutTimeout.current = setTimeout(() => {
      setAllProgramsOpen(false);
    }, 200);
  };

  const handleFlyoutEnter = () => {
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current);
  };

  return (
    <motion.div
      className={`start-menu absolute bottom-[40px] left-0 w-[420px] bg-white rounded-tr-lg rounded-tl-[8px] flex flex-col font-sans select-none z-[60] border-2 ${style.border} overflow-visible shadow-xp`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.15 }}
      style={{
        boxShadow: "2px 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <div
        className="h-16 flex items-center px-2 py-2 gap-3"
        style={{
          background: style.headerBg,
          borderTop: style.headerBorder
        }}
      >
        <div className="w-12 h-12 bg-[#e4a369] rounded shadow-[0_0_2px_rgba(0,0,0,0.5)] relative overflow-hidden flex items-center justify-center p-[2px]">
          <div className="w-full h-full border border-white rounded-sm overflow-hidden bg-white">
            <img src="/avatar.jpg" alt="Raghav Mishra" className="w-full h-full object-cover" />
          </div>
        </div>
        <span className="text-white text-lg font-bold drop-shadow-md" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}>Raghav Mishra</span>
      </div>

      {/* Body */}
      <div className="flex bg-white flex-1 min-h-[380px] overflow-visible">
        {/* Left Column */}
        <div className="flex-1 flex flex-col py-2 px-1 border-r border-[#96b4db]">
          {/* Main Apps */}
          <div className="flex flex-col gap-0 pb-2 border-b border-gradient-to-r from-transparent via-[#d6e5f5] to-transparent">
            <StartMenuItem icon={<IeIcon className="w-8 h-8" />} title="My Projects" subtitle="View Raghav's projects" onClick={() => { openWindow('projects'); toggleStartMenu(); }} />
            <StartMenuItem icon={<ContactSyncIcon className="w-8 h-8" />} title="Contact Me" subtitle="Send an email message" onClick={() => { openWindow('contact'); toggleStartMenu(); }} />
          </div>

          {/* Other Apps */}
          <div className="flex flex-col gap-1 py-1 flex-1 relative">
            <StartMenuItem icon={<AboutIcon className="w-6 h-6" />} title="About Me" onClick={() => { openWindow('about'); toggleStartMenu(); }} small />
            <StartMenuItem icon={<MinesweeperIcon className="w-6 h-6" />} title="Minesweeper" onClick={() => { openWindow('minesweeper'); toggleStartMenu(); }} small />
            <StartMenuItem icon={<PaintIcon className="w-6 h-6" />} title="MS Paint" onClick={() => { openWindow('paint'); toggleStartMenu(); }} small />
            <StartMenuItem icon={<MediaPlayerIcon className="w-6 h-6" />} title="XP Media Player" onClick={() => { openWindow('mediaplayer'); toggleStartMenu(); }} small />
          </div>

          {/* All Programs trigger */}
          <div 
            onMouseEnter={handleAllProgramsEnter}
            onMouseLeave={handleAllProgramsLeave}
            className="mt-auto pl-4 pr-1 pt-2 border-t border-[#d3e5fa] flex items-center justify-between group cursor-pointer hover:bg-[#2f71cd] hover:text-white pb-1 rounded-sm relative"
          >
            <span className="font-bold text-[11px] group-hover:text-white text-gray-800">All Programs</span>
            <PlayArrowIcon className="w-6 h-6 text-green-600 group-hover:text-green-300" />
          </div>
        </div>

        {/* Right Column */}
        <div className={`w-[180px] ${style.rightColBg} ${style.rightColBorder} flex flex-col pt-2 px-1`}>
          <div className="text-[10px] font-bold text-blue-900/60 px-2 pb-1 uppercase tracking-wider">Social Links</div>
          <StartMenuSmallItem icon={<GithubIcon className="w-5 h-5" />} title="Github" onClick={() => handleSocialClick('https://github.com/Raghavv1206')} />
          <StartMenuSmallItem icon={<LinkedinIcon className="w-5 h-5" />} title="LinkedIn" onClick={() => handleSocialClick('https://linkedin.com/in/raghav-mishra-677418316')} />
          <StartMenuSmallItem icon={<PdfIcon className="w-5 h-5" />} title="My Resume" onClick={() => { openWindow('resume'); toggleStartMenu(); }} />

          <div className={`w-full h-[1px] ${style.rightColDivider} my-2`} />

          <div className="text-[10px] font-bold text-blue-900/60 px-2 pb-1 uppercase tracking-wider">XP Themes</div>
          <StartMenuSmallItem
            icon={<div className={`w-3 h-3 rounded-full bg-blue-600 border border-white ${theme === 'blue' ? 'ring-1 ring-blue-600' : ''}`} />}
            title="Classic Blue"
            isSelected={theme === 'blue'}
            onClick={() => setTheme('blue')}
          />
          <StartMenuSmallItem
            icon={<div className={`w-3 h-3 rounded-full bg-[#7c9b47] border border-white ${theme === 'olive' ? 'ring-1 ring-[#7c9b47]' : ''}`} />}
            title="Olive Green"
            isSelected={theme === 'olive'}
            onClick={() => setTheme('olive')}
          />
          <StartMenuSmallItem
            icon={<div className={`w-3 h-3 rounded-full bg-gray-400 border border-white ${theme === 'silver' ? 'ring-1 ring-gray-400' : ''}`} />}
            title="Metallic Silver"
            isSelected={theme === 'silver'}
            onClick={() => setTheme('silver')}
          />

          <div className={`w-full h-[1px] ${style.rightColDivider} my-2`} />
          <StartMenuSmallItem
            icon={<span className="text-xs">{soundEnabled ? "🔊" : "🔇"}</span>}
            title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
            onClick={() => setSoundEnabled(!soundEnabled)}
          />
        </div>
      </div>

      {/* Programs Flyout Side Panel */}
      {allProgramsOpen && (
        <div 
          onMouseEnter={handleFlyoutEnter}
          onMouseLeave={handleAllProgramsLeave}
          className="absolute left-[416px] bottom-10 w-[200px] bg-white border-2 border-[#135ce4] rounded-r-md rounded-tl-md shadow-2xl p-1.5 flex flex-col z-[100] text-black"
          style={{
            boxShadow: "4px 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          <div className="text-[9px] font-bold text-blue-900/60 px-2.5 py-1 uppercase tracking-wider border-b border-gray-100 mb-1">Available Programs</div>
          <StartMenuItem icon={<AboutIcon className="w-5 h-5" />} title="About Me" onClick={() => { openWindow('about'); toggleStartMenu(); }} small />
          <StartMenuItem icon={<PdfIcon className="w-5 h-5" />} title="My Resume" onClick={() => { openWindow('resume'); toggleStartMenu(); }} small />
          <StartMenuItem icon={<IeIcon className="w-5 h-5" />} title="My Projects" onClick={() => { openWindow('projects'); toggleStartMenu(); }} small />
          <StartMenuItem icon={<MailIcon className="w-5 h-5" />} title="Contact Me" onClick={() => { openWindow('contact'); toggleStartMenu(); }} small />
          <div className="h-[1px] bg-gray-200 my-1 mx-1" />
          <StartMenuItem icon={<MinesweeperIcon className="w-5 h-5" />} title="Minesweeper" onClick={() => { openWindow('minesweeper'); toggleStartMenu(); }} small />
          <StartMenuItem icon={<PaintIcon className="w-5 h-5" />} title="MS Paint" onClick={() => { openWindow('paint'); toggleStartMenu(); }} small />
          <StartMenuItem icon={<MediaPlayerIcon className="w-5 h-5" />} title="XP Media Player" onClick={() => { openWindow('mediaplayer'); toggleStartMenu(); }} small />
        </div>
      )}

      {/* Footer */}
      <div
        className="h-10 flex items-center justify-end px-4 gap-4"
        style={{
          background: style.footerBg,
          borderTop: style.footerBorder
        }}
      >
        <div
          onClick={handleShutDown}
          className="flex items-center gap-1 cursor-pointer group hover:brightness-110 px-2 py-1 rounded hover:bg-white/10 transition-colors"
        >
          <ShutDownIcon className="w-6 h-6 shadow-sm" />
          <span className="text-white text-xs font-semibold">Shut Down</span>
        </div>
      </div>
    </motion.div>
  );
}

function StartMenuItem({ icon, title, subtitle, onClick, small }) {
  return (
    <div className={`flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white text-gray-800 rounded group cursor-pointer ${small ? 'py-1' : 'py-2'}`} onClick={onClick}>
      <div className={`flex items-center justify-center flex-shrink-0 ${small ? 'w-6 h-6 ml-1' : 'w-8 h-8'}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[13px] group-hover:text-white leading-tight">{title}</span>
        {subtitle && <span className="text-[10px] text-gray-500 group-hover:text-gray-200 mt-0.5">{subtitle}</span>}
      </div>
    </div>
  );
}

function StartMenuSmallItem({ icon, title, isSelected, hasArrow, onClick }) {
  return (
    <div className={`flex items-center gap-2 p-1.5 rounded group cursor-pointer ${isSelected ? 'bg-[#2f71cd] text-white font-bold' : 'hover:bg-[#2f71cd] hover:text-white text-[#1a3b6e] font-semibold'}`} onClick={onClick}>
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs">{title}</span>
      {hasArrow && (
        <div className="ml-auto">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </div>
      )}
    </div>
  );
}
