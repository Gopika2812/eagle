import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const letters = "EAGLE ENVI-TECH".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVars = {
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5
      }
    }
  };

  const letterVars = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-[999] bg-[#fdfdfd] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Soft radial shading */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_100%)] pointer-events-none" />

      {/* Main Branding Group - Clean Stack, No Gaps */}
      <div className="relative -mt-10 md:-mt-20 flex flex-col items-center w-full px-4">

        {/* Step 1: Text - Positioned at the top of the stack */}
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 relative z-10"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVars}
              className={`text-xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-primary tracking-tighter ${char === " " ? "w-2 md:w-8" : ""}`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Step 2: Eagle - Glides down to practically touch the text */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 2.2, ease: "easeOut" }}
          className="-mt-28 md:-mt-52 relative z-20"
        >
          <img
            src="/eagle.png"
            alt="Eagle Icon"
            className="w-48 sm:w-64 md:w-80 lg:w-[420px] h-auto drop-shadow-xl"
          />
        </motion.div>

        {/* Step 3: Loader Line - Fused to the bottom of the Eagle */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80%", maxWidth: 380, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="h-[2px] bg-accent/20 rounded-full relative overflow-hidden -mt-20 md:-mt-40"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, delay: 0.8 }}
            className="h-full bg-accent shadow-[0_0_10px_rgba(226,30,38,0.6)]"
          />
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Preloader;
