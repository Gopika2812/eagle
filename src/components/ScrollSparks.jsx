import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollSparks = () => {
  const [sparks, setSparks] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const createSpark = useCallback((x, y, type = 'side') => {
    const id = Math.random().toString(36).substr(2, 9);
    const side = x < window.innerWidth / 2 ? 'left' : 'right';
    const newSpark = {
      id,
      type,
      x,
      y,
      side,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 0.4 + 0.2,
    };

    setSparks((prev) => [...prev.slice(-20), newSpark]); // Keep last 20 sparks

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);

      if (diff > 20) {
        // Side sparks on scroll
        createSpark(0, window.innerHeight / 2, 'side');
        createSpark(window.innerWidth, window.innerHeight / 2, 'side');
        setLastScrollY(currentScrollY);
      }
    };

    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - lastMousePos.x, e.clientY - lastMousePos.y);
      if (dist > 100) { // Only spark every 100px of movement to avoid clutter
        createSpark(e.clientX, e.clientY, 'cursor');
        setLastMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, lastMousePos, createSpark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {/* Left Power Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent/10 md:bg-accent/20" />
      {/* Right Power Line */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-accent/10 md:bg-accent/20" />

      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
            }}
            animate={{ 
              opacity: [0, 1, 0.8, 1, 0], 
              scale: [1, 1.2, 0.8, 1.5, 0],
              x: spark.type === 'side' ? (spark.side === 'left' ? [0, 15, 30] : [0, -15, -30]) : [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
              y: spark.type === 'side' ? 0 : [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: spark.duration, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: spark.y,
              left: spark.x,
              width: spark.size * 3,
              height: spark.size * 3,
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 10px #e21e26, 0 0 20px #e21e26, 0 0 30px #ffffff',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Multiple Lightning Arcs */}
            {[1, 2, 3].map((j) => (
              <motion.div
                key={j}
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: [0, 50, 30, 60, 0], 
                  opacity: [0, 1, 0.5, 1, 0],
                  rotate: [
                    Math.random() * 360, 
                    Math.random() * 360, 
                    Math.random() * 360
                  ] 
                }}
                transition={{ duration: spark.duration }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  height: '2px',
                  background: 'linear-gradient(to right, #ffffff, #e21e26, transparent)',
                  transformOrigin: 'left',
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ScrollSparks;
