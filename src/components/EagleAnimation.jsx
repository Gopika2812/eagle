import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const EagleAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Start at logo, quick takeoff
      await controls.start({
        opacity: [0, 1],
        x: '5vw',
        y: '5vh',
        scale: 0.5,
        rotate: 0,
        transition: { duration: 1.5, ease: "easeOut" }
      });

      // Phase 2: Circling (The "Soar")
      await controls.start({
        x: ['10vw', '40vw', '70vw', '40vw', '10vw'],
        y: ['10vh', '30vh', '10vh', '-10vh', '10vh'],
        scale: [0.6, 1.2, 0.6, 0.4, 0.6],
        rotateX: [0, 20, 0, -20, 0],
        rotateY: [0, 45, 90, 45, 0],
        rotate: [0, 10, 0, -10, 0],
        transition: { 
          duration: 10, 
          ease: "linear",
          repeat: 1
        }
      });

      // Phase 3: Glide to landing on the right side
      await controls.start({
        x: '75vw',
        y: '45vh',
        scale: 0.8,
        rotate: 5,
        transition: { duration: 3, ease: "anticipate" }
      });
    };

    sequence();
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, x: '2vw', y: '2vh', scale: 0.2 }}
      className="fixed z-[100] pointer-events-none perspective-[1000px]"
      style={{ top: 0, left: 0 }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-accent drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
      >
        <motion.path
          d="M12 2L4.5 9L9 11L2 14L12 22L22 14L15 11L19.5 9L12 2Z"
          fill="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        {/* Subtle wing animation */}
        <motion.path
          d="M4.5 9L2 14L12 22L22 14L19.5 9"
          stroke="white"
          strokeWidth="0.5"
          animate={{ 
            rotateX: [0, 20, 0],
            scaleY: [1, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </svg>
    </motion.div>
  );
};

export default EagleAnimation;
