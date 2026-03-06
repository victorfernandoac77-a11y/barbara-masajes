"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Lock, Phone, DollarSign, Share2, Trash2, Plus } from "lucide-react";
import type { SiteConfig, Service } from "@/lib/config";
import { ADMIN_PASSWORD_LEVEL_1 } from "@/lib/config";

interface AdminLevel1ModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSave: (config: Partial<SiteConfig>) => void;
}

export function AdminLevel1Modal({ isOpen, onClose, config, onSave }: AdminLevel1ModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<"whatsapp" | "prices" | "social">("whatsapp");
  
  // Form state
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [instagram, setInstagram] = useState(config.socialLinks.instagram);
  const [facebook, setFacebook] = useState(config.socialLinks.facebook);
  const [services, setServices] = useState<Service[]>(config.services);

  useEffect(() => {
    setWhatsappNumber(config.whatsappNumber);
    setInstagram(config.socialLinks.instagram);
    setFacebook(config.socialLinks.facebook);
    setServices(config.services);
  }, [config]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD_LEVEL_1) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSave = () => {
    onSave({
      whatsappNumber,
      socialLinks: { instagram, facebook },
      services,
    });
    onClose();
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword("");
    setPasswordError(false);
    onClose();
  };

  const updateServicePrice = (id: string, price: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, price } : s));
  };

  const updateServiceOffer = (id: string, hasOffer: boolean, offerText: string = "") => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, hasOffer, offerText } : s));
  };

  const tabs = [
    { id: "whatsapp" as const, label: "WhatsApp", icon: Phone },
    { id: "prices" as const, label: "Precios", icon: DollarSign },
    { id: "social" as const, label: "Redes", icon: Share2 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-warm-border bg-gradient-to-r from-rose-soft to-cream flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal">
                  Panel de Administración
                </h2>
                <p className="text-sm text-charcoal-light">Gestión de Barbara</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {!isAuthenticated ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-rose" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Contraseña de Administrador
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border ${
                        passwordError ? "border-rose bg-rose-soft" : "border-warm-border bg-cream"
                      } focus:outline-none focus:ring-2 focus:ring-rose/30`}
                      placeholder="Ingresa la contraseña"
                    />
                    {passwordError && (
                      <p className="text-rose text-sm mt-2">Contraseña incorrecta</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-rose text-white font-medium rounded-2xl hover:bg-rose-dark transition-colors"
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-2xl whitespace-nowrap transition-colors ${
                          activeTab === tab.id
                            ? "bg-rose text-white"
                            : "bg-cream text-charcoal hover:bg-warm-border"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeTab === "whatsapp" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-cream rounded-2xl border border-warm-border">
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Número de WhatsApp receptor
                        </label>
                        <p className="text-xs text-charcoal-light mb-3">
                          Este número recibirá todos los mensajes de la web
                        </p>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                          <input
                            type="text"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-warm-border bg-white focus:outline-none focus:ring-2 focus:ring-rose/30"
                            placeholder="5491123456789"
                          />
                        </div>
                        <p className="text-xs text-charcoal-light mt-2">
                          Formato: código de país + número (sin espacios ni guiones)
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "prices" && (
                    <div className="space-y-4">
                      <p className="text-sm text-charcoal-light">
                        Modifica los precios de cada servicio
                      </p>
                      
                      {services.map((service) => (
                        <div key={service.id} className="p-4 bg-cream rounded-2xl border border-warm-border space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-charcoal">{service.name}</h4>
                            <span className="text-xs text-charcoal-light">{service.duration}</span>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-charcoal-light mb-1">Precio</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light">$</span>
                              <input
                                type="number"
                                value={service.price}
                                onChange={(e) => updateServicePrice(service.id, parseInt(e.target.value) || 0)}
                                className="w-full pl-8 pr-4 py-2 rounded-xl border border-warm-border bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-rose/30"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-2 border-t border-warm-border">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="checkbox"
                                checked={service.hasOffer}
                                onChange={(e) => updateServiceOffer(service.id, e.target.checked, service.offerText)}
                                className="w-4 h-4 rounded border-warm-border text-rose focus:ring-rose"
                              />
                              <span className="text-charcoal">Oferta activa</span>
                            </label>
                            {service.hasOffer && (
                              <input
                                type="text"
                                value={service.offerText}
                                onChange={(e) => updateServiceOffer(service.id, true, e.target.value)}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-warm-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose/30"
                                placeholder="Ej: 2x1, 15% OFF"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "social" && (
                    <div className="space-y-4">
                      <p className="text-sm text-charcoal-light mb-4">
                        Configura las URLs de tus redes sociales
                      </p>
                      
                      <div className="p-4 bg-cream rounded-2xl border border-warm-border space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Instagram URL
                          </label>
                          <input
                            type="url"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-warm-border bg-white focus:outline-none focus:ring-2 focus:ring-rose/30"
                            placeholder="https://instagram.com/tu_perfil"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Facebook URL
                          </label>
                          <input
                            type="url"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-warm-border bg-white focus:outline-none focus:ring-2 focus:ring-rose/30"
                            placeholder="https://facebook.com/tu_pagina"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {isAuthenticated && (
              <div className="p-5 border-t border-warm-border bg-cream shrink-0">
                <button
                  onClick={handleSave}
                  className="w-full py-3 bg-rose text-white font-medium rounded-2xl hover:bg-rose-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose/20"
                >
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
