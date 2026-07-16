import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AboutIcon, PdfIcon, IeIcon, MailIcon, MinesweeperIcon, PaintIcon, MediaPlayerIcon,
  FolderIcon, ShortcutIcon, TextDocIcon, GiftIcon
} from './Icons';
import Taskbar from './Taskbar';
import Window from './Window';
import StartMenu from './StartMenu';
import DesktopIcon from './DesktopIcon';
import ContextMenu from './ContextMenu';
import ShutdownDialog from './ShutdownDialog';

import AboutMe from '../apps/AboutMe';
import Projects from '../apps/Projects';
import Resume from '../apps/Resume';
import ContactMe from '../apps/ContactMe';
import Minesweeper from '../apps/Minesweeper';
import Paint from '../apps/Paint';
import MediaPlayer from '../apps/MediaPlayer';
import Notepad from '../apps/Notepad';
import Folder from '../apps/Folder';
import DisplayProperties from '../apps/DisplayProperties';
import IconProperties from '../apps/IconProperties';
import AboutPortfolio from '../apps/AboutPortfolio';
import Motorcycle from './Motorcycle';
import Gift from '../apps/Gift';

const blissImg = '/bliss.jpg';

const INITIAL_DESKTOP_ICONS = [
  { id: 'about', title: 'About Me', icon: AboutIcon, Component: AboutMe, size: 45, type: 'system', modified: '2026-06-15T12:00:00.000Z' },
  { id: 'resume', title: 'My Resume', icon: PdfIcon, Component: Resume, size: 62, type: 'document', modified: '2026-07-12T14:30:00.000Z' },
  { id: 'projects', title: 'My Projects', icon: IeIcon, Component: Projects, size: 125, type: 'shortcut', modified: '2026-07-10T10:15:00.000Z' },
  { id: 'contact', title: 'Contact Me', icon: MailIcon, Component: ContactMe, size: 30, type: 'shortcut', modified: '2026-07-09T08:00:00.000Z' },
  { id: 'minesweeper', title: 'Minesweeper', icon: MinesweeperIcon, Component: Minesweeper, size: 85, type: 'game', modified: '2026-05-18T16:45:00.000Z' },
  { id: 'paint', title: 'MS Paint', icon: PaintIcon, Component: Paint, size: 110, type: 'tool', modified: '2026-05-20T11:00:00.000Z' },
  { id: 'mediaplayer', title: 'XP Media Player', icon: MediaPlayerIcon, Component: MediaPlayer, size: 320, type: 'tool', modified: '2026-06-18T09:30:00.000Z' },
  { id: 'gift', title: 'gift.exe', icon: GiftIcon, Component: Gift, size: 15, type: 'tool', modified: '2026-07-16T15:44:39.000Z' }
];

// Helper to arrange icons in a neat column grid starting from top-left
const arrangeIconsGrid = (iconsList, customHeight = null) => {
  const iconWidth = 96;
  const iconHeight = 96;
  const paddingLeft = 20;
  const paddingTop = 20;

  const height = customHeight || (typeof window !== 'undefined' ? window.innerHeight : 768);
  // Max items that can fit vertically
  const maxItemsPerCol = Math.max(1, Math.floor((height - 100) / iconHeight));

  return iconsList.map((icon, index) => {
    const col = Math.floor(index / maxItemsPerCol);
    const row = index % maxItemsPerCol;
    return {
      ...icon,
      x: paddingLeft + col * iconWidth,
      y: paddingTop + row * iconHeight
    };
  });
};

