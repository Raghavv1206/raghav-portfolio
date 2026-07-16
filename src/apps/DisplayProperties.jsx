import { useState } from 'react';

const WALLPAPERS = [
  { id: 'blue', label: 'Bliss (Default Blue)', value: '/bliss.jpg' },
  { id: 'olive', label: 'Autumn Field (Olive)', value: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop' },
  { id: 'silver', label: 'Metallic Circuit (Silver)', value: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop' },
  { id: 'dark', label: 'Deep Space', value: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920&auto=format&fit=crop' },
  { id: 'solid-blue', label: 'Solid Windows Blue', value: '#245edb' },
  { id: 'solid-black', label: 'Solid Classic Black', value: '#000000' }
];

export default function DisplayProperties({ 
  currentTheme = 'blue', 
  currentWallpaper = '/bliss.jpg', 
  soundEnabled = true, 
  setTheme, 
  setWallpaper, 
  setSoundEnabled,
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const [selectedSound, setSelectedSound] = useState(soundEnabled);

  const handleApply = () => {
    if (setTheme) setTheme(selectedTheme);
    if (setWallpaper) setWallpaper(selectedWallpaper);
    if (setSoundEnabled) setSoundEnabled(selectedSound);
  };

  const handleOK = () => {
    handleApply();
    if (onClose) onClose();
  };

  const previewBackground = () => {
    if (selectedWallpaper.startsWith('#') || selectedWallpaper.startsWith('rgb')) {
      return { backgroundColor: selectedWallpaper };
    }
    return { backgroundImage: `url(${selectedWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' };
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-black font-sans text-xs p-3 justify-between select-none">
      {/* Tabs */}
      <div className="flex border-b border-[#aca899] gap-[2px] relative z-10">
        {['themes', 'desktop', 'sounds'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 border-t border-l border-r border-[#aca899] rounded-t-md relative -bottom-[1px] font-sans font-semibold capitalize ${
              activeTab === tab 
                ? 'bg-[#ece9d8] border-b-transparent z-20 pb-[5px]' 
                : 'bg-[#dcd9c8] border-b-[#aca899] hover:bg-[#eae8db] text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents Frame */}
      <div className="flex-1 border-l border-r border-b border-[#aca899] bg-[#ece9d8] p-3 flex flex-col gap-3 min-h-0">
        
        {/* Monitor Preview (Only for Themes and Desktop tabs) */}
        {(activeTab === 'themes' || activeTab === 'desktop') && (
          <div className="flex justify-center items-center py-2 flex-shrink-0">
            {/* Monitor Shell */}
            <div className="relative w-40 h-28 bg-[#c0c0c0] border-4 border-t-white border-l-white border-r-[#808080] border-b-[#808080] rounded shadow-md flex items-center justify-center p-[6px]">
              {/* Screen Area */}
              <div 
                className="w-full h-full bg-blue-900 border border-black shadow-inner overflow-hidden flex flex-col justify-end p-1 relative"
                style={previewBackground()}
              >
                {/* Micro Windows UI inside monitor */}
                <div className="absolute top-2 left-2 w-4 h-4 bg-white/20 rounded-sm"></div>
                <div className="absolute top-8 left-2 w-4 h-4 bg-white/20 rounded-sm"></div>
                <div className="w-full h-2 bg-[#245edb] border-t border-white/20 flex items-center px-[2px] gap-[1px]">
                  <div className="w-3 h-[6px] bg-[#3f8845] rounded-r-xs"></div>
                  <div className="w-6 h-[4px] bg-[#3b7bed] rounded-xs"></div>
                </div>
              </div>
              {/* Stand */}
              <div className="absolute top-[108px] w-8 h-3 bg-[#808080] left-1/2 -translate-x-1/2"></div>
              {/* Base */}
              <div className="absolute top-[116px] w-16 h-2 bg-[#505050] rounded-b left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        )}

        {/* Tab contents */}
        <div className="flex-1 overflow-y-auto min-h-0 bg-[#fdfdfd] border border-[#7f9db9] p-3 rounded shadow-inner text-gray-800">
          
          {activeTab === 'themes' && (
            <div className="flex flex-col gap-2">
              <label className="font-bold block">Theme Selector:</label>
              <select 
                value={selectedTheme} 
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full border border-gray-400 p-1 bg-white"
              >
                <option value="blue">Windows XP Blue Style</option>
                <option value="olive">Windows XP Olive Green Style</option>
                <option value="silver">Windows XP Metallic Silver Style</option>
              </select>
              <p className="text-[10px] text-gray-500 mt-2">
                Selecting a theme adjusts the taskbar color, window frame style, start button layout, and window button behaviors.
              </p>
            </div>
          )}

          {activeTab === 'desktop' && (
            <div className="flex flex-col gap-2 h-full">
              <label className="font-bold block">Desktop Background Wallpaper:</label>
              <div className="flex-1 overflow-y-auto border border-gray-300 bg-white max-h-36">
                {WALLPAPERS.map((wp) => (
                  <div 
                    key={wp.id}
                    onClick={() => setSelectedWallpaper(wp.value)}
                    className={`p-1.5 cursor-pointer text-[11px] ${selectedWallpaper === wp.value ? 'bg-[#316ac5] text-white font-semibold' : 'hover:bg-gray-100'}`}
                  >
                    {wp.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sounds' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="enable-sound"
                  checked={selectedSound} 
                  onChange={(e) => setSelectedSound(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="enable-sound" className="font-bold cursor-pointer">Enable Windows XP System Sounds</label>
              </div>
              <p className="text-[10px] text-gray-500">
                Toggles sound effects played during system alerts, mouse clicks, and logging off/shutting down.
              </p>
              
              <div className="border border-gray-300 p-3 bg-gray-50 rounded flex flex-col gap-2">
                <span className="font-semibold text-gray-700">Preview System Sounds:</span>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => new Audio('/sounds/error.wav').play().catch(()=>{})}
                    className="px-3 py-1 border border-gray-400 bg-white hover:bg-gray-100 shadow-sm active:scale-95"
                  >
                    🔔 Error Alert
                  </button>
                  <button 
                    onClick={() => new Audio('/sounds/shutdown.wav').play().catch(()=>{})}
                    className="px-3 py-1 border border-gray-400 bg-white hover:bg-gray-100 shadow-sm active:scale-95"
                  >
                    💤 Shutdown Sound
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-1.5 mt-3 pt-1">
        <button 
          onClick={handleOK}
          className="w-20 py-1 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#d0d0d0] active:border-1 active:border-[#808080] active:pt-1.5 active:pb-0.5 rounded shadow-sm text-center font-bold"
        >
          OK
        </button>
        <button 
          onClick={onClose}
          className="w-20 py-1 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#d0d0d0] active:border-1 active:border-[#808080] active:pt-1.5 active:pb-0.5 rounded shadow-sm text-center"
        >
          Cancel
        </button>
        <button 
          onClick={handleApply}
          disabled={selectedTheme === currentTheme && selectedWallpaper === currentWallpaper && selectedSound === soundEnabled}
          className={`w-20 py-1 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] active:border-1 active:border-[#808080] active:pt-1.5 active:pb-0.5 rounded shadow-sm text-center ${
            (selectedTheme === currentTheme && selectedWallpaper === currentWallpaper && selectedSound === soundEnabled)
              ? 'opacity-50 text-gray-500 cursor-default border-t-[#d0d0d0] border-l-[#d0d0d0] border-r-gray-300 border-b-gray-300' 
              : 'hover:bg-[#d0d0d0] font-semibold'
          }`}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
