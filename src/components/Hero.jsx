import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play, ChevronLeft } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/slider-1.avif",
      subtitle: "Sustainable Future",
      title: "Empowering the",
      highlight: "Solar Revolution",
      description: "Eagle Envitech provides cutting-edge solar and environmental solutions to power a cleaner, sustainable tomorrow."
    },
    {
      id: 2,
      image: "/slider-2.jpg",
      subtitle: "Innovative Tech",
      title: "Next Generation",
      highlight: "Energy Solutions",
      description: "Advanced technology for maximum efficiency and robust power generation across all sectors."
    },
    {
      id: 3,
      image: "/slider-3.jpg",
      subtitle: "Eco-Friendly",
      title: "Building A",
      highlight: "Greener Tomorrow",
      description: "Join us in our mission to reduce carbon footprints with premium renewable energy infrastructure."
    },
    {
      id: 4,
      image: "/slider-4.jpg",
      subtitle: "Clean Energy",
      title: "Powering Your",
      highlight: "Global Growth",
      description: "Tailored solar solutions for industrial and commercial giants to scale sustainably."
    },
    {
      id: 5,
      image: "/slider-5.jpg",
      subtitle: "Smart Savings",
      title: "Maximize Your",
      highlight: "ROI & Savings",
      description: "Investing in solar isn't just good for the planet—it's the smartest financial decision for your business."
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-[100dvh] flex items-center overflow-hidden cursor-none bg-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slider */}
      <AnimatePresence>
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-primary/20"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover opacity-65"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/solar-hills-bg.png"; // Fallback to original if placeholder not found
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-[1px] w-8 bg-accent"></div>
              <span className="text-accent font-semibold tracking-widest text-xs uppercase">{slides[currentSlide].subtitle}</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title} <br />
              <span className="text-accent">{slides[currentSlide].highlight}</span>
            </h1>
            
            <p className="text-base md:text-lg mb-10 text-gray-200 leading-relaxed font-light max-w-lg">
              {slides[currentSlide].description}
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
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="absolute right-8 bottom-1/2 translate-y-1/2 flex flex-col gap-4 z-20 hidden md:flex">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all bg-black/20 backdrop-blur-md text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all bg-black/20 backdrop-blur-md text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-8 md:left-auto md:right-8 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? 'w-8 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Energy Sparks Animation */}
      <EnergySparks />
    </section>
  );
};

const EnergySparks = () => {
  const leftSparks = Array.from({ length: 15 });
  const rightSparks = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Left Side Sparks */}
      {leftSparks.map((_, i) => (
        <motion.div
          key={`left-${i}`}
          initial={{ 
            x: -100, 
            y: Math.random() * 100 + "%", 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            x: Math.random() * 40 + "vw", 
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#e21e26]"
        />
      ))}

      {/* Right Side Sparks */}
      {rightSparks.map((_, i) => (
        <motion.div
          key={`right-${i}`}
          initial={{ 
            x: "110vw", 
            y: Math.random() * 100 + "%", 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            x: 60 + Math.random() * 40 + "vw", 
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#e21e26]"
        />
      ))}
    </div>
  );
};

export default Hero;
