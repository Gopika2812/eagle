import React, { useRef, useEffect } from 'react';

const ScrollElectricity = () => {
  const canvasRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Bolt {
      constructor(side, y) {
        this.side = side;
        this.x = side === 'left' ? 0 : canvas.width;
        this.y = y;
        this.points = [{ x: this.x, y: this.y }];
        this.width = 1.5 + Math.random() * 2;
        this.life = 6 + Math.random() * 8;
        this.maxLife = this.life;
        this.finished = false;
        this.jitter = 15 + Math.random() * 20;
      }

      update() {
        this.life--;
        if (this.life <= 0) {
          this.finished = true;
          return;
        }

        const lastPoint = this.points[this.points.length - 1];
        const nextX = lastPoint.x + (this.side === 'left' ? 1 : -1) * Math.random() * this.jitter;
        const nextY = lastPoint.y + (Math.random() - 0.5) * this.jitter;
        
        this.points.push({ x: nextX, y: nextY });
        if (this.points.length > 4) this.points.shift();
      }

      draw() {
        if (this.points.length < 2) return;
        
        const opacity = (this.life / this.maxLife) * 0.8;
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#e21e26';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        // Outer glow
        ctx.strokeStyle = `rgba(226, 30, 38, ${opacity * 0.4})`;
        ctx.lineWidth = this.width * 2;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) ctx.lineTo(this.points[i].x, this.points[i].y);
        ctx.stroke();

        // Main line
        ctx.strokeStyle = `rgba(226, 30, 38, ${opacity})`;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) ctx.lineTo(this.points[i].x, this.points[i].y);
        ctx.stroke();

        // Inner core
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
        ctx.lineWidth = this.width / 2.5;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    const bolts = [];
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      
      if (diff > 5) {
        // Spawn bolts on scroll
        const side = Math.random() < 0.5 ? 'left' : 'right';
        const y = Math.random() * canvas.height;
        bolts.push(new Bolt(side, y));
        
        if (diff > 50) {
           // More bolts for faster scroll
           bolts.push(new Bolt(side === 'left' ? 'right' : 'left', Math.random() * canvas.height));
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = bolts.length - 1; i >= 0; i--) {
        bolts[i].update();
        bolts[i].draw();
        if (bolts[i].finished) bolts.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ opacity: 0.9 }}
    />
  );
};

export default ScrollElectricity;
