"use client";

import { useRef, useCallback } from "react";
import { Leaf, Instagram, Facebook } from "lucide-react";
import type { SocialLinks } from "@/lib/config";

interface FooterProps {
  socialLinks: SocialLinks;
  onLongPressLevel1: () => void;
  onLongPressLevel2: () => void;
}

export function Footer({ socialLinks, onLongPressLevel1, onLongPressLevel2 }: FooterProps) {
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressStartTime = useRef<number>(0);

  const handlePressStart = useCallback(() => {
    pressStartTime.current = Date.now();
    
    // Level 1: 3 seconds
    pressTimer.current = setTimeout(() => {
      onLongPressLevel1();
    }, 3000);
    
    // Level 2: 12 seconds (will override level 1 if still pressing)
    setTimeout(() => {
      if (Date.now() - pressStartTime.current >= 12000) {
        onLongPressLevel2();
      }
    }, 12000);
  }, [onLongPressLevel1, onLongPressLevel2]);

  const handlePressEnd = useCallback(() => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }, []);

  return (
    <footer className="py-12 px-4 sm:px-6 bg-charcoal text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-6 h-6 text-sage-light" />
            <span className="font-serif text-2xl font-semibold">Barbara</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/20 mb-6" />

          {/* Copyright */}
          <p className="text-white/60 text-sm mb-4">
            © {new Date().getFullYear()} Barbara Masajes Terapéuticos. Todos los derechos reservados.
          </p>

          {/* VFA Digital - Long Press Trigger */}
          <p
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onTouchCancel={handlePressEnd}
            className="text-white/40 text-xs cursor-default select-none"
          >
            Creado by VFA Digital, la seguridad de lo que necesitas a un click.
          </p>
        </div>
      </div>
    </footer>
  );
}
