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
import { EventsCalendar } from "@/components/shared/events-calendar";

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
    name: "Luke Dodge",
    rating: 5,
    review: "Local Guide with 15 reviews. Great experience with The Bike Mech on the South Coast.",
    source: "Google Review",
  },
  {
    id: 2,
    name: "Estie Potgieter",
    rating: 5,
    review: "Excellent service! Clive looked after my bike during Go2Berg and I never had to have even one worry about my bike. Even my valve caps got attention. He really went the extra mile every day. Highly recommended!",
    source: "Google Review",
  },
  {
    id: 3,
    name: "Gillian Bure",
    rating: 5,
    review: "Mtbking with the south coasters once a year is such a treat. They really have it all, wonderful trails in the area, they drink beer with breakfast after their rides, and to top it all, have their own friendly bike mechanic riding with them!",
    source: "Google Review",
  },
  {
    id: 4,
    name: "Earl Harris",
    rating: 5,
    review: "Excellent service. Clive shows a lot of attention to detail and did more than I asked for. He knows what he's doing and who better to look after your bike than an avid cyclist himself. I will recommend Clive to anyone.",
    source: "Google Review",
  },
  {
    id: 5,
    name: "Cabri van Zyl",
    rating: 5,
    review: "I am so grateful for this amazing mobile service in my area. Clive always goes the extra mile. He takes care of my beautiful bike with superior knowledge. Very reasonable priced as well. Super convenient. Thank you Clive.",
    source: "Google Review",
  },
  {
    id: 6,
    name: "John Devonport",
    rating: 5,
    review: "Day 5 on Go2berg and Clint from the Bike Mech came to my rescue twice in one day when my free wheel bearing disintegrated! Thanks for getting my bike fixed so quickly and efficiently enabling me to finish the race!",
    source: "Google Review",
  },
  {
    id: 7,
    name: "Steve Millingham",
    rating: 5,
    review: "Clive has been advising me for the past 4 years. He is always honest and provides options. I have used him to help sell 4 bikes and each service has surpassed my expectations.",
    source: "Google Review",
  },
  {
    id: 8,
    name: "Craig Hohls",
    rating: 5,
    review: "Nice to meet Clive and get my bike sorted out. Great service!",
    source: "Google Review",
  },
  {
    id: 9,
    name: "Brian Style",
    rating: 5,
    review: "Clive always looks after my bike at Sani, and he always goes out of his way to make sure my bike is 100% ready for each day. He even serviced my riding prosthetic leg at the last Sani event.",
    source: "Google Review",
  },
  {
    id: 10,
    name: "Bob Clark",
    rating: 5,
    review: "The best bike mechanic by far. Couldn't ask for a better service for my bike. Clive is very helpful, friendly, and enthusiastic.",
    source: "Google Review",
  },
  {
    id: 11,
    name: "Kim Jones",
    rating: 5,
    review: "Clive is very knowledgeable and got me a great deal on my bike. I'm about to upgrade and will definitely be asking him to assist me.",
    source: "Google Review",
  },
  {
    id: 12,
    name: "Eamonn O'Neill",
    rating: 5,
    review: "Exceptional service! Clive the mobile bicycle mechanic arrived promptly and efficiently fixed my bike on the spot. Their expertise was evident as they quickly diagnosed and resolved the issue.",
    source: "Google Review",
  },
  {
    id: 13,
    name: "Charl Matthysen",
    rating: 5,
    review: "Thank you for your best services always spot on giving us a confident ride. Highly recommended.",
    source: "Google Review",
  },
  {
    id: 14,
    name: "Heather Malan",
    rating: 5,
    review: "Great service always. Also great that he collects and delivers. Thanks Clive.",
    source: "Google Review",
  },
  {
    id: 15,
    name: "Jonathan Lewarne",
    rating: 5,
    review: "I highly recommend the Bike Mech. Great guys with a great attitude and work ethic.",
    source: "Google Review",
  },
  {
    id: 16,
    name: "Bridgette Best",
    rating: 5,
    review: "Personalized, professional, patient and all round such a great service to have around South coast. Especially for women.",
    source: "Google Review",
  },
  {
    id: 17,
    name: "Tony Forbes",
    rating: 5,
    review: "Fantastic service and always goes the extra mile.",
    source: "Google Review",
  },
  {
    id: 18,
    name: "Mike Bennison",
    rating: 5,
    review: "Very good prompt professional service.",
    source: "Google Review",
  },
  {
    id: 19,
    name: "Shane Weller",
    rating: 5,
    review: "Great service from The Bike Mech. Highly recommended!",
    source: "Google Review",
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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = () => {
    return [testimonials[currentTestimonial]];
  };

  const totalDots = testimonials.length;
  const currentDot = currentTestimonial;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 lg:px-8 overflow-hidden">
        {/* Decorative Bike Graphics */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg className="absolute left-10 top-1/4 w-32 h-32" viewBox="0 0 100 100" fill="none">
            <circle cx="25" cy="65" r="15" stroke="currentColor" strokeWidth="3"/>
            <circle cx="75" cy="65" r="15" stroke="currentColor" strokeWidth="3"/>
            <path d="M25 50 L75 50 L65 30 L35 30 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
            <path d="M35 30 L25 65 M65 30 L75 65" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <svg className="absolute right-10 bottom-1/4 w-40 h-40" viewBox="0 0 100 100" fill="none">
            <circle cx="30" cy="60" r="18" stroke="currentColor" strokeWidth="3"/>
            <circle cx="80" cy="60" r="18" stroke="currentColor" strokeWidth="3"/>
            <path d="M30 42 L80 42 L70 25 L40 25 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
            <path d="M40 25 L30 60 M70 25 L80 60" stroke="currentColor" strokeWidth="2"/>
            <circle cx="55" cy="42" r="8" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <svg className="absolute left-1/4 bottom-20 w-24 h-24 opacity-30" viewBox="0 0 100 100" fill="none">
            <path d="M20 80 L50 20 L80 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="50" cy="20" r="8" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
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
              className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-zinc-500 px-4"
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
        <button
          type="button"
          onClick={() => {
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 text-[#22c55e]" />
          </motion.div>
        </button>
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

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
            {/* Customer Satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
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

            {/* Service Expertise - Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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

      {/* Mobile Triangle Indicator */}
      <div className="lg:hidden relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-[#22c55e]" />
        </div>
      </div>

      {/* Services Preview Section */}
      <section id="services" className="py-20 px-4 lg:px-8">
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
            {services.slice(0, 3).map((service, index) => {
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

      {/* Events Calendar Section */}
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
              Upcoming <span className="gradient-text">Events</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-400 max-w-2xl mx-auto">
              Race events, group rides, and cycling adventures on the South Coast
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <EventsCalendar />
          </div>
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

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {visibleTestimonials().map((testimonial, idx) => (
                <Card key={`${testimonial.id}-${idx}`} className="glass-card p-4 md:p-6">
                  <div className="flex gap-1 mb-2 md:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-4 md:w-4 fill-[#22c55e] text-[#22c55e]" />
                    ))}
                  </div>

                  <p className="text-zinc-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-3 md:line-clamp-4">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#06b6d4] flex items-center justify-center text-black font-bold text-xs md:text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-xs md:text-sm">{testimonial.name}</p>
                      <p className="text-zinc-500 text-[10px] md:text-xs">{testimonial.source}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-4 md:mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentDot
                      ? "bg-[#22c55e] w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
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
