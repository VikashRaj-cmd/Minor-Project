import React, { useState, useEffect } from 'react';
import { getAllEvents, registerForEvent } from '@/services/eventService';
import Navbar from '@/components/layout/Navbar';
import { PartyPopper, Calendar, MapPin, Users, Sparkles } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await registerForEvent(eventId);
      alert('Successfully registered for event!');
      fetchEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Events</h1>
            <p className="text-gray-600">Upcoming events and activities</p>
          </div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            <Calendar className="w-4 h-4 inline mr-1" /> {events.length} Upcoming
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500 max-w-sm mx-auto">There are currently no events scheduled. Check back later for networking opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center mb-3 relative">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <PartyPopper className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 drop-shadow-lg" />
                    <Sparkles className="w-5 h-5 text-yellow-200 absolute -bottom-1 -left-1 drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{event.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">{event.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-gray-600 text-xs">{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600 text-xs">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="font-semibold">Registered</p>
                      <p className="text-gray-600 text-xs">{event.registeredUsers?.length || 0} participants</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRegister(event._id)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition font-semibold shadow-md text-sm"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
