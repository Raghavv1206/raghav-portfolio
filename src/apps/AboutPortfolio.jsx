export default function AboutPortfolio({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-black font-sans text-xs p-4 justify-between select-none">
      
      {/* Top Banner: Logo & OS Name */}
      <div className="flex items-center gap-4 bg-white border border-[#aca899] p-4 rounded shadow-sm">
        <div className="w-16 h-16 flex-shrink-0">
          <img src="/xp-logo.svg" alt="XP Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex-grow">
          <h1 className="text-lg font-bold text-[#003399] leading-tight">Microsoft Windows XP</h1>
          <p className="text-[10px] text-gray-500 font-semibold">Professional Portfolio Edition</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Version 1.0 (Build 2026.raghav-mishra)</p>
        </div>
      </div>

      {/* Main Info */}
      <div className="my-4 flex-1 flex flex-col gap-2.5 text-gray-700 leading-normal px-2">
        <p className="font-semibold text-black">This product is licensed under the MIT License to:</p>
        <div className="pl-4">
          <p className="font-bold text-gray-800">Recruiter / Visitor</p>
          <p className="text-gray-500">Tech Industry / Open Web Community</p>
        </div>
        <div className="h-[1px] bg-gray-300 my-2"></div>
        <div>
          <p className="font-bold text-black mb-1">Developer Bio Summary:</p>
          <p>Designed and built by <strong>Raghav Mishra</strong>, CS Undergrad & Full Stack / AI Engineer.</p>
          <p className="mt-1">Built with React, Vite, TailwindCSS, Framer Motion, and lots of retro nostalgic love.</p>
        </div>
        <div className="h-[1px] bg-gray-300 my-2"></div>
        <div className="flex justify-between items-baseline text-[10px] text-gray-500">
          <span>Physical memory: 524,288 KB RAM</span>
          <span>System Resources: 98% Free</span>
        </div>
      </div>

      {/* Footer OK Button */}
      <div className="flex justify-end pt-2 border-t border-gray-300">
        <button 
          onClick={onClose}
          className="w-20 py-1 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#d0d0d0] active:border-1 active:border-[#808080] active:pt-1.5 active:pb-0.5 rounded shadow-sm text-center font-bold"
        >
          OK
        </button>
      </div>
    </div>
  );
}
