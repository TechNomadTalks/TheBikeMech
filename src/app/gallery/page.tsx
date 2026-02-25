"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const categories = ["All", "Repairs", "Custom Builds", "Before & After", "Shop", "Events"];

const galleryImages = [
  {
    id: 1,
    title: "Full Suspension Overhaul",
    category: "Repairs",
    description: "Complete suspension service on a mountain bike",
  },
  {
    id: 2,
    title: "Custom Road Bike Build",
    category: "Custom Builds",
    description: "Full carbon road bike build from frame up",
  },
  {
    id: 3,
    title: "Drivetrain Replacement",
    category: "Repairs",
    description: "New chain, cassette, and chainring installation",
  },
  {
    id: 4,
    title: "Vintage Restoration",
    category: "Before & After",
    description: "Classic steel frame restoration project",
  },
  {
    id: 5,
    title: "The Workshop",
    category: "Shop",
    description: "Our fully equipped service area",
  },
  {
    id: 6,
    title: "Mountain Bike Build",
    category: "Custom Builds",
    description: "Custom MTB build with premium components",
  },
  {
    id: 7,
    title: "Brake System Upgrade",
    category: "Repairs",
    description: "Hydraulic brake installation and bleeding",
  },
  {
    id: 8,
    title: "Race Day Support",
    category: "Events",
    description: "On-site mechanical support at local races",
  },
  {
    id: 9,
    title: "Wheel Building",
    category: "Repairs",
    description: "Hand-built wheel with custom spokes",
  },
  {
    id: 10,
    title: "E-Bike Conversion",
    category: "Custom Builds",
    description: "Electric motor installation on commuter bike",
  },
  {
    id: 11,
    title: "Rusty Chain Before",
    category: "Before & After",
    description: "Severely neglected drivetrain",
  },
  {
    id: 12,
    title: "Community Ride",
    category: "Events",
    description: "Weekly group ride from the shop",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const navigateImage = (direction: "prev" | "next") => {
    setCurrentImageIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? filteredImages.length - 1 : prev - 1;
      }
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
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
            Our Work
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Browse through our collection of repair work, custom builds, and shop events. 
            See the quality of our workmanship firsthand.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="glass-card glass-card-hover overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square image-placeholder relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-zinc-600" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm">View Image</span>
                    </div>
                    <Badge className="absolute bottom-3 left-3 bg-black/60 text-white text-xs">
                      {image.category}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white text-sm">{image.title}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl w-full bg-[#0a0a0a] border-zinc-800 p-0">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image placeholder */}
              <div className="aspect-video image-placeholder bg-zinc-900">
                <div className="h-full flex items-center justify-center">
                  <Camera className="w-16 h-16 text-zinc-600" />
                </div>
              </div>

              {/* Image info */}
              <div className="p-6">
                <Badge className="bg-[#22c55e]/20 text-[#22c55e] mb-2">
                  {filteredImages[currentImageIndex]?.category}
                </Badge>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {filteredImages[currentImageIndex]?.title}
                </h2>
                <p className="text-zinc-400">
                  {filteredImages[currentImageIndex]?.description}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
