"use client";

import { motion } from "framer-motion";
import { CreditCard, Smartphone, Building2, ArrowLeftRight } from "lucide-react";

const paymentMethods = [
  {
    name: "Mercado Pago",
    icon: CreditCard,
    description: "Tarjetas y efectivo",
    color: "bg-[#00B1EA]/10 text-[#00B1EA]",
    borderHover: "hover:border-[#00B1EA]/30",
  },
  {
    name: "Cuenta DNI",
    icon: Smartphone,
    description: "Pago con QR",
    color: "bg-rose/10 text-rose",
    borderHover: "hover:border-rose/30",
  },
  {
    name: "Banco Provincia",
    icon: Building2,
    description: "Transferencia directa",
    color: "bg-sage/10 text-sage",
    borderHover: "hover:border-sage/30",
  },
  {
    name: "Transferencias",
    icon: ArrowLeftRight,
    description: "Todos los bancos",
    color: "bg-charcoal/10 text-charcoal",
    borderHover: "hover:border-charcoal/30",
  },
];

export function PaymentMethods() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-cream relative overflow-hidden">
      {/* Decorative background - low z-index */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sage/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal mb-2">
            Medios de Pago
          </h3>
          <p className="text-charcoal-light text-sm">
            Aceptamos múltiples formas de pago para tu comodidad
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex flex-col items-center p-4 sm:p-5 bg-white rounded-2xl border border-warm-border ${method.borderHover} transition-all duration-300 hover:shadow-md`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 ${method.color}`}>
                <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-charcoal text-sm sm:text-base text-center">
                {method.name}
              </span>
              <span className="text-charcoal-light text-xs mt-1 text-center">
                {method.description}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
