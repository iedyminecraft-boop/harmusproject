"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Home, Car, Info, Share2, MessageCircle } from "lucide-react";

const navLinks = [
  { name: "Acasă", href: "#", icon: Home },
  { name: "Flota", href: "#fleet", icon: Car },
  { name: "Despre", href: "#about", icon: Info },
  { name: "Social", href: "#social", icon: Share2 },
  { name: "Contact", href: "#contact", icon: MessageCircle },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
            >
              <span className="text-primary-foreground font-bold text-xl">H</span>
            </motion.div>
            <span className="text-2xl font-bold text-foreground">
              HARMUS
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </motion.a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="tel:+40752314484"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Sună Acum</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-b border-border"
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-foreground font-medium py-2 border-b border-border/50"
              >
                <Icon className="w-5 h-5 text-primary" />
                {link.name}
              </a>
            );
          })}
          <a
            href="tel:+40752314484"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
          >
            <Phone className="w-4 h-4" />
            <span>Sună Acum</span>
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}
