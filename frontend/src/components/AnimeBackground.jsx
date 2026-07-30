import React, { useEffect, useRef, useState } from 'react';
const animejs = require('animejs');
const anime = animejs.default || animejs;

const AnimeBackground = () => {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState([0, 0]);
  const [blocks, setBlocks] = useState([]);
  
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate how many 50x50 blocks fit in the screen
      const columns = Math.floor(width / 50);
      const rows = Math.floor(height / 50);
      
      setGrid([columns, rows]);
      
      // Generate array of blocks
      setBlocks(Array.from({ length: columns * rows }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBlockClick = (index) => {
    anime({
      targets: '.anime-block',
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      translateY: [
        { value: -40, easing: 'easeOutSine', duration: 500 },
        { value: 0, easing: 'easeInOutQuad', duration: 1200 }
      ],
      opacity: [
        { value: 1, easing: 'easeOutSine', duration: 500 },
        { value: 0.1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      delay: anime.stagger(200, { grid: grid, from: index }),
      backgroundColor: [
        { value: '#00f0ff', duration: 500 },
        { value: '#050505', duration: 1200 }
      ]
    });
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-0 flex flex-wrap pointer-events-auto"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505'
      }}
    >
      {blocks.map((_, i) => (
        <div
          key={i}
          className="anime-block w-[50px] h-[50px] border border-white/[0.02] cursor-pointer opacity-10 bg-[#050505] hover:bg-white/10 transition-colors duration-300"
          onClick={() => handleBlockClick(i)}
        />
      ))}
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
    </div>
  );
};

export default AnimeBackground;
