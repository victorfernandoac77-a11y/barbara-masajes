"use client";

// Barbara Landing Page - Masajes Terapéuticos
import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { FluidBackground } from "@/components/landing/FluidBackground";
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

// === INYECCIÓN DE SUPABASE (Motor de Base de Datos VFA Digital) ===
const SUPABASE_URL = 'https://evgumejfkpyktezdodah.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TVkTKUFKX5Bladdqb1flVQ_29NYsD56';

export default function Home() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAdminLevel1, setShowAdminLevel1] = useState(false);
  const [showAdminLevel2, setShowAdminLevel2] = useState(false);

  // Cargar configuración local Y precios de Supabase al entrar
  useEffect(() => {
    // 1. Cargamos configuración local (redes, whatsapp, etc)
    const loadedConfig = getConfig();
    
    // 2. Buscamos los precios en tiempo real a Supabase
    fetch(`${SUPABASE_URL}/rest/v1/servicios`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        // Adaptamos los datos para que el diseño de v0 no se rompa
        const serviciosNube = data.map((srv: any) => ({
          id: srv.id,
          title: srv.nombre, // Aseguramos compatibilidad
          nombre: srv.nombre,
          price: srv.precio,
          precio: srv.precio,
          duration: srv.duracion,
          duracion: srv.duracion,
          description: "Tratamiento profesional y personalizado", 
        }));
        
        // Unimos: Redes/WhatsApp locales + Precios de la nube
        setConfig({ ...loadedConfig, services: serviciosNube });
      } else {
        setConfig(loadedConfig);
      }
      setIsLoaded(true);
    })
    .catch(err => {
      console.error("Error al conectar con la base de datos:", err);
      setConfig(loadedConfig); // Si falla internet, carga los precios de respaldo
      setIsLoaded(true);
    });
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
    <main className="min-h-screen relative">
      <FluidBackground />
      <Header />
      <Hero onReservarClick={handleReservarClick} />
      <Services services={config.services} />
      <PaymentMethods />
      <AboutMe />
      <Location onContactClick={handleContactClick} />
      <Footer
        socialLinks={config.socialLinks}
        onLongPressLevel1={() => setShowAdminLevel1(true)}
        onLongPressLevel2={() => setShowAdminLevel2(true)}
      />
      <WhatsAppButton whatsappNumber={config.whatsappNumber} />
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
