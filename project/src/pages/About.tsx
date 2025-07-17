import React from 'react';
import { Award, Heart, Wrench, Users } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Cycling",
      description: "We live and breathe bikes. From mountain trails to coastal roads, cycling is our life and we want to share that stoke with you."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Expert Craftsmanship",
      description: "Our mechanics are properly skilled and take pride in their work. Every bike that leaves our shop is running at its best."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "We're not just selling bikes - we're building a cycling community on the South Coast. Everyone's welcome here, from beginners to pros."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Promise",
      description: "We only stock brands we trust and stand behind our work. If it's not right, we'll make it right - that's our guarantee."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">About The Bike Mech</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Born and bred on the South Coast, we're passionate cyclists who turned our love for bikes into a business. 
              Come meet Clive and see what makes us tick!
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                The Bike Mech started as a dream between a few mates who were tired of traveling hours just to get proper bike service. 
                We knew the South Coast deserved better - a local shop that actually cares about cyclists and knows what they need.
              </p>
              <p>
                What began in a small garage has grown into the go-to bike shop for riders across the coast. We've built our reputation 
                one satisfied customer at a time, always putting quality and community first.
              </p>
              <p>
                Today, we're proud to serve everyone from weekend warriors to serious racers, families looking for their first bikes, 
                and everyone in between. We're not just fixing bikes - we're helping people discover the joy of cycling.
              </p>
              <p className="font-semibold text-green-600 text-xl">
                "Keeping the South Coast rolling, one bike at a time!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These aren't just words on a wall - they're the principles that guide everything we do at The Bike Mech.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mr-6 flex-shrink-0">
                    <div className="text-green-600">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Meet Clive</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The friendly face behind The Bike Mech. Always up for a chat about bikes, trails, or just life in general!
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-black mb-4">Come Meet Us in Person!</h3>
            <p className="text-gray-700 mb-6">
              The best way to get to know Clive and the team is to pop in for a visit. We're always keen to meet fellow cyclists 
              and share stories about the best trails, latest gear, or that epic ride you're planning.
            </p>
            <p className="text-green-600 font-semibold">
              Coffee's always on, and the door's always open!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;