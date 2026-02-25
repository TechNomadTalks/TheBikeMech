"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, HelpCircle, Package, Home, Image, FileText, MessageCircle, Bike, Wrench } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  type: "service" | "bike" | "blog" | "faq" | "page";
  item: Service | Bike | BlogPost | FAQ | SitePage;
  score: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
}

interface Bike {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface SitePage {
  id: string;
  title: string;
  href: string;
  icon: React.ElementType;
}

const services = [
  { id: "tune-up", name: "Basic Tune-Up", description: "Complete bike adjustment and safety check" },
  { id: "full-service", name: "Full Service", description: "Comprehensive overhaul with all adjustments" },
  { id: "brake", name: "Brake Adjustment", description: "Professional brake calibration and pad replacement" },
  { id: "gear", name: "Gear Tuning", description: "Precise derailleur adjustment and cable tension" },
  { id: "chain", name: "Chain Replacement", description: "New chain installation with proper sizing" },
  { id: "tube", name: "Tube/Tyre Repair", description: "Puncture repair or tube replacement" },
  { id: "cable", name: "Cable Replacement", description: "Complete cable and housing replacement" },
  { id: "bottom-bracket", name: "Bottom Bracket Service", description: "Bottom bracket removal, cleaning, and reinstallation" },
  { id: "custom", name: "Custom Build", description: "Full custom bike build from frame up" },
  { id: "emergency", name: "Emergency Repair", description: "Urgent repairs when you need them most" },
];

const bikes = [
  { id: 1, title: "Trek Marlin 7 Gen 3", description: "Excellent condition, recently serviced", category: "Mountain Bikes" },
  { id: 2, title: "Giant Contend AR 1", description: "Great entry-level road bike with carbon fork", category: "Road Bikes" },
  { id: 3, title: "Specialized Rockhopper Sport", description: "Well-maintained trail bike", category: "Mountain Bikes" },
  { id: 4, title: "Cannondale Quick 4", description: "Hybrid fitness bike in great condition", category: "Road Bikes" },
  { id: 5, title: "Torch Kids MTB 20\"", description: "Perfect starter bike for kids aged 6-9", category: "Kids Bikes" },
  { id: 6, title: "Schwinn Cruiser Deluxe", description: "Comfortable beach cruiser style bike", category: "Cruisers" },
  { id: 7, title: "Giant Trance E+ 2", description: "Full suspension e-mountain bike", category: "E-Bikes" },
  { id: 8, title: "Raleigh Kids Detour 24\"", description: "Quality kids bike suitable for ages 9-12", category: "Kids Bikes" },
];

const blogPosts = [
  { id: 1, title: "Maintaining Your Bike Chain", excerpt: "Learn how to properly clean, lubricate, and maintain your bike chain", category: "Maintenance Tips" },
  { id: 2, title: "When to Replace Brake Pads", excerpt: "Knowing when to replace your brake pads is crucial for safety", category: "Safety" },
  { id: 3, title: "Winter Riding Tips", excerpt: "Don't let the cold stop you from riding!", category: "Tips & Tricks" },
  { id: 4, title: "How to Choose the Right Bike Size", excerpt: "Getting the right size is essential for comfort and performance", category: "Buying Guides" },
  { id: 5, title: "The Complete Guide to Tubeless Tyres", excerpt: "Everything you need to know about tubeless tyres", category: "Technical" },
  { id: 6, title: "Basic Bike Tools Every Cyclist Should Own", excerpt: "Be prepared for roadside repairs and basic maintenance", category: "Maintenance Tips" },
];

const faqs = [
  { question: "How much does a basic tune-up cost?", answer: "Our basic tune-up service costs R350", category: "Services" },
  { question: "What's included in a full service?", answer: "Our full service at R650 includes everything in the basic tune-up", category: "Services" },
  { question: "Do you offer emergency repairs?", answer: "Yes! We offer emergency repair services for R300", category: "Services" },
  { question: "How long does a typical service take?", answer: "A basic tune-up typically takes 1-2 hours", category: "Services" },
  { question: "How do I book a service?", answer: "You can book a service through our contact form", category: "Booking" },
  { question: "Do I need to leave my bike with you?", answer: "For most services, yes, you'll need to leave your bike", category: "Booking" },
  { question: "Can I bring my own parts?", answer: "Absolutely! If you've purchased parts elsewhere", category: "Booking" },
  { question: "What are your operating hours?", answer: "We're open Monday to Friday from 8:00 AM to 5:00 PM", category: "Booking" },
  { question: "Do you sell second-hand bikes?", answer: "Yes! We have a selection of quality-checked pre-owned bicycles", category: "Sales" },
  { question: "Do you accept trade-ins?", answer: "Yes, we do accept trade-ins", category: "Sales" },
  { question: "Do you offer consignment sales?", answer: "Yes, we can sell your bike on consignment", category: "Sales" },
  { question: "Do you offer any warranty on repairs?", answer: "Yes, all our work comes with a 30-day warranty", category: "Warranty" },
  { question: "What if I'm not satisfied with the service?", answer: "Your satisfaction is our priority", category: "Warranty" },
  { question: "Are parts you install covered by warranty?", answer: "Parts we supply and install come with their manufacturer warranty", category: "Warranty" },
];

const sitePages: SitePage[] = [
  { id: "home", title: "Home", href: "/", icon: Home },
  { id: "services", title: "Services", href: "/services", icon: Wrench },
  { id: "sales", title: "Bikes For Sale", href: "/sales", icon: Bike },
  { id: "gallery", title: "Gallery", href: "/gallery", icon: Image },
  { id: "blog", title: "Blog", href: "/blog", icon: FileText },
  { id: "faq", title: "FAQ", href: "/faq", icon: HelpCircle },
  { id: "about", title: "About Us", href: "/about", icon: FileText },
  { id: "contact", title: "Contact Us", href: "/contact", icon: MessageCircle },
];

interface SearchDropdownProps {
  className?: string;
  onClose?: () => void;
}

export function SearchDropdown({ className = "", onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const simpleSearch = (items: any[], keys: string[], term: string): any[] => {
    const lowerTerm = term.toLowerCase();
    return items.filter(item => 
      keys.some(key => {
        const value = key.split('.').reduce((obj, k) => obj?.[k], item);
        return value?.toString().toLowerCase().includes(lowerTerm);
      })
    );
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults: SearchResult[] = [];
    const term = query.trim();

    simpleSearch(services, ['name', 'description'], term).slice(0, 3).forEach(item => searchResults.push({ type: "service", item, score: 1 }));
    simpleSearch(bikes, ['title', 'description', 'category'], term).slice(0, 3).forEach(item => searchResults.push({ type: "bike", item, score: 1 }));
    simpleSearch(blogPosts, ['title', 'excerpt', 'category'], term).slice(0, 2).forEach(item => searchResults.push({ type: "blog", item, score: 1 }));
    simpleSearch(faqs, ['question', 'answer', 'category'], term).slice(0, 3).forEach(item => searchResults.push({ type: "faq", item, score: 1 }));
    simpleSearch(sitePages, ['title', 'id'], term).slice(0, 2).forEach(item => searchResults.push({ type: "page", item, score: 1 }));

    setResults(searchResults.slice(0, 10));
    setIsOpen(true);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setIsOpen(false); setQuery(""); onClose?.(); }
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false); setQuery("");
    switch (result.type) {
      case "service": router.push(`/services#${(result.item as Service).id}`); break;
      case "bike": router.push("/sales"); break;
      case "blog": router.push("/blog"); break;
      case "faq": router.push("/faq"); break;
      case "page": router.push((result.item as SitePage).href); break;
    }
    onClose?.();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "service": return <Wrench className="w-4 h-4" />;
      case "bike": return <Bike className="w-4 h-4" />;
      case "blog": return <FileText className="w-4 h-4" />;
      case "faq": return <HelpCircle className="w-4 h-4" />;
      case "page": {
        const PageIcon = (result.item as SitePage).icon;
        return PageIcon ? <PageIcon className="w-4 h-4" /> : <Home className="w-4 h-4" />;
      }
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTitle = (result: SearchResult) => {
    switch (result.type) {
      case "service": return (result.item as Service).name;
      case "bike": return (result.item as Bike).title;
      case "blog": return (result.item as BlogPost).title;
      case "faq": return (result.item as FAQ).question;
      case "page": return (result.item as SitePage).title;
      default: return "";
    }
  };

  const getDesc = (result: SearchResult) => {
    switch (result.type) {
      case "service": return (result.item as Service).description;
      case "bike": return (result.item as Bike).description;
      case "blog": return (result.item as BlogPost).excerpt;
      case "faq": return (result.item as FAQ).answer;
      case "page": return "";
      default: return "";
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "service": return "Service";
      case "bike": return "Bike";
      case "blog": return "Blog";
      case "faq": return "FAQ";
      case "page": return "Page";
      default: return "";
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "service": return "bg-green-500/20 text-green-400";
      case "bike": return "bg-blue-500/20 text-blue-400";
      case "blog": return "bg-purple-500/20 text-purple-400";
      case "faq": return "bg-orange-500/20 text-orange-400";
      case "page": return "bg-cyan-500/20 text-cyan-400";
      default: return "bg-zinc-500/20 text-zinc-400";
    }
  };

  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-zinc-500" />
          <div className="ml-2 w-32 h-4 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus-within:border-green-500/50 focus-within:bg-white/10 transition-colors">
        <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search services, bikes, blog..."
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-500 ml-2 min-w-0"
        />
        {query && (
          <button onClick={() => { setQuery(""); setIsOpen(false); }} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X className="w-3 h-3 text-zinc-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2 border-b border-white/5">
              <span className="text-xs text-zinc-500">{results.length} result{results.length !== 1 ? "s" : ""}</span>
            </div>
            {results.map((result, i) => (
              <button
                key={`${result.type}-${i}`}
                onClick={() => handleResultClick(result)}
                className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-b-0"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getColor(result.type)}`}>
                  {getIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${getColor(result.type)}`}>{getLabel(result.type)}</span>
                  <p className="text-white text-sm font-medium mt-1 truncate">{getTitle(result)}</p>
                  <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{getDesc(result)}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {isOpen && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 p-4 text-center"
          >
            <p className="text-zinc-400 text-sm">No results found for "{query}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
