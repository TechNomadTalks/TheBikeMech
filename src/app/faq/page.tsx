"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    category: "Services & Pricing",
    questions: [
      {
        question: "How much does a basic tune-up cost?",
        answer: "Our basic tune-up service costs R350 and includes brake adjustment, gear indexing, chain lubrication, tyre pressure check, bolt torque check, and a complete safety inspection. This is perfect for regular maintenance to keep your bike running smoothly.",
      },
      {
        question: "What's included in a full service?",
        answer: "Our full service at R650 includes everything in the basic tune-up plus drivetrain deep cleaning, bottom bracket check, headset adjustment, wheel trueing, cable inspection, and a detailed report of your bike's condition. This comprehensive service is recommended annually or every 3000km.",
      },
      {
        question: "Do you offer emergency repairs?",
        answer: "Yes! We offer emergency repair services for R300. This includes priority service, quick diagnosis, and same-day repair when possible. We understand that sometimes you need your bike fixed urgently, especially if you rely on it for commuting.",
      },
      {
        question: "How long does a typical service take?",
        answer: "A basic tune-up typically takes 1-2 hours, while a full service can take 3-4 hours depending on the bike's condition. We'll always give you an estimated completion time when you book. For complex repairs or custom builds, we'll provide a detailed timeline upfront.",
      },
    ],
  },
  {
    category: "Booking & Appointments",
    questions: [
      {
        question: "How do I book a service?",
        answer: "You can book a service through our contact form, by calling us at +27 62 323 5295, or by messaging us on WhatsApp. We recommend booking in advance, especially during peak seasons, but we always try to accommodate urgent repairs.",
      },
      {
        question: "Do I need to leave my bike with you?",
        answer: "For most services, yes, you'll need to leave your bike with us. We'll give you a clear timeline and notify you when it's ready for collection. For simple repairs like punctures, we can often do them while you wait.",
      },
      {
        question: "Can I bring my own parts?",
        answer: "Absolutely! If you've purchased parts elsewhere, we're happy to install them for you. Just let us know when booking so we can allocate the appropriate time. Labour charges will still apply based on the complexity of the installation.",
      },
      {
        question: "What are your operating hours?",
        answer: "We're open Monday to Friday from 8:00 AM to 5:00 PM, and Saturdays from 8:00 AM to 1:00 PM. We're closed on Sundays and public holidays. For emergency situations outside these hours, contact us on WhatsApp.",
      },
    ],
  },
  {
    category: "Bike Sales & Trade-ins",
    questions: [
      {
        question: "Do you sell second-hand bikes?",
        answer: "Yes! We have a selection of quality-checked pre-owned bicycles for sale. All our used bikes undergo a full service and safety check before being listed. Check our Sales page or Facebook Marketplace for current listings.",
      },
      {
        question: "Do you accept trade-ins?",
        answer: "Yes, we do accept trade-ins. Bring your old bike for an assessment, and we'll offer you a fair trade-in value that can be used towards a service or one of our bikes for sale. The value depends on the bike's condition and market demand.",
      },
      {
        question: "Do you offer consignment sales?",
        answer: "Yes, we can sell your bike on consignment. We'll service it, take photos, list it on our marketplace, and handle the sale. We take a small commission once the bike sells. Contact us for more details about our consignment process.",
      },
    ],
  },
  {
    category: "Warranty & Guarantees",
    questions: [
      {
        question: "Do you offer any warranty on repairs?",
        answer: "Yes, all our work comes with a 30-day warranty. If you experience any issues related to the work we performed within this period, bring it back and we'll fix it at no additional charge. This excludes normal wear and tear.",
      },
      {
        question: "What if I'm not satisfied with the service?",
        answer: "Your satisfaction is our priority. If you're not happy with any aspect of our service, please let us know within 7 days and we'll work to make it right. We stand behind our work and want every customer to be completely satisfied.",
      },
      {
        question: "Are parts you install covered by warranty?",
        answer: "Parts we supply and install come with their manufacturer warranty. We'll handle any warranty claims on your behalf. For parts you supply, the original manufacturer warranty applies.",
      },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FAQPage() {
  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1 mb-4">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Find answers to common questions about our services, booking process, 
            warranties, and more. Can't find what you're looking for? Contact us!
          </p>
        </motion.div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#22c55e]" />
                {category.category}
              </h2>
              <Card className="glass-card overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="border-b border-white/10 last:border-0"
                    >
                      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline hover:text-[#22c55e] transition-colors text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 mt-12 text-center"
        >
          <MessageCircle className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? We're here to help! 
            Reach out to us directly and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="btn-primary px-6">
                Contact Us
              </Button>
            </Link>
            <a href="https://wa.me/27623235295" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="btn-secondary px-6">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
