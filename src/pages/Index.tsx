import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/65.png";
import ContactForm from "@/components/ContactForm";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Auto-open form on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Hero Background - Full Image */}
      <div className="w-full">
        <img
          src={heroImage}
          alt="Calma - Sheikh Zayed Property"
          className="w-full h-auto"
        />
      

      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/30">
              وحدات متشطبة بالكامل
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="gold-text">الشيخ زايد القديمة</span>
          </h1>

          {/* Price Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="mb-6"
          >
            <div className="inline-flex items-baseline gap-2">
              <span className="text-6xl md:text-8xl font-extrabold gold-text">44</span>
              <span className="text-2xl md:text-3xl font-bold text-foreground">ألف</span>
            </div>
            <p className="text-muted-foreground text-lg mt-1">قسط شهري</p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={() => setIsFormOpen(true)}
            className="gold-gradient text-primary-foreground font-bold px-8 py-4 rounded-xl text-lg shadow-2xl hover:opacity-90 transition-all duration-300 animate-pulse-glow"
          >
            سجل بياناتك الآن
          </motion.button>
        </motion.div>
      </div>

      {/* Form Modal */}
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Floating Contact Buttons */}
      <FloatingButtons />
    </div>
  );
};

export default Index;
