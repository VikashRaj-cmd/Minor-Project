import api from './api';

export const getProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data;
};

export const getAllAlumni = async () => {
  const { data } = await api.get('/users/alumni');
  return data;
};

export const updateProfile = async (userData) => {
  const { data } = await api.put('/users/profile', userData);
  return data;
};
