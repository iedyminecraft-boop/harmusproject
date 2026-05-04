"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star, Users, Car } from "lucide-react";

const stats = [
  { icon: Car, value: "50+", label: "Mașini în flotă" },
  { icon: Users, value: "1000+", label: "Clienți mulțumiți" },
  { icon: Star, value: "5.0", label: "Rating mediu" },
];

const benefits = [
  "Fără costuri ascunse",
  "Asigurare completă inclusă",
  "Kilometraj nelimitat",
  "Livrare la domiciliu",
  "Asistență 24/7",
  "Prețuri competitive",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              De ce Harmus?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Experiență premium la prețuri accesibile
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Cu ani de experiență în domeniul închirierilor auto, oferim servicii de calitate superioară. 
              Ne mândrim cu o flotă modernă și diversificată, gata să răspundă oricăror nevoi de mobilitate.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="tel:+40752314484"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
            >
              Contactează-ne pentru oferte
            </motion.a>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
