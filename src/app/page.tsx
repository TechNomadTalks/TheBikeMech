"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Wrench, 
  Settings, 
  Bike, 
  Cog, 
  Zap,
  Star,
  ArrowRight,
  ArrowDown,
  Phone,
  Clock,
  Shield,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Services data
const services = [
  {
    id: "tune-up",
    name: "Basic Tune-Up",
    price: 350,
    icon: Settings,
    description: "Complete bike adjustment and safety check",
  },
  {
    id: "full-service",
    name: "Full Service",
    price: 650,
    icon: Wrench,
    description: "Comprehensive overhaul with all adjustments",
  },
  {
    id: "brake",
    name: "Brake Adjustment",
    price: 200,
    icon: Cog,
    description: "Brake calibration and pad replacement",
  },
  {
    id: "gear",
    name: "Gear Tuning",
    price: 250,
    icon: Settings,
    description: "Derailleur adjustment and cable tension",
  },
  {
    id: "chain",
    name: "Chain Replacement",
    price: 150,
    icon: Zap,
    description: "New chain installation and sizing",
  },
  {
    id: "tube",
    name: "Tube/Tyre Repair",
    price: 100,
    icon: Bike,
    description: "Puncture repair or tube replacement",
  },
];

// Stats data
const stats = [
  { value: 5000, suffix: "+", label: "Bikes Serviced", icon: Bike },
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { value: 98, suffix: "%", label: "Customer Satisfaction", icon: Star },
  { value: 24, suffix: "hr", label: "Emergency Response", icon: Clock },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review: "Absolutely fantastic service! My mountain bike was making strange noises, and they fixed it perfectly. Fast turnaround and great prices. Highly recommend The Bike Mech!",
    source: "Google Review",
  },
  {
    id: 2,
    name: "Michael Peters",
    rating: 5,
    review: "I've been bringing my bikes here for years. The team is knowledgeable, friendly, and always delivers quality work. Best bike shop on the South Coast!",
    source: "Facebook",
  },
  {
    id: 3,
    name: "Thabo Mokoena",
    rating: 5,
    review: "Professional service from start to finish. They explained everything they did and gave me tips on maintenance. My road bike runs like new!",
    source: "Google Review",
  },
  {
    id: 4,
    name: "Emma Williams",
    rating: 5,
    review: "Quick and efficient service. They even accommodated my urgent repair before a race. The Bike Mech is my go-to for all bike needs.",
    source: "WhatsApp",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Animate counters when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1">
                Professional Bicycle Services
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-white">Your Bike Deserves the </span>
              <span className="gradient-text">Best Care</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto"
            >
              From basic tune-ups to complete overhauls, we provide professional 
              bicycle repair and maintenance services to keep you riding smooth.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="btn-primary px-8">
                  Book a Service
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="btn-secondary px-8">
                  View Services
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#22c55e]" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#22c55e]" />
                <span>Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#22c55e]" />
                <span>Emergency Repairs</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-8 h-8 text-[#22c55e]" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={counterRef} className="py-16 px-4 lg:px-8 border-y border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <span className="stat-number">{counters[index]}</span>
                    <span className="gradient-text">{stat.suffix}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Quality Metrics */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1 mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quality <span className="gradient-text">You Can Trust</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Years of experience serving the cycling community with expert repairs and exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {/* Service Expertise - Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1"
            >
              <Card className="glass-card p-3 md:p-6">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-4">Services</h3>
                {/* Simple Pie Chart */}
                <div className="flex items-center gap-4">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32">
                    {/* Repairs 45% - Green */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="20" strokeDasharray="125.6 251.2" strokeDashoffset="0" transform="rotate(-90 50 50)"/>
                    {/* Service 30% - Pink - starts at 45% */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ec4899" strokeWidth="20" strokeDasharray="83.7 251.2" strokeDashoffset="-125.6" transform="rotate(-90 50 50)"/>
                    {/* Events 15% - Blue - starts at 75% */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="41.9 251.2" strokeDashoffset="-209.3" transform="rotate(-90 50 50)"/>
                    {/* Custom 10% - Orange - starts at 90% */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="20" strokeDasharray="27.9 251.2" strokeDashoffset="-251.2" transform="rotate(-90 50 50)"/>
                  </svg>
                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>Repairs 45%</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#ec4899]"></span>Service 30%</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>Events 15%</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f97316]"></span>Custom 10%</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Customer Satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card p-3 md:p-6">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-6">Satisfaction</h3>
                {/* Horizontal bar */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs md:text-sm mb-1">
                      <span className="text-zinc-300">Overall</span>
                      <span className="text-[#22c55e] font-bold">90%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-sm md:text-base font-bold text-[#22c55e]">5★</div>
                      <div className="text-xs text-zinc-500">65%</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-sm md:text-base font-bold text-[#06b6d4]">4★</div>
                      <div className="text-xs text-zinc-500">25%</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-sm md:text-base font-bold text-zinc-400">3★</div>
                      <div className="text-xs text-zinc-500">10%</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Service Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-1"
            >
              <Card className="glass-card p-3 md:p-6">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-4">Services</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Repairs', color: 'bg-[#22c55e]' },
                    { label: 'Service', color: 'bg-[#ec4899]' },
                    { label: 'Events', color: 'bg-[#3b82f6]' },
                    { label: 'Custom Builds', color: 'bg-[#f97316]' },
                  ].map((item) => (
                    <div key={item.label} className="relative">
                      <span className="text-zinc-300 text-sm">{item.label}</span>
                      <div className={`absolute bottom-0 left-0 h-0.5 ${item.color} w-full`} />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Hexagon Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '8+', label: 'Years Experience', icon: '🔧' },
              { number: '500+', label: 'Bikes Serviced', icon: '🚴' },
              { number: '50+', label: 'Events Covered', icon: '🏆' },
              { number: '100%', label: 'Quality Guarantee', icon: '✅' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 rounded-xl transform rotate-0 group-hover:rotate-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-white/10" />
                <div className="relative p-6 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-400 max-w-2xl mx-auto">
              Professional bicycle repair and maintenance services at competitive prices
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card glass-card-hover p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#22c55e]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
                        <p className="text-zinc-400 text-sm mb-3">{service.description}</p>
                        <p className="text-[#22c55e] font-bold">R{service.price}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/services">
              <Button size="lg" variant="outline" className="btn-secondary px-8">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 lg:px-8 bg-white/[0.02]">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Card className="glass-card p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#22c55e] text-[#22c55e]" />
                  ))}
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-lg md:text-xl text-white mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].review}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#06b6d4] flex items-center justify-center text-black font-bold">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-zinc-500 text-sm">{testimonials[currentTestimonial].source}</p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-[#22c55e] w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/10 to-[#06b6d4]/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Your Bike <span className="gradient-text">Back on the Road?</span>
              </h2>
              <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                Book your service today and experience professional bicycle care. 
                We offer quick turnaround times and quality guaranteed work.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="btn-primary px-8">
                    Book a Service
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="https://wa.me/27623235295" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="btn-secondary px-8">
                    <Phone className="mr-2 w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
