import { Metadata } from "next";
import { EventsCalendar } from "@/components/shared/events-calendar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | The Bike Mech",
  description: "Upcoming cycling events, races, and group rides on the South Coast. Find Sani2c, Go2Berg, Berg n Bush and more.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Cycling <span className="gradient-text">Events</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
            Upcoming race events, group rides, and cycling adventures on the South Coast. 
            We provide on-site mechanical support at major events.
          </p>
          
          <Link 
            href="https://wa.me/27658218888?text=I want to learn more about your events" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="btn-primary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat About Events
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <EventsCalendar />
        </div>
      </div>
    </div>
  );
}
