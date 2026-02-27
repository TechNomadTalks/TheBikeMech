"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight, DollarSign, Route, Trophy, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getEvents, type SanityEvent } from "@/sanity/lib/events";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null);
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const eventsByDate = useMemo(() => {
    const map: Record<string, SanityEvent[]> = {};
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const key = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(event);
    });
    return map;
  }, [events]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6);
  }, [events]);

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedEvent(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#22c55e]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Events Grid with Images */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="glass-card glass-card-hover overflow-hidden cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Image Placeholder */}
              <div className="aspect-video md:aspect-video bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 relative flex items-center justify-center">
                <div className="text-2xl md:text-4xl opacity-30">🚴</div>
                <Badge 
                  variant={event.type === "race" ? "default" : "secondary"}
                  className="absolute top-2 left-2 text-[10px] md:text-xs"
                >
                  {event.type === "race" ? "🏁 Race" : "🚴 Ride"}
                </Badge>
              </div>
              
              <div className="p-2 md:p-4">
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
      <Card className="glass-card p-2 md:p-6">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <h3 className="text-sm md:text-lg font-semibold text-white">
            {months[month]} {year}
          </h3>
          <div className="flex gap-1 md:gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevMonth}
              className="h-6 w-6 md:h-8 md:w-8 border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextMonth}
              className="h-6 w-6 md:h-8 md:w-8 border-white/20 text-white hover:bg-white/10"
            >
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 md:gap-1 mb-1 md:mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-[10px] md:text-xs text-zinc-500 font-medium py-0 md:py-2 text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 md:gap-1">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-zinc-900 border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge 
                      variant={selectedEvent.type === "race" ? "default" : "secondary"}
                      className="mb-2"
                    >
                      {selectedEvent.type === "race" ? "🏁 Race" : "🚴 Ride"}
                    </Badge>
                    <h2 className="text-2xl font-bold text-white">{selectedEvent.name}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedEvent(null)}
                    className="text-zinc-400 hover:text-white hover:bg-white/10"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Calendar className="w-5 h-5 text-[#22c55e]" />
                    <div>
                      <p className="font-medium">{formatDate(selectedEvent.date)}</p>
                      {selectedEvent.endDate && (
                        <p className="text-sm text-zinc-500">to {formatDate(selectedEvent.endDate)}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  {selectedEvent.location && (
                    <div className="flex items-center gap-3 text-zinc-300">
                      <MapPin className="w-5 h-5 text-[#22c55e]" />
                      <p>{selectedEvent.location}</p>
                    </div>
                  )}

                  {/* Entry Fee */}
                  {selectedEvent.entryFee && (
                    <div className="flex items-center gap-3 text-zinc-300">
                      <DollarSign className="w-5 h-5 text-[#22c55e]" />
                      <p>{selectedEvent.entryFee}</p>
                    </div>
                  )}

                  {/* Distance */}
                  {selectedEvent.distance && (
                    <div className="flex items-center gap-3 text-zinc-300">
                      <Route className="w-5 h-5 text-[#22c55e]" />
                      <p>{selectedEvent.distance}</p>
                    </div>
                  )}

                  {/* Categories */}
                  {selectedEvent.categories && selectedEvent.categories.length > 0 && (
                    <div className="flex items-start gap-3 text-zinc-300">
                      <Trophy className="w-5 h-5 text-[#22c55e] mt-0.5" />
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-zinc-300">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedEvent.description && (
                    <div className="pt-2 border-t border-white/10">
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">About</h3>
                      <p className="text-zinc-300 leading-relaxed">{selectedEvent.description}</p>
                    </div>
                  )}

                  {/* Website Link */}
                  {selectedEvent.website && (
                    <a
                      href={selectedEvent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-lg bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Event Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
