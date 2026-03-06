"use client";

import { useRef, useCallback } from "react";
import { Leaf, Instagram, Facebook } from "lucide-react";
import type { SocialLinks } from "@/lib/config";

interface FooterProps {
  socialLinks: SocialLinks;
  onLongPressLevel1: () => void;
  onLongPressLevel2: () => void;
}

// Payment Method Icons
function MercadoPagoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="currentColor" className={className}>
      <path d="M25 2C12.3 2 2 12.3 2 25s10.3 23 23 23 23-10.3 23-23S37.7 2 25 2zm0 4c10.5 0 19 8.5 19 19s-8.5 19-19 19S6 35.5 6 25 14.5 6 25 6zm-7 12c-2.2 0-4 1.8-4 4v6c0 2.2 1.8 4 4 4h14c2.2 0 4-1.8 4-4v-6c0-2.2-1.8-4-4-4H18zm0 2h14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H18c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm2 2v6h2v-6h-2zm4 0v6h2v-6h-2zm4 0v6h2v-6h-2z"/>
    </svg>
  );
}

function BankIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
    </svg>
  );
}

export function Footer({ socialLinks, onLongPressLevel1, onLongPressLevel2 }: FooterProps) {
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressStartTime = useRef<number>(0);
  const level1Triggered = useRef<boolean>(false);

  const handlePressStart = useCallback(() => {
    pressStartTime.current = Date.now();
    level1Triggered.current = false;
    
    // Level 1: 3 seconds - on Barbara logo
    pressTimer.current = setTimeout(() => {
      level1Triggered.current = true;
      onLongPressLevel1();
    }, 3000);
  }, [onLongPressLevel1]);

  const handlePressEnd = useCallback(() => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }, []);

  // Separate handler for VFA Digital - Level 2
  const vfaPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleVfaPressStart = useCallback(() => {
    vfaPressTimer.current = setTimeout(() => {
      onLongPressLevel2();
    }, 12000);
  }, [onLongPressLevel2]);

  const handleVfaPressEnd = useCallback(() => {
    if (vfaPressTimer.current) {
      clearTimeout(vfaPressTimer.current);
      vfaPressTimer.current = null;
    }
  }, []);

  const paymentMethods = [
    { name: "Mercado Pago", icon: MercadoPagoIcon },
    { name: "Cuenta DNI", icon: BankIcon },
    { name: "Banco Provincia", icon: BankIcon },
    { name: "Transferencias", icon: BankIcon },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 bg-charcoal text-white relative overflow-hidden">
      {/* Decorative rose accent - low z-index */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose/50 via-rose-light/30 to-transparent z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo - Long press trigger for Admin Level 1 */}
          <div 
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onTouchCancel={handlePressEnd}
            className="flex items-center gap-2 mb-6 cursor-default select-none"
          >
            <Leaf className="w-6 h-6 text-rose-light" />
            <span className="font-serif text-2xl font-semibold"><span className="text-rose-light">B</span>arbara</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose transition-colors"
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

          {/* Payment Methods Section */}
          <div className="w-full max-w-md mb-8">
            <p className="text-white/60 text-sm mb-4">Métodos de pago aceptados</p>
            <div className="flex flex-wrap justify-center gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 hover:border-rose-light/30 transition-colors"
                >
                  <method.icon className="w-5 h-5 text-rose-light" />
                  <span className="text-sm text-white/80">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider with rose accent */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-light/50 to-transparent mb-6" />

          {/* Copyright */}
          <p className="text-white/60 text-sm mb-4">
            © {new Date().getFullYear()} Barbara Masajes Terapéuticos. Todos los derechos reservados.
          </p>

          {/* VFA Digital - Long Press Trigger for Level 2 */}
          <p
            onMouseDown={handleVfaPressStart}
            onMouseUp={handleVfaPressEnd}
            onMouseLeave={handleVfaPressEnd}
            onTouchStart={handleVfaPressStart}
            onTouchEnd={handleVfaPressEnd}
            onTouchCancel={handleVfaPressEnd}
            className="text-white/40 text-xs cursor-default select-none"
          >
            Creado by <span className="text-rose-light/60">VFA Digital</span>, la seguridad de lo que necesitas a un click.
          </p>
        </div>
      </div>
    </footer>
  );
}
