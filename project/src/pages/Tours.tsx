import React from 'react';
import { MapPin, Clock, Users, Star } from 'lucide-react';

const Tours: React.FC = () => {
  const tours = [
    {
      title: "South Coast MTB Trails",
      location: "Oribi Gorge & Surrounding Areas",
      duration: "Half Day / Full Day",
      difficulty: "Intermediate",
      description: "Epic single track through indigenous forests and stunning gorge views. Perfect for riders looking for technical challenges and breathtaking scenery.",
      highlights: ["Technical single track", "Gorge viewpoints", "Indigenous forest", "Wildlife spotting"],
      rating: 4.8,
      reviews: 124
    },
    {
      title: "Coastal Road Cycling",
      location: "Scottburgh to Port Shepstone",
      duration: "2-4 Hours",
      difficulty: "Beginner to Intermediate",
      description: "Scenic coastal route with ocean views, charming towns, and gentle rolling hills. Great for road cyclists of all levels.",
      highlights: ["Ocean views", "Coastal towns", "Gentle climbs", "Coffee stops"],
      rating: 4.6,
      reviews: 89
    },
    {
      title: "Drakensberg Foothills Adventure",
      location: "Southern Drakensberg",
      duration: "Full Day",
      difficulty: "Advanced",
      description: "Challenging mountain bike adventure through the foothills of the mighty Drakensberg. For experienced riders seeking an epic challenge.",
      highlights: ["Mountain views", "Challenging climbs", "River crossings", "Cultural sites"],
      rating: 4.9,
      reviews: 67
    },
    {
      title: "Family-Friendly Farm Trails",
      location: "Ixopo & Surrounding Farms",
      duration: "2-3 Hours",
      difficulty: "Beginner",
      description: "Easy-going farm trails perfect for families and beginners. Beautiful countryside, farm animals, and gentle terrain make this ideal for all ages.",
      highlights: ["Family friendly", "Farm animals", "Easy terrain", "Picnic spots"],
      rating: 4.7,
      reviews: 156
    },
    {
      title: "Vernon Crookes Nature Reserve",
      location: "Vernon Crookes, Scottburgh",
      duration: "Half Day",
      difficulty: "Intermediate",
      description: "Beautiful nature reserve with well-maintained trails, diverse wildlife, and stunning valley views. A local favorite for good reason!",
      highlights: ["Nature reserve", "Wildlife viewing", "Valley views", "Well-marked trails"],
      rating: 4.5,
      reviews: 203
    },
    {
      title: "Umkomaas River Trail",
      location: "Umkomaas Valley",
      duration: "3-4 Hours",
      difficulty: "Intermediate to Advanced",
      description: "Follow the Umkomaas River through lush valleys and indigenous forests. Technical sections combined with flowing single track.",
      highlights: ["River views", "Indigenous forest", "Technical sections", "Swimming spots"],
      rating: 4.6,
      reviews: 78
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleWhatsAppBooking = (tourTitle: string) => {
    const phoneNumber = '27623235295'; // Remove spaces and add country code
    const message = encodeURIComponent(`Hi, I am interested in booking the ${tourTitle} tour. When is it available and how much is it?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cycling Tour Image */}
      <section className="relative bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-black mb-6">Epic Tours & Trails</h1>
              <p className="text-xl text-gray-700 mb-8">
                Discover the best cycling routes on the South Coast! From coastal cruises to mountain adventures, 
                we've curated the most lekker rides shared by our local cycling community.
              </p>
              <div className="bg-green-100 rounded-lg p-6">
                <p className="text-green-800 font-semibold">
                  🚴‍♂️ These tours are run by local operators and cycling groups. Click the links to book directly with them!
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Group of cyclists on a scenic tour" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tours.map((tour, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-black">{tour.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(tour.difficulty)}`}>
                      {tour.difficulty}
                    </span>
                  </div>

                  {/* Location and Duration */}
                  <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{tour.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{tour.duration}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{tour.rating}</span>
                      <span className="ml-1 text-sm text-gray-600">({tour.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4">{tour.description}</p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-black mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, idx) => (
                        <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleWhatsAppBooking(tour.title)}
                    className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Book via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Join Our Cycling Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Want to share your favorite route or join group rides? We're always looking to connect local cyclists!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Group Rides</h3>
              <p className="text-gray-600">Join our weekly group rides for all skill levels. Meet new people and explore new trails!</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Share Your Route</h3>
              <p className="text-gray-600">Know an epic trail we haven't featured? Contact Clive on WhatsApp and we'll help promote it to the community!</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Rate & Review</h3>
              <p className="text-gray-600">Help fellow cyclists by sharing your experiences and rating the trails you've ridden.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;