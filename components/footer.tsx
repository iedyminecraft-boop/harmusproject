"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  return (
    <footer id="contact" className="relative z-10 bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold text-foreground">HARMUS</span>
            </div>
            <p className="text-muted-foreground">
              Servicii premium de închiriere auto în România. Calitate, siguranță și prețuri competitive.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <a href="tel:+40752314484" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>+40 752 314 484</span>
              </a>
              <a href="mailto:contact@harmus.ro" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@harmus.ro</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>România</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Link-uri Utile</h3>
            <div className="space-y-2">
              {["Acasă", "Flota", "Despre Noi", "Termeni și Condiții", "Politica de Confidențialitate"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Social Media</h3>
            <div className="flex gap-3">
              <motion.a
                href="https://www.facebook.com/profile.php?id=100013518572535&locale=ro_RO"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/edy.marius"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@edy.mariu555"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
              >
                <TikTokIcon />
              </motion.a>
            </div>
            <p className="text-sm text-muted-foreground">
              Urmărește-ne pentru oferte și noutăți
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Harmus Rent a Car. Toate drepturile rezervate.
          </p>
          <p className="text-muted-foreground text-sm">
            Făcut cu ❤️ în România
          </p>
        </div>
      </div>
    </footer>
  );
}