export default function Desktop({ onShutDown }) {
  const [openWindows, setOpenWindows] = useState([]); // { id, zIndex, minimized, maximized }
  const [activeWindow, setActiveWindow] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);
  const [isStandbyActive, setIsStandbyActive] = useState(false);
  const [theme, setTheme] = useState('blue'); // blue, olive, silver
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wallpaper, setWallpaper] = useState(blissImg);

  // Desktop Icons state with absolute grid coordinates
  const [desktopIcons, setDesktopIcons] = useState(() => arrangeIconsGrid(INITIAL_DESKTOP_ICONS));
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [editingIconId, setEditingIconId] = useState(null);

  // Drag-and-drop icon state
  const [draggingIcon, setDraggingIcon] = useState(null); // { id, pointerId, startX, startY, iconStartX, iconStartY }

  // Sorting & View Options
  const [sortBy, setSortBy] = useState('none');
  const [autoArrange, setAutoArrange] = useState(true);
  const [alignToGrid, setAlignToGrid] = useState(true);

  // Drag selection box (Marquee) state
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Clipboard (Copy/Cut)
  const [clipboardIcon, setClipboardIcon] = useState(null);
  const [clipboardAction, setClipboardAction] = useState(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState(null); // { x, y, type, targetId? }

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    if (isStartMenuOpen) closeStartMenu();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'desktop' });
  };

  const handleIconContextMenu = (e, appId) => {
    e.preventDefault();
    e.stopPropagation();
    if (isStartMenuOpen) closeStartMenu();
    setSelectedIconId(appId);
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'icon', targetId: appId });
  };

  const wallpapers = {
    blue: blissImg,
    olive: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop',
    silver: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop'
  };

  // Sync default wallpaper when theme changes
  useEffect(() => {
    setWallpaper(wallpapers[theme] || blissImg);
  }, [theme]);

  // Sync icons on screen resize if autoArrange is on
  useEffect(() => {
    const handleResize = () => {
      if (autoArrange) {
        setDesktopIcons(prev => arrangeIconsGrid(prev));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [autoArrange]);

  // Handle outside keyboard events (Delete, F2 for rename)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIconId) {
        const isSystem = ['about', 'resume', 'projects', 'contact', 'minesweeper', 'paint', 'mediaplayer'].includes(selectedIconId);
        if (e.key === 'Delete' && !isSystem) {
          e.preventDefault();
          setDesktopIcons(prev => prev.filter(i => i.id !== selectedIconId));
          closeWindow(selectedIconId);
          setSelectedIconId(null);
        } else if (e.key === 'F2' && !isSystem) {
          e.preventDefault();
          setEditingIconId(selectedIconId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIconId]);

  const playSound = (soundType) => {
    if (!soundEnabled) return;
    let url = '';
    if (soundType === 'error') url = '/sounds/error.wav';
    else if (soundType === 'shutdown') url = '/sounds/shutdown.wav';

    if (url) {
      const audio = new Audio(url);
      audio.volume = 0.3;
      audio.play().catch(() => { });
    }
  };

  const toggleStartMenu = () => {
    playSound('click');
    setIsStartMenuOpen(!isStartMenuOpen);
  };
  const closeStartMenu = () => setIsStartMenuOpen(false);

  const openWindow = (id) => {
    playSound('click');
    const existing = openWindows.find(w => w.id === id);
    if (existing) {
      if (existing.minimized) {
        setOpenWindows(openWindows.map(w => w.id === id ? { ...w, minimized: false, zIndex: maxZIndex + 1 } : w));
      } else {
        setOpenWindows(openWindows.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
      }
      setActiveWindow(id);
      setMaxZIndex(prev => prev + 1);
      return;
    }
    setOpenWindows([...openWindows, { id, zIndex: maxZIndex + 1, minimized: false, maximized: false }]);
    setActiveWindow(id);
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (id) => {
    playSound('click');
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const toggleMinimize = (id) => {
    playSound('click');
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w));
    if (activeWindow === id) {
      const active = openWindows.find(w => w.id !== id && !w.minimized);
      setActiveWindow(active ? active.id : null);
    } else {
      setActiveWindow(id);
      setOpenWindows(openWindows.map(w => w.id === id ? { ...w, minimized: false, zIndex: maxZIndex + 1 } : w));
      setMaxZIndex(prev => prev + 1);
    }
  };

  const toggleMaximize = (id) => {
    playSound('click');
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  };

  const focusWindow = (id) => {
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
    setActiveWindow(id);
    setMaxZIndex(prev => prev + 1);
  };

  const handleRenameComplete = (id, newName) => {
    setEditingIconId(null);
    if (newName.trim() === '') return;
    setDesktopIcons(prev => prev.map(icon => icon.id === id ? { ...icon, title: newName } : icon));
  };

  // Drag selection handlers
  const handleDesktopMouseDown = (e) => {
    const clickedElement = e.target;

    // Skip if clicking inside windows, taskbars, start menu, context menu or directly on icons
    const isInteractiveTarget =
      clickedElement.closest('.window') ||
      clickedElement.closest('.taskbar') ||
      clickedElement.closest('.desktop-icon') ||
      clickedElement.closest('.start-menu') ||
      clickedElement.closest('.context-menu');

    if (isInteractiveTarget) return;

    // Only close menus when clicking on the empty desktop area
    if (isStartMenuOpen) closeStartMenu();
    if (contextMenu) closeContextMenu();

    // Immediately deselect icon on empty desktop click
    setSelectedIconId(null);

    setIsSelecting(true);
    const x = e.clientX;
    const y = e.clientY;
    setSelectionStart({ x, y });
    setSelectionEnd({ x, y });
  };

  const handleDesktopMouseMove = (e) => {
    if (!isSelecting || !selectionStart) return;
    const x = e.clientX;
    const y = e.clientY;
    setSelectionEnd({ x, y });

    const rectLeft = Math.min(selectionStart.x, x);
    const rectTop = Math.min(selectionStart.y, y);
    const rectRight = Math.max(selectionStart.x, x);
    const rectBottom = Math.max(selectionStart.y, y);

    const desktopRect = e.currentTarget.getBoundingClientRect();

    // Select icon that intersects with the marquee box coordinates
    desktopIcons.forEach(icon => {
      const iconLeft = icon.x + desktopRect.left;
      const iconTop = icon.y + desktopRect.top;
      const iconRight = iconLeft + 96;
      const iconBottom = iconTop + 96;

      const intersects = !(
        iconLeft > rectRight || 
        iconRight < rectLeft || 
        iconTop > rectBottom || 
        iconBottom < rectTop
      );

      if (intersects) {
        setSelectedIconId(icon.id);
      }
    });
  };

  const handleDesktopMouseUp = () => {
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  // Icon dragging handlers
  const handleIconPointerDown = (e, app) => {
    if (e.button === 2) return; // Skip right clicks
    e.stopPropagation();
    setSelectedIconId(app.id);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    setDraggingIcon({
      id: app.id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      iconStartX: app.x,
      iconStartY: app.y,
      hasMoved: false
    });
  };

  const handleIconPointerMove = (e, appId) => {
    if (!draggingIcon || draggingIcon.id !== appId) return;
    e.stopPropagation();

    const deltaX = e.clientX - draggingIcon.startX;
    const deltaY = e.clientY - draggingIcon.startY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      if (!draggingIcon.hasMoved) {
        setDraggingIcon(prev => prev ? { ...prev, hasMoved: true } : null);
      }
    }

    let newX = draggingIcon.iconStartX + deltaX;
    let newY = draggingIcon.iconStartY + deltaY;

    // Boundary constraints: allow dragging near borders but not completely out of view
    newX = Math.max(-20, Math.min(newX, window.innerWidth - 76));
    newY = Math.max(-20, Math.min(newY, window.innerHeight - 116));

    setDesktopIcons(prev => prev.map(icon => icon.id === appId ? { ...icon, x: newX, y: newY } : icon));
  };

  const handleIconPointerUp = (e, appId) => {
    if (!draggingIcon || draggingIcon.id !== appId) return;
    e.stopPropagation();

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    const wasTap = !draggingIcon.hasMoved;
    const isSmallScreen = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    setDesktopIcons(prev => prev.map(icon => {
      if (icon.id === appId) {
        let finalX = icon.x;
        let finalY = icon.y;

        if (alignToGrid) {
          const paddingLeft = 20;
          const paddingTop = 20;
          finalX = Math.round((icon.x - paddingLeft) / 96) * 96 + paddingLeft;
          finalY = Math.round((icon.y - paddingTop) / 96) * 96 + paddingTop;
        }

        // Hard clamp inside screen boundary borders so icons never get stuck outside the screen
        finalX = Math.max(10, Math.min(finalX, window.innerWidth - 110));
        finalY = Math.max(10, Math.min(finalY, window.innerHeight - 150));

        return { ...icon, x: finalX, y: finalY };
      }
      return icon;
    }));

    setDraggingIcon(null);

    if (wasTap && isSmallScreen) {
      openWindow(appId);
    }
  };

  const handleContextMenuAction = (action) => {
    closeContextMenu();

    if (action === 'open' && contextMenu?.targetId) {
      openWindow(contextMenu.targetId);
    } else if (action === 'refresh') {
      playSound('click');
      const prevWp = wallpaper;
      setWallpaper('#000000');
      setTimeout(() => setWallpaper(prevWp), 120);
    } else if (action === 'sort_name') {
      setSortBy('name');
      setDesktopIcons(prev => arrangeIconsGrid([...prev].sort((a, b) => a.title.localeCompare(b.title))));
    } else if (action === 'sort_size') {
      setSortBy('size');
      setDesktopIcons(prev => arrangeIconsGrid([...prev].sort((a, b) => b.size - a.size)));
    } else if (action === 'sort_type') {
      setSortBy('type');
      setDesktopIcons(prev => arrangeIconsGrid([...prev].sort((a, b) => a.type.localeCompare(b.type))));
    } else if (action === 'sort_modified') {
      setSortBy('modified');
      setDesktopIcons(prev => arrangeIconsGrid([...prev].sort((a, b) => new Date(b.modified) - new Date(a.modified))));
    } else if (action === 'toggle_auto_arrange') {
      setAutoArrange(prev => {
        const next = !prev;
        if (next) setDesktopIcons(current => arrangeIconsGrid(current));
        return next;
      });
    } else if (action === 'toggle_align_to_grid') {
      setAlignToGrid(!alignToGrid);
    } else if (action === 'copy' && contextMenu?.targetId) {
      const targetIcon = desktopIcons.find(i => i.id === contextMenu.targetId);
      if (targetIcon) {
        setClipboardIcon(targetIcon);
        setClipboardAction('copy');
      }
    } else if (action === 'cut' && contextMenu?.targetId) {
      const targetIcon = desktopIcons.find(i => i.id === contextMenu.targetId);
      if (targetIcon) {
        setClipboardIcon(targetIcon);
        setClipboardAction('cut');
      }
    } else if (action === 'paste') {
      if (clipboardIcon) {
        if (clipboardAction === 'copy') {
          // Copy duplicate
          const newId = `${clipboardIcon.id}_copy_${Date.now()}`;
          let baseTitle = clipboardIcon.title;
          const isDoc = clipboardIcon.type === 'document';
          const nameWithoutExt = isDoc && baseTitle.endsWith('.txt') ? baseTitle.slice(0, -4) : baseTitle;
          const ext = isDoc ? '.txt' : '';
          
          let count = 1;
          let newTitle = `Copy of ${nameWithoutExt}${ext}`;
          while (desktopIcons.some(i => i.title.toLowerCase() === newTitle.toLowerCase())) {
            count++;
            newTitle = `Copy (${count}) of ${nameWithoutExt}${ext}`;
          }

          // Calculate first grid placement coordinate
          const nextIndex = desktopIcons.length;
          const maxItemsPerCol = Math.max(1, Math.floor((window.innerHeight - 100) / 96));
          const col = Math.floor(nextIndex / maxItemsPerCol);
          const row = nextIndex % maxItemsPerCol;

          const newIcon = {
            ...clipboardIcon,
            id: newId,
            title: newTitle,
            x: 20 + col * 96,
            y: 20 + row * 96,
            modified: new Date().toISOString()
          };
          setDesktopIcons(prev => [...prev, newIcon]);
        } else if (clipboardAction === 'cut') {
          setClipboardIcon(null);
          setClipboardAction(null);
        }
        playSound('click');
      }
    } else if (action === 'new_folder') {
      let folderCount = 1;
      let newTitle = 'New Folder';
      while (desktopIcons.some(i => i.title.toLowerCase() === newTitle.toLowerCase())) {
        folderCount++;
        newTitle = `New Folder (${folderCount})`;
      }

      // Calculate grid coordinates
      const nextIndex = desktopIcons.length;
      const maxItemsPerCol = Math.max(1, Math.floor((window.innerHeight - 100) / 96));
      const col = Math.floor(nextIndex / maxItemsPerCol);
      const row = nextIndex % maxItemsPerCol;

      const newIcon = {
        id: `folder_${Date.now()}`,
        title: newTitle,
        icon: FolderIcon,
        type: 'folder',
        size: 0,
        x: 20 + col * 96,
        y: 20 + row * 96,
        modified: new Date().toISOString()
      };
      setDesktopIcons(prev => [...prev, newIcon]);
      playSound('click');
    } else if (action === 'new_shortcut') {
      let shortcutCount = 1;
      let newTitle = 'New Shortcut';
      while (desktopIcons.some(i => i.title.toLowerCase() === newTitle.toLowerCase())) {
        shortcutCount++;
        newTitle = `New Shortcut (${shortcutCount})`;
      }

      // Calculate grid coordinates
      const nextIndex = desktopIcons.length;
      const maxItemsPerCol = Math.max(1, Math.floor((window.innerHeight - 100) / 96));
      const col = Math.floor(nextIndex / maxItemsPerCol);
      const row = nextIndex % maxItemsPerCol;

      const newIcon = {
        id: `shortcut_${Date.now()}`,
        title: newTitle,
        icon: ShortcutIcon,
        type: 'shortcut',
        size: 1,
        x: 20 + col * 96,
        y: 20 + row * 96,
        modified: new Date().toISOString()
      };
      setDesktopIcons(prev => [...prev, newIcon]);
      playSound('click');
    } else if (action === 'new_text') {
      let docCount = 1;
      let newTitle = 'New Text Document.txt';
      while (desktopIcons.some(i => i.title.toLowerCase() === newTitle.toLowerCase())) {
        docCount++;
        newTitle = `New Text Document (${docCount}).txt`;
      }

      // Calculate grid coordinates
      const nextIndex = desktopIcons.length;
      const maxItemsPerCol = Math.max(1, Math.floor((window.innerHeight - 100) / 96));
      const col = Math.floor(nextIndex / maxItemsPerCol);
      const row = nextIndex % maxItemsPerCol;

      const newIcon = {
        id: `text_${Date.now()}`,
        title: newTitle,
        icon: TextDocIcon,
        type: 'document',
        size: 0,
        x: 20 + col * 96,
        y: 20 + row * 96,
        text: '',
        modified: new Date().toISOString()
      };
      setDesktopIcons(prev => [...prev, newIcon]);
      playSound('click');
    } else if (action === 'delete') {
      const targetId = contextMenu?.targetId || selectedIconId;
      if (targetId && !['about', 'resume', 'projects', 'contact', 'minesweeper', 'paint', 'mediaplayer'].includes(targetId)) {
        setDesktopIcons(prev => prev.filter(i => i.id !== targetId));
        closeWindow(targetId);
        setSelectedIconId(null);
        playSound('click');
      }
    } else if (action === 'rename') {
      const targetId = contextMenu?.targetId || selectedIconId;
      if (targetId && !['about', 'resume', 'projects', 'contact', 'minesweeper', 'paint', 'mediaplayer'].includes(targetId)) {
        setEditingIconId(targetId);
      }
    } else if (action === 'properties') {
      if (contextMenu?.targetId) {
        openWindow(`properties_${contextMenu.targetId}`);
      } else {
        openWindow('display_properties');
      }
    }
  };

  const isBackgroundUrl = wallpaper.startsWith('/') || wallpaper.startsWith('http');

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden flex flex-col font-sans select-none"
      style={{
        backgroundColor: isBackgroundUrl ? 'transparent' : wallpaper,
        backgroundImage: isBackgroundUrl ? `url(${wallpaper})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      onPointerDown={handleDesktopMouseDown}
      onPointerMove={handleDesktopMouseMove}
      onPointerUp={handleDesktopMouseUp}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Grayscale/Dim filter wrapper for confirmation screen */}
      <div className={`w-full h-full flex flex-col relative transition-all duration-700 ${isShutdownDialogOpen ? 'filter grayscale-[90%] brightness-[35%] pointer-events-none' : ''}`}>
        {/* Desktop Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
            backgroundSize: '4px 4px'
          }}
        />

        {/* Selection Marquee Box */}
        {isSelecting && selectionStart && selectionEnd && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(selectionStart.x, selectionEnd.x)}px`,
              top: `${Math.min(selectionStart.y, selectionEnd.y)}px`,
              width: `${Math.abs(selectionStart.x - selectionEnd.x)}px`,
              height: `${Math.abs(selectionStart.y - selectionEnd.y)}px`,
              backgroundColor: 'rgba(47, 113, 205, 0.25)', // Windows XP blue selection marquee
              border: '1px solid #0055e5', // Windows XP blue marquee border
              pointerEvents: 'none',
              zIndex: 9999
            }}
          />
        )}

        {/* Desktop Icons Container */}
        <div className="absolute inset-0 bottom-10 z-0">
          {desktopIcons.map((app) => (
            <div
              key={app.id}
              onPointerDown={(e) => handleIconPointerDown(e, app)}
              onPointerMove={(e) => handleIconPointerMove(e, app.id)}
              onPointerUp={(e) => handleIconPointerUp(e, app.id)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openWindow(app.id);
              }}
              onContextMenu={(e) => handleIconContextMenu(e, app.id)}
              style={{
                position: 'absolute',
                left: app.x,
                top: app.y,
                width: 96,
                height: 96,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: draggingIcon?.id === app.id ? 'grabbing' : 'default',
                zIndex: selectedIconId === app.id ? 10 : 1,
                touchAction: 'none'
              }}
              className={`desktop-icon rounded border border-transparent hover:bg-white/10 select-none ${
                selectedIconId === app.id 
                  ? 'bg-[#2f71cd]/30 border-[#4b8df9]/50 shadow-[inset_0_0_2px_rgba(255,255,255,0.4)]' 
                  : ''
              }`}
            >
              <DesktopIcon
                title={app.title}
                Icon={app.icon}
                isSelected={selectedIconId === app.id}
                isEditing={editingIconId === app.id}
                onRenameComplete={(newName) => handleRenameComplete(app.id, newName)}
              />
            </div>
          ))}
        </div>

        <AnimatePresence>
          {openWindows.map((win) => {
            let title = '';
            let Icon = null;
            let Component = null;
            let componentProps = {};

            if (win.id === 'display_properties') {
              title = 'Display Properties';
              Icon = PaintIcon;
              Component = DisplayProperties;
              componentProps = {
                currentTheme: theme,
                currentWallpaper: wallpaper,
                soundEnabled: soundEnabled,
                setTheme: setTheme,
                setWallpaper: setWallpaper,
                setSoundEnabled: setSoundEnabled,
                onClose: () => closeWindow(win.id)
              };
            } else if (win.id === 'about_portfolio') {
              title = 'About Windows XP Portfolio';
              Icon = AboutIcon;
              Component = AboutPortfolio;
              componentProps = {
                onClose: () => closeWindow(win.id)
              };
            } else if (win.id.startsWith('properties_')) {
              const targetId = win.id.substring('properties_'.length);
              const targetIcon = desktopIcons.find(i => i.id === targetId);
              if (!targetIcon) return null;
              title = `Properties for ${targetIcon.title}`;
              Icon = targetIcon.icon;
              Component = IconProperties;
              componentProps = {
                iconConfig: targetIcon,
                onRenameSave: (newName) => {
                  setDesktopIcons(prev => prev.map(icon => icon.id === targetId ? { ...icon, title: newName } : icon));
                },
                onClose: () => closeWindow(win.id)
              };
            } else {
              const app = desktopIcons.find(a => a.id === win.id);
              if (!app) return null;

              title = app.title;
              Icon = app.icon;

              if (app.id === 'about') Component = AboutMe;
              else if (app.id === 'resume') Component = Resume;
              else if (app.id === 'projects') Component = Projects;
              else if (app.id === 'contact') Component = ContactMe;
              else if (app.id === 'minesweeper') Component = Minesweeper;
              else if (app.id === 'paint') Component = Paint;
              else if (app.id === 'mediaplayer') Component = MediaPlayer;
              else if (app.id === 'gift') Component = Gift;
              else if (app.type === 'folder') {
                Component = Folder;
                componentProps = { name: app.title };
              } else if (app.type === 'document') {
                Component = Notepad;
                componentProps = {
                  initialText: app.text || '',
                  onSave: (newText) => {
                    setDesktopIcons(prev => prev.map(icon => icon.id === app.id ? { ...icon, text: newText } : icon));
                  },
                  onClose: () => closeWindow(win.id)
                };
              }
            }

            if (win.minimized) return null;
            if (!Component) return null;

            return (
              <Window
                key={win.id}
                id={win.id}
                title={title}
                Icon={Icon}
                zIndex={win.zIndex}
                isActive={activeWindow === win.id}
                isMaximized={win.maximized}
                theme={theme}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => toggleMinimize(win.id)}
                onMaximize={() => toggleMaximize(win.id)}
                onFocus={() => focusWindow(win.id)}
                openWindow={openWindow}
              >
                <Component {...componentProps} />
              </Window>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          <StartMenu
            isOpen={isStartMenuOpen}
            toggleStartMenu={toggleStartMenu}
            openWindow={openWindow}
            theme={theme}
            setTheme={setTheme}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            playSound={playSound}
            onShutDown={() => {
              setIsStartMenuOpen(false);
              setIsShutdownDialogOpen(true);
            }}
          />
        </AnimatePresence>

        {/* Context Menu */}
        <AnimatePresence>
          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              type={contextMenu.type}
              onClose={closeContextMenu}
              onAction={handleContextMenuAction}
              autoArrange={autoArrange}
              alignToGrid={alignToGrid}
              sortBy={sortBy}
              hasClipboard={!!clipboardIcon}
              isSystemIcon={['about', 'resume', 'projects', 'contact', 'minesweeper', 'paint', 'mediaplayer'].includes(contextMenu.targetId)}
            />
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 w-full z-50">
          <Taskbar
            openWindows={openWindows}
            activeWindow={activeWindow}
            appsConfig={desktopIcons}
            toggleWindow={toggleMinimize}
            isStartMenuOpen={isStartMenuOpen}
            toggleStartMenu={toggleStartMenu}
            theme={theme}
          />
        </div>

        <Motorcycle />
      </div>

      {/* Shutdown Confirmation Dialog */}
      <AnimatePresence>
        {isShutdownDialogOpen && (
          <ShutdownDialog
            onCancel={() => setIsShutdownDialogOpen(false)}
            onShutDown={() => {
              setIsShutdownDialogOpen(false);
              playSound('shutdown');
              setTimeout(() => {
                onShutDown();
              }, 1200);
            }}
            onRestart={() => {
              setIsShutdownDialogOpen(false);
              playSound('shutdown');
              setTimeout(() => {
                sessionStorage.removeItem('xp_booted');
                window.location.reload();
              }, 1200);
            }}
            onStandby={() => {
              setIsShutdownDialogOpen(false);
              setIsStandbyActive(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Standby / Sleep Screen */}
      {isStandbyActive && (
        <div 
          onClick={() => setIsStandbyActive(false)}
          className="fixed inset-0 bg-black z-[100000] cursor-pointer flex flex-col items-center justify-center font-mono text-gray-800 text-[10px] sm:text-xs select-none"
        >
          <span>Standby Mode</span>
          <span>Click anywhere to wake up</span>
        </div>
      )}
    </motion.div>
  );
}
