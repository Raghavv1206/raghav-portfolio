import { useState, useEffect } from 'react';
import { PROJECTS } from './Projects';
import { 
  FolderIcon, IeIcon, TextDocIcon, AboutIcon, PdfIcon, MailIcon, 
  MinesweeperIcon, PaintIcon, MediaPlayerIcon, GiftIcon, SearchIcon 
} from '../components/Icons';

export default function SearchResults({ query: initialQuery, openWindow, desktopIcons }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [searchInput, setSearchInput] = useState(initialQuery || '');
  const [results, setResults] = useState([]);

  // Map icon names/types to actual icon components
  const getIconComponent = (type, title) => {
    const titleLower = title.toLowerCase();
    if (type === 'Folder') return FolderIcon;
    if (type === 'Text Document') return TextDocIcon;
    
    // Check known app title mapping
    if (titleLower.includes('about me')) return AboutIcon;
    if (titleLower.includes('resume')) return PdfIcon;
    if (titleLower.includes('projects')) return IeIcon;
    if (titleLower.includes('contact')) return MailIcon;
    if (titleLower.includes('minesweeper')) return MinesweeperIcon;
    if (titleLower.includes('paint')) return PaintIcon;
    if (titleLower.includes('media player')) return MediaPlayerIcon;
    if (titleLower.includes('gift')) return GiftIcon;
    
    return FolderIcon; // fallback
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();
    const searchResults = [];

    // 1. Search Desktop Icons (files, folders, apps)
    if (desktopIcons && Array.isArray(desktopIcons)) {
      desktopIcons.forEach(icon => {
        let isMatch = false;
        let matchReason = '';

        if (icon.title.toLowerCase().includes(lowerQuery)) {
          isMatch = true;
          matchReason = 'Title';
        } else if (icon.text && icon.text.toLowerCase().includes(lowerQuery)) {
          isMatch = true;
          matchReason = 'Content';
        }

        if (isMatch) {
          const type = icon.type === 'folder' 
            ? 'Folder' 
            : icon.type === 'document' 
              ? 'Text Document' 
              : 'System Application';

          searchResults.push({
            id: icon.id,
            title: icon.title,
            type: type,
            location: 'C:\\Desktop',
            size: icon.size ? `${icon.size} KB` : '0 KB',
            modified: icon.modified ? new Date(icon.modified).toLocaleDateString() : 'N/A',
            action: () => openWindow(icon.id)
          });
        }
      });
    }

    // 2. Search Portfolio Projects
    if (PROJECTS && Array.isArray(PROJECTS)) {
      PROJECTS.forEach(proj => {
        const inName = proj.name.toLowerCase().includes(lowerQuery);
        const inFullName = proj.fullName.toLowerCase().includes(lowerQuery);
        const inDesc = proj.desc.toLowerCase().includes(lowerQuery);
        const inTech = proj.tech.some(t => t.toLowerCase().includes(lowerQuery));

        if (inName || inFullName || inDesc || inTech) {
          searchResults.push({
            id: `project_${proj.id}`,
            title: proj.name,
            type: 'Web Project',
            location: 'C:\\Desktop\\My Projects',
            size: `${Math.round(proj.desc.length / 10)} KB`,
            modified: '2026-07-10', // mock date
            action: () => openWindow('projects')
          });
        }
      });
    }

    setResults(searchResults);
  }, [query, desktopIcons, openWindow]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  return (
    <div className="flex h-full bg-[#f1efe2] text-black font-sans select-none min-h-0">
      {/* Left Search Companion Pane */}
      <div className="w-60 bg-gradient-to-b from-[#7db0f7] to-[#2c5eb2] text-white flex flex-col min-h-0 border-r border-[#1a4185] flex-shrink-0">
        {/* Companion Title */}
        <div className="bg-[#1e468a] px-3 py-1.5 font-bold text-xs shadow-sm flex items-center gap-1.5 flex-shrink-0 border-b border-black/10">
          <SearchIcon className="w-4 h-4 text-sky-300" />
          <span>Search Companion</span>
        </div>

        {/* Companion Body / Speech Bubble */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 text-xs">
          {/* Tommy Speech Bubble */}
          <div className="bg-[#ffffe1] text-black border border-black/30 rounded-lg p-2.5 shadow relative">
            <div className="absolute left-4 -bottom-2 w-3 h-3 bg-[#ffffe1] border-r border-b border-black/30 rotate-45"></div>
            <p className="font-semibold text-blue-900 mb-1">Tommy says:</p>
            <p className="leading-relaxed">
              {results.length > 0 
                ? `I found ${results.length} item(s) matching "${query}" on this computer.`
                : query 
                  ? `There are no results matching "${query}" on this PC. Try another search.`
                  : "Type a search query below to scan files, folders, and projects on this portfolio!"
              }
            </p>
          </div>

          {/* Tommy Avatar Graphic */}
          <div className="flex justify-start pl-6 mt-1 flex-shrink-0">
            <div className="w-16 h-16 bg-[#ffffe1]/10 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden shadow-inner">
              {/* Virtual Companion Icon */}
              <SearchIcon className="w-10 h-10 text-white/90 drop-shadow-md animate-pulse" />
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="bg-white/10 p-3 rounded border border-white/10 mt-2 flex flex-col gap-2 shadow-sm">
            <label className="font-bold text-[11px] text-sky-100">Search for files, folders, or projects:</label>
            <input 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white border border-sky-900/40 text-black px-2 py-1 text-xs outline-none focus:border-sky-300 shadow-inner rounded-sm"
            />
            <button 
              type="submit"
              className="mt-1 w-full bg-[#3a75c4] hover:bg-[#4d8de6] active:bg-[#2e62a8] border border-sky-950/40 py-1 rounded text-xs font-bold shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center"
            >
              Search Now
            </button>
          </form>
        </div>
      </div>

      {/* Right Search Results Pane */}
      <div className="flex-1 flex flex-col bg-white min-w-0 min-h-0">
        {/* Results Header Info Bar */}
        <div className="h-6 bg-[#ece9d8] border-b border-[#aca899] px-3 flex items-center justify-between text-xs text-gray-700 flex-shrink-0">
          <span>Search Results: {results.length} objects found</span>
          {query && <span className="font-semibold italic text-blue-900">Query: "{query}"</span>}
        </div>

        {/* Results Table Headers */}
        <div className="flex bg-[#ece9d8] border-b border-[#c0c0c0] font-normal text-xs text-black/80 select-none flex-shrink-0">
          <div className="w-2/5 px-2 py-1 border-r border-[#c0c0c0] font-bold">Name</div>
          <div className="w-1/5 px-2 py-1 border-r border-[#c0c0c0] font-bold">In Folder</div>
          <div className="w-1/6 px-2 py-1 border-r border-[#c0c0c0] font-bold">Size</div>
          <div className="w-1/6 px-2 py-1 font-bold">Type</div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto bg-white min-h-0">
          {results.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center text-center h-full">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 mb-3 shadow-inner">
                <SearchIcon className="w-7 h-7 text-gray-400" />
              </div>
              <h4 className="font-bold text-gray-700 text-sm mb-1">
                {query ? "No items found" : "Ready to search"}
              </h4>
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                {query 
                  ? "Make sure files are typed correctly, or refine your query in the companion sidebar to search again."
                  : "Search files, folders, and portfolio projects on Tommy's computer using the companion on the left."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {results.map((item) => {
                const ItemIcon = getIconComponent(item.type, item.title);
                return (
                  <div 
                    key={item.id}
                    onClick={item.action}
                    className="flex text-xs text-black hover:bg-[#316ac5] hover:text-white cursor-pointer select-none items-center py-1.5 transition-colors group"
                  >
                    {/* Name Column */}
                    <div className="w-2/5 px-2 flex items-center gap-2 truncate">
                      <ItemIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate font-medium">{item.title}</span>
                    </div>

                    {/* Folder Column */}
                    <div className="w-1/5 px-2 truncate opacity-85 group-hover:text-sky-100">
                      {item.location}
                    </div>

                    {/* Size Column */}
                    <div className="w-1/6 px-2 truncate opacity-85 group-hover:text-sky-100">
                      {item.size}
                    </div>

                    {/* Type Column */}
                    <div className="w-1/6 px-2 truncate opacity-85 group-hover:text-sky-100">
                      {item.type}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
