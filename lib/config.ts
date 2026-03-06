// Default configuration for Barbara's landing page
// This data can be modified through the hidden admin panels

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  hasOffer: boolean;
  offerText: string;
  description: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
}

export interface SiteConfig {
  // Contact
  whatsappConsulta: string;
  whatsappTurno: string;
  
  // Payments
  mercadoPagoAlias: string;
  
  // Social
  socialLinks: SocialLinks;
  
  // Services
  services: Service[];
  
  // Theme (for admin level 2)
  theme: {
    background: string;
    primary: string;
    foreground: string;
    fontSerif: string;
    fontSans: string;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  whatsappConsulta: "5491123456789",
  whatsappTurno: "5491198765432",
  mercadoPagoAlias: "barbara.masajes.mp",
  socialLinks: {
    instagram: "https://instagram.com/barbara.masajes",
    facebook: "https://facebook.com/barbara.masajes",
  },
  services: [
    {
      id: "1",
      name: "Masaje Descontracturante",
      duration: "60 min",
      price: 12000,
      hasOffer: false,
      offerText: "",
      description: "Alivia tensiones musculares profundas"
    },
    {
      id: "2",
      name: "Masaje Relajante",
      duration: "60 min",
      price: 10000,
      hasOffer: true,
      offerText: "2x1 en pareja",
      description: "Reduce el estrés y mejora el bienestar"
    },
    {
      id: "3",
      name: "Masaje Descontracturante Plus",
      duration: "90 min",
      price: 16000,
      hasOffer: false,
      offerText: "",
      description: "Sesión extendida para casos severos"
    },
    {
      id: "4",
      name: "Masaje Relajante Premium",
      duration: "90 min",
      price: 14000,
      hasOffer: true,
      offerText: "15% OFF",
      description: "Experiencia completa de relajación"
    }
  ],
  theme: {
    background: "#FCF9F5",
    primary: "#7D8E7E",
    foreground: "#3D3D3D",
    fontSerif: "Playfair Display",
    fontSans: "Inter"
  }
};

// LocalStorage keys
export const STORAGE_KEY = "barbara_site_config";

// Get config from localStorage or return default
export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_CONFIG;
    }
  }
  return DEFAULT_CONFIG;
}

// Save config to localStorage
export function saveConfig(config: Partial<SiteConfig>): void {
  if (typeof window === "undefined") return;
  
  const current = getConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// Reset config to defaults
export function resetConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Admin passwords
export const ADMIN_PASSWORD_LEVEL_1 = "AdminMasaje";
export const ADMIN_PASSWORD_LEVEL_2 = "Vfa@1990";
