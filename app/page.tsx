"use client";

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
import { getConfig, DEFAULT_CONFIG } from "@/lib/config";
import type { SiteConfig } from "@/lib/config";

// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://evgumejfkpyktezdodah.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TVkTKUFKX5Bladdqb1flVQ_29NYsD56';

export default function Home() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localCfg = getConfig();

        // 1. Traer Servicios (Precios y Duración)
        const resSrv = await fetch(`${SUPABASE_URL}/rest/v1/servicios`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const dataSrv = await resSrv.json();

        // 2. Traer Configuración (WhatsApp e Instagram)
        const resCfg = await fetch(`${SUPABASE_URL}/rest/v1/configuracion?id=eq.1`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const dataCfg = await resCfg.json();

        if (dataSrv && dataSrv.length > 0) {
          const serviciosNube = dataSrv.map((srv: any) => ({
            id: srv.id,
            title: srv.nombre,
            price: srv.precio,
            duration: srv.duracion,
            description: "Tratamiento profesional y personalizado",
          }));

          // Limpiar el número: nos aseguramos que sean solo dígitos para el link
          const rawWsp = dataCfg[0]?.whatsapp || localCfg.whatsappNumber;
          const cleanWsp = rawWsp.replace(/\D/g, '');

          const updatedConfig = {
            ...localCfg,
            services: serviciosNube,
            whatsappNumber: cleanWsp,
            socialLinks: {
              ...localCfg.socialLinks,
              instagram: dataCfg[0]?.instagram ? `https://instagram.com/${dataCfg[0].instagram}` : localCfg.socialLinks.instagram
            }
          };
          setConfig(updatedConfig);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  // Función única para enviar al WhatsApp
  const irAWhatsApp = useCallback((mensaje: string) => {
    const text = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, "_blank");
  }, [config.whatsappNumber]);

  if (!isLoaded) return <div className="min-h-screen bg-cream flex items-center justify-center"><div className="w-10 h-10 border-3 border-rose border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <main className="min-h-screen relative">
      <FluidBackground />
      <Header />
      
      {/* Botón del Hero */}
      <Hero onReservarClick={() => irAWhatsApp("Hola Barbara, quiero reservar un turno.")} />

      {/* AQUÍ ESTÁ EL CAMBIO: Pasamos la función a los Servicios */}
      <Services 
        services={config.services} 
        onReservarClick={(serviceTitle: string) => irAWhatsApp(`Hola Barbara, quiero reservar un turno para: ${serviceTitle}`)} 
      />

      <PaymentMethods />
      <AboutMe />
      
      {/* Botón de Contacto abajo */}
      <Location onContactClick={() => irAWhatsApp("Hola Barbara, tengo una consulta.")} />

      <Footer socialLinks={config.socialLinks} />

      {/* Botón Flotante */}
      <WhatsAppButton whatsappNumber={config.whatsappNumber} />
    </main>
  );
}
