"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Fuel, Users, Settings } from "lucide-react";
import { BookingModal } from "./booking-modal";

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  fuel: string;
  seats: number;
  transmission: string;
  year: number;
  features: string[];
}

const cars: Car[] = [
  {
    id: 1,
    name: "BMW Seria 5",
    category: "Premium",
    price: 45,
    image: "/images/hero-car.jpg",
    fuel: "Diesel",
    seats: 5,
    transmission: "Automată",
    year: 2023,
    features: ["Navigație", "Scaune încălzite", "Camera parcare", "Cruise control"],
  },
  {
    id: 2,
    name: "Mercedes GLE",
    category: "SUV",
    price: 55,
    image: "/images/suv.jpg",
    fuel: "Diesel",
    seats: 7,
    transmission: "Automată",
    year: 2022,
    features: ["4x4", "Trapa panoramică", "Sistem audio premium", "LED Matrix"],
  },
  {
    id: 3,
    name: "Audi A6",
    category: "Business",
    price: 40,
    image: "/images/sedan.jpg",
    fuel: "Benzină",
    seats: 5,
    transmission: "Automată",
    year: 2023,
    features: ["Virtual Cockpit", "Apple CarPlay", "Senzori parcare", "Climatronic"],
  },
  {
    id: 4,
    name: "VW Golf",
    category: "Economy",
    price: 25,
    image: "/images/compact.jpg",
    fuel: "Benzină",
    seats: 5,
    transmission: "Manuală",
    year: 2022,
    features: ["Bluetooth", "Aer condiționat", "Închidere centralizată", "ABS"],
  },
];

export function CarCards() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <section id="fleet" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Flota Noastră
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Alege mașina perfectă pentru nevoile tale - de la economia la premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCarClick(car)}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full">
                    {car.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2">{car.name}</h3>
                
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{car.price}€</span>
                    <span className="text-muted-foreground text-sm">/zi</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm"
                  >
                    Închiriază
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        car={selectedCar} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
}
