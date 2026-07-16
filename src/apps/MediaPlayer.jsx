import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';

const PLAYLIST = [
  {
    id: 1,
    title: 'SoundHelix Retro Chill 1',
    artist: 'SoundHelix Instrumentals',
    url: '/songs/song1.mp3',
    duration: '6:12'
  },
  {
    id: 2,
    title: 'SoundHelix Retro Chill 3',
    artist: 'SoundHelix Instrumentals',
    url: '/songs/song2.mp3',
    duration: '5:44'
  },
  {
    id: 3,
    title: 'SoundHelix Retro Chill 8',
    artist: 'SoundHelix Instrumentals',
    url: '/songs/song3.mp3',
    duration: '5:38'
  }
];

export default function MediaPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  // Sync audio play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-black select-none font-sans p-2">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />

      {/* Main Skin Panel */}
      <div className="flex-1 bg-gradient-to-b from-[#1c2e4a] to-[#0c1322] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] rounded p-4 flex flex-col justify-between text-white shadow-inner">
        {/* Equalizer Visualizer and Info Panel */}
        <div className="flex gap-4 items-center">
          {/* Simulated Equalizer Bars */}
          <div className="w-24 h-16 bg-black border border-gray-700 flex items-end justify-between p-1.5 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-[#2562cb] via-teal-400 to-green-500 rounded-t-sm"
                style={{
                  height: isPlaying ? `${Math.floor(Math.random() * 90) + 10}%` : '5%',
                  transition: isPlaying ? 'height 0.15s ease' : 'height 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Song info text */}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-blue-400 font-semibold tracking-wider uppercase mb-1">XP Media Player</div>
            <h3 className="font-bold text-sm truncate leading-tight">{currentTrack.title}</h3>
            <p className="text-xs text-gray-400 truncate mt-0.5">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Seek slider bar */}
        <div className="mt-4 flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons Controls */}
        <div className="flex justify-between items-center mt-3 bg-[#1e2a3e] p-2 rounded border border-white/5">
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-600 active:scale-95 flex items-center justify-center border border-white/20 transition-all shadow-sm"
            >
              <SkipBack className="w-4 h-4 fill-white" />
            </button>
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 flex items-center justify-center border-2 border-white transition-all shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-600 active:scale-95 flex items-center justify-center border border-white/20 transition-all shadow-sm"
            >
              <SkipForward className="w-4 h-4 fill-white" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Track List Panel */}
      <div className="mt-3 bg-white border border-gray-300 rounded p-1 flex-1 flex flex-col overflow-hidden max-h-[160px]">
        <div className="text-[10px] text-gray-500 font-bold border-b border-gray-200 pb-1 mb-1 px-1 flex gap-1 items-center uppercase">
          <Music className="w-3.5 h-3.5" /> Play List
        </div>
        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
          {PLAYLIST.map((track, index) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setIsPlaying(true);
              }}
              className={`flex justify-between items-center text-xs p-1.5 rounded cursor-pointer transition ${currentTrackIndex === index ? 'bg-blue-100 text-blue-900 font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <div className="truncate flex-1 max-w-[200px]">
                {index + 1}. {track.title}
              </div>
              <div className="text-[10px] font-mono text-gray-400 ml-2">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
