import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = ({ darkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check for saved music preference
    const savedMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    setIsPlaying(savedMusicPlaying);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      if (savedMusicPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay prevented:', err);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem('musicPlaying', 'false');
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
        });
        setIsPlaying(true);
        localStorage.setItem('musicPlaying', 'true');
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
      >
        {/* Using a free festive music URL - you can replace this with your own music file */}
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button 
        className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} ms-2`}
        onClick={toggleMusic}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? '🔇' : '🎵'}
      </button>
    </>
  );
};

export default MusicPlayer;
