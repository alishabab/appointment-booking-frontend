import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://frozen-river-95471.herokuapp.com/';

const getDoctors = () => axios.get(`${API_URL}api/v1/doctors`, { headers: authHeader() });
const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });
const getAppointments = id => axios.get(`${API_URL}api/v1/users/${id}/appointments`, { headers: authHeader() });
const getAppointment = (userId, appointmentId) => axios.get(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
export default {
  getDoctors,
  getDoctor,
  getAppointments,
  getAppointment,
};
