"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import type { Service } from "@/lib/config";

interface ServicesProps {
  services: Service[];
  onReservarClick: () => void;
}

export function Services({ services, onReservarClick }: ServicesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="servicios" className="py-20 sm:py-28 px-4 sm:px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
            Cada sesión está diseñada para brindarte una experiencia única de bienestar y relajación
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative bg-cream rounded-3xl p-6 border border-warm-border hover:border-sage/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Offer Badge - Rose color for offers */}
              {service.hasOffer && (
                <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1.5 bg-rose text-white text-xs font-medium rounded-full shadow-md shadow-rose/30 z-10">
                  <Sparkles className="w-3 h-3" />
                  {service.offerText}
                </div>
              )}

              {/* Service Content */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-rose transition-colors">
                  {service.name}
                </h3>

                <p className="text-charcoal-light text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 text-charcoal-light">
                  <Clock className="w-4 h-4 text-sage" />
                  <span className="text-sm">{service.duration}</span>
                </div>

                {/* Price */}
                <div className="pt-2 border-t border-warm-border">
                  <span className="font-serif text-2xl font-semibold text-sage">
                    {formatPrice(service.price)}
                  </span>
                </div>

                {/* Book Button */}
                <button
                  onClick={onReservarClick}
                  className="w-full py-3 px-4 bg-sage/10 text-sage font-medium rounded-2xl hover:bg-sage hover:text-white transition-all duration-300"
                >
                  Reservar
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
