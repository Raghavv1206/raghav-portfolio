import { useState, useRef, useEffect } from 'react';
import { Square, Eraser, Trash, Download } from 'lucide-react';

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#4000ff', '#804000',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff8000', '#ff80ff'
];

const BRUSH_SIZES = [2, 5, 8, 12, 18];

export default function Paint() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('brush'); // brush, eraser

  // Set up canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use a fixed resolution for the internal canvas coordinate system
    canvas.width = 600;
    canvas.height = 400;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;

    // Set background to white
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update stroke styles when tools or options change
  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    contextRef.current.lineWidth = brushSize;
  }, [color, brushSize, tool]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (!contextRef.current) return;
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !contextRef.current) return;
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    contextRef.current.fillStyle = '#ffffff';
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'xp-paint-drawing.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col bg-[#ece9d8] text-black h-full w-full select-none font-sans p-1">
      {/* Top Controls Toolbar */}
      <div className="flex gap-2 p-1.5 bg-[#ece9d8] border-b border-gray-300 shadow-sm text-xs items-center mb-1">
        <button 
          onClick={() => setTool('brush')}
          className={`flex items-center gap-1 px-2.5 py-1 border border-gray-400 rounded-sm shadow-sm transition ${tool === 'brush' ? 'bg-[#316ac5] text-white border-[#316ac5]' : 'bg-[#f0f0f0] hover:bg-white'}`}
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Brush</span>
        </button>

        <button 
          onClick={() => setTool('eraser')}
          className={`flex items-center gap-1 px-2.5 py-1 border border-gray-400 rounded-sm shadow-sm transition ${tool === 'eraser' ? 'bg-[#316ac5] text-white border-[#316ac5]' : 'bg-[#f0f0f0] hover:bg-white'}`}
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>Eraser</span>
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1"></div>

        <button 
          onClick={clearCanvas}
          className="flex items-center gap-1 bg-[#f0f0f0] hover:bg-white px-2.5 py-1 border border-gray-400 rounded-sm shadow-sm transition"
        >
          <Trash className="w-3.5 h-3.5 text-red-600" />
          <span>Clear All</span>
        </button>

        <button 
          onClick={downloadDrawing}
          className="flex items-center gap-1 bg-[#f0f0f0] hover:bg-white px-2.5 py-1 border border-gray-400 rounded-sm shadow-sm transition ml-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-600" />
          <span>Save Image</span>
        </button>
      </div>

      <div className="flex flex-1 gap-1 overflow-hidden min-h-0">
        {/* Left Toolbar - Sizes */}
        <div className="w-14 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex flex-col items-center py-4 gap-4 p-1">
          <span className="text-[10px] font-bold text-gray-700 text-center uppercase tracking-wider">Size</span>
          <div className="flex flex-col gap-3 items-center w-full">
            {BRUSH_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`flex items-center justify-center rounded-sm w-9 h-9 border ${brushSize === size ? 'bg-[#316ac5] text-white border-[#316ac5]' : 'border-transparent hover:bg-gray-200'}`}
              >
                <div 
                  className={`bg-black rounded-full ${tool === 'eraser' ? 'bg-white border border-gray-400' : ''}`}
                  style={{ width: `${size}px`, height: `${size}px` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 bg-gray-500 overflow-auto p-2 flex justify-center items-start border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white">
          <div className="bg-white shadow-md border border-gray-400">
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              className="cursor-crosshair block"
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="bg-[#ece9d8] border-t border-gray-300 p-2 flex items-center gap-4">
        {/* Selected Color Preview */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[9px] text-gray-600 font-bold uppercase">Color</div>
          <div 
            className="w-8 h-8 border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white rounded shadow-inner"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Color Palette Grid */}
        <div 
          className="grid gap-1 flex-1 max-w-lg bg-[#c0c0c0] p-1 border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white"
          style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}
        >
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                if (tool === 'eraser') setTool('brush');
              }}
              className={`w-4 h-4 border border-gray-400 shadow-sm active:scale-95 ${color === c && tool !== 'eraser' ? 'ring-2 ring-blue-600 border-white' : ''}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
