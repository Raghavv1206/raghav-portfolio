import { useState, useEffect, useCallback } from 'react';

// Difficulty settings
const LEVEL = {
  rows: 9,
  cols: 9,
  mines: 10
};

export default function Minesweeper() {
  const [board, setBoard] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, playing, won, lost
  const [minesLeft, setMinesLeft] = useState(LEVEL.mines);
  const [seconds, setSeconds] = useState(0);

  // Initialize Board
  const initBoard = useCallback(() => {
    const newBoard = Array(LEVEL.rows).fill(null).map((_, r) => 
      Array(LEVEL.cols).fill(null).map((_, c) => ({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0
      }))
    );
    setBoard(newBoard);
    setStatus('idle');
    setMinesLeft(LEVEL.mines);
    setSeconds(0);
  }, []);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  // Timer Effect
  useEffect(() => {
    if (status !== 'playing') return;
    const interval = setInterval(() => {
      setSeconds(prev => Math.min(prev + 1, 999));
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  // Place Mines on first click
  const placeMines = (startRow, startCol, currentBoard) => {
    let minesPlaced = 0;
    const size = LEVEL.rows * LEVEL.cols;
    
    // Safety check - make sure we don't place mine on the clicked cell
    while (minesPlaced < LEVEL.mines) {
      const idx = Math.floor(Math.random() * size);
      const r = Math.floor(idx / LEVEL.cols);
      const c = idx % LEVEL.cols;

      if ((r === startRow && c === startCol) || currentBoard[r][c].isMine) {
        continue;
      }
      currentBoard[r][c].isMine = true;
      minesPlaced++;
    }

    // Calculate neighbors
    for (let r = 0; r < LEVEL.rows; r++) {
      for (let c = 0; c < LEVEL.cols; c++) {
        if (currentBoard[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < LEVEL.rows && nc >= 0 && nc < LEVEL.cols) {
              if (currentBoard[nr][nc].isMine) count++;
            }
          }
        }
        currentBoard[r][c].neighborMines = count;
      }
    }
  };

  // Reveal neighbors recursively (flood fill)
  const revealCell = (r, c, currentBoard) => {
    if (r < 0 || r >= LEVEL.rows || c < 0 || c >= LEVEL.cols) return;
    const cell = currentBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.neighborMines === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCell(r + dr, c + dc, currentBoard);
        }
      }
    }
  };

  // Check Win Condition
  const checkWin = (currentBoard) => {
    for (let r = 0; r < LEVEL.rows; r++) {
      for (let c = 0; c < LEVEL.cols; c++) {
        const cell = currentBoard[r][c];
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  };

  // Click handler
  const handleCellClick = (r, c) => {
    if (status === 'won' || status === 'lost') return;

    // Play click sound
    playXpClick();

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    let currentStatus = status;

    // First click: place mines
    if (status === 'idle') {
      placeMines(r, c, newBoard);
      currentStatus = 'playing';
      setStatus('playing');
    }

    const cell = newBoard[r][c];
    if (cell.isFlagged || cell.isRevealed) return;

    if (cell.isMine) {
      // Hit a mine! Game Over
      cell.isRevealed = true;
      setStatus('lost');
      // Reveal all mines
      newBoard.forEach(row => row.forEach(cl => {
        if (cl.isMine) cl.isRevealed = true;
      }));
      playXpError();
      return;
    }

    revealCell(r, c, newBoard);

    if (checkWin(newBoard)) {
      setStatus('won');
    }

    setBoard(newBoard);
  };

  // Right click handler
  const handleCellRightClick = (e, r, c) => {
    e.preventDefault();
    if (status === 'won' || status === 'lost' || status === 'idle') return;

    const cell = board[r][c];
    if (cell.isRevealed) return;

    // Toggle Flag
    const newBoard = board.map(row => row.map(cl => ({ ...cl })));
    const target = newBoard[r][c];
    target.isFlagged = !target.isFlagged;
    
    setMinesLeft(prev => prev + (target.isFlagged ? -1 : 1));
    setBoard(newBoard);
  };

  // Local sound trigger helpers
  const playXpClick = () => {
    // Quiet audio click
    try {
      const audio = new Audio('/sounds/error.wav');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const playXpError = () => {
    try {
      const audio = new Audio('/sounds/error.wav');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  // Smiley Emoji Based on Status
  const getSmiley = () => {
    if (status === 'won') return '😎';
    if (status === 'lost') return '😵';
    return '🙂';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#ece9d8] select-none h-full w-full">
      <div className="border-4 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] p-2 shadow-inner">
        {/* Header Display */}
        <div className="border-4 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-[#c0c0c0] flex justify-between items-center p-1.5 mb-2 gap-4">
          {/* Mines Counter */}
          <div className="bg-black text-[#ff0000] font-mono text-2xl px-2 py-0.5 border border-gray-600 w-16 text-right leading-none select-none">
            {String(Math.max(minesLeft, 0)).padStart(3, '0')}
          </div>

          {/* Smiley Reset */}
          <button 
            onClick={initBoard} 
            className="w-9 h-9 text-lg flex items-center justify-center border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] active:border-1 active:border-[#808080] active:bg-[#c0c0c0] hover:bg-[#d0d0d0]"
          >
            {getSmiley()}
          </button>

          {/* Timer Display */}
          <div className="bg-black text-[#ff0000] font-mono text-2xl px-2 py-0.5 border border-gray-600 w-16 text-right leading-none select-none">
            {String(seconds).padStart(3, '0')}
          </div>
        </div>

        {/* Board Grid */}
        <div className="border-4 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-[#808080] p-[2px]">
          <div 
            className="grid gap-[1px]" 
            style={{ gridTemplateColumns: `repeat(${LEVEL.cols}, minmax(0, 1fr))` }}
          >
            {board.map((row, rIdx) => 
              row.map((cell, cIdx) => {
                let cellClass = "w-7 h-7 flex items-center justify-center font-bold text-sm border-2 ";
                let content = "";

                if (cell.isRevealed) {
                  cellClass += "bg-[#c0c0c0] border-t-[#808080] border-l-[#808080] border-r-[#c0c0c0] border-b-[#c0c0c0]";
                  if (cell.isMine) {
                    content = "💣";
                    cellClass += " bg-red-400";
                  } else if (cell.neighborMines > 0) {
                    content = cell.neighborMines;
                  }
                } else {
                  cellClass += "bg-[#c0c0c0] border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] cursor-pointer";
                  if (cell.isFlagged) {
                    content = "🚩";
                  }
                }

                // Number color coding
                const textColors = [
                  "", "text-blue-800", "text-green-800", "text-red-700", 
                  "text-purple-800", "text-red-900", "text-cyan-800", "text-black"
                ];
                const colorClass = cell.isRevealed && !cell.isMine ? textColors[cell.neighborMines] || "" : "";

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleCellClick(cell.row, cell.col)}
                    onContextMenu={(e) => handleCellRightClick(e, cell.row, cell.col)}
                    className={`${cellClass} ${colorClass} text-center select-none`}
                  >
                    {content}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mt-2 font-sans">
        Left-click to reveal • Right-click to flag
      </div>
    </div>
  );
}
