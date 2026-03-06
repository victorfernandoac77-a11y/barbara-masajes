"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code, Palette, RotateCcw, Lock, AlertTriangle } from "lucide-react";
import type { SiteConfig } from "@/lib/config";
import { ADMIN_PASSWORD_LEVEL_2, resetConfig } from "@/lib/config";

interface AdminLevel2ModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSave: (config: Partial<SiteConfig>) => void;
  onReset: () => void;
}

// Simplified JSX representation for viewing
const SOURCE_CODE_PREVIEW = `
// Landing Page Structure - Barbara Masajes
// Next.js + React + Tailwind CSS + Framer Motion

<Header />
  - Logo: Barbara with Leaf icon
  - Navigation: Inicio | Servicios | Sobre Mí | Ubicación
  - Mobile responsive menu

<Hero />
  - Title: "Barbara: Bienestar y Sanación"
  - Subtitle: "Masajes descontracturantes..."
  - CTA: "Reservar Turno" button
  - Trust indicators: +500 sessions, 5 years, 100%

<Services />
  - Dynamic grid of service cards
  - Each card: name, duration, price, offer badge
  - Data loaded from localStorage config

<AboutMe />
  - Personal introduction text
  - 4 feature cards: Personalizada, Seguro, Profesionalismo, Confianza
  - Decorative quote block

<Location />
  - Map placeholder with Google Maps link
  - Address, Hours, Access info cards
  - Contact CTA button

<Footer />
  - Logo and social links
  - Copyright notice
  - VFA Digital credit (long-press trigger)

<WhatsAppButton />
  - Floating FAB button
  - Menu: Consulta | Turno options
  - Pre-filled message templates

<AdminLevel1Modal />
  - Password: AdminMasaje
  - Edit: WhatsApp, Payments, Social, Services

<AdminLevel2Modal />
  - Password: Vfa@1990
  - View source, edit theme, factory reset
`.trim();

export function AdminLevel2Modal({ isOpen, onClose, config, onSave, onReset }: AdminLevel2ModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<"source" | "theme" | "reset">("source");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState(config.theme);

  useEffect(() => {
    setTheme(config.theme);
  }, [config]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD_LEVEL_2) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSaveTheme = () => {
    onSave({ theme });
    onClose();
  };

  const handleReset = () => {
    resetConfig();
    onReset();
    setShowResetConfirm(false);
    onClose();
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword("");
    setPasswordError(false);
    setShowResetConfirm(false);
    onClose();
  };

  const tabs = [
    { id: "source" as const, label: "Código Fuente", icon: Code },
    { id: "theme" as const, label: "Variables", icon: Palette },
    { id: "reset" as const, label: "Reset", icon: RotateCcw },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-charcoal rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-mono text-xl font-semibold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-sage-light" />
                  Modo Desarrollador VFA
                </h2>
                <p className="text-sm text-white/60">Nivel 2 - Acceso completo</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {!isAuthenticated ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-sage-light" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Contraseña de Desarrollador
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border font-mono ${
                        passwordError 
                          ? "border-red-500 bg-red-500/10 text-red-300" 
                          : "border-white/20 bg-white/5 text-white"
                      } focus:outline-none focus:ring-2 focus:ring-sage/50`}
                      placeholder="********"
                    />
                    {passwordError && (
                      <p className="text-red-400 text-sm mt-2">Contraseña incorrecta</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-sage text-white font-medium rounded-xl hover:bg-sage-dark transition-colors"
                  >
                    Acceder
                  </button>
                </form>
              ) : (
                <div className="space-y-5">
                  {/* Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors font-mono text-sm ${
                          activeTab === tab.id
                            ? "bg-sage text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeTab === "source" && (
                    <div className="bg-black/50 rounded-2xl p-4 overflow-auto max-h-96">
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {SOURCE_CODE_PREVIEW}
                      </pre>
                    </div>
                  )}

                  {activeTab === "theme" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Color de Fondo (Background)
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="color"
                            value={theme.background}
                            onChange={(e) => setTheme(prev => ({ ...prev, background: e.target.value }))}
                            className="w-12 h-12 rounded-xl cursor-pointer border-0"
                          />
                          <input
                            type="text"
                            value={theme.background}
                            onChange={(e) => setTheme(prev => ({ ...prev, background: e.target.value }))}
                            className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Color Primario (Primary)
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="color"
                            value={theme.primary}
                            onChange={(e) => setTheme(prev => ({ ...prev, primary: e.target.value }))}
                            className="w-12 h-12 rounded-xl cursor-pointer border-0"
                          />
                          <input
                            type="text"
                            value={theme.primary}
                            onChange={(e) => setTheme(prev => ({ ...prev, primary: e.target.value }))}
                            className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Color de Texto (Foreground)
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="color"
                            value={theme.foreground}
                            onChange={(e) => setTheme(prev => ({ ...prev, foreground: e.target.value }))}
                            className="w-12 h-12 rounded-xl cursor-pointer border-0"
                          />
                          <input
                            type="text"
                            value={theme.foreground}
                            onChange={(e) => setTheme(prev => ({ ...prev, foreground: e.target.value }))}
                            className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Fuente Serif (Títulos)
                        </label>
                        <input
                          type="text"
                          value={theme.fontSerif}
                          onChange={(e) => setTheme(prev => ({ ...prev, fontSerif: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-mono text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Fuente Sans (Cuerpo)
                        </label>
                        <input
                          type="text"
                          value={theme.fontSans}
                          onChange={(e) => setTheme(prev => ({ ...prev, fontSans: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-mono text-sm"
                        />
                      </div>

                      <button
                        onClick={handleSaveTheme}
                        className="w-full py-3 bg-sage text-white font-medium rounded-xl hover:bg-sage-dark transition-colors mt-4"
                      >
                        Guardar Tema
                      </button>
                    </div>
                  )}

                  {activeTab === "reset" && (
                    <div className="space-y-4">
                      {!showResetConfirm ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                          </div>
                          <h3 className="text-white font-medium text-lg mb-2">Reset a Fábrica</h3>
                          <p className="text-white/60 text-sm mb-6">
                            Esta acción eliminará todos los datos personalizados y restaurará la configuración original.
                          </p>
                          <button
                            onClick={() => setShowResetConfirm(true)}
                            className="px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
                          >
                            Iniciar Reset
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                          </div>
                          <h3 className="text-white font-medium text-lg mb-2">¿Estás seguro?</h3>
                          <p className="text-white/60 text-sm mb-6">
                            Se perderán todos los cambios realizados. Esta acción no se puede deshacer.
                          </p>
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={() => setShowResetConfirm(false)}
                              className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleReset}
                              className="px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
                            >
                              Confirmar Reset
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
