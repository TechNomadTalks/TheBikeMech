import { Metadata } from "next";
import { EventsCalendar } from "@/components/shared/events-calendar";

export const metadata: Metadata = {
  title: "Events | The Bike Mech",
  description: "Upcoming cycling events, races, and group rides on the South Coast. Find Sani2c, Go2Berg, Berg n Bush and more.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cycling <span className="gradient-text">Events</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Upcoming race events, group rides, and cycling adventures on the South Coast. 
            We provide on-site mechanical support at major events.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <EventsCalendar />
        </div>
      </div>
    </div>
  );
}
