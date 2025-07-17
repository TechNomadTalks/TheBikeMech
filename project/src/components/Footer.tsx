import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {/* Black Circle Background for Logo */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <img 
                  src="/WhatsApp Image 2025-06-15 at 20.44.47_3a0e9661.jpg" 
                  alt="The Bike Mech Logo" 
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">THE BIKE MECH</h3>
                <p className="text-green-400 text-sm">Sales • Service • Events</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your local bike shop on the South Coast. We're here to keep you rolling, whether you're a weekend warrior or daily commuter. Lekker bikes, proper service, and good vibes!
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-sm text-gray-300">67a Old St Faiths Rd<br />Umtentweni, 4235</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-sm text-gray-300">062 323 5295</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-sm text-gray-300">clive@thebikemech.co.za</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Opening Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-green-400" />
                <div className="text-sm text-gray-300">
                  <p>Mon - Fri: 8:00 - 17:00</p>
                  <p>Saturday: 8:00 - 14:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 The Bike Mech. All rights reserved. Built with love on the South Coast.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;