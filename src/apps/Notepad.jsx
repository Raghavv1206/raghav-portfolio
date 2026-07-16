import { useState, useEffect } from 'react';

export default function Notepad({ initialText = '', onSave, onClose }) {
  const [text, setText] = useState(initialText);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSave = () => {
    if (onSave) {
      onSave(text);
    }
    setActiveMenu(null);
  };

  const handleNew = () => {
    if (window.confirm('Discard current changes and start a new document?')) {
      setText('');
    }
    setActiveMenu(null);
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-black select-none font-sans relative">
      {/* Menu Bar */}
      <div className="h-6 bg-[#ece9d8] flex items-center px-1 text-xs text-black/90 border-b border-gray-300 relative z-20">
        <div className="relative">
          <span 
            onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
            className={`hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-pointer select-none ${activeMenu === 'file' ? 'bg-[#316ac5] text-white' : ''}`}
          >
            File
          </span>
          {activeMenu === 'file' && (
            <div className="absolute left-0 mt-1 bg-white border border-gray-400 shadow-md py-1 min-w-[120px] text-xs z-50 text-black">
              <div onClick={handleNew} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">New</div>
              <div onClick={handleSave} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer font-bold">Save</div>
              <div className="h-[1px] bg-gray-300 my-1"></div>
              <div onClick={onClose} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Exit</div>
            </div>
          )}
        </div>
        <div className="relative ml-2">
          <span 
            onClick={() => setActiveMenu(activeMenu === 'edit' ? null : 'edit')}
            className={`hover:bg-[#316ac5] hover:text-white px-2 py-0.5 rounded-sm cursor-pointer select-none ${activeMenu === 'edit' ? 'bg-[#316ac5] text-white' : ''}`}
          >
            Edit
          </span>
          {activeMenu === 'edit' && (
            <div className="absolute left-0 mt-1 bg-white border border-gray-400 shadow-md py-1 min-w-[120px] text-xs z-50 text-black">
              <div onClick={() => { setText(''); setActiveMenu(null); }} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Clear All</div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Textarea */}
      <div 
        className="flex-1 bg-white border-l border-t border-[#aca899] shadow-inner p-1 overflow-hidden"
        onClick={() => setActiveMenu(null)}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full resize-none border-none outline-none font-mono text-sm p-1 leading-normal text-black bg-white select-text"
          placeholder="Type your text here..."
        />
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#ece9d8] border-t border-[#aca899] flex items-center justify-between px-3 text-[10px] text-black">
        <span>Characters: {charCount}</span>
        <span>Words: {wordCount}</span>
      </div>
    </div>
  );
}
