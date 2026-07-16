import { useState } from 'react';

export default function IconProperties({ iconConfig, onRenameSave, onClose }) {
  const [name, setName] = useState(iconConfig.title || '');

  const handleSave = () => {
    if (name.trim() !== '' && onRenameSave) {
      onRenameSave(name);
    }
    if (onClose) onClose();
  };

  const formattedSize = iconConfig.size 
    ? `${iconConfig.size} KB (${(iconConfig.size * 1024).toLocaleString()} bytes)` 
    : '0 KB (0 bytes)';

  const formattedDate = iconConfig.modified 
    ? new Date(iconConfig.modified).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })
    : new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-black font-sans text-xs p-3 justify-between select-none">
      
      {/* File Detail Panel */}
      <div className="flex-1 bg-white border border-gray-400 p-4 rounded shadow-inner flex flex-col gap-4">
        
        {/* Name Header with Mini Icon */}
        <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded shadow-sm">
            {iconConfig.icon && <iconConfig.icon className="w-8 h-8 text-blue-800" />}
          </div>
          <div className="flex-1">
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 px-2 py-1 text-xs w-full bg-white select-text outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Properties Details Grid */}
        <div className="flex-1 flex flex-col gap-3 justify-start py-2 leading-relaxed text-gray-700">
          <div className="flex">
            <span className="w-24 text-gray-500 font-medium">Type of file:</span>
            <span className="flex-1 text-black font-semibold capitalize">{iconConfig.type || 'System Application'}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 font-medium">Location:</span>
            <span className="flex-1 text-black">C:\Documents and Settings\Desktop</span>
          </div>
          <div className="flex border-b border-gray-100 pb-2">
            <span className="w-24 text-gray-500 font-medium">Size:</span>
            <span className="flex-1 text-black font-semibold">{formattedSize}</span>
          </div>

          <div className="flex">
            <span className="w-24 text-gray-500 font-medium">Created:</span>
            <span className="flex-1 text-black">{formattedDate}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 font-medium">Modified:</span>
            <span className="flex-1 text-black">{formattedDate}</span>
          </div>

          <div className="flex items-center mt-3 pt-3 border-t border-gray-200 gap-6">
            <span className="w-20 text-gray-500 font-medium">Attributes:</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5" disabled /> Read-only
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5" disabled /> Archive
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-1.5 mt-3 pt-1">
        <button 
          onClick={handleSave}
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
      </div>
    </div>
  );
}
