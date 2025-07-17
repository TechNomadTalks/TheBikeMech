import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Message sent! We\'ll get back to you soon, boet!');
    console.log('Contact form data:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '27623235295'; // Remove spaces and add country code
    const message = encodeURIComponent('Hi Clive! I found you through The Bike Mech website. ');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Got questions about bikes, need advice, or just want to chat? We're always keen to help! 
              Drop us a line or pop in for a visit - the coffee's always on.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-8">Visit Our Shop</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      67a Old St Faiths Rd<br />
                      Umtentweni, 4235<br />
                      South Coast, KwaZulu-Natal
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <p className="text-gray-600">062 323 5295</p>
                    <p className="text-sm text-gray-500">Call Clive for urgent repairs or quick questions</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <p className="text-gray-600">clive@thebikemech.co.za</p>
                    <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Opening Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p>Saturday: 8:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Emergency repairs by appointment only
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="mt-8">
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center w-full sm:w-auto justify-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Chat on WhatsApp
                </button>
              </div>

              {/* Static Google Maps */}
              <div className="mt-8">
                <h3 className="font-semibold text-black mb-4">Find Us</h3>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=67a+Old+St+Faiths+Rd,+Umtentweni,+4235,+South+Africa&zoom=15&size=600x300&maptype=roadmap&markers=color:green%7C67a+Old+St+Faiths+Rd,+Umtentweni,+4235,+South+Africa&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BcqJMrMhJVY"
                    alt="Map showing The Bike Mech location at 67a Old St Faiths Rd, Umtentweni"
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      // Fallback if Google Maps API key is not available
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300' viewBox='0 0 600 300'%3E%3Crect width='600' height='300' fill='%23f3f4f6'/%3E%3Ctext x='300' y='140' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3E67a Old St Faiths Rd%3C/text%3E%3Ctext x='300' y='160' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EUmtentweni, 4235%3C/text%3E%3Ctext x='300' y='180' text-anchor='middle' font-family='Arial, sans-serif' font-size='14' fill='%239ca3af'%3EClick for directions%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Click the map to get directions to our shop
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="service">Service Inquiry</option>
                    <option value="sales">Sales Question</option>
                    <option value="parts">Parts Availability</option>
                    <option value="events">Events & Tours</option>
                    <option value="general">General Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Quick Answers</h2>
            <p className="text-xl text-gray-600">
              Before you reach out, here are answers to some common questions we get asked.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-black mb-3">How long does a basic service take?</h3>
              <p className="text-gray-600">
                Most basic services take 2-3 hours. We'll give you a more accurate time estimate when you drop off your bike, 
                depending on what needs doing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-black mb-3">Do you work on all bike brands?</h3>
              <p className="text-gray-600">
                Absolutely! We service all makes and models - from budget bikes to high-end carbon fiber machines. 
                If it's got two wheels, we can fix it.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-black mb-3">Can I get a quote before the work starts?</h3>
              <p className="text-gray-600">
                Of course! We always assess your bike first and give you a quote before starting any work. 
                No surprises, just honest pricing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-black mb-3">Do you offer emergency repairs?</h3>
              <p className="text-gray-600">
                For urgent repairs (like if you're stuck on a ride), give Clive a call. We'll do our best to help you out, 
                even outside normal hours when possible.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-green-50 rounded-lg p-8 max-w-2xl mx-auto">
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-black mb-4">Still Have Questions?</h3>
              <p className="text-gray-700 mb-4">
                Don't be shy! We love chatting about bikes and helping fellow cyclists. 
                Whether it's a technical question or you just want advice on your next upgrade, we're here to help.
              </p>
              <p className="text-green-600 font-semibold">
                Come through for a coffee and a chat - we'd love to meet you!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;