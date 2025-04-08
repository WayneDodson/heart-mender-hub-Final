
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CalendarDays, Users } from 'lucide-react';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample upcoming events
  const events = [
    {
      title: "Group Support Session",
      description: "Weekly support group for recently divorced individuals",
      date: "2025-04-15",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual Meeting (Zoom)",
      icon: <Users className="h-5 w-5 text-msblue-500" />
    },
    {
      title: "Healing Workshop",
      description: "Interactive workshop on emotional healing techniques",
      date: "2025-04-22",
      time: "6:30 PM - 8:00 PM",
      location: "Community Center",
      icon: <CalendarClock className="h-5 w-5 text-msblue-500" />
    },
    {
      title: "Specialist Q&A",
      description: "Live Q&A with divorce recovery specialists",
      date: "2025-05-01",
      time: "7:00 PM - 8:00 PM",
      location: "Virtual Meeting (Zoom)",
      icon: <CalendarDays className="h-5 w-5 text-msblue-500" />
    }
  ];

  // Filter events for the selected date (simplified version)
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const selectedDateEvents = getEventsForDate(date);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-msblue-800 mb-4">Future Events Calendar</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our community events, workshops, and specialist sessions to support your healing journey. 
          Select a date to see what's happening or browse our upcoming events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-msblue-700 mb-4">Select a Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full p-3 pointer-events-auto"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-msblue-700 mb-4">
            {date 
              ? `Events for ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` 
              : 'All Upcoming Events'}
          </h2>
          
          {selectedDateEvents.length > 0 ? (
            <div className="grid gap-4">
              {selectedDateEvents.map((event, index) => (
                <Card key={index} className="border border-msblue-100">
                  <CardHeader className="flex flex-row items-center gap-3">
                    {event.icon}
                    <div>
                      <CardTitle className="text-lg font-medium">{event.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {event.time} • {event.location}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-msblue-50 rounded-lg border border-msblue-100">
              <CalendarDays className="h-12 w-12 text-msblue-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-msblue-700 mb-2">No Events Scheduled</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                There are no events scheduled for this date. Please check back later or select another date.
              </p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-msblue-700 mb-4">Upcoming Events</h2>
            <div className="grid gap-4">
              {events.map((event, index) => (
                <Card key={index} className="border border-msblue-100">
                  <CardHeader className="flex flex-row items-center gap-3">
                    {event.icon}
                    <div>
                      <CardTitle className="text-lg font-medium">{event.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        {' • '}{event.time} • {event.location}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
