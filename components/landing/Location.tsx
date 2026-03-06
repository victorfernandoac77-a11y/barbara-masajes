"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Car, Phone } from "lucide-react";

interface LocationProps {
  onContactClick: () => void;
}

export function Location({ onContactClick }: LocationProps) {
  return (
    <section id="ubicacion" className="py-20 sm:py-28 px-4 sm:px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            Ubicación
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
            Te espero en mi gabinete privado en Guernica, Zona Sur
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative h-80 lg:h-full min-h-[320px] bg-cream rounded-3xl overflow-hidden border border-warm-border"
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-sage/10" />
            
            {/* Map Placeholder Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-sage" />
              </div>
              <p className="text-charcoal font-serif text-xl font-medium mb-2">
                Guernica, Buenos Aires
              </p>
              <p className="text-charcoal-light text-sm mb-4">
                Zona Sur - Partido de Presidente Perón
              </p>
              <a
                href="https://maps.google.com/?q=Guernica,Buenos+Aires,Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sage text-white text-sm font-medium rounded-2xl hover:bg-sage-dark transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Ver en Google Maps
              </a>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(125, 142, 126, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(125, 142, 126, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 p-5 bg-cream rounded-3xl border border-warm-border">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-1">
                    Dirección
                  </h3>
                  <p className="text-charcoal-light">
                    Guernica, Partido de Presidente Perón
                    <br />
                    Zona Sur, Provincia de Buenos Aires
                  </p>
                  <p className="text-sm text-sage mt-2">
                    La dirección exacta se comparte al confirmar el turno
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-5 bg-cream rounded-3xl border border-warm-border">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-1">
                    Horarios de Atención
                  </h3>
                  <p className="text-charcoal-light">
                    Lunes a Viernes: 9:00 - 20:00
                    <br />
                    Sábados: 9:00 - 14:00
                  </p>
                  <p className="text-sm text-sage mt-2">
                    Solo con turno previo
                  </p>
                </div>
              </div>

              {/* Access */}
              <div className="flex gap-4 p-5 bg-cream rounded-3xl border border-warm-border">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-1">
                    Cómo Llegar
                  </h3>
                  <p className="text-charcoal-light">
                    Fácil acceso desde la Ruta 210
                    <br />
                    Estacionamiento disponible
                  </p>
                </div>
              </div>

              {/* Contact Button */}
              <button
                onClick={onContactClick}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-sage text-white font-medium rounded-3xl hover:bg-sage-dark transition-colors duration-300 shadow-lg shadow-sage/20"
              >
                <Phone className="w-5 h-5" />
                Contactar para Consultas
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
