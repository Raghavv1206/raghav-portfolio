import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Windows XP-style context menu item icons (inline SVGs)
const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 3h5l1.5 1.5H14a1 1 0 011 1V13a1 1 0 01-1 1H2a1 1 0 01-1-1V3z" fill="#FFC86B" stroke="#D4A43A" strokeWidth="0.5" />
  </svg>
);

const ShortcutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="1" width="12" height="14" rx="1" fill="#F0F0F0" stroke="#888" strokeWidth="0.5" />
    <path d="M4 4h8M4 6h6M4 8h7" stroke="#333" strokeWidth="0.5" />
  </svg>
);

const TextDocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="1" width="10" height="14" rx="1" fill="#fff" stroke="#5590D2" strokeWidth="0.5" />
    <path d="M5 4h6M5 6h5M5 8h6M5 10h4" stroke="#5590D2" strokeWidth="0.5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M2 1l4 3-4 3z" fill="#000" />
  </svg>
);

// Flatten menu items for rendering
function flattenMenu(menuDef) {
  const result = [];
  for (const entry of menuDef) {
    if (entry.type === 'separator') {
      result.push({ type: 'separator' });
    } else if (entry.type === 'group') {
      for (const item of entry.items) {
        result.push(item);
      }
    } else {
      result.push(entry);
    }
  }
  return result;
}

function SubmenuPanel({ items, parentRect, onAction }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!ref.current || !parentRect) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    let left = 0;
    let top = 0;

    // Check if submenu overflows right
    if (parentRect.right + rect.width > window.innerWidth) {
      left = -rect.width;
    }
    // Check if submenu overflows bottom
    if (parentRect.top + rect.height > window.innerHeight) {
      top = window.innerHeight - parentRect.top - rect.height - 4;
    }

    setPos({ left, top });
  }, [parentRect]);

  return (
    <motion.div
      ref={ref}
      className="absolute z-[9999]"
      style={{
        left: `calc(100% + ${pos.left}px)`,
        top: `${pos.top}px`,
      }}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
    >
      <MenuPanel items={items} onAction={onAction} />
    </motion.div>
  );
}

