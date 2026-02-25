"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Facebook, 
  Filter, 
  Bike, 
  ExternalLink,
  ArrowRight,
  ChevronDown,
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Mountain Bikes", "Road Bikes", "Kids Bikes", "Cruisers", "E-Bikes"];

const sampleBikes = [
  {
    id: 1,
    title: "Trek Marlin 7 Gen 3",
    price: 18500,
    category: "Mountain Bikes",
    description: "Excellent condition, recently serviced. Perfect for trails and everyday riding.",
    featured: true,
    year: 2023,
  },
  {
    id: 2,
    title: "Giant Contend AR 1",
    price: 12000,
    category: "Road Bikes",
    description: "Great entry-level road bike with carbon fork. Ideal for long rides.",
    featured: false,
    year: 2022,
  },
  {
    id: 3,
    title: "Specialized Rockhopper Sport",
    price: 9500,
    category: "Mountain Bikes",
    description: "Well-maintained trail bike. Perfect for beginners and intermediate riders.",
    featured: true,
    year: 2022,
  },
  {
    id: 4,
    title: "Cannondale Quick 4",
    price: 8500,
    category: "Road Bikes",
    description: "Hybrid fitness bike in great condition. Perfect for commuting.",
    featured: false,
    year: 2021,
  },
  {
    id: 5,
    title: "Torch Kids MTB 20\"",
    price: 2500,
    category: "Kids Bikes",
    description: "Perfect starter bike for kids aged 6-9. Great condition with new tires.",
    featured: false,
    year: 2023,
  },
  {
    id: 6,
    title: "Schwinn Cruiser Deluxe",
    price: 4500,
    category: "Cruisers",
    description: "Comfortable beach cruiser style bike. Perfect for relaxed riding.",
    featured: false,
    year: 2022,
  },
  {
    id: 7,
    title: "Giant Trance E+ 2",
    price: 45000,
    category: "E-Bikes",
    description: "Full suspension e-mountain bike. Low hours, excellent condition.",
    featured: true,
    year: 2023,
  },
  {
    id: 8,
    title: "Raleigh Kids Detour 24\"",
    price: 3200,
    category: "Kids Bikes",
    description: "Quality kids bike suitable for ages 9-12. Recently serviced.",
    featured: false,
    year: 2022,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SalesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedBike, setExpandedBike] = useState<number | null>(null);

  const filteredBikes = selectedCategory === "All"
    ? sampleBikes
    : sampleBikes.filter((bike) => bike.category === selectedCategory);

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1 mb-4">
            Bikes For Sale
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quality <span className="gradient-text">Pre-Owned Bikes</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Browse our selection of quality-checked pre-owned bicycles. All bikes are 
            serviced and ready to ride. Updated regularly on Facebook Marketplace.
          </p>
        </motion.div>

        {/* Facebook Marketplace Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1877f2]/20 flex items-center justify-center flex-shrink-0">
              <Facebook className="w-8 h-8 text-[#1877f2]" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-xl font-semibold text-white mb-2">
                Follow Us on Facebook Marketplace
              </h2>
              <p className="text-zinc-400 text-sm">
                See our latest listings, new arrivals, and special deals on Facebook Marketplace. 
                New bikes added weekly!
              </p>
            </div>
            <a
              href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/marketplace"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button className="bg-[#1877f2] hover:bg-[#1877f2]/90 text-white px-6">
                View Marketplace
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
          
          {/* Facebook Page Plugin Embed */}
          <div className="mt-6">
            <div 
              className="fb-page" 
              data-href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/TheBikeMechSA"}
              data-tabs="marketplace" 
              data-width="" 
              data-height="500"
              data-small-header="false" 
              data-adapt-container-width="true" 
              data-hide-cover="false" 
              data-show-facepile="true"
            >
              <blockquote 
                cite={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/TheBikeMechSA"} 
                className="fb-xfbml-parse-ignore"
              >
                <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/TheBikeMechSA"}>The Bike Mech</a>
              </blockquote>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#22c55e]" />
            <span className="text-white font-medium">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-primary" : "btn-secondary"}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredBikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card glass-card-hover overflow-hidden group">
                {/* Image Placeholder */}
                <div 
                  className="aspect-[4/3] image-placeholder relative cursor-pointer"
                  onClick={() => setExpandedBike(expandedBike === bike.id ? null : bike.id)}
                >
                  {bike.featured && (
                    <Badge className="absolute top-3 left-3 bg-[#22c55e] text-black">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bike className="w-12 h-12 text-zinc-600" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">View Details</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-white group-hover:text-[#22c55e] transition-colors">
                      {bike.title}
                    </h3>
                  </div>
                  
                  <p className="text-[#22c55e] font-bold text-xl mb-2">R{bike.price.toLocaleString()}</p>
                  
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{bike.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      {bike.category}
                    </Badge>
                    <span>{bike.year}</span>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedBike(expandedBike === bike.id ? null : bike.id)}
                    className="w-full mt-3 flex items-center justify-center gap-1 py-2 text-sm text-[#22c55e] hover:text-white transition-colors"
                  >
                    {expandedBike === bike.id ? "Less Details" : "More Details"}
                    <motion.div
                      animate={{ rotate: expandedBike === bike.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedBike === bike.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Calendar className="w-4 h-4" />
                            <span>Year: {bike.year}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Tag className="w-4 h-4" />
                            <span>Category: {bike.category}</span>
                          </div>
                          <p className="text-zinc-300 text-sm mt-2">{bike.description}</p>
                          <p className="text-zinc-400 text-xs mt-2">
                            This bike has been serviced and is ready to ride. Contact us for more details or to arrange a test ride.
                          </p>
                          <Button className="w-full mt-3 btn-primary" size="sm">
                            Inquire About This Bike
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Interested in a Bike?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            Contact us for more details or to schedule a test ride. We also offer 
            trade-ins and consignment options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="btn-primary px-8">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="https://wa.me/27623235295" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="btn-secondary px-8">
                WhatsApp for Details
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
