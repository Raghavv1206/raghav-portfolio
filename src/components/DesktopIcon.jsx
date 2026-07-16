import { useState, useEffect, useRef } from 'react';

export default function DesktopIcon({ 
  title, 
  Icon, 
  isSelected, 
  isEditing, 
  onRenameComplete 
}) {
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onRenameComplete(editTitle);
    } else if (e.key === 'Escape') {
      setEditTitle(title);
      onRenameComplete(title); // Cancel
    }
  };

  const handleBlur = () => {
    onRenameComplete(editTitle);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-24 p-2 rounded select-none group transition-all duration-75"
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {/* Icon Area */}
      <div className="w-12 h-12 flex items-center justify-center mb-1 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
        {Icon && <Icon className="w-10 h-10 text-white drop-shadow-md" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} />}
      </div>

      {/* Title Text or Editor Input */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="text-black text-xs text-center font-sans bg-white border border-[#2f71cd] px-1 rounded w-full outline-none select-text animate-none"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
      ) : (
        <span 
          className={`text-white text-xs font-semibold text-center drop-shadow-md px-1 rounded transition-colors ${
            isSelected 
              ? 'bg-[#0055e5] border border-blue-400 break-words whitespace-normal max-w-full' 
              : 'bg-transparent border border-transparent truncate w-full'
          }`} 
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
        >
          {title}
        </span>
      )}
    </div>
  );
}
