"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { PaymentMethods } from "@/components/landing/PaymentMethods";
import { AboutMe } from "@/components/landing/AboutMe";
import { Location } from "@/components/landing/Location";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { AdminLevel1Modal } from "@/components/landing/AdminLevel1Modal";
import { AdminLevel2Modal } from "@/components/landing/AdminLevel2Modal";
import { getConfig, saveConfig, DEFAULT_CONFIG } from "@/lib/config";
import type { SiteConfig } from "@/lib/config";

export default function Home() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAdminLevel1, setShowAdminLevel1] = useState(false);
  const [showAdminLevel2, setShowAdminLevel2] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    const loadedConfig = getConfig();
    setConfig(loadedConfig);
    setIsLoaded(true);
  }, []);

  // Handle config save
  const handleSaveConfig = useCallback((updates: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...updates };
    setConfig(updatedConfig);
    saveConfig(updates);
  }, [config]);

  // Handle factory reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  // Handle WhatsApp for reservations
  const handleReservarClick = useCallback(() => {
    const message = encodeURIComponent(
      "Hola Barbara, vengo desde la web y quiero reservar un turno."
    );
    window.open(`https://wa.me/${config.whatsappNumber}?text=${message}`, "_blank");
  }, [config.whatsappNumber]);

  // Handle contact click
  const handleContactClick = useCallback(() => {
    const message = encodeURIComponent(
      "Hola Barbara, vengo desde la web y tengo una consulta."
    );
    window.open(`https://wa.me/${config.whatsappNumber}?text=${message}`, "_blank");
  }, [config.whatsappNumber]);

  // Don't render until config is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-rose border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream relative">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero onReservarClick={handleReservarClick} />

      {/* Services Section */}
      <Services 
        services={config.services} 
        onReservarClick={handleReservarClick} 
      />

      {/* Payment Methods */}
      <PaymentMethods />

      {/* About Me Section */}
      <AboutMe />

      {/* Location Section */}
      <Location onContactClick={handleContactClick} />

      {/* Footer with hidden admin triggers */}
      <Footer
        socialLinks={config.socialLinks}
        onLongPressLevel1={() => setShowAdminLevel1(true)}
        onLongPressLevel2={() => setShowAdminLevel2(true)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton whatsappNumber={config.whatsappNumber} />

      {/* Admin Modals */}
      <AdminLevel1Modal
        isOpen={showAdminLevel1}
        onClose={() => setShowAdminLevel1(false)}
        config={config}
        onSave={handleSaveConfig}
      />

      <AdminLevel2Modal
        isOpen={showAdminLevel2}
        onClose={() => setShowAdminLevel2(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleReset}
      />
    </main>
  );
}
