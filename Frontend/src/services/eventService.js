import api from './api';

export const getAllEvents = async () => {
  const { data } = await api.get('/events');
  return data;
};

export const createEvent = async (eventData) => {
  const { data } = await api.post('/events', eventData);
  return data;
};

export const registerForEvent = async (eventId) => {
  const { data } = await api.post(`/events/${eventId}/register`);
  return data;
};
