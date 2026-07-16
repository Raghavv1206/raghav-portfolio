import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function Gift() {
  const [visitorName, setVisitorName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [certDateStr, setCertDateStr] = useState('');
  const [downloadText, setDownloadText] = useState('💾 Save as Image');
  const certificateRef = useRef(null);

  const handleGenerate = () => {
    const finalName = visitorName.trim() || 'Anonymous Visitor';
    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) +
      ' at ' + now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    
    setCertDateStr(formattedDate);
    setIsGenerated(true);
  };

  const handleBack = () => {
    setIsGenerated(false);
    setVisitorName('');
  };

  const handleDownload = () => {
    if (!certificateRef.current) return;
    setDownloadText('Rendering…');

    html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false
    }).then(canvas => {
      const link = document.createElement('a');
      const safeName = (visitorName.trim() || 'visitor').replace(/[^a-z0-9]+/gi, '_');
      link.download = `certificate-of-visit-${safeName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setDownloadText('💾 Save as Image');
    }).catch(err => {
      console.error('Error generating certificate image:', err);
      alert('Could not save certificate as image. Please try again.');
      setDownloadText('💾 Save as Image');
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white font-sans text-black relative select-none">
      {/* Inline styles for local encapsulation of the certificate formatting */}
      <style>{`
        .cert-gift-container {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          overflow-y: auto;
        }
        .form-view h2 {
          margin: 0 0 8px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 20px;
          color: #1a3d7c;
        }
        .form-view p {
          color: #444;
          font-size: 12.5px;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .form-row {
          margin-top: 18px;
        }
        .form-row label {
          display: block;
          font-size: 12px;
          color: #333;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-row input[type=text] {
          width: 100%;
          padding: 6px 8px;
          font-size: 13px;
          border: 1px solid #7f9db9;
          border-radius: 2px;
          font-family: Tahoma, sans-serif;
          outline: none;
        }
        .form-row input[type=text]:focus {
          border-color: #3f95fb;
        }
        .xp-action-btn {
          margin-top: 20px;
          padding: 7px 18px;
          background: linear-gradient(180deg, #fdfdfd, #e4e4e4);
          border: 1px solid #8c8c8c;
          border-radius: 3px;
          font-family: Tahoma, sans-serif;
          font-size: 12.5px;
          cursor: pointer;
        }
        .xp-action-btn:active {
          background: linear-gradient(180deg, #d8d8d8, #c4c4c4);
        }
        .xp-action-btn.primary {
          background: linear-gradient(180deg, #7fbcff, #2f74e0);
          border: 1px solid #14509e;
          color: #fff;
          font-weight: bold;
        }
        .xp-action-btn.primary:active {
          background: linear-gradient(180deg, #5b9ee8, #1f5cc0);
        }
        .cert-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 0;
        }
        .cert-toolbar {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .cert-container-scroll {
          width: 100%;
          overflow-x: auto;
          display: flex;
          justify-content: center;
          padding: 4px;
        }
        #certificate {
          background: #ffffff;
          padding: 16px;
          position: relative;
          font-family: 'Times New Roman', Times, serif;
          color: #1a1a1a;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 440px;
          margin: 0 auto;
          flex-shrink: 0;
        }
        .cert-border-outer {
          border: 5px solid #0a3fc4;
          padding: 4px;
        }
        .cert-border-inner {
          border: 3px dashed #d4433f;
          padding: 20px 16px 16px;
          position: relative;
          background: linear-gradient(180deg, #eaf3ff 0%, #ffffff 14%);
        }
        .clip-star {
          position: absolute;
          width: 26px;
          height: 26px;
        }
        .clip-star.tl { top: 8px; left: 8px; }
        .clip-star.tr { top: 8px; right: 8px; }
        .clip-star.bl { bottom: 8px; left: 8px; }
        .clip-star.br { bottom: 8px; right: 8px; }
        .cert-eyebrow {
          letter-spacing: 2px;
          font-size: 10.5px;
          color: #0a3fc4;
          font-family: Tahoma, sans-serif;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .cert-rule {
          width: 88%;
          height: 0;
          border-top: 2px solid #0a3fc4;
          border-bottom: 1px solid #ffffff;
          margin: 10px auto 16px;
        }
        .cert-body {
          font-size: 13.5px;
          line-height: 1.7;
          color: #222;
        }
        .cert-name {
          font-size: 32px;
          margin: 10px 0 6px;
          color: #0a3fc4;
          font-family: 'Monotype Corsiva', 'Brush Script MT', 'Segoe Script', cursive;
        }
        .cert-meta {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-family: Tahoma, sans-serif;
          font-size: 10px;
          color: #333;
        }
        .cert-meta .col {
          text-align: left;
        }
        .cert-meta .col.right {
          text-align: right;
        }
        .cert-meta .date-value {
          font-family: 'Times New Roman', Times, serif;
          font-size: 13px;
          color: #111;
          padding-bottom: 3px;
        }
        .cert-meta .line {
          width: 150px;
          border-top: 1px solid #333;
        }
        .cert-meta .caption {
          margin-top: 3px;
          font-size: 9.5px;
          color: #555;
          letter-spacing: 0.3px;
        }
        .seal {
          width: 60px;
          height: 74px;
          margin: 0 auto;
          position: relative;
        }
        .seal .disc {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #6fa8ff, #0a3fc4 70%);
          border: 2px solid #062a8c;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Tahoma, sans-serif;
          font-size: 7.5px;
          font-weight: bold;
          letter-spacing: 0.5px;
          text-align: center;
          box-shadow: 0 2px 3px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.25);
          margin: 0 auto;
        }
        .seal .tails {
          width: 56px;
          height: 26px;
          margin: -4px auto 0;
        }
        .seal .tails svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .cert-footer-note {
          margin-top: 18px;
          font-family: Tahoma, sans-serif;
          font-size: 9px;
          color: #8a8a8a;
          font-style: italic;
        }
        .back-link {
          display: inline-block;
          margin-top: 14px;
          font-family: Tahoma, sans-serif;
          font-size: 11.5px;
          color: #1955e6;
          cursor: pointer;
          text-decoration: underline;
          width: fit-content;
        }
      `}</style>

      <div className="cert-gift-container">
        {!isGenerated ? (
          <div className="form-view">
            <h2>You found the gift!</h2>
            <p>Enter your name and I'll generate a Certificate of Visit — a little keepsake for stopping by. You can download it when you're done.</p>
            <div className="form-row">
              <label htmlFor="visitorName">Your name</label>
              <input
                type="text"
                id="visitorName"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="e.g. Jordan Lee"
                maxLength={40}
              />
            </div>
            <button className="xp-action-btn primary" onClick={handleGenerate}>
              Generate Certificate
            </button>
          </div>
        ) : (
          <div className="cert-wrap">
            <div className="cert-toolbar">
              <button className="xp-action-btn" onClick={handleDownload}>
                {downloadText}
              </button>
            </div>

            <div className="cert-container-scroll">
              <div id="certificate" ref={certificateRef}>
                <div className="cert-border-outer">
                  <div className="cert-border-inner">
                    {/* TL Corner Star */}
                    <svg className="clip-star tl" viewBox="0 0 24 24">
                      <path fill="#f4c531" stroke="#a9832f" strokeWidth="1" d="M12 1l3 7 7 1-5.2 4.9L18 21l-6-3.5L6 21l1.2-7.1L2 9l7-1z" />
                    </svg>
                    {/* TR Corner Star */}
                    <svg className="clip-star tr" viewBox="0 0 24 24">
                      <path fill="#f4c531" stroke="#a9832f" strokeWidth="1" d="M12 1l3 7 7 1-5.2 4.9L18 21l-6-3.5L6 21l1.2-7.1L2 9l7-1z" />
                    </svg>
                    {/* BL Corner Star */}
                    <svg className="clip-star bl" viewBox="0 0 24 24">
                      <path fill="#f4c531" stroke="#a9832f" strokeWidth="1" d="M12 1l3 7 7 1-5.2 4.9L18 21l-6-3.5L6 21l1.2-7.1L2 9l7-1z" />
                    </svg>
                    {/* BR Corner Star */}
                    <svg className="clip-star br" viewBox="0 0 24 24">
                      <path fill="#f4c531" stroke="#a9832f" strokeWidth="1" d="M12 1l3 7 7 1-5.2 4.9L18 21l-6-3.5L6 21l1.2-7.1L2 9l7-1z" />
                    </svg>

                    <div className="cert-eyebrow">Portfolio of Raghav Mishra</div>
                    
                    {/* SVG WordArt Gradient Title */}
                    <svg viewBox="0 0 380 45" width="100%" height="45" style={{ overflow: 'visible', display: 'block', margin: '0 auto 6px' }}>
                      <defs>
                        <linearGradient id="wordart-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8fd0ff" />
                          <stop offset="45%" stopColor="#1955e6" />
                          <stop offset="60%" stopColor="#0a3fc4" />
                          <stop offset="100%" stopColor="#062a8c" />
                        </linearGradient>
                      </defs>
                      <text
                        x="50%"
                        y="35"
                        textAnchor="middle"
                        fontFamily="'Arial Black', Arial, sans-serif"
                        fontSize="28"
                        fontWeight="900"
                        letterSpacing="1"
                        fill="url(#wordart-grad)"
                        stroke="#052266"
                        strokeWidth="1.5"
                        paintOrder="stroke fill"
                      >
                        Certificate of Visit
                      </text>
                    </svg>

                    <div className="cert-rule"></div>
                    <div className="cert-body">
                      This is to certify that
                      <div className="cert-name">{visitorName.trim() || 'Anonymous Visitor'}</div>
                      has been formally recognized for excellent taste, sharp instincts,
                      and the rare curiosity it takes to dig up a hidden easter egg.
                    </div>
                    
                    <div className="cert-meta">
                      <div className="col">
                        <div className="date-value">{certDateStr}</div>
                        <div className="line"></div>
                        <div className="caption">Date Issued</div>
                      </div>
                      <div className="col right">
                        <div className="seal">
                          <div className="disc">VERIFIED<br />VISITOR</div>
                          <div className="tails">
                            <svg viewBox="0 0 56 26" xmlns="http://www.w3.org/2000/svg">
                              <polygon points="10,0 24,0 24,26 17,19 10,26" fill="#0a3fc4" />
                              <polygon points="32,0 46,0 46,26 39,19 32,26" fill="#d4433f" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="cert-footer-note">generated in Internet Explorer &mdash; best viewed at 800×600</div>
                  </div>
                </div>
              </div>
            </div>

            <span className="back-link" onClick={handleBack}>
              &larr; generate another
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
