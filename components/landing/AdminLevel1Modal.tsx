"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Lock, Phone, CreditCard, Share2, Plus, Trash2 } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"whatsapp" | "payments" | "social" | "services">("whatsapp");
  
  // Form state
  const [whatsappConsulta, setWhatsappConsulta] = useState(config.whatsappConsulta);
  const [whatsappTurno, setWhatsappTurno] = useState(config.whatsappTurno);
  const [mercadoPagoAlias, setMercadoPagoAlias] = useState(config.mercadoPagoAlias);
  const [instagram, setInstagram] = useState(config.socialLinks.instagram);
  const [facebook, setFacebook] = useState(config.socialLinks.facebook);
  const [services, setServices] = useState<Service[]>(config.services);

  useEffect(() => {
    setWhatsappConsulta(config.whatsappConsulta);
    setWhatsappTurno(config.whatsappTurno);
    setMercadoPagoAlias(config.mercadoPagoAlias);
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
      whatsappConsulta,
      whatsappTurno,
      mercadoPagoAlias,
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

  const updateService = (id: string, field: keyof Service, value: string | number | boolean) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: "Nuevo Servicio",
      duration: "60 min",
      price: 10000,
      hasOffer: false,
      offerText: "",
      description: "Descripción del servicio"
    };
    setServices(prev => [...prev, newService]);
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const tabs = [
    { id: "whatsapp" as const, label: "WhatsApp", icon: Phone },
    { id: "payments" as const, label: "Pagos", icon: CreditCard },
    { id: "social" as const, label: "Redes", icon: Share2 },
    { id: "services" as const, label: "Servicios", icon: Plus },
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
            className="w-full max-w-lg bg-warm-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-warm-border bg-cream flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal">
                  Panel de Administración
                </h2>
                <p className="text-sm text-charcoal-light">Gestión de Barbara</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-warm-border rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {!isAuthenticated ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-sage" />
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
                      className={`w-full px-4 py-3 rounded-xl border ${
                        passwordError ? "border-red-500 bg-red-50" : "border-warm-border bg-cream"
                      } focus:outline-none focus:ring-2 focus:ring-sage/50`}
                      placeholder="Ingresa la contraseña"
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-2">Contraseña incorrecta</p>
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                          activeTab === tab.id
                            ? "bg-sage text-white"
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
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          WhatsApp para Consultas
                        </label>
                        <input
                          type="text"
                          value={whatsappConsulta}
                          onChange={(e) => setWhatsappConsulta(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-cream focus:outline-none focus:ring-2 focus:ring-sage/50"
                          placeholder="5491123456789"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          WhatsApp para Turnos
                        </label>
                        <input
                          type="text"
                          value={whatsappTurno}
                          onChange={(e) => setWhatsappTurno(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-cream focus:outline-none focus:ring-2 focus:ring-sage/50"
                          placeholder="5491198765432"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "payments" && (
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Alias de Mercado Pago
                      </label>
                      <input
                        type="text"
                        value={mercadoPagoAlias}
                        onChange={(e) => setMercadoPagoAlias(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-warm-border bg-cream focus:outline-none focus:ring-2 focus:ring-sage/50"
                        placeholder="tu.alias.mp"
                      />
                    </div>
                  )}

                  {activeTab === "social" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Instagram URL
                        </label>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-cream focus:outline-none focus:ring-2 focus:ring-sage/50"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Facebook URL
                        </label>
                        <input
                          type="text"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-cream focus:outline-none focus:ring-2 focus:ring-sage/50"
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "services" && (
                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <div key={service.id} className="p-4 bg-cream rounded-xl border border-warm-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-charcoal">Servicio {index + 1}</span>
                            <button
                              onClick={() => removeService(service.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => updateService(service.id, "name", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-warm-border bg-warm-white text-sm"
                            placeholder="Nombre"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={service.duration}
                              onChange={(e) => updateService(service.id, "duration", e.target.value)}
                              className="px-3 py-2 rounded-lg border border-warm-border bg-warm-white text-sm"
                              placeholder="Duración"
                            />
                            <input
                              type="number"
                              value={service.price}
                              onChange={(e) => updateService(service.id, "price", parseInt(e.target.value) || 0)}
                              className="px-3 py-2 rounded-lg border border-warm-border bg-warm-white text-sm"
                              placeholder="Precio"
                            />
                          </div>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(service.id, "description", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-warm-border bg-warm-white text-sm"
                            placeholder="Descripción"
                          />
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={service.hasOffer}
                                onChange={(e) => updateService(service.id, "hasOffer", e.target.checked)}
                                className="rounded"
                              />
                              Oferta
                            </label>
                            {service.hasOffer && (
                              <input
                                type="text"
                                value={service.offerText}
                                onChange={(e) => updateService(service.id, "offerText", e.target.value)}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-warm-border bg-warm-white text-sm"
                                placeholder="Texto oferta"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addService}
                        className="w-full py-3 border-2 border-dashed border-warm-border rounded-xl text-charcoal-light hover:border-sage hover:text-sage transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar Servicio
                      </button>
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
                  className="w-full py-3 bg-sage text-white font-medium rounded-xl hover:bg-sage-dark transition-colors flex items-center justify-center gap-2"
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
