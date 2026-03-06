"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, HelpCircle, Calendar } from "lucide-react";

interface WhatsAppButtonProps {
  whatsappConsulta: string;
  whatsappTurno: string;
}

export function WhatsAppButton({ whatsappConsulta, whatsappTurno }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOption = (type: "consulta" | "turno") => {
    const number = type === "consulta" ? whatsappConsulta : whatsappTurno;
    const message = encodeURIComponent(
      `Hola Barbara, vengo desde la web y necesito ${type === "consulta" ? "hacer una consulta" : "un turno"}...`
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 w-72 bg-warm-white rounded-3xl shadow-2xl border border-warm-border overflow-hidden"
            >
              <div className="p-4 border-b border-warm-border bg-cream">
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Contactar a Barbara
                </h3>
                <p className="text-sm text-charcoal-light mt-1">
                  Selecciona una opción
                </p>
              </div>

              <div className="p-3 space-y-2">
                <button
                  onClick={() => handleOption("consulta")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-cream transition-colors text-left group"
                >
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <HelpCircle className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <span className="font-medium text-charcoal block">Tengo una consulta</span>
                    <span className="text-sm text-charcoal-light">Preguntas sobre servicios</span>
                  </div>
                </button>

                <button
                  onClick={() => handleOption("turno")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-cream transition-colors text-left group"
                >
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <Calendar className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <span className="font-medium text-charcoal block">Quiero un turno</span>
                    <span className="text-sm text-charcoal-light">Reservar una sesión</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#20BA5C] transition-colors"
        aria-label={isOpen ? "Cerrar menú de WhatsApp" : "Abrir menú de WhatsApp"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
      </motion.button>
    </div>
  );
}
