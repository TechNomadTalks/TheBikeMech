"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight, DollarSign, Route, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { events, getEventStatus, type BikeEvent } from "@/data/events";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<BikeEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const eventsByDate = useMemo(() => {
    const map: Record<string, BikeEvent[]> = {};
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const key = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(event);
    });
    return map;
  }, []);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6);
  }, []);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const key = `${year}-${month}-${day}`;
    return eventsByDate[key] || [];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      {/* Events Grid with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="glass-card glass-card-hover overflow-hidden cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 relative flex items-center justify-center">
                <div className="text-4xl opacity-30">🚴</div>
                <Badge 
                  variant={event.type === "race" ? "default" : "secondary"}
                  className="absolute top-3 left-3"
                >
                  {event.type === "race" ? "🏁 Race" : "🚴 Ride"}
                </Badge>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  {formatDate(event.date)}
                  {event.endDate && ` - ${formatDate(event.endDate)}`}
                </div>
                <h4 className="font-semibold text-white mb-1">{event.name}</h4>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{event.description}</p>
                
                <div className="flex flex-wrap gap-3 text-xs">
                  {event.entryFee && (
                    <div className="flex items-center gap-1 text-zinc-400">
                      <DollarSign className="w-3 h-3" />
                      {event.entryFee}
                    </div>
                  )}
                  {event.distance && (
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Route className="w-3 h-3" />
                      {event.distance}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Calendar */}
      <Card className="glass-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {months[month]} {year}
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevMonth}
              className="h-8 w-8 border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextMonth}
              className="h-8 w-8 border-white/20 text-white hover:bg-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center text-xs text-zinc-500 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            
            return (
              <div
                key={day}
                className={`aspect-square relative rounded-lg flex flex-col items-center justify-start pt-1 cursor-pointer transition-colors ${
                  dayEvents.length > 0 
                    ? "bg-red-500/10 hover:bg-red-500/20" 
                    : "hover:bg-white/5"
                } ${isToday ? "ring-1 ring-[#22c55e]" : ""}`}
                onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
              >
                <span className={`text-xs ${isToday ? "text-[#22c55e] font-bold" : "text-zinc-400"}`}>
                  {day}
                </span>
                {dayEvents.length > 0 && (
                  <div className="absolute top-1 right-1 w-3 h-3 flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">✕</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Badge 
                  variant={selectedEvent.type === "race" ? "default" : "secondary"}
                  className="mb-2"
                >
                  {selectedEvent.type === "race" ? "Race" : "Ride"}
                </Badge>
                <h4 className="font-semibold text-white text-lg">{selectedEvent.name}</h4>
                <p className="text-zinc-400 text-sm mt-1">{selectedEvent.description}</p>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-zinc-300">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedEvent.date)}
                    {selectedEvent.endDate && ` - ${formatDate(selectedEvent.endDate)}`}
                  </div>
                  <div className="flex items-center gap-1 text-zinc-300">
                    <MapPin className="w-4 h-4" />
                    {selectedEvent.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  {selectedEvent.entryFee && (
                    <div className="flex items-center gap-1 text-[#22c55e]">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">{selectedEvent.entryFee}</span>
                    </div>
                  )}
                  {selectedEvent.distance && (
                    <div className="flex items-center gap-1 text-[#06b6d4]">
                      <Route className="w-4 h-4" />
                      <span className="font-medium">{selectedEvent.distance}</span>
                    </div>
                  )}
                  {selectedEvent.categories && (
                    <div className="flex items-center gap-1 text-[#f97316]">
                      <Trophy className="w-4 h-4" />
                      <span className="font-medium">{selectedEvent.categories}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedEvent(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
            <a
              href={selectedEvent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-[#22c55e] hover:underline text-sm"
            >
              More Info <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        )}
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span>Race Event</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
          <span>Group Ride</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xs font-bold">✕</span>
          <span>Event Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full ring-1 ring-[#22c55e]" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
