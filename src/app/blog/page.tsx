"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  User,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getBlogPosts, type SanityBlogPost } from "@/sanity/lib/blog";

const defaultPosts = [
  {
    id: 1,
    slug: { current: "maintaining-your-bike-chain" },
    title: "Maintaining Your Bike Chain: A Complete Guide",
    excerpt: "Learn how to properly clean, lubricate, and maintain your bike chain for optimal performance and longevity. A well-maintained chain can last thousands of kilometers.",
    category: "Maintenance Tips",
    author: "The Bike Mech",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    slug: { current: "when-to-replace-brake-pads" },
    title: "When to Replace Your Brake Pads",
    excerpt: "Knowing when to replace your brake pads is crucial for safety. This guide covers signs of wear, types of brake pads, and replacement intervals for different riding conditions.",
    category: "Safety",
    author: "The Bike Mech",
    publishedAt: "2024-01-10",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 3,
    slug: { current: "winter-riding-tips" },
    title: "Winter Riding Tips for South African Cyclists",
    excerpt: "Don't let the cold stop you from riding! Here are our top tips for staying comfortable and safe during winter rides, including gear recommendations and maintenance advice.",
    category: "Tips & Tricks",
    author: "The Bike Mech",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    slug: { current: "choosing-right-bike-size" },
    title: "How to Choose the Right Bike Size",
    excerpt: "Buying a new bike? Getting the right size is essential for comfort and performance. Learn how to measure yourself and find the perfect fit for any type of bike.",
    category: "Buying Guides",
    author: "The Bike Mech",
    publishedAt: "2023-12-28",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    slug: { current: "tubeless-tyres-guide" },
    title: "The Complete Guide to Tubeless Tyres",
    excerpt: "Thinking about going tubeless? This comprehensive guide covers everything you need to know about tubeless tyres, including setup, maintenance, and troubleshooting common issues.",
    category: "Technical",
    author: "The Bike Mech",
    publishedAt: "2023-12-20",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 6,
    slug: { current: "basic-bike-tools-every-cyclist-needs" },
    title: "Basic Bike Tools Every Cyclist Should Own",
    excerpt: "Be prepared for roadside repairs and basic maintenance with these essential tools. From multi-tools to floor pumps, here's what every cyclist should have in their toolkit.",
    category: "Maintenance Tips",
    author: "The Bike Mech",
    publishedAt: "2023-12-15",
    readTime: "5 min read",
    featured: false,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<any[]>(defaultPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getBlogPosts();
        if (posts && posts.length > 0) {
          setBlogPosts(posts.map((p: SanityBlogPost) => ({
            id: p._id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            author: p.author,
            publishedAt: p.publishedAt,
            readTime: p.readTime,
            featured: p.featured,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch blog posts from Sanity:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const simpleSearch = (items: any[], term: string): any[] => {
    const lowerTerm = term.toLowerCase();
    return items.filter(item => 
      item.title?.toLowerCase().includes(lowerTerm) ||
      item.excerpt?.toLowerCase().includes(lowerTerm) ||
      item.category?.toLowerCase().includes(lowerTerm)
    );
  };

  const filteredPosts = searchQuery 
    ? simpleSearch(blogPosts, searchQuery)
    : blogPosts;

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1 mb-4">
            Our Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tips, Guides & <span className="gradient-text">News</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Stay updated with the latest cycling tips, maintenance guides, and industry news 
            from our expert team of bicycle mechanics.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#22c55e]"
            />
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card glass-card-hover overflow-hidden group h-full">
                    <div className="aspect-video image-placeholder relative">
                      <Badge className="absolute top-4 left-4 bg-[#22c55e] text-black">
                        Featured
                      </Badge>
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="border-[#22c55e]/30 text-[#22c55e] mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#22c55e] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="glass-card overflow-hidden h-full">
                  <div className="aspect-video animate-pulse bg-white/5"></div>
                  <div className="p-5">
                    <div className="h-4 bg-white/10 rounded w-1/4 mb-2"></div>
                    <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card glass-card-hover overflow-hidden group h-full">
                  <div className="aspect-video image-placeholder" />
                  <div className="p-5">
                    <Badge variant="outline" className="border-[#22c55e]/30 text-[#22c55e] mb-2 text-xs">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#22c55e] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 mt-12 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Want More Cycling Tips?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            Follow us on social media for regular tips, updates, and special offers. 
            Or subscribe to our newsletter for exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="btn-primary px-6">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
