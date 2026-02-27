"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Settings, 
  Wrench, 
  Cog, 
  Bike, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServices, type SanityService } from "@/sanity/lib/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  settings: Settings,
  wrench: Wrench,
  cog: Cog,
  bike: Bike,
};

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

export default function ServicesPage() {
  const [showPopular, setShowPopular] = useState(false);
  const [services, setServices] = useState<SanityService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const sanityServices = await getServices();
        setServices(sanityServices);
      } catch (error) {
        console.error('Failed to fetch services from Sanity:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    if (showPopular) return service.popular;
    return true;
  });

  const displayedServices = showPopular
    ? [...filteredServices.filter(s => s.popular), ...filteredServices.filter(s => !s.popular)]
    : filteredServices;

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1">
              Professional Services
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            From basic tune-ups to complete overhauls, we offer a complete range of 
            bicycle repair and maintenance services.
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Button
            variant={showPopular ? "default" : "outline"}
            onClick={() => setShowPopular(!showPopular)}
            className={showPopular ? "btn-primary flex items-center gap-2" : "btn-secondary flex items-center gap-2"}
          >
            <Flame className="w-4 h-4" />
            {showPopular ? "Popular" : "Popular"}
          </Button>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-card p-4 md:p-6 h-full">
                <div className="animate-pulse">
                  <div className="w-14 h-14 rounded-xl bg-white/10 mb-4"></div>
                  <div className="h-6 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {displayedServices.map((service, index) => {
              const Icon = iconMap[service.icon || 'settings'] || Settings;
              return (
              <motion.div
                key={service._id}
                id={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`glass-card glass-card-hover p-6 h-full relative ${service.popular ? 'ring-2 ring-[#22c55e]/50' : ''}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#22c55e] text-black">Popular</Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#22c55e]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">{service.name}</h3>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm mb-4">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {(service.features || []).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/contact?service=${service.id}`} className="block">
                    <Button className="w-full btn-primary">
                      Book This Service
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Something Not Listed?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            We handle all types of bicycle repairs and maintenance. Contact us with your 
            specific requirements and we'll provide a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="btn-primary px-8">
                Get a Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="https://wa.me/27623235295" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="btn-secondary px-8">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
