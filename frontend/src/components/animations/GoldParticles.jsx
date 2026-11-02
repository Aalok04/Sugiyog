import React, { useEffect, useRef } from 'react';

/**
 * GoldParticles - High performance luxury canvas particle effect
 * Emits slow floating sacred gold starlight specks
 */
export default function GoldParticles({ count = 35, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user reduced-motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.45 - 0.1, // float upward
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      hue: Math.random() > 0.4 ? 'rgba(196, 154, 69,' : 'rgba(227, 204, 154,',
    }));

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.008;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.1, Math.min(0.85, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.hue} ${currentOpacity})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = '#C49A45';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`gold-particles-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
