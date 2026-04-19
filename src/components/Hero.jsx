import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden cursor-none">
      {/* Background with lightened overlay */}
      <div className="absolute inset-0 z-0 bg-primary/20">
        <img
          src="/solar-hills-bg.png"
          alt="Solar Energy Hills"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
      </div>

      {/* Eagle Cursor - Follows Mouse */}
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.05s ease-out'
        }}
      >
        <img 
          src="/eagle.png" 
          alt="Eagle Cursor" 
          className="w-20 h-auto drop-shadow-xl" 
        />
      </div>

      <div className="container relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-accent"></div>
            <span className="text-accent font-semibold tracking-widest text-xs uppercase">Sustainable Future</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering the <br />
            <span className="text-accent">Solar Revolution</span>
          </h1>
          
          <p className="text-base md:text-lg mb-10 text-gray-200 leading-relaxed font-light max-w-lg">
            Eagle Envitech provides cutting-edge solar and environmental solutions to power a cleaner, sustainable tomorrow.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <RouterLink 
              to="/all-products"
              className="relative group block px-8 py-3 bg-accent text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(226,30,38,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Our Solutions <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </RouterLink>
            
            <button className="flex items-center gap-3 text-white font-medium group hover:text-accent transition-colors">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Play className="fill-white w-3 h-3 ml-1" />
              </span>
              Watch Our Story
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-accent rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
