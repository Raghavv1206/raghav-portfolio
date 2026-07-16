import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { StartIcon } from './Icons';

const themeStyles = {
  blue: {
    bg: 'linear-gradient(to bottom, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #1941a5 100%)',
    clockBg: 'linear-gradient(to bottom, #0f8de9 0%, #1599f6 10%, #0672ce 100%)',
    border: 'border-[#1941a5]',
    activeBtn: 'bg-[#1c449c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] text-white',
    inactiveBtn: 'bg-[#3b7bed] hover:bg-[#4b8df9] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] border border-[#1941a5]'
  },
  olive: {
    bg: 'linear-gradient(to bottom, #758c48 0%, #9cb86d 9%, #758c48 18%, #758c48 92%, #49582d 100%)',
    clockBg: 'linear-gradient(to bottom, #607937 0%, #7c9b47 10%, #4b5e28 100%)',
    border: 'border-[#49582d]',
    activeBtn: 'bg-[#566835] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] text-white',
    inactiveBtn: 'bg-[#8ba562] hover:bg-[#9cbd73] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] border border-[#49582d]'
  },
  silver: {
    bg: 'linear-gradient(to bottom, #a0a0a8 0%, #dedede 9%, #a0a0a8 18%, #a0a0a8 92%, #707078 100%)',
    clockBg: 'linear-gradient(to bottom, #909098 0%, #c0c0c8 10%, #707078 100%)',
    border: 'border-[#707078]',
    activeBtn: 'bg-[#808088] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] text-white',
    inactiveBtn: 'bg-[#b0b0b8] hover:bg-[#c8c8d0] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] border border-[#707078]'
  }
};

export default function Taskbar({ 
  openWindows, 
  activeWindow, 
  appsConfig, 
  toggleWindow, 
  isStartMenuOpen, 
  toggleStartMenu,
  theme = 'blue'
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const style = themeStyles[theme] || themeStyles.blue;

  return (
    <div 
      className="taskbar h-[40px] w-full flex items-center justify-between z-50 text-white font-sans text-sm select-none border-t border-[#3f8cf3]/85"
      style={{
        background: style.bg,
      }}
    >
      {/* Start Button */}
      <div className="flex h-full">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleStartMenu(); }}
          className={`h-full flex items-center gap-1 px-4 rounded-r-[15px] border-r border-[#1941a5] transition-all hover:brightness-110 active:brightness-95 active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.3)] ${
            isStartMenuOpen 
              ? 'brightness-95 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]' 
              : 'shadow-[inset_-2px_0_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)]'
          }`}
          style={{
            background: 'linear-gradient(to bottom, #3c8227 0%, #4ea72f 5%, #59bd38 12%, #429226 50%, #35761c 90%, #295b14 100%)',
          }}
        >
          <img 
            src="/xp_logo_transparent.png" 
            alt="Start" 
            className="w-7 h-7 object-contain"
          />
          <span 
            className="text-white text-[19px] font-bold font-sans italic tracking-wide select-none"
            style={{ 
              fontFamily: '"Trebuchet MS", sans-serif',
              textShadow: '1px 1px 1px rgba(0, 0, 0, 0.8)'
            }}
          >
            Start
          </span>
        </button>
        
        {/* Divider */}
        <div className="w-[10px] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTEgMHYxMDBIMSJzdHJva2U9IiMzZjhjZjMiIHN0cm9rZS1kYXNoYXJyYXk9IjIgMiIvPjwvc3ZnPg==')] bg-repeat-y opacity-30 mx-1"></div>
      </div>

      {/* Taskbar Apps */}
      <div className="flex-1 px-2 flex items-center gap-1 h-full overflow-hidden">
        {openWindows.map(win => {
          const app = appsConfig.find(a => a.id === win.id);
          const isActive = activeWindow === win.id && !win.minimized;
          return (
            <button
              key={win.id}
              onClick={() => toggleWindow(win.id)}
              className={`h-[30px] px-3 flex items-center gap-2 rounded-sm max-w-[150px] w-full text-left truncate transition-all ${
                isActive ? style.activeBtn : style.inactiveBtn
              }`}
            >
              {app && <app.icon className="w-4 h-4 flex-shrink-0" />}
              <span className="truncate text-xs font-semibold">{app ? app.title : ''}</span>
            </button>
          );
        })}
      </div>

      {/* Tray Area */}
      <div 
        className={`h-full flex items-center px-4 pl-6 border-l ${style.border} shadow-[inset_1px_0_0_rgba(255,255,255,0.2)]`}
        style={{
          background: style.clockBg,
        }}
      >
        <ChevronRight className="w-4 h-4 text-white opacity-80 mr-2" />
        <span className="text-xs font-normal" style={{ textShadow: '0 0 2px rgba(0,0,0,1)' }}>
          {format(time, 'h:mm a')}
        </span>
      </div>
    </div>
  );
}
