"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Car, MapPin, Calendar, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

interface BookingData {
  car: {
    id: number;
    name: string;
    category: string;
    price: number;
    year: number;
  };
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  totalDays: number;
  totalPrice: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    countryId: "",
    countryOrigin: "",
    city: "",
    phone: "",
    email: "",
    notes: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      setBookingData(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, [router]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Numele este obligatoriu";
    if (!formData.countryId.trim()) newErrors.countryId = "Țara (act identitate) este obligatorie";
    if (!formData.countryOrigin.trim()) newErrors.countryOrigin = "Țara de origine este obligatorie";
    if (!formData.city.trim()) newErrors.city = "Orașul este obligatoriu";
    if (!formData.phone.trim()) newErrors.phone = "Telefonul este obligatoriu";
    if (!formData.email.trim()) {
      newErrors.email = "Email-ul este obligatoriu";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalid";
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = "Trebuie să accepți termenii și condițiile";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !bookingData) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...bookingData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        sessionStorage.removeItem("bookingData");
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "A apărut o eroare. Încercați din nou.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("A apărut o eroare de conexiune. Încercați din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Rezervare trimisă!</h1>
          <p className="text-muted-foreground mb-6">
            Cererea ta de rezervare a fost trimisă cu succes. Te vom contacta în curând pentru confirmare.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la pagina principală
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </Link>
        </div>
      </header>

      {/* Success Banner */}
      <div className="bg-green-500/10 border-b border-green-500/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400">
            <Check className="w-5 h-5" />
            <span>&quot;{bookingData.car.name} - {bookingData.car.year}&quot; a fost adăugat în coș.</span>
          </div>
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            CONTINUĂ CUMPĂRĂTURILE
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Billing Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Detalii de facturare</h2>
            <p className="text-amber-500 text-sm mb-6">Toate câmpurile sunt obligatorii</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nume și prenume <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full bg-muted border ${errors.fullName ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Country ID */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Țara / Regiune (Conform actului de identitate) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleInputChange}
                  className={`w-full bg-muted border ${errors.countryId ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.countryId && <p className="text-red-500 text-sm mt-1">{errors.countryId}</p>}
              </div>

              {/* Country Origin */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Țara / Regiune (De unde veniți) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="countryOrigin"
                  value={formData.countryOrigin}
                  onChange={handleInputChange}
                  className={`w-full bg-muted border ${errors.countryOrigin ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.countryOrigin && <p className="text-red-500 text-sm mt-1">{errors.countryOrigin}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Oraș <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full bg-muted border ${errors.city ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-muted border ${errors.phone ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Adresa de email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-muted border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Note comandă (opțional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Note referitoare la comanda ta, de exemplu: anumite note pentru livrare."
                  className="w-full bg-muted border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Terms checkbox */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Datele tale personale vor fi utilizate pentru a procesa comanda ta, pentru a-ți susține experiența pe acest site și în alte scopuri descrise în{" "}
                  <span className="text-primary hover:underline cursor-pointer">politica de confidențialitate</span>.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">
                    Am citit și sunt de acord cu{" "}
                    <span className="text-primary hover:underline cursor-pointer">termenii și condițiile</span>!{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
              </div>

              {/* Error message */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                    Se trimite...
                  </>
                ) : (
                  "TRIMITE COMANDA"
                )}
              </button>
            </form>
          </motion.div>

          {/* Right - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Detalii rezervare</h2>

              {/* Product header */}
              <div className="flex justify-between text-sm font-medium text-muted-foreground border-b border-border pb-3 mb-4">
                <span>PRODUS</span>
                <span>TOTAL</span>
              </div>

              {/* Car info */}
              <div className="flex items-start justify-between py-3 border-b border-border">
                <div className="flex items-start gap-2">
                  <button className="text-red-500 hover:text-red-400">
                    <span className="text-lg">×</span>
                  </button>
                  <div>
                    <p className="font-medium text-foreground">{bookingData.car.name} - {bookingData.car.year}</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">{bookingData.totalPrice.toFixed(2)} €</p>
              </div>

              {/* Booking details */}
              <div className="py-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Locație preluare:</span>
                  <span className="font-medium text-foreground">{bookingData.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Locație predare:</span>
                  <span className="font-medium text-foreground">{bookingData.dropoffLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Data preluării:</span>
                  <span className="font-medium text-primary">{formatDate(bookingData.pickupDate)} 09:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Data predării:</span>
                  <span className="font-medium text-primary">{formatDate(bookingData.dropoffDate)} 09:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Cantitate:</span>
                  <span className="font-medium text-foreground">1</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-foreground">TOTAL</span>
                  <span className="text-2xl font-bold text-foreground">{bookingData.totalPrice.toFixed(2)} €</span>
                </div>

                <p className="text-sm text-red-400 text-center mb-2">
                  *Valoarea NU include garanția returnabilă 50 €<br />
                  conform <span className="text-primary hover:underline cursor-pointer">termeni și condiții</span>!
                </p>
                <p className="text-sm text-muted-foreground text-center">*Preț cu TVA inclus</p>
              </div>

              {/* Payment method */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Metoda de plată:</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium text-foreground">Se va stabili telefonic</p>
                  <p className="text-sm text-primary">
                    După plasarea comenzii un consultant te va contacta pentru stabilirea altor detalii.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
