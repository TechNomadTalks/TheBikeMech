import React, { useState } from 'react';
import { Calendar, Clock, Wrench, User, Phone, Mail, MessageSquare, CreditCard, Copy, Check } from 'lucide-react';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    bikeType: '',
    message: ''
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const services = [
    { id: 'basic-service', name: 'Basic Service & Tune-up', price: 'R350', duration: '2-3 hours' },
    { id: 'full-service', name: 'Full Service & Overhaul', price: 'R650', duration: '1-2 days' },
    { id: 'brake-service', name: 'Brake Service & Adjustment', price: 'R180', duration: '1 hour' },
    { id: 'gear-service', name: 'Gear Adjustment & Tuning', price: 'R150', duration: '45 mins' },
    { id: 'wheel-service', name: 'Wheel Truing & Spoke Repair', price: 'R120', duration: '30 mins' },
    { id: 'suspension', name: 'Suspension Service', price: 'R450', duration: '2-4 hours' },
    { id: 'custom', name: 'Custom Work / Quote Required', price: 'TBD', duration: 'Varies' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const bankingDetails = {
    bankName: 'First National Bank',
    accountName: 'The Bike Mech',
    accountNumber: '62323529501',
    branchCode: '250655',
    accountType: 'Business Cheque Account',
    reference: 'BIKE-SERVICE'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Booking request submitted! We\'ll be in touch soon to confirm your appointment.');
    console.log('Booking data:', formData);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Generate QR code URL with banking details
  const generateQRCodeURL = () => {
    const qrData = `Bank: ${bankingDetails.bankName}
Account: ${bankingDetails.accountName}
Number: ${bankingDetails.accountNumber}
Branch: ${bankingDetails.branchCode}
Reference: ${bankingDetails.reference}`;
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Book Your Service</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to get your bike running like new? Book a service with our expert mechanics. 
              We'll have you back on the trails in no time!
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Services List */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Services</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-black">{service.name}</h3>
                      <span className="text-green-600 font-bold">{service.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-2">What's Included in Our Services:</h3>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Professional assessment and diagnosis</li>
                  <li>• Quality parts and lubricants</li>
                  <li>• Safety check and test ride</li>
                  <li>• 30-day service guarantee</li>
                  <li>• Honest advice and recommendations</li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Book Your Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Full Name *
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
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address *
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

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    <Wrench className="h-4 w-4 inline mr-1" />
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bike Type */}
                <div>
                  <label htmlFor="bikeType" className="block text-sm font-medium text-gray-700 mb-2">
                    Bike Type
                  </label>
                  <input
                    type="text"
                    id="bikeType"
                    name="bikeType"
                    value={formData.bikeType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Mountain bike, Road bike, Hybrid"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-1" />
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us about any specific issues or requests..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Book My Service
                </button>
              </form>

              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>We'll confirm your booking within 24 hours. For urgent repairs, give us a call!</p>
              </div>
            </div>

            {/* Banking Details Section */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Payment Details</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold text-black">Banking Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Bank:</span>
                    <div className="flex items-center">
                      <span className="text-black">{bankingDetails.bankName}</span>
                      <button
                        onClick={() => copyToClipboard(bankingDetails.bankName, 'bank')}
                        className="ml-2 p-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        {copiedField === 'bank' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Account Name:</span>
                    <div className="flex items-center">
                      <span className="text-black">{bankingDetails.accountName}</span>
                      <button
                        onClick={() => copyToClipboard(bankingDetails.accountName, 'name')}
                        className="ml-2 p-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        {copiedField === 'name' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Account Number:</span>
                    <div className="flex items-center">
                      <span className="text-black font-mono">{bankingDetails.accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(bankingDetails.accountNumber, 'account')}
                        className="ml-2 p-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        {copiedField === 'account' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Branch Code:</span>
                    <div className="flex items-center">
                      <span className="text-black font-mono">{bankingDetails.branchCode}</span>
                      <button
                        onClick={() => copyToClipboard(bankingDetails.branchCode, 'branch')}
                        className="ml-2 p-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        {copiedField === 'branch' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Account Type:</span>
                    <span className="text-black">{bankingDetails.accountType}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-gray-700 font-medium">Reference:</span>
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold">{bankingDetails.reference}</span>
                      <button
                        onClick={() => copyToClipboard(bankingDetails.reference, 'reference')}
                        className="ml-2 p-1 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        {copiedField === 'reference' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-black mb-4">Quick Payment QR Code</h3>
                <div className="flex justify-center mb-4">
                  <img 
                    src={generateQRCodeURL()}
                    alt="Banking Details QR Code"
                    className="w-48 h-48 border border-gray-300 rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code to quickly access our banking details
                </p>
                <p className="text-xs text-gray-500">
                  Use your banking app to scan and make payment
                </p>
              </div>

              {/* Payment Instructions */}
              <div className="mt-6 bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Payment Instructions:</h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Use <strong>BIKE-SERVICE</strong> as your payment reference</li>
                  <li>• Include your name in the reference if possible</li>
                  <li>• Payment confirms your booking appointment</li>
                  <li>• Send proof of payment to: clive@thebikemech.co.za</li>
                  <li>• We accept cash payments at the shop too!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;