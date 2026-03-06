"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Star, Users } from "lucide-react";

export function AboutMe() {
  const features = [
    {
      icon: Heart,
      title: "Atención Personalizada",
      description: "Cada sesión se adapta a tus necesidades específicas",
      accent: true, // Uses rose color
    },
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Gabinete privado con todas las medidas de higiene",
    },
    {
      icon: Star,
      title: "Profesionalismo",
      description: "Técnicas certificadas y años de experiencia",
    },
    {
      icon: Users,
      title: "Confianza",
      description: "Cientos de clientes satisfechos nos respaldan",
    },
  ];

  return (
    <section id="sobre-mi" className="py-20 sm:py-28 px-4 sm:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-6">
              Sobre Mí
            </h2>

            <div className="space-y-4 text-charcoal-light text-lg leading-relaxed">
              <p>
                Soy Barbara, masajista terapéutica con más de{" "}
                <span className="text-sage font-medium">5 años de experiencia</span>{" "}
                dedicada al bienestar integral de cada persona que llega a mi gabinete.
              </p>

              <p>
                Mi espacio en Guernica está diseñado para que te sientas{" "}
                <span className="text-sage font-medium">cómodo y seguro</span> desde el primer momento.
                Cada detalle está pensado para crear un ambiente de paz y tranquilidad.
              </p>

              <p>
                Creo firmemente que el cuerpo tiene memoria y que, a través de las técnicas adecuadas,
                podemos liberar tensiones acumuladas, mejorar la circulación y recuperar el
                equilibrio físico y emocional.
              </p>
            </div>

            {/* Quote with rose accent */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 pl-6 border-l-4 border-rose italic text-charcoal-light"
            >
              "Mi objetivo es que salgas sintiéndote renovado, con menos tensiones y más conexión con tu cuerpo."
            </motion.blockquote>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-warm-white p-5 sm:p-6 rounded-3xl border border-warm-border hover:border-sage/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  feature.accent ? "bg-rose/10" : "bg-sage/10"
                }`}>
                  <feature.icon className={`w-6 h-6 ${feature.accent ? "text-rose" : "text-sage"}`} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
