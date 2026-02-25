"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { 
  Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle2,
  CalendarDays,
  MessageCircle,
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Calendar = dynamic(() => import("@/components/ui/calendar").then(mod => ({ default: mod.Calendar })), {
  ssr: false,
  loading: () => <div className="h-[300px] w-[280px] bg-[#111] rounded-lg flex items-center justify-center"><span className="text-zinc-500">Loading...</span></div>
});

const services = [
  "Basic Tune-Up (R350)",
  "Full Service (R650)",
  "Brake Adjustment (R200)",
  "Gear Tuning (R250)",
  "Chain Replacement (R150)",
  "Tube/Tyre Repair (R100)",
  "Cable Replacement (R180)",
  "Bottom Bracket Service (R400)",
  "Custom Build (From R5000)",
  "Emergency Repair (R300)",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1 mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Ready to book a service or have a question? We're here to help. 
            Reach out through the form below or contact us directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#22c55e] to-[#06b6d4] rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-black" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                  <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    onClick={handleReset}
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    <Send className="mr-2 w-4 h-4" />
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-[#22c55e]" />
                    Book a Service
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-300">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#22c55e]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#22c55e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-zinc-300">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+27 62 323 5295"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#22c55e]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-zinc-300">Service Required *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#22c55e]">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10">
                        {services.map((service) => (
                          <SelectItem key={service} value={service} className="text-white hover:bg-white/10">
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Preferred Date</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white justify-between font-normal"
                      >
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-[#22c55e]" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#111] border-white/10" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setFormData({ ...formData, date: date ? format(date, "yyyy-MM-dd") : "" });
                          setCalendarOpen(false);
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="bg-[#111]"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-300">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your bike and any specific issues..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#22c55e] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-6 text-lg"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Booking Request
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
                </form>
                </>
              )}
            </Card>
          </motion.div>

          {/* Contact Info & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Contact */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Quick Contact</h2>
              <div className="space-y-4">
                <a
                  href="https://wa.me/27623235295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25d366]/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#25d366]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp Us</p>
                    <p className="text-zinc-400 text-sm">+27 62 323 5295</p>
                  </div>
                </a>

                <a
                  href="tel:+27623235295"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Call Us</p>
                    <p className="text-zinc-400 text-sm">+27 62 323 5295</p>
                  </div>
                </a>

                <a
                  href="mailto:info@thebikemech.co.za"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#06b6d4]/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <p className="text-zinc-400 text-sm">info@thebikemech.co.za</p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#22c55e]" />
                Business Hours
              </h2>
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
                <div>
                  <span className="text-zinc-400">Mon - Fri:</span>
                  <span className="text-white ml-2">8:00 AM - 5:00 PM</span>
                </div>
                <div>
                  <span className="text-zinc-400">Sat:</span>
                  <span className="text-white ml-2">8:00 AM - 1:00 PM</span>
                </div>
                <div>
                  <span className="text-zinc-400">Sun:</span>
                  <span className="text-zinc-500 ml-2">Closed</span>
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#22c55e]" />
                Location
              </h2>
              <p className="text-zinc-400 mb-4">
                67A Old St Faiths Road, Umtentweni, Hibiscus Coast, KwaZulu-Natal
              </p>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500!2d30.35!3d-30.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eda43d3c1c1c1c1%3A0x1!2s67A%20Old%20St%20Faiths%20Road%2C%20Umtentweni%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[200px]"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