function MenuPanel({ items, onAction }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const itemRefs = useRef({});
  const flatItems = flattenMenu(items);

  return (
    <div
      className="min-w-[180px] py-[2px] rounded-[1px] shadow-[2px_2px_6px_rgba(0,0,0,0.35)]"
      style={{
        background: '#fff',
        border: '1px solid #868686',
        borderRight: '1px solid #777',
        borderBottom: '1px solid #777',
      }}
    >
      {flatItems.map((item, idx) => {
        if (item.type === 'separator') {
          return (
            <div key={`sep-${idx}`} className="mx-[1px] my-[2px]" style={{ borderTop: '1px solid #C2C2C2', borderBottom: '1px solid #fff' }} />
          );
        }

        const isHovered = hoveredIdx === idx;
        const isDisabled = item.disabled;

        return (
          <div
            key={idx}
            ref={el => itemRefs.current[idx] = el}
            className={`relative flex items-center px-6 py-[3px] text-[11px] cursor-default whitespace-nowrap ${isDisabled ? 'text-[#A0A0A0]' : isHovered ? 'bg-[#2F71CD] text-white' : 'text-black'
              }`}
            style={{
              fontFamily: "'Tahoma', 'Segoe UI', sans-serif",
              fontWeight: item.bold ? 'bold' : 'normal',
              fontSize: '11px',
              lineHeight: '18px',
            }}
            onMouseEnter={() => !isDisabled && setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled && !item.hasSubmenu && onAction) {
                onAction(item.action || item.label);
              }
            }}
          >
            {/* Checkbox area */}
            {item.checked !== undefined && (
              <span className="absolute left-2 text-[8px] font-bold">
                {item.checked ? '✓' : ''}
              </span>
            )}

            {/* Icon area */}
            {item.icon && (
              <span className="mr-2 flex-shrink-0 flex items-center">
                <item.icon />
              </span>
            )}

            <span className="flex-1">{item.label}</span>

            {/* Submenu arrow */}
            {item.hasSubmenu && (
              <span className="ml-4 flex items-center">
                <ArrowRight />
              </span>
            )}

            {/* Submenu */}
            {item.hasSubmenu && isHovered && (
              <SubmenuPanel
                items={[{ type: 'group', items: item.submenu }]}
                parentRect={itemRefs.current[idx]?.getBoundingClientRect()}
                onAction={onAction}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ContextMenu({ 
  x, 
  y, 
  type, 
  onClose, 
  onAction, 
  autoArrange = true, 
  alignToGrid = true, 
  sortBy = 'none', 
  hasClipboard = false, 
  isSystemIcon = false 
}) {
  const menuRef = useRef(null);
  const [adjustedPos, setAdjustedPos] = useState({ x, y });

  const desktopMenuItems = [
    {
      type: 'group', items: [
        {
          label: 'Arrange Icons By', hasSubmenu: true, submenu: [
            { label: 'Name', action: 'sort_name', checked: sortBy === 'name' },
            { label: 'Size', action: 'sort_size', checked: sortBy === 'size' },
            { label: 'Type', action: 'sort_type', checked: sortBy === 'type' },
            { label: 'Modified', action: 'sort_modified', checked: sortBy === 'modified' },
            { type: 'separator' },
            { label: 'Auto Arrange', action: 'toggle_auto_arrange', checked: autoArrange },
            { label: 'Align to Grid', action: 'toggle_align_to_grid', checked: alignToGrid },
          ]
        },
        { label: 'Refresh', action: 'refresh' },
      ]
    },
    { type: 'separator' },
    {
      type: 'group', items: [
        { label: 'Paste', action: 'paste', disabled: !hasClipboard },
        { label: 'Paste Shortcut', disabled: true },
      ]
    },
    { type: 'separator' },
    {
      type: 'group', items: [
        {
          label: 'New', hasSubmenu: true, submenu: [
            { label: 'Folder', action: 'new_folder', icon: FolderIcon },
            { label: 'Shortcut', action: 'new_shortcut', icon: ShortcutIcon },
            { type: 'separator' },
            { label: 'Text Document', action: 'new_text', icon: TextDocIcon },
          ]
        },
      ]
    },
    { type: 'separator' },
    {
      type: 'group', items: [
        { label: 'Properties', action: 'properties' },
      ]
    },
  ];

  const iconMenuItems = [
    {
      type: 'group', items: [
        { label: 'Open', bold: true, action: 'open' },
      ]
    },
    { type: 'separator' },
    {
      type: 'group', items: [
        { label: 'Cut', action: 'cut', disabled: isSystemIcon },
        { label: 'Copy', action: 'copy' },
      ]
    },
    { type: 'separator' },
    {
      type: 'group', items: [
        { label: 'Create Shortcut', disabled: true },
        { label: 'Delete', action: 'delete', disabled: isSystemIcon },
        { label: 'Rename', action: 'rename', disabled: isSystemIcon },
      ]
    },
    { type: 'separator' },
    {
      type: 'group', items: [
        { label: 'Properties', action: 'properties' },
      ]
    },
  ];

  const menuItems = type === 'icon' ? iconMenuItems : desktopMenuItems;

  // Adjust position to stay within viewport
  useEffect(() => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    let newX = x;
    let newY = y;

    if (x + rect.width > window.innerWidth) {
      newX = window.innerWidth - rect.width - 4;
    }
    if (y + rect.height > window.innerHeight) {
      newY = window.innerHeight - rect.height - 4;
    }

    setAdjustedPos({ x: Math.max(0, newX), y: Math.max(0, newY) });
  }, [x, y]);

  // Close on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Use a small delay so the same right-click event doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);
    document.addEventListener('keydown', handleEsc);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      className="context-menu fixed z-[9998]"
      style={{
        left: adjustedPos.x,
        top: adjustedPos.y,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.08 }}
    >
      <MenuPanel items={menuItems} onAction={onAction} />
    </motion.div>
  );
}

