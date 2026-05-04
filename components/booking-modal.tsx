"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  year: number;
  fuel: string;
  seats: number;
  transmission: string;
  features: string[];
}

interface BookingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  "Timișoara",
  "Craiova", 
  "București",
  "Cluj-Napoca",
  "Iași",
  "Constanța",
  "Brașov",
  "Sibiu",
  "Oradea",
  "Arad"
];

export function BookingModal({ car, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!car) return null;

  const today = new Date().toISOString().split("T")[0];

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * car.price;

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    
    if (!pickupLocation) newErrors.pickupLocation = "Selectează locul de preluare";
    if (!dropoffLocation) newErrors.dropoffLocation = "Selectează locul de predare";
    if (!pickupDate) newErrors.pickupDate = "Selectează data de preluare";
    if (!dropoffDate) newErrors.dropoffDate = "Selectează data de predare";
    if (totalDays <= 0 && pickupDate && dropoffDate) {
      newErrors.dropoffDate = "Data de predare trebuie să fie după data de preluare";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Store booking data in sessionStorage
      const bookingData = {
        car: {
          id: car.id,
          name: car.name,
          category: car.category,
          price: car.price,
          year: car.year,
        },
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
        totalDays,
        totalPrice,
      };
      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
      router.push("/checkout");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Rezervă {car.name}</h2>
                <p className="text-sm text-muted-foreground">{car.category} • {car.year}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Price display */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Preț pe zi</p>
                <p className="text-3xl font-bold text-primary">{car.price}€<span className="text-lg font-normal">/zi</span></p>
              </div>

              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Loc preluare *
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className={`w-full bg-muted border ${errors.pickupLocation ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Selectează orașul</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm">{errors.pickupLocation}</p>
                )}
              </div>

              {/* Dropoff Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="w-4 h-4 text-accent" />
                  Loc predare *
                </label>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className={`w-full bg-muted border ${errors.dropoffLocation ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Selectează orașul</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.dropoffLocation && (
                  <p className="text-red-500 text-sm">{errors.dropoffLocation}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    Data preluare *
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    min={today}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className={`w-full bg-muted border ${errors.pickupDate ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.pickupDate && (
                    <p className="text-red-500 text-sm">{errors.pickupDate}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    Data predare *
                  </label>
                  <input
                    type="date"
                    value={dropoffDate}
                    min={pickupDate || today}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className={`w-full bg-muted border ${errors.dropoffDate ? 'border-red-500' : 'border-border'} rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.dropoffDate && (
                    <p className="text-red-500 text-sm">{errors.dropoffDate}</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              {totalDays > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted/50 border border-border rounded-xl p-4 space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Durată închiriere:</span>
                    <span className="font-medium">{totalDays} {totalDays === 1 ? 'zi' : 'zile'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Preț pe zi:</span>
                    <span className="font-medium">{car.price}€</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-primary text-xl">{totalPrice}€</span>
                  </div>
                </motion.div>
              )}

              {/* Continue button */}
              <button
                onClick={handleContinue}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Continuă rezervarea
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
