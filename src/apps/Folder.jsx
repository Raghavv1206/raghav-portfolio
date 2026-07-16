export default function Folder({ name }) {
  return (
    <div className="flex flex-col h-full bg-[#f1efe2] text-black font-sans select-none">
      {/* Sidebar and Main content layout */}
      <div className="flex-1 flex min-h-0 bg-white">
        {/* Left Explorer Sidebar */}
        <div className="w-48 bg-gradient-to-b from-[#7aa1e6] to-[#3b60b8] p-3 text-white flex flex-col gap-3 text-xs overflow-y-auto select-none hidden md:flex border-r border-[#316ac5]">
          <div className="bg-white/20 p-2 rounded-t border-t border-l border-white/30">
            <h3 className="font-bold mb-1">File and Folder Tasks</h3>
            <ul className="space-y-1 opacity-90 pl-1">
              <li className="hover:underline cursor-pointer">Rename this folder</li>
              <li className="hover:underline cursor-pointer">Move this folder</li>
              <li className="hover:underline cursor-pointer">Copy this folder</li>
              <li className="hover:underline cursor-pointer">Delete this folder</li>
            </ul>
          </div>
          <div className="bg-white/20 p-2 rounded-t border-t border-l border-white/30">
            <h3 className="font-bold mb-1">Other Places</h3>
            <ul className="space-y-1 opacity-90 pl-1">
              <li className="hover:underline cursor-pointer">Desktop</li>
              <li className="hover:underline cursor-pointer">My Documents</li>
              <li className="hover:underline cursor-pointer">Shared Documents</li>
              <li className="hover:underline cursor-pointer">My Computer</li>
            </ul>
          </div>
        </div>

        {/* Right files listing area */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#e9e7db] rounded-lg border border-[#aca899] shadow-sm flex items-center justify-center mb-3">
            <svg className="w-10 h-10 text-yellow-600/70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            </svg>
          </div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">{name || "Folder"}</h4>
          <p className="text-xs text-gray-500 max-w-[200px]">This folder is empty.</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#ece9d8] border-t border-[#aca899] flex items-center px-3 text-[10px] text-gray-700">
        <span>0 objects</span>
      </div>
    </div>
  );
}
