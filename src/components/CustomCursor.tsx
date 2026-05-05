import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: mousePos.x - 10,
        y: mousePos.y - 10,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(212, 163, 115, 0.3)' : 'rgba(26, 26, 26, 0.1)'
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '1px solid var(--primary)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: window.innerWidth > 1024 ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
};

export default CustomCursor;
