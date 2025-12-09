import React, { useRef, useEffect } from 'react';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; z: number; pz: number }[] = [];
    const numStars = 1000;
    const baseSpeed = 10;
    let speed = baseSpeed;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: 0 
      });
      stars[i].pz = stars[i].z; // Previous Z
    }

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Update star position
        star.z -= speed;

        // Reset if it passes the camera
        if (star.z <= 0) {
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
            star.z = width;
            star.pz = width;
        }

        // Project 3D to 2D
        const x = (star.x / star.z) * width + cx;
        const y = (star.y / star.z) * height + cy;

        const px = (star.x / star.pz) * width + cx;
        const py = (star.y / star.pz) * height + cy;

        star.pz = star.z;

        // Draw the streak
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
            const size = (1 - star.z / width) * 4;
            const shade = (1 - star.z / width) * 255;
            
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
            ctx.lineWidth = size;
            ctx.stroke();
        }
      }
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    // Optional: Increase speed on scroll
    const handleScroll = () => {
        speed = baseSpeed + (window.scrollY * 0.05); // Speed increases deeper in page
        // Cap speed
        if (speed > 50) speed = 50;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    const animId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 opacity-60" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default Starfield;