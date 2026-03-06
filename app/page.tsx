"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
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

  // Handle WhatsApp menu open for reservations
  const handleReservarClick = useCallback(() => {
    const message = encodeURIComponent(
      "Hola Barbara, vengo desde la web y necesito un turno..."
    );
    window.open(`https://wa.me/${config.whatsappTurno}?text=${message}`, "_blank");
  }, [config.whatsappTurno]);

  // Handle contact click
  const handleContactClick = useCallback(() => {
    const message = encodeURIComponent(
      "Hola Barbara, vengo desde la web y necesito hacer una consulta..."
    );
    window.open(`https://wa.me/${config.whatsappConsulta}?text=${message}`, "_blank");
  }, [config.whatsappConsulta]);

  // Don't render until config is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero onReservarClick={handleReservarClick} />

      {/* Services Section */}
      <Services 
        services={config.services} 
        onReservarClick={handleReservarClick} 
      />

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
      <WhatsAppButton
        whatsappConsulta={config.whatsappConsulta}
        whatsappTurno={config.whatsappTurno}
      />

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
