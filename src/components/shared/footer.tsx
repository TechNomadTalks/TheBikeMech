import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/sales", label: "Bikes for Sale" },
  { href: "/gallery", label: "Gallery" },
];

const serviceLinks = [
  { href: "/services#tune-up", label: "Basic Tune-Up" },
  { href: "/services#full-service", label: "Full Service" },
  { href: "/services#brake", label: "Brake Adjustment" },
  { href: "/services#custom", label: "Custom Build" },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0a] border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="The Bike Mech" 
                className="h-12 w-auto rounded-lg"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Professional bicycle repair and maintenance services. Known for servicing at events like Sani2c, Go2Berg, and Berg n Bush. From basic tune-ups to custom builds, we keep your ride smooth and safe.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/The-Bike-Mech_SC-100090659737389/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[#22c55e] hover:bg-white/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://za.linkedin.com/in/clive-berry-62a671192"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[#22c55e] hover:bg-white/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm hover:text-[#22c55e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm hover:text-[#22c55e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <div className="text-zinc-400 text-sm">
                  <p>67A Old St Faiths Road</p>
                  <p>Umtentweni, Hibiscus Coast</p>
                  <p>KwaZulu-Natal, 4235</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a href="https://en.wikipedia.org/wiki/Umtentweni" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline text-xs">Umtentweni</a>
                    <a href="https://en.wikipedia.org/wiki/KwaZulu-Natal" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline text-xs">KwaZulu-Natal</a>
                    <a href="https://en.wikipedia.org/wiki/Hibiscus_Coast" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline text-xs">Hibiscus Coast</a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <a
                  href="https://wa.me/27623235295"
                  className="text-zinc-400 text-sm hover:text-[#22c55e] transition-colors"
                >
                  062 323 5295 (WhatsApp & Phone)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <a
                  href="mailto:haynesluke994@gmail.com"
                  className="text-zinc-400 text-sm hover:text-[#22c55e] transition-colors"
                >
                  haynesluke994@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <div className="text-zinc-400 text-sm">
                  <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p>Sat: 8:00 AM - 1:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} The Bike Mech. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <p className="text-zinc-500">
              Website designed & developed by{" "}
              <a 
                href="mailto:haynesluke96@gmail.com" 
                className="text-[#22c55e] hover:underline font-medium"
              >
                Luke Dodge
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
