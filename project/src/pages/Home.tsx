import React from 'react';
import { Wrench, Users, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';

interface HomeProps {
  onPageChange: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onPageChange }) => {
  const services = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Expert Service",
      description: "From basic tune-ups to full rebuilds, our mechanics know their stuff. We'll get your bike running like new."
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Quality Sales",
      description: "Top brands, fair prices, and honest advice. We'll help you find the perfect ride for your adventures."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Local Events",
      description: "Join our community rides and events. Meet fellow cyclists and explore the beautiful South Coast together."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Focus",
      description: "We're not just a bike shop - we're part of the local cycling family. Come chat, get advice, or just hang out."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Black Background and Bike Image */}
      <section className="relative bg-black py-20 overflow-hidden">
        {/* Background Bike Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Mountain Bike"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Keep Rolling with 
                <span className="text-green-400"> The Bike Mech</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your local bike shop on the South Coast. Whether you need a quick service, a new ride, or want to join our cycling community - we've got you sorted, boet!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onPageChange('booking')}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                  Book a Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => onPageChange('tours')}
                  className="border-2 border-green-600 text-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors duration-200"
                >
                  Explore Tours
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Black Circle Background for Logo */}
              <div className="bg-black rounded-full p-8 mx-auto w-fit">
                <img 
                  src="/WhatsApp Image 2025-06-15 at 20.44.47_3a0e9661.jpg" 
                  alt="The Bike Mech Logo" 
                  className="w-full max-w-sm mx-auto rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">What We're All About</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From sales to service to epic rides - we're your one-stop shop for everything cycling on the South Coast.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-200">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                  <div className="text-green-600">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Rolling?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you need a service, want to buy a new bike, or join our next group ride - we're here to help. Come through and let's chat!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onPageChange('contact')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Get in Touch
            </button>
            <button 
              onClick={() => onPageChange('about')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-200"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;