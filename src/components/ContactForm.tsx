import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Briefcase, Home, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    job: "",
    rooms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.job || !formData.rooms) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create mailto link as fallback (for demo purposes)
    const subject = encodeURIComponent("طلب جديد من موقع Calma");
    const body = encodeURIComponent(
      `الاسم: ${formData.name}\nرقم الموبايل: ${formData.mobile}\nالوظيفة: ${formData.job}\nعدد الغرف: ${formData.rooms}`
    );
    
    // Open email client
    window.location.href = `mailto:mohamed.ismael@leadersdevelopments.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "تم بنجاح!",
        description: "سيتم التواصل معك قريباً",
      });
      setFormData({ name: "", mobile: "", job: "", rooms: "" });
      onClose();
    }, 1000);
  };

  const roomOptions = ["1", "2", "3"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass-card rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute left-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold gold-text mb-2">
                احجز وحدتك الآن
              </h2>
              <p className="text-muted-foreground text-sm">
                سجل بياناتك وسنتواصل معك فوراً
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  الاسم
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary border-border focus:border-primary transition-colors"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-foreground flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  رقم الموبايل
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="أدخل رقم موبايلك"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="bg-secondary border-border focus:border-primary transition-colors"
                  dir="ltr"
                />
              </div>

              {/* Job */}
              <div className="space-y-2">
                <Label htmlFor="job" className="text-foreground flex items-center gap-2">
                  <Briefcase size={16} className="text-primary" />
                  الوظيفة
                </Label>
                <Input
                  id="job"
                  type="text"
                  placeholder="أدخل وظيفتك"
                  value={formData.job}
                  onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                  className="bg-secondary border-border focus:border-primary transition-colors"
                />
              </div>

              {/* Rooms */}
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Home size={16} className="text-primary" />
                  عدد الغرف
                </Label>
                <div className="flex gap-3">
                  {roomOptions.map((room) => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => setFormData({ ...formData, rooms: room })}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        formData.rooms === room
                          ? "gold-gradient text-primary-foreground shadow-lg"
                          : "bg-secondary text-foreground hover:bg-muted border border-border"
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient text-primary-foreground font-bold py-6 text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin ml-2" size={20} />
                ) : (
                  <Send className="ml-2" size={20} />
                )}
                {isSubmitting ? "جاري الإرسال..." : "أرسل الآن"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
