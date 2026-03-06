"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const BACKGROUND_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20260306_005129_Video%20Player-hXf3xHOgGnipZwgBgMEnlBL3htbJVT.jpg";

export function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring animation for mouse movement
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  // Scroll-based parallax
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.15, 1.2]);
  
  // Morphing distortion values based on mouse position
  const skewX = useTransform(smoothMouseX, [0, 1], [-3, 3]);
  const skewY = useTransform(smoothMouseY, [0, 1], [-2, 2]);
  const rotateZ = useTransform(smoothMouseX, [0, 1], [-1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
        setMousePos({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden -z-10"
    >
      {/* Main morphing background image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: parallaxY,
          scale,
          skewX,
          skewY,
          rotateZ,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGE})`,
            filter: "saturate(0.9) brightness(1.05)",
          }}
        />
        
        {/* Fluid wave overlay effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(125, 142, 126, 0.15) 0%, transparent 50%)`,
              `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(225, 29, 72, 0.1) 0%, transparent 50%)`,
              `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(125, 142, 126, 0.15) 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Liquid distortion overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
              rgba(252, 249, 245, 0.4) 0%, 
              rgba(252, 249, 245, 0.2) 40%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Animated fluid ripples */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <filter id="fluid-morph">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.01"
                numOctaves="3"
                seed="1"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.01 0.01;0.02 0.015;0.01 0.01"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="30" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Soft cream overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/50 to-cream/80 pointer-events-none" />
      
      {/* Top fade for header */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cream/90 to-transparent pointer-events-none" />
    </div>
  );
}
