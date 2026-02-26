"use client";

import { motion } from "framer-motion";
import { 
  Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Award, 
  Users, 
  MapPin, 
  Target,
  Wrench,
  Shield,
  Clock,
  Heart,
  CheckCircle2
} from "lucide-react";

const team = [
  {
    name: "Clive Berry",
    role: "Owner & Lead Mechanic",
    bio: "8+ years of experience in bicycle mechanics. Known for servicing at major events like Sani2c, Go2Berg, and Berg n Bush.",
    specialties: ["Event Support", "Custom Builds", "Mountain Bikes", "Road Bikes"],
  },
];

const certifications = [
  "Shimano Service Center",
  "Event Support Specialist",
  "Fox Suspension Certified",
  "Custom Bike Builder",
  "Mountain Bike Expert",
  "Road Bike Specialist",
];

const serviceAreas = [
  "Umtentweni",
  "Port Shepstone",
  "Shelly Beach",
  "Margate",
  "South Coast",
  "KwaZulu-Natal",
  "Event Coverage (Nationwide)",
];

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "We never compromise on quality. Every repair is done right, using the best tools and techniques.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We stick to our timelines and keep you informed throughout the repair process.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We're cyclists ourselves. We understand the joy of a perfectly tuned ride.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We support local cycling events, group rides, and youth cycling programs.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1 mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Story Behind <span className="gradient-text">The Bike Mech</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            From a passion project to the South Coast's trusted bicycle repair service, 
            we're dedicated to keeping cyclists on the road.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Our Story</h2>
            <p className="text-zinc-400 leading-relaxed">
              The Bike Mech started as a passion project born from a lifelong love for cycling 
              and mechanics on the South Coast of KwaZulu-Natal. What began as helping friends 
              with their bike repairs quickly grew into something bigger.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Over the years, we've grown to provide professional bicycle repair services across 
              the South Coast, but our core values remain the same: quality workmanship, honest 
              advice, and a genuine love for what we do.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Today, we're proud to serve hundreds of cyclists across KwaZulu-Natal, from casual 
              riders to competitive athletes. We're known for providing expert mechanical support 
              at major events like Sani2c, Go2Berg, and Berg n Bush. Every bike that comes through 
              our doors receives the same attention to detail we'd want for our own rides.
            </p>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden">
            <img 
              src="/images/561564733_24980808734892635_6173447473608756971_n.jpg" 
              alt="The Bike Mech Workshop" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-10 h-10 text-[#22c55e]" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">Our Mission</h2>
              <p className="text-zinc-400 max-w-2xl">
                To provide professional, reliable, and affordable bicycle repair services 
                that keep our community cycling safely. We believe every cyclist deserves 
                access to quality maintenance, regardless of their bike's value or their 
                riding experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="glass-card glass-card-hover p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#22c55e]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-zinc-400 text-sm">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Meet the Team</h2>
          <div className={`grid grid-cols-1 ${team.length === 1 ? 'md:justify-center md:grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
            {team.map((member, index) => (
              <Card key={index} className="glass-card glass-card-hover p-4 md:p-6 max-w-sm mx-auto">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#22c55e] to-[#06b6d4] flex items-center justify-center mx-auto mb-3 md:mb-4 text-black text-xl md:text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-center">
                  <h3 className="text-base md:text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-[#22c55e] text-xs md:text-sm mb-2 md:mb-3">{member.role}</p>
                  <p className="text-zinc-400 text-xs md:text-sm mb-3 md:mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] md:text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Service Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-6 h-6 text-[#22c55e]" />
            <h2 className="text-2xl font-bold text-white">Service Area</h2>
          </div>
          <p className="text-zinc-400 text-center mb-6 max-w-2xl mx-auto">
            Based in Umtentweni on the South Coast of KwaZulu-Natal, we serve cyclists throughout the region. 
            We also provide event support nationwide for major cycling events. Contact us to discuss options.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {serviceAreas.map((area) => (
              <Badge key={area} className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30">
                {area}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
