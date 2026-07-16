import { useRef } from 'react';
import { Download, FileText, Printer, Briefcase, GraduationCap, Award, Flag } from 'lucide-react';

export default function Resume() {
  const iframeRef = useRef(null);

  const handlePrint = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
      } catch (e) {
        // Fallback: open in new tab and trigger print
        const printWindow = window.open('/Raghav_cv.pdf', '_blank');
        if (printWindow) {
          printWindow.print();
        }
      }
    } else {
      window.print();
    }
  };

  const handleDownload = () => {
    // Access the resume file copied to the public folder
    const link = document.createElement('a');
    link.href = '/Raghav_cv.pdf';
    link.download = 'Raghav_Mishra_CV.pdf';
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 font-sans">
      {/* Action Bar */}
      <div className="flex items-center gap-2 p-2 bg-[#ece9d8] border-b border-gray-300 shadow-sm text-xs font-sans flex-shrink-0">
        <button 
          onClick={handleDownload}
          className="flex items-center gap-1.5 text-gray-800 hover:bg-white px-2.5 py-1.5 border border-gray-300 hover:border-blue-400 bg-gray-50/50 rounded shadow-sm transition"
        >
          <Download className="w-4 h-4 text-green-600" />
          <span className="font-semibold">Download PDF</span>
        </button>
        <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-1.5 text-gray-800 hover:bg-white px-2.5 py-1.5 border border-gray-300 hover:border-blue-400 bg-gray-50/50 rounded shadow-sm transition"
        >
          <Printer className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Print Resume</span>
        </button>
      </div>

      {/* Resume Document Wrapper */}
      <div className="flex-1 overflow-hidden bg-gray-50 flex justify-center">
         <iframe 
           ref={iframeRef}
           src="/Raghav_cv.pdf" 
           title="Raghav Mishra Resume CV" 
           className="w-full h-full border-none"
         />
      </div>
    </div>
  );
}
