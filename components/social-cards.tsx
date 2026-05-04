"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=100013518572535&locale=ro_RO",
    color: "from-[#1877F2] to-[#0D65D9]",
    hoverColor: "hover:shadow-[#1877F2]/40",
    description: "Urmărește-ne pe Facebook",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/edy.marius",
    color: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    hoverColor: "hover:shadow-[#DD2A7B]/40",
    description: "Vezi galeria noastră",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@edy.mariu555",
    color: "from-[#00F2EA] via-[#FF0050] to-[#00F2EA]",
    hoverColor: "hover:shadow-[#FF0050]/40",
    description: "Videouri și noutăți",
  },
];

export function SocialCards() {
  return (
    <section id="social" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Urmărește-ne pe Social Media
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fii la curent cu cele mai noi oferte și mașini disponibile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-8 cursor-pointer transition-all duration-300 shadow-lg ${social.hoverColor} hover:shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <social.icon className="w-8 h-8" />
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {social.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {social.description}
                  </p>
                </div>

                <motion.div
                  className="flex items-center gap-2 text-primary font-medium"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span>Vizitează</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
