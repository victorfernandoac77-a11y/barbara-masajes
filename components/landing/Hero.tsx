"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface HeroProps {
  onReservarClick: () => void;
}

export function Hero({ onReservarClick }: HeroProps) {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-sage rounded-full" />
            <span className="text-sage-dark text-sm font-medium">Gabinete Privado en Guernica</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal mb-6 text-balance leading-tight">
            Barbara: Bienestar y Sanación
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-charcoal-light max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
            Masajes descontracturantes y relajantes en tu gabinete privado de Guernica
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={onReservarClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage text-white font-medium text-lg rounded-3xl hover:bg-sage-dark transition-colors duration-300 shadow-lg shadow-sage/20"
          >
            <Calendar className="w-5 h-5" />
            Reservar Turno
          </motion.button>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-charcoal-light"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif text-sage">+500</span>
              <span className="text-sm">Sesiones realizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif text-sage">5</span>
              <span className="text-sm">Años de experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif text-sage">100%</span>
              <span className="text-sm">Clientes satisfechos</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
