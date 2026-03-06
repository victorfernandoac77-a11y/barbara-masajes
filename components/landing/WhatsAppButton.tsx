"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, HelpCircle, Calendar, User, Phone, Send, Trash2 } from "lucide-react";

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

interface SavedUser {
  name: string;
  phone: string;
}

const STORAGE_KEY = "barbara_lead_data";

// Real WhatsApp SVG Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "options">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [savedUser, setSavedUser] = useState<SavedUser | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Load saved user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedUser = JSON.parse(saved) as SavedUser;
        setSavedUser(parsedUser);
        setName(parsedUser.name);
        setPhone(parsedUser.phone);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Por favor ingresa tu teléfono";
    } else if (!/^[\d\s+()-]{8,}$/.test(phone)) {
      newErrors.phone = "Ingresa un teléfono válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save user data to localStorage
      const userData: SavedUser = { name, phone };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setSavedUser(userData);
      setStep("options");
    }
  };

  const handleOptionSelect = (type: "consulta" | "turno") => {
    const userData = savedUser || { name, phone };
    const typeText = type === "consulta" ? "hacer una consulta" : "reservar un turno";
    const message = encodeURIComponent(
      `Hola Barbara, soy ${userData.name}, mi número es ${userData.phone} y quiero ${typeText}.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    handleClose();
  };

  const handleClearSavedUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedUser(null);
    setName("");
    setPhone("");
    setStep("form");
  };

  const handleOpen = () => {
    setIsOpen(true);
    // If user already saved, go directly to options
    if (savedUser) {
      setStep("options");
    } else {
      setStep("form");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form errors but keep name/phone if user is saved
    setTimeout(() => {
      setErrors({});
      if (!savedUser) {
        setStep("form");
      }
    }, 300);
  };

  return (
    <>
      {/* Full screen drag constraint container */}
      <div 
        ref={constraintsRef} 
        className="fixed inset-0 pointer-events-none z-40"
        style={{ padding: "80px 20px 20px 20px" }}
      />
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:top-auto sm:bottom-40 sm:right-6 sm:translate-y-0 sm:w-96 bg-white rounded-3xl shadow-2xl border border-warm-border overflow-hidden z-50"
            >
              {/* Header */}
              <div className="p-5 border-b border-warm-border bg-gradient-to-r from-rose-soft to-cream">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-charcoal">
                        Contactar a Barbara
                      </h3>
                      <p className="text-sm text-charcoal-light">
                        {step === "form" ? "Completa tus datos" : savedUser ? `Hola de nuevo, ${savedUser.name}` : "Elige una opción"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5 text-charcoal-light" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <AnimatePresence mode="wait">
                  {step === "form" ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmitForm}
                      className="space-y-4"
                    >
                      {/* Name Input */}
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Tu nombre
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${
                              errors.name ? "border-rose bg-rose-soft" : "border-warm-border bg-cream"
                            } focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors text-charcoal`}
                            placeholder="Ingresa tu nombre"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-rose text-sm mt-1.5">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Tu teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${
                              errors.phone ? "border-rose bg-rose-soft" : "border-warm-border bg-cream"
                            } focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors text-charcoal`}
                            placeholder="Ej: 11 2345-6789"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-rose text-sm mt-1.5">{errors.phone}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-sage text-white font-medium rounded-2xl hover:bg-sage-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sage/20"
                      >
                        <Send className="w-4 h-4" />
                        Continuar
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="options"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {/* User Info Display */}
                      <div className="p-3 bg-cream rounded-2xl border border-warm-border mb-4 flex items-center justify-between">
                        <p className="text-sm text-charcoal">
                          <span className="font-medium">{savedUser?.name || name}</span>
                          <span className="text-charcoal-light"> • {savedUser?.phone || phone}</span>
                        </p>
                        {savedUser && (
                          <button
                            onClick={handleClearSavedUser}
                            className="p-1.5 hover:bg-rose/10 rounded-lg transition-colors"
                            title="Borrar mis datos"
                          >
                            <Trash2 className="w-4 h-4 text-rose" />
                          </button>
                        )}
                      </div>

                      {/* Options */}
                      <button
                        onClick={() => handleOptionSelect("consulta")}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-cream hover:bg-warm-border border border-warm-border hover:border-sage/30 transition-all text-left group"
                      >
                        <div className="w-12 h-12 bg-rose-soft rounded-2xl flex items-center justify-center group-hover:bg-rose/10 transition-colors">
                          <HelpCircle className="w-6 h-6 text-rose" />
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Tengo una consulta</span>
                          <span className="text-sm text-charcoal-light">Preguntas sobre servicios</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleOptionSelect("turno")}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-cream hover:bg-warm-border border border-warm-border hover:border-sage/30 transition-all text-left group"
                      >
                        <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                          <Calendar className="w-6 h-6 text-sage" />
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">Reservar turno</span>
                          <span className="text-sm text-charcoal-light">Agendar una sesión</span>
                        </div>
                      </button>

                      {/* Edit Data Button - only if not returning user */}
                      {!savedUser && (
                        <button
                          onClick={() => setStep("form")}
                          className="w-full py-2.5 text-charcoal-light text-sm hover:text-charcoal transition-colors"
                        >
                          Volver a editar datos
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button - Draggable, larger, positioned higher */}
      <motion.div
        id="whatsapp-button"
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
        }}
        style={{ x: position.x, y: position.y }}
        className="fixed bottom-24 right-6 z-50 cursor-grab active:cursor-grabbing"
      >
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-24 h-24 bg-[#25D366] text-white rounded-full shadow-2xl shadow-[#25D366]/50 flex items-center justify-center hover:bg-[#20BA5C] transition-colors"
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
                <X className="w-10 h-10" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <WhatsAppIcon className="w-12 h-12" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Effect */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
              <span className="absolute -inset-2 rounded-full border-2 border-[#25D366]/30 animate-pulse" />
            </>
          )}
        </motion.button>
        
        {/* Drag hint indicator */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-charcoal-light/50 whitespace-nowrap pointer-events-none">
          arrastra
        </div>
      </motion.div>
    </>
  );
}
